'use client';

import { useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import EditPanel from '@/components/editor/EditPanel';
import Preview from '@/components/editor/Preview';
import type { Section, SectionType } from '@/types/lp';

/* ─── Props ─── */
interface AdvancedEditorProps {
    sections: Section[];
    selectedSectionId: string | null;
    viewMode: 'pc' | 'sp';
    onSectionsReorder: (sections: Section[]) => void;
    onSectionUpdate: (sectionId: string, data: Section['data']) => void;
    onSectionSelect: (id: string) => void;
    onSectionAdd: (type: SectionType) => void;
    onSectionDelete: (id: string) => void;
    onMoveSection: (id: string, direction: 'up' | 'down') => void;
    onToggleVisibility: (id: string) => void;
    onRenameSection: (id: string, name: string) => void;
    onStyleUpdate: (sectionId: string, styles: SectionStyles) => void;
}

/* ─── スタイル型 ─── */
export interface SectionStyles {
    marginTop: number;
    marginBottom: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    backgroundColor: string;
}

/* ─── アイコン ─── */
function IconGrip({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
    );
}

function IconTrash({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

/* ─── セクション追加パネル ─── */
const SECTION_TEMPLATES: { type: SectionType; label: string; desc: string }[] = [
    { type: 'hero', label: 'ヒーロー', desc: 'メインビジュアル' },
    { type: 'features', label: '特徴', desc: '強み・特長の紹介' },
    { type: 'testimonials', label: 'お客様の声', desc: '評価・レビュー' },
    { type: 'faq', label: 'FAQ', desc: 'よくある質問' },
    { type: 'footer', label: 'フッター', desc: '会社情報・リンク' },
];

/* ─── ソータブルなセクションアイテム ─── */
function SortableSectionItem({
    section,
    index,
    total,
    isSelected,
    onSelect,
    onDelete,
    onToggleVisibility,
}: {
    section: Section;
    index: number;
    total: number;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onToggleVisibility: () => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group flex items-center gap-2 px-2 py-2 rounded-md text-[13px] transition-colors cursor-pointer ${isDragging ? 'opacity-50 bg-brand/10' : ''
                } ${isSelected
                    ? 'bg-brand/10 text-brand border border-brand/30'
                    : 'hover:bg-accent border border-transparent'
                } ${!section.visible ? 'opacity-40' : ''}`}
            onClick={onSelect}
        >
            {/* Drag Handle */}
            <button
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground p-0.5 shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                <IconGrip className="w-3.5 h-3.5" />
            </button>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{section.name}</p>
                <p className="text-[10px] text-muted-foreground">{section.type}</p>
            </div>

            {/* Actions (hover) */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div onClick={(e) => e.stopPropagation()}>
                    <Switch
                        checked={section.visible}
                        onCheckedChange={onToggleVisibility}
                        className="data-[state=checked]:bg-brand scale-75"
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="text-muted-foreground hover:text-destructive p-0.5"
                >
                    <IconTrash className="w-3.5 h-3.5" />
                </button>
            </div>
        </div>
    );
}

/* ─── プロパティパネル ─── */
function PropertyPanel({
    section,
    styles,
    onStyleUpdate,
    onUpdate,
    onRename,
}: {
    section: Section | null;
    styles: SectionStyles;
    onStyleUpdate: (styles: SectionStyles) => void;
    onUpdate: (data: Section['data']) => void;
    onRename: (name: string) => void;
}) {
    if (!section) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <p className="text-xs text-muted-foreground text-center">
                    左のセクション一覧から<br />編集する項目を選択してください
                </p>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto scrollbar-hide">
            {/* コンテンツ編集 */}
            <div className="border-b border-border">
                <EditPanel section={section} onUpdate={onUpdate} onRename={onRename} />
            </div>

            {/* スタイル設定 */}
            <div className="p-4 space-y-4">
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                    スタイル設定
                </h3>

                {/* Margin */}
                <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">余白（Margin）</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-[10px] text-muted-foreground">上</span>
                            <Input
                                type="number"
                                value={styles.marginTop}
                                onChange={(e) => onStyleUpdate({ ...styles, marginTop: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground">下</span>
                            <Input
                                type="number"
                                value={styles.marginBottom}
                                onChange={(e) => onStyleUpdate({ ...styles, marginBottom: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Padding */}
                <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">内部余白（Padding）</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span className="text-[10px] text-muted-foreground">上</span>
                            <Input
                                type="number"
                                value={styles.paddingTop}
                                onChange={(e) => onStyleUpdate({ ...styles, paddingTop: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground">下</span>
                            <Input
                                type="number"
                                value={styles.paddingBottom}
                                onChange={(e) => onStyleUpdate({ ...styles, paddingBottom: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground">左</span>
                            <Input
                                type="number"
                                value={styles.paddingLeft}
                                onChange={(e) => onStyleUpdate({ ...styles, paddingLeft: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                        <div>
                            <span className="text-[10px] text-muted-foreground">右</span>
                            <Input
                                type="number"
                                value={styles.paddingRight}
                                onChange={(e) => onStyleUpdate({ ...styles, paddingRight: Number(e.target.value) })}
                                className="h-7 text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Background Color */}
                <div className="space-y-2">
                    <Label className="text-[11px] text-muted-foreground">背景色</Label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={styles.backgroundColor || '#ffffff'}
                            onChange={(e) => onStyleUpdate({ ...styles, backgroundColor: e.target.value })}
                            className="w-8 h-8 rounded border border-border cursor-pointer"
                        />
                        <Input
                            value={styles.backgroundColor}
                            onChange={(e) => onStyleUpdate({ ...styles, backgroundColor: e.target.value })}
                            className="h-7 text-xs flex-1"
                            placeholder="#ffffff"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── メインコンポーネント ─── */
export default function AdvancedEditor({
    sections,
    selectedSectionId,
    viewMode,
    onSectionsReorder,
    onSectionUpdate,
    onSectionSelect,
    onSectionAdd,
    onSectionDelete,
    onMoveSection,
    onToggleVisibility,
    onRenameSection,
    onStyleUpdate,
}: AdvancedEditorProps) {
    const [sectionStyles, setSectionStyles] = useState<Record<string, SectionStyles>>({});

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const oldIndex = sections.findIndex((s) => s.id === active.id);
            const newIndex = sections.findIndex((s) => s.id === over.id);
            const newSections = arrayMove(sections, oldIndex, newIndex);
            onSectionsReorder(newSections);
        },
        [sections, onSectionsReorder]
    );

    const selectedSection = sections.find((s) => s.id === selectedSectionId) || null;
    const currentStyles = selectedSectionId
        ? sectionStyles[selectedSectionId] || {
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: '#ffffff',
        }
        : {
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: '#ffffff',
        };

    const handleStyleUpdate = (styles: SectionStyles) => {
        if (!selectedSectionId) return;
        setSectionStyles((prev) => ({ ...prev, [selectedSectionId]: styles }));
        onStyleUpdate(selectedSectionId, styles);
    };

    return (
        <div className="flex-1 flex overflow-hidden">
            {/* ━━━ Left Sidebar: セクション追加 + 一覧 ━━━ */}
            <div className="w-56 bg-white border-r border-border flex flex-col shrink-0">
                {/* セクション追加 */}
                <div className="p-3 border-b border-border">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        セクション追加
                    </h3>
                    <div className="space-y-1">
                        {SECTION_TEMPLATES.map((tpl) => (
                            <button
                                key={tpl.type}
                                onClick={() => onSectionAdd(tpl.type)}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[12px] text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-left"
                            >
                                <IconPlus className="w-3 h-3 shrink-0" />
                                <div>
                                    <p className="font-medium">{tpl.label}</p>
                                    <p className="text-[10px] text-muted-foreground">{tpl.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* セクション一覧（D&D可能） */}
                <div className="flex-1 overflow-y-auto scrollbar-hide p-2">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
                        セクション一覧
                    </h3>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sections.map((s) => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-1">
                                {sections.map((section, i) => (
                                    <SortableSectionItem
                                        key={section.id}
                                        section={section}
                                        index={i}
                                        total={sections.length}
                                        isSelected={section.id === selectedSectionId}
                                        onSelect={() => onSectionSelect(section.id)}
                                        onDelete={() => onSectionDelete(section.id)}
                                        onToggleVisibility={() => onToggleVisibility(section.id)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>

                <div className="p-2 border-t border-border text-center">
                    <Badge variant="secondary" className="text-[10px]">
                        {sections.length} セクション
                    </Badge>
                </div>
            </div>

            {/* ━━━ Center: Preview Canvas ━━━ */}
            <div className="flex-1 min-w-0">
                <Preview
                    sections={sections}
                    selectedId={selectedSectionId}
                    viewMode={viewMode}
                    onSelect={onSectionSelect}
                />
            </div>

            {/* ━━━ Right Sidebar: Property Panel ━━━ */}
            <div className="w-72 bg-white border-l border-border shrink-0">
                <PropertyPanel
                    section={selectedSection}
                    styles={currentStyles}
                    onStyleUpdate={handleStyleUpdate}
                    onUpdate={(data) => selectedSectionId && onSectionUpdate(selectedSectionId, data)}
                    onRename={(name) => selectedSectionId && onRenameSection(selectedSectionId, name)}
                />
            </div>
        </div>
    );
}
