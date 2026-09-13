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

  function addScript(src,attrs){
    var x=document.createElement('script');
    x.src=src;
    if(attrs) for(var k in attrs) x.setAttribute(k,attrs[k]);
    document.body.appendChild(x);
    return x;
  }
  function addFixedAd(){
    if(document.getElementById('manga-atlas-social-bar')) return;
    addScript('https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js');
  }
  function addDisplayAd(id,key,width,height,where){
    var wrap=document.createElement('div');
    wrap.id=id;
    wrap.style.cssText='width:100%;display:flex;justify-content:center;align-items:center;text-align:center;margin:18px auto;padding:0;min-height:'+height+'px;overflow:hidden;';
    var holder=document.createElement('div');
    holder.id=id+'-holder';
    wrap.appendChild(holder);
    if(where==='start') document.body.insertBefore(wrap,document.body.firstChild);
    else document.body.appendChild(wrap);
    window.atOptions={key:key,format:'iframe',height:height,width:width,params:{}};
    var x=document.createElement('script');
    x.async=false;
    x.src='https://www.highrevenueformat.com/'+key+'/invoke.js';
    wrap.appendChild(x);
  }
  function mountAds(){
    if(!document.body||document.getElementById('manga-atlas-ads-mounted')) return;
    var marker=document.createElement('span');
    marker.id='manga-atlas-ads-mounted';
    marker.style.display='none';
    document.body.appendChild(marker);

    addFixedAd();

    addDisplayAd('manga-atlas-ad-300-top','d403d3e95eb68c8dc43b433780436e3e',300,250,'start');
    addDisplayAd('manga-atlas-ad-728-top','6513670c5172f87515d7daa363316e9e',728,90,'start');
    addDisplayAd('manga-atlas-ad-300-bottom','d403d3e95eb68c8dc43b433780436e3e',300,250,'end');
    addDisplayAd('manga-atlas-ad-728-bottom','6513670c5172f87515d7daa363316e9e',728,90,'end');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mountAds,{once:true});
  else mountAds();

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
