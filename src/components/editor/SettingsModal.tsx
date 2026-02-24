'use client';

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    Settings,
    Share2,
    BarChart3,
    Upload,
    Globe,
    Search,
    Type,
    Image as ImageIcon,
    HelpCircle
} from 'lucide-react';

interface SettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
    const [activeTab, setActiveTab] = useState<'basic' | 'ogp' | 'google'>('basic');
    const [title, setTitle] = useState('My Awesome Site');
    const [description, setDescription] = useState('This is an awesome site built with AI.');
    const [domain, setDomain] = useState('example-site');

    // Mocks for image uploads
    const [faviconUrl, setFaviconUrl] = useState('');
    const [ogpImageUrl, setOgpImageUrl] = useState('');

    const renderTabs = () => (
        <div className="w-64 shrink-0 border-r border-slate-200 bg-slate-50/80 p-6 space-y-3 flex flex-col">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-2">
                サイト設定
            </h3>
            <button
                onClick={() => setActiveTab('basic')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'basic' ? 'bg-white text-brand shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'}`}
            >
                <Settings className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">基本設定</span>
            </button>
            <button
                onClick={() => setActiveTab('ogp')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'ogp' ? 'bg-white text-brand shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'}`}
            >
                <Share2 className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">OGP・SNSシェア</span>
            </button>
            <button
                onClick={() => setActiveTab('google')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'google' ? 'bg-white text-brand shadow-sm border border-slate-200/60' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'}`}
            >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Google連携</span>
            </button>
        </div>
    );

    const renderBasicTab = () => (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 animate-in fade-in duration-300 bg-white">
            <div className="w-full">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-brand" /> 基本設定
                </h2>

                <div className="space-y-10 w-full">
                    {/* URL Settings */}
                    <div className="space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Globe className="w-4 h-4 text-slate-400" /> URL設定
                        </h3>

                        <div className="space-y-3 w-full max-w-2xl">
                            <Label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                                サブドメイン (無料)
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                        <p className="font-medium text-xs">このサイト専用のURLです。半角英数字で好きな文字を設定できます。</p>
                                    </TooltipContent>
                                </Tooltip>
                            </Label>
                            <div className="flex items-center w-full">
                                <Input
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    className="h-11 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:border-brand/50 font-medium w-full min-w-0"
                                />
                                <div className="h-11 px-5 bg-slate-100 border border-slate-200 rounded-r-md flex items-center text-sm font-medium text-slate-500 whitespace-nowrap shrink-0">
                                    .lpo-builder.com
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-6 border-t border-slate-100 w-full max-w-2xl">
                            <Label className="text-xs font-bold text-slate-600">独自ドメイン (有料プラン)</Label>
                            <div className="flex gap-3 w-full">
                                <Input placeholder="例: www.your-company.com" className="h-11 w-full min-w-0" />
                                <Button variant="outline" className="h-11 px-6 whitespace-nowrap text-brand border-brand/30 hover:bg-brand/5 shrink-0">連携する</Button>
                            </div>
                            <p className="text-[11px] text-slate-400">※ダッシュボードの「独自ドメイン設定」から追加したドメインを指定できます。</p>
                        </div>
                    </div>

                    {/* SEO: Title & Description */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                            <Search className="w-4 h-4 text-slate-400" /> SEO・検索結果プレビュー
                        </h3>

                        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 w-full">
                            {/* Inputs */}
                            <div className="space-y-6 w-full max-w-2xl">
                                <div className="space-y-2 w-full">
                                    <Label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                                        ページタイトル (title)
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                                <p className="font-medium text-xs">Googleの検索結果に表示される看板です。30文字前後がおすすめ。</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </Label>
                                    <Input
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="株式会社○○ | コーポレートサイト"
                                        className="w-full min-w-0 h-11"
                                    />
                                    <p className="text-[10px] text-slate-400 text-right">{title.length} / 30文字推奨</p>
                                </div>
                                <div className="space-y-2 w-full">
                                    <Label className="text-xs font-bold text-slate-600">ページ説明文 (description)</Label>
                                    <Textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="サイトの説明文を入力してください。"
                                        className="resize-none h-32 w-full text-base p-4"
                                    />
                                    <p className="text-[10px] text-slate-400 text-right">{description.length} / 120文字推奨</p>
                                </div>
                            </div>

                            {/* Search Preview */}
                            <div className="w-full xl:w-[400px] shrink-0">
                                <Label className="text-xs font-bold text-slate-600 mb-3 block">Google 検索結果プレビュー</Label>
                                <div className="bg-white border text-left p-6 rounded-xl shadow-sm border-slate-200 overflow-hidden break-words w-full">
                                    <div className="text-[12px] text-[#202124] flex items-center gap-1.5 mb-1">
                                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                                            {faviconUrl ? <img src={faviconUrl} alt="favicon" className="w-4 h-4 rounded-full" /> : <Globe className="w-3 h-3 text-slate-400" />}
                                        </div>
                                        <div className="truncate min-w-0">
                                            <span className="truncate block font-medium">https://{domain}.lpo-builder.com</span>
                                        </div>
                                    </div>
                                    <h4 className="text-[18px] text-[#1a0dab] line-clamp-1 hover:underline cursor-pointer break-all">
                                        {title || 'タイトル未設定'}
                                    </h4>
                                    <p className="text-[13px] text-[#4d5156] mt-1 line-clamp-2 leading-snug break-words">
                                        {description || '説明文が設定されていません。検索エンジンがページ内容から自動抽出する場合があります。'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Favicon & Noindex */}
                    <div className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <Type className="w-4 h-4 text-slate-400" /> その他の設定
                        </h3>

                        <div className="flex flex-col sm:flex-row items-start gap-8 w-full max-w-2xl">
                            <div className="space-y-3 flex-1 w-full">
                                <Label className="text-xs font-bold text-slate-600">ファビコン画像 (Favicon)</Label>
                                <p className="text-[12px] text-slate-500 mb-2">ブラウザのタブに表示される小さなアイコンです。（推奨: 512x512px, PNG/ICO）</p>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="h-10 text-xs px-5" onClick={() => setFaviconUrl('https://github.com/shadcn.png')}>
                                        <Upload className="w-4 h-4 mr-2" /> 画像をアップロード
                                    </Button>
                                    {faviconUrl && (
                                        <Button variant="ghost" className="h-10 text-xs px-4 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setFaviconUrl('')}>削除</Button>
                                    )}
                                </div>
                            </div>
                            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 shrink-0 overflow-hidden">
                                {faviconUrl ? (
                                    <img src={faviconUrl} alt="Favicon" className="w-10 h-10 rounded-full" />
                                ) : (
                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                )}
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 w-full max-w-2xl">
                            <div className="flex items-center space-x-3 bg-slate-50 p-5 rounded-xl border border-slate-200/60 w-full transition-colors hover:bg-slate-100">
                                <Checkbox id="noindex" className="w-5 h-5" />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="noindex" className="text-sm font-bold text-slate-700 cursor-pointer">検索エンジンに表示させない (noindex)</Label>
                                    <p className="text-[12px] text-slate-500">開発中のテストサイトや、広く公開したくない場合にお使いください。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end w-full">
                    <Button className="bg-brand hover:bg-brand/90 text-white font-bold h-12 px-10 text-base rounded-xl shadow-lg shadow-brand/20">
                        変更を保存
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderOgpTab = () => (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 animate-in fade-in duration-300 bg-white">
            <div className="w-full">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                    <Share2 className="w-6 h-6 text-brand" /> OGP・SNSシェア設定
                </h2>

                <div className="space-y-10 w-full">
                    {/* OGP Image upload */}
                    <div className="space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <ImageIcon className="w-4 h-4 text-slate-400" />
                            <span className="flex items-center gap-1.5">
                                OGP画像 (シェア画像)
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                        <p className="font-medium text-xs">LINEやSNSでURLがシェアされた時に表示されるアイキャッチ画像です。</p>
                                    </TooltipContent>
                                </Tooltip>
                            </span>
                        </h3>
                        <p className="text-[12px] text-slate-500">SNS等でURLがシェアされた際に大きく表示される画像です。（推奨: 1200x630px）</p>

                        <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 h-[300px] max-w-2xl flex flex-col items-center justify-center relative overflow-hidden group w-full">
                            {ogpImageUrl ? (
                                <>
                                    <img src={ogpImageUrl} alt="OGP" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <Button variant="secondary" onClick={() => setOgpImageUrl('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200&h=630')}>
                                            変更
                                        </Button>
                                        <Button variant="destructive" onClick={() => setOgpImageUrl('')}>
                                            削除
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center">
                                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <Button variant="outline" onClick={() => setOgpImageUrl('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200&h=630')}>
                                        <Upload className="w-4 h-4 mr-2" /> 画像をアップロード
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Common OGP fields */}
                    <div className="space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                            共通メタデータ
                        </h3>

                        <div className="space-y-8 w-full max-w-2xl">
                            <div className="space-y-3 w-full">
                                <Label className="text-xs font-bold text-slate-600">OGP タイトル (og:title)</Label>
                                <Input placeholder={title} className="w-full h-11" />
                                <p className="text-[11px] text-slate-400">※未入力の場合は基本設定のタイトルが使用されます。</p>
                            </div>
                            <div className="space-y-3 w-full">
                                <Label className="text-xs font-bold text-slate-600">OGP 説明文 (og:description)</Label>
                                <Textarea placeholder={description} className="resize-none h-32 w-full p-4" />
                                <p className="text-[11px] text-slate-400">※未入力の場合は基本設定の説明文が使用されます。</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-6 w-full">
                                <div className="space-y-3 w-full">
                                    <Label className="text-xs font-bold text-slate-600">サイト名 (og:site_name)</Label>
                                    <Input placeholder="My Awesome Service" className="w-full h-11" />
                                </div>
                                <div className="space-y-3 w-full">
                                    <Label className="text-xs font-bold text-slate-600">OGP URL (og:url)</Label>
                                    <Input placeholder={`https://${domain}.lpo-builder.com`} className="w-full h-11" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* X (Twitter) Settings */}
                    <div className="space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-4">
                            X (Twitter) 固有設定
                        </h3>

                        <div className="space-y-8 w-full max-w-2xl">
                            <div className="space-y-3 w-full">
                                <Label className="text-xs font-bold text-slate-600">カードの表示形式 (twitter:card)</Label>
                                <RadioGroup defaultValue="large" className="flex flex-col sm:flex-row gap-4 w-full">
                                    <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-4 rounded-xl w-full">
                                        <RadioGroupItem value="large" id="card-large" className="w-5 h-5" />
                                        <Label htmlFor="card-large" className="text-sm font-bold text-slate-700 cursor-pointer w-full">
                                            Summary Large Image (大)
                                            <span className="block text-[11px] font-normal text-slate-500 mt-1.5">画像を大きく表示して目立たせます。</span>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-3 bg-slate-50 border border-slate-200 p-4 rounded-xl w-full">
                                        <RadioGroupItem value="small" id="card-small" className="w-5 h-5" />
                                        <Label htmlFor="card-small" className="text-sm font-bold text-slate-700 cursor-pointer w-full">
                                            Summary (小)
                                            <span className="block text-[11px] font-normal text-slate-500 mt-1.5">画像とテキストを並べて表示します。</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-3 w-full">
                                <Label className="text-xs font-bold text-slate-600">X アカウント (twitter:site / twitter:creator)</Label>
                                <div className="relative w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
                                    <Input className="pl-9 w-full h-11" placeholder="your_twitter_id" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end w-full">
                    <Button className="bg-brand hover:bg-brand/90 text-white font-bold h-12 px-10 text-base rounded-xl shadow-lg shadow-brand/20">
                        変更を保存
                    </Button>
                </div>
            </div>
        </div>
    );

    const renderGoogleTab = () => (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 animate-in fade-in duration-300 bg-white">
            <div className="w-full">
                <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-brand" /> Google連携・解析
                </h2>

                <div className="space-y-8 text-slate-700 w-full max-w-2xl">
                    {/* Google Analytics */}
                    <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                            Google Analytics (GA4)
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                    <p className="font-medium text-xs">サイトへのアクセス数や訪問者の動きを分析するための測定ID（G-xxxx）を入力します。</p>
                                </TooltipContent>
                            </Tooltip>
                        </h3>
                        <div className="bg-amber-50 rounded-xl p-5 text-[13px] leading-relaxed text-amber-800/80 mb-4 border border-amber-100 w-full">
                            <span className="font-bold">【どんな機能？】</span><br />
                            あなたのサイトに『何人来たか』『どのページが見られているか』『スマホとPCどちらが多いか』などを詳しく分析するためのツールです。<br />
                            <span className="font-bold text-amber-700 mt-2 block">設定方法:</span> GA4管理画面の「データストリーム」から「測定ID（G-から始まるコード）」をコピーして貼り付けて下さい。
                        </div>
                        <div className="space-y-2 w-full">
                            <Label className="text-xs font-bold text-slate-600">測定ID</Label>
                            <Input placeholder="例: G-XXXXXXXXXX" className="font-mono bg-slate-50 w-full p-4 h-12 text-sm" />
                        </div>
                    </div>

                    {/* Google Search Console */}
                    <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500" />
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                            Google Search Console
                        </h3>
                        <div className="bg-blue-50 rounded-xl p-5 text-[13px] leading-relaxed text-blue-800/80 mb-4 border border-blue-100 w-full">
                            <span className="font-bold">【どんな機能？】</span><br />
                            Googleで『どんなキーワードで検索されてサイトに来たか』を把握し、検索順位（SEO）を改善するためのツールです。<br />
                            <span className="font-bold text-blue-700 mt-2 block">設定方法:</span> Search Consoleにサイトを登録する際の「HTMLタグ」確認方法を選び、発行された<code className="bg-white px-1.5 py-0.5 mx-1 border border-blue-200 rounded text-blue-900 font-mono text-xs">{'<meta name="google-site-verification" ... />'}</code>の中の content の文字列だけを入力してください。
                        </div>
                        <div className="space-y-2 w-full">
                            <Label className="text-xs font-bold text-slate-600">所有権証明 ID (contentの値)</Label>
                            <Input placeholder="例: abcdefg_1234567890" className="font-mono bg-slate-50 w-full p-4 h-12 text-sm" />
                        </div>
                    </div>

                    {/* Global Site Tag */}
                    <div className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden w-full">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-2">
                            グローバルサイトタグ (gtag.js)
                        </h3>
                        <div className="bg-emerald-50 rounded-xl p-5 text-[13px] leading-relaxed text-emerald-800/80 mb-4 border border-emerald-100 w-full">
                            <span className="font-bold">【どんな機能？】</span><br />
                            Google広告を出稿して成果（コンバージョン）を測ったり、複数のGoogleツールを連携・管理するための基本となるコードです。<br />
                            <span className="font-bold text-emerald-700 mt-2 block">設定方法:</span> Googleタグマネージャー（GTM）またはGoogle Adsから発行される指定のIDを貼り付けてください。
                        </div>
                        <div className="space-y-2 w-full">
                            <Label className="text-xs font-bold text-slate-600">コンバージョンID または GTM ID</Label>
                            <Input placeholder="例: AW-123456789 または GTM-XXXXXXX" className="font-mono bg-slate-50 w-full p-4 h-12 text-sm" />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end w-full">
                    <Button className="bg-brand hover:bg-brand/90 text-white font-bold h-12 px-10 text-base rounded-xl shadow-lg shadow-brand/20">
                        変更を保存
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <TooltipProvider delayDuration={200}>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-5xl sm:max-w-5xl w-[80vw] h-[85vh] max-h-[85vh] p-0 overflow-hidden flex flex-row gap-0 bg-slate-50 rounded-2xl shadow-2xl">
                    {renderTabs()}
                    {activeTab === 'basic' && renderBasicTab()}
                    {activeTab === 'ogp' && renderOgpTab()}
                    {activeTab === 'google' && renderGoogleTab()}
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
