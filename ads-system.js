/* MangaAtlas Ads System — reliable admin-controlled sections. */
(async function(){
'use strict';
if(window.__mangaAtlasAdsSystemLoaded)return;
window.__mangaAtlasAdsSystemLoaded=true;
if(location.pathname.indexOf('/admin')===0)return;
var cfg;
try{var r=await fetch('/data/ads-config.json?v='+Date.now(),{cache:'no-store'});if(!r.ok)return;cfg=await r.json()}catch(e){return}
var sections=Array.isArray(cfg&&cfg.sections)?cfg.sections.filter(function(s){return s&&s.enabled&&String(s.code||'').trim()}):[];
if(!sections.length)return;
function executeCode(code,id){
 var box=document.createElement('div');
 box.className='manga-atlas-ad-slot';
 box.dataset.maAdSection=id;
 box.style.cssText='width:100%;min-height:20px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;position:relative;z-index:1;';
 var tpl=document.createElement('template');tpl.innerHTML=String(code||'').trim();
 Array.prototype.slice.call(tpl.content.childNodes).forEach(function(n){
  if(n.nodeType===1&&n.tagName.toLowerCase()==='script'){
   var s=document.createElement('script');
   Array.prototype.slice.call(n.attributes).forEach(function(a){s.setAttribute(a.name,a.value)});
   s.text=n.textContent||'';box.appendChild(s);
  }else box.appendChild(n.cloneNode(true));
 });
 return box;
}
function executeIsolated(code,id){
 var box=document.createElement('div');
 box.className='manga-atlas-ad-slot';
 box.dataset.maAdSection=id;
 box.style.cssText='width:100%;min-height:90px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;position:relative;z-index:1;';
 var frame=document.createElement('iframe');
 frame.title='Advertisement '+id;
 frame.setAttribute('scrolling','no');
 frame.style.cssText='width:100%;max-width:100%;min-height:90px;height:250px;border:0;display:block;background:transparent;';
 frame.srcdoc='<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:0;text-align:center;overflow:hidden">'+String(code||'')+'</body></html>';
 box.appendChild(frame);
 return box;
}
function root(){return document.querySelector('.pages')||document.querySelector('main')||document.querySelector('article')||document.body}
function exists(id){return document.querySelector('[data-ma-ad-section="'+CSS.escape(String(id))+'"]')}
function place(s){
 var id=String(s.id||'');if(!id||exists(id))return true;
 var r=root();if(!r)return false;
 var p=String(s.placement||'start').toLowerCase();
 var box;
 if(p==='between'){
  var pages=document.querySelector('.pages');
  if(!pages)return false;
  var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
  var n=parseInt(s.afterImage!=null?s.afterImage:s.between,10);if(!Number.isFinite(n)||n<1)n=5;
  if(imgs.length<n)return false;
  box=executeIsolated(s.code,id);
  pages.insertBefore(box,imgs[n-1].nextSibling);return true;
 }
 if(p==='end'){
  box=executeIsolated(s.code,id);
  r.parentNode.insertBefore(box,r.nextSibling);return true
 }
 box=executeIsolated(s.code,id);
 r.parentNode.insertBefore(box,r);return true;
}
function install(){sections.forEach(function(s){place(s)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
var observer=new MutationObserver(function(){install()});
observer.observe(document.body,{childList:true,subtree:true});
var tries=0;var timer=setInterval(function(){install();if(++tries>=50)clearInterval(timer)},300);
})();
