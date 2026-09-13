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

  function addExternalScript(parent,src,attrs){
    var s=document.createElement('script');
    if(attrs) Object.keys(attrs).forEach(function(k){s.setAttribute(k,attrs[k])});
    s.src=src;
    parent.appendChild(s);
  }

  function addHighRevenue(parent,key,width,height){
    var box=document.createElement('div');
    box.style.cssText='display:flex;justify-content:center;align-items:center;width:100%;min-height:'+height+'px;margin:14px 0;overflow:visible;';
    var cfg=document.createElement('script');
    cfg.text='atOptions={key:'+JSON.stringify(key)+',format:"iframe",height:'+height+',width:'+width+',params:{}};';
    box.appendChild(cfg);
    addExternalScript(box,'https://www.highrevenueformat.com/'+key+'/invoke.js');
    parent.appendChild(box);
  }

  function addAds(){
    if(window.__mangaAtlasAdsLoaded||!document.body)return;
    window.__mangaAtlasAdsLoaded=true;

    var top=document.createElement('div');
    top.id='mangaatlas-ads-top';
    top.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;';

    var nativeBox=document.createElement('div');
    nativeBox.style.cssText='width:100%;display:flex;justify-content:center;align-items:center;margin:8px 0;overflow:visible;';
    addExternalScript(nativeBox,'https://pl31326962.profitableratecpmnetwork.com/d4d07386504123ce6e8dd856dd6557f7/invoke.js',{'async':'async','data-cfasync':'false'});
    var nativeContainer=document.createElement('div');
    nativeContainer.id='container-d4d07386504123ce6e8dd856dd6557f7';
    nativeBox.appendChild(nativeContainer);
    top.appendChild(nativeBox);

    var social=document.createElement('div');
    social.style.cssText='width:100%;display:block;overflow:visible;';
    addExternalScript(social,'https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js');
    top.appendChild(social);

    addHighRevenue(top,'d403d3e95eb68c8dc43b433780436e3e',300,250);
    addHighRevenue(top,'6513670c5172f87515d7daa363316e9e',728,90);
    document.body.insertBefore(top,document.body.firstChild);

    var bottom=document.createElement('div');
    bottom.id='mangaatlas-ads-bottom';
    bottom.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;margin-top:18px;';
    addHighRevenue(bottom,'d403d3e95eb68c8dc43b433780436e3e',300,250);
    addHighRevenue(bottom,'6513670c5172f87515d7daa363316e9e',728,90);
    document.body.appendChild(bottom);
  }

  function pageView(){
    if(location.pathname==='/chapter.html'||location.pathname==='/chapter') return;
    gtag('event','page_view',{page_title:document.title,page_location:location.href,page_path:location.pathname+location.search});
  }

  function boot(){
    addAds();
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
