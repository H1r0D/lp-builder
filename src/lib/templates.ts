// HTMLテンプレート生成
import type { LP, Section, HeroData, FeaturesData, TestimonialsData, FAQData, FooterData } from '@/types/lp';

// Hero セクションHTML
function renderHero(data: HeroData): string {
    const bgStyle = data.backgroundImage
        ? `background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${data.backgroundImage}); background-size: cover; background-position: center;`
        : 'background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);';

    return `
  <section class="hero" style="${bgStyle}">
    <div class="hero-content">
      <h1>${escapeHtml(data.heading)}</h1>
      <p class="hero-sub">${escapeHtml(data.subheading)}</p>
      <a href="${escapeHtml(data.ctaLink)}" class="cta-button">${escapeHtml(data.ctaText)}</a>
    </div>
  </section>`;
}

// Features セクションHTML
function renderFeatures(data: FeaturesData): string {
    const items = data.items.map(item => `
    <div class="feature-card">
      <div class="feature-icon">✨</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </div>`).join('');

    return `
  <section class="features">
    <div class="container">
      <h2>特徴</h2>
      <div class="features-grid">
        ${items}
      </div>
    </div>
  </section>`;
}

// Testimonials セクションHTML
function renderTestimonials(data: TestimonialsData): string {
    const items = data.items.map(item => `
    <div class="testimonial-card">
      <p class="quote">"${escapeHtml(item.quote)}"</p>
      <p class="name">— ${escapeHtml(item.name)}</p>
    </div>`).join('');

    return `
  <section class="testimonials">
    <div class="container">
      <h2>お客様の声</h2>
      <div class="testimonials-grid">
        ${items}
      </div>
    </div>
  </section>`;
}

// FAQ セクションHTML
function renderFaq(data: FAQData): string {
    const items = data.items.map(item => `
    <div class="faq-item">
      <h3>Q. ${escapeHtml(item.q)}</h3>
      <p>A. ${escapeHtml(item.a)}</p>
    </div>`).join('');

    return `
  <section class="faq">
    <div class="container">
      <h2>よくある質問</h2>
      <div class="faq-list">
        ${items}
      </div>
    </div>
  </section>`;
}

// Footer セクションHTML
function renderFooter(data: FooterData): string {
    const links = data.links.map(link =>
        `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`
    ).join('');

    return `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p class="company-name">${escapeHtml(data.companyName)}</p>
        <nav class="footer-nav">
          ${links}
        </nav>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} ${escapeHtml(data.companyName)}. All rights reserved.</p>
    </div>
  </footer>`;
}

// セクションレンダラーのマッピング
function renderSection(section: Section): string {
    if (!section.visible) return '';

    switch (section.type) {
        case 'hero':
            return renderHero(section.data as HeroData);
        case 'features':
            return renderFeatures(section.data as FeaturesData);
        case 'testimonials':
            return renderTestimonials(section.data as TestimonialsData);
        case 'faq':
            return renderFaq(section.data as FAQData);
        case 'footer':
            return renderFooter(section.data as FooterData);
        default:
            return '';
    }
}

// HTMLエスケープ
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// メインのHTML生成関数
export function generateHtml(lp: LP): string {
    const sectionsHtml = lp.sections.map(renderSection).join('\n');

    return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(lp.title)}">
  <title>${escapeHtml(lp.title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
${sectionsHtml}
</body>
</html>`;
}

// CSS生成
export function generateCss(): string {
    return `/* LP Builder - Generated CSS */
:root {
  --primary: #9333ea;
  --primary-dark: #7c3aed;
  --bg-dark: #0f172a;
  --bg-darker: #020617;
  --text: #f8fafc;
  --text-muted: #94a3b8;
  --border: #334155;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: var(--bg-dark);
  color: var(--text);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 24px;
}

.hero-content {
  max-width: 800px;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-sub {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-muted);
  margin-bottom: 40px;
}

.cta-button {
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--primary) 0%, #ec4899 100%);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(147, 51, 234, 0.4);
}

/* Features Section */
.features {
  padding: 100px 24px;
  background-color: var(--bg-darker);
}

.features h2, .testimonials h2, .faq h2 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.feature-card {
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.2s, border-color 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 12px;
}

.feature-card p {
  color: var(--text-muted);
}

/* Testimonials Section */
.testimonials {
  padding: 100px 24px;
  background-color: var(--bg-dark);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 900px;
  margin: 0 auto;
}

.testimonial-card {
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}

.testimonial-card .quote {
  font-style: italic;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.testimonial-card .name {
  color: var(--primary);
  font-weight: 500;
}

/* FAQ Section */
.faq {
  padding: 100px 24px;
  background-color: var(--bg-darker);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
}

.faq-item h3 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: var(--text);
}

.faq-item p {
  color: var(--text-muted);
}

/* Footer */
.footer {
  padding: 60px 24px 40px;
  background-color: var(--bg-dark);
  border-top: 1px solid var(--border);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }
}

.company-name {
  font-size: 1.25rem;
  font-weight: 600;
}

.footer-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.footer-nav a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-nav a:hover {
  color: var(--text);
}

.copyright {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 60px 16px;
  }
  
  .features, .testimonials, .faq {
    padding: 60px 16px;
  }
  
  .features h2, .testimonials h2, .faq h2 {
    font-size: 1.5rem;
    margin-bottom: 40px;
  }
}`;
}
