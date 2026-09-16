/* MangaAtlas centralized Ads System. Public pages only; admin pages are excluded. */
(function(){
  'use strict';
  if(window.__mangaAtlasAdsSystemLoaded)return;
  window.__mangaAtlasAdsSystemLoaded=true;

  var units=[
    {key:'6513670c5172f87515d7daa363316e9e',w:728,h:90},
    {key:'0dffb9a5d286dadd089fd0b69e19f5b1',w:468,h:60},
    {key:'5c82ac186dcceecbc286b7988c7d9868',w:320,h:50},
    {key:'d403d3e95eb68c8dc43b433780436e3e',w:300,h:250}
  ];
  var nativeSrc='https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js';
  var nativeId='container-d4d07386504123ce6e8dd856dd6557f7';
  var socialSrc='https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js';

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function highFrame(u){
    var box=document.createElement('div');
    box.className='manga-atlas-ad-slot';
    box.style.cssText='width:100%;min-height:'+u.h+'px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;';
    var iframe=document.createElement('iframe');
    iframe.title='Advertisement';
    iframe.loading='lazy';
    iframe.scrolling='no';
    iframe.frameBorder='0';
    iframe.style.cssText='display:block;border:0;width:'+u.w+'px;height:'+u.h+'px;max-width:100%;overflow:hidden;';
    iframe.srcdoc='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden;text-align:center}iframe{max-width:100%}</style></head><body><script>var atOptions={key:\''+esc(u.key)+'\',format:\'iframe\',height:'+u.h+',width:'+u.w+',params:{}};</script><script src="https://www.highrevenueformat.com/'+esc(u.key)+'/invoke.js"></script></body></html>';
    box.appendChild(iframe);
    return box;
  }
  function nativeFrame(){
    var box=document.createElement('div');
    box.className='manga-atlas-native-ad-slot';
    box.style.cssText='width:100%;min-height:100px;margin:24px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;text-align:center;';
    var iframe=document.createElement('iframe');
    iframe.title='Advertisement';
    iframe.loading='lazy';
    iframe.frameBorder='0';
    iframe.style.cssText='display:block;border:0;width:100%;min-height:100px;max-width:100%;overflow:hidden;';
    iframe.srcdoc='<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;text-align:center;overflow:hidden}</style></head><body><div id="'+nativeId+'"></div><script async data-cfasync="false" src="'+nativeSrc+'"></script></body></html>';
    box.appendChild(iframe);
    return box;
  }
  function social(){
    if(document.querySelector('[data-manga-atlas-social]'))return;
    var s=document.createElement('script');
    s.src=socialSrc;
    s.async=true;
    s.setAttribute('data-manga-atlas-social','1');
    document.body.appendChild(s);
  }
  function makeSet(){
    var frag=document.createDocumentFragment();
    units.forEach(function(u){frag.appendChild(highFrame(u));});
    return frag;
  }
  function addSetAfter(node){
    var frag=makeSet();
    node.parentNode.insertBefore(frag,node.nextSibling);
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
    end.appendChild(nativeFrame());
    document.body.appendChild(end);
    social();
  }
  function install(){
    if(!document.body||location.pathname.indexOf('/admin')===0)return;
    pageAds();
    chapterAds();
    setTimeout(function(){pageAds();chapterAds();},500);
    setTimeout(function(){chapterAds();},1500);
    setTimeout(function(){chapterAds();},3000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  new MutationObserver(function(){chapterAds();}).observe(document.documentElement,{childList:true,subtree:true});
})();
