/* MangaAtlas centralized chapter-interstitial Ads System. Public pages only; admin pages are excluded. */
(function(){
'use strict';
if(window.__mangaAtlasAdsSystemLoaded)return;
window.__mangaAtlasAdsSystemLoaded=true;
var rounds=[
 [
  {src:'/ads/r1-728.html',w:728,h:90},{src:'/ads/r1-468.html',w:468,h:60},{src:'/ads/r1-320.html',w:320,h:50},{src:'/ads/r1-300.html',w:300,h:250}
 ],
 [
  {src:'/ads/r2-728.html',w:728,h:90},{src:'/ads/r2-468.html',w:468,h:60},{src:'/ads/r2-320.html',w:320,h:50},{src:'/ads/r2-300.html',w:300,h:250}
 ],
 [
  {src:'/ads/r3-728.html',w:728,h:90},{src:'/ads/r3-468.html',w:468,h:60},{src:'/ads/r3-320.html',w:320,h:50},{src:'/ads/r3-300.html',w:300,h:250}
 ]
];
var nativeSrc='/ads/native.html';
function frame(src,w,h,tag){
 var box=document.createElement('div');
 box.className='manga-atlas-ad-slot';
 box.dataset.adTag=tag||'';
 box.style.cssText='width:100%;min-height:'+h+'px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;';
 var iframe=document.createElement('iframe');
 iframe.title='Advertisement';iframe.loading='eager';iframe.scrolling='no';iframe.frameBorder='0';iframe.allow='autoplay';
 iframe.style.cssText='display:block;border:0;width:'+w+'px;height:'+h+'px;max-width:100%;overflow:hidden;background:transparent;';
 iframe.src=src+'?atlas='+encodeURIComponent(tag||'slot')+'-'+Date.now()+'-'+Math.random().toString(36).slice(2);
 box.appendChild(iframe);return box;
}
function makeRound(n){
 var frag=document.createDocumentFragment();
 rounds[n].forEach(function(u,i){frag.appendChild(frame(u.src,u.w,u.h,'chapter-round-'+(n+1)+'-'+(i+1)));});
 return frag;
}
function addRoundAfter(node,n){if(!node||!node.parentNode)return;node.parentNode.insertBefore(makeRound(n),node.nextSibling);}
function chapterAds(){
 if(location.pathname.indexOf('/admin')===0)return;
 var pages=document.querySelector('.pages');if(!pages)return;
 var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
 if(imgs.length<2||pages.dataset.adsInstalled==='1')return;
 pages.dataset.adsInstalled='1';
 [0.25,0.5,0.75].forEach(function(ratio,i){
  var index=Math.max(0,Math.min(imgs.length-1,Math.floor(imgs.length*ratio)-1));
  addRoundAfter(imgs[index],i);
 });
}
function nativeEnd(){
 if(location.pathname.indexOf('/admin')===0)return;
 if(document.querySelector('[data-manga-atlas-native-end]'))return;
 var end=document.createElement('div');
 end.setAttribute('data-manga-atlas-native-end','1');
 end.className='manga-atlas-page-ads-end';
 end.style.cssText='width:100%;padding:12px 4%;text-align:center;clear:both;';
 end.appendChild(frame(nativeSrc,320,100,'native-end'));
 document.body.appendChild(end);
}
function install(){
 if(!document.body||location.pathname.indexOf('/admin')===0)return;
 nativeEnd();
 chapterAds();
 setTimeout(chapterAds,500);
 setTimeout(chapterAds,1500);
 setTimeout(chapterAds,3000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
new MutationObserver(function(){chapterAds();}).observe(document.documentElement,{childList:true,subtree:true});
})();
