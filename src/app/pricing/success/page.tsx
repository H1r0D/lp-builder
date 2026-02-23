import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand/20 relative">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none z-0"></div>

            {/* Standalone Header & Stepper */}
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 py-6 px-4 md:px-8 text-center sticky top-0 z-40 shadow-sm relative">
                <Link href="/" className="inline-block relative z-10 hover:opacity-80 transition-opacity">
                    <span className="font-extrabold text-2xl tracking-tight text-slate-900 flex items-center justify-center gap-2">
                        <span className="bg-brand text-white px-2 py-1 rounded-md text-xl leading-none shadow-sm">LPO</span>
                        AI LPO Builder
                    </span>
                </Link>

                <div className="max-w-2xl mx-auto mt-10 relative">
                    {/* Connecting Line */}
                    <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

                    <div className="flex justify-between relative z-10 w-full px-4">
                        {/* Step 1: Completed */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-base ring-4 ring-white">✓</div>
                            <span className="text-xs md:text-sm font-bold text-slate-500 tracking-wide">プラン選択</span>
                        </div>
                        {/* Step 2: Completed */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-base ring-4 ring-white">✓</div>
                            <span className="text-xs md:text-sm font-bold text-slate-500 tracking-wide">お支払方法確認</span>
                        </div>
                        {/* Step 3: Active */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30 ring-4 ring-white">3</div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 tracking-wide">申込完了</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-24 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-10 md:p-16 text-center w-full border border-slate-100 relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>

                    <div className="flex justify-center mb-8">
                        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-emerald-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">お申し込みが完了しました！</h1>

                    <p className="text-slate-600 text-base md:text-lg mb-12 leading-relaxed font-medium">
                        この度は AI LPO Builder のプランにご登録いただき、誠にありがとうございます。<br className="hidden md:block" />
                        お申し込みの内容については、ご登録のメールアドレス（<strong className="text-slate-800">hiro@example.com</strong>）宛に<br className="hidden md:block" />
                        お送りいたしましたので、内容をご確認ください。
                    </p>

                    <Link href="/dashboard" className="inline-block w-full md:w-auto">
                        <Button className="w-full md:w-auto h-14 px-8 font-bold text-[16px] bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/30 transition-all rounded-xl">
                            ダッシュボードへ戻る
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
