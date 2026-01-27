'use client';

import type { Section, HeroData, FeaturesData, TestimonialsData, FAQData, FooterData } from '@/types/lp';

interface PreviewProps {
    sections: Section[];
    selectedId: string | null;
    viewMode: 'pc' | 'sp';
    onSelect: (id: string) => void;
}

// Hero プレビュー
function HeroPreview({ data, isSelected }: { data: HeroData; isSelected: boolean }) {
    const bgStyle = data.backgroundImage
        ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
        : { background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' };

    return (
        <section
            className={`relative min-h-[60vh] flex items-center justify-center text-center text-white transition-all ${isSelected ? 'ring-4 ring-blue-400' : ''
                }`}
            style={bgStyle}
        >
            <div className="max-w-3xl px-6 py-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.heading}</h1>
                <p className="text-lg md:text-xl opacity-90 mb-8">{data.subheading}</p>
                <a href={data.ctaLink} className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                    {data.ctaText}
                </a>
            </div>
        </section>
    );
}

// Features プレビュー
function FeaturesPreview({ data, isSelected }: { data: FeaturesData; isSelected: boolean }) {
    return (
        <section className={`py-16 px-6 bg-gray-900 text-white transition-all ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">特徴</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {data.items.map((item, i) => (
                        <div key={i} className="bg-gray-800 p-6 rounded-xl">
                            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-gray-300">{item.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials プレビュー
function TestimonialsPreview({ data, isSelected }: { data: TestimonialsData; isSelected: boolean }) {
    return (
        <section className={`py-16 px-6 bg-gray-800 text-white transition-all ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">お客様の声</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {data.items.map((item, i) => (
                        <div key={i} className="bg-gray-700 p-6 rounded-xl">
                            <p className="text-gray-300 italic mb-4">"{item.quote}"</p>
                            <p className="text-blue-400 font-medium">— {item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// FAQ プレビュー
function FAQPreview({ data, isSelected }: { data: FAQData; isSelected: boolean }) {
    return (
        <section className={`py-16 px-6 bg-gray-900 text-white transition-all ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">よくある質問</h2>
                <div className="space-y-4">
                    {data.items.map((item, i) => (
                        <div key={i} className="bg-gray-800 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">Q. {item.q}</h3>
                            <p className="text-gray-300">A. {item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Footer プレビュー
function FooterPreview({ data, isSelected }: { data: FooterData; isSelected: boolean }) {
    return (
        <footer className={`py-12 px-6 bg-gray-950 text-white transition-all ${isSelected ? 'ring-4 ring-blue-400' : ''}`}>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-lg font-semibold">{data.companyName}</p>
                <nav className="flex gap-6">
                    {data.links.map((link, i) => (
                        <a key={i} href={link.url} className="text-gray-400 hover:text-white transition-colors">
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
                © {new Date().getFullYear()} {data.companyName}. All rights reserved.
            </p>
        </footer>
    );
}

export default function Preview({ sections, selectedId, viewMode, onSelect }: PreviewProps) {
    const visibleSections = sections.filter(s => s.visible);

    return (
        <div className="h-full overflow-hidden bg-gray-200 flex justify-center">
            <div
                className={`h-full overflow-y-auto transition-all duration-300 bg-white ${viewMode === 'sp' ? 'w-[375px]' : 'w-full max-w-none'
                    }`}
                style={viewMode === 'sp' ? {
                    boxShadow: '0 0 40px rgba(0,0,0,0.2)',
                    borderLeft: '1px solid #e5e7eb',
                    borderRight: '1px solid #e5e7eb',
                } : {}}
            >
                {visibleSections.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center px-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">表示するセクションがありません</p>
                        </div>
                    </div>
                ) : (
                    visibleSections.map((section) => {
                        const isSelected = section.id === selectedId;

                        return (
                            <div
                                key={section.id}
                                onClick={() => onSelect(section.id)}
                                className="cursor-pointer relative"
                            >
                                {isSelected && (
                                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                                        編集中
                                    </div>
                                )}

                                {section.type === 'hero' && <HeroPreview data={section.data as HeroData} isSelected={isSelected} />}
                                {section.type === 'features' && <FeaturesPreview data={section.data as FeaturesData} isSelected={isSelected} />}
                                {section.type === 'testimonials' && <TestimonialsPreview data={section.data as TestimonialsData} isSelected={isSelected} />}
                                {section.type === 'faq' && <FAQPreview data={section.data as FAQData} isSelected={isSelected} />}
                                {section.type === 'footer' && <FooterPreview data={section.data as FooterData} isSelected={isSelected} />}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
