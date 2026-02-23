'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import type {
    Section,
    HeroData,
    FeaturesData,
    TestimonialsData,
    FAQData,
    FooterData,
} from '@/types/lp';

/* ─── Props ─── */
interface SimpleEditorProps {
    sections: Section[];
    onSectionUpdate: (sectionId: string, data: Section['data']) => void;
}

/* ─── セクション型ラベル ─── */
const TYPE_LABELS: Record<string, string> = {
    hero: 'ヒーロー',
    features: '特徴・強み',
    testimonials: 'お客様の声',
    faq: 'よくある質問',
    footer: 'フッター',
};

/* ─── インライン画像差替え (ダミー) ─── */
function ImagePlaceholder({ src, onReplace }: { src?: string; onReplace: (url: string) => void }) {
    const handleClick = () => {
        const url = prompt('画像URLを入力してください', src || '');
        if (url !== null) onReplace(url);
    };

    return (
        <div
            onClick={handleClick}
            className="relative group cursor-pointer border border-dashed border-border rounded-md overflow-hidden bg-secondary"
            style={{ minHeight: '120px' }}
        >
            {src ? (
                <img src={src} alt="" className="w-full h-32 object-cover" />
            ) : (
                <div className="flex items-center justify-center h-32 text-muted-foreground text-xs">
                    クリックで画像を設定
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-medium bg-black/60 px-3 py-1.5 rounded-md">
                    📷 画像を差し替え
                </span>
            </div>
        </div>
    );
}

/* ─── Inline Text Editor ─── */
function InlineText({
    value,
    onChange,
    placeholder,
    as = 'input',
    className = '',
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    as?: 'input' | 'textarea';
    className?: string;
}) {
    if (as === 'textarea') {
        return (
            <Textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`bg-transparent border-transparent hover:border-border focus:border-brand transition-colors resize-none text-sm ${className}`}
            />
        );
    }
    return (
        <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`bg-transparent border-transparent hover:border-border focus:border-brand transition-colors text-sm ${className}`}
        />
    );
}

/* ─── Hero のインライン編集 ─── */
function HeroInline({ data, onUpdate }: { data: HeroData; onUpdate: (d: HeroData) => void }) {
    return (
        <div className="space-y-3 p-4 bg-gradient-to-br from-brand/5 to-brand/10 rounded-md">
            <ImagePlaceholder
                src={data.backgroundImage}
                onReplace={(url) => onUpdate({ ...data, backgroundImage: url })}
            />
            <InlineText
                value={data.heading}
                onChange={(v) => onUpdate({ ...data, heading: v })}
                placeholder="メインの見出しを入力..."
                className="text-lg font-bold"
            />
            <InlineText
                value={data.subheading}
                onChange={(v) => onUpdate({ ...data, subheading: v })}
                placeholder="サブテキストを入力..."
                as="textarea"
            />
            <div className="flex gap-2">
                <InlineText
                    value={data.ctaText}
                    onChange={(v) => onUpdate({ ...data, ctaText: v })}
                    placeholder="ボタンテキスト"
                    className="flex-1"
                />
                <InlineText
                    value={data.ctaLink}
                    onChange={(v) => onUpdate({ ...data, ctaLink: v })}
                    placeholder="リンクURL"
                    className="flex-1 text-xs"
                />
            </div>
        </div>
    );
}

/* ─── Features のインライン編集 ─── */
function FeaturesInline({ data, onUpdate }: { data: FeaturesData; onUpdate: (d: FeaturesData) => void }) {
    const updateItem = (i: number, field: string, value: string) => {
        const items = [...data.items];
        items[i] = { ...items[i], [field]: value };
        onUpdate({ ...data, items });
    };

    return (
        <div className="space-y-3 p-4">
            {data.items.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">
                    特徴項目がまだありません
                </p>
            ) : (
                data.items.map((item, i) => (
                    <div key={i} className="border border-border rounded-md p-3 space-y-2 bg-white">
                        <InlineText
                            value={item.title}
                            onChange={(v) => updateItem(i, 'title', v)}
                            placeholder="特徴のタイトル..."
                            className="font-medium"
                        />
                        <InlineText
                            value={item.body}
                            onChange={(v) => updateItem(i, 'body', v)}
                            placeholder="説明文..."
                            as="textarea"
                        />
                    </div>
                ))
            )}
        </div>
    );
}

/* ─── Testimonials のインライン編集 ─── */
function TestimonialsInline({ data, onUpdate }: { data: TestimonialsData; onUpdate: (d: TestimonialsData) => void }) {
    const updateItem = (i: number, field: string, value: string) => {
        const items = [...data.items];
        items[i] = { ...items[i], [field]: value };
        onUpdate({ ...data, items });
    };

    return (
        <div className="space-y-3 p-4">
            {data.items.map((item, i) => (
                <div key={i} className="border border-border rounded-md p-3 space-y-2 bg-white">
                    <InlineText
                        value={item.name}
                        onChange={(v) => updateItem(i, 'name', v)}
                        placeholder="お名前..."
                        className="font-medium text-xs"
                    />
                    <InlineText
                        value={item.quote}
                        onChange={(v) => updateItem(i, 'quote', v)}
                        placeholder="お客様の声..."
                        as="textarea"
                    />
                </div>
            ))}
        </div>
    );
}

/* ─── FAQ のインライン編集 ─── */
function FAQInline({ data, onUpdate }: { data: FAQData; onUpdate: (d: FAQData) => void }) {
    const updateItem = (i: number, field: string, value: string) => {
        const items = [...data.items];
        items[i] = { ...items[i], [field]: value };
        onUpdate({ ...data, items });
    };

    return (
        <div className="space-y-3 p-4">
            {data.items.map((item, i) => (
                <div key={i} className="border border-border rounded-md p-3 space-y-2 bg-white">
                    <InlineText
                        value={item.q}
                        onChange={(v) => updateItem(i, 'q', v)}
                        placeholder="質問..."
                        className="font-medium"
                    />
                    <InlineText
                        value={item.a}
                        onChange={(v) => updateItem(i, 'a', v)}
                        placeholder="回答..."
                        as="textarea"
                    />
                </div>
            ))}
        </div>
    );
}

/* ─── Footer のインライン編集 ─── */
function FooterInline({ data, onUpdate }: { data: FooterData; onUpdate: (d: FooterData) => void }) {
    return (
        <div className="space-y-3 p-4">
            <InlineText
                value={data.companyName}
                onChange={(v) => onUpdate({ ...data, companyName: v })}
                placeholder="会社名..."
                className="font-medium"
            />
            {data.links.map((link, i) => (
                <div key={i} className="flex gap-2">
                    <InlineText
                        value={link.label}
                        onChange={(v) => {
                            const links = [...data.links];
                            links[i] = { ...links[i], label: v };
                            onUpdate({ ...data, links });
                        }}
                        placeholder="リンクラベル"
                        className="flex-1"
                    />
                    <InlineText
                        value={link.url}
                        onChange={(v) => {
                            const links = [...data.links];
                            links[i] = { ...links[i], url: v };
                            onUpdate({ ...data, links });
                        }}
                        placeholder="URL"
                        className="flex-1 text-xs"
                    />
                </div>
            ))}
        </div>
    );
}

/* ─── セクションの描画振り分け ─── */
function SectionBlock({
    section,
    onUpdate,
}: {
    section: Section;
    onUpdate: (data: Section['data']) => void;
}) {
    if (!section.visible) return null;

    switch (section.type) {
        case 'hero':
            return <HeroInline data={section.data as HeroData} onUpdate={onUpdate} />;
        case 'features':
            return <FeaturesInline data={section.data as FeaturesData} onUpdate={onUpdate} />;
        case 'testimonials':
            return <TestimonialsInline data={section.data as TestimonialsData} onUpdate={onUpdate} />;
        case 'faq':
            return <FAQInline data={section.data as FAQData} onUpdate={onUpdate} />;
        case 'footer':
            return <FooterInline data={section.data as FooterData} onUpdate={onUpdate} />;
        default:
            return <div className="p-4 text-xs text-muted-foreground">不明なセクション</div>;
    }
}

/* ─── メインコンポーネント ─── */
export default function SimpleEditor({ sections, onSectionUpdate }: SimpleEditorProps) {
    return (
        <div className="flex-1 flex overflow-hidden">
            {/* メインキャンバス（スクロール可能） */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6">
                <div className="max-w-xl mx-auto space-y-4">
                    {sections.map((section) => (
                        <div key={section.id} className="relative">
                            {/* セクションラベル */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                                    {TYPE_LABELS[section.type] || section.type}
                                </span>
                                <span className="text-[10px] text-muted-foreground">{section.name}</span>
                            </div>

                            {/* セクション本体 */}
                            <div className="border border-border rounded-md bg-white hover:border-brand/30 transition-colors">
                                <SectionBlock
                                    section={section}
                                    onUpdate={(data) => onSectionUpdate(section.id, data)}
                                />
                            </div>
                        </div>
                    ))}

                    {sections.length === 0 && (
                        <div className="text-center py-16 text-muted-foreground text-sm">
                            セクションがありません
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
