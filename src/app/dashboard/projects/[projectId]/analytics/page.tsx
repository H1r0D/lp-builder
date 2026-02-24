'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    ArrowLeft,
    Lock,
    Download,
    ExternalLink,
    MousePointerClick,
    Users,
    Eye,
    Activity,
    Sparkles
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    ComposedChart,
    AreaChart,
    Area
} from 'recharts';

// --- Dummy Data ---
const pvVisitorData = [
    { date: '10/01', pv: 4000, visitors: 2400 },
    { date: '10/05', pv: 3000, visitors: 1398 },
    { date: '10/10', pv: 2000, visitors: 9800 },
    { date: '10/15', pv: 2780, visitors: 3908 },
    { date: '10/20', pv: 1890, visitors: 4800 },
    { date: '10/25', pv: 2390, visitors: 3800 },
    { date: '10/30', pv: 3490, visitors: 4300 },
];

const sourceData = [
    { name: 'Google', value: 45, color: '#3b82f6' }, // blue
    { name: 'Instagram', value: 25, color: '#e1306c' }, // pink
    { name: 'X (Twitter)', value: 15, color: '#0f1419' }, // black
    { name: 'LINE', value: 10, color: '#06c755' }, // green
    { name: 'Direct', value: 5, color: '#94a3b8' }, // slate
];

const deviceData = [
    { name: 'Mobile', value: 75, color: '#8b5cf6' }, // violet
    { name: 'Desktop', value: 20, color: '#f59e0b' }, // amber
    { name: 'Tablet', value: 5, color: '#10b981' }, // emerald
];

const regionData = [
    { name: '東京都', value: 4500 },
    { name: '大阪府', value: 3200 },
    { name: '神奈川県', value: 2800 },
    { name: '愛知県', value: 2100 },
    { name: '福岡県', value: 1500 },
];

const funnelData = [
    { name: '訪問者', value: 10000, fill: '#bfdbfe' },
    { name: '詳細を開いた', value: 4500, fill: '#60a5fa' },
    { name: 'フォーム到達', value: 1200, fill: '#3b82f6' },
    { name: '送信完了 (CV)', value: 320, fill: '#1d4ed8' },
];

const scrollData = Array.from({ length: 101 }, (_, i) => {
    // スクロール率が上がるにつれて人数が減る曲線（指数減衰）をモックとして生成
    const baseUsers = 10000;
    let users = baseUsers;
    if (i > 0 && i <= 25) users = Math.round(baseUsers - (baseUsers * 0.2 * (i / 25)));
    else if (i > 25 && i <= 50) users = Math.round(baseUsers * 0.8 - (baseUsers * 0.3 * ((i - 25) / 25)));
    else if (i > 50 && i <= 75) users = Math.round(baseUsers * 0.5 - (baseUsers * 0.3 * ((i - 50) / 25)));
    else if (i > 75) users = Math.round(baseUsers * 0.2 - (baseUsers * 0.15 * ((i - 75) / 25)));

    // ガイアツ感のために少しブレさせる
    users = Math.max(0, users + Math.floor(Math.random() * 50 - 25));

    return {
        percent: i, // 0 to 100
        label: `${i}%`,
        users: i === 0 ? baseUsers : users
    };
});

export default function AnalyticsPage({ params }: { params: { projectId: string } }) {
    const router = useRouter();
    const [isProView, setIsProView] = useState(false);

    return (
        <DashboardShell>
            <div className="max-w-6xl mx-auto w-full space-y-8 pb-12">

                {/* 1. Page Header & Demo Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="h-10 w-10 rounded-full bg-white shadow-sm border border-slate-200 hover:bg-slate-50 text-slate-600 shrink-0"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                                春の新作キャンペーンLP <span className="text-slate-400 font-normal">-</span> アクセス解析
                            </h2>
                            <p className="text-xs font-medium text-slate-500 mt-1">過去30日間のデータ (2026/09/01 - 2026/09/30)</p>
                        </div>
                    </div>

                    {/* Demo Toggle */}
                    <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-slate-200 shrink-0">
                        <button
                            onClick={() => setIsProView(false)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${!isProView ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            プレビュー: Plus版
                        </button>
                        <button
                            onClick={() => setIsProView(true)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${isProView ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Pro版
                        </button>
                    </div>
                </div>

                {/* 2. Basic Analytics (Plus Plan) */}
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full" />
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-600">ページビュー (PV)</h3>
                                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-slate-800">19,550</p>
                                <div className="mt-2 flex items-center text-xs font-bold">
                                    <span className="text-emerald-500">+12.5%</span>
                                    <span className="text-slate-400 ml-2">前月比</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-violet-500/5 rounded-bl-full" />
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-600">訪問者数 (UU)</h3>
                                    <div className="bg-violet-50 text-violet-600 p-2 rounded-lg">
                                        <Users className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-slate-800">8,240</p>
                                <div className="mt-2 flex items-center text-xs font-bold">
                                    <span className="text-emerald-500">+8.2%</span>
                                    <span className="text-slate-400 ml-2">前月比</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/5 rounded-bl-full" />
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-600">直帰率</h3>
                                    <div className="bg-rose-50 text-rose-600 p-2 rounded-lg">
                                        <Activity className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-slate-800">42.8%</p>
                                <div className="mt-2 flex items-center text-xs font-bold">
                                    <span className="text-rose-500">+2.1%</span>
                                    <span className="text-slate-400 ml-2">前月比</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full" />
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-600">コンバージョン率</h3>
                                    <div className="bg-amber-50 text-amber-600 p-2 rounded-lg">
                                        <MousePointerClick className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-2xl font-black text-slate-800">3.2%</p>
                                <div className="mt-2 flex items-center text-xs font-bold">
                                    <span className="text-emerald-500">+0.8%</span>
                                    <span className="text-slate-400 ml-2">前月比</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* PV and Visitors Trend */}
                    <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white pt-6 px-2 lg:px-6">
                        <CardHeader className="px-4 lg:px-0 pt-0 pb-6">
                            <CardTitle className="text-base font-bold text-slate-800">アクセス推移</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0 pb-6 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={pvVisitorData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ fontWeight: 'bold', color: '#334155', marginBottom: '8px' }}
                                    />
                                    <Bar yAxisId="left" dataKey="visitors" name="訪問者数" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Line yAxisId="right" type="monotone" dataKey="pv" name="ページビュー" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Sources & Devices */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-slate-800">流入元 (参照元)</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[180px] flex flex-row items-center justify-center pt-2 pb-6">
                                <div className="w-1/2 h-full flex items-center justify-center relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sourceData}
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={4}
                                                dataKey="value"
                                                stroke="none"
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                            >
                                                {sourceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                                formatter={(value: any) => [`${value}%`, '割合']}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col animate-in fade-in zoom-in duration-700 delay-300">
                                        <span className="text-[10px] font-bold text-slate-400 mb-0.5">Top Source</span>
                                        <span className="text-xl font-black text-slate-800 leading-none">Google</span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col justify-center gap-3 pl-4 border-l border-slate-100">
                                    {sourceData.map((d, i) => (
                                        <div key={i} className="flex items-center justify-between animate-in slide-in-from-right-4 fade-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: d.color }}></div>
                                                <span className="text-xs font-bold text-slate-600">{d.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-800">{d.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-slate-800">デバイス比率</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[180px] flex flex-row items-center justify-center pt-2 pb-6">
                                <div className="w-1/2 h-full flex items-center justify-center relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={deviceData}
                                                innerRadius={45}
                                                outerRadius={65}
                                                paddingAngle={4}
                                                dataKey="value"
                                                stroke="none"
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                            >
                                                {deviceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                itemStyle={{ fontWeight: 'bold' }}
                                                formatter={(value: any) => [`${value}%`, '割合']}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col animate-in fade-in zoom-in duration-700 delay-300">
                                        <span className="text-[10px] font-bold text-slate-400 mb-0.5">Mobile</span>
                                        <span className="text-2xl font-black text-slate-800 leading-none">75<span className="text-lg">%</span></span>
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col justify-center gap-3 pl-4 border-l border-slate-100">
                                    {deviceData.map((d, i) => (
                                        <div key={i} className="flex items-center justify-between animate-in slide-in-from-right-4 fade-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: d.color }}></div>
                                                <span className="text-xs font-bold text-slate-600">{d.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-800">{d.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Regional Data */}
                    <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-base font-bold text-slate-800">アクセス地域トップ5</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={regionData}
                                    margin={{ top: 0, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#334155', fontWeight: 'bold' }} />
                                    <Tooltip
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" name="アクセス数" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* 3. Advanced Analytics (Pro Plan) + Paywall Overlay */}
                <div className="relative mt-12 pb-12">
                    <div className="flex items-center gap-2 mb-6 px-1">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">高度な分析（ガチ分析）</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Conversion Funnel */}
                            <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle className="text-base font-bold text-slate-800">コンバージョン・ファネル</CardTitle>
                                    <CardDescription className="text-xs">訪問からフォーム送信完了までの離脱推移</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={funnelData}
                                            layout="vertical"
                                            margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                                        >
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#475569', fontWeight: 'bold' }} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="value" barSize={32} radius={[0, 16, 16, 0]}>
                                                {funnelData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Scroll Depth */}
                            <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle className="text-base font-bold text-slate-800">スクロール到達率</CardTitle>
                                    <CardDescription className="text-xs">ページのどこまで読まれているか</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={scrollData}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis
                                                dataKey="percent"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fontSize: 11, fill: '#64748b' }}
                                                dy={10}
                                                tickFormatter={(value) => `${value}%`}
                                                ticks={[0, 25, 50, 75, 100]}
                                                domain={[0, 100]}
                                                type="number"
                                            />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                labelFormatter={(label) => `到達率: ${label}%`}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="users"
                                                name="到達人数"
                                                stroke="#8b5cf6"
                                                fillOpacity={1}
                                                fill="url(#colorUsers)"
                                                strokeWidth={2}
                                                animationDuration={2000}
                                                animationEasing="ease-in-out"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Downloads & Links */}
                        <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-slate-800">特定要素のクリック計測</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { title: '資料ダウンロードボタン', icon: <Download className="w-4 h-4 text-emerald-500" />, count: 142, trend: '+12%' },
                                        { title: '公式LINE友達追加リンク', icon: <ExternalLink className="w-4 h-4 text-blue-500" />, count: 89, trend: '+5%' },
                                        { title: '採用ページへの遷移', icon: <ExternalLink className="w-4 h-4 text-slate-500" />, count: 45, trend: '-2%' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                                                    <p className="text-xs text-slate-500 mt-0.5">直近30日のクリック数</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-black text-slate-800">{item.count}</div>
                                                <div className={`text-xs font-bold ${item.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                    {item.trend}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Paywall Overlay */}
                    {!isProView && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-md bg-white/40 rounded-3xl border border-white/50 shadow-[inset_0_0_100px_rgba(255,255,255,0.8)]">
                            <div className="max-w-md w-full text-center p-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-100 relative overflow-hidden">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500" />

                                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-100 shadow-sm">
                                    <Lock className="w-8 h-8 text-amber-500" />
                                </div>

                                <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">高度な分析機能は<br />Proプラン限定です</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8">
                                    ファネル分析、スクロール到達率、クリック計測などの「ガチ分析」を利用するには、Proプランへのアップグレードが必要です。
                                </p>

                                <Button
                                    className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                                >
                                    <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                                    Proプランへアップグレード
                                </Button>

                                <p className="text-[11px] font-bold text-slate-400 mt-4 underline decoration-slate-200 underline-offset-4 cursor-pointer hover:text-slate-600 transition-colors">
                                    プランごとの機能比較を見る
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </DashboardShell>
    );
}
