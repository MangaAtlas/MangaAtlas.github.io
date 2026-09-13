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

  function load(src,done){
    var s=document.createElement('script');
    s.src=src;
    s.async=false;
    s.onload=function(){if(done)done()};
    s.onerror=function(){if(done)done()};
    document.body.appendChild(s);
  }

  function adBox(id,width,height,where,done){
    var box=document.createElement('div');
    box.id=id;
    box.style.cssText='width:100%;display:flex;justify-content:center;align-items:center;text-align:center;margin:18px auto;padding:0;';
    if(where==='start') document.body.insertBefore(box,document.body.firstChild);
    else document.body.appendChild(box);
    window.atOptions={format:'iframe',height:height,width:width,params:{}};
    if(id.indexOf('300')!==-1) window.atOptions.key='d403d3e95eb68c8dc43b433780436e3e';
    else window.atOptions.key='6513670c5172f87515d7daa363316e9e';
    var s=document.createElement('script');
    s.src='https://www.highrevenueformat.com/'+window.atOptions.key+'/invoke.js';
    s.async=false;
    s.onload=function(){if(done)done()};
    s.onerror=function(){if(done)done()};
    box.appendChild(s);
  }

  function mountAds(){
    if(!document.body||document.getElementById('manga-atlas-ads-mounted')) return;
    var marker=document.createElement('span');
    marker.id='manga-atlas-ads-mounted';
    marker.style.display='none';
    document.body.appendChild(marker);

    load('https://pl31326963.profitableratecpmnetwork.com/01/89/4e/01894ea722635fb2ec48d7847937a012.js',function(){
      adBox('manga-atlas-ad-300-top',300,250,'start',function(){
        adBox('manga-atlas-ad-728-top',728,90,'start',function(){
          adBox('manga-atlas-ad-300-bottom',300,250,'end',function(){
            adBox('manga-atlas-ad-728-bottom',728,90,'end');
          });
        });
      });
    });
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
