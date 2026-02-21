import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import Stripe from 'stripe';

// Supabase Admin クライアント（サーバー専用、RLSバイパス）
function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY が .env.local に設定されていません');
    }

    return createClient<Database>(url, serviceKey);
}

export async function POST(request: NextRequest) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET が設定されていません');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const stripe = getStripe();
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // イベント処理
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;
            const planKey = session.metadata?.planKey as 'starter' | 'pro' | undefined;
            const customerId = session.customer as string;
            const subscriptionId = session.subscription as string;

            if (userId && planKey) {
                const supabase = getSupabaseAdmin();

                // profiles テーブルを更新
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        subscription_plan: planKey,
                        stripe_customer_id: customerId,
                        stripe_subscription_id: subscriptionId,
                    })
                    .eq('id', userId);

                if (error) {
                    console.error('Failed to update profile:', error);
                } else {
                    console.log(`✅ User ${userId} upgraded to ${planKey}`);
                }
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = event.data.object as Stripe.Subscription;
            const customerId = subscription.customer as string;

            const supabase = getSupabaseAdmin();

            // Stripe Customer IDからユーザーを特定してFreeに戻す
            const { error } = await supabase
                .from('profiles')
                .update({ subscription_plan: 'free' })
                .eq('stripe_customer_id', customerId);

            if (error) {
                console.error('Failed to downgrade profile:', error);
            } else {
                console.log(`✅ Customer ${customerId} downgraded to free`);
            }
            break;
        }
    }

    return NextResponse.json({ received: true });
}
