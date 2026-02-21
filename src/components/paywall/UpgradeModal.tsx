'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/providers/AuthProvider';

/* ─── Icons ─── */
function IconCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

function IconStar({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

function IconLock({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

const PLANS = [
    {
        key: 'free' as const,
        name: 'Free',
        price: '¥0',
        period: '',
        description: 'まずはお試し',
        features: [
            'LP 1件まで作成',
            'かんたんモードのみ',
            '基本テンプレート',
            'クレジット 3回分',
        ],
        cta: '現在のプラン',
        highlight: false,
        color: 'bg-secondary text-muted-foreground',
    },
    {
        key: 'starter' as const,
        name: 'Starter',
        price: '¥2,980',
        period: '/ 月',
        description: '本格運用に最適',
        features: [
            'LP 5件まで作成',
            'かんたん + 通常モード',
            'ZIP エクスポート',
            'クレジット 30回 / 月',
        ],
        cta: 'アップグレード',
        highlight: false,
        color: 'bg-brand/10 text-brand',
    },
    {
        key: 'pro' as const,
        name: 'Pro',
        price: '¥9,800',
        period: '/ 月',
        description: 'すべてが無制限',
        features: [
            'LP 無制限',
            '全エディタ機能',
            'ZIP エクスポート',
            '高度な Analytics',
            'AI クレジット無制限',
            '優先サポート',
        ],
        cta: 'アップグレード',
        highlight: true,
        color: 'bg-amber/10 text-amber',
    },
];

interface UpgradeModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    featureName?: string;
}

export function UpgradeModal({ open, onOpenChange, featureName }: UpgradeModalProps) {
    const { user, profile } = useAuth();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const currentPlan = profile?.subscription_plan || 'free';

    const handleUpgrade = async (planKey: 'starter' | 'pro') => {
        if (!user) return;
        setLoadingPlan(planKey);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planKey,
                    userId: user.id,
                    userEmail: user.email,
                }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || 'エラーが発生しました');
            }
        } catch {
            alert('通信エラーが発生しました');
        } finally {
            setLoadingPlan(null);
        }
    };

    // プランの順位
    const planOrder = { free: 0, starter: 1, pro: 2 };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
                <DialogHeader className="px-6 pt-5 pb-3 bg-gradient-to-b from-[#1E3A5F]/5 to-transparent">
                    <div className="flex items-center gap-2 mb-1">
                        <IconLock className="w-5 h-5 text-amber" />
                        <DialogTitle className="text-lg font-bold text-foreground">
                            プランをアップグレード
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-muted-foreground">
                        {featureName
                            ? `「${featureName}」を利用するには、プランのアップグレードが必要です。`
                            : 'より多くの機能を利用するには、プランをアップグレードしてください。'}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 pb-5">
                    <div className="flex flex-col gap-3">
                        {PLANS.map((plan) => {
                            const isCurrent = plan.key === currentPlan;
                            const isDowngrade = planOrder[plan.key] < planOrder[currentPlan as keyof typeof planOrder];
                            const isHigher = planOrder[plan.key] > planOrder[currentPlan as keyof typeof planOrder];

                            return (
                                <div
                                    key={plan.key}
                                    className={`relative rounded-xl border-2 p-4 transition-all flex flex-col sm:flex-row gap-4 sm:justify-between ${plan.highlight
                                        ? 'border-amber shadow-lg shadow-amber/10 scale-[1.01]'
                                        : isCurrent
                                            ? 'border-brand/30 bg-brand/3'
                                            : 'border-border hover:border-border/80'
                                        }`}
                                >
                                    {/* Left Side: Details & Features */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                                            {plan.highlight && (
                                                <Badge className="bg-amber text-white text-[10px] px-2 py-0.5 shadow-sm h-5">
                                                    <IconStar className="w-3 h-3 mr-1" />
                                                    人気
                                                </Badge>
                                            )}
                                            {isCurrent && (
                                                <Badge className="bg-brand text-white text-[10px] px-2 py-0.5 h-5">
                                                    現在のプラン
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-[12px] text-muted-foreground mt-0.5">{plan.description}</p>

                                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-4 gap-y-1.5 mt-3">
                                            {plan.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-[12px]">
                                                    <IconCheck
                                                        className={`w-3.5 h-3.5 shrink-0 ${plan.highlight ? 'text-amber' : 'text-brand'
                                                            }`}
                                                    />
                                                    <span className="text-foreground leading-tight">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Right Side: Price & CTA */}
                                    <div className="sm:w-56 shrink-0 flex flex-col items-center sm:items-end justify-center sm:text-right border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-5 mt-2 sm:mt-0">
                                        <div className="mb-3 text-center sm:text-right">
                                            <span className="text-2xl font-extrabold text-foreground">{plan.price}</span>
                                            {plan.period && (
                                                <span className="text-xs text-muted-foreground ml-0.5">{plan.period}</span>
                                            )}
                                        </div>

                                        {isCurrent ? (
                                            <Button disabled className="w-full h-9 text-xs" variant="outline">
                                                現在のプラン
                                            </Button>
                                        ) : isDowngrade ? (
                                            <Button disabled className="w-full h-9 text-xs" variant="outline">
                                                ダウングレード不可
                                            </Button>
                                        ) : isHigher && plan.key !== 'free' ? (
                                            <Button
                                                className={`w-full h-9 text-xs font-semibold transition-all ${plan.highlight
                                                    ? 'bg-amber hover:bg-amber/90 text-white shadow-sm'
                                                    : 'bg-brand hover:bg-brand/90 text-white'
                                                    }`}
                                                onClick={() => handleUpgrade(plan.key as 'starter' | 'pro')}
                                                disabled={loadingPlan !== null}
                                            >
                                                {loadingPlan === plan.key ? (
                                                    <span className="flex items-center gap-1.5">
                                                        <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                        </svg>
                                                        処理中...
                                                    </span>
                                                ) : (
                                                    `${plan.name} にアップグレード`
                                                )}
                                            </Button>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <p className="text-[10px] text-muted-foreground text-center mt-4">
                        すべてのプランにはSSL暗号化、セキュアなデータ保存が含まれます。いつでもキャンセル可能です。
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
