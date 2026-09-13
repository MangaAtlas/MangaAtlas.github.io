(function(){
  if (window.__mangaAtlasAdLoaded) return;
  window.__mangaAtlasAdLoaded = true;
  function mount(){
    if (!document.body || document.getElementById('manga-atlas-ad-top')) return;
    var wrap=document.createElement('div');
    wrap.id='manga-atlas-ad-top';
    wrap.style.cssText='width:100%;display:block;text-align:center;margin:0 auto;padding:0;min-height:0;overflow:hidden;';
    var container=document.createElement('div');
    container.id='container-d4d07386504123ce6e8dd856dd6557f7';
    wrap.appendChild(container);
    document.body.insertBefore(wrap,document.body.firstChild);
    var s=document.createElement('script');
    s.async=true;
    s.setAttribute('data-cfasync','false');
    s.src='https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
