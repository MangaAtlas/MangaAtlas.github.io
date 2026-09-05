import fs from 'node:fs';

const SITE = 'https://mangaatlas.github.io';
const countries = { JP: 'Japan', US: 'United States', FR: 'France', BR: 'Brazil' };
const esc = value => String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');

function countryFor(slug) {
  const s = String(slug).toLowerCase();
  if (/-fr(?:-|$)/.test(s) || s.includes('raw-fr')) return 'FR';
  if (/-pt(?:-|$)/.test(s) || s.includes('raw-pt')) return 'BR';
  if (/-en(?:-|$)/.test(s) || s.includes('raw-en')) return 'US';
  return 'JP';
}
function numberFor(slug) {
  const m = String(slug).match(/(\d+(?:\.\d+)?)$/);
  return m ? m[1] : '';
}
function titleFor(slug) {
  return decodeURIComponent(slug).replace(/[-_]+/g,' ').replace(/\braw\b/gi,'').replace(/\s+/g,' ').trim();
}
function card(slug) {
  const title = titleFor(slug) || 'Manga';
  const number = numberFor(slug);
  const href = `${SITE}/chapter.html?slug=${encodeURIComponent(slug)}`;
  return `<a class="latest-item" href="${href}" data-static-chapter="1"><img src="https://placehold.co/300x400" alt="${esc(title)}" loading="lazy" decoding="async"><div><strong>${esc(title)}${number ? ` <span class="chapter-number">· Chapter ${esc(number)}</span>` : ''}</strong><p>Latest chapter · MangaAtlas</p></div></a>`;
}

let html = fs.readFileSync('index.html','utf8');
const sitemap = fs.existsSync('sitemap.xml') ? fs.readFileSync('sitemap.xml','utf8') : '';
const slugs = [...sitemap.matchAll(/<loc>https:\/\/mangaatlas\.github\.io\/chapter\.html\?slug=([^<]+)<\/loc>/g)]
  .map(m => { try { return decodeURIComponent(m[1]); } catch { return m[1]; } });

if (slugs.length) {
  for (const [country, name] of Object.entries(countries)) {
    const rows = slugs.filter(slug => countryFor(slug) === country).slice(0,20);
    if (!rows.length) continue;
    const content = rows.map(card).join('');
    const re = new RegExp(`(<div id="${country}-grid" class="latest-grid">)[\\s\\S]*?(</div><div id="${country}-pagination" class="pagination">)`);
    html = html.replace(re, `$1${content}$2`);
  }
}

// Never replace usable static chapter links with an error message when Supabase is unavailable.
html = html.replace(/Object\.keys\(countries\)\.forEach\(country=>\{document\.getElementById\(countries\[country\]\.grid\)\.innerHTML='<div class="empty">Unable to load chapters\. Please try again\.<\/div>'\}\)/, "if(!document.querySelector('[data-static-chapter]'))Object.keys(countries).forEach(country=>{document.getElementById(countries[country].grid).innerHTML='<div class=\"empty\">Unable to load live chapter data. Static chapter links are shown.</div>'})");

fs.writeFileSync('index.html', html);
console.log(`Static homepage fallback prepared from ${slugs.length} sitemap chapter URLs.`);
