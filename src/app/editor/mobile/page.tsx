'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Globe,
    Camera,
    Send,
    MapPin,
    PenTool,
    Sparkles,
    Bot
} from 'lucide-react';

export default function MobileEditorPage() {
    const [chatInput, setChatInput] = useState('');
    const [activeTool, setActiveTool] = useState<'pin' | 'global'>('pin');

    // Dummy messages
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'user',
            content: '📍この部分をもう少し明るいデザインにして',
            pinned: true
        },
        {
            id: 2,
            type: 'ai',
            content: '更新しました！オレンジ系のグラデーションを強めに調整してみました。ご確認ください✨',
            pinned: false
        }
    ]);

    const handleSend = () => {
        if (!chatInput.trim()) return;
        setMessages([...messages, { id: Date.now(), type: 'user', content: chatInput, pinned: activeTool === 'pin' }]);
        setChatInput('');
        // Add fake AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), type: 'ai', content: '変更を適用しました👍', pinned: false }]);
        }, 1500);
    };

    return (
        // Mobile constraint wrapper
        <div className="bg-slate-100 min-h-screen w-full flex justify-center overflow-hidden font-sans">
            <div className="w-full max-w-md bg-white h-screen flex flex-col relative shadow-2xl overflow-hidden">

                {/* ━━━ 1. Mobile Top Header ━━━ */}
                <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-3 shrink-0 z-20">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-[13px] font-black text-slate-800 leading-tight">LP Builder Project</h1>
                            <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Draft
                            </span>
                        </div>
                    </div>
                    <Button size="sm" className="bg-brand hover:bg-brand/90 text-white font-bold h-8 px-4 rounded-full shadow-sm text-xs">
                        <Globe className="w-3.5 h-3.5 mr-1.5" />
                        公開
                    </Button>
                </header>

                {/* ━━━ 2. Main Canvas (Preview) ━━━ */}
                {/* padding-bottom prevents chat from hiding content */}
                <div className="flex-1 overflow-y-auto bg-slate-50 pb-[220px] relative scroll-smooth component-canvas">
                    {/* Dummy Preview Content */}
                    <div className="w-full bg-white min-h-full">

                        {/* Hero Section - Pinned State */}
                        <section className="relative px-6 py-16 text-center">
                            {/* Pin Highlight Overlay */}
                            <div className="absolute inset-2 ring-2 ring-brand rounded-2xl bg-brand/5 pointer-events-none"></div>

                            {/* Pin Icon */}
                            <div className="absolute top-0 right-4 -translate-y-1/2 bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce z-10">
                                <MapPin className="w-4 h-4" />
                            </div>

                            <div className="relative z-0">
                                <Badge className="mb-4 bg-orange-100 text-orange-600 hover:bg-orange-100 border-none font-bold">新機能リリース</Badge>
                                <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                                    スマホから直接<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-brand">魔法のように</span><br />
                                    Webサイト作成
                                </h2>
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                    AIとチャットするだけで、あなたの思い通りのデザインが完成。もうPCを開く必要はありません。
                                </p>
                                <Button className="w-full bg-brand hover:bg-brand/90 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-brand/20">
                                    無料で始める
                                </Button>
                            </div>
                        </section>

                        {/* Feature Section */}
                        <section className="px-6 py-12 bg-slate-50">
                            <h3 className="text-lg font-black text-center mb-8">3つの特徴</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                            <Sparkles className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">特徴その{i}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed">テキストテキストテキストテキストテキストテキスト</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* ━━━ 3. Bottom Chat & Action Sheet ━━━ */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-30 flex flex-col">

                    {/* Floating Toolbar (Toggle) */}
                    <div className="px-4 pt-3 pb-2 flex justify-center">
                        <Tabs value={activeTool} onValueChange={(v) => setActiveTool(v as 'pin' | 'global')} className="w-full max-w-[240px]">
                            <TabsList className="grid w-full grid-cols-2 h-9 p-1 bg-slate-100 rounded-full">
                                <TabsTrigger value="pin" className="text-[11px] font-bold rounded-full data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow-sm">
                                    <MapPin className="w-3.5 h-3.5 mr-1.5" />
                                    選択
                                </TabsTrigger>
                                <TabsTrigger value="global" className="text-[11px] font-bold rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                                    全体
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {/* Chat Log View (Mini) */}
                    <ScrollArea className="px-4 max-h-[120px] pb-2 flex-1">
                        <div className="space-y-3 flex flex-col justify-end min-h-full">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                                    {msg.type === 'ai' && (
                                        <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 mr-2 mt-1">
                                            <Bot className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )}
                                    <div className={`
                                        max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed relative
                                        ${msg.type === 'user'
                                            ? 'bg-brand text-white rounded-br-sm'
                                            : 'bg-slate-100 text-slate-800 rounded-bl-sm border border-slate-200'}
                                    `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    {/* Input Interface */}
                    <div className="p-3 pb-safe bg-white flex items-end gap-2 px-4 border-t border-slate-100">
                        {/* Camera Attachment */}
                        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0 rounded-full border-slate-200 text-slate-500 hover:text-brand hover:bg-brand/5">
                            <Camera className="w-5 h-5" />
                        </Button>

                        {/* Text Input */}
                        <div className="flex-1 relative">
                            <Input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="AIに指示を出す..."
                                className="h-10 rounded-full bg-slate-100 border-transparent focus-visible:ring-brand pr-10 text-[13px]"
                            />
                            {/* Inside Input Action (Optional) */}
                            {chatInput && (
                                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand">
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                </button>
                            )}
                        </div>

                        {/* Send Button */}
                        <Button
                            onClick={handleSend}
                            disabled={!chatInput.trim()}
                            size="icon"
                            className="h-10 w-10 shrink-0 rounded-full bg-brand hover:bg-brand/90 text-white shadow-md disabled:opacity-50 transition-all"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
