'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Settings } from 'lucide-react';

/* ─── Icons ─── */
function IconArrowLeft({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    );
}

function IconCheckCircle({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

function IconLayout({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22.5 15.75l-5.159-5.159a2.25 2.25 0 00-3.182 0l-5.159 5.159m15 0l-1.409-1.409a2.25 2.25 0 00-3.182 0l-2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    );
}

export default function QuestSettingsPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        const targetValue = 60; // 3 out of 5 complete (mock)

        // Animate the actual progress bar immediately
        const timer = setTimeout(() => {
            setProgress(targetValue);
        }, 100);

        // Count-up animation for the percentage number
        let current = 0;
        const duration = 1000; // ms
        const interval = 20; // ms
        const steps = duration / interval;
        const increment = targetValue / steps;

        const countTimer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                setDisplayProgress(targetValue);
                clearInterval(countTimer);
            } else {
                setDisplayProgress(Math.floor(current));
            }
        }, interval);

        return () => {
            clearTimeout(timer);
            clearInterval(countTimer);
        };
    }, []);

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">

                {/* Header & Target Page Info */}
                <div className="flex flex-col items-center justify-center space-y-4 pt-4">
                    <div className="flex items-center gap-4 w-full justify-start md:justify-center relative">
                        <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 absolute left-0 hidden md:flex">
                            <IconArrowLeft className="w-5 h-5 text-slate-500" />
                        </Button>
                        <div className="flex items-center gap-2.5">
                            <Settings className="w-6 h-6 text-blue-500" />
                            <h1 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                                ページの基本設定
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col items-center bg-slate-50/80 p-3 px-6 rounded-xl border border-slate-100">
                        <p className="font-bold text-lg text-slate-800">株式会社〇〇 コーポレートサイト</p>
                        <p className="text-sm text-slate-500 font-medium">https://example.com/mock-site-url</p>
                    </div>
                </div>

                {/* Tabs Area */}
                <Card className="shadow-sm border-slate-200/80 bg-white overflow-hidden rounded-xl">
                    <Tabs defaultValue="basic" className="w-full">
                        <div className="border-b border-slate-100 px-6 mt-4">
                            <TabsList className="bg-transparent h-12 w-full justify-start gap-4 p-0">
                                <TabsTrigger
                                    value="basic"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:shadow-md data-[state=active]:text-white data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:hover:text-slate-700 rounded-lg px-4 py-2 font-bold text-[14px] transition-all"
                                >
                                    設定①　基本設定
                                </TabsTrigger>
                                <TabsTrigger
                                    value="search-console"
                                    className="data-[state=active]:bg-blue-600 data-[state=active]:shadow-md data-[state=active]:text-white data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:hover:text-slate-700 rounded-lg px-4 py-2 font-bold text-[14px] transition-all"
                                >
                                    設定②　分析機能設定
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-6 md:p-8 bg-slate-50/50 min-h-[500px]">
                            {/* Tab 1: Basic Info */}
                            <TabsContent value="basic" className="space-y-6 mt-0 outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ease-out fill-mode-both">
                                {/* 1. Animated Progress Meter */}
                                <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col items-center justify-center relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/20 via-brand to-brand/20" />
                                    <h2 className="text-sm font-bold text-slate-600 mb-6 flex items-center gap-2">
                                        現在の設定完了率: <span className="text-3xl font-black text-brand tracking-tight ml-1">{displayProgress}%</span>
                                    </h2>
                                    <div className="w-full max-w-2xl">
                                        <Progress value={progress} className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200" indicatorClassName="bg-gradient-to-r from-cyan-400 to-brand transition-all duration-1000 ease-out" />
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-400 mt-4">すべての設定を100%にして、集客効果を最大化しましょう！</p>
                                </div>

                                {/* Quests List Container */}
                                <div className="flex flex-col gap-4">

                                    {/* Quest 1: Publish Page (Completed Example) */}
                                    <div className="bg-emerald-50/30 border-2 border-emerald-500/20 shadow-sm rounded-xl overflow-hidden relative transition-colors">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400" />
                                        <div className="p-5 pl-7 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <IconCheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                                                    <h3 className="text-[15px] font-bold text-slate-800">ページを「公開」にしよう！</h3>
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold border-none h-5 px-2">達成済み</Badge>
                                                </div>
                                                <div className="text-xs font-bold text-slate-600 pl-8 mt-2 flex items-center gap-1.5">
                                                    現在：<span className="text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">公開中です</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full md:w-auto h-10 border-slate-200 shrink-0 bg-white text-slate-600 font-bold hover:bg-slate-50">
                                                設定する
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Quest 2: Title (Completed Example) */}
                                    <div className="bg-emerald-50/30 border-2 border-emerald-500/20 shadow-sm rounded-xl overflow-hidden relative transition-colors">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400" />
                                        <div className="p-5 pl-7 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-emerald-500/10">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <IconCheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                                                    <h3 className="text-[15px] font-bold text-slate-800">ページ名（タイトル）を決めよう！</h3>
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold border-none h-5 px-2">達成済み</Badge>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full md:w-auto h-10 border-slate-200 shrink-0 bg-white text-slate-600 font-bold hover:bg-slate-50">
                                                設定する
                                            </Button>
                                        </div>
                                        <Accordion type="single" collapsible className="w-full px-5 pl-7 bg-white/50">
                                            <AccordionItem value="explanation" className="border-none">
                                                <AccordionTrigger className="text-[11px] font-bold text-slate-500 hover:text-brand hover:no-underline py-3 px-1">
                                                    解説を見る
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-4 px-1">
                                                    ページ名は、インターネット上の「お店の看板」です。Google検索されたときや、SNSでシェアされたときに一番大きく表示されます。<br />
                                                    ここを魅力的な名前にするだけで、「おっ、この記事気になるな」とクリックされる確率がグッと上がります！
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                    {/* Quest 3: Description (Completed Example) */}
                                    <div className="bg-emerald-50/30 border-2 border-emerald-500/20 shadow-sm rounded-xl overflow-hidden relative transition-colors">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-400" />
                                        <div className="p-5 pl-7 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-emerald-500/10">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <IconCheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
                                                    <h3 className="text-[15px] font-bold text-slate-800">ページの説明文（ディスクリプション）を決めよう！</h3>
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold border-none h-5 px-2">達成済み</Badge>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full md:w-auto h-10 border-slate-200 shrink-0 bg-white text-slate-600 font-bold hover:bg-slate-50">
                                                設定する
                                            </Button>
                                        </div>
                                        <Accordion type="single" collapsible className="w-full px-5 pl-7 bg-white/50">
                                            <AccordionItem value="explanation" className="border-none">
                                                <AccordionTrigger className="text-[11px] font-bold text-slate-500 hover:text-brand hover:no-underline py-3 px-1">
                                                    解説を見る
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-4 px-1">
                                                    検索結果で、タイトルのすぐ下に表示される短い説明文のことです。<br />
                                                    ここにお店の強みや「誰に向けたサービスか」をしっかり書いておくことで、検索した人が「まさに自分が探していたページだ！」と安心してサイトを訪問してくれます。
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                    {/* Quest 4: Favicon (Incomplete Example) */}
                                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden relative hover:border-brand/40 transition-colors">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200" />
                                        <div className="p-5 pl-7 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-slate-100">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                                    </div>
                                                    <h3 className="text-[15px] font-bold text-slate-800">ファビコン(サイトアイコン)を決めよう！</h3>
                                                </div>
                                            </div>
                                            <Button className="w-full md:w-auto h-10 bg-brand hover:bg-brand/90 text-white font-bold shrink-0 shadow-sm shadow-brand/20">
                                                設定する
                                            </Button>
                                        </div>
                                        <Accordion type="single" collapsible className="w-full px-5 pl-7 bg-slate-50/50">
                                            <AccordionItem value="explanation" className="border-none">
                                                <AccordionTrigger className="text-[11px] font-bold text-slate-500 hover:text-brand hover:no-underline py-3 px-1">
                                                    解説を見る
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-4 px-1">
                                                    ファビコンとは、ブラウザのタブやスマホのブックマークに表示される「小さなアイコン画像」です。<br />
                                                    ここにお店のロゴなどが設定されていると、細部までこだわっている「ちゃんとしたサイト」として、お客様からの信頼感が大きくアップします。
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                    {/* Quest 5: OGP (Incomplete Example) */}
                                    <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden relative hover:border-brand/40 transition-colors">
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200" />
                                        <div className="p-5 pl-7 flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-slate-100">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 flex items-center justify-center shrink-0">
                                                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                                                    </div>
                                                    <h3 className="text-[15px] font-bold text-slate-800">OGPを設定しよう！</h3>
                                                </div>
                                            </div>
                                            <Button className="w-full md:w-auto h-10 bg-brand hover:bg-brand/90 text-white font-bold shrink-0 shadow-sm shadow-brand/20">
                                                設定する
                                            </Button>
                                        </div>
                                        <Accordion type="single" collapsible className="w-full px-5 pl-7 bg-slate-50/50">
                                            <AccordionItem value="explanation" className="border-none">
                                                <AccordionTrigger className="text-[11px] font-bold text-slate-500 hover:text-brand hover:no-underline py-3 px-1">
                                                    解説を見る
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-slate-600 leading-relaxed pb-4 px-1">
                                                    OGPとは、LINEやX（旧Twitter）、FacebookなどでURLが送られたときに表示される「画像付きのリンクカード」のことです。<br />
                                                    ただの文字のURLが送られるより、綺麗な画像とタイトルがセットで表示されたほうが圧倒的にクリックされやすくなり、SNS経由での集客に絶大な効果を発揮します！
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>

                                </div>
                            </TabsContent>

                            {/* Tab 2: Search Console */}
                            <TabsContent value="search-console" className="mt-0 outline-none animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ease-out fill-mode-both">
                                <Card className="border-none shadow-sm bg-white overflow-hidden">
                                    <div className="p-6 md:p-8 space-y-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
                                                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-bold text-slate-800">Google Search Console連携</h2>
                                                <p className="text-[13px] text-slate-500 mt-1">サイトの検索トラフィックや掲載順位を測定するためのGoogle公式ツールと連携します。</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Column 1: Steps */}
                                            <div className="space-y-6">
                                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                                    <h3 className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">連携の手順</h3>
                                                    <ol className="space-y-5">
                                                        <li className="flex gap-3 relative">
                                                            <div className="absolute left-3.5 top-8 bottom-[-16px] w-[1px] bg-slate-200" />
                                                            <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">1</div>
                                                            <div>
                                                                <p className="text-[13px] font-bold text-slate-700 mb-1">Search Consoleにアクセス</p>
                                                                <p className="text-xs text-slate-500 leading-relaxed">GoogleのSearch Console画面を開き、「プロパティを追加」をクリックします。</p>
                                                            </div>
                                                        </li>
                                                        <li className="flex gap-3 relative">
                                                            <div className="absolute left-3.5 top-8 bottom-[-16px] w-[1px] bg-slate-200" />
                                                            <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">2</div>
                                                            <div>
                                                                <p className="text-[13px] font-bold text-slate-700 mb-1">HTMLタグを取得</p>
                                                                <p className="text-xs text-slate-500 leading-relaxed">「URLプレフィックス」を選択し、生成された「HTMLタグ」内の `content=&quot;〇〇&quot;` の○○部分（メタタグ）をコピーします。</p>
                                                            </div>
                                                        </li>
                                                        <li className="flex gap-3 relative">
                                                            <div className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-sm">3</div>
                                                            <div>
                                                                <p className="text-[13px] font-bold text-slate-700 mb-1">メタタグを保存</p>
                                                                <p className="text-xs text-slate-500 leading-relaxed">右の入力欄にコピーした文字列を貼り付け、保存します。</p>
                                                            </div>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>

                                            {/* Column 2: Form */}
                                            <div>
                                                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
                                                    <div className="space-y-2 mb-6">
                                                        <Label className="text-[13px] font-bold text-slate-700">Google サイト認証メタタグ</Label>
                                                        <Input placeholder="例: WxYZ123abcDEF456ghiJKL789..." className="bg-slate-50" />
                                                        <p className="text-[10px] text-slate-500 pl-1 py-1">
                                                            ※ &lt;meta name=&quot;google-site-verification&quot; content=&quot;...&quot;&gt; の &apos;content&apos; の中身だけを貼り付けてください。
                                                        </p>
                                                    </div>

                                                    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end">
                                                        <Button className="bg-brand hover:bg-brand/90 text-white font-bold h-10 px-8">
                                                            認証コードを保存
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </Card>

            </div>
        </DashboardShell>
    );
}
