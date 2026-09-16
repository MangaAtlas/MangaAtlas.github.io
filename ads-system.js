/* MangaAtlas chapter ads — exactly 3 rounds between chapter images. */
(function(){
'use strict';
if(window.__MangaAtlasChapterAds)return;
window.__MangaAtlasChapterAds=true;
if(location.pathname.indexOf('/admin')===0)return;
var rounds=[
 ['/ads/r1-728.html','/ads/r1-468.html','/ads/r1-320.html','/ads/r1-300.html'],
 ['/ads/r2-728.html','/ads/r2-468.html','/ads/r2-320.html','/ads/r2-300.html'],
 ['/ads/r3-728.html','/ads/r3-468.html','/ads/r3-320.html','/ads/r3-300.html']
];
var sizes=[
 [728,90],[468,60],[320,50],[300,250]
];
function ad(src,size,round,index){
 var wrap=document.createElement('div');
 wrap.className='manga-atlas-ad-round manga-atlas-ad-round-'+round;
 wrap.setAttribute('data-ad-round',String(round));
 wrap.style.cssText='display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:14px;width:100%;margin:24px auto;padding:8px 0;clear:both;min-height:'+size[1]+'px;';
 var f=document.createElement('iframe');
 f.title='Advertisement';f.frameBorder='0';f.scrolling='no';f.loading='eager';
 f.style.cssText='display:block;width:'+size[0]+'px;height:'+size[1]+'px;max-width:100%;border:0;background:transparent;';
 f.src=src+'?round='+round+'&slot='+index+'&cb='+Date.now()+'-'+Math.random().toString(36).slice(2);
 wrap.appendChild(f);return wrap;
}
function addRound(img,round){
 var frag=document.createDocumentFragment();
 rounds[round-1].forEach(function(src,i){frag.appendChild(ad(src,sizes[i],round,i+1));});
 img.parentNode.insertBefore(frag,img.nextSibling);
}
function install(){
 var pages=document.querySelector('.pages');
 if(!pages||pages.dataset.chapterAdsDone==='1')return;
 var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
 if(imgs.length<4)return;
 pages.dataset.chapterAdsDone='1';
 /* Put the three rounds after 25%, 50% and 75% of the chapter images. */
 [0.25,0.50,0.75].forEach(function(r,i){
   var idx=Math.min(imgs.length-1,Math.max(0,Math.ceil(imgs.length*r)-1));
   addRound(imgs[idx],i+1);
 });
}
function boot(){install();setTimeout(install,250);setTimeout(install,750);setTimeout(install,1500);setTimeout(install,3000);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
new MutationObserver(function(){install();}).observe(document.documentElement,{childList:true,subtree:true});
})();
