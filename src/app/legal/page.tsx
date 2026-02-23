import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-slate-50 relative selection:bg-brand/20 selection:text-brand-900 flex flex-col pt-16">
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
                <div className="max-w-5xl mx-auto h-full px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand rounded flex items-center justify-center">
                            <span className="text-white text-[10px] font-black tracking-widest">LPO</span>
                        </div>
                        <span className="text-[15px] font-bold text-slate-800 tracking-tight">AI LPO Builder</span>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="ghost" size="sm" className="font-bold text-slate-600 hover:text-brand">ダッシュボードへ戻る</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-50/50 border-b border-slate-100 p-8 md:p-12 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">特定商取引法に基づく表記</h1>
                    </div>

                    <div className="p-8 md:p-12">
                        <table className="w-full text-left border-collapse text-sm md:text-base">
                            <tbody>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 w-1/3 md:w-1/4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">販売業者</th>
                                    <td className="py-4 md:py-5 text-slate-600">AI LPO Builder 運営事務局<br />（法人名・事業主名：株式会社ダミーサンプル）</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">代表責任者</th>
                                    <td className="py-4 md:py-5 text-slate-600">山田 太郎</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">所在地</th>
                                    <td className="py-4 md:py-5 text-slate-600">
                                        〒100-0005<br />
                                        東京都千代田区丸の内X-X-X<br />
                                        ダミービル 10F
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">電話番号</th>
                                    <td className="py-4 md:py-5 text-slate-600">03-0000-0000（受付時間：平日 10:00 - 17:00）</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">メールアドレス</th>
                                    <td className="py-4 md:py-5 text-slate-600">support@lpo-builder.example.com</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">販売価格</th>
                                    <td className="py-4 md:py-5 text-slate-600">
                                        各プランの詳細ページにて表示する価格（消費税込）とします。
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">商品代金以外の必要料金</th>
                                    <td className="py-4 md:py-5 text-slate-600">本サービスを利用するためのインターネット接続料金、通信料金等はお客様のご負担となります。</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">支払時期および支払方法</th>
                                    <td className="py-4 md:py-5 text-slate-600">
                                        <strong>支払方法：</strong> クレジットカード決済（Stripe社が提供するオンライン決済サービスを利用）<br />
                                        <strong>支払時期：</strong> 初回は申込み完了時。以降は、登録されたプランに応じて1ヶ月または1年ごとの自動更新となり、更新日に決済されます。
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">引渡時期</th>
                                    <td className="py-4 md:py-5 text-slate-600">クレジットカード決済が完了した後、ただちに本サービスの全機能をご利用頂けます。</td>
                                </tr>
                                <tr className="border-b border-slate-100">
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">返品・キャンセルに関する特約</th>
                                    <td className="py-4 md:py-5 text-slate-600">
                                        デジタルコンテンツおよびSaaSというサービスの性質上、決済完了後の返品、返金、キャンセルはいかなる理由（予定していた利用ができなかった、成果が出なかった等）におきましてもお受けできません。<br />
                                        解約を希望される場合は、次回更新日の前日までにダッシュボードのアカウント設定画面より退会（サブスクリプションの解約）手続きを行ってください。解約手続き完了後も、有効期間満了まではサービスをご利用いただけます。
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-4 md:py-5 pr-4 align-top text-slate-700 font-bold tracking-wider text-[13px] md:text-[14px]">動作環境</th>
                                    <td className="py-4 md:py-5 text-slate-600">
                                        推奨ブラウザ：Google Chrome（最新版）、Apple Safari（最新版）、Microsoft Edge（最新版）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800 mt-auto bg-slate-900">
                <p>&copy; 2026 AI LPO Builder All rights reserved.</p>
            </footer>
        </div>
    );
}
