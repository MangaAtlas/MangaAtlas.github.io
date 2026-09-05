import fs from 'node:fs';

const SUPABASE_URL = 'https://vcrrkyqiunczhpxdcoil.supabase.co';
const SUPABASE_KEY = 'sb_publishable_IWiCOqUZ7PtPaISAo_5RDw_9uTvyD4z';
const SITE = 'https://mangaatlas.github.io';
const countries = { JP: 'Japan', US: 'United States', FR: 'France', BR: 'Brazil' };
const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };

async function getJson(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

const esc = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

let html = fs.readFileSync('index.html', 'utf8');
let manga, chapters;
try {
  manga = await getJson('manga?select=id,title,cover_url,country');
  chapters = await getJson('chapters?select=id,manga_id,chapter_number,url_slug,created_at,view_count&order=created_at.desc');
} catch (error) {
  console.warn(`Live content unavailable; preserving static homepage: ${error.message}`);
  process.exit(0);
}

// Never replace known static links with empty states when the API returns no usable data.
if (!Array.isArray(manga) || !manga.length || !Array.isArray(chapters) || !chapters.length) {
  console.warn('Live content returned no usable manga/chapters; preserving static homepage.');
  process.exit(0);
}

const mangaById = new Map(manga.map(m => [m.id, m]));
function card(c) {
  const m = mangaById.get(c.manga_id) || {};
  const title = m.title || 'Manga';
  const href = `${SITE}/chapter.html?slug=${encodeURIComponent(c.url_slug || '')}`;
  const date = c.created_at ? new Date(c.created_at).toISOString().slice(0, 10) : '';
  return `<a class="latest-item" href="${href}" data-static-chapter="1"><img src="${esc(m.cover_url || 'https://placehold.co/300x400')}" alt="${esc(title)}" loading="lazy" decoding="async"><div><strong>${esc(title)} <span class="chapter-number">· Chapter ${esc(c.chapter_number)}</span></strong><p>${date} · 👁 ${Number(c.view_count || 0).toLocaleString()}</p></div></a>`;
}

for (const [country, name] of Object.entries(countries)) {
  const ids = new Set(manga.filter(m => String(m.country || '').toUpperCase() === country).map(m => m.id));
  const rows = chapters.filter(c => ids.has(c.manga_id)).slice(0, 20);
  if (!rows.length) continue;
  const content = rows.map(card).join('');
  const re = new RegExp(`(<div id="${country}-grid" class="latest-grid">)([\\s\\S]*?)(</div><div id="${country}-pagination" class="pagination">)`);
  html = html.replace(re, `$1${content}$3`);
}

if (!html.includes('MangaAtlas GA4')) {
  html = html.replace('</head>', '<!-- MangaAtlas GA4 --><script async src="https://www.googletagmanager.com/gtag/js?id=G-50N8R6DVZH"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\'js\',new Date());gtag(\'config\',\'G-50N8R6DVZH\',{page_title:document.title,page_location:location.href});</script></head>');
}

fs.writeFileSync('index.html', html);
console.log(`Homepage refreshed: ${chapters.length} chapters / ${manga.length} manga.`);
