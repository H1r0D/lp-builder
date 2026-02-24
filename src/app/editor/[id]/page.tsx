'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { SettingsModal } from '@/components/editor/SettingsModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    ArrowLeft,
    Save,
    Globe,
    Settings,
    Eye,
    Monitor,
    Tablet,
    Smartphone,
    MapPin,
    SquareDashed,
    PenTool,
    Lock,
    Send,
    Bot,
    User,
    CheckCircle2,
    Palette,
    Type,
    ShoppingCart,
    HelpCircle
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function AdvancedEditorPage() {
    const router = useRouter();
    const [rightMode, setRightMode] = useState<'chat' | 'code'>('chat');
    const [viewMode, setViewMode] = useState<'pc' | 'tablet' | 'sp'>('pc');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [isPublishPopoverOpen, setIsPublishPopoverOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');

    // UI Refinements State
    const [activeAiTool, setActiveAiTool] = useState<'pin' | 'area' | 'pen' | null>(null);
    const [isBrandLocked, setIsBrandLocked] = useState(false);
    const [brandColor, setBrandColor] = useState('#3B82F6');
    const [brandFont, setBrandFont] = useState('font-sans');

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveMessage('保存しました');
            setTimeout(() => setSaveMessage(''), 3000);
        }, 800);
    };

    const handlePublish = () => {
        setIsPublishPopoverOpen(false);
        // Add publish logic here
    };

    // Calculate canvas width based on view mode
    const getCanvasWidth = () => {
        switch (viewMode) {
            case 'pc': return 'w-full max-w-[1200px]';
            case 'tablet': return 'w-[768px]';
            case 'sp': return 'w-[375px]';
            default: return 'w-full';
        }
    };

    return (
        <TooltipProvider delayDuration={200}>
            <div className="h-screen w-full flex flex-col bg-[#f8fafc] overflow-hidden font-sans">
                {/* ━━━ Top Navbar ━━━ */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10 relative">
                    {/* Left: Project Info */}
                    <div className="flex items-center gap-4 w-1/3">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            ダッシュボードへ戻る
                        </Link>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <h1 className="text-sm font-black text-slate-800 truncate">LP Builder Project</h1>
                            <Badge variant="secondary" className="text-[10px] font-bold bg-slate-100 text-slate-500">Draft</Badge>
                        </div>
                    </div>

                    {/* Center: AI Chat / Code Toggle */}
                    <div className="flex justify-center w-1/3">
                        <Tabs value={rightMode} onValueChange={(v) => setRightMode(v as 'chat' | 'code')}>
                            <TabsList className="bg-slate-100 p-1 h-10 rounded-xl">
                                <TabsTrigger
                                    value="chat"
                                    className="text-sm font-bold h-8 px-6 rounded-lg data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-sm transition-all"
                                >
                                    <Bot className="w-4 h-4 mr-2" />
                                    AIチャット
                                </TabsTrigger>
                                <TabsTrigger
                                    value="code"
                                    className="text-sm font-bold h-8 px-6 rounded-lg data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all"
                                >
                                    <Lock className="w-3.5 h-3.5 mr-2" />
                                    コード編集
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-3 w-1/3">
                        <Button variant="outline" size="sm" className="h-9 w-[110px] font-bold text-slate-700 bg-white border-slate-200 hover:bg-slate-50 transition-all shrink-0" asChild>
                            <Link href={`#preview`} target="_blank">
                                <Eye className="w-4 h-4 mr-2 text-brand" />
                                プレビュー
                            </Link>
                        </Button>

                        <div className="flex items-center min-w-[110px] justify-center shrink-0">
                            {saveMessage ? (
                                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold animate-in fade-in slide-in-from-right-4">
                                    <CheckCircle2 className="w-4 h-4" />
                                    {saveMessage}
                                </span>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="bg-brand hover:bg-brand/90 text-white font-bold h-9 w-full shadow-sm transition-all"
                                >
                                    {isSaving ? (
                                        <span className="flex items-center">
                                            <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin mr-2" />
                                            保存中...
                                        </span>
                                    ) : (
                                        <><Save className="w-4 h-4 mr-2" /> 保存</>
                                    )}
                                </Button>
                            )}
                        </div>

                        <Popover open={isPublishPopoverOpen} onOpenChange={setIsPublishPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button size="sm" className="bg-amber hover:bg-amber/90 text-white font-bold h-9 w-[110px] shrink-0 shadow-sm transition-all">
                                    <Globe className="w-4 h-4 mr-2" />
                                    公開
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4 rounded-xl shadow-xl" align="end" sideOffset={8}>
                                <h4 className="font-bold text-slate-800 mb-2">サイトを公開しますか？</h4>
                                <p className="text-xs text-slate-500 mb-4">現在編集中の内容をWeb上に公開します。よろしいですか？</p>
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setIsPublishPopoverOpen(false)} className="h-8 text-xs font-bold">キャンセル</Button>
                                    <Button size="sm" className="h-8 text-xs bg-amber hover:bg-amber/90 text-white font-bold rounded-lg" onClick={handlePublish}>本当に公開する</Button>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <div className="w-px h-6 bg-slate-200 mx-1"></div>

                        <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg" onClick={() => setIsSettingsOpen(true)}>
                            <Settings className="w-5 h-5" />
                        </Button>
                    </div>
                </header>

                {/* ━━━ Main 3-Column Layout ━━━ */}
                <main className="flex-1 flex overflow-hidden relative">

                    {/* 1. Left Column: Tools & Settings */}
                    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="p-5 space-y-8 flex-1">

                            {/* Responsive Toggle */}
                            <div className="space-y-3">
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">レスポンシブ確認</h3>
                                <div className="flex bg-slate-100 p-1 rounded-xl">
                                    <button
                                        onClick={() => setViewMode('pc')}
                                        className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all ${viewMode === 'pc' ? 'bg-white shadow-sm text-brand' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Monitor className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">PC</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('tablet')}
                                        className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all ${viewMode === 'tablet' ? 'bg-white shadow-sm text-brand' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Tablet className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">Tablet</span>
                                    </button>
                                    <button
                                        onClick={() => setViewMode('sp')}
                                        className={`flex-1 flex flex-col items-center justify-center py-2 rounded-lg transition-all ${viewMode === 'sp' ? 'bg-white shadow-sm text-brand' : 'text-slate-500 hover:text-slate-700'}`}
                                    >
                                        <Smartphone className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-bold">Mobile</span>
                                    </button>
                                </div>
                            </div>

                            {/* AI Tools */}
                            <div className="space-y-3">
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                                    AI 指示ツール
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                            <p className="font-medium text-xs">修正したい場所をクリックして、AIにピンポイントで指示を出せます。</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setActiveAiTool(activeAiTool === 'pin' ? null : 'pin')}
                                        className={`flex flex-col items-center justify-center h-20 rounded-xl transition-colors shadow-sm relative ${activeAiTool === 'pin' ? 'bg-brand/10 border-2 border-brand text-brand' : 'bg-brand/5 border border-brand/20 text-brand hover:bg-brand/10'}`}>
                                        <MapPin className="w-6 h-6 mb-2" />
                                        <span className="text-[10px] font-bold">ピン留め</span>
                                        {activeAiTool === 'pin' && <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand animate-pulse"></div>}
                                    </button>
                                    <button
                                        onClick={() => setActiveAiTool(activeAiTool === 'area' ? null : 'area')}
                                        className={`flex flex-col items-center justify-center h-20 rounded-xl transition-colors shadow-sm relative ${activeAiTool === 'area' ? 'bg-brand/10 border-2 border-brand text-brand' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                        <SquareDashed className="w-6 h-6 mb-2" />
                                        <span className="text-[10px] font-bold">エリア選択</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveAiTool(activeAiTool === 'pen' ? null : 'pen')}
                                        className={`flex flex-col items-center justify-center h-20 rounded-xl transition-colors shadow-sm relative ${activeAiTool === 'pen' ? 'bg-brand/10 border-2 border-brand text-brand' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                        <PenTool className="w-6 h-6 mb-2" />
                                        <span className="text-[10px] font-bold">ペン書き</span>
                                    </button>
                                </div>
                                <p className="text-[11px] text-slate-500 font-medium px-1">プレビュー上の要素をクリックしてピンを刺し、右のチャットで指示を出せます。</p>
                            </div>

                            {/* Brand Lock */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                        <Lock className={`w-3.5 h-3.5 ${isBrandLocked ? 'text-brand' : ''}`} /> ブランドロック
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                                            </TooltipTrigger>
                                            <TooltipContent side="right" className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                                                <p className="font-medium text-xs">設定したカラーやフォントをAIの自動生成から保護します。</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </h3>
                                    <Switch checked={isBrandLocked} onCheckedChange={setIsBrandLocked} className="scale-75 origin-right data-[state=checked]:bg-brand" />
                                </div>
                                <div className={`bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4 transition-all duration-300 ${isBrandLocked ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mb-2">
                                            <Palette className="w-4 h-4 text-slate-400" /> ベースカラー
                                        </Label>
                                        <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200/60 shadow-sm">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm border border-slate-200 shrink-0 cursor-pointer hover:scale-105 transition-transform">
                                                <input
                                                    type="color"
                                                    value={brandColor}
                                                    onChange={(e) => setBrandColor(e.target.value)}
                                                    disabled={isBrandLocked}
                                                    className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer"
                                                />
                                            </div>
                                            <div className="flex-1 flex justify-between items-center px-1">
                                                <span className="text-[10px] font-bold text-slate-400">HEX</span>
                                                <span className="text-xs font-mono font-bold text-slate-700">{brandColor.toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mb-2">
                                            <Type className="w-4 h-4 text-slate-400" /> フォント
                                        </Label>
                                        <Select value={brandFont} onValueChange={setBrandFont} disabled={isBrandLocked}>
                                            <SelectTrigger className="w-full bg-white text-sm font-bold text-slate-700 h-10 shadow-sm">
                                                <SelectValue placeholder="フォントを選択" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="font-sans">Noto Sans JP (標準ゴシック)</SelectItem>
                                                <SelectItem value="font-serif">Noto Serif JP (標準明朝)</SelectItem>
                                                <SelectItem value="font-mono">システム等幅 (Mono)</SelectItem>
                                                <SelectItem value="font-['Yu_Gothic','YuGothic',sans-serif]">游ゴシック (洗練・スッキリ)</SelectItem>
                                                <SelectItem value="font-['Yu_Mincho','YuMincho',serif]">游明朝 (高級感・エレガント)</SelectItem>
                                                <SelectItem value="font-[Arial,Helvetica,sans-serif]">Arial (モダン・英字メイン)</SelectItem>
                                                <SelectItem value="font-['Comic_Sans_MS','Marker_Felt',cursive]">手書き風 (カジュアル・ポップ)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Template Store (Bottom) */}
                        <div className="p-5 border-t border-slate-100 bg-slate-50 mt-auto shrink-0">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 mb-3 flex justify-between items-center">
                                <span>拡張テンプレートストア</span>
                                <Badge className="bg-amber-100 text-amber-700 border-none text-[8px] px-1.5 py-0 font-bold">PRO</Badge>
                            </h3>
                            <div className="bg-white border rounded-xl overflow-hidden hover:border-brand/50 transition-colors cursor-pointer group">
                                <div className="h-24 bg-slate-200 relative">
                                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=200" alt="template" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <Badge className="absolute bottom-2 left-2 bg-black/60 text-white border-none font-bold">¥1,500</Badge>
                                </div>
                                <div className="p-3">
                                    <h4 className="text-xs font-bold text-slate-800 mb-1">スタイリッシュLP パック</h4>
                                    <p className="text-[10px] text-slate-500 mb-3">洗練されたコーポレート向けデザインのセクションセット。</p>
                                    <Button size="sm" variant="outline" className="w-full h-7 text-xs font-bold">
                                        <ShoppingCart className="w-3 h-3 mr-1" /> 購入する
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* 2. Center Column: Canvas */}
                    <section className={`flex-1 bg-slate-100/80 p-4 md:p-8 flex flex-col items-center overflow-y-auto overflow-x-hidden border-r border-slate-200 relative transition-colors duration-300 ${activeAiTool ? 'cursor-crosshair bg-slate-200/50' : ''}`}>
                        {/* Responsive Wrapper */}
                        <div
                            className={`${getCanvasWidth()} min-h-full bg-white shadow-xl transition-all duration-300 ease-in-out origin-top border border-slate-200 relative`}
                        >
                            {/* Dummy Web Page Content */}
                            <div className={`p-10 space-y-12 min-h-screen transition-all duration-300 ${brandFont}`}>
                                {/* Dummy Hero */}
                                <div className="text-center space-y-6 py-12">
                                    <span className="text-brand font-bold tracking-wider text-sm">あなたのビジネスを加速する</span>
                                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                        次世代のランディングページを<br />AIと共につくる。
                                    </h1>
                                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                                        コードの知識は一切不要。プロンプトを入力するだけで、デザインから文章までAIが最適化します。
                                    </p>

                                    {/* Pinned Element Example */}
                                    <div className="relative inline-block mt-4">
                                        <Button
                                            className="text-white h-12 px-8 rounded-full text-lg font-bold hover:brightness-110 transition-all border-none shadow-lg"
                                            style={{ backgroundColor: brandColor }}
                                        >
                                            無料で試してみる
                                        </Button>
                                        {/* AI Tool Pin */}
                                        <div className="absolute -top-6 -right-5 z-20 animate-bounce">
                                            <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white shadow-lg relative">
                                                <MapPin className="w-4 h-4" />
                                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand rotate-45"></span>
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        {/* Select Box Outline */}
                                        <div className="absolute -inset-2 border-2 border-brand border-dashed rounded-[32px] opacity-50 bg-brand/5 pointer-events-none"></div>
                                    </div>
                                </div>

                                {/* Dummy Features */}
                                <div className="grid md:grid-cols-3 gap-8 py-12">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4"></div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-2">圧倒的なスピード</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">これまでは数日かかっていた作業が、AIの力で数十分に短縮されます。</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Right Column: AI Chat or Code Editor */}
                    <aside className="w-96 bg-white shrink-0 z-10 shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)] flex flex-col">
                        {rightMode === 'chat' ? (
                            <>
                                {/* Chat Header */}
                                <div className="h-14 border-b border-slate-100 flex items-center px-5 shrink-0 bg-white">
                                    <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                                        <Bot className="w-5 h-5 text-brand" /> アシスタント
                                    </h2>
                                </div>

                                {/* Chat Messages */}
                                <ScrollArea className="flex-1 p-5 bg-[#f5f7fa]">
                                    <div className="space-y-6">
                                        {/* AI Message */}
                                        <div className="flex gap-3 max-w-[90%]">
                                            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold mb-1 ml-1">AIアシスタント</p>
                                                <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200/60 shadow-sm text-sm text-slate-700 leading-relaxed font-medium">
                                                    こんにちは！LPの作成ですね。<br />
                                                    まずはキャンバス上の要素にピン（📍）を刺して、どのように変更したいか教えてください！
                                                </div>
                                            </div>
                                        </div>

                                        {/* User Message */}
                                        <div className="flex gap-3 max-w-[90%] ml-auto justify-end">
                                            <div className="flex flex-col items-end">
                                                <p className="text-[10px] text-slate-400 font-bold mb-1 mr-1">あなた</p>
                                                <div className="bg-brand p-3.5 rounded-2xl rounded-tr-none shadow-sm text-sm text-white leading-relaxed font-medium">
                                                    ピンを刺したボタンの色を、もっと目立つオレンジ系のグラデーションに変更して。文字は「今すぐはじめる」にしてほしい。
                                                </div>
                                                <span className="text-[9px] text-slate-400 mt-1 font-medium mr-1">10:42</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0 shadow-sm mt-1">
                                                <User className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* AI Response (Generating) */}
                                        <div className="flex gap-3 max-w-[90%]">
                                            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400 font-bold mb-1 ml-1">AIアシスタント</p>
                                                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200/60 shadow-sm flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                    <span className="text-xs text-slate-500 font-bold ml-2">デザインを生成中...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>

                                {/* Chat Input */}
                                <div className="p-4 bg-white border-t border-slate-100">
                                    {/* Context Badge */}
                                    <div className="mb-2 flex items-center gap-1.5">
                                        <Badge className="bg-brand/10 text-brand hover:bg-brand/10 border-brand/20 text-[10px] px-2 py-0">
                                            📍 選択中: メインCTAボタン
                                        </Badge>
                                    </div>
                                    <div className="relative flex items-end bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand/30 focus-within:border-brand/50 transition-all">
                                        <Textarea
                                            value={chatInput}
                                            onChange={(e) => setChatInput(e.target.value)}
                                            placeholder="AIに指示を出す..."
                                            className="border-0 bg-transparent resize-none min-h-[60px] py-3 px-4 text-sm font-medium focus-visible:ring-0 shadow-none scrollbar-hide"
                                        />
                                        <Button size="icon" className="h-9 w-9 mb-2 mr-2 shrink-0 bg-brand hover:bg-brand/90 text-white rounded-lg shadow-sm" disabled={!chatInput.trim()}>
                                            <Send className="w-4 h-4 ml-0.5" />
                                        </Button>
                                    </div>
                                    <p className="text-[9px] text-center text-slate-400 mt-2 font-medium">Shift + Enter で改行</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col bg-slate-900 border-l border-slate-800">
                                {/* Code Editor Header */}
                                <div className="h-14 border-b border-slate-800 flex items-center justify-between px-5 shrink-0">
                                    <h2 className="text-sm font-black text-slate-200 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-emerald-400" /> コードエディタ
                                    </h2>
                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-[10px]">Read Only (Beta)</Badge>
                                </div>

                                {/* Mock Code Area */}
                                <ScrollArea className="flex-1 p-4">
                                    <pre className="font-mono text-[12px] text-slate-300 leading-relaxed">
                                        <span className="text-pink-400">import</span> {'{'} <span className="text-sky-300">Button</span> {'}'} <span className="text-pink-400">from</span> <span className="text-emerald-300">'@/components/ui/button'</span>;
                                        <br /><br />
                                        <span className="text-pink-400">export default function</span> <span className="text-yellow-200">HeroSection</span>() {'{'}
                                        <span className="text-pink-400">return</span> (
                                        &lt;<span className="text-blue-400">section</span> <span className="text-sky-300">className</span>=<span className="text-emerald-300">"py-12 text-center"</span>&gt;
                                        &lt;<span className="text-blue-400">div</span> <span className="text-sky-300">className</span>=<span className="text-emerald-300">"max-w-2xl mx-auto"</span>&gt;
                                        &lt;<span className="text-blue-400">h1</span> <span className="text-sky-300">className</span>=<span className="text-emerald-300">"text-4xl font-black"</span>&gt;
                                        次世代の<br />
                                        ランディングページ
                                        &lt;/<span className="text-blue-400">h1</span>&gt;

                                        {/* The pinned button */}
                                        &lt;<span className="text-blue-400">Button</span>
                                        <span className="text-sky-300">className</span>=<span className="text-emerald-300">"bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold h-12 px-8 rounded-full"</span>
                                        &gt;
                                        今すぐはじめる
                                        &lt;/<span className="text-blue-400">Button</span>&gt;
                                        &lt;/<span className="text-blue-400">div</span>&gt;
                                        &lt;/<span className="text-blue-400">section</span>&gt;
                                        );
                                        {'}'}
                                    </pre>
                                </ScrollArea>
                            </div>
                        )}
                    </aside>

                </main>

                {/* ━━━ Settings Modal ━━━ */}
                <SettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
            </div>
        </TooltipProvider>
    );
}
