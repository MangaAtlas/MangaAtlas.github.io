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
  function addScript(src,done){
    var s=document.createElement('script');
    s.src=src;
    s.async=false;
    if(done)s.onload=done;
    return s;
  }
  function unit(u,n){
    var wrap=document.createElement('div');
    wrap.className='manga-atlas-inline-ad manga-atlas-inline-ad-'+n;
    wrap.style.cssText='display:flex;justify-content:center;align-items:center;width:100%;min-height:'+u.h+'px;margin:24px auto;overflow:visible;text-align:center;clear:both;';
    var frame=document.createElement('div');
    frame.style.cssText='width:'+u.w+'px;min-height:'+u.h+'px;max-width:100%;';
    var opt=document.createElement('script');
    opt.text="atOptions={key:'"+u.key+"',format:'iframe',height:"+u.h+",width:"+u.w+",params:{}};";
    frame.appendChild(opt);
    frame.appendChild(addScript('https://www.highrevenueformat.com/'+u.key+'/invoke.js'));
    wrap.appendChild(frame);
    return wrap;
  }
  function chapterAds(){
    if(location.pathname.indexOf('/admin')===0)return;
    var pages=document.querySelector('.pages');
    if(!pages)return;
    var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
    if(imgs.length<2||pages.dataset.adsInstalled==='1')return;
    pages.dataset.adsInstalled='1';
    var positions=[Math.floor(imgs.length/4),Math.floor(imgs.length/2),Math.floor(imgs.length*3/4)];
    positions.forEach(function(pos,round){
      var anchor=imgs[Math.max(0,Math.min(imgs.length-1,pos)-1)];
      if(!anchor)return;
      var box=document.createElement('div');
      box.className='manga-atlas-chapter-ad-round manga-atlas-chapter-ad-round-'+(round+1);
      units.forEach(function(u,i){box.appendChild(unit(u,(round+1)+'-'+(i+1)));});
      anchor.parentNode.insertBefore(box,anchor.nextSibling);
    });
  }
  function retry(){
    chapterAds();
    setTimeout(chapterAds,250);
    setTimeout(chapterAds,1000);
    setTimeout(chapterAds,2500);
  }
  function install(){
    if(!document.body||location.pathname.indexOf('/admin')===0)return;
    retry();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
  new MutationObserver(function(){chapterAds();}).observe(document.documentElement,{childList:true,subtree:true});
})();
