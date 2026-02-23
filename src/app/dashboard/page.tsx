'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import type { Project } from '@/types/database';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tag, X } from 'lucide-react';

/* ─── Icons ─── */
function IconAlertCircle({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    );
}

function IconMoreVertical({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
    );
}

function IconCheckCircle({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function IconLock({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
    );
}
function IconFolder({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
        </svg>
    );
}

function IconEye({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

function IconFileText({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    );
}

function IconPlus({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}

const MOCK_PROJECTS: Project[] = [
    {
        id: 'mock-1',
        title: '春の新作キャンペーンLP',
        status: 'published',
        user_id: 'user-1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        json_content: {},
        slug: null,
        thumbnail_url: null,
        tags: ['キャンペーン', '春'],
    },
    {
        id: 'mock-2',
        title: '無題のLP',
        status: 'draft',
        user_id: 'user-1',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 86400000).toISOString(),
        json_content: {},
        slug: null,
        thumbnail_url: null,
        tags: ['編集中'],
    },
];

export default function DashboardPage() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [selectedFilterTag, setSelectedFilterTag] = useState<string | null>(null);
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [newTagInput, setNewTagInput] = useState("");

    const handleOpenTagModal = (project: Project) => {
        setEditingProject(project);
        setNewTagInput("");
        setIsTagModalOpen(true);
    };

    const handleAddTag = () => {
        if (!newTagInput.trim() || !editingProject) return;

        const newTag = newTagInput.trim();
        const currentTags = editingProject.tags || [];

        if (!currentTags.includes(newTag)) {
            const updatedProjects = projects.map(p =>
                p.id === editingProject.id
                    ? { ...p, tags: [...currentTags, newTag] }
                    : p
            );
            setProjects(updatedProjects);
            setEditingProject({ ...editingProject, tags: [...currentTags, newTag] });
        }
        setNewTagInput("");
    };

    const handleToggleTag = (tag: string) => {
        if (!editingProject) return;
        const currentTags = editingProject.tags || [];

        // Add if missing, remove if present
        let newTags;
        if (currentTags.includes(tag)) {
            newTags = currentTags.filter(t => t !== tag);
        } else {
            newTags = [...currentTags, tag];
        }

        const updatedProjects = projects.map(p =>
            p.id === editingProject.id ? { ...p, tags: newTags } : p
        );
        setProjects(updatedProjects);
        setEditingProject({ ...editingProject, tags: newTags });
    };

    const allTags = Array.from(new Set(projects.flatMap(p => p.tags || [])));
    const displayedProjects = selectedFilterTag
        ? projects.filter(p => p.tags?.includes(selectedFilterTag))
        : projects;

    // Mock Fetch
    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoadingProjects(true);
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 600));
            setProjects(MOCK_PROJECTS);
            setIsLoadingProjects(false);
        };
        fetchProjects();
    }, []);

    // 新規 LP 作成 (Mock)
    const handleCreateNew = async () => {
        const newProject: Project = {
            id: `mock-${Date.now()}`,
            title: '無題のLP',
            status: 'draft',
            user_id: 'user-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            json_content: {},
            slug: null,
            thumbnail_url: null,
        };
        setProjects(prev => [newProject, ...prev]);
        router.push(`/editor/${newProject.id}`);
    };

    // プロジェクト削除 (Mock)
    const handleDelete = async (id: string) => {
        if (!confirm('本当に削除しますか？')) return;
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    // ローディング
    // if (authLoading) { // authLoading is not defined in this context, removed.
    //     return (
    //         <div className="min-h-screen bg-white flex items-center justify-center">
    //             <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
    //         </div>
    //     );
    // }

    const published = projects.filter((p) => p.status === 'published').length;
    const drafts = projects.filter((p) => p.status === 'draft').length;

    return (
        <DashboardShell>
            <div className="max-w-5xl mx-auto w-full space-y-8 pb-12">
                {/* 1. Important Notice */}
                <Alert className="bg-red-50/80 border-red-200 text-red-800 shadow-sm rounded-xl">
                    <IconAlertCircle className="h-5 w-5 stroke-red-600 mt-0.5" />
                    <AlertTitle className="text-sm font-bold tracking-tight text-red-700">【重要なお知らせ】</AlertTitle>
                    <AlertDescription className="text-xs font-medium text-red-600 mt-1">
                        2026年3月1日より、一部テンプレートの名称とカテゴリが変更になります。作成済みのLPへの影響はありませんが、詳細はこちらのお知らせをご確認ください。
                    </AlertDescription>
                </Alert>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800 tracking-tight">プロジェクト一覧</h2>
                        <p className="text-[13px] font-medium text-slate-500 mt-1">管理中のランディングページ（{projects.length}件）</p>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        <div className="flex items-center gap-2 shrink-0">
                            <Button
                                size="sm"
                                variant={selectedFilterTag === null ? "secondary" : "ghost"}
                                onClick={() => setSelectedFilterTag(null)}
                                className={`h-8 rounded-full text-xs font-bold px-4 ${selectedFilterTag === null ? 'bg-slate-800 text-white hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'}`}
                            >
                                すべて
                            </Button>
                            {allTags.map(tag => (
                                <Button
                                    key={tag}
                                    size="sm"
                                    variant={selectedFilterTag === tag ? "secondary" : "ghost"}
                                    onClick={() => setSelectedFilterTag(tag)}
                                    className={`h-8 rounded-full text-xs font-bold px-4 ${selectedFilterTag === tag ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                        <Button
                            size="sm"
                            onClick={handleCreateNew}
                            className="bg-brand hover:bg-brand/90 text-white shadow-sm shadow-brand/20 h-9 px-4 rounded-lg text-[13px] font-bold transition-all active:scale-95 shrink-0 ml-1"
                        >
                            <IconPlus className="w-4 h-4 mr-1.5" />
                            新規作成
                        </Button>
                    </div>
                </div>

                {isLoadingProjects ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full shadow-sm" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-24 bg-white border border-slate-200 border-dashed rounded-2xl">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                            <IconFolder className="w-7 h-7 text-slate-400" />
                        </div>
                        <h3 className="text-[15px] font-bold text-slate-700 mb-1">まだプロジェクトがありません</h3>
                        <p className="text-xs font-medium text-slate-500 mb-5">
                            新規作成ボタンから最初のLPを作りましょう
                        </p>
                        <Button
                            size="sm"
                            onClick={handleCreateNew}
                            className="bg-brand hover:bg-brand/90 text-white text-[13px] font-bold shadow-sm shadow-brand/20 px-6 h-9 rounded-lg"
                        >
                            <IconPlus className="w-4 h-4 mr-1.5" />
                            最初のLPを作成
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {displayedProjects.map((project) => {
                            // Dummy completion calculating based on id to simulate realistic data
                            const nameLength = project.title.length;
                            const isTitleSet = project.title !== '無題のLP';
                            const isFaviconSet = nameLength % 2 === 0;
                            const isAnalyticsSet = nameLength % 3 === 0;

                            const completedTasks = [isTitleSet, isFaviconSet, isAnalyticsSet].filter(Boolean).length;
                            const progressPercent = Math.round((completedTasks / 3) * 100);

                            return (
                                <Card key={project.id} className="overflow-hidden bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl py-0 gap-0">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col md:flex-row">
                                            {/* 2. Thumbnail & Basic Info */}
                                            <div className="flex-1 p-5 lg:p-6 flex flex-col md:flex-row gap-5 lg:gap-6 border-b md:border-b-0 md:border-r border-slate-100 min-w-0">
                                                {/* Thumbnail Placeholder */}
                                                <div className="w-full md:w-48 h-32 shrink-0 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200/60 relative overflow-hidden group">
                                                    <div className="absolute inset-0 bg-slate-200/50 flex items-center justify-center pointer-events-none group-hover:bg-transparent transition-colors">
                                                        <span className="text-[11px] font-bold text-slate-400 tracking-widest uppercase shadow-sm">No Image</span>
                                                    </div>
                                                </div>

                                                {/* Basic Info */}
                                                <div className="flex-1 flex flex-col min-w-0 py-1">
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <div className="min-w-0">
                                                            <h3 className="text-lg font-bold text-slate-800 truncate mb-1">{project.title}</h3>
                                                            {project.tags && project.tags.length > 0 && (
                                                                <div className="flex flex-wrap gap-1.5 mt-1.5 mb-2">
                                                                    {project.tags.map(tag => (
                                                                        <span key={tag} className="bg-slate-100 text-slate-600 text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold border border-slate-200/50 transition-colors">
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Badge
                                                            className={`shrink-0 h-6 px-3 text-[11px] font-bold tracking-wider rounded-md border-none ${project.status === 'published'
                                                                ? 'bg-brand text-white shadow-sm shadow-brand/20'
                                                                : 'bg-slate-100 text-slate-500'
                                                                }`}
                                                        >
                                                            {project.status === 'published' ? '公開中' : '非公開'}
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                                            lpo-builder.com/{project.id.slice(0, 8)}
                                                        </span>
                                                        <Link href="#" className="hidden sm:inline-block text-[10px] font-bold text-brand hover:underline hover:text-brand/80">独自ドメインを取得しませんか？</Link>
                                                    </div>

                                                    {/* 4. Quest-style Basic Settings */}
                                                    <div
                                                        onClick={() => router.push('/dashboard/settings/quest')}
                                                        className="mt-auto bg-slate-50/80 hover:bg-slate-100/80 cursor-pointer rounded-lg p-3.5 border border-slate-100 hover:border-slate-200 mb-3 transition-colors group"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[11px] font-bold text-slate-700 tracking-wide">公開に必要な基本設定</span>
                                                                {progressPercent === 100 ? (
                                                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 rounded">Complete!</span>
                                                                ) : (
                                                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 rounded">{progressPercent}%</span>
                                                                )}
                                                            </div>
                                                            <div className="text-[10px] font-bold text-brand group-hover:underline flex items-center gap-0.5">
                                                                詳細 <span className="text-xs leading-none">→</span>
                                                            </div>
                                                        </div>
                                                        <Progress value={progressPercent} className="h-1.5 bg-slate-200" indicatorClassName={progressPercent === 100 ? "bg-emerald-500" : "bg-amber-500"} />
                                                    </div>

                                                    {/* Memo Field */}
                                                    <div className="relative">
                                                        <div className="absolute top-2.5 left-2.5">
                                                            <IconFileText className="w-4 h-4 text-slate-400" />
                                                        </div>
                                                        <Textarea
                                                            placeholder="プロジェクトのメモや備忘録を入力..."
                                                            className="min-h-[60px] resize-none pb-2 pt-2.5 pl-8 pr-3 text-[11px] bg-white border-slate-200/80 focus-visible:ring-1 focus-visible:ring-brand/30 placeholder:text-slate-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 3. Action Buttons */}
                                            <div className="w-full md:w-[220px] bg-slate-50 border-l border-slate-100 p-5 lg:p-6 flex flex-col justify-center gap-2.5 shrink-0">
                                                <Button
                                                    onClick={() => router.push(`/editor/${project.id}`)}
                                                    className="w-full h-10 bg-brand hover:bg-brand/90 text-white shadow-sm shadow-brand/20 font-bold text-xs rounded-lg border border-brand-400/30 justify-start px-4 cursor-pointer"
                                                >
                                                    <svg className="w-4 h-4 mr-3 text-white/90" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                    ページ編集
                                                </Button>

                                                <Button variant="outline" className="w-full h-10 border-slate-200 text-slate-600 font-bold text-xs hover:bg-white hover:text-slate-900 rounded-lg justify-start px-4 shadow-sm cursor-pointer">
                                                    <IconEye className="w-4 h-4 mr-3 text-slate-400" />
                                                    プレビュー
                                                </Button>

                                                <Button variant="outline" className="w-full h-10 border-slate-200 text-slate-600 font-bold text-xs hover:bg-white hover:text-slate-900 rounded-lg justify-start px-4 shadow-sm group cursor-pointer">
                                                    <IconLock className="w-4 h-4 mr-3 text-amber-500" />
                                                    <span className="flex-1 text-left">アクセス解析</span>
                                                    <div className="flex items-center">
                                                        <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-amber-100 text-amber-700 border-none font-bold rounded shrink-0">PRO</Badge>
                                                    </div>
                                                </Button>

                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="w-full h-10 text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold text-xs rounded-lg justify-start px-4 cursor-pointer">
                                                            <IconMoreVertical className="w-4 h-4 mr-3 text-slate-400" />
                                                            <span className="flex-1 text-left">その他のメニュー</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48 p-1 rounded-xl shadow-lg border-slate-200">
                                                        <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                                            公開設定
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer">
                                                            複製して新しく作る
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleOpenTagModal(project);
                                                            }}
                                                            className="text-xs font-bold text-slate-600 py-2.5 px-3 rounded-lg focus:bg-slate-100 cursor-pointer"
                                                        >
                                                            <Tag className="w-4 h-4 mr-2" />
                                                            タグを付与
                                                        </DropdownMenuItem>
                                                        <div className="h-px bg-slate-100 my-1 mx-2" />
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleDelete(project.id);
                                                            }}
                                                            className="text-xs font-bold text-red-600 py-2.5 px-3 rounded-lg focus:bg-red-50 focus:text-red-700 cursor-pointer"
                                                        >
                                                            削除する
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
            {/* Tag Modal */}
            <Dialog open={isTagModalOpen} onOpenChange={setIsTagModalOpen}>
                <DialogContent className="sm:max-w-md p-6 rounded-2xl border-slate-200 shadow-2xl">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-slate-800">タグの付与・編集</DialogTitle>
                        <DialogDescription className="text-sm text-slate-500 mt-1">
                            タグを設定して整理しましょう。
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-2">
                        {/* Input new tag */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700">新しいタグを追加</label>
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="例: キャンペーン, 2026春..."
                                    value={newTagInput}
                                    onChange={(e) => setNewTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTag();
                                        }
                                    }}
                                    className="h-10 border-slate-200 focus-visible:ring-brand shadow-sm text-sm rounded-xl"
                                />
                                <Button onClick={handleAddTag} className="h-10 bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 shadow-sm shrink-0 rounded-xl">
                                    追加
                                </Button>
                            </div>
                        </div>

                        {/* Existing Tags / Current Tags */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-700">登録済みのタグから選ぶ</h4>
                            {allTags.length === 0 ? (
                                <p className="text-[13px] text-slate-400">現在登録されているタグはありません。</p>
                            ) : (
                                <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-xl border border-slate-100 text-left">
                                    {allTags.map(tag => {
                                        const isSelected = editingProject?.tags?.includes(tag);
                                        return (
                                            <button
                                                key={tag}
                                                onClick={() => handleToggleTag(tag)}
                                                className={`text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${isSelected
                                                    ? 'bg-brand text-white border-brand shadow-sm shadow-brand/20'
                                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                                    }`}
                                            >
                                                {tag}
                                                {isSelected && <X className="w-3 h-3 ml-1.5 inline-block -mt-0.5" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="mt-4 pt-4 border-t border-slate-100 flex justify-end w-full">
                        <Button
                            className="bg-brand hover:bg-brand/90 text-white font-bold px-8 shadow-sm shadow-brand/20 h-10 rounded-xl"
                            onClick={() => setIsTagModalOpen(false)}
                        >
                            保存する
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardShell>
    );
}
