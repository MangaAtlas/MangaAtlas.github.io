/* MangaAtlas Ads System — 9 admin-controlled sections. */
(async function(){
'use strict';
if(window.__mangaAtlasAdsSystemLoaded)return;
window.__mangaAtlasAdsSystemLoaded=true;
if(location.pathname.indexOf('/admin')===0)return;
var cfg;
try{var r=await fetch('/data/ads-config.json?v='+Date.now(),{cache:'no-store'});if(!r.ok)return;cfg=await r.json()}catch(e){return}
var sections=Array.isArray(cfg?.sections)?cfg.sections.filter(function(s){return s&&s.enabled&&String(s.code||'').trim()}):[];
if(!sections.length)return;
function executeCode(code){
  var box=document.createElement('div');
  box.className='manga-atlas-ad-slot';
  box.style.cssText='width:100%;min-height:20px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;';
  var tpl=document.createElement('template');
  tpl.innerHTML=String(code||'').trim();
  var nodes=Array.prototype.slice.call(tpl.content.childNodes);
  nodes.forEach(function(n){
    if(n.nodeType===1&&n.tagName.toLowerCase()==='script'){
      var s=document.createElement('script');
      Array.prototype.slice.call(n.attributes).forEach(function(a){s.setAttribute(a.name,a.value)});
      s.text=n.textContent||'';
      box.appendChild(s);
    }else box.appendChild(n.cloneNode(true));
  });
  return box;
}
function contentRoot(){return document.querySelector('.pages')||document.querySelector('main')||document.querySelector('article')||document.body}
function insertStart(s){var root=contentRoot();if(!root||!root.parentNode)return;root.parentNode.insertBefore(executeCode(s.code),root)}
function insertEnd(s){var root=contentRoot();if(!root||!root.parentNode)return;root.parentNode.insertBefore(executeCode(s.code),root.nextSibling)}
function insertBetween(s){
  var root=document.querySelector('.pages');
  if(!root)return insertEnd(s);
  var imgs=Array.prototype.slice.call(root.querySelectorAll('img.page'));
  if(imgs.length<2)return insertEnd(s);
  var pct=Number(s.between||50);if(!isFinite(pct))pct=50;pct=Math.max(1,Math.min(99,pct));
  var index=Math.max(0,Math.min(imgs.length-1,Math.ceil(imgs.length*pct/100)-1));
  root.insertBefore(executeCode(s.code),imgs[index].nextSibling);
}
function install(){
  if(document.body.dataset.mangaAtlasAdsInstalled==='1')return;
  document.body.dataset.mangaAtlasAdsInstalled='1';
  sections.forEach(function(s){
    if(s.placement==='between')insertBetween(s);
    else if(s.placement==='end')insertEnd(s);
    else insertStart(s);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,700);
setTimeout(install,1800);
setTimeout(install,3500);
})();
