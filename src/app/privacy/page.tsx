import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">プライバシーポリシー</h1>
                        <p className="mt-4 text-[13px] text-slate-500 font-medium">最終改定日：2026年2月22日</p>
                    </div>

                    <div className="p-8 md:p-12 prose prose-slate prose-sm md:prose-base max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand prose-a:no-underline hover:prose-a:underline leading-loose space-y-6">
                        <p>
                            AI LPO Builder（以下、「当サービス」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                        </p>

                        <h2>第1条（個人情報）</h2>
                        <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別情報）を指します。</p>

                        <h2>第2条（個人情報の収集方法）</h2>
                        <p>当サービスは、ユーザーが利用登録をする際に氏名、メールアドレスなどの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当サービスの提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。</p>

                        <h2>第3条（個人情報を収集・利用する目的）</h2>
                        <p>当サービスが個人情報を収集・利用する目的は、以下のとおりです。</p>
                        <ol>
                            <li>当サービスサービスの提供・運営のため</li>
                            <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                            <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当サービスが提供する他のサービスの案内のメールを送付するため</li>
                            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                            <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                            <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                            <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
                            <li>上記の利用目的に付随する目的</li>
                        </ol>

                        <h2>第4条（利用目的の変更）</h2>
                        <ol>
                            <li>当サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</li>
                            <li>利用目的の変更を行った場合には、変更後の目的について、当サービス所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</li>
                        </ol>

                        <h2>第5条（個人情報の第三者提供）</h2>
                        <ol>
                            <li>当サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                                <ul>
                                    <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                    <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                    <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                                    <li>予め次の事項を告知あるいは公表し、かつ当サービスが個人情報保護委員会に届出をしたとき
                                        <ol>
                                            <li>利用目的に第三者への提供を含むこと</li>
                                            <li>第三者に提供されるデータの項目</li>
                                            <li>第三者への提供の手段または方法</li>
                                            <li>本人の求めに応じて個人情報の第三者への提供を停止すること</li>
                                            <li>本人の求めを受け付ける方法</li>
                                        </ol>
                                    </li>
                                </ul>
                            </li>
                            <li>前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                                <ul>
                                    <li>当サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                                    <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                                    <li>個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合</li>
                                </ul>
                            </li>
                        </ol>

                        <h2>第6条（Cookie及びアクセス解析ツールの利用）</h2>
                        <ol>
                            <li>当サービスでは、利便性の向上やアクセス状況の収集のため、Cookieおよび類似技術を使用しています。</li>
                            <li>当サービスは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用していますが、このトラフィックデータは匿名で収集されており、個人を特定するものではありません。</li>
                        </ol>

                        <h2>第7条（個人情報の開示・訂正・利用停止等）</h2>
                        <p>ユーザー本人から個人情報の開示、訂正、追加、削除、利用停止等の請求があった場合、遅滞なくこれに対応します。ただし、本人確認ができない場合や、法令に違反する場合はこの限りではありません。</p>

                        <h2>第8条（プライバシーポリシーの変更）</h2>
                        <ol>
                            <li>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。</li>
                            <li>当サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</li>
                        </ol>
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-slate-500 border-t border-slate-800 mt-auto bg-slate-900">
                <p>&copy; 2026 AI LPO Builder All rights reserved.</p>
            </footer>
        </div>
    );
}
