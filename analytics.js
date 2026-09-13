(function(){
  var MEASUREMENT_ID='G-50N8R6DVZH';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  gtag('js',new Date());
  gtag('config',MEASUREMENT_ID,{send_page_view:false});

  var s=document.createElement('script');
  s.async=true;
  s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(MEASUREMENT_ID);
  s.onerror=function(){window.__mangaAtlasAnalyticsError='gtag_load_failed'};
  document.head.appendChild(s);

  var adScript='';
  function mountTopAd(){
    if(!document.body||document.getElementById('manga-atlas-ad-top')) return;
    var wrap=document.createElement('div');
    wrap.id='manga-atlas-ad-top';
    wrap.style.cssText='width:100%;display:block;text-align:center;margin:0 auto;padding:0;min-height:0;overflow:hidden;';
    var container=document.createElement('div');
    container.id='container-9c318a50ef96d7af9089a1f23c3dcd48';
    wrap.appendChild(container);
    document.body.insertBefore(wrap,document.body.firstChild);
    var ad=document.createElement('script');
    ad.async=true;
    ad.setAttribute('data-cfasync','false');
    ad.src=adScript;
    document.head.appendChild(ad);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountTopAd,{once:true});
  else mountTopAd();

  function pageView(){
    if(location.pathname==='/chapter.html'||location.pathname==='/chapter') return;
    gtag('event','page_view',{
      page_title:document.title,
      page_location:location.href,
      page_path:location.pathname+location.search
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',pageView,{once:true});
  else pageView();

  window.mangaAtlasAnalytics={
    pageView:function(extra){
      var p={page_title:document.title,page_location:location.href,page_path:location.pathname+location.search};
      if(extra) for(var k in extra) p[k]=String(extra[k]);
      gtag('event','page_view',p);
    },
    event:function(name,params){gtag('event',name,params||{})}
  };
})();
