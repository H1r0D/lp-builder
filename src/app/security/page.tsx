import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SecurityPage() {
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
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">情報セキュリティ基本方針</h1>
                        <p className="mt-4 text-[13px] text-slate-500 font-medium">制定日：2026年2月22日</p>
                    </div>

                    <div className="p-8 md:p-12 prose prose-slate prose-sm md:prose-base max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline leading-loose space-y-6">
                        <p>
                            AI LPO Builder（以下、「当サービス」といいます。）は、お客様がSaaSプラットフォーム上に入力した事業データや、作成されたランディングページ（LP）の情報等、当サービスが保有する全ての情報資産を守り、社会的責任を果たすため、以下の情報セキュリティ基本方針を定めます。
                        </p>

                        <h2>1. 情報セキュリティ管理体制と継続的改善</h2>
                        <p>当サービスは、情報セキュリティの維持及び保護のための確実な管理体制を築き、セキュリティインシデントの予防・対策を徹底します。また、情報セキュリティリスクに対応するため、定期的な見直しを実施し、継続的な改善に努めます。</p>

                        <h2>2. 法令および規範等の遵守</h2>
                        <p>当サービスは、情報セキュリティに関する法令、各種規範、およびユーザーの皆様との契約を厳格に遵守します。</p>

                        <h2>3. 情報資産の保護と安全管理措置</h2>
                        <p>当サービスは、お預かりした個人情報、システムデータなどの重要な情報資産を漏えい、不正アクセス、改ざん、滅失、き損から保護するため、クラウド事業者（Supabase等）の堅牢なインフラを活用するとともに、適切な物理的・技術的な安全管理措置（データベースの暗号化や権限分離など）を講じます。</p>

                        <h2>4. 教育とリテラシー向上</h2>
                        <p>当サービスに関わる全従業員・関係者に対し、情報セキュリティの重要性を認識させ、情報資産を適切に取り扱うための知識を高めるための定期的な教育および訓練を実施します。</p>

                        <h2>5. 違反・事故への対応</h2>
                        <p>情報セキュリティに関わる法令違反、契約違反、およびセキュリティ事故が発生した場合には、迅速に原因究明と被害を最小限に抑えるための対応を行い、再発防止策を講じます。ユーザーデータに影響があるインシデントが発生した場合は、速やかな情報開示に努めます。</p>

                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800 mt-auto bg-slate-900">
                <p>&copy; 2026 AI LPO Builder All rights reserved.</p>
            </footer>
        </div>
    );
}
