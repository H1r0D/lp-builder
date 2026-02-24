'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, Search, CheckCircle2, ChevronRight, HelpCircle, ArrowRightLeft, AlertCircle } from 'lucide-react';

const TLDs = ['.com', '.net', '.jp', '.co.jp', '.org'];

export default function TransferDomainPage() {
    const router = useRouter();
    const [domainQuery, setDomainQuery] = useState('');
    const [selectedTld, setSelectedTld] = useState('.com');
    const [authCode, setAuthCode] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = () => {
        if (!domainQuery.trim()) return;
        setIsSearching(true);
        // Simulate loading API search
        setTimeout(() => {
            setIsSearching(false);
            setIsModalOpen(true);
        }, 1200);
    };

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">

                {/* Header with Back Button */}
                <div className="flex flex-col gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.back()}
                        className="w-fit text-slate-500 hover:text-slate-800 -ml-3"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        ドメイン管理へ戻る
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">既存ドメインを移管する</h1>
                        <p className="text-sm font-medium text-slate-500 mt-2">
                            すでにお持ちのドメインを当サービスに集約して、一括管理しましょう！
                        </p>
                    </div>
                </div>

                {/* Search Area */}
                <Card className="rounded-2xl border-slate-200/80 shadow-sm bg-white overflow-hidden text-center py-10 px-4 md:px-10 relative">
                    {/* Decorative blurred blobs */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

                    <CardContent className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                            <ArrowRightLeft className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-6">移管したいドメイン名を入力してください</h2>

                        <div className="flex flex-col sm:flex-row items-center w-full max-w-xl gap-3">
                            <div className="flex-1 flex w-full relative group">
                                <Input
                                    className="h-14 rounded-xl rounded-r-none border-r-0 border-slate-200 focus-visible:ring-0 focus-visible:border-emerald-500/50 text-lg font-bold placeholder:font-normal placeholder:text-slate-400 pl-5 shadow-sm"
                                    placeholder="your-company-name"
                                    value={domainQuery}
                                    onChange={(e) => setDomainQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Select value={selectedTld} onValueChange={setSelectedTld}>
                                    <SelectTrigger className="w-24 sm:w-28 h-14 rounded-xl rounded-l-none border-l-0 text-lg font-bold bg-slate-50 border-slate-200 focus:ring-0 shadow-sm text-slate-700">
                                        <SelectValue placeholder=".com" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                        {TLDs.map(tld => (
                                            <SelectItem key={tld} value={tld} className="font-bold text-slate-700">{tld}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button
                                onClick={handleSearch}
                                disabled={isSearching || !domainQuery.trim()}
                                className="w-full sm:w-auto h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                            >
                                {isSearching ? (
                                    <span className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                        検索中...
                                    </span>
                                ) : (
                                    '検索する'
                                )}
                            </Button>
                        </div>

                        <div className="mt-8 text-left bg-slate-50 rounded-xl p-5 border border-slate-200 w-full max-w-xl">
                            <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-slate-400" />
                                移管前にご確認ください
                            </h3>
                            <ul className="text-xs font-medium text-slate-600 space-y-2 list-disc pl-5">
                                <li>現在の管理会社で「ドメインロック（移管制限）」が解除されていること。</li>
                                <li>ドメイン登録者のメールアドレスでメールが受信可能であること。</li>
                                <li>AuthCode（移管承認コード）が手元にあること。</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

            </div>

            {/* Transfer Result & AuthCode Modal */}
            <TooltipProvider delayDuration={200}>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl overflow-hidden p-6">
                        <DialogHeader className="mb-6">
                            <div className="flex items-center gap-2 text-emerald-600 mb-3 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-black text-sm tracking-wide">移管可能です！</span>
                            </div>
                            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                                {domainQuery}{selectedTld}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium pt-1 leading-relaxed">
                                このドメインは当サービスへ移管を受け付けています。移管を進めるには、現在の管理会社で発行される「AuthCode（移管承認コード）」を入力してください。
                            </DialogDescription>
                        </DialogHeader>

                        {/* Auth Code Input Section */}
                        <div className="mb-8 p-5 bg-slate-50 rounded-xl border border-slate-200/80 shadow-inner">
                            <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="authcode" className="text-sm font-bold text-slate-700">AuthCode (移管承認コード)</Label>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-700 transition-colors">
                                            <HelpCircle className="w-3 h-3" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[200px] text-xs font-medium p-3">
                                        現在のドメイン管理会社の管理画面から取得できる、セキュリティ用のパスワードのような文字列です。「EPPキー」と呼ばれる場合もあります。
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <Input
                                id="authcode"
                                placeholder="例: A1b2C3d4E5f6G7"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                className="font-mono bg-white border-slate-300 focus-visible:ring-brand/30"
                            />
                            <p className="text-[11px] font-medium text-slate-400 mt-2 flex items-start gap-1">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                正しいAuthCodeを入力しないと移管手続きが進行しません。
                            </p>
                        </div>

                        {/* Transfer Fee Info */}
                        <div className="flex items-center justify-between px-2 mb-6">
                            <span className="text-sm font-bold text-slate-600">移管手数料（1年間の更新料込）</span>
                            <span className="text-lg font-black text-slate-800">¥1,480</span>
                        </div>

                        {/* Footer Action */}
                        <DialogFooter className="sm:justify-center border-t border-slate-100 pt-6">
                            <Button
                                className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                disabled={!authCode.trim()}
                                onClick={() => router.push(`/dashboard/domains/checkout?type=transfer&domain=${domainQuery}${selectedTld}&price=1480`)}
                            >
                                移管手数料のお支払いへ進む
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TooltipProvider>

        </DashboardShell>
    );
}
