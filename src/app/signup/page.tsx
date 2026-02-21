'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('パスワードが一致しません');
            return;
        }

        if (password.length < 6) {
            setError('パスワードは6文字以上で入力してください');
            return;
        }

        setIsLoading(true);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    referral_code_used: referralCode || undefined,
                },
            },
        });

        if (authError) {
            setError(authError.message);
            setIsLoading(false);
        } else {
            setIsSuccess(true);
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <Card className="w-full max-w-md mx-4 bg-white border-border shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-2">
                            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-foreground">確認メールを送信しました</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            <strong>{email}</strong> に確認メールを送信しました。<br />
                            メール内のリンクをクリックして登録を完了してください。
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Link href="/login">
                            <Button variant="outline" className="border-border">
                                ログインページへ戻る
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
            <Card className="w-full max-w-md mx-4 bg-white border-border shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 bg-brand rounded-md flex items-center justify-center">
                            <span className="text-white text-sm font-bold">LP</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">新規登録</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        無料アカウントを作成して始めましょう
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                        <div className="space-y-4 text-center">
                            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-md">
                                データベース未設定のローカル環境です。<br />登録なしでエディタを試せます。
                            </div>
                            <Link href="/dashboard" className="block w-full">
                                <Button className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2.5 transition-all">
                                    テストモードでダッシュボードへ
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                className="w-full border-brand text-brand hover:bg-brand/10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setEmail('sample@example.com');
                                    setIsSuccess(true);
                                }}
                            >
                                登録成功画面をプレビュー
                            </Button>
                            <div className="text-sm text-muted-foreground pt-2">
                                または <Link href="/login" className="text-brand hover:underline">ログイン画面</Link> へ
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">メールアドレス</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">パスワード</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="6文字以上"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-foreground">パスワード確認</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="もう一度入力"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="referral" className="text-muted-foreground text-xs flex items-center gap-1">
                                    🎁 招待コード（任意）
                                </Label>
                                <Input
                                    id="referral"
                                    type="text"
                                    placeholder="招待コードがあれば入力"
                                    value={referralCode}
                                    onChange={(e) => setReferralCode(e.target.value)}
                                    className="bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand h-9 text-sm"
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                                    {error}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2.5 transition-all"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        登録中...
                                    </span>
                                ) : (
                                    '無料で始める'
                                )}
                            </Button>

                            <div className="text-center text-sm text-muted-foreground pt-2">
                                すでにアカウントをお持ちですか？{' '}
                                <Link href="/login" className="text-brand hover:underline font-medium">
                                    ログイン
                                </Link>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
