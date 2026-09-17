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
function root(){return document.querySelector('.pages')||document.querySelector('main')||document.querySelector('article')||document.body}
function exists(id){return document.querySelector('[data-ma-ad-section="'+CSS.escape(String(id))+'"]')}
function place(s){
 var id=String(s.id||'');if(!id||exists(id))return true;
 var r=root();if(!r)return false;
 var p=String(s.placement||'start').toLowerCase();
 if(p==='between'){
  var pages=document.querySelector('.pages');
  if(!pages)return false;
  var imgs=Array.prototype.slice.call(pages.querySelectorAll('img.page'));
  var n=parseInt(s.afterImage!=null?s.afterImage:s.between,10);if(!Number.isFinite(n)||n<1)n=5;
  if(imgs.length<n)return false;
  pages.insertBefore(executeCode(s.code,id),imgs[n-1].nextSibling);return true;
 }
 if(p==='end'){r.parentNode.insertBefore(executeCode(s.code,id),r.nextSibling);return true}
 r.parentNode.insertBefore(executeCode(s.code,id),r);return true;
}
function install(){sections.forEach(function(s){place(s)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
var observer=new MutationObserver(function(){install()});
observer.observe(document.body,{childList:true,subtree:true});
var tries=0;var timer=setInterval(function(){install();if(++tries>=50)clearInterval(timer)},300);
})();
