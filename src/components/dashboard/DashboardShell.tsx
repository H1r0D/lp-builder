'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { FullScreenLoader } from '@/components/ui/FullScreenLoader';
import { User, Gift, Copy, Check, X } from 'lucide-react';
import { FaLine, FaXTwitter } from 'react-icons/fa6';
import { SiHatenabookmark } from 'react-icons/si';
import { Announcement, mockAnnouncements } from '@/lib/data/announcements';
import { AnnouncementModal } from '@/components/dashboard/AnnouncementModal';

/* ─── Icons ─── */
function IconCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

function IconLogout({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
    );
}

function IconPlus({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}

function IconInfoCircle({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
    );
}

function IconBot({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 10.688c0-1.036.84-1.875 1.875-1.875h.375m15 0h.375c1.036 0 1.875.84 1.875 1.875v3.375c0 1.036-.84 1.875-1.875 1.875h-.375m-15 0h-.375A1.875 1.875 0 012.25 14.063v-3.375z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 7.5c0-1.864 1.51-3.375 3.375-3.375h4.5c1.864 0 3.375 1.511 3.375 3.375v9A3.375 3.375 0 0114.25 19.875h-4.5A3.375 3.375 0 016.375 16.5v-9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v2.25" />
        </svg>
    );
}

function IconSend({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
    );
}

function IconX({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

function IconChevronDown({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'bg-slate-200 text-slate-600' },
    starter: { label: 'Starter', color: 'bg-brand/10 text-brand' },
    pro: { label: 'Pro', color: 'bg-amber/10 text-amber' },
};

export function DashboardShell({ children }: { children?: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const { user, profile, isLoading: authLoading, signOut } = useAuth();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
    const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    // Announcements state
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsAnnouncementModalOpen(true);
    };

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText('HIRO-2026-WEB');
            setHasCopied(true);
            setTimeout(() => setHasCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
        router.refresh();
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
            </div>
        );
    }

    const plan = PLAN_LABELS[profile?.subscription_plan || 'free'];

    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-50 font-sans">
            {/* 1. Global Header */}
            <header className="h-14 bg-white border-b border-border flex items-center justify-center shrink-0 sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <div className="w-full max-w-[1440px] px-6 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2.5 cursor-pointer selection:bg-transparent" onClick={() => router.push('/dashboard')}>
                            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-sm shadow-brand/20">
                                <span className="text-white text-[10px] font-black tracking-widest">LPO</span>
                            </div>
                            <span className="text-[16px] font-bold text-slate-800 tracking-tight">AI LPO Builder</span>
                        </div>

                        {/* Main Nav */}
                        <nav className="hidden md:flex items-center gap-7">
                            <Link href="/dashboard" className="text-sm font-bold text-brand relative after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-0.5 after:bg-brand after:rounded-t-full">マイページ</Link>
                            <Link href="/pricing" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">料金プラン</Link>
                            <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">スタートガイド</Link>
                            <Link href="#" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">お役立ち情報</Link>
                        </nav>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-3 hover:bg-slate-100 p-1.5 pl-2 pr-3 rounded-xl transition-colors cursor-pointer border border-transparent">
                                <Avatar className="w-10 h-10 rounded-lg bg-slate-100 text-slate-500">
                                    <AvatarFallback className="rounded-lg bg-transparent flex items-center justify-center">
                                        <User className="w-5 h-5" strokeWidth={2.5} />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden sm:flex flex-col text-left mr-1">
                                    <span className="text-sm font-bold text-slate-700 leading-tight">
                                        {user?.email || 'Guest'}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground mt-0.5">
                                        {plan.label}プラン
                                    </span>
                                </div>
                                <IconChevronDown className="w-4 h-4 text-slate-500 ml-1" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-slate-200 p-1">
                            <div className="px-3 py-2.5 mb-1 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-800 truncate">{user?.email}</p>
                            </div>
                            <Link href="/dashboard/settings/account" className="w-full">
                                <DropdownMenuItem className="text-[13px] py-2.5 px-3 cursor-pointer font-medium text-slate-600 focus:text-slate-900 focus:bg-slate-100 rounded-lg">
                                    ご登録情報
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3 cursor-pointer font-medium text-slate-600 focus:text-slate-900 focus:bg-slate-100 rounded-lg">
                                ご契約情報
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3 cursor-pointer font-medium text-slate-600 focus:text-slate-900 focus:bg-slate-100 rounded-lg">
                                決済履歴
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3 cursor-pointer font-medium text-slate-600 focus:text-slate-900 focus:bg-slate-100 rounded-lg">
                                その他設定
                            </DropdownMenuItem>
                            <div className="h-px bg-slate-100 my-1 mx-2" />
                            <DropdownMenuItem className="text-[13px] py-2.5 px-3 cursor-pointer font-bold text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg" onClick={handleLogout}>
                                <IconLogout className="w-4 h-4 mr-2 stroke-[2.5]" />
                                ログアウト
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* 2. Sub-menu (Quick Access) */}
            <div className="h-14 bg-white border-b border-slate-200 flex items-center justify-center shrink-0">
                <div className="w-full max-w-[1440px] px-6 flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    <Button onClick={() => router.push('/editor/mock-new')} size="sm" className="bg-brand hover:bg-brand/90 text-white shadow-sm shadow-brand/20 h-[34px] rounded-md px-4 text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer">
                        <IconPlus className="w-4 h-4 mr-1.5" />
                        ページ作成
                    </Button>
                    <div className="w-px h-5 bg-slate-200 mx-2 shrink-0" />
                    <Button size="sm" variant="ghost" className="h-[34px] rounded-md px-4 text-[13px] font-medium text-slate-600 hover:text-slate-900 shrink-0 bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
                        フォーム管理
                        <Badge className="ml-2 h-4 px-1.5 bg-amber/10 text-amber hover:bg-amber/20 text-[9px] font-bold rounded border-none tracking-wider">BETA</Badge>
                    </Button>
                    <Button size="sm" variant="ghost" disabled className="h-[34px] rounded-md px-4 text-[13px] font-medium text-slate-400 shrink-0 opacity-70 bg-transparent">
                        予約システム管理
                        <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-[9px] font-bold rounded border-none bg-slate-100 text-slate-400 tracking-wider">COMING SOON</Badge>
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => router.push('/dashboard/domains')}
                        className={`h-[34px] rounded-md px-4 text-[13px] font-medium shrink-0 transition-all ${pathname.startsWith('/dashboard/domains') ? 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'}`}
                    >
                        独自ドメイン設定
                    </Button>
                </div>
            </div>

            {/* Content Area flex */}
            <div className="flex-1 flex justify-center w-full relative">
                <div className="w-full max-w-[1440px] flex relative">
                    {/* 3. Left Sidebar */}
                    <aside className="w-84 bg-white border-r border-slate-200 shrink-0 hidden lg:block shadow-[1px_0_2px_rgba(0,0,0,0.01)] z-10">
                        <div className="sticky top-14 w-84 h-[calc(100vh-56px)] overflow-y-auto overscroll-contain flex flex-col p-6 gap-6 pb-12 scrollbar-hide">
                            {/* ① ご利用状況 (Grouped Card) */}
                            <section aria-labelledby="usage-status">
                                <Card className="shadow-sm border-slate-200/80 bg-white overflow-hidden rounded-xl py-0 gap-0">
                                    <CardContent className="p-0 flex flex-col">
                                        {/* Header */}
                                        <div className="px-4 py-1.5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50 min-h-[40px]">
                                            <IconInfoCircle className="w-4 h-4 text-slate-500 shrink-0" />
                                            <h2 id="usage-status" className="text-xs font-bold text-slate-700 tracking-wider">ご利用状況</h2>
                                        </div>

                                        <div className="p-4 pt-3 flex flex-col gap-3">
                                            {/* Current Plan */}
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-slate-500">現在のプラン</span>
                                                <Badge className="bg-amber-100/80 hover:bg-amber-100 text-amber-800 border border-amber-200/50 shadow-sm text-[11px] font-black tracking-tight px-2.5 py-0.5">
                                                    {plan.label} プラン
                                                </Badge>
                                            </div>

                                            {/* Usage Stats */}
                                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100/80">
                                                <div className="flex justify-between items-end mb-1.5">
                                                    <span className="text-[11px] font-bold text-slate-600">公開ページ数</span>
                                                    <span className="text-[11px] font-bold text-slate-800 tracking-tight">0 <span className="text-slate-400 font-medium">/ 3</span></span>
                                                </div>
                                                <div className="w-full bg-slate-200/70 rounded-full h-1.5 mb-2 overflow-hidden">
                                                    <div className="bg-brand h-1.5 rounded-full" style={{ width: '0%' }} />
                                                </div>
                                                <p className="text-[10px] font-medium text-slate-500 text-right">0 ページ公開中</p>
                                            </div>

                                            {/* CTA Button */}
                                            <Button
                                                onClick={() => router.push('/pricing')}
                                                className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/20 font-bold text-xs h-9 tracking-wide transition-all active:scale-[0.98]"
                                            >
                                                プラン・機能一覧を見る
                                            </Button>
                                        </div>

                                        {/* Feature Accordion */}
                                        <div className="border-t border-slate-100 bg-slate-50/50 px-2">
                                            <Accordion type="single" collapsible className="w-full border-none">
                                                <AccordionItem value="features" className="border-none">
                                                    <AccordionTrigger className="text-[11px] font-bold text-slate-600 hover:no-underline hover:text-brand px-2 py-2">
                                                        現在利用できる機能一覧
                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-2 pb-3">
                                                        <ul className="text-[10.5px] font-medium text-slate-500 space-y-2 mt-1">
                                                            <li className="flex items-center gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                                                AI画像生成（月間30枚）
                                                            </li>
                                                            <li className="flex items-center gap-1.5">
                                                                <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                                                                AIテキスト生成（無制限）
                                                            </li>
                                                            <li className="flex items-center gap-1.5 text-slate-400">
                                                                <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                                                独自ドメイン接続（不可）
                                                            </li>
                                                            <li className="flex items-center gap-1.5 text-slate-400">
                                                                <div className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                                                フォーム機能（不可）
                                                            </li>
                                                        </ul>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>

                            {/* Referral Banner (Premium Light Design with User Image) */}
                            <div onClick={() => setIsReferralModalOpen(true)} className="block relative overflow-hidden rounded-xl bg-amber-50/20 border-2 border-amber-300 shadow-md shadow-amber-500/10 hover:shadow-lg hover:border-amber-400 transition-all group cursor-pointer shrink-0">
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0 pointer-events-none flex justify-end">
                                    <div className="relative w-[55%] h-full">
                                        <img src="/campaign-banner-light.png" alt="" className="w-full h-full object-contain object-right pr-4 pb-2 pt-2 opacity-90 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                                    </div>
                                </div>

                                <div className="relative p-5 py-4 flex flex-col items-start justify-center z-10 w-[70%]">
                                    <div className="flex items-center gap-1.5 w-full mb-1.5">
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-amber-600">Referral Program</span>
                                    </div>
                                    <h3 className="text-[13px] font-bold tracking-tight text-slate-800 leading-snug mb-2 group-hover:text-amber-600 transition-colors duration-300">
                                        お友達招待で<br />両方に特別な特典を
                                    </h3>
                                    <div className="text-[11px] font-bold text-amber-600 flex items-center gap-1 group-hover:text-amber-700 transition-colors duration-300">
                                        詳細を確認する
                                    </div>
                                </div>

                                {/* Decorative glow */}
                                <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-200/50 rounded-full blur-xl group-hover:bg-amber-300/50 transition-colors duration-500"></div>
                            </div>

                            {/* ② お知らせ */}
                            <div>
                                <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3 px-1">お知らせ</h3>
                                <div className="space-y-3 relative group">
                                    {mockAnnouncements.slice(0, 3).map((announcement) => (
                                        <div
                                            key={announcement.id}
                                            onClick={() => handleAnnouncementClick(announcement)}
                                            className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-brand/40 hover:shadow-md transition-all cursor-pointer group/item"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge className="bg-brand/10 text-brand hover:bg-brand/10 h-4.5 px-1.5 text-[9px] font-bold rounded border-none">お知らせ</Badge>
                                                <span className="text-[10px] font-medium text-slate-400">{announcement.date}</span>
                                            </div>
                                            <p className="text-[12px] font-bold text-slate-700 group-hover/item:text-brand transition-colors leading-relaxed line-clamp-2">
                                                {announcement.title}
                                            </p>
                                        </div>
                                    ))}

                                    {/* 一覧へのリンク */}
                                    <div className="text-right pt-2 px-1">
                                        <Link href="/announcements" className="text-[11px] font-bold flex items-center justify-end text-slate-500 hover:text-brand transition-colors hover:-translate-y-[1px]">
                                            一覧へ
                                            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* ③ 新機能 */}
                            <div>
                                <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase mb-3 px-1">新機能・サービス向上</h3>
                                <div className="relative h-28 bg-gradient-to-br from-[#1E3A5F] to-brand rounded-xl overflow-hidden shadow-sm shadow-brand/20 group cursor-pointer border border-transparent hover:border-white hover:ring-2 ring-brand/30 transition-all">
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-white/20 hover:bg-white/20 text-white border-none h-5 px-2 text-[10px] font-bold backdrop-blur-md rounded-md tracking-wider">NEW</Badge>
                                    </div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <p className="text-[13px] font-bold leading-tight drop-shadow-sm">次世代LPテンプレート<br />活用まとめ</p>
                                    </div>
                                    {/* Decorative elements */}
                                    <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-2xl" />
                                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand/40 rounded-full blur-xl" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* 4. Main Content Area */}
                    <main className="flex-1 bg-slate-50 flex flex-col relative w-full min-h-full">
                        {children ? (
                            <div className="w-full flex-1 p-4 lg:p-8">
                                {children}
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-6 border-slate-200/60 border-dashed">
                                <div className="flex flex-col items-center gap-4 text-center z-10 w-full max-w-sm mx-auto">
                                    <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
                                        <span className="text-slate-300 font-bold text-xs uppercase tracking-widest">Main</span>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-700">Main Content Area</h2>
                                        <p className="text-xs font-medium text-slate-400 mt-1">ここにプロジェクト一覧や解析データが入ります</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-6 text-brand border-brand/30 hover:bg-brand/5 shadow-sm"
                                            onClick={() => {
                                                setIsSimulatingLoad(true);
                                                setTimeout(() => setIsSimulatingLoad(false), 3500);
                                            }}
                                        >
                                            ローディング機能をテスト
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Global Footer */}
            <footer className="mt-auto bg-slate-900 py-10 flex items-center justify-center shrink-0 relative z-10 w-full border-t border-slate-800">
                <div className="w-full max-w-[1440px] px-6 flex flex-col items-center justify-center gap-8">
                    {/* Policy Links */}
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[13px] font-medium text-slate-400">
                        <Link href="/terms" className="hover:text-white transition-colors">利用規約</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
                        <Link href="/legal" className="hover:text-white transition-colors">特定商取引法に基づく表記</Link>
                        <Link href="/antisocial" className="hover:text-white transition-colors">反社会的勢力に対する基本方針</Link>
                        <Link href="/security" className="hover:text-white transition-colors">情報セキュリティ基本方針</Link>
                    </div>

                    {/* SNS Share Icons */}
                    <div className="flex items-center gap-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 border-none hover:bg-slate-700 hover:text-[#00A4DE] transition-colors duration-300 shadow-sm">
                                    <SiHatenabookmark className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>はてなブックマークに追加</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 border-none hover:bg-slate-700 hover:text-[#06C755] transition-colors duration-300 shadow-sm">
                                    <FaLine className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>LINEで送る</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 border-none hover:bg-slate-700 hover:text-white transition-colors duration-300 shadow-sm">
                                    <FaXTwitter className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>X（旧Twitter）で共有</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Copyright */}
                    <div className="text-[12px] font-medium text-slate-500">
                        &copy; 2026 AI LPO Builder All rights reserved.
                    </div>
                </div>
            </footer>

            {/* 5. Floating AI Chat Widget */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
                <style>{`
                    @keyframes shine {
                        0% { transform: translateX(-100%) skewX(-12deg); }
                        20% { transform: translateX(200%) skewX(-12deg); }
                        100% { transform: translateX(200%) skewX(-12deg); }
                    }
                    .animate-shine {
                        animation: shine 3s infinite;
                    }
                `}</style>

                {/* Chat Window Popover (Smooth Transition) */}
                <div
                    className={`mb-4 transition-all duration-300 ease-out origin-bottom-right ${isChatOpen
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                        }`}
                >
                    <Card className="w-[350px] h-[500px] shadow-2xl rounded-2xl flex flex-col overflow-hidden border-slate-200/80 bg-white/95 backdrop-blur-sm">
                        {/* Chat Header */}
                        <div className="h-14 border-b border-slate-100 px-4 flex items-center justify-between shrink-0 bg-slate-50/80">
                            <div className="flex items-center gap-2 text-brand">
                                <IconBot className="w-5 h-5 flex-shrink-0" />
                                <span className="text-[13px] font-bold tracking-wide">AI Partner</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full"
                                onClick={() => setIsChatOpen(false)}
                            >
                                <IconX className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4">
                            <div className="text-center text-[10px] text-slate-400 font-medium my-2">今日 10:23</div>

                            <div className="flex items-start gap-2.5">
                                <div className="w-7 h-7 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center shrink-0">
                                    <IconBot className="w-4 h-4 text-brand" />
                                </div>
                                <div className="bg-white border border-slate-200 text-slate-700 text-[12px] p-3 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed max-w-[85%]">
                                    ヒロさん、公開から1週間経ちましたが、<strong className="text-amber-600">GA4が未設定</strong>です。<br /><br />
                                    アクセス解析を始めるために、今すぐ設定しますか？
                                </div>
                            </div>

                            <div className="flex items-start justify-end gap-2.5">
                                <div className="bg-brand text-white text-[12px] p-3 rounded-2xl rounded-tr-sm shadow-sm leading-relaxed max-w-[85%]">
                                    どうやって設定すればいい？
                                </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                                <div className="w-7 h-7 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center shrink-0">
                                    <IconBot className="w-4 h-4 text-brand" />
                                </div>
                                <div className="bg-white border border-slate-200 text-slate-700 text-[12px] p-3 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed max-w-[85%]">
                                    測定ID（G-XXXXXXX）を入力するだけで完了します！<br />
                                    <Button variant="outline" size="sm" className="mt-2.5 text-[10px] h-7 px-3 text-brand border-brand/30 hover:bg-brand/5 shadow-sm">設定画面を開く</Button>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-slate-100 shrink-0 relative z-10">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="AIに何でも聞いてください..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-11 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all placeholder:text-slate-400 shadow-inner shadow-slate-100/50"
                                    disabled
                                />
                                <Button
                                    size="icon"
                                    className="absolute right-1.5 w-[28px] h-[28px] rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/20"
                                >
                                    <IconSend className="w-3.5 h-3.5 ml-[1px]" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Enhanced FAB (Floating Action Button) */}
                <Button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className="pointer-events-auto relative h-16 w-auto px-7 py-4 rounded-full shadow-2xl shadow-brand/40 bg-brand hover:bg-brand/90 text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-105 active:scale-95 group border border-brand-400/30"
                >
                    {/* Shine Effect Wrapper (Clipped to button bounds) */}
                    <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shine group-hover:via-white/50" />
                    </div>

                    {/* Notification Badge */}
                    {!isChatOpen && (
                        <div className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
                        </div>
                    )}

                    {/* Button Content */}
                    <div className="relative z-10 flex items-center justify-center">
                        {isChatOpen ? (
                            <>
                                <IconX className="w-6 h-6 mr-2" />
                                <span className="text-base font-bold tracking-wide">閉じる</span>
                            </>
                        ) : (
                            <>
                                <IconBot className="w-6 h-6 mr-2" />
                                <span className="text-base font-bold tracking-wide">AIに相談</span>
                            </>
                        )}
                    </div>
                </Button>
            </div >

            {/* Full Screen Loader Simulation */}
            <FullScreenLoader isLoading={isSimulatingLoad} />

            {/* Referral Campaign Modal Overlay */}
            {isReferralModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
                    {/* Darker Overlay */}
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsReferralModalOpen(false)} />

                    {/* Premium Modal Container */}
                    <div className="relative w-full max-w-[480px] bg-white rounded-3xl shadow-2xl shadow-black/30 flex flex-col animate-in zoom-in-95 duration-200">

                        {/* Custom Close Button for Image Overlay */}
                        <button
                            onClick={() => setIsReferralModalOpen(false)}
                            className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white/90 hover:text-white transition-all shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Full Bleed Header Image */}
                        <div className="w-full h-48 sm:h-56 relative shrink-0">
                            <img src="/image_3.png" alt="Gift Box" className="w-full h-full object-cover rounded-t-3xl" />
                            {/* Subtle gradient at the bottom to transition into white content */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>

                        {/* Content Area */}
                        <div className="px-8 pb-10 pt-4 relative z-10 flex flex-col items-center justify-center text-center">

                            <h2 className="text-[22px] md:text-2xl font-extrabold text-slate-900 tracking-tight mb-4 relative z-10 w-full text-center">
                                お友達紹介で、<br className="sm:hidden" />両方に超お得な特典！
                            </h2>
                            <p className="text-sm md:text-base text-slate-600 mb-6 leading-relaxed relative z-10 text-center">
                                あなたの紹介コードを使って、<br className="hidden sm:block" />
                                お友達が新しく有料プランに登録すると...
                            </p>

                            {/* Bright Amber Highlight Box for Reward */}
                            <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50/80 border border-amber-200/60 rounded-2xl py-5 px-4 shadow-sm mb-6 relative overflow-hidden group">
                                {/* Decor effects */}
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-200/40 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute -left-4 -bottom-4 w-20 h-24 bg-orange-200/40 rounded-full blur-xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

                                <span className="block font-bold text-slate-800 relative z-10 text-sm md:text-base mb-1 text-center">
                                    あなたとお友達の両方に
                                </span>
                                <span className="block text-2xl sm:text-[28px] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 relative z-10 text-center drop-shadow-sm">
                                    『月額料金1ヶ月分無料』
                                </span>
                            </div>

                            <p className="text-xs md:text-sm text-slate-500 mb-7 leading-relaxed font-medium relative z-10 text-center">
                                周りの経営者やご友人を誘って、<br className="hidden sm:block" />お得にサイト運営を始めましょう！
                            </p>

                            {/* Refined Referral Code Box (Colorful & Responsive) */}
                            <div className="w-full bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-2 border-dashed border-blue-200 rounded-2xl p-5 mb-8 relative group hover:border-brand/40 transition-colors shadow-sm overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-blue-400 group-hover:bg-brand transition-colors" />


                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 w-full pl-0 sm:pl-2">
                                    <div className="flex-1 min-w-0 overflow-visible w-full flex justify-center sm:justify-start py-1">
                                        <span className="text-xl sm:text-2xl font-black text-brand tracking-wider font-mono select-all truncate leading-normal">HIRO-2026-WEB</span>
                                    </div>
                                    <Button
                                        onClick={handleCopyCode}
                                        variant={hasCopied ? "default" : "secondary"}
                                        className={`w-full sm:w-auto shrink-0 transition-all font-bold rounded-xl h-11 px-5 shadow-sm ${hasCopied ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-brand hover:bg-brand/90 text-white shadow-brand/20'}`}
                                    >
                                        {hasCopied ? (
                                            <><Check className="w-4 h-4 mr-1.5" /> コピー完了</>
                                        ) : (
                                            <><Copy className="w-4 h-4 mr-1.5" /> コードをコピー</>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Premium SNS Shares */}
                            <div className="w-full flex flex-col items-center">
                                <p className="text-xs font-bold text-slate-400 mb-3 tracking-widest uppercase">SNSで共有する</p>
                                <div className="flex gap-4 w-full">
                                    <Button className="flex-1 h-12 bg-[#06C755] hover:bg-[#05b34c] text-white shadow-[0_4px_14px_0_rgba(6,199,85,0.39)] hover:shadow-[0_6px_20px_rgba(6,199,85,0.23)] hover:-translate-y-0.5 font-bold transition-all rounded-xl">
                                        <FaLine className="w-5 h-5 mr-2" /> LINEで共有する
                                    </Button>
                                    <Button className="flex-1 h-12 bg-[#000000] hover:bg-slate-900 text-white shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 font-bold transition-all rounded-xl">
                                        <FaXTwitter className="w-4 h-4 mr-2" /> ポストする
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Announcement Modal */}
            <AnnouncementModal
                isOpen={isAnnouncementModalOpen}
                onClose={() => setIsAnnouncementModalOpen(false)}
                announcement={selectedAnnouncement}
            />

        </div >
    );
}

export default DashboardShell;
