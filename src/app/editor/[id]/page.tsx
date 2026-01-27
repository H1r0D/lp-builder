'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { auth, lpStorage } from '@/lib/storage';
import SectionList from '@/components/editor/SectionList';
import Preview from '@/components/editor/Preview';
import EditPanel from '@/components/editor/EditPanel';
import type { LP, Section } from '@/types/lp';

export default function EditorPage() {
    const router = useRouter();
    const params = useParams();
    const lpId = params.id as string;

    const [lp, setLp] = useState<LP | null>(null);
    const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'pc' | 'sp'>('pc');
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        if (!auth.isLoggedIn()) {
            router.push('/login');
            return;
        }

        const loadedLp = lpStorage.getById(lpId);
        if (!loadedLp) {
            router.push('/dashboard');
            return;
        }

        setLp(loadedLp);
        if (loadedLp.sections.length > 0) {
            setSelectedSectionId(loadedLp.sections[0].id);
        }
    }, [lpId, router]);

    const handleSave = useCallback(async () => {
        if (!lp) return;
        setIsSaving(true);

        lpStorage.save(lp);

        setSaveMessage('保存しました');
        setTimeout(() => setSaveMessage(''), 2000);
        setIsSaving(false);
    }, [lp]);

    const handleSectionUpdate = useCallback((data: Section['data']) => {
        if (!lp || !selectedSectionId) return;

        setLp(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                sections: prev.sections.map(s =>
                    s.id === selectedSectionId ? { ...s, data } : s
                ),
                updatedAt: new Date().toISOString(),
            };
        });
    }, [selectedSectionId, lp]);

    const handleMoveSection = useCallback((id: string, direction: 'up' | 'down') => {
        if (!lp) return;

        const index = lp.sections.findIndex(s => s.id === id);
        if (index < 0) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= lp.sections.length) return;

        const newSections = [...lp.sections];
        [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];

        setLp(prev => prev ? { ...prev, sections: newSections } : prev);
    }, [lp]);

    const handleToggleVisibility = useCallback((id: string) => {
        if (!lp) return;

        setLp(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                sections: prev.sections.map(s =>
                    s.id === id ? { ...s, visible: !s.visible } : s
                ),
            };
        });
    }, [lp]);

    const handleRenameSection = useCallback((id: string, name: string) => {
        if (!lp) return;

        setLp(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                sections: prev.sections.map(s =>
                    s.id === id ? { ...s, name } : s
                ),
            };
        });
    }, [lp]);

    const handleExport = async () => {
        if (!lp) return;

        try {
            const response = await fetch('/api/export', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lp }),
            });

            if (!response.ok) throw new Error('Export failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${lp.title.replace(/[^a-zA-Z0-9]/g, '_')}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export error:', error);
            alert('エクスポートに失敗しました');
        }
    };

    if (!lp) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    const selectedSection = lp.sections.find(s => s.id === selectedSectionId) || null;

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 flex-shrink-0">
                <Link href="/dashboard" className="hover:opacity-80 transition-opacity">
                    <span className="text-lg font-bold text-gray-800">LP Builder(仮)</span>
                </Link>

                <div className="flex-1 min-w-0">
                    <h1 className="text-sm font-medium text-gray-600 truncate">{lp.title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    {/* View Mode Tabs */}
                    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'pc' | 'sp')}>
                        <TabsList className="bg-gray-100">
                            <TabsTrigger value="pc" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </TabsTrigger>
                            <TabsTrigger value="sp" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="h-6 w-px bg-gray-300"></div>

                    {/* Save Button */}
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        {isSaving ? '保存中...' : '保存'}
                    </Button>
                    {saveMessage && (
                        <span className="text-sm text-green-600">{saveMessage}</span>
                    )}

                    {/* Export Button */}
                    <Button
                        size="sm"
                        onClick={handleExport}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        ZIP出力
                    </Button>

                    <Link href="/dashboard">
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                            戻る
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Editor Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Section List */}
                <div className="w-64 flex-shrink-0">
                    <SectionList
                        sections={lp.sections}
                        selectedId={selectedSectionId}
                        onSelect={setSelectedSectionId}
                        onMove={handleMoveSection}
                        onToggleVisibility={handleToggleVisibility}
                        onRename={handleRenameSection}
                    />
                </div>

                {/* Center: Preview */}
                <div className="flex-1 min-w-0">
                    <Preview
                        sections={lp.sections}
                        selectedId={selectedSectionId}
                        viewMode={viewMode}
                        onSelect={setSelectedSectionId}
                    />
                </div>

                {/* Right Panel: Edit Panel */}
                <div className="w-80 flex-shrink-0">
                    <EditPanel
                        section={selectedSection}
                        onUpdate={handleSectionUpdate}
                        onRename={(name) => selectedSectionId && handleRenameSection(selectedSectionId, name)}
                    />
                </div>
            </div>
        </div>
    );
}
