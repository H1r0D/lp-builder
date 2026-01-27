'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Section, HeroData, FeaturesData, TestimonialsData, FAQData, FooterData, FeatureItem, TestimonialItem, FAQItem, FooterLink } from '@/types/lp';

interface EditPanelProps {
    section: Section | null;
    onUpdate: (data: Section['data']) => void;
    onRename: (name: string) => void;
}

// Hero 編集フォーム
function HeroEditor({ data, onUpdate }: { data: HeroData; onUpdate: (data: HeroData) => void }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-gray-600">ヘッドライン</Label>
                <Input
                    value={data.heading}
                    onChange={(e) => onUpdate({ ...data, heading: e.target.value })}
                    className="bg-white border-gray-300 text-gray-800"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-gray-600">サブヘッドライン</Label>
                <Textarea
                    value={data.subheading}
                    onChange={(e) => onUpdate({ ...data, subheading: e.target.value })}
                    className="bg-white border-gray-300 text-gray-800 min-h-[80px]"
                />
            </div>
            <div className="space-y-2">
                <Label className="text-gray-600">背景画像URL</Label>
                <Input
                    value={data.backgroundImage || ''}
                    onChange={(e) => onUpdate({ ...data, backgroundImage: e.target.value })}
                    placeholder="https://..."
                    className="bg-white border-gray-300 text-gray-800"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-gray-600">CTAボタンテキスト</Label>
                    <Input
                        value={data.ctaText}
                        onChange={(e) => onUpdate({ ...data, ctaText: e.target.value })}
                        className="bg-white border-gray-300 text-gray-800"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-gray-600">CTAリンク</Label>
                    <Input
                        value={data.ctaLink}
                        onChange={(e) => onUpdate({ ...data, ctaLink: e.target.value })}
                        className="bg-white border-gray-300 text-gray-800"
                    />
                </div>
            </div>
        </div>
    );
}

// Features 編集フォーム
function FeaturesEditor({ data, onUpdate }: { data: FeaturesData; onUpdate: (data: FeaturesData) => void }) {
    const updateItem = (index: number, field: keyof FeatureItem, value: string) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ ...data, items: newItems });
    };

    const addItem = () => {
        onUpdate({
            ...data,
            items: [...data.items, { title: '新しい特徴', body: '説明を入力してください', iconImage: '' }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onUpdate({ ...data, items: newItems });
    };

    return (
        <div className="space-y-4">
            {data.items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">特徴 #{index + 1}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7"
                        >
                            削除
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">タイトル</Label>
                        <Input
                            value={item.title}
                            onChange={(e) => updateItem(index, 'title', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">説明</Label>
                        <Textarea
                            value={item.body}
                            onChange={(e) => updateItem(index, 'body', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800 min-h-[60px]"
                        />
                    </div>
                </div>
            ))}
            {data.items.length < 6 && (
                <Button onClick={addItem} variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-100">
                    + 特徴を追加
                </Button>
            )}
        </div>
    );
}

// Testimonials 編集フォーム
function TestimonialsEditor({ data, onUpdate }: { data: TestimonialsData; onUpdate: (data: TestimonialsData) => void }) {
    const updateItem = (index: number, field: keyof TestimonialItem, value: string) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ ...data, items: newItems });
    };

    const addItem = () => {
        onUpdate({
            ...data,
            items: [...data.items, { name: 'お客様', quote: 'コメントを入力してください' }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onUpdate({ ...data, items: newItems });
    };

    return (
        <div className="space-y-4">
            {data.items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">お客様 #{index + 1}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7"
                        >
                            削除
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">名前</Label>
                        <Input
                            value={item.name}
                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">コメント</Label>
                        <Textarea
                            value={item.quote}
                            onChange={(e) => updateItem(index, 'quote', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800 min-h-[60px]"
                        />
                    </div>
                </div>
            ))}
            {data.items.length < 4 && (
                <Button onClick={addItem} variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-100">
                    + お客様の声を追加
                </Button>
            )}
        </div>
    );
}

// FAQ 編集フォーム
function FAQEditor({ data, onUpdate }: { data: FAQData; onUpdate: (data: FAQData) => void }) {
    const updateItem = (index: number, field: keyof FAQItem, value: string) => {
        const newItems = [...data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        onUpdate({ ...data, items: newItems });
    };

    const addItem = () => {
        onUpdate({
            ...data,
            items: [...data.items, { q: '質問を入力', a: '回答を入力' }]
        });
    };

    const removeItem = (index: number) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onUpdate({ ...data, items: newItems });
    };

    return (
        <div className="space-y-4">
            {data.items.map((item, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">FAQ #{index + 1}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7"
                        >
                            削除
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">質問</Label>
                        <Input
                            value={item.q}
                            onChange={(e) => updateItem(index, 'q', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-600 text-sm">回答</Label>
                        <Textarea
                            value={item.a}
                            onChange={(e) => updateItem(index, 'a', e.target.value)}
                            className="bg-white border-gray-300 text-gray-800 min-h-[60px]"
                        />
                    </div>
                </div>
            ))}
            {data.items.length < 8 && (
                <Button onClick={addItem} variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-100">
                    + FAQを追加
                </Button>
            )}
        </div>
    );
}

// Footer 編集フォーム
function FooterEditor({ data, onUpdate }: { data: FooterData; onUpdate: (data: FooterData) => void }) {
    const updateLink = (index: number, field: keyof FooterLink, value: string) => {
        const newLinks = [...data.links];
        newLinks[index] = { ...newLinks[index], [field]: value };
        onUpdate({ ...data, links: newLinks });
    };

    const addLink = () => {
        onUpdate({
            ...data,
            links: [...data.links, { label: '新しいリンク', url: '#' }]
        });
    };

    const removeLink = (index: number) => {
        const newLinks = data.links.filter((_, i) => i !== index);
        onUpdate({ ...data, links: newLinks });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-gray-600">会社名</Label>
                <Input
                    value={data.companyName}
                    onChange={(e) => onUpdate({ ...data, companyName: e.target.value })}
                    className="bg-white border-gray-300 text-gray-800"
                />
            </div>

            <div className="space-y-3">
                <Label className="text-gray-600">リンク</Label>
                {data.links.map((link, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={link.label}
                            onChange={(e) => updateLink(index, 'label', e.target.value)}
                            placeholder="ラベル"
                            className="bg-white border-gray-300 text-gray-800 flex-1"
                        />
                        <Input
                            value={link.url}
                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                            placeholder="URL"
                            className="bg-white border-gray-300 text-gray-800 flex-1"
                        />
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeLink(index)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            ×
                        </Button>
                    </div>
                ))}
                {data.links.length < 6 && (
                    <Button onClick={addLink} variant="outline" size="sm" className="border-gray-300 text-gray-600 hover:bg-gray-100">
                        + リンクを追加
                    </Button>
                )}
            </div>
        </div>
    );
}

const sectionTypeLabels: Record<string, string> = {
    hero: 'ヒーローセクション',
    features: '特徴セクション',
    testimonials: 'お客様の声',
    faq: 'FAQ',
    footer: 'フッター',
};

export default function EditPanel({ section, onUpdate, onRename }: EditPanelProps) {
    if (!section) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 border-l border-gray-200">
                <div className="text-center px-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-200 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">セクションを選択</h3>
                    <p className="text-xs text-gray-400">左のリストからセクションを選んで編集</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-gray-50 border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                    {sectionTypeLabels[section.type] || section.type}
                </p>
                <Input
                    value={section.name}
                    onChange={(e) => onRename(e.target.value)}
                    className="bg-white border-gray-300 text-gray-800 font-semibold"
                    placeholder="セクション名"
                />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {section.type === 'hero' && (
                    <HeroEditor data={section.data as HeroData} onUpdate={onUpdate} />
                )}
                {section.type === 'features' && (
                    <FeaturesEditor data={section.data as FeaturesData} onUpdate={onUpdate} />
                )}
                {section.type === 'testimonials' && (
                    <TestimonialsEditor data={section.data as TestimonialsData} onUpdate={onUpdate} />
                )}
                {section.type === 'faq' && (
                    <FAQEditor data={section.data as FAQData} onUpdate={onUpdate} />
                )}
                {section.type === 'footer' && (
                    <FooterEditor data={section.data as FooterData} onUpdate={onUpdate} />
                )}
            </div>
        </div>
    );
}
