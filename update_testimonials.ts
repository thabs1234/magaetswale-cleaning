import fs from 'fs';
import path from 'path';

const TESTIMONIALS_JSON = path.join(__dirname, '../testimonials.json');
const INDEX_HTML = path.join(__dirname, '../public/index.html');
const CSS_GUARD_START = '<!-- TESTIMONIALS -->';
const CSS_GUARD_END = '<section class="contact" id="contact">';

function renderTestimonialsCards(t: any): string {
  const stars = '★'.repeat(t.stars) + '☆'.repeat(5 - t.stars);
  const serviceTag = t.service ? `<span class="service-tag">${escapeHtml(t.service)}</span>` : '';
  const date = t.date ? `<div class="review-date">${escapeHtml(t.date)}</div>` : '';
  return `
        <div class="testimonial-card">
          <div class="author">
            <div class="author-name">${escapeHtml(t.author)}</div>
            <div class="author-loc">${escapeHtml(t.location)}</div>
          </div>
          <div class="stars">${stars}</div>
          <p class="testimonial-text">"${escapeHtml(t.text)}"</p>
          ${serviceTag}
          ${date}
        </div>`;
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderTestimonialsBlock(): string {
  if (!fs.existsSync(TESTIMONIALS_JSON)) return '<!-- No testimonials.json found -->';
  const raw = fs.readFileSync(TESTIMONIALS_JSON, 'utf8');
  let data: any[] = [];
  try { data = JSON.parse(raw); } catch { return '<!-- Invalid testimonials.json -->'; }
  if (!Array.isArray(data) || data.length === 0) return '';
  const cards = data.map(renderTestimonialsCards).join('\n');
  return `<div class="testimonial-grid">\n${cards}\n      </div>`;
}

function updateIndex() {
  let html = fs.readFileSync(INDEX_HTML, 'utf8');
  const startIdx = html.indexOf(CSS_GUARD_START);
  const endIdx = html.indexOf(CSS_GUARD_END);
  if (startIdx === -1 || endIdx === -1) {
    console.log('ERROR: testimonial anchors not found in index.html');
    console.log('  start:', CSS_GUARD_START);
    console.log('  end:', CSS_GUARD_END);
    return;
  }
  const before = html.slice(0, startIdx + CSS_GUARD_START.length);
  const after = html.slice(endIdx);
  const block = renderTestimonialsBlock();
  const updated = before + block + after;
  fs.writeFileSync(INDEX_HTML, updated, 'utf8');
  console.log(`Updated index.html with ${data.length} testimonial(s) (injected between anchors)`);
}

updateIndex();
