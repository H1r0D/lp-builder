'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(
                authError.message === 'Invalid login credentials'
                    ? 'メールアドレスまたはパスワードが正しくありません'
                    : authError.message
            );
            setIsLoading(false);
        } else {
            router.push(redirect);
            router.refresh();
        }
    };

    return (
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
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white border-border text-foreground placeholder:text-muted-foreground focus:border-brand focus:ring-brand"
                    required
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
                        ログイン中...
                    </span>
                ) : (
                    'ログイン'
                )}
            </Button>

            <div className="text-center text-sm text-muted-foreground pt-2">
                アカウントをお持ちでないですか？{' '}
                <Link href="/signup" className="text-brand hover:underline font-medium">
                    新規登録
                </Link>
            </div>
        </form>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
            <Card className="w-full max-w-md mx-4 bg-white border-border shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-2">
                        <div className="w-10 h-10 bg-brand rounded-md flex items-center justify-center">
                            <span className="text-white text-sm font-bold">LP</span>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">AI LPO Builder</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        アカウントにログインしてください
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<div className="h-48 flex items-center justify-center"><div className="animate-spin h-6 w-6 border-3 border-brand border-t-transparent rounded-full" /></div>}>
                        {!process.env.NEXT_PUBLIC_SUPABASE_URL ? (
                            <div className="space-y-4 text-center">
                                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-md">
                                    データベース未設定のローカル環境です。<br />ログインなしでエディタを試せます。
                                </div>
                                <Link href="/dashboard" className="block w-full">
                                    <Button className="w-full bg-brand hover:bg-brand/90 text-white font-medium py-2.5 transition-all">
                                        テストモードでダッシュボードへ
                                    </Button>
                                </Link>
                                <div className="text-sm text-muted-foreground pt-2">
                                    または <Link href="/signup" className="text-brand hover:underline">新規登録画面</Link> へ
                                </div>
                            </div>
                        ) : (
                            <LoginForm />
                        )}
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}
