/* MangaAtlas centralized Ads System. Public pages only; admin pages are excluded. */
(function(){
  'use strict';
  if(window.__mangaAtlasAdsSystemLoaded) return;
  window.__mangaAtlasAdsSystemLoaded=true;

  function script(src, attrs){
    var s=document.createElement('script');
    s.src=src;
    if(attrs) Object.keys(attrs).forEach(function(k){s.setAttribute(k,attrs[k]);});
    return s;
  }
  function box(id){
    var d=document.createElement('div');
    d.id=id;
    d.setAttribute('data-manga-atlas-ad','true');
    d.style.cssText='display:flex;justify-content:center;align-items:center;width:100%;margin:16px auto;min-height:0;overflow:visible;';
    return d;
  }
  function atOption(key,width,height){
    window.atOptions={key:key,format:'iframe',height:height,width:width,params:{}};
    var s=document.createElement('script');
    s.src='https://www.highrevenueformat.com/'+key+'/invoke.js';
    s.async=true;
    return s;
  }
  function addAds(){
    if(document.body.getAttribute('data-manga-atlas-ads-installed')==='1') return;
    document.body.setAttribute('data-manga-atlas-ads-installed','1');
    if(location.pathname.indexOf('/admin')===0) return;

    /* START: 728x90 */
    var start728=box('manga-atlas-ad-start-728');
    start728.appendChild(atOption('6513670c5172f87515d7daa363316e9e',728,90));
    document.body.insertBefore(start728,document.body.firstChild);

    /* START: 300x250 */
    var start300=box('manga-atlas-ad-start-300');
    start300.appendChild(atOption('d403d3e95eb68c8dc43b433780436e3e',300,250));
    document.body.insertBefore(start300,document.body.firstChild);

    /* END: native/banner container */
    var end=document.createElement('div');
    end.id='manga-atlas-ad-end-native';
    end.setAttribute('data-manga-atlas-ad','true');
    end.style.cssText='display:flex;justify-content:center;align-items:center;width:100%;margin:20px auto;overflow:visible;';
    var native=script('https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js',{async:'async','data-cfasync':'false'});
    end.appendChild(native);
    var nativeContainer=document.createElement('div');
    nativeContainer.id='container-d4d07386504123ce6e8dd856dd6557f7';
    end.appendChild(nativeContainer);
    document.body.appendChild(end);

    /* SOCIAL BAR */
    var social=script('https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js');
    social.setAttribute('data-manga-atlas-social-bar','true');
    document.body.appendChild(social);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',addAds,{once:true});
  else addAds();
})();
