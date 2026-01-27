'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { auth, lpStorage } from '@/lib/storage';
import { parseLPFromUrl } from '@/lib/parser';

type ImportStep = 'input' | 'loading' | 'result';

export default function ImportPage() {
    const router = useRouter();
    const [step, setStep] = useState<ImportStep>('input');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState<{
        sectionCount: number;
        confidence: 'high' | 'medium' | 'low';
        notes: string[];
        lpId: string;
    } | null>(null);

    useEffect(() => {
        if (!auth.isLoggedIn()) {
            router.push('/login');
        }
    }, [router]);

    const handleImport = async () => {
        if (!url.trim()) {
            setError('URLを入力してください');
            return;
        }

        setError('');
        setStep('loading');

        // ローディング演出
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const { lp, confidence } = await parseLPFromUrl(url);

            // LPを保存
            lpStorage.save(lp);

            setResult({
                sectionCount: lp.sections.length,
                confidence,
                notes: lp.meta.notes,
                lpId: lp.id,
            });
            setStep('result');
        } catch (err) {
            console.error(err);
            setError('取り込みに失敗しました。URLを確認してください。');
            setStep('input');
        }
    };

    const getConfidenceLabel = (confidence: 'high' | 'medium' | 'low') => {
        switch (confidence) {
            case 'high': return { label: '高', color: 'text-green-600 bg-green-100' };
            case 'medium': return { label: '中', color: 'text-yellow-600 bg-yellow-100' };
            case 'low': return { label: '低', color: 'text-red-600 bg-red-100' };
        }
    };

    const sampleUrls = [
        { label: '飲食店LP', url: 'https://example.com/restaurant' },
        { label: '採用LP', url: 'https://example.com/recruit' },
        { label: 'サービスLP', url: 'https://example.com/service' },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
                        <h1 className="text-xl font-bold text-gray-800">LP Builder(仮)</h1>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                            ← ダッシュボードへ
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {step === 'input' && (
                    <Card className="bg-gray-50 border-gray-200">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl text-gray-800">新規LP取り込み</CardTitle>
                            <CardDescription className="text-gray-500">
                                LPのURLを入力して構造を解析します
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="url" className="text-gray-700">LP URL</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    placeholder="https://example.com/lp"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-400"
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={handleImport}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                取り込み開始
                            </Button>

                            <div className="pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 mb-3">サンプルURL（デモ用）:</p>
                                <div className="flex flex-wrap gap-2">
                                    {sampleUrls.map((sample) => (
                                        <button
                                            key={sample.url}
                                            onClick={() => setUrl(sample.url)}
                                            className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            {sample.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 'loading' && (
                    <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="py-16 text-center">
                            <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-gray-200 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">取り込み中...</h3>
                            <p className="text-gray-500">LP構造を解析しています</p>

                            <div className="mt-8 space-y-3 text-left max-w-xs mx-auto">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>HTMLを取得</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    <span>セクションを解析中...</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 'result' && result && (
                    <Card className="bg-gray-50 border-gray-200">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <CardTitle className="text-2xl text-gray-800">取り込み完了</CardTitle>
                            <CardDescription className="text-gray-500">
                                LP構造の解析が完了しました
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                                    <p className="text-3xl font-bold text-gray-800">{result.sectionCount}</p>
                                    <p className="text-sm text-gray-500">検出セクション</p>
                                </div>
                                <div className="bg-white border border-gray-200 p-4 rounded-lg text-center">
                                    <p className={`text-xl font-bold px-3 py-1 rounded-full inline-block ${getConfidenceLabel(result.confidence).color}`}>
                                        {getConfidenceLabel(result.confidence).label}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">抽出成功率</p>
                                </div>
                            </div>

                            {result.notes.length > 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm font-medium text-yellow-700 mb-1">注意事項</p>
                                            <ul className="text-sm text-yellow-600 space-y-1">
                                                {result.notes.map((note, i) => (
                                                    <li key={i}>• {note}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Link href={`/editor/${result.lpId}`} className="flex-1">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        エディタへ →
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setStep('input');
                                        setUrl('');
                                        setResult(null);
                                    }}
                                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                                >
                                    別のURLを取り込む
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
