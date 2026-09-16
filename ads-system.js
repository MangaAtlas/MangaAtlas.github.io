/* MangaAtlas centralized Ads System. Public pages only; admin pages are excluded. */
(function(){
  'use strict';
  if(window.__mangaAtlasAdsSystemLoaded) return;
  window.__mangaAtlasAdsSystemLoaded=true;
  function addScript(src,attrs){var s=document.createElement('script');s.src=src;if(attrs)Object.keys(attrs).forEach(function(k){s.setAttribute(k,attrs[k]);});return s;}
  function box(id,height){var d=document.createElement('div');d.id=id;d.setAttribute('data-manga-atlas-ad','true');d.style.cssText='display:flex;justify-content:center;align-items:center;width:100%;min-height:'+height+'px;margin:16px auto;overflow:visible;';return d;}
  function addIframeAd(parent,key,width,height){window.atOptions={key:key,format:'iframe',height:height,width:width,params:{}};var s=addScript('https://www.highrevenueformat.com/'+key+'/invoke.js');s.async=false;parent.appendChild(s);}
  function install(){
    if(!document.body||location.pathname.indexOf('/admin')===0)return;
    if(document.body.getAttribute('data-manga-atlas-ads-installed')==='1')return;
    document.body.setAttribute('data-manga-atlas-ads-installed','1');
    var start300=box('manga-atlas-ad-start-300',250);addIframeAd(start300,'d403d3e95eb68c8dc43b433780436e3e',300,250);document.body.insertBefore(start300,document.body.firstChild);
    var start728=box('manga-atlas-ad-start-728',90);addIframeAd(start728,'6513670c5172f87515d7daa363316e9e',728,90);document.body.insertBefore(start728,document.body.firstChild);
    var end=box('manga-atlas-ad-end-native',90);var container=document.createElement('div');container.id='container-d4d07386504123ce6e8dd856dd6557f7';end.appendChild(container);var native=addScript('https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js',{async:'async','data-cfasync':'false'});end.appendChild(native);document.body.appendChild(end);
    var social=addScript('https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js');social.setAttribute('data-manga-atlas-social-bar','true');document.body.appendChild(social);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
