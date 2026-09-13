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
    gtag('event','page_view',{page_title:document.title,page_location:location.href,page_path:location.pathname+location.search});
  }

  /* These two ad providers both read the global window.atOptions object.
     Do NOT load them async: async loading lets the second key overwrite the
     first key before its script executes, which makes both placements fail. */
  function ad300(parent){
    var box=document.createElement('div');
    box.style.cssText='width:300px;min-height:250px;max-width:100%;margin:12px auto;display:flex;justify-content:center;align-items:flex-start;overflow:visible;';
    parent.appendChild(box);
    window.atOptions={key:'d403d3e95eb68c8dc43b433780436e3e',format:'iframe',height:250,width:300,params:{}};
    var s=document.createElement('script');
    s.src='https://www.highrevenueformat.com/d403d3e95eb68c8dc43b433780436e3e/invoke.js';
    s.async=false;
    s.setAttribute('data-manga-atlas-ad','300x250');
    box.appendChild(s);
  }

  function ad728(parent){
    var box=document.createElement('div');
    box.style.cssText='width:728px;min-height:90px;max-width:100%;margin:12px auto;display:flex;justify-content:center;align-items:flex-start;overflow:visible;';
    parent.appendChild(box);
    window.atOptions={key:'6513670c5172f87515d7daa363316e9e',format:'iframe',height:90,width:728,params:{}};
    var s=document.createElement('script');
    s.src='https://www.highrevenueformat.com/6513670c5172f87515d7daa363316e9e/invoke.js';
    s.async=false;
    s.setAttribute('data-manga-atlas-ad','728x90');
    box.appendChild(s);
  }

  function nativeAd(parent){
    var box=document.createElement('div');
    box.style.cssText='width:100%;min-height:90px;margin:12px 0;display:flex;justify-content:center;overflow:visible;';
    var container=document.createElement('div');
    container.id='container-d4d07386504123ce6e8dd856dd6557f7';
    box.appendChild(container);
    parent.appendChild(box);
    var s=document.createElement('script');
    s.async=true;
    s.setAttribute('data-cfasync','false');
    s.src='https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js';
    box.insertBefore(s,container);
  }

  function socialBar(){
    var s=document.createElement('script');
    s.src='https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js';
    s.async=true;
    s.setAttribute('data-manga-atlas-ad','social');
    document.body.appendChild(s);
  }

  function ads(){
    if(window.__mangaAtlasAdsLoaded||!document.body) return;
    window.__mangaAtlasAdsLoaded=true;

    var top=document.createElement('div');
    top.id='mangaatlas-ads-top';
    top.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;';
    document.body.insertBefore(top,document.body.firstChild);
    nativeAd(top);
    ad300(top);
    ad728(top);

    var bottom=document.createElement('div');
    bottom.id='mangaatlas-ads-bottom';
    bottom.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;margin-top:18px;';
    ad300(bottom);
    ad728(bottom);
    document.body.appendChild(bottom);
    socialBar();
  }

  function boot(){
    ads();
    pageView();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  window.mangaAtlasAnalytics={
    pageView:function(extra){
      var p={page_title:document.title,page_location:location.href,page_path:location.pathname+location.search};
      if(extra) for(var k in extra) p[k]=String(extra[k]);
      gtag('event','page_view',p);
    },
    event:function(name,params){gtag('event',name,params||{})}
  };
})();
