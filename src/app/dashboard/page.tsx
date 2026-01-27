'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth, lpStorage } from '@/lib/storage';
import type { LP } from '@/types/lp';

export default function DashboardPage() {
    const router = useRouter();
    const [lps, setLps] = useState<LP[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth.isLoggedIn()) {
            router.push('/login');
            return;
        }
        setLps(lpStorage.getAll());
        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        auth.logout();
        router.push('/login');
    };

    const handleDelete = (id: string) => {
        if (confirm('このLPを削除しますか？')) {
            lpStorage.delete(id);
            setLps(lpStorage.getAll());
        }
    };

    const handleDuplicate = (id: string) => {
        const duplicated = lpStorage.duplicate(id);
        if (duplicated) {
            setLps(lpStorage.getAll());
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-800">LP Builder(仮)</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{auth.getEmail()}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                        >
                            ログアウト
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">ダッシュボード</h2>
                        <p className="text-gray-500 mt-1">LP一覧と管理</p>
                    </div>
                    <Link href="/import">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            新規作成
                        </Button>
                    </Link>
                </div>

                {lps.length === 0 ? (
                    <Card className="bg-gray-50 border-gray-200 text-center py-16">
                        <CardContent>
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-200 flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">LPがありません</h3>
                            <p className="text-gray-500 mb-6">新規作成からLPを取り込みましょう</p>
                            <Link href="/import">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    最初のLPを作成
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {lps.map((lp) => (
                            <Card key={lp.id} className="bg-gray-50 border-gray-200 hover:border-blue-400 transition-all duration-200 group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {lp.title}
                                        </CardTitle>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${lp.status === 'published'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {lp.status === 'published' ? '公開中' : '下書き'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        更新: {formatDate(lp.updatedAt)}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                        {lp.sections.length} セクション
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/editor/${lp.id}`} className="flex-1">
                                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                                編集
                                            </Button>
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDuplicate(lp.id)}
                                            className="border-gray-300 text-gray-600 hover:bg-gray-100"
                                        >
                                            複製
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(lp.id)}
                                            className="border-red-200 text-red-500 hover:bg-red-50"
                                        >
                                            削除
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
