(async()=>{
  const app=document.getElementById('app');
  if(!app)return;
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const GH='https://raw.githubusercontent.com/MangaAtlas/MangaAtlas.github.io/main/';
  const placeholder='https://placehold.co/220x300';
  try{
    const d=await fetch('/data/upcoming-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
    const rows=d.chapters||[];
    if(!rows.length)return;
    const section=document.createElement('section');
    section.className='upcoming-section';
    section.id='coming-soon';
    section.innerHTML=`<div class="upcoming-head"><div><div class="upcoming-kicker">🇯🇵 今夜公開予定</div><h2>Coming Soon — Japanese Chapters</h2><p>今夜公開予定の最新話を先にチェック。公開後は同じリンクから本編を読めます。</p></div><a href="#japan" class="upcoming-jump">Japan releases ↓</a></div><div class="upcoming-grid"></div>`;
    const grid=section.querySelector('.upcoming-grid');
    rows.forEach(c=>{
      const hasCover=!!c.cover;
      const cover=hasCover?(c.cover.startsWith('http')?c.cover:GH+c.cover):'';
      const card=document.createElement('a');
      card.className='upcoming-card'+(hasCover?' has-cover':' no-cover');
      card.href='/chapter.html?slug='+encodeURIComponent(c.slug);
      card.innerHTML=`${hasCover?`<img src="${esc(cover)}" alt="${esc(c.mangaTitle)}" loading="lazy" onerror="this.style.display='none'">`:''}<div class="upcoming-copy"><span class="soon-badge">近日公開</span><h3>${esc(c.title)}</h3><p>${esc(c.releaseNote)}</p><span class="read-link">Preview chapter →</span></div>`;
      grid.appendChild(card);
    });
    const style=document.createElement('style');
    style.textContent=`.upcoming-section{margin:0 0 42px;padding:26px;border:1px solid #2a3140;border-radius:18px;background:linear-gradient(135deg,#101826,#0d1017 70%);box-shadow:0 10px 35px rgba(0,0,0,.22)}.upcoming-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.upcoming-kicker{color:#9fc2ff;font-size:13px;font-weight:800;letter-spacing:.06em}.upcoming-head h2{margin:7px 0 8px;font-size:30px}.upcoming-head p{margin:0;color:#aeb5c2;line-height:1.6}.upcoming-jump{padding:10px 14px;border:1px solid #33415a;border-radius:9px;color:#c7d8f5;white-space:nowrap}.upcoming-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.upcoming-card{display:grid;grid-template-columns:88px 1fr;gap:14px;padding:12px;border:1px solid #262d39;border-radius:12px;background:#0d1118;transition:.18s}.upcoming-card.no-cover{grid-template-columns:1fr}.upcoming-card:hover{transform:translateY(-2px);border-color:#4c6488}.upcoming-card img{width:88px;height:118px;object-fit:cover;border-radius:8px;background:#171b24}.upcoming-copy{min-width:0}.soon-badge{display:inline-block;padding:4px 7px;border-radius:999px;background:#18263a;color:#9fc2ff;font-size:10px;font-weight:800}.upcoming-card h3{font-size:15px;line-height:1.45;margin:8px 0}.upcoming-card p{margin:0;color:#9ba2b0;font-size:12px;line-height:1.55}.read-link{display:inline-block;margin-top:9px;color:#82a9e7;font-size:12px;font-weight:700}.upcoming-card.no-cover .upcoming-copy{min-height:130px}@media(max-width:800px){.upcoming-grid{grid-template-columns:1fr}.upcoming-head{align-items:flex-start;flex-direction:column}.upcoming-jump{display:inline-block}}`;
    document.head.appendChild(style);
    const wait=()=>{const first=app.firstElementChild;if(first){app.insertBefore(section,first);return}setTimeout(wait,80)};
    wait();
  }catch(e){console.warn('Upcoming chapters unavailable',e)}
})();