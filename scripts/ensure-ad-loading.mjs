import fs from 'node:fs';

const file = 'chapter.html';
let html = fs.readFileSync(file, 'utf8');
const old = "function addAds(){const slots=[...document.querySelectorAll('.ad-slot')];if(!('IntersectionObserver' in window)){slots.forEach(loadOneAd);return}const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){loadOneAd(e.target);io.unobserve(e.target)}})},{rootMargin:'400px 0px'});slots.forEach(s=>io.observe(s))}";
const replacement = "function addAds(){const slots=[...document.querySelectorAll('.ad-slot')];if(!slots.length)return;if(!('IntersectionObserver' in window)){slots.forEach(loadOneAd);return}loadOneAd(slots[0]);const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){loadOneAd(e.target);io.unobserve(e.target)}})},{rootMargin:'700px 0px'});slots.slice(1).forEach(s=>io.observe(s))}";
if (html.includes(old)) {
  html = html.replace(old, replacement);
  fs.writeFileSync(file, html);
  console.log('Chapter ads: first ad loads immediately; remaining slots preload earlier.');
} else {
  console.log('Chapter ad loader already updated or pattern changed.');
}
