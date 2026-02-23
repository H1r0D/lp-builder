'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/components/providers/AuthProvider';
import { UpgradeModal } from '@/components/paywall/UpgradeModal';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

/* ─── ダミーデータ ─── */
const today = new Date();
const PV_DATA = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    return {
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        pv: Math.floor(Math.random() * 300) + 80,
    };
});

const REFERRER_DATA = [
    { name: 'Google 検索', value: 452, color: '#F59E0B' },
    { name: 'ダイレクト', value: 238, color: '#1E3A5F' },
    { name: 'SNS (X)', value: 187, color: '#6B7280' },
    { name: 'Instagram', value: 124, color: '#D97706' },
    { name: 'その他', value: 89, color: '#9CA3AF' },
];

const KPI_CARDS = [
    {
        label: '合計 PV',
        value: PV_DATA.reduce((sum, d) => sum + d.pv, 0).toLocaleString(),
        sub: '直近7日間',
        trend: '+12.4%',
        trendUp: true,
    },
    {
        label: 'CTAクリック数',
        value: '47',
        sub: 'お問い合わせボタン',
        trend: '+8.2%',
        trendUp: true,
    },
    {
        label: 'コンバージョン率',
        value: '3.8%',
        sub: 'クリック / PV',
        trend: '-0.3%',
        trendUp: false,
    },
];

/* ─── Icons ─── */
function IconTrendUp({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-.001m5.94 0-.002 5.94" />
        </svg>
    );
}

function IconTrendDown({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 5.834 5.585l.019.037m0 0 2.611.582m-2.611-.583L21.75 18" />
        </svg>
    );
}

function IconClipboard({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
    );
}

function IconCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

function IconCode({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
    );
}

/* ─── Custom Tooltip for BarChart ─── */
function CustomBarTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
    if (!active || !payload || payload.length === 0) return null;
    return (
        <div className="bg-[#1E3A5F] text-white text-xs rounded-lg px-3 py-2 shadow-lg">
            <p className="font-medium">{label}</p>
            <p className="text-amber mt-0.5">{payload[0].value.toLocaleString()} PV</p>
        </div>
    );
}

export default function AnalyticsPage() {
    const [copied, setCopied] = useState(false);

    const trackingCode = `<!-- AI LPO Builder Analytics -->
<script
  defer
  data-project="YOUR_PROJECT_ID"
  src="https://analytics.lpo-builder.com/track.js">
</script>`;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(trackingCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const { profile } = useAuth();
    const plan = profile?.subscription_plan || 'free';
    const isPro = plan === 'pro';
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    return (
        <DashboardShell>
            {/* ━━━ KPI Cards ━━━ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {KPI_CARDS.map((card) => (
                    <div
                        key={card.label}
                        className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{card.label}</span>
                            <span
                                className={`flex items-center gap-0.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${card.trendUp
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-red-50 text-red-500'
                                    }`}
                            >
                                {card.trendUp ? (
                                    <IconTrendUp className="w-3 h-3" />
                                ) : (
                                    <IconTrendDown className="w-3 h-3" />
                                )}
                                {card.trend}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-foreground tracking-tight">{card.value}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">{card.sub}</p>
                    </div>
                ))}
            </div>

            {/* ━━━ Charts Row (Paywall for non-Pro) ━━━ */}
            <div className="relative">
                {!isPro && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
                        <div className="text-center p-6">
                            <div className="w-12 h-12 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-amber" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-foreground mb-1">高度な Analytics</h3>
                            <p className="text-xs text-muted-foreground mb-3">Pro プランで詳細なデータを確認できます</p>
                            <button
                                onClick={() => setShowUpgradeModal(true)}
                                className="bg-amber hover:bg-amber/90 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-colors shadow-sm"
                            >
                                Pro にアップグレード
                            </button>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
                    {/* PV 棒グラフ — 3/5 */}
                    <div className="lg:col-span-3 bg-white rounded-xl border border-border p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-sm font-semibold text-foreground">PV推移</h2>
                                <p className="text-[11px] text-muted-foreground">直近7日間のページビュー</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-amber font-medium bg-amber/10 px-2.5 py-1 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-amber" />
                                ページビュー
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PV_DATA} barCategoryGap="25%">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 11 }}
                                        width={35}
                                    />
                                    <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(245,158,11,0.06)' }} />
                                    <Bar dataKey="pv" fill="#F59E0B" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 流入元 円グラフ — 2/5 */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-border p-5">
                        <div className="mb-4">
                            <h2 className="text-sm font-semibold text-foreground">流入元</h2>
                            <p className="text-[11px] text-muted-foreground">アクセス元の内訳</p>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={REFERRER_DATA}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={48}
                                        outerRadius={72}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {REFERRER_DATA.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        formatter={(value?: number) => [`${value ?? 0} 件`, '']}
                                        contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Legend List */}
                        <div className="space-y-2 mt-2">
                            {REFERRER_DATA.map((item) => {
                                const total = REFERRER_DATA.reduce((s, d) => s + d.value, 0);
                                const pct = ((item.value / total) * 100).toFixed(1);
                                return (
                                    <div key={item.name} className="flex items-center justify-between text-[12px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-foreground">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-muted-foreground">{item.value}</span>
                                            <span className="text-foreground font-medium w-12 text-right">{pct}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ━━━ Tracking Code ━━━ */}
                <div className="bg-white rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center">
                            <IconCode className="w-4 h-4 text-[#1E3A5F]" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-foreground">トラッキングコード</h2>
                            <p className="text-[11px] text-muted-foreground">
                                出力したHTMLの <code className="bg-secondary px-1 py-0.5 rounded text-[10px]">&lt;head&gt;</code> 内にこのスニペットを貼り付けてください
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-[#1E3A5F] rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 bg-[#16304F] border-b border-white/10">
                            <span className="text-[11px] text-white/60 font-mono">HTML</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
                            >
                                {copied ? (
                                    <>
                                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-emerald-400">コピーしました</span>
                                    </>
                                ) : (
                                    <>
                                        <IconClipboard className="w-3.5 h-3.5" />
                                        コピー
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="p-4 text-[12px] text-white/90 font-mono leading-relaxed overflow-x-auto">
                            <code>{trackingCode}</code>
                        </pre>
                    </div>

                    <div className="mt-3 flex items-start gap-2 text-[11px] text-muted-foreground bg-amber/5 border border-amber/20 rounded-lg px-3 py-2.5">
                        <svg className="w-4 h-4 text-amber shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>
                            <code className="bg-white px-1 py-0.5 rounded font-mono">YOUR_PROJECT_ID</code> をSupabaseのプロジェクトIDに置き換えてください。計測データは数時間後から反映されます。
                        </span>
                    </div>
                </div>
            </div>

            {/* Upgrade Modal */}
            <UpgradeModal
                open={showUpgradeModal}
                onOpenChange={setShowUpgradeModal}
                featureName="高度な Analytics"
            />
        </DashboardShell>
    );
}
