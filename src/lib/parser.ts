// HTML解析ユーティリティ（汎用パーサー）
import * as cheerio from 'cheerio';
import type { LP, Section, HeroData, FeaturesData, FAQData, FooterData, FeatureItem, FAQItem } from '@/types/lp';
import { getSampleByUrl } from './samples';

// セクションID生成
function generateSectionId(): string {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// テキストのクリーンアップ
function cleanText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
}

// Hero セクションを抽出
function extractHero($: cheerio.CheerioAPI): Section | null {
    // h1を探す
    const h1 = $('h1').first();
    if (!h1.length) return null;

    const heading = cleanText(h1.text());

    // h1の次の段落やサブヘッダーを探す
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

    // CTAボタンを探す
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
function extractFeatures($: cheerio.CheerioAPI): Section | null {
    const items: FeatureItem[] = [];

    // h3やカード要素を探す
    $('h3, .feature, .card, .service-item, article').each((_, el) => {
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
        // フォールバック: h2以降の段落を特徴として抽出
        $('h2').each((_, h2) => {
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
function extractFAQ($: cheerio.CheerioAPI): Section | null {
    const items: FAQItem[] = [];

    // dt/ddペアを探す
    $('dt').each((_, dt) => {
        if (items.length >= 6) return;
        const $dt = $(dt);
        const q = cleanText($dt.text());
        const a = cleanText($dt.next('dd').text());
        if (q && a) {
            items.push({ q, a });
        }
    });

    // detailsタグを探す
    if (items.length === 0) {
        $('details').each((_, details) => {
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
function extractFooter($: cheerio.CheerioAPI): Section | null {
    const footer = $('footer');
    if (!footer.length) return null;

    // 会社名を探す
    let companyName = cleanText(footer.find('.company, .logo, strong').first().text()) ||
        cleanText(footer.find('p').first().text()) ||
        'Company Name';

    // 長すぎる場合は短縮
    if (companyName.length > 50) {
        companyName = companyName.slice(0, 50);
    }

    // リンクを抽出
    const links: { label: string; url: string }[] = [];
    footer.find('a').each((_, a) => {
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

// メインのパース関数
export async function parseHtml(html: string, sourceUrl: string): Promise<LP> {
    const $ = cheerio.load(html);

    // script, style, nav等を削除
    $('script, style, nav, noscript, iframe, svg').remove();

    const sections: Section[] = [];

    // 各セクションを抽出
    const hero = extractHero($);
    if (hero) sections.push(hero);

    const features = extractFeatures($);
    if (features) sections.push(features);

    const faq = extractFAQ($);
    if (faq) sections.push(faq);

    const footer = extractFooter($);
    if (footer) sections.push(footer);

    // タイトルを抽出
    let title = cleanText($('title').text()) ||
        cleanText($('h1').first().text()) ||
        'Imported LP';
    if (title.length > 50) {
        title = title.slice(0, 50) + '...';
    }

    const now = new Date().toISOString();

    return {
        id: `lp_${Date.now()}`,
        title,
        status: 'draft',
        createdAt: now,
        updatedAt: now,
        meta: {
            sourceUrl,
            confidence: sections.length >= 3 ? 'high' : sections.length >= 2 ? 'medium' : 'low',
            notes: sections.length < 3
                ? ['一部セクションの抽出に失敗しました', '画像は差し替えを推奨']
                : ['画像は差し替えを推奨'],
        },
        sections,
    };
}

// URLからLPを生成（サンプル優先、フォールバックあり）
export async function parseLPFromUrl(url: string): Promise<{
    lp: LP;
    isFromSample: boolean;
    confidence: 'high' | 'medium' | 'low';
}> {
    // まずサンプルをチェック
    const sampleLP = getSampleByUrl(url);
    if (sampleLP) {
        return {
            lp: sampleLP as LP,
            isFromSample: true,
            confidence: 'high',
        };
    }

    // 汎用パースを試行
    try {
        const response = await fetch('/api/parse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error('Failed to parse');
        }

        const result = await response.json();
        return {
            lp: result.lp,
            isFromSample: false,
            confidence: result.lp.meta.confidence,
        };
    } catch {
        // フォールバック: デフォルトのサービスLPを返す
        const { serviceLP } = await import('./samples');
        const fallback = {
            ...serviceLP,
            id: `lp_${Date.now()}`,
            title: 'インポートLP',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            meta: {
                sourceUrl: url,
                confidence: 'low' as const,
                notes: ['URLからの取り込みに失敗しました', 'サンプルテンプレートを使用しています', '内容を編集してください'],
            },
        };
        return {
            lp: fallback as LP,
            isFromSample: true,
            confidence: 'low',
        };
    }
}
