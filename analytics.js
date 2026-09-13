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

  /* MangaAtlas ads: keep the original provider snippets parser-executed. */
  if(!window.__mangaAtlasAdsWritten){
    window.__mangaAtlasAdsWritten=true;

    /* NativeBanner / container ad */
    document.write('<script async="async" data-cfasync="false" src="https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js"><\\/script>');
    document.write('<div id="container-d4d07386504123ce6e8dd856dd6557f7"></div>');

    /* Social bar */
    document.write('<script src="https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js"><\\/script>');

    /* 300x250 - top */
    document.write('<script>atOptions={key:"d403d3e95eb68c8dc43b433780436e3e",format:"iframe",height:250,width:300,params:{}};<\\/script>');
    document.write('<script src="https://www.highrevenueformat.com/d403d3e95eb68c8dc43b433780436e3e/invoke.js"><\\/script>');

    /* 728x90 - top */
    document.write('<script>atOptions={key:"6513670c5172f87515d7daa363316e9e",format:"iframe",height:90,width:728,params:{}};<\\/script>');
    document.write('<script src="https://www.highrevenueformat.com/6513670c5172f87515d7daa363316e9e/invoke.js"><\\/script>');

    /* 300x250 - second placement */
    document.write('<script>atOptions={key:"d403d3e95eb68c8dc43b433780436e3e",format:"iframe",height:250,width:300,params:{}};<\\/script>');
    document.write('<script src="https://www.highrevenueformat.com/d403d3e95eb68c8dc43b433780436e3e/invoke.js"><\\/script>');

    /* 728x90 - second placement */
    document.write('<script>atOptions={key:"6513670c5172f87515d7daa363316e9e",format:"iframe",height:90,width:728,params:{}};<\\/script>');
    document.write('<script src="https://www.highrevenueformat.com/6513670c5172f87515d7daa363316e9e/invoke.js"><\\/script>');
  }

  function pageView(){
    if(location.pathname==='/chapter.html'||location.pathname==='/chapter') return;
    gtag('event','page_view',{page_title:document.title,page_location:location.href,page_path:location.pathname+location.search});
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
