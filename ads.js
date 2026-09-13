(function(){
  if (window.__mangaAtlasAdLoaded) return;
  window.__mangaAtlasAdLoaded = true;
  function mount(){
    if (!document.body || document.getElementById('manga-atlas-ad-top')) return;
    var wrap=document.createElement('div');
    wrap.id='manga-atlas-ad-top';
    wrap.style.cssText='width:100%;display:block;text-align:center;margin:0 auto;padding:0;min-height:0;overflow:hidden;';
    var container=document.createElement('div');
    container.id='container-9c318a50ef96d7af9089a1f23c3dcd48';
    wrap.appendChild(container);
    document.body.insertBefore(wrap,document.body.firstChild);
    var s=document.createElement('script');
    s.async=true;
    s.setAttribute('data-cfasync','false');
    s.src='https://pl31305611.profitableratecpmnetwork.com/9c318a50ef96d7af9089a1f23c3dcd48/invoke.js';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
