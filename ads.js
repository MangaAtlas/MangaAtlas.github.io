/* Legacy compatibility entry point. The Ads System now lives in /ads-system.js. */
(function(){
  if(document.querySelector('script[data-manga-atlas-ads-system]')) return;
  var s=document.createElement('script');
  s.src='/ads-system.js?v=1';
  s.async=false;
  s.setAttribute('data-manga-atlas-ads-system','true');
  (document.head||document.documentElement).appendChild(s);
})();
