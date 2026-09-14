(async()=>{
  const app=document.getElementById('app');
  if(!app)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const GH='https://raw.githubusercontent.com/MangaAtlas/MangaAtlas.github.io/main/';
  try{
    const [upcoming,manual]=await Promise.all([
      fetch('/data/upcoming-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{chapters:[]}).catch(()=>({chapters:[]})),
      fetch('/data/manual-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{chapters:[]}).catch(()=>({chapters:[]}))
    ]);
    const latestWanted=[
      {slug:'blue-lock-raw-361',name:'ブルーロック raw ( Blue Lock raw ) 第361話',series:'Blue Lock',number:361,cover:'manga-covers/blue-lock/cover-1788579266374.webp'},
      {slug:'mokushiroku-no-yon-kishi-253',name:'黙示録の四騎士 Raw ( THE FOUR KNIGHTS OF THE APOCALYPSE raw ) 第253話',series:'THE FOUR KNIGHTS OF THE APOCALYPSE',number:253,cover:''}
    ];
    const manualRows=manual.chapters||[];
    const latestRows=latestWanted.map(w=>manualRows.find(c=>String(c.slug||'')===w.slug)||w);
    const latestUrls=latestRows.map(c=>'https://mangaatlas.github.io/chapter.html?slug='+encodeURIComponent(c.slug));
    document.title='Blue Lock 361 & Four Knights 253 Raw — MangaAtlas';
    const meta=document.querySelector('meta[name="description"]');
    if(meta) meta.setAttribute('content','Read Blue Lock raw Chapter 361 and THE FOUR KNIGHTS OF THE APOCALYPSE raw Chapter 253 on MangaAtlas. Latest Japanese manga raw chapters and chapter links.');
    const ld=document.createElement('script');
    ld.type='application/ld+json';
    ld.textContent=JSON.stringify({
      '@context':'https://schema.org','@type':'ItemList','name':'MangaAtlas Latest Chapters','itemListElement':latestRows.map((c,i)=>({'@type':'ListItem','position':i+1,'name':c.title||c.name,'url':latestUrls[i]}))
    });
    document.head.appendChild(ld);
    const latest=document.createElement('section');
    latest.className='latest-new-section';
    latest.id='latest-new-releases';
    latest.innerHTML=`<div class="latest-new-head"><div><div class="latest-new-kicker">NEW RELEASES</div><h2>Latest Chapters</h2><p>Newest manga raw chapters published on MangaAtlas.</p></div><a href="/latest-chapters.html">View all chapters →</a></div><div class="latest-new-grid"></div>`;
    const latestGrid=latest.querySelector('.latest-new-grid');
    latestRows.forEach((c,i)=>{
      const title=c.title||c.name;
      const slug=c.slug;
      const cover=c.cover||c.cover_url||(c.mangaId==='blue-lock'&&GH+'manga-covers/blue-lock/cover-1788579266374.webp');
      const card=document.createElement('a');
      card.className='latest-new-card';
      card.href='/chapter.html?slug='+encodeURIComponent(slug);
      card.innerHTML=`${cover?`<img src="${esc(cover.startsWith('http')?cover:GH+cover)}" alt="${esc(c.series||c.mangaId||'Manga')} manga cover" loading="${i===0?'eager':'lazy'}" onerror="this.style.display='none'">`:''}<div class="latest-new-copy"><span class="latest-new-badge">NEW CHAPTER</span><h3>${esc(title)}</h3><p>${esc(c.series||c.mangaId||'MangaAtlas')} · Chapter ${esc(c.number??'')}</p><span class="latest-new-link">Read Chapter →</span></div>`;
      latestGrid.appendChild(card);
    });
    const style=document.createElement('style');
    style.textContent=`.latest-new-section{margin:0 0 28px;padding:24px;border:2px solid #5b8bd9;border-radius:18px;background:linear-gradient(135deg,#121a29,#0d1017 72%);box-shadow:0 12px 40px rgba(0,0,0,.28)}.latest-new-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:18px}.latest-new-kicker{color:#7da8ef;font-size:12px;font-weight:900;letter-spacing:.12em}.latest-new-head h2{margin:5px 0 5px;font-size:30px}.latest-new-head p{margin:0;color:#aeb5c2}.latest-new-head>a{padding:10px 14px;border:1px solid #33415a;border-radius:9px;color:#c7d8f5;white-space:nowrap}.latest-new-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.latest-new-card{display:grid;grid-template-columns:105px 1fr;gap:16px;padding:14px;border:1px solid #2b3547;border-radius:13px;background:#0b1018}.latest-new-card:hover{border-color:#5b8bd9}.latest-new-card img{width:105px;height:140px;object-fit:cover;border-radius:9px;background:#171922}.latest-new-copy{min-width:0}.latest-new-badge{display:inline-block;padding:4px 7px;border-radius:999px;background:#18263a;color:#9fc2ff;font-size:10px;font-weight:900}.latest-new-card h3{margin:9px 0 8px;font-size:17px;line-height:1.4}.latest-new-card p{margin:0;color:#9ba2b0;font-size:12px}.latest-new-link{display:inline-block;margin-top:12px;color:#82a9e7;font-size:12px;font-weight:800}@media(max-width:800px){.latest-new-grid{grid-template-columns:1fr}.latest-new-head{align-items:flex-start;flex-direction:column}.latest-new-card{grid-template-columns:88px 1fr}.latest-new-card img{width:88px;height:118px}}`;
    document.head.appendChild(style);
    const insertLatest=()=>{const first=app.firstElementChild;if(first){app.insertBefore(latest,first)}else setTimeout(insertLatest,80)};
    insertLatest();
    const rows=upcoming.chapters||[];
    if(!rows.length)return;
    const section=document.createElement('section');
    section.className='upcoming-section';
    section.id='coming-soon';
    section.innerHTML=`<div class="upcoming-head"><div><div class="upcoming-kicker">🇯🇵 今夜公開予定</div><h2>Coming Soon — Japanese Chapters</h2><p>今夜公開予定の最新話を先にチェック。公開後は同じリンクから本編を読めます。</p></div><a href="#japan" class="upcoming-jump">Japan releases ↓</a></div><div class="upcoming-grid"></div>`;
    const grid=section.querySelector('.upcoming-grid');
    rows.forEach((c,index)=>{
      const hasCover=!!c.cover;
      const cover=hasCover?(c.cover.startsWith('http')?c.cover:GH+c.cover):'';
      const card=document.createElement('a');
      card.className='upcoming-card'+(hasCover?' has-cover':' no-cover');
      card.href='/chapter.html?slug='+encodeURIComponent(c.slug);
      const releaseText = `${c.title}は近日公開予定です。${c.releaseNote && String(c.releaseNote).trim() && !String(c.releaseNote).trim().startsWith(String(c.title)) ? ' '+String(c.releaseNote).trim() : '公開まで少々お待ちください。'}`;
      card.innerHTML=`${hasCover?`<img src="${esc(cover)}" alt="${esc(c.mangaTitle)}" loading="lazy" onerror="this.style.display='none'">`:''}<div class="upcoming-copy"><span class="soon-badge">近日公開</span><h3>${esc(c.title)}</h3><p>${esc(releaseText)}</p><span class="read-link">Preview chapter →</span></div>`;
      grid.appendChild(card);
    });
    const upcomingStyle=document.createElement('style');
    upcomingStyle.textContent=`.upcoming-section{margin:0 0 42px;padding:26px;border:1px solid #2a3140;border-radius:18px;background:linear-gradient(135deg,#101826,#0d1017 70%);box-shadow:0 10px 35px rgba(0,0,0,.22)}.upcoming-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.upcoming-kicker{color:#9fc2ff;font-size:13px;font-weight:800;letter-spacing:.06em}.upcoming-head h2{margin:7px 0 8px;font-size:30px}.upcoming-head p{margin:0;color:#aeb5c2;line-height:1.6}.upcoming-jump{padding:10px 14px;border:1px solid #33415a;border-radius:9px;color:#c7d8f5;white-space:nowrap}.upcoming-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.upcoming-card{display:grid;grid-template-columns:88px 1fr;gap:14px;padding:12px;border:1px solid #262d39;border-radius:12px;background:#0d1118;transition:.18s}.upcoming-card.no-cover{grid-template-columns:1fr}.upcoming-card:hover{transform:translateY(-2px);border-color:#4c6488}.upcoming-card img{width:88px;height:118px;object-fit:cover;border-radius:8px;background:#171b24}.upcoming-copy{min-width:0}.soon-badge{display:inline-block;padding:4px 7px;border-radius:999px;background:#18263a;color:#9fc2ff;font-size:10px;font-weight:800}.upcoming-card h3{font-size:15px;line-height:1.45;margin:8px 0}.upcoming-card p{margin:0;color:#9ba2b0;font-size:12px;line-height:1.55}.read-link{display:inline-block;margin-top:9px;color:#82a9e7;font-size:12px;font-weight:700}.upcoming-card.no-cover .upcoming-copy{min-height:130px}@media(max-width:800px){.upcoming-grid{grid-template-columns:1fr}.upcoming-head{align-items:flex-start;flex-direction:column}.upcoming-jump{display:inline-block}}`;
    document.head.appendChild(upcomingStyle);
    const wait=()=>{const first=app.firstElementChild;if(first){app.insertBefore(section,first);return}setTimeout(wait,80)};
    wait();
  }catch(e){console.warn('Upcoming/latest chapters unavailable',e)}
})();