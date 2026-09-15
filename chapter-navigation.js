/* MangaAtlas — isolated chapter navigation system. Does not touch Admin or homepage. */
(function () {
  'use strict';
  const slug = decodeURIComponent(new URLSearchParams(location.search).get('slug') || '');
  if (!slug) return;
  const SOURCES = ['/data/content.json', '/data/upcoming-chapters.json', '/data/manual-chapters.json'];
  const get = (url) => fetch(url + '?nav=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : { chapters: [] }).catch(() => ({ chapters: [] }));
  const num = c => Number(c && c.number);
  const key = c => String(c && (c.mangaId || c.manga || c.mangaTitle || '')).trim().toLowerCase();
  function seriesKey(c) {
    const k = key(c);
    if (k) return k;
    const title = String(c && c.title || '').toLowerCase();
    return title.replace(/\b(?:chapter|chap|raw|第)\s*\d+.*$/i, '').replace(/\d+/g, '').replace(/[()（）\-–—:：]+/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function unique(list) {
    const seen = new Set();
    return list.filter(c => c && c.slug && !seen.has(String(c.slug)) && (seen.add(String(c.slug)), true));
  }
  function addNav(chapters, current) {
    const same = unique(chapters).filter(c => seriesKey(c) === seriesKey(current) && Number.isFinite(num(c))).sort((a,b) => num(a)-num(b));
    const idx = same.findIndex(c => String(c.slug) === slug);
    if (idx < 0) return;
    const prev = same[idx - 1] || null;
    const next = same[idx + 1] || null;
    const old = document.getElementById('mangaatlas-chapter-nav');
    if (old) old.remove();
    const nav = document.createElement('nav');
    nav.id = 'mangaatlas-chapter-nav';
    nav.setAttribute('aria-label', 'Chapter navigation');
    nav.style.cssText = 'max-width:1000px;margin:24px auto 30px;padding:0 16px;display:flex;justify-content:space-between;gap:12px;align-items:center;';
    const make = (c, label) => c ? '<a href="/chapter.html?slug=' + encodeURIComponent(c.slug) + '" style="display:inline-block;padding:11px 16px;border:1px solid #2a3040;border-radius:10px;color:#f5f5f7;text-decoration:none;background:#111822">' + label + ' · ' + String(c.number) + '</a>' : '<span></span>';
    nav.innerHTML = make(prev, '← Previous') + '<a href="/" style="color:#aeb6c4;text-decoration:none">All Chapters</a>' + make(next, 'Next →');
    const reader = document.getElementById('reader');
    if (reader) reader.insertAdjacentElement('afterend', nav);
  }
  async function init() {
    const data = await Promise.all(SOURCES.map(get));
    const chapters = data.flatMap(d => Array.isArray(d.chapters) ? d.chapters : []);
    const current = chapters.find(c => String(c.slug) === slug);
    if (current) addNav(chapters, current);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
