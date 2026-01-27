// サンプルLPデータ（飲食店LP風）
export const restaurantLP = {
    id: 'sample_restaurant',
    title: '創作和食 花月庵',
    status: 'draft' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    meta: {
        sourceUrl: 'https://example.com/restaurant',
        confidence: 'high' as const,
        notes: ['サンプルLP（飲食店）'],
    },
    sections: [
        {
            id: 'sec_hero_1',
            type: 'hero' as const,
            name: 'ヒーロー',
            data: {
                heading: '創作和食 花月庵',
                subheading: '旬の食材を使った本格和食をお楽しみください。四季折々の味わいをご堪能いただけます。',
                backgroundImage: 'https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=1200&h=600&fit=crop',
                ctaText: '予約する',
                ctaLink: '#reservation',
            },
            visible: true,
        },
        {
            id: 'sec_features_1',
            type: 'features' as const,
            name: '特徴',
            data: {
                items: [
                    {
                        title: '厳選素材',
                        body: '全国から取り寄せた旬の食材を使用。産地直送の新鮮な素材をお届けします。',
                        iconImage: '',
                    },
                    {
                        title: '匠の技',
                        body: '熟練の職人が一品一品心を込めて調理。伝統の技と創造性が織りなす逸品。',
                        iconImage: '',
                    },
                    {
                        title: '完全個室',
                        body: 'プライベートな空間で大切な方とのひとときを。接待やお祝いにも最適です。',
                        iconImage: '',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_testimonials_1',
            type: 'testimonials' as const,
            name: 'お客様の声',
            data: {
                items: [
                    {
                        name: '田中様',
                        quote: '接待で利用させていただきました。料理の美しさと味わいに感動しました。',
                    },
                    {
                        name: '佐藤様',
                        quote: '記念日のディナーに最適です。個室でゆっくりと過ごせました。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_faq_1',
            type: 'faq' as const,
            name: 'よくある質問',
            data: {
                items: [
                    {
                        q: '予約は必要ですか？',
                        a: 'ご予約をおすすめしております。特に週末は混み合いますので、お早めにご連絡ください。',
                    },
                    {
                        q: '駐車場はありますか？',
                        a: '専用駐車場を5台分ご用意しております。',
                    },
                    {
                        q: 'アレルギー対応は可能ですか？',
                        a: 'はい、事前にお申し付けいただければ対応いたします。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_footer_1',
            type: 'footer' as const,
            name: 'フッター',
            data: {
                companyName: '創作和食 花月庵',
                links: [
                    { label: 'メニュー', url: '#menu' },
                    { label: 'アクセス', url: '#access' },
                    { label: 'お問い合わせ', url: '#contact' },
                ],
            },
            visible: true,
        },
    ],
};

// サンプルLPデータ（採用LP風）
export const recruitLP = {
    id: 'sample_recruit',
    title: 'テックカンパニー株式会社 採用サイト',
    status: 'draft' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    meta: {
        sourceUrl: 'https://example.com/recruit',
        confidence: 'high' as const,
        notes: ['サンプルLP（採用）'],
    },
    sections: [
        {
            id: 'sec_hero_2',
            type: 'hero' as const,
            name: 'ヒーロー',
            data: {
                heading: '未来を創る仲間を募集',
                subheading: 'テクノロジーで社会を変える。私たちと一緒に挑戦しませんか？',
                backgroundImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
                ctaText: 'エントリーする',
                ctaLink: '#entry',
            },
            visible: true,
        },
        {
            id: 'sec_features_2',
            type: 'features' as const,
            name: '働く環境',
            data: {
                items: [
                    {
                        title: 'フルリモート可',
                        body: '場所にとらわれない働き方を実現。全国どこからでも活躍できます。',
                        iconImage: '',
                    },
                    {
                        title: '成長支援',
                        body: '書籍購入補助、カンファレンス参加費用、資格取得支援など充実。',
                        iconImage: '',
                    },
                    {
                        title: 'フレックス制度',
                        body: 'コアタイムなしのフルフレックス。あなたのライフスタイルに合わせた働き方が可能。',
                        iconImage: '',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_testimonials_2',
            type: 'testimonials' as const,
            name: '社員の声',
            data: {
                items: [
                    {
                        name: '鈴木さん（エンジニア・入社2年目）',
                        quote: '技術的なチャレンジができる環境です。成長を実感できる毎日です。',
                    },
                    {
                        name: '山田さん（デザイナー・入社3年目）',
                        quote: 'チームの雰囲気が良く、意見が言いやすい職場です。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_faq_2',
            type: 'faq' as const,
            name: '採用FAQ',
            data: {
                items: [
                    {
                        q: '未経験でも応募できますか？',
                        a: 'はい、ポテンシャル採用も行っています。熱意と成長意欲を重視しています。',
                    },
                    {
                        q: '選考フローを教えてください',
                        a: '書類選考 → カジュアル面談 → 技術面接 → 最終面接 → 内定',
                    },
                    {
                        q: '副業は可能ですか？',
                        a: '事前申請の上、副業可能です。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_footer_2',
            type: 'footer' as const,
            name: 'フッター',
            data: {
                companyName: 'テックカンパニー株式会社',
                links: [
                    { label: '募集職種', url: '#jobs' },
                    { label: '福利厚生', url: '#benefits' },
                    { label: '会社概要', url: '#about' },
                ],
            },
            visible: true,
        },
    ],
};

// サンプルLPデータ（サービスLP風）
export const serviceLP = {
    id: 'sample_service',
    title: 'クラウドCRM Pro',
    status: 'draft' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    meta: {
        sourceUrl: 'https://example.com/service',
        confidence: 'high' as const,
        notes: ['サンプルLP（サービス）'],
    },
    sections: [
        {
            id: 'sec_hero_3',
            type: 'hero' as const,
            name: 'メインビジュアル',
            data: {
                heading: '顧客管理を、もっとシンプルに。',
                subheading: 'クラウドCRM Proで営業効率を劇的に向上。導入企業1,000社突破！',
                backgroundImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
                ctaText: '無料で試す',
                ctaLink: '#trial',
            },
            visible: true,
        },
        {
            id: 'sec_features_3',
            type: 'features' as const,
            name: '機能紹介',
            data: {
                items: [
                    {
                        title: '簡単操作',
                        body: '直感的なUIで誰でも使える。導入当日から活用可能です。',
                        iconImage: '',
                    },
                    {
                        title: 'データ連携',
                        body: '主要なツールと連携可能。既存のワークフローを崩しません。',
                        iconImage: '',
                    },
                    {
                        title: 'AI分析',
                        body: 'AIが商談の成約率を予測。最適なアクションを提案します。',
                        iconImage: '',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_testimonials_3',
            type: 'testimonials' as const,
            name: '導入事例',
            data: {
                items: [
                    {
                        name: '株式会社ABC 営業部長',
                        quote: '導入後、商談成約率が30%向上しました。チーム全体の効率が上がっています。',
                    },
                    {
                        name: 'DEF株式会社 代表取締役',
                        quote: 'サポートが手厚く、安心して利用できます。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_faq_3',
            type: 'faq' as const,
            name: 'よくある質問',
            data: {
                items: [
                    {
                        q: '無料トライアル期間はありますか？',
                        a: 'はい、14日間の無料トライアルをご用意しています。',
                    },
                    {
                        q: '最低契約期間はありますか？',
                        a: '月額プランは1ヶ月から、年間プランは1年からとなります。',
                    },
                    {
                        q: 'データのエクスポートは可能ですか？',
                        a: 'はい、CSV形式でいつでもエクスポート可能です。',
                    },
                ],
            },
            visible: true,
        },
        {
            id: 'sec_footer_3',
            type: 'footer' as const,
            name: 'フッター',
            data: {
                companyName: 'クラウドCRM株式会社',
                links: [
                    { label: '料金プラン', url: '#pricing' },
                    { label: '機能一覧', url: '#features' },
                    { label: 'サポート', url: '#support' },
                ],
            },
            visible: true,
        },
    ],
};

// URLからサンプルを判定
export function getSampleByUrl(url: string) {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('restaurant') || lowerUrl.includes('food') || lowerUrl.includes('cafe')) {
        return { ...restaurantLP, id: `lp_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    if (lowerUrl.includes('recruit') || lowerUrl.includes('career') || lowerUrl.includes('job')) {
        return { ...recruitLP, id: `lp_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    if (lowerUrl.includes('service') || lowerUrl.includes('saas') || lowerUrl.includes('product')) {
        return { ...serviceLP, id: `lp_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    return null;
}
