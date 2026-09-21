const fs = require('fs');
const path = require('path');

const TESTIMONIALS_JSON = path.join(__dirname, 'testimonials.json');
const INDEX_HTML = path.join(__dirname, 'index.html');

function renderTestimonialsCards(t) {
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

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderTestimonialsBlock() {
  if (!fs.existsSync(TESTIMONIALS_JSON)) return '<!-- No testimonials.json found -->';
  const raw = fs.readFileSync(TESTIMONIALS_JSON, 'utf8');
  let data = [];
  try { data = JSON.parse(raw); } catch { return '<!-- Invalid testimonials.json -->'; }
  if (!Array.isArray(data) || data.length === 0) return '';
  const cards = data.map(renderTestimonialsCards).join('\n');
  return `<!-- TESTIMONIALS -->\n      <div class="testimonial-grid">\n${cards}\n      </div>`;
}

function updateIndex() {
  let html = fs.readFileSync(INDEX_HTML, 'utf8');
  const startMarker = '<!-- TESTIMONIALS -->';
  const endMarker = '<section class="contact" id="contact">';
  const sIdx = html.indexOf(startMarker);
  const eIdx = html.indexOf(endMarker);
  if (sIdx === -1 || eIdx === -1) {
    console.log('ERROR: anchor markers not found');
    return;
  }
  const before = html.slice(0, sIdx);
  const after = html.slice(eIdx);
  const block = renderTestimonialsBlock();
  fs.writeFileSync(INDEX_HTML, before + block + after, 'utf8');
  console.log(`Updated index.html with ${data.length} testimonial(s)`);
}

updateIndex();
