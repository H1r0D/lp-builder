"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, CreditCard, Building2, HelpCircle, Loader2, ArrowRight } from 'lucide-react';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcJcb } from 'react-icons/fa6';

// A helper component to fetch search params safely
function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const plan = searchParams.get('plan') || 'Pro';
    const cycle = searchParams.get('cycle') || 'yearly';

    const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'invoice'>('credit_card');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate prices based on URL params
    const getPriceDisplay = () => {
        if (plan === 'Pro') {
            return cycle === 'yearly' ? '¥94,080 (税込 ¥103,488)' : '¥9,800 (税込 ¥10,780)';
        } else if (plan === 'Plus') {
            return cycle === 'yearly' ? '¥28,600 (税込 ¥31,460)' : '¥2,980 (税込 ¥3,278)';
        }
        return '¥---';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call for payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/pricing/success');
    };

    const renderCreditCardForm = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                <p className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand" />
                    ご利用いただけるクレジットカード
                </p>
                <div className="flex items-center gap-4">
                    <FaCcVisa className="w-10 h-10 text-blue-800" />
                    <FaCcMastercard className="w-10 h-10 text-[#EB001B]" />
                    <FaCcAmex className="w-10 h-10 text-blue-500" />
                    <FaCcJcb className="w-10 h-10 text-green-600" />
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="font-bold text-slate-700">カード番号</Label>
                    <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="h-12 text-lg tracking-widest bg-slate-50 border-slate-200 focus:bg-white transition-colors" required />
                    <p className="text-xs text-slate-500">※ハイフン（-）なしで半角数字をご入力ください。</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700">有効期限 (月/年)</Label>
                        <div className="flex gap-2">
                            <Select required>
                                <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue placeholder="MM" /></SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                                        <SelectItem key={n} value={n.toString().padStart(2, '0')}>{n.toString().padStart(2, '0')}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <span className="text-xl text-slate-300 self-center">/</span>
                            <Select required>
                                <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue placeholder="YY" /></SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 10 }, (_, i) => i + 24).map(n => (
                                        <SelectItem key={n} value={n.toString()}>{n.toString()}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvv" className="font-bold text-slate-700 flex items-center gap-1">セキュリティコード <HelpCircle className="w-4 h-4 text-slate-400" /></Label>
                        <Input id="cvv" placeholder="123" maxLength={4} className="h-12 text-lg tracking-widest bg-slate-50 border-slate-200 focus:bg-white transition-colors" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cardName" className="font-bold text-slate-700">カード名義人</Label>
                    <Input id="cardName" placeholder="TARO YAMADA" className="h-12 uppercase bg-slate-50 border-slate-200 focus:bg-white transition-colors" required />
                </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg text-xs leading-relaxed text-slate-500 mt-6 text-center border border-slate-100">
                <p>当サイトは本人認証サービス（3Dセキュア2.0）を導入しております。<br />お支払い情報はPCI-DSS完全準拠のStripe社によって安全に処理され、当サイトに保存されることはありません。</p>
            </div>
        </div>
    );

    const renderInvoiceForm = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-amber-700 flex items-center justify-center gap-2">
                    <Building2 className="w-5 h-5" />
                    請求書払いは【法人・個人事業主様】のみご利用いただけます。
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">会社名・屋号 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="株式会社○○" className="h-12 bg-slate-50" required />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">会社名 (フリガナ) <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="カブシキガイシャマルマル" className="h-12 bg-slate-50" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">代表者名 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="山田 太郎" className="h-12 bg-slate-50" required />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">代表者名 (フリガナ) <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="ヤマダ タロウ" className="h-12 bg-slate-50" required />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800">本店所在地情報</h4>
                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="space-y-2 md:col-span-4">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">郵便番号 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <Input placeholder="100-0000" className="h-12 bg-slate-50" required />
                        </div>
                        <div className="space-y-2 md:col-span-8">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">都道府県 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <Select required>
                                <SelectTrigger className="h-12 bg-slate-50"><SelectValue placeholder="選択してください" /></SelectTrigger>
                                <SelectContent><SelectItem value="tokyo">東京都</SelectItem><SelectItem value="osaka">大阪府</SelectItem></SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">市区町村 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="千代田区" className="h-12 bg-slate-50" required />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700 flex items-center gap-2">町名・番地 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                        <Input placeholder="丸の内1-1-1" className="h-12 bg-slate-50" required />
                    </div>
                    <div className="space-y-2">
                        <Label className="font-bold text-slate-700">ビル名・階数など</Label>
                        <Input placeholder="○○ビル 10F" className="h-12 bg-slate-50" />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800">ご担当者様（申請者）情報</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">ご担当者名 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <Input placeholder="山田 太郎" className="h-12 bg-slate-50" required />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">ご担当者名 (フリガナ) <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <Input placeholder="ヤマダ タロウ" className="h-12 bg-slate-50" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">電話番号 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <div className="flex items-center gap-2">
                                <Input className="h-12 bg-slate-50 text-center" placeholder="03" required />
                                <span>-</span>
                                <Input className="h-12 bg-slate-50 text-center" placeholder="0000" required />
                                <span>-</span>
                                <Input className="h-12 bg-slate-50 text-center" placeholder="0000" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold text-slate-700 flex items-center gap-2">メールアドレス <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">必須</span></Label>
                            <Input type="email" placeholder="example@company.com" className="h-12 bg-slate-50" required />
                            <p className="text-xs text-slate-500">※請求書データ（PDF）はこちらのメールアドレス宛に送付されます。</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h4 className="font-bold text-slate-800">お支払い条件の選択</h4>
                    <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 space-y-4">
                        <div className="space-y-3">
                            <Label className="font-bold text-slate-700">お支払い締日 <span className="text-red-500">*</span></Label>
                            <RadioGroup defaultValue="end_of_month" className="flex flex-col md:flex-row gap-4">
                                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-slate-200 flex-1 cursor-pointer hover:border-brand transition-colors">
                                    <RadioGroupItem value="end_of_month" id="r1" />
                                    <Label htmlFor="r1" className="cursor-pointer font-bold">毎月末日締め・翌月払い</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-slate-200 flex-1 cursor-pointer hover:border-brand transition-colors">
                                    <RadioGroupItem value="20th" id="r2" />
                                    <Label htmlFor="r2" className="cursor-pointer font-bold">毎月20日締め・翌月払い</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-3 pt-2">
                            <Label className="font-bold text-slate-700">お支払い方法 <span className="text-red-500">*</span></Label>
                            <RadioGroup defaultValue="bank" className="flex flex-col md:flex-row gap-4">
                                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-slate-200 flex-1 cursor-pointer hover:border-brand transition-colors">
                                    <RadioGroupItem value="bank" id="p1" />
                                    <Label htmlFor="p1" className="cursor-pointer font-bold">銀行振込</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg border border-slate-200 flex-1 cursor-pointer hover:border-brand transition-colors">
                                    <RadioGroupItem value="convenience" id="p2" />
                                    <Label htmlFor="p2" className="cursor-pointer font-bold">コンビニ払い</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-slate-100 p-5 rounded-xl text-xs leading-relaxed text-slate-500 mt-6 space-y-2 border border-slate-200">
                <p className="font-bold text-slate-700">【請求書払いに関するご注意事項】</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>請求書払いでのお申し込みには、所定の事前審査がございます。審査結果によっては、クレジットカード払いをお願いする場合がございます。</li>
                    <li>審査にはおおよそ1〜3営業日頂戴しております。審査通過後より、アカウントのアップグレードが適用されます。</li>
                    <li>振込手数料はお客様にてご負担くださいますようお願いいたします。</li>
                    <li>{cycle === 'yearly' ? '年額払いの場合、初回の請求書にて1年分一括でのご請求となります。' : '月額払いの場合、毎月のご請求となります。'}</li>
                </ul>
            </div>
        </div>
    );

    return (
        <React.Fragment>
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
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2 cursor-pointer" onClick={() => router.back()}>
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 flex items-center justify-center font-bold text-base ring-4 ring-white transition-colors">✓</div>
                            <span className="text-xs md:text-sm font-bold text-slate-500 tracking-wide">プラン選択</span>
                        </div>
                        {/* Step 2: Active */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-blue-500/30 ring-4 ring-white">2</div>
                            <span className="text-xs md:text-sm font-bold text-blue-600 tracking-wide">お支払方法確認</span>
                        </div>
                        {/* Step 3: Inactive */}
                        <div className="flex flex-col items-center gap-3 relative bg-white/50 px-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-base ring-4 ring-white">3</div>
                            <span className="text-xs md:text-sm font-bold text-slate-400 tracking-wide">申込完了</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-10 mb-16 relative z-10">

                {/* Order Summary */}
                <section className="mb-10">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">ご契約内容の確認</h2>

                    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-200 overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <th className="bg-slate-50 py-4 px-6 text-left font-bold text-slate-600 w-1/3">現在のプラン</th>
                                    <td className="py-4 px-6 font-medium text-slate-900 border-l border-slate-100">Free プラン</td>
                                </tr>
                                <tr>
                                    <th className="bg-slate-50 py-4 px-6 text-left font-bold text-slate-600">お申し込みプラン</th>
                                    <td className="py-4 px-6 font-bold text-brand border-l border-slate-100">{plan} プラン</td>
                                </tr>
                                <tr>
                                    <th className="bg-slate-50 py-4 px-6 text-left font-bold text-slate-600">ご利用開始予定日</th>
                                    <td className="py-4 px-6 font-medium text-slate-900 border-l border-slate-100">2026年2月23日（即時有効）</td>
                                </tr>
                                <tr>
                                    <th className="bg-slate-50 py-4 px-6 text-left font-bold text-slate-600">お支払いサイクル</th>
                                    <td className="py-4 px-6 font-medium text-slate-900 border-l border-slate-100">{cycle === 'yearly' ? '年一括払い' : '月額払い'}</td>
                                </tr>
                                <tr>
                                    <th className="bg-slate-50 py-5 px-6 text-left font-bold text-slate-600 text-base">今回のお支払い金額</th>
                                    <td className="py-5 px-6 font-extrabold text-2xl text-slate-900 border-l border-slate-100 bg-emerald-50/30">
                                        {getPriceDisplay()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <form onSubmit={handleSubmit}>
                    {/* Payment Method Toggle */}
                    <section className="mb-10 text-center">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 text-left">お支払い方法の選択</h2>
                        <div className="bg-slate-100 p-1.5 rounded-xl inline-flex mx-auto w-full md:w-auto overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('credit_card')}
                                className={`flex items-center justify-center gap-2 flex-1 md:w-64 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200 ${paymentMethod === 'credit_card'
                                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                <CreditCard className="w-5 h-5" /> クレジットカード決済
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('invoice')}
                                className={`flex items-center justify-center gap-2 flex-1 md:w-64 py-3 px-6 rounded-lg text-sm font-bold transition-all duration-200 ${paymentMethod === 'invoice'
                                    ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                <Building2 className="w-5 h-5" /> 請求書払い（法人等）
                            </button>
                        </div>
                    </section>

                    {/* Forms rendered based on state */}
                    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200 p-6 md:p-10 mb-10">
                        {paymentMethod === 'credit_card' ? renderCreditCardForm() : renderInvoiceForm()}
                    </div>

                    {/* Submit Actions */}
                    <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-200">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full md:w-64 h-14 px-8 font-bold text-[15px] border-slate-300 text-slate-600 bg-white hover:bg-slate-50 rounded-xl"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            プラン選択に戻る
                        </Button>
                        <Button
                            type="submit"
                            className="w-full md:w-80 h-14 font-extrabold text-[16px] bg-brand hover:bg-blue-600 text-white shadow-xl shadow-brand/20 transition-all rounded-xl relative overflow-hidden group"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> 処理中...</span>
                            ) : (
                                <span className="flex items-center gap-2">決済を確定して申し込む <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                            )}
                        </Button>
                    </div>
                </form>

            </main>
        </React.Fragment>
    );
}

export default function PricingCheckoutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand/20">
            <React.Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand animate-spin" />
                </div>
            }>
                <CheckoutContent />
            </React.Suspense>
        </div>
    );
}
