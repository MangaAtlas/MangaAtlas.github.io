/* MangaAtlas Homepage System — one latest chapter per manga. */
(async()=>{
const app=document.getElementById('app');if(!app||window.__mangaAtlasHomepageLoaded)return;window.__mangaAtlasHomepageLoaded=true;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const GH='https://raw.githubusercontent.com/MangaAtlas/MangaAtlas.github.io/main/';
const cover=c=>{const v=c?.cover||c?.cover_url||'';return v?(v.startsWith('http')?v:GH+v):''};
const href=c=>'/chapter.html?slug='+encodeURIComponent(c.slug||'');
const time=c=>{for(const k of ['updated_at','updatedAt','last_updated','lastUpdated','published_at','publishedAt','created_at','createdAt','posted_at','postedAt','date','timestamp']){const n=Date.parse(c?.[k]);if(Number.isFinite(n))return n}return 0};
const name=c=>c?.mangaTitle||c?.manga||c?.series||c?.mangaId||'Manga';
const id=c=>String(c?.mangaId||c?.manga_id||c?.seriesId||c?.series_id||name(c)).toLowerCase().replace(/[-_](ja|raw)$/,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
try{
const [content,manual]=await Promise.all([fetch('/data/content.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({})),fetch('/data/manual-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({}))]);
const mangas=Array.isArray(content.mangas)?content.mangas:[];const rows=[];const seen=new Set();
for(const c of [...(content.chapters||[]),...(manual.chapters||[])]){if(!c?.slug||seen.has(String(c.slug)))continue;seen.add(String(c.slug));rows.push(c)}
// Build the homepage from exactly ONE newest chapter for each manga.
rows.sort((a,b)=>time(b)-time(a)||Number(b.number||0)-Number(a.number||0));
const latestByManga=new Map();for(const c of rows){const k=id(c);if(k&&!latestByManga.has(k))latestByManga.set(k,c)}
const latest=[...latestByManga.values()].sort((a,b)=>time(b)-time(a)||Number(b.number||0)-Number(a.number||0));
const mangaById=Object.fromEntries(mangas.map(m=>[id(m),m]));
const info=c=>mangaById[id(c)]||mangas.find(m=>String(m.title||'').toLowerCase()===String(name(c)).toLowerCase())||null;
const trend=latest.slice(0,10);const hot=latest.slice(0,10);const newManga=mangas.filter(m=>latestByManga.has(id(m))).sort((a,b)=>time(latestByManga.get(id(b)))-time(latestByManga.get(id(a)))).slice(0,10);
const rankItem=(c,i)=>{const m=info(c),img=cover(m||c);return '<a class="ma-home-rank" href="'+(m?.slug?'/manga.html?slug='+encodeURIComponent(m.slug):href(c))+'"><div class="ma-home-rank-no">'+(i+1)+'</div>'+(img?'<img src="'+esc(img)+'" alt="'+esc(m?.title||name(c))+'">':'')+'<div><strong>'+esc(m?.title||name(c))+'</strong><small>Latest: Chapter '+esc(c.number??'—')+'</small></div></a>'};
const card=(c,i)=>{const m=info(c),img=cover(m||c);return '<a class="ma-home-hot-card '+(i===0?'featured':'')+'" href="'+href(c)+'">'+(img?'<img src="'+esc(img)+'" alt="'+esc(m?.title||name(c))+'" loading="'+(i<2?'eager':'lazy')+'">':'<div class="ma-home-cover-fallback">M</div>')+'<div class="ma-home-hot-overlay"><small>Latest update</small><h3>'+esc(m?.title||name(c))+'</h3><b>Chapter '+esc(c.number??'')+'</b></div></a>'};
const list=c=>'<a class="ma-home-list-item" href="'+href(c)+'"><div class="ma-home-list-time">Latest</div><div class="ma-home-list-main"><strong>'+esc(name(c))+'</strong><span>Chapter '+esc(c.number??'')+'</span></div><div class="ma-home-list-arrow">→</div></a>';
app.innerHTML='<div class="ma-home-wrap"><section class="ma-home-section ma-home-hot"><div class="ma-home-heading"><div><span>HOT RELEASES</span><h2>Latest & Popular</h2><p>One latest chapter per manga.</p></div><a href="/latest-chapters.html">View all →</a></div><div class="ma-home-hot-grid">'+hot.map(card).join('')+'</div></section><div class="ma-home-columns"><main><section class="ma-home-section"><div class="ma-home-heading"><div><span>LATEST UPDATES</span><h2>Latest Chapters</h2></div><a href="/latest-chapters.html">See all →</a></div><div class="ma-home-list">'+latest.slice(0,18).map(list).join('')+'</div></section><section class="ma-home-section"><div class="ma-home-heading"><div><span>NEW ARRIVALS</span><h2>New Manga</h2></div></div><div class="ma-home-manga-grid">'+newManga.map(m=>{const c=latestByManga.get(id(m)),img=cover(m);return '<a class="ma-home-manga" href="'+href(c)+'">'+(img?'<img src="'+esc(img)+'" alt="'+esc(m.title)+' cover" loading="lazy">':'<div class="ma-home-cover-fallback">M</div>')+'<strong>'+esc(m.title)+'</strong><span>'+esc(m.native_title||m.country||'Manga')+'</span></a>'}).join('')+'</div></section></main><aside><section class="ma-home-side"><div class="ma-home-side-title"><span>TRENDING</span><h3>Popular Manga</h3></div>'+trend.map(rankItem).join('')+'</section><section class="ma-home-side"><div class="ma-home-side-title"><span>TOP RATED</span><h3>Reader Favorites</h3></div>'+trend.slice(0,5).map(rankItem).join('')+'</section></aside></div></div>';
}catch(e){console.warn('Homepage System unavailable',e)}
})();