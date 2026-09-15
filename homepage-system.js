/* MangaAtlas Homepage System — RawKuro-inspired information architecture, MangaAtlas theme. */
(async()=>{
  const app=document.getElementById('app');
  if(!app||window.__mangaAtlasHomepageLoaded)return;
  window.__mangaAtlasHomepageLoaded=true;
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const GH='https://raw.githubusercontent.com/MangaAtlas/MangaAtlas.github.io/main/';
  const cover=c=>{const v=c?.cover||c?.cover_url||'';if(!v)return '';return v.startsWith('http')?v:GH+v};
  const chapterHref=c=>'/chapter.html?slug='+encodeURIComponent(c.slug||'');
  const timeOf=c=>{for(const k of ['updated_at','updatedAt','last_updated','lastUpdated','published_at','publishedAt','created_at','createdAt','posted_at','postedAt','date','timestamp']){const n=Date.parse(c?.[k]);if(Number.isFinite(n))return n}return 0};
  const ago=c=>{const t=timeOf(c);if(!t)return 'Recently';const d=Math.max(0,Date.now()-t),m=Math.floor(d/60000),h=Math.floor(m/60),day=Math.floor(h/24);if(day)return day+'d ago';if(h)return h+'h ago';if(m)return m+'m ago';return 'Just now'};
  const mangaName=c=>c?.mangaTitle||c?.manga||c?.series||c?.mangaId||'Manga';
  const mangaId=c=>String(c?.mangaId||c?.manga_id||'').replace(/-ja$|_ja$/,'');
  try{
    const [content,manual]=await Promise.all([
      fetch('/data/content.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({})),
      fetch('/data/manual-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{}).catch(()=>({}))
    ]);
    const mangas=Array.isArray(content.mangas)?content.mangas:[];
    const rows=[];const add=(c,source,index)=>{if(!c?.slug||rows.some(x=>String(x.c.slug)===String(c.slug)))return;rows.push({c,source,index})};
    (content.chapters||[]).forEach((c,i)=>add(c,0,i));
    (manual.chapters||[]).forEach((c,i)=>add(c,1,i));
    // Homepage = latest activity only. Manga pages remain the complete archive.
    rows.sort((a,b)=>{const at=timeOf(a.c),bt=timeOf(b.c);if(at||bt)return bt-at||b.source-a.source||b.index-a.index;return b.source-a.source||b.index-a.index});
    const latest=rows.slice(0,18).map(x=>x.c);
    const hot=rows.slice(0,10).map(x=>x.c);
    const byManga={};rows.forEach(c=>{const id=mangaId(c);(byManga[id]??=[]).push(c)});
    Object.values(byManga).forEach(a=>a.sort((x,y)=>timeOf(y)-timeOf(x)||Number(y.number||0)-Number(x.number||0)));
    const mangaById=Object.fromEntries(mangas.map(m=>[String(m.id),m]));
    const infoFor=c=>mangaById[mangaId(c)]||mangas.find(m=>String(m.title).toLowerCase()===String(mangaName(c)).toLowerCase())||null;
    const trend=Object.entries(byManga).map(([id,cs])=>({id,count:cs.length,latest:cs[0],m:mangaById[id]})).sort((a,b)=>b.count-a.count||timeOf(b.latest)-timeOf(a.latest)).slice(0,10);
    const newManga=mangas.slice().sort((a,b)=>{const ac=byManga[String(a.id)]?.[0],bc=byManga[String(b.id)]?.[0];return timeOf(bc)-timeOf(ac)}).slice(0,10);
    const ranked=trend.slice(0,5);
    const card=(c,compact=false)=>{const m=infoFor(c),img=cover(m||c),name=m?.title||mangaName(c),num=c?.number!==undefined?'Chapter '+esc(c.number):'',title=c?.title||name;return '<a class="ma-home-card '+(compact?'compact':'')+'" href="'+chapterHref(c)+'">'+(img?'<img src="'+esc(img)+'" alt="'+esc(name)+' cover" loading="lazy">':'<div class="ma-home-cover-fallback">M</div>')+'<div class="ma-home-card-body"><div class="ma-home-card-meta">'+esc(ago(c))+' <span>•</span> '+esc(num)+'</div><h3>'+esc(title)+'</h3><p>'+esc(name)+'</p><span>Read chapter →</span></div></a>'};
    const listItem=c=>'<a class="ma-home-list-item" href="'+chapterHref(c)+'"><div class="ma-home-list-time">'+esc(ago(c))+'</div><div class="ma-home-list-main"><strong>'+esc(mangaName(c))+'</strong><span>'+esc(c.number!==undefined?'Chapter '+c.number:'Latest update')+'</span></div><div class="ma-home-list-arrow">→</div></a>';
    const rankItem=x=>{const m=x.m||{title:x.latest?mangaName(x.latest):x.id},img=cover(m);return '<a class="ma-home-rank" href="'+(m.slug?'/manga.html?slug='+encodeURIComponent(m.slug):chapterHref(x.latest))+'"><div class="ma-home-rank-no">'+(ranked.indexOf(x)+1)+'</div>'+(img?'<img src="'+esc(img)+'" alt="'+esc(m.title)+'">':'')+'<div><strong>'+esc(m.title||x.id)+'</strong><small>'+x.count+' chapter updates</small></div></a>'};
    app.innerHTML='<div class="ma-home-wrap">'
      +'<section class="ma-home-section ma-home-hot"><div class="ma-home-heading"><div><span>HOT RELEASES</span><h2>Latest & Popular</h2><p>Fresh chapters and the newest published updates.</p></div><a href="/latest-chapters.html">View all →</a></div><div class="ma-home-hot-grid">'+hot.map((c,i)=>'<a class="ma-home-hot-card '+(i===0?'featured':'')+'" href="'+chapterHref(c)+'">'+(cover(infoFor(c)||c)?'<img src="'+esc(cover(infoFor(c)||c))+'" alt="'+esc(mangaName(c))+'" loading="'+(i<2?'eager':'lazy')+'">':'<div class="ma-home-cover-fallback">M</div>')+'<div class="ma-home-hot-overlay"><small>'+esc(ago(c))+'</small><h3>'+esc(mangaName(c))+'</h3><b>'+(c.number!==undefined?'Chapter '+esc(c.number):'Latest')+'</b></div></a>').join('')+'</div></section>'
      +'<div class="ma-home-columns"><main>'
      +'<section class="ma-home-section"><div class="ma-home-heading"><div><span>LATEST UPDATES</span><h2>Latest Chapters</h2></div><a href="/latest-chapters.html">See all →</a></div><div class="ma-home-list">'+latest.map(listItem).join('')+'</div></section>'
      +'<section class="ma-home-section"><div class="ma-home-heading"><div><span>NEW ARRIVALS</span><h2>New Manga</h2></div><a href="/latest-chapters.html">Browse →</a></div><div class="ma-home-manga-grid">'+newManga.map(m=>{const c=byManga[String(m.id)]?.[0];if(!c)return '';const img=cover(m);return '<a class="ma-home-manga" href="'+chapterHref(c)+'">'+(img?'<img src="'+esc(img)+'" alt="'+esc(m.title)+' cover" loading="lazy">':'<div class="ma-home-cover-fallback">M</div>')+'<strong>'+esc(m.title)+'</strong><span>'+esc(m.native_title||m.country||'Manga')+'</span></a>'}).join('')+'</div></section>'
      +'</main><aside>'
      +'<section class="ma-home-side"><div class="ma-home-side-title"><span>TRENDING</span><h3>Popular Manga</h3></div>'+trend.map(rankItem).join('')+'</section>'
      +'<section class="ma-home-side"><div class="ma-home-side-title"><span>TOP RATED</span><h3>Reader Favorites</h3></div>'+ranked.map(rankItem).join('')+'</section>'
      +'</aside></div>'
      +'</div>';
  }catch(e){console.warn('Homepage System unavailable',e)}
})();

(function(){
  const style=document.createElement('style');
  style.textContent=`
  .ma-home-wrap{max-width:1380px;margin:0 auto;padding:8px 0 40px}.ma-home-section{margin:0 0 34px}.ma-home-heading{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:18px}.ma-home-heading span,.ma-home-side-title span{font-size:11px;letter-spacing:.14em;font-weight:900;color:#7da8ef}.ma-home-heading h2{font-size:28px;margin:5px 0}.ma-home-heading p{margin:0;color:#8f97a8;font-size:13px}.ma-home-heading>a{color:#9fc2ff;font-size:13px;font-weight:800;white-space:nowrap}.ma-home-hot-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.ma-home-hot-card{position:relative;display:block;min-height:245px;border-radius:14px;overflow:hidden;background:#10151f;border:1px solid #2b3547}.ma-home-hot-card img{width:100%;height:245px;display:block;object-fit:cover}.ma-home-hot-card.featured{grid-column:span 2}.ma-home-hot-card.featured img{height:320px}.ma-home-hot-overlay{position:absolute;left:0;right:0;bottom:0;padding:35px 13px 13px;background:linear-gradient(transparent,rgba(5,7,12,.95))}.ma-home-hot-overlay small{color:#b9c0cc;font-size:10px}.ma-home-hot-overlay h3{font-size:15px;margin:5px 0;line-height:1.3}.ma-home-hot-overlay b{font-size:11px;color:#9fc2ff}.ma-home-columns{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:28px}.ma-home-list{border-top:1px solid #252c39}.ma-home-list-item{display:grid;grid-template-columns:80px 1fr 30px;gap:14px;align-items:center;padding:15px 8px;border-bottom:1px solid #252c39}.ma-home-list-time{font-size:11px;color:#7f8797}.ma-home-list-main{display:flex;flex-direction:column;gap:4px}.ma-home-list-main strong{font-size:14px}.ma-home-list-main span{font-size:12px;color:#8f97a8}.ma-home-list-arrow{color:#7da8ef;text-align:right}.ma-home-manga-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.ma-home-manga{display:block}.ma-home-manga img,.ma-home-manga .ma-home-cover-fallback{width:100%;height:190px;object-fit:cover;border-radius:10px;background:#151a24}.ma-home-manga strong{display:block;margin-top:8px;font-size:13px;line-height:1.3}.ma-home-manga span{display:block;color:#7f8797;font-size:11px;margin-top:3px}.ma-home-side{margin-bottom:26px;padding:18px;border:1px solid #2b3547;border-radius:14px;background:#0e131c}.ma-home-side-title{margin-bottom:12px}.ma-home-side-title h3{margin:4px 0 0;font-size:21px}.ma-home-rank{display:grid;grid-template-columns:25px 48px 1fr;gap:10px;align-items:center;padding:11px 0;border-bottom:1px solid #252c39}.ma-home-rank:last-child{border-bottom:0}.ma-home-rank-no{font-size:14px;font-weight:900;color:#7da8ef}.ma-home-rank img{width:48px;height:62px;object-fit:cover;border-radius:6px}.ma-home-rank strong{display:block;font-size:12px;line-height:1.3}.ma-home-rank small{display:block;color:#7f8797;font-size:10px;margin-top:3px}.ma-home-card{display:grid;grid-template-columns:76px 1fr;gap:12px;padding:12px;border:1px solid #2b3547;border-radius:10px;background:#0e131c}.ma-home-card img{width:76px;height:100px;object-fit:cover;border-radius:7px}.ma-home-card-body h3{margin:5px 0;font-size:13px}.ma-home-card-body p{margin:0;color:#7f8797;font-size:11px}.ma-home-card-body>span{display:block;margin-top:7px;color:#82a9e7;font-size:11px;font-weight:800}.ma-home-card-meta{font-size:10px;color:#7f8797}.ma-home-cover-fallback{display:flex;align-items:center;justify-content:center;color:#61708a;font-weight:900;font-size:28px}.empty{border:0!important;padding:0!important;background:transparent!important}
  @media(max-width:1050px){.ma-home-hot-grid{grid-template-columns:repeat(4,1fr)}.ma-home-hot-card.featured{grid-column:span 2}.ma-home-columns{grid-template-columns:1fr}.ma-home-manga-grid{grid-template-columns:repeat(4,1fr)}}
  @media(max-width:700px){.ma-home-hot-grid{grid-template-columns:repeat(2,1fr)}.ma-home-hot-card.featured{grid-column:span 2}.ma-home-hot-card,.ma-home-hot-card.featured,.ma-home-hot-card img,.ma-home-hot-card.featured img{min-height:220px;height:220px}.ma-home-heading{align-items:flex-start}.ma-home-manga-grid{grid-template-columns:repeat(2,1fr)}.ma-home-manga img,.ma-home-manga .ma-home-cover-fallback{height:230px}.ma-home-list-item{grid-template-columns:65px 1fr 20px}.ma-home-side{margin-top:8px}}
  `;document.head.appendChild(style);
})();