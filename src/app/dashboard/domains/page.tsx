'use client';

import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Globe, ArrowRightLeft, Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function DomainManagementPage() {
    const router = useRouter();

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto w-full space-y-8 pb-12">

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ドメイン取得／管理</h1>
                    <p className="text-sm font-medium text-slate-500">
                        あなたのサイトにピッタリの独自ドメインを取得、または既存のドメインを移管して一括管理しましょう。
                    </p>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        onClick={() => router.push('/dashboard/domains/register')}
                        className="rounded-2xl border-slate-200/60 shadow-sm hover:shadow-md hover:border-brand/30 transition-all cursor-pointer group bg-white overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full group-hover:scale-110 group-hover:bg-blue-500/10 transition-transform duration-500" />
                        <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100 group-hover:-translate-y-1 transition-transform">
                                <Plus className="w-8 h-8" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 mb-2">新規ドメインを取得する</h2>
                            <p className="text-sm font-medium text-slate-500 line-clamp-2">
                                まだドメインをお持ちでない方はこちら。ご希望の文字列でオリジナルドメインを検索・取得できます。
                            </p>
                            <Button variant="ghost" className="mt-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 font-bold px-0">
                                取得画面へ進む <ArrowRightLeft className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card
                        onClick={() => router.push('/dashboard/domains/transfer')}
                        className="rounded-2xl border-slate-200/60 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all cursor-pointer group bg-white overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full group-hover:scale-110 group-hover:bg-emerald-500/10 transition-transform duration-500" />
                        <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100 group-hover:-translate-y-1 transition-transform">
                                <ArrowRightLeft className="w-8 h-8" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800 mb-2">既存ドメインを移管する</h2>
                            <p className="text-sm font-medium text-slate-500 line-clamp-2">
                                すでに他社で取得済みのドメインをお持ちの方はこちら。当サービスに集約して一元管理が可能です。
                            </p>
                            <Button variant="ghost" className="mt-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/50 font-bold px-0">
                                移管画面へ進む <ArrowRightLeft className="w-4 h-4 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Managed Domains List */}
                <div className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-slate-400" />
                            現在管理中のドメイン
                        </h2>
                    </div>

                    <Card className="rounded-xl border-slate-200/60 shadow-sm bg-white overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[300px] font-bold text-slate-600 py-4">ドメイン名</TableHead>
                                    <TableHead className="font-bold text-slate-600 py-4">ステータス</TableHead>
                                    <TableHead className="font-bold text-slate-600 py-4">有効期限</TableHead>
                                    <TableHead className="font-bold text-slate-600 py-4">自動更新</TableHead>
                                    <TableHead className="text-right font-bold text-slate-600 py-4">設定</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* ダミーデータ */}
                                <TableRow className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-bold text-slate-800 py-4">
                                        example-lp.com
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-100/80 text-emerald-700 hover:bg-emerald-100 border-none">運用中</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-600">
                                        2027/10/01
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-bold text-brand">ON</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 font-bold">
                                            管理
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 transition-colors">
                                    <TableCell className="font-bold text-slate-800 py-4">
                                        my-campaign2025.net
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-amber-100/80 text-amber-700 hover:bg-amber-100 border-none">移管手続き中</Badge>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-600">
                                        -
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm font-bold text-slate-400">OFF</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900 font-bold">
                                            詳細
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </div>

            </div>
        </DashboardShell>
    );
}
