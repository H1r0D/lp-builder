'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
    ArrowLeft, CreditCard, Download, User, ImagePlus, Globe,
    MonitorOff, Code, Share2, BarChart, Sparkles,
    CalendarDays, MousePointerClick, Calendar, Lock, LayoutTemplate, Copy
} from 'lucide-react';

export default function AccountSettingsPage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    // Tab 2 extension features data
    const extensionFeatures = [
        { title: '公開可能ページ数上限', icon: <Copy className="w-5 h-5 text-slate-400" />, desc: '作成できるページの公開上限数。', locked: true },
        { title: '独自ドメイン設定', icon: <Globe className="w-5 h-5 text-slate-400" />, desc: '作成したページに任意のドメインを設定できます。', locked: true },
        { title: 'フォーム設置', icon: <LayoutTemplate className="w-5 h-5 text-slate-400" />, desc: 'お問い合わせフォームの設置・管理を行えます。', locked: true },
        { title: '広告の非表示', icon: <MonitorOff className="w-5 h-5 text-slate-400" />, desc: '公開ページの広告を非表示にできます。', locked: true },
        { title: 'カスタムコード埋め込み', icon: <Code className="w-5 h-5 text-slate-400" />, desc: 'ページに任意のコードを埋め込むことができます。', locked: true },
        { title: 'SNS連携', icon: <Share2 className="w-5 h-5 text-slate-400" />, desc: 'SNSのタイムラインなどをページに埋め込むことができます。', locked: true },
        { title: 'アクセス解析', icon: <BarChart className="w-5 h-5 text-slate-400" />, desc: 'ページの閲覧数などの解析機能が利用できます。', locked: true },
        { title: 'ファイルダウンロードの追加', icon: <Download className="w-5 h-5 text-slate-400" />, desc: '資料などのダウンロード機能をページ内に付与できます。', locked: true },
        { title: 'アニメーション機能', icon: <Sparkles className="w-5 h-5 text-slate-400" />, desc: 'アニメーションを付与することができます。', locked: true },
        { title: '予約機能', icon: <CalendarDays className="w-5 h-5 text-slate-400" />, desc: 'ネット予約受付・管理機能を利用できます。', isComingSoon: true, locked: true },
        { title: '予約機能アドバンス', icon: <MousePointerClick className="w-5 h-5 text-slate-400" />, desc: 'さらにコース別での予約管理などが可能になります。', isComingSoon: true, locked: true },
    ];

    return (
        <DashboardShell>
            <div className="max-w-4xl mx-auto w-full space-y-8 pb-12">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500 tracking-tight">アカウント設定</h1>
                        <p className="text-[13px] font-medium text-slate-500 mt-1">ご登録情報からご契約・決済状況まですべてを一括管理</p>
                    </div>
                </div>

                {/* Tabs Area */}
                <Card className="shadow-sm border-slate-200/80 bg-white overflow-hidden rounded-xl">
                    <Tabs defaultValue="registration" className="w-full">
                        <div className="border-b border-slate-200 bg-slate-50/50">
                            <TabsList className="bg-transparent h-auto w-full justify-start gap-1 p-1.5 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] rounded-none">
                                <TabsTrigger
                                    value="registration"
                                    className="data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow text-slate-500 font-bold px-6 py-3 rounded-lg transition-all shrink-0"
                                >
                                    ご登録情報
                                </TabsTrigger>
                                <TabsTrigger
                                    value="extensions"
                                    className="data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow text-slate-500 font-bold px-6 py-3 rounded-lg transition-all shrink-0"
                                >
                                    拡張機能利用情報
                                </TabsTrigger>
                                <TabsTrigger
                                    value="contracts"
                                    className="data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow text-slate-500 font-bold px-6 py-3 rounded-lg transition-all shrink-0"
                                >
                                    ご契約情報
                                </TabsTrigger>
                                <TabsTrigger
                                    value="billing"
                                    className="data-[state=active]:bg-brand data-[state=active]:text-white data-[state=active]:shadow text-slate-500 font-bold px-6 py-3 rounded-lg transition-all shrink-0"
                                >
                                    決済情報
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-6 md:p-10 bg-white min-h-[600px] overflow-hidden">

                            {/* Tab 1: ご登録情報 */}
                            <TabsContent value="registration" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                                <div className="max-w-2xl mx-auto space-y-10">
                                    <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">ご登録情報</h2>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                                        <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm">
                                            <AvatarImage src="" />
                                            <AvatarFallback className="bg-slate-100 text-slate-400">
                                                <User className="w-10 h-10" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-3 text-center sm:text-left">
                                            <h3 className="text-sm font-bold text-slate-700">プロフィール画像</h3>
                                            <div className="relative inline-block">
                                                <Button variant="outline" size="sm" className="font-bold text-xs pointer-events-none">
                                                    <ImagePlus className="w-4 h-4 mr-2" />
                                                    画像を変更する
                                                </Button>
                                                <input type="file" disabled={!isEditing} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">お名前 <span className="text-red-500">*</span></Label>
                                            <Input disabled={!isEditing} defaultValue="山田 太郎" className="bg-slate-50 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">会社名</Label>
                                            <Input disabled={!isEditing} defaultValue="株式会社サンプル" className="bg-slate-50 h-11" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label className="text-[13px] font-bold text-slate-700">メールアドレス <span className="text-red-500">*</span></Label>
                                            <Input disabled={!isEditing} defaultValue="yamada@example.com" type="email" className="bg-slate-50 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">電話番号</Label>
                                            <Input disabled={!isEditing} defaultValue="03-0000-0000" type="tel" className="bg-slate-50 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">都道府県</Label>
                                            <select disabled={!isEditing} className="w-full bg-slate-50 border border-slate-200 rounded-md h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50">
                                                <option>東京都</option>
                                                <option>大阪府</option>
                                                <option>その他</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">業種</Label>
                                            <Input disabled={!isEditing} defaultValue="IT・通信" className="bg-slate-50 h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">従業員数</Label>
                                            <select disabled={!isEditing} className="w-full bg-slate-50 border border-slate-200 rounded-md h-11 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent disabled:opacity-50">
                                                <option>1〜10名</option>
                                                <option>11〜50名</option>
                                                <option>51名以上</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-5 pt-6 border-t border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-[13px] font-bold text-slate-700">ワンタイムパスワード設定 (OTP)</Label>
                                                <p className="text-[11px] text-slate-500 mt-1">ログイン時の認証を強化します</p>
                                            </div>
                                            <Switch disabled={!isEditing} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Label className="text-[13px] font-bold text-slate-700">メール購読設定</Label>
                                                <p className="text-[11px] text-slate-500 mt-1">最新の機能やお得な情報を受け取る</p>
                                            </div>
                                            <Switch disabled={!isEditing} defaultChecked />
                                        </div>
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-slate-100">
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">クレジットカード情報</Label>
                                            <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-md h-11 px-4">
                                                <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                                    <CreditCard className="w-4 h-4 text-slate-400" />
                                                    **** **** **** 4242 (Visa)
                                                </div>
                                                <Button variant="ghost" size="sm" className="text-brand text-xs font-bold px-2 h-7" disabled={!isEditing}>変更</Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[13px] font-bold text-slate-700">特典コード</Label>
                                            <Input disabled={!isEditing} placeholder="プロモーションコードを入力" className="bg-slate-50 h-11" />
                                        </div>
                                    </div>

                                    <div className="pt-8">
                                        {isEditing ? (
                                            <Button onClick={() => setIsEditing(false)} className="w-full bg-brand hover:bg-brand/90 text-white font-bold h-12 shadow-md shadow-brand/20 transition-all text-[15px]">
                                                保存する
                                            </Button>
                                        ) : (
                                            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full font-bold h-12 border-slate-200 hover:bg-slate-50 transition-all text-[15px]">
                                                編集する
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Tab 2: 拡張機能利用情報 */}
                            <TabsContent value="extensions" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                                <div className="space-y-8">
                                    <div className="max-w-2xl">
                                        <h2 className="text-lg font-bold text-slate-800">拡張機能利用情報</h2>
                                        <p className="text-[13px] font-medium text-slate-500 mt-1">課金・アップグレードによって追加解放可能な機能の一覧です。</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {extensionFeatures.map((feat, idx) => (
                                            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-brand/30 transition-colors gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                        {feat.icon}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="text-sm font-bold text-slate-800 leading-tight">{feat.title}</h3>
                                                            {feat.isComingSoon && (
                                                                <Badge className="bg-slate-100 text-slate-400 border-none text-[9px] px-1.5 h-4">COMING SOON</Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">{feat.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 shrink-0 ml-14 md:ml-0 md:justify-end">
                                                    <div className="text-[11px] font-bold text-slate-400 flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-full">
                                                        <Lock className="w-3 h-3" />
                                                        現在はご利用できません
                                                    </div>
                                                    <Button variant="default" size="sm" className="bg-brand text-white font-bold text-[11px] h-8 px-4 shadow-sm hover:bg-brand/90 transition-all">
                                                        当機能を利用する
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Tab 3: ご契約情報 */}
                            <TabsContent value="contracts" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                                <div className="space-y-12 max-w-4xl mx-auto">

                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">ご契約中のプラン</h2>
                                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center space-y-4">
                                            <div className="w-16 h-16 bg-white rounded-full mx-auto flex items-center justify-center border border-slate-200 shadow-sm">
                                                <MonitorOff className="w-6 h-6 text-slate-400" />
                                            </div>
                                            <h3 className="text-[15px] font-bold text-slate-700">現在加入しているプランはありません</h3>
                                            <Link href="#" className="inline-block text-[13px] font-bold text-brand hover:underline underline-offset-4 decoration-brand/30">
                                                プラン情報の詳細はこちら
                                            </Link>
                                        </div>
                                    </section>

                                    <section>
                                        <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2 mb-6">従量課金 / オプション契約</h2>
                                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50/80 border-b border-slate-100">
                                                        <th className="py-4 px-6 text-[12px] font-bold text-slate-500 tracking-wider">利用日</th>
                                                        <th className="py-4 px-6 text-[12px] font-bold text-slate-500 tracking-wider">金額</th>
                                                        <th className="py-4 px-6 text-[12px] font-bold text-slate-500 tracking-wider">お支払方法</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan={3} className="py-10 text-center text-[13px] font-medium text-slate-400 bg-white">
                                                            オプション契約履歴はありません
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    <div className="pt-10 text-right">
                                        <Link href="#" className="text-xs text-slate-400 font-medium hover:text-slate-600 transition-colors underline underline-offset-4 decoration-slate-300">
                                            プラン解約をご検討の方はこちら
                                        </Link>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Tab 4: 決済情報 */}
                            <TabsContent value="billing" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-300">
                                <div className="space-y-12 max-w-4xl mx-auto">
                                    <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">決済履歴</h2>

                                    {/* Section 1 */}
                                    <section>
                                        <h3 className="text-[14px] font-bold text-slate-700 mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-brand rounded-full"></div> プラン契約決済履歴
                                        </h3>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                                            <p className="text-[13px] font-medium text-slate-400">決済履歴はありません</p>
                                        </div>
                                    </section>

                                    {/* Section 2 */}
                                    <section>
                                        <h3 className="text-[14px] font-bold text-slate-700 mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div> 従量課金決済履歴
                                        </h3>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                                            <p className="text-[13px] font-medium text-slate-400">決済履歴はありません</p>
                                        </div>
                                    </section>

                                    {/* Section 3 */}
                                    <section>
                                        <h3 className="text-[14px] font-bold text-slate-700 mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div> ドメイン購入履歴
                                        </h3>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
                                            <p className="text-[13px] font-medium text-slate-400">購入履歴はありません</p>
                                        </div>
                                    </section>

                                    {/* Section 4 */}
                                    <section>
                                        <h3 className="text-[14px] font-bold text-slate-400 mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-slate-300 rounded-full"></div> テンプレート購入履歴 <Badge className="ml-2 bg-slate-200 text-slate-500 border-none px-1.5 h-4 text-[9px]">COMING SOON</Badge>
                                        </h3>
                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center opacity-70">
                                            <p className="text-[13px] font-medium text-slate-400">機能準備中です</p>
                                        </div>
                                    </section>
                                </div>
                            </TabsContent>

                        </div>
                    </Tabs>
                </Card>

            </div>
        </DashboardShell>
    );
}
