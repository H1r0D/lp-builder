import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AntisocialPage() {
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
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">反社会的勢力に対する基本方針</h1>
                        <p className="mt-4 text-[13px] text-slate-500 font-medium">制定日：2026年2月22日</p>
                    </div>

                    <div className="p-8 md:p-12 prose prose-slate prose-sm md:prose-base max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
                        <p>
                            AI LPO Builder（以下、「当サービス」といいます。）は、社会の秩序や安全に脅威を与え、健全な経済・社会の発展を妨げる反社会的勢力との関係を遮断するため、以下のとおり「反社会的勢力に対する基本方針」を定め、これを遵守します。
                        </p>

                        <h2>1. 組織としての対応</h2>
                        <p>反社会的勢力に対しては、担当者や担当部門に任せることなく、経営トップ以下、組織全体としての対応を行います。また、反社会的勢力に対応する従業員の安全を確保します。</p>

                        <h2>2. 外部専門機関との連携</h2>
                        <p>反社会的勢力による不当要求に備えて、平素から、警察、暴力追放運動推進センター、弁護士等の外部の専門機関と緊密な連携関係を構築します。</p>

                        <h2>3. 取引を含めた一切の関係遮断</h2>
                        <p>反社会的勢力とは、当サービスが提供するSaaSの利用を通じた取引関係（AI機能の利用やLPの公開等を含む）を含め、一切の関係をもちません。また、反社会的勢力による不当要求は一切拒絶します。</p>
                        <p>本方針に基づき、ユーザーが反社会的勢力であると判明した場合、または反社会的勢力と不適切な関係があると判断した場合には、事前の通知や同意なく、ただちにアカウントの停止・強制退会等の断固たる措置を実施します。これに同意いただけない方のサービスの利用はお断りします。</p>

                        <h2>4. 有事における民事と刑事の法的対応</h2>
                        <p>反社会的勢力による不当な要求に対しては、民事と刑事の両面からあらゆる法的対応を行います。</p>

                        <h2>5. 裏取引や資金提供の禁止</h2>
                        <p>事実を隠蔽するための裏取引や、反社会的勢力に対する資金提供は、どのような理由があっても一切行いません。</p>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800 mt-auto bg-slate-900">
                <p>&copy; 2026 AI LPO Builder All rights reserved.</p>
            </footer>
        </div>
    );
}
