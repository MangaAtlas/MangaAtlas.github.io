/* MangaAtlas — isolated chapter view counter system. Does not touch Admin or chapter data. */
(function(){
  'use strict';
  var slug='';
  try { slug=decodeURIComponent(new URLSearchParams(location.search).get('slug')||''); } catch(e) {}
  if(!slug || !window.Counter) return;

  var safe=slug.toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,180);
  if(!safe) return;
  var counterName='chapter-'+safe;
  var host=document.getElementById('manga-atlas-view-count');
  if(!host) return;

  var counter=new Counter({workspace:'mangaatlas-chapters', timeout:5000});
  counter.up(counterName).then(function(result){
    var value=Number(result && result.value);
    host.textContent=Number.isFinite(value)?value.toLocaleString():'0';
    host.removeAttribute('aria-busy');
  }).catch(function(){
    host.textContent='0';
    host.removeAttribute('aria-busy');
  });
})();
