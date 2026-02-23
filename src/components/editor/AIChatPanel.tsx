'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/* ─── AIチャットパネル ─── */
interface AIChatPanelProps {
    isOpen: boolean;
    onToggle: () => void;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

function IconSparkles({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
    );
}

function IconSend({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
    );
}

function IconClose({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

const SAMPLE_REPLIES = [
    'キャッチコピーを「信頼と実績で選ばれる施工会社」に変更してみましょうか？',
    'CTAボタンのテキストを「無料見積もりはこちら」にするとコンバージョン率が上がることが多いです。',
    '特徴セクションに「施工実績 3,000 件以上」を追加すると信頼感が増しますよ。',
    'メインビジュアルには施工事例の写真を使うのがおすすめです。',
    'FAQに「工事期間はどのくらいですか？」を追加してみましょうか？',
];

export default function AIChatPanel({ isOpen, onToggle }: AIChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'こんにちは！LPの編集をお手伝いします。テキストの改善提案や、セクション内容のアドバイスなど、お気軽にご相談ください。',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = {
            id: `u_${Date.now()}`,
            role: 'user',
            content: input.trim(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // ダミー AI レスポンス
        setTimeout(() => {
            const reply: ChatMessage = {
                id: `a_${Date.now()}`,
                role: 'assistant',
                content: SAMPLE_REPLIES[Math.floor(Math.random() * SAMPLE_REPLIES.length)],
            };
            setMessages((prev) => [...prev, reply]);
            setIsTyping(false);
        }, 800 + Math.random() * 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) {
        /* 閉じてる時はフローティングボタンのみ表示 */
        return (
            <button
                onClick={onToggle}
                className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-brand text-white shadow-lg hover:bg-brand/90 transition-all flex items-center justify-center"
            >
                <IconSparkles className="w-5 h-5" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-[360px] sm:bottom-5 sm:right-5 flex flex-col bg-white border border-border rounded-t-lg sm:rounded-lg shadow-xl max-h-[70vh] sm:max-h-[520px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-brand/5 rounded-t-lg sm:rounded-t-lg">
                <div className="flex items-center gap-2">
                    <IconSparkles className="w-4 h-4 text-brand" />
                    <span className="text-sm font-semibold text-foreground">AI アシスタント</span>
                </div>
                <button
                    onClick={onToggle}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                >
                    <IconClose className="w-4 h-4" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-3 min-h-0">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] px-3 py-2 rounded-md text-xs leading-relaxed ${msg.role === 'user'
                                ? 'bg-brand text-white'
                                : 'bg-secondary text-foreground'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-secondary px-3 py-2 rounded-md">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3 flex gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="改善したい箇所を伝えてください..."
                    className="flex-1 text-xs h-9"
                />
                <Button
                    size="sm"
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="bg-brand hover:bg-brand/90 text-white h-9 w-9 p-0"
                >
                    <IconSend className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}
