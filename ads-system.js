/* MangaAtlas centralized Ads System. Public pages only; admin pages are excluded. */
(function(){
  'use strict';
  if(window.__mangaAtlasAdsSystemLoaded)return;
  window.__mangaAtlasAdsSystemLoaded=true;

  var units=[
    {src:'/ads/high-728.html',w:728,h:90},
    {src:'/ads/high-468.html',w:468,h:60},
    {src:'/ads/high-320.html',w:320,h:50},
    {src:'/ads/high-300.html',w:300,h:250}
  ];
  var nativeSrc='/ads/native.html';
  var socialSrc='https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js';

  function frame(src,w,h){
    var box=document.createElement('div');
    box.className='manga-atlas-ad-slot';
    box.style.cssText='width:100%;min-height:'+h+'px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;';
    var iframe=document.createElement('iframe');
    iframe.title='Advertisement';
    iframe.loading='eager';
    iframe.scrolling='no';
    iframe.frameBorder='0';
    iframe.allow='autoplay';
    iframe.style.cssText='display:block;border:0;width:'+w+'px;height:'+h+'px;max-width:100%;overflow:hidden;background:transparent;';
    iframe.src=src+'?v=1';
    box.appendChild(iframe);
    return box;
  }

  function makeSet(){
    var frag=document.createDocumentFragment();
    units.forEach(function(u){frag.appendChild(frame(u.src,u.w,u.h));});
    return frag;
  }
  function addSetAfter(node){
    if(!node||!node.parentNode)return;
    node.parentNode.insertBefore(makeSet(),node.nextSibling);
  }
  function chapterAds(){
    if(location.pathname.indexOf('/admin')===0)return;
    var pages=document.querySelector('.pages');
    if(!pages||pages.dataset.adsInstalled==='1')return;
    var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
    if(imgs.length<2)return;
    pages.dataset.adsInstalled='1';
    [0.25,0.5,0.75].forEach(function(ratio){
      var index=Math.max(0,Math.min(imgs.length-1,Math.floor(imgs.length*ratio)-1));
      addSetAfter(imgs[index]);
    });
  }
  function pageAds(){
    if(location.pathname.indexOf('/admin')===0)return;
    if(document.querySelector('[data-manga-atlas-page-ads]'))return;
    var marker=document.createElement('span');
    marker.setAttribute('data-manga-atlas-page-ads','1');
    marker.style.display='none';
    document.body.insertBefore(marker,document.body.firstChild);
    var main=document.querySelector('main')||document.body;
    var start=document.createElement('div');
    start.className='manga-atlas-page-ads-start';
    start.style.cssText='width:100%;padding:12px 4%;text-align:center;clear:both;';
    start.appendChild(makeSet());
    main.insertBefore(start,main.firstChild);
    var end=document.createElement('div');
    end.className='manga-atlas-page-ads-end';
    end.style.cssText='width:100%;padding:12px 4%;text-align:center;clear:both;';
    end.appendChild(frame(nativeSrc,320,100));
    document.body.appendChild(end);
    if(!document.querySelector('[data-manga-atlas-social]')){
      var s=document.createElement('script');
      s.src=socialSrc;
      s.async=true;
      s.setAttribute('data-manga-atlas-social','1');
      document.body.appendChild(s);
    }
  }
  function install(){
    if(!document.body||location.pathname.indexOf('/admin')===0)return;
    pageAds();
    chapterAds();
    setTimeout(function(){pageAds();chapterAds();},500);
    setTimeout(function(){pageAds();chapterAds();},1500);
    setTimeout(function(){pageAds();chapterAds();},3000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  new MutationObserver(function(){chapterAds();}).observe(document.documentElement,{childList:true,subtree:true});
})();
