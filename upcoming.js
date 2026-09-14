(async()=>{
const app=document.getElementById('app');if(!app)return;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const GH='https://raw.githubusercontent.com/MangaAtlas/MangaAtlas.github.io/main/';
try{
const [upcoming,manual]=await Promise.all([
fetch('/data/upcoming-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{chapters:[]}).catch(()=>({chapters:[]})),
fetch('/data/manual-chapters.json?v='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():{chapters:[]}).catch(()=>({chapters:[]}))
]);
const wanted=[
{slug:'blue-lock-raw-361',name:'ブルーロック raw ( Blue Lock raw ) 第361話',series:'Blue Lock',number:361,cover:'manga-covers/blue-lock/cover-1788579266374.webp'},
{slug:'mokushiroku-no-yon-kishi-253',name:'黙示録の四騎士 Raw ( THE FOUR KNIGHTS OF THE APOCALYPSE raw ) 第253話',series:'THE FOUR KNIGHTS OF THE APOCALYPSE',number:253,cover:''}
];
const manualRows=manual.chapters||[];
const latest=wanted.map(w=>manualRows.find(c=>String(c.slug||'')===w.slug)||w);
const latestSection=document.createElement('section');latestSection.id='latest-new-releases';latestSection.className='latest-new-section';
latestSection.innerHTML='<div class="latest-new-head"><div><div class="latest-new-kicker">NEW RELEASES</div><h2>Latest Chapters</h2><p>Newest manga raw chapters published on MangaAtlas.</p></div><a href="/latest-chapters.html">View all chapters →</a></div><div class="latest-new-grid"></div>';
const grid=latestSection.querySelector('.latest-new-grid');
latest.forEach((c,i)=>{const cover=c.cover||c.cover_url||(c.mangaId==='blue-lock'?GH+'manga-covers/blue-lock/cover-1788579266374.webp':'');const a=document.createElement('a');a.className='latest-new-card';a.href='/chapter.html?slug='+encodeURIComponent(c.slug);a.innerHTML=(cover?'<img src="'+esc(cover.startsWith('http')?cover:GH+cover)+'" alt="'+esc(c.series||'Manga')+' manga cover" loading="'+(i?'lazy':'eager')+'">':'')+'<div class="latest-new-copy"><span class="latest-new-badge">NEW CHAPTER</span><h3>'+esc(c.title||c.name)+'</h3><p>'+esc(c.series||'MangaAtlas')+' · Chapter '+esc(c.number??'')+'</p><span class="latest-new-link">Read Chapter →</span></div>';grid.appendChild(a)});
const style=document.createElement('style');style.textContent='.latest-new-section{margin:0 0 28px;padding:24px;border:2px solid #5b8bd9;border-radius:18px;background:#10151f}.latest-new-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:18px}.latest-new-kicker{color:#7da8ef;font-size:12px;font-weight:900;letter-spacing:.12em}.latest-new-head h2{margin:5px 0;font-size:30px}.latest-new-head p{margin:0;color:#aeb5c2}.latest-new-head>a{padding:10px 14px;border:1px solid #33415a;border-radius:9px;color:#c7d8f5}.latest-new-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.latest-new-card{display:grid;grid-template-columns:105px 1fr;gap:16px;padding:14px;border:1px solid #2b3547;border-radius:13px;background:#0b1018}.latest-new-card img{width:105px;height:140px;object-fit:cover;border-radius:9px;background:#171922}.latest-new-copy{min-width:0}.latest-new-badge{display:inline-block;padding:4px 7px;border-radius:999px;background:#18263a;color:#9fc2ff;font-size:10px;font-weight:900}.latest-new-card h3{margin:9px 0 8px;font-size:17px;line-height:1.4}.latest-new-card p{margin:0;color:#9ba2b0;font-size:12px}.latest-new-link{display:inline-block;margin-top:12px;color:#82a9e7;font-size:12px;font-weight:800}@media(max-width:800px){.latest-new-grid{grid-template-columns:1fr}.latest-new-head{align-items:flex-start;flex-direction:column}.latest-new-card{grid-template-columns:88px 1fr}.latest-new-card img{width:88px;height:118px}}';document.head.appendChild(style);
const placeLatest=()=>{if(document.getElementById('latest-new-releases'))return true;if(!app.firstElementChild)return false;app.insertBefore(latestSection,app.firstElementChild);return true};
const observer=new MutationObserver(()=>placeLatest());observer.observe(app,{childList:true});
let tries=0;const timer=setInterval(()=>{tries++;if(placeLatest()||tries>40)clearInterval(timer)},100);
const rows=upcoming.chapters||[];if(!rows.length)return;
const section=document.createElement('section');section.className='upcoming-section';section.id='coming-soon';section.innerHTML='<div class="upcoming-head"><div><div class="upcoming-kicker">🇯🇵 今夜公開予定</div><h2>Coming Soon — Japanese Chapters</h2><p>今夜公開予定の最新話を先にチェック。公開後は同じリンクから本編を読めます。</p></div><a href="#japan" class="upcoming-jump">Japan releases ↓</a></div><div class="upcoming-grid"></div>';
const ug=section.querySelector('.upcoming-grid');rows.forEach(c=>{const a=document.createElement('a');a.className='upcoming-card no-cover';a.href='/chapter.html?slug='+encodeURIComponent(c.slug);a.innerHTML='<div class="upcoming-copy"><span class="soon-badge">近日公開</span><h3>'+esc(c.title)+'</h3><p>'+esc(c.releaseNote||'公開まで少々お待ちください。')+'</p><span class="read-link">Preview chapter →</span></div>';ug.appendChild(a)});
const putUpcoming=()=>{if(document.getElementById('coming-soon'))return true;if(app.firstElementChild){app.insertBefore(section,app.firstElementChild);return true}return false};
let utries=0;const ut=setInterval(()=>{utries++;if(putUpcoming()||utries>50)clearInterval(ut)},100);
}catch(e){console.warn('Upcoming/latest chapters unavailable',e)}
})();