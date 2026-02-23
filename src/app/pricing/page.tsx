"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Check, Minus, ChevronDown, MonitorOff, Globe, LayoutTemplate,
    Share2, BarChart, Download, Sparkles, CalendarDays, MousePointerClick,
    CreditCard, FileText, Bot, HelpCircle
} from 'lucide-react';
import { SiHatenabookmark } from 'react-icons/si';
import { FaLine, FaXTwitter, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcJcb } from 'react-icons/fa6';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export default function PricingPage() {
    const router = useRouter();
    const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [selectedCycle, setSelectedCycle] = useState<'yearly' | 'monthly'>('yearly');

    const handleSelectPlan = (planName: string) => {
        if (planName === 'Free') {
            // Free plan doesn't need billing selection, just standard logic
            console.log("Selected Free Plan");
            return;
        }
        setSelectedPlan(planName);
        setIsBillingModalOpen(true);
    };

    const scrollToFeatures = () => {
        const element = document.getElementById('feature-matrix');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand/20 relative">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none z-0"></div>

            {/* 1. Standalone Header & Stepper */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-6 px-4 md:px-8 text-center sticky top-0 z-40 shadow-sm relative">
                <Link href="/" className="inline-block relative z-10 hover:opacity-80 transition-opacity">
                    <span className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center justify-center gap-2">
                        <span className="bg-brand text-white px-2 py-1 rounded-md text-xl leading-none shadow-sm">LPO</span>
                        AI LPO Builder
                    </span>
                </Link>

                <div className="max-w-2xl mx-auto mt-10 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

                    <div className="flex justify-between relative z-10 w-full px-4">
                        {/* Step 1: Active */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30 ring-4 ring-white">1</div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 tracking-wide">プラン選択</span>
                        </div>
                        {/* Step 2: Inactive */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-base ring-4 ring-white">2</div>
                            <span className="text-xs md:text-sm font-bold text-slate-400 tracking-wide">お支払方法確認</span>
                        </div>
                        {/* Step 3: Inactive */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-base ring-4 ring-white">3</div>
                            <span className="text-xs md:text-sm font-bold text-slate-400 tracking-wide">申込完了</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 px-4 py-1.5 text-sm font-medium shadow-sm">
                        現在の設定： <strong className="ml-1 text-slate-800">Freeプラン</strong>
                    </Badge>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-16 space-y-24">

                {/* 2. Pricing Cards */}
                <section>
                    <div className="text-center mb-12 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">プランを選択してください</h1>
                        <p className="text-slate-500 font-medium">14日間の無料トライアルで、すべての機能をお試しいただけます。</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">

                        {/* Free Plan */}
                        <Card className="border-t-4 border-slate-400 border-x-slate-200 border-b-slate-200 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
                            <CardHeader className="text-center pb-8 pt-10">
                                <CardTitle className="text-xl font-bold text-slate-600 mb-2">Free</CardTitle>
                                <div className="text-4xl font-extrabold text-slate-900 mb-2">¥0<span className="text-lg text-slate-400 font-medium">/月</span></div>
                                <CardDescription className="text-sm">基本的なページ作成を無料で体験</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3 text-sm text-slate-600 font-medium pb-8 border-b border-slate-100">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 公開ページ数：最大3ページ</li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 標準デザインテンプレート</li>
                                    <li className="flex items-center gap-3 text-slate-400"><Minus className="w-4 h-4 shrink-0" /> 独自ドメイン非対応</li>
                                    <li className="flex items-center gap-3 text-slate-400"><Minus className="w-4 h-4 shrink-0" /> 広告表示あり</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-2 pb-10">
                                <Button
                                    variant="outline"
                                    className="w-full h-12 font-bold text-[15px] border-slate-300 text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700"
                                    onClick={() => handleSelectPlan('Free')}
                                    disabled={true}
                                >
                                    現在のご契約プラン
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan (Highlighted) */}
                        <Card className="border-t-4 border-amber-500 border-x-amber-200 border-b-amber-200 shadow-2xl relative overflow-hidden -mt-4 z-10 bg-white ring-2 ring-amber-500/20 ring-offset-2 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] hover:-translate-y-2">
                            <div className="absolute top-4 right-4 bg-red-100 text-red-600 font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-sm border border-red-200">
                                <Sparkles className="w-3 h-3" /> おすすめ
                            </div>
                            <CardHeader className="text-center pb-8 pt-12">
                                <CardTitle className="text-2xl font-extrabold text-amber-500 mb-2">Pro</CardTitle>
                                <div className="text-5xl font-extrabold text-slate-900 mb-2">¥9,800<span className="text-lg text-slate-400 font-medium">/月</span></div>
                                <CardDescription className="text-sm text-slate-600 font-medium">本格的なビジネス運用に最適</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3 text-sm text-slate-700 font-bold pb-8 border-b border-slate-100">
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 shrink-0" /> 公開ページ数：無制限</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 shrink-0" /> 独自ドメイン無制限</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 shrink-0" /> 広告完全非表示</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 shrink-0" /> すべての拡張機能が利用可能</li>
                                    <li className="flex items-center gap-3"><Check className="w-5 h-5 text-amber-500 shrink-0" /> 優先カスタマーサポート</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-2 pb-10">
                                <Button
                                    className="w-full h-14 font-bold text-[16px] bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 transition-all"
                                    onClick={() => handleSelectPlan('Pro')}
                                >
                                    このプランを選択する
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Plus Plan */}
                        <Card className="border-t-4 border-blue-600 border-x-slate-200 border-b-slate-200 shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
                            <CardHeader className="text-center pb-8 pt-10">
                                <CardTitle className="text-xl font-bold text-blue-600 mb-2">Plus</CardTitle>
                                <div className="text-4xl font-extrabold text-slate-900 mb-2">¥2,980<span className="text-lg text-slate-400 font-medium">/月</span></div>
                                <CardDescription className="text-sm">独自ドメインで本格スタート</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="space-y-3 text-sm text-slate-600 font-medium pb-8 border-b border-slate-100">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 公開ページ数：最大10ページ</li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 独自ドメイン設定可能（1つ）</li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 広告非表示</li>
                                    <li className="flex items-center gap-3 text-slate-400"><Minus className="w-4 h-4 shrink-0" /> 一部の高度な拡張機能は非対応</li>
                                </ul>
                            </CardContent>
                            <CardFooter className="pt-2 pb-10">
                                <Button
                                    className="w-full h-12 font-bold text-[15px] bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
                                    onClick={() => handleSelectPlan('Plus')}
                                >
                                    このプランを選択する
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>

                    <div className="text-center mt-12">
                        <button
                            onClick={scrollToFeatures}
                            className="inline-flex flex-col items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand transition-colors group"
                        >
                            利用できる拡張機能を見る
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            </div>
                        </button>
                    </div>
                </section>

                {/* 3. Feature Comparison Matrix */}
                <section id="feature-matrix" className="scroll-mt-32">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-slate-900">プラン別機能比較表</h2>
                        <p className="text-sm text-slate-500 mt-2">各プランごとの対応機能詳細です。</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
                        {/* Table Header */}
                        <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 text-sm font-bold text-slate-600 sticky top-0 z-10">
                            <div className="col-span-1 p-4 flex items-center justify-center border-r border-slate-200">機能名</div>
                            <div className="p-4 text-center text-amber-600 bg-amber-50/50 border-r border-slate-200">Pro</div>
                            <div className="p-4 text-center text-blue-600 bg-blue-50/30 border-r border-slate-200">Plus</div>
                            <div className="p-4 text-center text-slate-500">Free</div>
                        </div>

                        {/* Accordion Categories */}
                        <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4", "item-5"]} className="w-full">

                            {/* Category 1: Page Creation */}
                            <AccordionItem value="item-1" className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="px-6 py-4 bg-slate-50 hover:bg-slate-100 hover:no-underline font-bold text-slate-800 transition-colors">
                                    <div className="flex items-center gap-2"><LayoutTemplate className="w-4 h-4 text-slate-400" /> ページ作成・管理機能</div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="divide-y divide-slate-100">
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">公開可能ページ数上限</div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-amber-50/60">無制限</div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-blue-50">10ページ</div>
                                            <div className="p-4 text-center text-slate-500 font-medium transform">3ページ</div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">独自ドメイン設定</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-blue-50">1ドメイン</div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">広告の非表示</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">フォーム設置</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">ファイルダウンロード機能</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors bg-slate-50/30">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium relative">AIおまかせ生成 <Badge className="absolute scale-[0.7] transform -translate-y-1/2 ml-1 mt-1 border-none bg-blue-100 text-blue-700 font-bold px-1.5 py-0 h-4 rounded text-[9px]">AI</Badge></div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-amber-50/60">無制限</div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-blue-50">月10回まで</div>
                                            <div className="p-4 text-center font-bold text-slate-500">月3回まで</div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Category 2: Reservation */}
                            <AccordionItem value="item-2" className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="px-6 py-4 bg-slate-50 hover:bg-slate-100 hover:no-underline font-bold text-slate-800 transition-colors">
                                    <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-slate-400" /> 予約機能 <Badge className="ml-2 bg-slate-200 text-slate-500 border-none px-1.5 h-4 text-[9px]">COMING SOON</Badge></div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="divide-y divide-slate-100 opacity-70">
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">ネット予約受付</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">コース別予約管理</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Category 3: Payment */}
                            <AccordionItem value="item-3" className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="px-6 py-4 bg-slate-50 hover:bg-slate-100 hover:no-underline font-bold text-slate-800 transition-colors">
                                    <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-slate-400" /> 決済機能 <Badge className="ml-2 bg-slate-200 text-slate-500 border-none px-1.5 h-4 text-[9px]">COMING SOON</Badge></div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="divide-y divide-slate-100 opacity-70">
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">Stripe連携による販売</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">定期課金（サブスク）販売</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Category 4: Marketing */}
                            <AccordionItem value="item-4" className="border-b border-slate-100 last:border-0">
                                <AccordionTrigger className="px-6 py-4 bg-slate-50 hover:bg-slate-100 hover:no-underline font-bold text-slate-800 transition-colors">
                                    <div className="flex items-center gap-2"><BarChart className="w-4 h-4 text-slate-400" /> マーケティング機能</div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="divide-y divide-slate-100">
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">高度なアクセス解析</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">SNS連携（タイムライン埋込など）</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">カスタムコード埋め込み</div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-amber-50/60"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center border-r border-slate-100 flex items-center justify-center bg-blue-50"><Check className="w-5 h-5 mx-auto text-emerald-500" /></div>
                                            <div className="p-4 text-center flex items-center justify-center"><Minus className="w-5 h-5 mx-auto text-slate-300" /></div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Category 5: Others */}
                            <AccordionItem value="item-5" className="border-0">
                                <AccordionTrigger className="px-6 py-4 bg-slate-50 hover:bg-slate-100 hover:no-underline font-bold text-slate-800 transition-colors">
                                    <div className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-slate-400" /> その他サービス・サポート等</div>
                                </AccordionTrigger>
                                <AccordionContent className="p-0">
                                    <div className="divide-y divide-slate-100">
                                        <div className="grid grid-cols-4 text-sm hover:bg-slate-50/50 transition-colors">
                                            <div className="col-span-1 p-4 border-r border-slate-100 text-slate-700 font-medium">チャットサポート</div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-amber-50/60">優先対応</div>
                                            <div className="p-4 text-center border-r border-slate-100 font-bold text-slate-900 bg-blue-50">標準対応</div>
                                            <div className="p-4 text-center font-bold text-slate-500">標準対応</div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </div>
                </section>

                {/* 4. Payment Methods */}
                <section className="max-w-5xl mx-auto w-full">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                            <CreditCard className="w-6 h-6 text-brand" /> お支払方法について
                        </h2>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="flex justify-center md:justify-start gap-4 text-slate-300">
                                <FaCcVisa className="w-12 h-12 text-blue-800 hover:opacity-80 transition-opacity" />
                                <FaCcMastercard className="w-12 h-12 text-[#EB001B] hover:opacity-80 transition-opacity" />
                                <FaCcAmex className="w-12 h-12 text-blue-500 hover:opacity-80 transition-opacity" />
                                <FaCcJcb className="w-12 h-12 text-green-600 hover:opacity-80 transition-opacity" />
                            </div>
                            <div className="text-center md:text-left space-y-2">
                                <h3 className="font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-500" /> 安心のセキュリティ
                                </h3>
                                <p className="text-sm text-slate-500">
                                    各種クレジットカードがご利用いただけます。お支払いはStripe社を通じて安全に暗号化処理され、カード情報が当サイトに保存されることはありません。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. FAQ */}
                <section className="max-w-5xl mx-auto w-full pb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                            <HelpCircle className="w-6 h-6 text-brand" /> よくある質問
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full bg-white rounded-xl border border-slate-200 shadow-sm px-2">
                        <AccordionItem value="faq-1" className="border-slate-100">
                            <AccordionTrigger className="text-left font-bold text-[15px] hover:text-brand px-4">
                                無料トライアル期間満了後、有料プランに自動的に切り替わるのか？
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed px-4 pb-4">
                                いいえ、自動的に課金されることはございません。トライアル期間終了後は、一部機能が制限された無料プランへ自動的に移行しますのでご安心ください。引き続きプレミアム機能をご利用になりたい場合は、ダッシュボードから手動でアップグレード手続きをお願いいたします。
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-2" className="border-slate-100">
                            <AccordionTrigger className="text-left font-bold text-[15px] hover:text-brand px-4">
                                プラン契約中のアップ・ダウングレードへの対応について教えてください。
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed px-4 pb-4">
                                <strong>アップグレード：</strong> いつでも可能です。日割り計算を行い、お支払い完了後すぐに新プランの全機能をご利用いただけます。<br />
                                <strong>ダウングレード：</strong> 次回の更新日から新プランが適用されます。すでにお支払いいただいた期間分の差額返金はいたしかねますので、あらかじめご了承ください。
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-3" className="border-none">
                            <AccordionTrigger className="text-left font-bold text-[15px] hover:text-brand px-4">
                                領収書や適格請求書（インボイス）の発行は可能ですか？
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed px-4 pb-4">
                                はい、可能です。ご契約完了後、マイページの「アカウント設定」＞「決済情報」画面より、ご契約ごとの領収書データをPDFにていつでもダウンロードしていただけます。当方は適格請求書発行事業者に登録しております。
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>

            </main>

            {/* Billing Selection Modal (Dialog) */}
            <Dialog open={isBillingModalOpen} onOpenChange={setIsBillingModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">お支払いサイクルを選択</DialogTitle>
                        <DialogDescription className="text-center pt-2 pb-4">
                            <strong>{selectedPlan}プラン</strong> の契約期間をお選びください。<br />年払いなら実質2ヶ月分がお得になります。
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <button
                            className={`relative w-full border-2 p-5 rounded-xl text-left transition-all flex items-center justify-between group ${selectedCycle === 'yearly' ? 'border-brand bg-brand/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                            onClick={() => setSelectedCycle('yearly')}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-bounce shadow-sm">
                                一番お得（20% OFF!）
                            </div>
                            <div>
                                <h4 className={`font-bold text-lg transition-colors ${selectedCycle === 'yearly' ? 'text-brand' : 'text-slate-800 group-hover:text-brand'}`}>年額払い</h4>
                                <p className="text-sm text-slate-500 font-medium mt-1">
                                    {selectedPlan === 'Pro' ? '¥94,080 / 年' : '¥28,600 / 年'} <span className="text-xs">（一括支払い）</span>
                                </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCycle === 'yearly' ? 'border-brand' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                <div className={`w-3 h-3 rounded-full bg-brand transition-opacity ${selectedCycle === 'yearly' ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'}`}></div>
                            </div>
                        </button>

                        <button
                            className={`w-full border-2 p-5 rounded-xl text-left transition-all flex items-center justify-between group ${selectedCycle === 'monthly' ? 'border-brand bg-brand/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                            onClick={() => setSelectedCycle('monthly')}
                        >
                            <div>
                                <h4 className={`font-bold text-lg transition-colors ${selectedCycle === 'monthly' ? 'text-brand' : 'text-slate-700 group-hover:text-slate-900'}`}>月額払い</h4>
                                <p className="text-sm text-slate-500 font-medium mt-1">
                                    {selectedPlan === 'Pro' ? '¥9,800 / 月' : '¥2,980 / 月'} <span className="text-xs">（毎月自動更新）</span>
                                </p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCycle === 'monthly' ? 'border-brand' : 'border-slate-300 group-hover:border-slate-400'}`}>
                                <div className={`w-3 h-3 rounded-full bg-brand transition-opacity ${selectedCycle === 'monthly' ? 'opacity-100' : 'opacity-0 group-hover:opacity-20'}`}></div>
                            </div>
                        </button>
                    </div>

                    <DialogFooter className="mt-6">
                        <Button
                            className="w-full font-bold h-12 text-[15px] bg-slate-900 hover:bg-slate-800 shadow-lg text-white"
                            onClick={() => {
                                setIsBillingModalOpen(false);
                                router.push(`/pricing/checkout?plan=${selectedPlan}&cycle=${selectedCycle}`);
                            }}
                        >
                            クレジットカード情報等の入力へ進む
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 6. Footer */}
            <footer className="bg-slate-900 pt-16 pb-8 px-4 md:px-8 border-t border-slate-800 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col items-center">

                    {/* Legal Links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-400 mb-10 w-full">
                        <Link href="/terms" className="hover:text-white transition-colors">利用規約</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                        <Link href="/legal" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link>
                        <Link href="/antisocial" className="hover:text-white transition-colors">反社会的勢力に対する基本方針</Link>
                        <Link href="/security" className="hover:text-white transition-colors">情報セキュリティ基本方針</Link>
                    </div>

                    {/* SNS Icons */}
                    <div className="flex items-center justify-center gap-5 w-full mb-10">
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:bg-[#00A4DE] hover:text-white border-slate-700 hover:border-transparent transition-all shadow-sm">
                            <SiHatenabookmark className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:bg-[#06C755] hover:text-white border-slate-700 hover:border-transparent transition-all shadow-sm">
                            <FaLine className="w-6 h-6" />
                        </Button>
                        <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 hover:bg-black hover:text-white border-slate-700 hover:border-transparent transition-all shadow-sm">
                            <FaXTwitter className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="text-center w-full border-t border-slate-800 pt-8 flex items-center justify-center gap-2">
                        <span className="font-extrabold text-white text-lg tracking-tight bg-slate-800 px-2 py-0.5 rounded mr-2">N</span>
                        <p className="text-sm font-medium text-slate-500">
                            &copy; 2026 AI LPO Builder All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
