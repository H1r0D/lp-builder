import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        if (!process.env.STRIPE_SECRET_KEY) {
            throw new Error('STRIPE_SECRET_KEY が .env.local に設定されていません');
        }
        _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            typescript: true,
        });
    }
    return _stripe;
}

// プラン定義
export const PLANS = {
    free: {
        name: 'Free',
        price: 0,
        priceLabel: '¥0',
        features: [
            'LP 1件まで作成',
            'かんたんモードのみ',
            '基本テンプレート',
            'クレジット 3回分',
        ],
        limits: {
            maxProjects: 1,
            canExportZip: false,
            advancedAnalytics: false,
            advancedEditor: false,
        },
    },
    starter: {
        name: 'Starter',
        price: 2980,
        priceLabel: '¥2,980',
        stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_placeholder',
        features: [
            'LP 5件まで作成',
            'かんたん + 通常モード',
            'ZIP エクスポート',
            'クレジット 30回 / 月',
        ],
        limits: {
            maxProjects: 5,
            canExportZip: true,
            advancedAnalytics: false,
            advancedEditor: true,
        },
    },
    pro: {
        name: 'Pro',
        price: 9800,
        priceLabel: '¥9,800',
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
        features: [
            'LP 無制限',
            '全エディタ機能',
            'ZIP エクスポート',
            '高度な Analytics',
            'AI クレジット無制限',
            '優先サポート',
        ],
        limits: {
            maxProjects: Infinity,
            canExportZip: true,
            advancedAnalytics: true,
            advancedEditor: true,
        },
    },
} as const;

export type PlanKey = keyof typeof PLANS;
