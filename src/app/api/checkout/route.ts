import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PLANS, type PlanKey } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { planKey, userId, userEmail } = await request.json() as {
            planKey: PlanKey;
            userId: string;
            userEmail: string;
        };

        // プランの検証
        const plan = PLANS[planKey];
        if (!plan || planKey === 'free') {
            return NextResponse.json({ error: '無効なプランです' }, { status: 400 });
        }

        if (!('stripePriceId' in plan)) {
            return NextResponse.json({ error: 'Price IDが設定されていません' }, { status: 400 });
        }

        const origin = request.headers.get('origin') || 'http://localhost:3000';
        const stripe = getStripe();

        // Stripe Checkoutセッションを作成
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer_email: userEmail,
            line_items: [
                {
                    price: plan.stripePriceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                planKey,
            },
            success_url: `${origin}/dashboard?upgraded=true`,
            cancel_url: `${origin}/dashboard?cancelled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Checkout session error:', error);
        return NextResponse.json(
            { error: 'チェックアウトセッションの作成に失敗しました' },
            { status: 500 }
        );
    }
}
