// LP/セクションの型定義

export type SectionType = 'hero' | 'features' | 'testimonials' | 'faq' | 'footer';

// Hero セクション
export interface HeroData {
  heading: string;
  subheading: string;
  backgroundImage?: string;
  ctaText: string;
  ctaLink: string;
}

// Features セクション
export interface FeatureItem {
  title: string;
  body: string;
  iconImage?: string;
}

export interface FeaturesData {
  items: FeatureItem[];
}

// Testimonials セクション
export interface TestimonialItem {
  name: string;
  quote: string;
}

export interface TestimonialsData {
  items: TestimonialItem[];
}

// FAQ セクション
export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQData {
  items: FAQItem[];
}

// Footer セクション
export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterData {
  companyName: string;
  links: FooterLink[];
}

// セクション共通型
export type SectionData = HeroData | FeaturesData | TestimonialsData | FAQData | FooterData;

export interface Section {
  id: string;
  type: SectionType;
  name: string; // 編集可能なセクション名
  data: SectionData;
  visible: boolean;
}

// LP メタ情報
export interface LPMeta {
  sourceUrl?: string;
  confidence: 'high' | 'medium' | 'low';
  notes: string[];
}

// LP 全体
export interface LP {
  id: string;
  title: string;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  meta: LPMeta;
  sections: Section[];
}

// パース結果
export interface ParseResult {
  success: boolean;
  lp?: LP;
  error?: string;
  sectionCount?: number;
  confidence?: 'high' | 'medium' | 'low';
  notes?: string[];
}
