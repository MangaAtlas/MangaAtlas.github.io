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

  function adFrame(parent,width,height,code){
    var wrap=document.createElement('div');
    wrap.style.cssText='width:100%;display:flex;justify-content:center;align-items:center;min-height:'+height+'px;margin:14px 0;overflow:visible;';
    var frame=document.createElement('iframe');
    frame.width=String(width);
    frame.height=String(height);
    frame.setAttribute('frameborder','0');
    frame.setAttribute('scrolling','no');
    frame.setAttribute('title','Advertisement');
    frame.style.cssText='display:block;max-width:100%;border:0;overflow:hidden;background:transparent;';
    wrap.appendChild(frame);
    parent.appendChild(wrap);
    frame.addEventListener('load',function(){
      try{
        var d=frame.contentDocument;
        d.open();
        d.write('<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden;}body{display:flex;justify-content:center;align-items:flex-start;}</style></head><body>'+code+'</body></html>');
        d.close();
      }catch(e){}
    },{once:true});
    frame.src='about:blank';
  }

  function addAds(){
    if(window.__mangaAtlasAdsLoaded||!document.body)return;
    window.__mangaAtlasAdsLoaded=true;

    var top=document.createElement('div');
    top.id='mangaatlas-ads-top';
    top.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;';
    document.body.insertBefore(top,document.body.firstChild);

    var ad300='<script>var atOptions={key:"d403d3e95eb68c8dc43b433780436e3e",format:"iframe",height:250,width:300,params:{}};</scr'+'ipt><script src="https://www.highrevenueformat.com/d403d3e95eb68c8dc43b433780436e3e/invoke.js"></scr'+'ipt>';
    var ad728='<script>var atOptions={key:"6513670c5172f87515d7daa363316e9e",format:"iframe",height:90,width:728,params:{}};</scr'+'ipt><script src="https://www.highrevenueformat.com/6513670c5172f87515d7daa363316e9e/invoke.js"></scr'+'ipt>';

    adFrame(top,300,250,ad300);
    adFrame(top,728,90,ad728);

    var bottom=document.createElement('div');
    bottom.id='mangaatlas-ads-bottom';
    bottom.style.cssText='width:100%;display:flex;flex-direction:column;align-items:center;overflow:visible;margin-top:18px;';
    document.body.appendChild(bottom);
    adFrame(bottom,300,250,ad300);
    adFrame(bottom,728,90,ad728);
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
