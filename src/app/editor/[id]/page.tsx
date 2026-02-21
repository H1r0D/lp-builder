'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { generateSectionId } from '@/lib/storage';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import SimpleEditor from '@/components/editor/SimpleEditor';
import AdvancedEditor from '@/components/editor/AdvancedEditor';
import AIChatPanel from '@/components/editor/AIChatPanel';
import type { Section, SectionType, HeroData, FeaturesData, TestimonialsData, FAQData, FooterData } from '@/types/lp';
import type { Project } from '@/types/database';
import type { SectionStyles } from '@/components/editor/AdvancedEditor';
import { UpgradeModal } from '@/components/paywall/UpgradeModal';

/* ─── アイコン ─── */
function IconPC({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
        </svg>
    );
}

function IconSP({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
    );
}

function IconArrowLeft({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    );
}

function IconDownload({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
}

function IconCheck({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

/* ─── 新規セクションのデフォルトデータ ─── */
function getDefaultSectionData(type: SectionType): Section['data'] {
    switch (type) {
        case 'hero':
            return { heading: '新しいヒーローセクション', subheading: 'サブテキスト', ctaText: 'お問い合わせ', ctaLink: '#' } as HeroData;
        case 'features':
            return { items: [{ title: '特徴 1', body: '説明テキスト', iconImage: '' }] } as FeaturesData;
        case 'testimonials':
            return { items: [{ name: 'お客様名', quote: 'お客様の声を入力' }] } as TestimonialsData;
        case 'faq':
            return { items: [{ q: '質問を入力', a: '回答を入力' }] } as FAQData;
        case 'footer':
            return { companyName: '会社名', links: [{ label: 'リンク', url: '#' }] } as FooterData;
        default:
            return {} as Section['data'];
    }
}

const TYPE_LABELS: Record<string, string> = {
    hero: 'ヒーロー',
    features: '特徴',
    testimonials: 'お客様の声',
    faq: 'FAQ',
    footer: 'フッター',
};

/* ─── メインコンポーネント ─── */
export default function EditorPage() {
    const router = useRouter();
    const params = useParams();
    const lpId = params.id as string;
    const { user, profile, isLoading: authLoading } = useAuth();

    const [project, setProject] = useState<Project | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'pc' | 'sp'>('pc');
    const [editorMode, setEditorMode] = useState<'simple' | 'advanced'>('simple');
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [aiPanelOpen, setAiPanelOpen] = useState(true);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeFeature, setUpgradeFeature] = useState('');

    useEffect(() => {
        if (authLoading) return;

        // ローカルダミーIDかどうかチェック
        const isLocalDraft = lpId.startsWith('local-draft-');

        // 通常のプロジェクトアクセスで、ユーザーがいない場合はログインへ
        if (!user && !isLocalDraft) {
            router.push('/login');
            return;
        }

        const fetchProject = async () => {
            // ローカルダミーIDの処理
            if (lpId.startsWith('local-draft-')) {
                const mockProject: Project = {
                    id: lpId,
                    user_id: user?.id || 'dummy_user',
                    title: '無題のLP（ローカル保存）',
                    json_content: {},
                    status: 'draft',
                    slug: null,
                    thumbnail_url: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                setProject(mockProject);

                const defaultSection: Section = {
                    id: `sec_${Date.now()}_1`,
                    type: 'hero',
                    name: 'ヒーロー',
                    data: { heading: '新しいランディングページ', subheading: 'サブテキストを入力', ctaText: 'お問い合わせ', ctaLink: '#' },
                    visible: true,
                };
                setSections([defaultSection]);
                setSelectedSectionId(defaultSection.id);
                return;
            }

            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', lpId)
                    .single();

                if (error || !data) {
                    router.push('/dashboard');
                    return;
                }

                const projectData = data as Project;
                setProject(projectData);
                const content = projectData.json_content as { sections?: Section[] };
                const loadedSections = content?.sections || [];
                setSections(loadedSections);
                if (loadedSections.length > 0) {
                    setSelectedSectionId(loadedSections[0].id);
                }
            } catch (err) {
                console.error('Failed to fetch project:', err);
                router.push('/dashboard');
            }
        };

        fetchProject();
    }, [lpId, router, user, authLoading]);

    /* ── Save ── */
    const handleSave = useCallback(async () => {
        if (!project) return;
        setIsSaving(true);

        const supabase = createClient();
        const { error } = await supabase
            .from('projects')
            .update({
                json_content: { sections } as unknown as Record<string, unknown>,
                title: project.title,
            })
            .eq('id', project.id);

        if (error) {
            setSaveMessage('保存に失敗しました');
        } else {
            setSaveMessage('保存しました');
        }
        setTimeout(() => setSaveMessage(''), 2000);
        setIsSaving(false);
    }, [project, sections]);

    /* ── Section Update ── */
    const handleSectionUpdate = useCallback((sectionId: string, data: Section['data']) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === sectionId ? { ...s, data } : s
            )
        );
    }, []);

    /* ── Section Add ── */
    const handleSectionAdd = useCallback((type: SectionType) => {
        const newSection: Section = {
            id: generateSectionId(),
            type,
            name: TYPE_LABELS[type] || type,
            data: getDefaultSectionData(type),
            visible: true,
        };
        setSections((prev) => [...prev, newSection]);
    }, []);

    /* ── Section Delete ── */
    const handleSectionDelete = useCallback((id: string) => {
        if (!confirm('このセクションを削除しますか？')) return;
        setSections((prev) => prev.filter((s) => s.id !== id));
        setSelectedSectionId((prev) => (prev === id ? null : prev));
    }, []);

    /* ── Section Reorder (DnD) ── */
    const handleSectionsReorder = useCallback((newSections: Section[]) => {
        setSections(newSections);
    }, []);

    /* ── Move Section ── */
    const handleMoveSection = useCallback((id: string, direction: 'up' | 'down') => {
        setSections((prev) => {
            const index = prev.findIndex((s) => s.id === id);
            if (index < 0) return prev;
            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prev.length) return prev;
            const newSections = [...prev];
            [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
            return newSections;
        });
    }, []);

    /* ── Toggle Visibility ── */
    const handleToggleVisibility = useCallback((id: string) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, visible: !s.visible } : s
            )
        );
    }, []);

    /* ── Rename Section ── */
    const handleRenameSection = useCallback((id: string, name: string) => {
        setSections((prev) =>
            prev.map((s) =>
                s.id === id ? { ...s, name } : s
            )
        );
    }, []);

    /* ── Style Update (dummy) ── */
    const handleStyleUpdate = useCallback((_sectionId: string, _styles: SectionStyles) => {
        // 将来的に JSON に保存する
    }, []);

    /* ── Export ── */
    const handleExport = async () => {
        if (!project) return;
        // Paywall チェック: Free ユーザーはZIPエクスポート不可
        const plan = profile?.subscription_plan || 'free';
        if (plan === 'free') {
            setUpgradeFeature('ZIPエクスポート');
            setShowUpgradeModal(true);
            return;
        }
        try {
            const response = await fetch('/api/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lp: { ...project, sections } }),
            });
            if (!response.ok) throw new Error('Export failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${project.title.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch {
            alert('エクスポートに失敗しました');
        }
    };

    /* ── Loading ── */
    if (!project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-brand border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-[#f8fafc]">
            {/* ━━━━━━ Header ━━━━━━ */}
            <header className="h-12 bg-white border-b border-border flex items-center px-4 gap-3 flex-shrink-0">
                {/* 戻る + ロゴ */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <IconArrowLeft className="w-4 h-4" />
                            <div className="w-5 h-5 bg-brand rounded flex items-center justify-center">
                                <span className="text-white text-[8px] font-bold">LP</span>
                            </div>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>ダッシュボードに戻る</TooltipContent>
                </Tooltip>

                {/* タイトル */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <h1 className="text-sm font-medium text-foreground truncate">{project.title}</h1>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                        {sections.length} セクション
                    </Badge>
                </div>

                {/* ── Center: モード切替トグル ── */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Tabs value={editorMode} onValueChange={(v) => setEditorMode(v as 'simple' | 'advanced')}>
                        <TabsList className="bg-secondary h-8">
                            <TabsTrigger
                                value="simple"
                                className="text-[12px] h-6 px-3 data-[state=active]:bg-brand data-[state=active]:text-white"
                            >
                                かんたん
                            </TabsTrigger>
                            <TabsTrigger
                                value="advanced"
                                className="text-[12px] h-6 px-3 data-[state=active]:bg-brand data-[state=active]:text-white"
                            >
                                通常
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* ── Right: View mode + Save + Export ── */}
                <div className="flex items-center gap-2">
                    {/* View Mode (Advanced のみ) */}
                    {editorMode === 'advanced' && (
                        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'pc' | 'sp')}>
                            <TabsList className="bg-secondary h-7">
                                <TabsTrigger value="pc" className="h-5 px-1.5 data-[state=active]:bg-brand data-[state=active]:text-white">
                                    <IconPC className="w-3.5 h-3.5" />
                                </TabsTrigger>
                                <TabsTrigger value="sp" className="h-5 px-1.5 data-[state=active]:bg-brand data-[state=active]:text-white">
                                    <IconSP className="w-3.5 h-3.5" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    )}

                    <div className="h-5 w-px bg-border" />

                    {/* Save */}
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                        variant="outline"
                        className="h-7 text-xs border-border"
                    >
                        {saveMessage ? (
                            <span className="flex items-center gap-1 text-emerald-600">
                                <IconCheck className="w-3 h-3" />
                                保存済み
                            </span>
                        ) : isSaving ? '保存中...' : '保存'}
                    </Button>

                    {/* Export */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="sm"
                                onClick={handleExport}
                                className="bg-amber hover:bg-amber/90 text-white h-7 text-xs px-3"
                            >
                                <IconDownload className="w-3.5 h-3.5 mr-1" />
                                出力
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>ZIPファイルでエクスポート</TooltipContent>
                    </Tooltip>
                </div>
            </header>

            {/* ━━━━━━ Editor Body ━━━━━━ */}
            {editorMode === 'simple' ? (
                <SimpleEditor
                    sections={sections}
                    onSectionUpdate={handleSectionUpdate}
                />
            ) : (
                <AdvancedEditor
                    sections={sections}
                    selectedSectionId={selectedSectionId}
                    viewMode={viewMode}
                    onSectionsReorder={handleSectionsReorder}
                    onSectionUpdate={handleSectionUpdate}
                    onSectionSelect={setSelectedSectionId}
                    onSectionAdd={handleSectionAdd}
                    onSectionDelete={handleSectionDelete}
                    onMoveSection={handleMoveSection}
                    onToggleVisibility={handleToggleVisibility}
                    onRenameSection={handleRenameSection}
                    onStyleUpdate={handleStyleUpdate}
                />
            )}

            {/* ━━━━━━ AI Chat Panel (Simple Mode のみ常時表示) ━━━━━━ */}
            {editorMode === 'simple' && (
                <AIChatPanel isOpen={aiPanelOpen} onToggle={() => setAiPanelOpen(!aiPanelOpen)} />
            )}

            {/* ━━━━━━ Upgrade Modal ━━━━━━ */}
            <UpgradeModal
                open={showUpgradeModal}
                onOpenChange={setShowUpgradeModal}
                featureName={upgradeFeature}
            />
        </div>
    );
}
