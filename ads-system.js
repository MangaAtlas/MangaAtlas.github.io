(function(){
  if(window.__mangaAtlasAdsSystemLoaded) return;
  window.__mangaAtlasAdsSystemLoaded=true;

  var CFG={
    nativeSrc:'https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js',
    nativeId:'container-d4d07386504123ce6e8dd856dd6557f7',
    socialSrc:'https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js',
    ad300:{key:'d403d3e95eb68c8dc43b433780436e3e',width:300,height:250,src:'https://www.highrevenueformat.com/d403d3e95eb68c8dc43b433780436e3e/invoke.js'},
    ad728:{key:'6513670c5172f87515d7daa363316e9e',width:728,height:90,src:'https://www.highrevenueformat.com/6513670c5172f87515d7daa363316e9e/invoke.js'}
  };

  function cleanLegacyAds(){
    var nodes=document.querySelectorAll('script[src*="profitableratecpmnetwork.com"],script[src*="highrevenueformat.com"]');
    nodes.forEach(function(s){
      var src=s.getAttribute('src')||'';
      if(src===CFG.nativeSrc || src===CFG.socialSrc || src===CFG.ad300.src || src===CFG.ad728.src){
        var parent=s.parentElement;
        if(parent && parent.children.length<=2 && parent.parentElement && parent.parentElement.children.length<=4) parent.parentElement.remove();
        else if(parent && parent!==document.head) parent.remove();
        else s.remove();
      }
    });
    var oldNative=document.getElementById(CFG.nativeId);
    if(oldNative){var p=oldNative.parentElement;p?p.remove():oldNative.remove();}
    ['manga-atlas-ad-top','mangaatlas-ads-top','mangaatlas-ads-bottom'].forEach(function(id){var el=document.getElementById(id);if(el)el.remove();});
  }

  function box(parent,w,h,label){
    var b=document.createElement('div');
    b.style.cssText='width:'+w+'px;min-height:'+h+'px;max-width:100%;margin:12px auto;display:flex;justify-content:center;align-items:flex-start;overflow:visible;';
    b.setAttribute('data-manga-atlas-ad-box',label);
    parent.appendChild(b);
    return b;
  }

  function iframeAd(parent,cfg,label){
    try{
      var b=box(parent,cfg.width,cfg.height,label);
      window.atOptions={key:cfg.key,format:'iframe',height:cfg.height,width:cfg.width,params:{}};
      var s=document.createElement('script');
      s.src=cfg.src;
      s.async=false;
      s.setAttribute('data-manga-atlas-ad',label);
      s.onerror=function(){b.style.display='none';};
      b.appendChild(s);
    }catch(e){console.warn('MangaAtlas ad failed:',label,e);}
  }

  function nativeAd(parent){
    try{
      var b=document.createElement('div');
      b.style.cssText='width:100%;min-height:90px;margin:12px 0;display:flex;justify-content:center;overflow:visible;';
      var c=document.createElement('div');
      c.id=CFG.nativeId;
      b.appendChild(c);
      parent.appendChild(b);
      var s=document.createElement('script');
      s.async=true;
      s.setAttribute('data-cfasync','false');
      s.src=CFG.nativeSrc;
      s.setAttribute('data-manga-atlas-ad','native');
      s.onerror=function(){b.style.display='none';};
      b.insertBefore(s,c);
    }catch(e){console.warn('MangaAtlas native ad failed:',e);}
  }

  function socialBar(){
    try{
      if(document.querySelector('script[data-manga-atlas-ad="social"]')) return;
      var s=document.createElement('script');
      s.src=CFG.socialSrc;
      s.async=true;
      s.setAttribute('data-manga-atlas-ad','social');
      s.onerror=function(){s.remove();};
      document.body.appendChild(s);
    }catch(e){console.warn('MangaAtlas social ad failed:',e);}
  }

  function mount(){
    if(!document.body || document.getElementById('mangaatlas-ads-system')) return;
    cleanLegacyAds();
    var top=document.createElement('div');
    top.id='mangaatlas-ads-system';
    top.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;';
    document.body.insertBefore(top,document.body.firstChild);
    nativeAd(top);
    iframeAd(top,CFG.ad300,'300x250-top');
    iframeAd(top,CFG.ad728,'728x90-top');

    var bottom=document.createElement('div');
    bottom.id='mangaatlas-ads-system-bottom';
    bottom.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;margin-top:18px;';
    iframeAd(bottom,CFG.ad300,'300x250-bottom');
    iframeAd(bottom,CFG.ad728,'728x90-bottom');
    document.body.appendChild(bottom);
    socialBar();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
