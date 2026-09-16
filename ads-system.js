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
function executeCode(code){var box=document.createElement('div');box.className='manga-atlas-ad-slot';box.style.cssText='width:100%;min-height:20px;margin:20px auto;display:flex;justify-content:center;align-items:center;clear:both;overflow:visible;';var tpl=document.createElement('template');tpl.innerHTML=String(code||'').trim();Array.prototype.slice.call(tpl.content.childNodes).forEach(function(n){if(n.nodeType===1&&n.tagName.toLowerCase()==='script'){var s=document.createElement('script');Array.prototype.slice.call(n.attributes).forEach(function(a){s.setAttribute(a.name,a.value)});s.text=n.textContent||'';box.appendChild(s)}else box.appendChild(n.cloneNode(true))});return box}
function root(){return document.querySelector('.pages')||document.querySelector('main')||document.querySelector('article')||document.body}
function start(s){var r=root();if(r&&r.parentNode)r.parentNode.insertBefore(executeCode(s.code),r)}
function end(s){var r=root();if(r&&r.parentNode)r.parentNode.insertBefore(executeCode(s.code),r.nextSibling)}
function between(s){var r=document.querySelector('.pages');if(!r)return end(s);var imgs=Array.prototype.slice.call(r.querySelectorAll('img.page'));if(!imgs.length)return end(s);var n=parseInt(s.afterImage,10);if(!Number.isFinite(n)||n<1)n=5;if(n>imgs.length)n=imgs.length;r.insertBefore(executeCode(s.code),imgs[n-1].nextSibling)}
function install(){if(document.body.dataset.mangaAtlasAdsInstalled==='1')return;document.body.dataset.mangaAtlasAdsInstalled='1';sections.forEach(function(s){if(s.placement==='between')between(s);else if(s.placement==='end')end(s);else start(s)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
setTimeout(install,700);setTimeout(install,1800);setTimeout(install,3500);
})();
