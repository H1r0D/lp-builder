'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, LogOut, ChevronDown } from 'lucide-react';
import { SiHatenabookmark } from 'react-icons/si';
import { FaLine, FaXTwitter } from 'react-icons/fa6';

import { useAuth } from '@/components/providers/AuthProvider';
import { Announcement, mockAnnouncements } from '@/lib/data/announcements';
import { AnnouncementModal } from '@/components/dashboard/AnnouncementModal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const PLAN_LABELS: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'bg-slate-200 text-slate-600' },
    starter: { label: 'Starter', color: 'bg-brand/10 text-brand' },
    pro: { label: 'Pro', color: 'bg-amber/10 text-amber' },
};

export default function AnnouncementsPage() {
    const router = useRouter();
    const { user, profile, signOut } = useAuth();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsModalOpen(true);
    };

    const handleLogout = async () => {
        await signOut();
        router.push('/login');
        router.refresh();
    };

    const plan = PLAN_LABELS[profile?.subscription_plan || 'free'];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
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
                            <Link href="/dashboard" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">マイページ</Link>
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
                                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                                        {plan?.label || 'Free'}プラン
                                    </span>
                                </div>
                                <ChevronDown className="w-4 h-4 text-slate-500 ml-1" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-slate-200 p-1">
                            <div className="px-3 py-2.5 mb-1 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-800 truncate">{user?.email}</p>
                            </div>
                            <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                アカウント設定
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                ご利用状況・プラン変更
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                お支払い履歴
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 my-1" />
                            <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                ヘルプセンター
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                お問い合わせ
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-100 my-1" />
                            <DropdownMenuItem onClick={handleLogout} className="text-xs font-bold text-red-600 py-2.5 px-3 rounded-lg focus:bg-red-50 focus:text-red-700 cursor-pointer">
                                <LogOut className="w-4 h-4 mr-2" />
                                ログアウト
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8">
                {/* Back button & Title container */}
                <div className="mb-6 flex flex-col gap-2 relative">
                    <Link
                        href="/dashboard"
                        className="self-start inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors py-1 pl-0 pr-3 rounded-lg"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        戻る
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight ml-1">お知らせ一覧</h1>
                </div>

                {/* Announcement Cards */}
                <div className="flex flex-col gap-4">
                    {mockAnnouncements.map((announcement) => (
                        <div
                            key={announcement.id}
                            onClick={() => handleAnnouncementClick(announcement)}
                            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 cursor-pointer hover:shadow-md transition-shadow group"
                        >
                            <div className="text-[13px] font-medium text-slate-400 shrink-0 w-28 sm:text-left text-left">
                                {announcement.date}
                            </div>
                            <h2 className="text-[15px] sm:text-[16px] font-bold text-slate-700 group-hover:text-brand transition-colors text-left sm:text-left leading-relaxed">
                                {announcement.title}
                            </h2>
                        </div>
                    ))}
                </div>
            </main>

            {/* Dashboard Footer */}
            <footer className="w-full bg-slate-900 py-12 px-6 shrink-0 mt-auto border-t border-slate-800">
                <div className="max-w-[1440px] mx-auto flex flex-col items-center gap-8">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform">
                            <span className="text-white text-[10px] font-black tracking-widest">LPO</span>
                        </div>
                        <span className="text-[20px] font-black text-white tracking-tight">AI LPO Builder</span>
                    </Link>

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

            <AnnouncementModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                announcement={selectedAnnouncement}
            />
        </div>
    );
}
