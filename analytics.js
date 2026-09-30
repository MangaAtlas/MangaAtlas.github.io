(function(){
  var MEASUREMENT_ID='G-50N8R6DVZH';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  gtag('js',new Date());
  gtag('config',MEASUREMENT_ID,{send_page_view:false});
  var ga=document.createElement('script');
  ga.async=true;
  ga.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(ga);
  function pageView(){
    if(location.pathname==='/chapter.html'||location.pathname==='/chapter') return;
    var p={page_title:document.title,page_location:location.href,page_path:location.pathname+location.search};
    gtag('event','page_view',p);
  }
  function loadChapterNavigation(){
    if(location.pathname!=='/chapter.html'&&location.pathname!=='/chapter') return;
    if(document.querySelector('script[data-manga-atlas-navigation]')) return;
    var s=document.createElement('script');s.src='/chapter-navigation.js?v=1';s.async=false;s.setAttribute('data-manga-atlas-navigation','true');document.head.appendChild(s);
  }
  function loadSeoSystem(){
    if(document.querySelector('script[data-manga-atlas-seo]')) return;
    var s=document.createElement('script');s.src='/seo-system.js?v=1';s.async=true;s.setAttribute('data-manga-atlas-seo','true');document.head.appendChild(s);
  }
  function loadAdsSystem(){
    if(location.pathname.indexOf('/admin')===0)return;
    if(document.querySelector('script[data-manga-atlas-ads]'))return;
    var s=document.createElement('script');s.src='/ads-system.js?v=10';s.async=false;s.setAttribute('data-manga-atlas-ads','true');document.head.appendChild(s);
  }
  function boot(){loadSeoSystem();loadAdsSystem();pageView();loadChapterNavigation();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.mangaAtlasAnalytics={pageView:function(extra){var p={page_title:document.title,page_location:location.href,page_path:location.pathname+location.search,send_to:MEASUREMENT_ID};if(extra)for(var k in extra)p[k]=String(extra[k]);gtag('event','page_view',p);if(extra&&String(extra.content_type||'')==='chapter'){var cv={chapter_slug:String(extra.chapter_slug||''),chapter_number:String(extra.chapter_number||''),manga_title:String(extra.manga_title||''),page_title:document.title,page_location:location.href,send_to:MEASUREMENT_ID};gtag('event','chapter_view',cv)}},event:function(name,params){var p=params||{};if(typeof p.send_to==='undefined')p.send_to=MEASUREMENT_ID;gtag('event',name,p)}};
})();
