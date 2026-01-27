// URL解析API
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import type { LP, Section, HeroData, FeaturesData, FAQData, FooterData, FeatureItem, FAQItem } from '@/types/lp';

// セクションID生成
function generateSectionId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// テキストのクリーンアップ
function cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

// Hero セクションを抽出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHero($: any): Section | null {
    const h1 = $('h1').first();
    if (!h1.length) return null;

    const heading = cleanText(h1.text());

    let subheading = '';
    const nextP = h1.next('p');
    if (nextP.length) {
        subheading = cleanText(nextP.text());
    } else {
        const h2 = $('h2').first();
        if (h2.length) {
            subheading = cleanText(h2.text());
        }
    }

    let ctaText = 'お問い合わせ';
    let ctaLink = '#contact';
    const ctaButton = $('a.btn, a.button, button, a[href*="contact"], a[href*="entry"]').first();
    if (ctaButton.length) {
        ctaText = cleanText(ctaButton.text()) || ctaText;
        ctaLink = ctaButton.attr('href') || ctaLink;
    }

    const heroData: HeroData = {
        heading,
        subheading,
        backgroundImage: '',
        ctaText,
        ctaLink,
    };

    return {
        id: generateSectionId(),
        type: 'hero',
        name: 'ヒーロー',
        data: heroData,
        visible: true,
    };
}

// Features セクションを抽出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractFeatures($: any): Section | null {
    const items: FeatureItem[] = [];

    $('h3, .feature, .card, .service-item, article').each((_: any, el: any) => {
        if (items.length >= 6) return;

        const $el = $(el);
        const title = cleanText($el.find('h3, h4, .title').first().text() || $el.text().slice(0, 30));
        const body = cleanText($el.find('p, .description').first().text() || '');

        if (title && title.length > 2 && title.length < 50) {
            items.push({
                title,
                body: body || 'ここに説明文が入ります。',
                iconImage: '',
            });
        }
    });

    if (items.length === 0) {
        $('h2').each((_: any, h2: any) => {
            if (items.length >= 3) return;
            const $h2 = $(h2);
            const title = cleanText($h2.text());
            const body = cleanText($h2.next('p').text() || '');
            if (title && title.length > 2 && title.length < 50) {
                items.push({
                    title,
                    body: body || 'ここに説明文が入ります。',
                    iconImage: '',
                });
            }
        });
    }

    if (items.length === 0) return null;

    const featuresData: FeaturesData = { items: items.slice(0, 6) };

    return {
        id: generateSectionId(),
        type: 'features',
        name: '特徴',
        data: featuresData,
        visible: true,
    };
}

// FAQ セクションを抽出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractFAQ($: any): Section | null {
    const items: FAQItem[] = [];

    $('dt').each((_: any, dt: any) => {
        if (items.length >= 6) return;
        const $dt = $(dt);
        const q = cleanText($dt.text());
        const a = cleanText($dt.next('dd').text());
        if (q && a) {
            items.push({ q, a });
        }
    });

    if (items.length === 0) {
        $('details').each((_: any, details: any) => {
            if (items.length >= 6) return;
            const $details = $(details);
            const q = cleanText($details.find('summary').text());
            const a = cleanText($details.find('p').text() || $details.text().replace(q, ''));
            if (q && a) {
                items.push({ q, a });
            }
        });
    }

    if (items.length === 0) return null;

    const faqData: FAQData = { items };

    return {
        id: generateSectionId(),
        type: 'faq',
        name: 'よくある質問',
        data: faqData,
        visible: true,
    };
}

// Footer セクションを抽出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractFooter($: any): Section | null {
    const footer = $('footer');
    if (!footer.length) return null;

    let companyName = cleanText(footer.find('.company, .logo, strong').first().text()) ||
        cleanText(footer.find('p').first().text()) ||
        'Company Name';

    if (companyName.length > 50) {
        companyName = companyName.slice(0, 50);
    }

    const links: { label: string; url: string }[] = [];
    footer.find('a').each((_: any, a: any) => {
        if (links.length >= 5) return;
        const $a = $(a);
        const label = cleanText($a.text());
        const url = $a.attr('href') || '#';
        if (label && label.length < 30) {
            links.push({ label, url });
        }
    });

    const footerData: FooterData = {
        companyName,
        links: links.length > 0 ? links : [{ label: 'お問い合わせ', url: '#contact' }],
    };

    return {
        id: generateSectionId(),
        type: 'footer',
        name: 'フッター',
        data: footerData,
        visible: true,
    };
}

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        // HTMLを取得
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch URL' }, { status: 500 });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // ノイズ除去
        $('script, style, nav, noscript, iframe, svg').remove();

        const sections: Section[] = [];

        const hero = extractHero($);
        if (hero) sections.push(hero);

        const features = extractFeatures($);
        if (features) sections.push(features);

        const faq = extractFAQ($);
        if (faq) sections.push(faq);

        const footer = extractFooter($);
        if (footer) sections.push(footer);

        let title = cleanText($('title').text()) ||
            cleanText($('h1').first().text()) ||
            'Imported LP';
        if (title.length > 50) {
            title = title.slice(0, 50) + '...';
        }

        const now = new Date().toISOString();

        const lp: LP = {
            id: `lp_${Date.now()}`,
            title,
            status: 'draft',
            createdAt: now,
            updatedAt: now,
            meta: {
                sourceUrl: url,
                confidence: sections.length >= 3 ? 'high' : sections.length >= 2 ? 'medium' : 'low',
                notes: sections.length < 3
                    ? ['一部セクションの抽出に失敗しました', '画像は差し替えを推奨']
                    : ['画像は差し替えを推奨'],
            },
            sections,
        };

        return NextResponse.json({ lp });
    } catch (error) {
        console.error('Parse error:', error);
        return NextResponse.json({ error: 'Failed to parse URL' }, { status: 500 });
    }
}
