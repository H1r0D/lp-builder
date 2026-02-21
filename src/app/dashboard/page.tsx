'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import type { Project } from '@/types/database';

/* ─── Icons ─── */
function IconFolder({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    );
}

function IconChart({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
    );
}

function IconSettings({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
    );
}

function IconPlus({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}

function IconGift({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
    );
}

function IconLogout({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
        </svg>
    );
}

/* ─── Sidebar Nav Items ─── */
const NAV_ITEMS = [
    { icon: IconFolder, label: 'プロジェクト', href: '/dashboard', active: true },
    { icon: IconChart, label: '解析', href: '/dashboard/analytics', active: false },
    { icon: IconSettings, label: '設定', href: '#', active: false },
];

/* ─── Plan Labels ─── */
const PLAN_LABELS: Record<string, { label: string; color: string }> = {
    free: { label: 'Free', color: 'bg-secondary text-muted-foreground' },
    starter: { label: 'Starter', color: 'bg-brand/10 text-brand' },
    pro: { label: 'Pro', color: 'bg-amber/10 text-amber' },
};

export default function DashboardPage() {
    const router = useRouter();
    const { user, profile, isLoading: authLoading, signOut } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);

    // プロジェクト一覧を取得
    const fetchProjects = useCallback(async () => {
        if (!user) return;
        const supabase = createClient();
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false });

        if (!error && data) {
            setProjects(data as Project[]);
        }
        setIsLoadingProjects(false);
    }, [user]);

    useEffect(() => {
        if (!authLoading && user) {
            fetchProjects();
        } else if (!authLoading && !user) {
            setIsLoadingProjects(false);
        }
    }, [authLoading, user, fetchProjects]);

    // 新規 LP 作成
    const handleCreateNew = async () => {
        if (!user) {
            // ローカル環境向けフォールバック
            router.push(`/editor/local-draft-${Date.now()}`);
            return;
        }

        try {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('projects')
                .insert({
                    user_id: user.id,
                    title: '無題のLP',
                    json_content: {
                        sections: [
                            {
                                id: `sec_${Date.now()}_1`,
                                type: 'hero',
                                name: 'ヒーロー',
                                data: { heading: '新しいランディングページ', subheading: 'サブテキストを入力', ctaText: 'お問い合わせ', ctaLink: '#' },
                                visible: true,
                            },
                        ],
                    } as Record<string, unknown>,
                    status: 'draft' as const,
                })
                .select()
                .single();

            if (error) {
                console.error('Failed to create project in Supabase:', error);
                // 環境変数が無い等のエラー時はローカル用に進める
                router.push(`/editor/local-draft-${Date.now()}`);
                return;
            }

            if (data) {
                const project = data as Project;
                router.push(`/editor/${project.id}`);
            }
        } catch (err) {
            console.error('Exception creating project:', err);
            router.push(`/editor/local-draft-${Date.now()}`);
        }
    };

    // LP 削除
    const handleDelete = async (id: string) => {
        if (!confirm('このLPを削除しますか？')) return;
        const supabase = createClient();
        await supabase.from('projects').delete().eq('id', id);
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    // ログアウト
    const handleLogout = async () => {
        await signOut();
        router.push('/login');
        router.refresh();
    };

    // ローディング
    if (authLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
            </div>
        );
    }

    const plan = PLAN_LABELS[profile?.subscription_plan || 'free'];
    const published = projects.filter((p) => p.status === 'published').length;
    const drafts = projects.filter((p) => p.status === 'draft').length;

    return (
        <div className="h-screen flex bg-[#f8fafc]">
            {/* ━━━ Left Sidebar ━━━ */}
            <aside className="w-56 bg-white border-r border-border flex flex-col shrink-0">
                {/* Logo */}
                <div className="h-12 flex items-center px-4 border-b border-border gap-2">
                    <div className="w-6 h-6 bg-brand rounded flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold">LP</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">AI LPO Builder</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 space-y-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors ${item.active
                                ? 'bg-brand/8 text-brand font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Referral Card */}
                {profile && (
                    <div className="mx-3 mb-3 p-3 bg-amber/5 border border-amber/20 rounded-md">
                        <div className="flex items-center gap-1.5 mb-2">
                            <IconGift className="w-3.5 h-3.5 text-amber" />
                            <span className="text-[11px] font-semibold text-amber">友達紹介</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-2">
                            コードを共有して双方に +3 クレジット
                        </p>
                        <div className="bg-white rounded px-2 py-1.5 text-center">
                            <code className="text-xs font-mono font-bold text-foreground tracking-wider">
                                {profile.referral_code}
                            </code>
                        </div>
                    </div>
                )}

                {/* Plan Badge */}
                <div className="px-4 py-3 border-t border-border">
                    <Badge className={`text-[10px] ${plan.color}`}>{plan.label} プラン</Badge>
                    {profile && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                            クレジット残: {profile.credits}
                        </p>
                    )}
                </div>
            </aside>

            {/* ━━━ Main ━━━ */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-12 bg-white border-b border-border flex items-center px-6 gap-4 shrink-0">
                    <h1 className="text-sm font-semibold text-foreground flex-1">プロジェクト</h1>

                    {/* New LP Button */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                onClick={handleCreateNew}
                                className="bg-amber hover:bg-amber/90 text-white h-8 text-xs px-3"
                            >
                                <IconPlus className="w-3.5 h-3.5 mr-1" />
                                新規作成
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>新しいLPを作成</TooltipContent>
                    </Tooltip>

                    <Separator orientation="vertical" className="h-5" />

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <Avatar className="w-7 h-7 cursor-pointer">
                                <AvatarFallback className="bg-brand/10 text-brand text-[10px] font-semibold">
                                    {(user?.email || 'U')[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <div className="px-2 py-1.5">
                                <p className="text-xs font-medium text-foreground truncate">{user?.email}</p>
                                <p className="text-[10px] text-muted-foreground">{plan.label} プラン</p>
                            </div>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs">
                                <IconSettings className="w-3.5 h-3.5 mr-2" />
                                設定
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs text-red-600" onClick={handleLogout}>
                                <IconLogout className="w-3.5 h-3.5 mr-2" />
                                ログアウト
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                            { label: '合計', value: projects.length, color: 'text-foreground' },
                            { label: '公開中', value: published, color: 'text-emerald-600' },
                            { label: '下書き', value: drafts, color: 'text-muted-foreground' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white border border-border rounded-md p-4">
                                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* LP Cards */}
                    {isLoadingProjects ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin h-6 w-6 border-3 border-brand border-t-transparent rounded-full" />
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                                <IconFolder className="w-7 h-7 text-muted-foreground" />
                            </div>
                            <h3 className="text-sm font-medium text-foreground mb-1">まだプロジェクトがありません</h3>
                            <p className="text-xs text-muted-foreground mb-4">
                                新規作成ボタンから最初のLPを作りましょう
                            </p>
                            <Button
                                size="sm"
                                onClick={handleCreateNew}
                                className="bg-brand hover:bg-brand/90 text-white text-xs"
                            >
                                <IconPlus className="w-3.5 h-3.5 mr-1" />
                                最初のLPを作成
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group bg-white border border-border rounded-md hover:border-brand/30 hover:shadow-sm transition-all"
                                >
                                    {/* サムネイル */}
                                    <div className="h-32 bg-gradient-to-br from-brand/5 to-brand/10 rounded-t-md flex items-center justify-center">
                                        <span className="text-2xl font-bold text-brand/20">LP</span>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-medium text-foreground truncate">{project.title}</h3>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">
                                                    更新: {new Date(project.updated_at).toLocaleDateString('ja-JP')}
                                                </p>
                                            </div>
                                            <Badge
                                                className={`text-[10px] shrink-0 ${project.status === 'published'
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    : 'bg-secondary text-muted-foreground'
                                                    }`}
                                            >
                                                {project.status === 'published' ? '公開中' : '下書き'}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <Link href={`/editor/${project.id}`} className="flex-1">
                                                <Button size="sm" variant="outline" className="w-full h-7 text-xs border-border">
                                                    編集
                                                </Button>
                                            </Link>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 text-xs border-border text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDelete(project.id)}
                                            >
                                                削除
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
