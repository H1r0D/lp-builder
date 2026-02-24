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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, CheckCircle2, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';

const TLDs = ['.com', '.net', '.jp', '.co.jp', '.org'];

export default function RegisterDomainPage() {
    const router = useRouter();
    const [domainQuery, setDomainQuery] = useState('');
    const [selectedTld, setSelectedTld] = useState('.com');
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
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">新規ドメインを取得</h1>
                        <p className="text-sm font-medium text-slate-500 mt-2">
                            あなただけのオリジナルドメインで、サイトの信頼性を高めましょう！
                        </p>
                    </div>
                </div>

                {/* Search Area */}
                <Card className="rounded-2xl border-slate-200/80 shadow-sm bg-white overflow-hidden text-center py-10 px-4 md:px-10 relative">
                    {/* Decorative blurred blobs */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

                    <CardContent className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                            <Search className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 mb-6">希望のドメイン名を入力してください</h2>

                        <div className="flex flex-col sm:flex-row items-center w-full max-w-xl gap-3">
                            <div className="flex-1 flex w-full relative group">
                                <Input
                                    className="h-14 rounded-xl rounded-r-none border-r-0 border-slate-200 focus-visible:ring-0 focus-visible:border-brand/50 text-lg font-bold placeholder:font-normal placeholder:text-slate-400 pl-5 shadow-sm"
                                    placeholder="your-company-name"
                                    value={domainQuery}
                                    onChange={(e) => setDomainQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <Select value={selectedTld} onValueChange={setSelectedTld}>
                                    <SelectTrigger className="w24 sm:w-28 h-14 rounded-xl rounded-l-none border-l-0 text-lg font-bold bg-slate-50 border-slate-200 focus:ring-0 shadow-sm text-slate-700">
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
                                className="w-full sm:w-auto h-14 px-8 bg-brand hover:bg-brand/90 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
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
                    </CardContent>
                </Card>

            </div>

            {/* Search Result Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-[500px] rounded-2xl overflow-hidden p-0 gap-0">

                    {/* Credit Card Warning Alert */}
                    <div className="bg-amber-50 border-b border-amber-200/60 p-4 shrink-0 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-amber-800 mb-1">クレジットカードの登録が必要です</h4>
                            <p className="text-[13px] font-medium text-amber-700/80 mb-3 leading-relaxed">
                                ドメインを取得・更新するためには、事前に決済用のクレジットカード情報を登録していただく必要があります。
                            </p>
                            <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/settings/account')} className="bg-white border-amber-200 text-amber-700 hover:bg-amber-100 hover:text-amber-800 text-xs font-bold w-full shadow-sm">
                                <CreditCard className="w-4 h-4 mr-2" />
                                クレジットカードの登録はこちら
                            </Button>
                        </div>
                    </div>

                    <div className="p-6">
                        <DialogHeader className="mb-6">
                            <div className="flex items-center gap-2 text-emerald-600 mb-3 bg-emerald-50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-black text-sm tracking-wide">取得可能です！</span>
                            </div>
                            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                                {domainQuery}{selectedTld}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium pt-1">
                                このドメインは現在誰にも取得されていません。今すぐあなたのものにできます。
                            </DialogDescription>
                        </DialogHeader>

                        {/* Domain Price Info */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">取得料金 (1年目)</p>
                                <p className="text-xl font-black text-slate-800">¥1,180 <span className="text-xs font-medium text-slate-500 ml-1">/ 年</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-widest">更新料金 (2年目以降)</p>
                                <p className="text-base font-bold text-slate-600">¥1,480 <span className="text-[10px] font-medium text-slate-400">/ 年</span></p>
                            </div>
                        </div>

                        {/* Alternative TLDs */}
                        <div className="mb-8">
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">おすすめのドメイン</h4>
                            <div className="flex flex-col gap-2">
                                {TLDs.filter(t => t !== selectedTld).slice(0, 3).map((tld, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-slate-700 text-sm">{domainQuery}{tld}</span>
                                            <Badge className="bg-slate-100/80 text-slate-500 hover:bg-slate-200/80 border-none font-bold text-[10px]">取得可</Badge>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-slate-700 text-sm">¥{tld === '.jp' ? '2,980' : '1,280'}</span>
                                            <Button size="icon" variant="ghost" className="w-6 h-6 rounded-full text-slate-400 group-hover:text-brand group-hover:bg-brand/10">
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Action */}
                        <DialogFooter className="sm:justify-center border-t border-slate-100 pt-6">
                            <Button
                                className="w-full h-12 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                onClick={() => router.push(`/dashboard/domains/checkout?type=register&domain=${domainQuery}${selectedTld}&price=1180`)}
                            >
                                お支払い画面へ進む
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

        </DashboardShell>
    );
}
