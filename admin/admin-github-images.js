/* GitHub Pages image mode: keeps chapter images independent from Supabase Storage. */
(function(){
  const oldEditChapter=window.editChapter;
  window.editChapter=async function(id){
    await oldEditChapter(id);
    try{
      const {data}=await client.from('chapters').select('pages').eq('id',id).single();
      if(data){
        const urls=(data.pages||[]).map(p=>{try{return typeof p==='string'?JSON.parse(p).url:p?.url||p}catch{return p}}).filter(Boolean);
        const box=$('chapterImageUrls');
        if(box)box.value=urls.join('\n');
      }
    }catch(e){}
  };

  const oldReset=window.resetChapter;
  if(typeof oldReset==='function'){
    window.resetChapter=function(){oldReset();const box=$('chapterImageUrls');if(box)box.value='';};
  }

  $('saveChapter').onclick=async()=>{
    const mangaId=$('chapterManga').value,num=$('chapterNumber').value.trim(),title=$('chapterTitle').value.trim(),slug=$('chapterSlug').value.trim();
    if(!mangaId||!num||!title||!slug){toast('Manga, chapter number, chapter name and manual URL are required.');return}
    const urlText=$('chapterImageUrls').value.trim();
    const githubUrls=urlText.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    const files=[...$('chapterPages').files];
    if(githubUrls.length){
      const invalid=githubUrls.find(u=>!/^https?:\/\//i.test(u));
      if(invalid){toast('Every GitHub image must be a complete http(s) URL.');return}
      existingChapterPages=githubUrls.map((url,i)=>JSON.stringify({url,alt:title,order:i+1}));
    }else if(files.length){
      const bad=files.find(f=>!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>25*1024*1024);
      if(bad){toast(`Image not accepted: ${bad.name}. Use JPG, PNG or WebP under 25MB.`);return}
      toast('Supabase Storage upload mode is being used.');
      existingChapterPages=[];
      for(let i=0;i<files.length;i++){
        const f=files[i],ext=f.name.split('.').pop().toLowerCase(),path=`${mangaId}/chapter-${num}/${String(i+1).padStart(4,'0')}-${crypto.randomUUID()}.${ext}`;
        toast(`Uploading page ${i+1} of ${files.length}…`);
        const up=await client.storage.from('chapter-pages').upload(path,f,{upsert:false,contentType:f.type,cacheControl:'31536000'});
        if(up.error){toast(`Page ${i+1} upload failed: ${up.error.message}`);return}
        existingChapterPages.push(JSON.stringify({url:client.storage.from('chapter-pages').getPublicUrl(path).data.publicUrl,alt:title,order:i+1}));
      }
    }else{
      toast('Paste GitHub Pages image URLs (one per line) or select images.');return;
    }
    const {data:manga,error:me}=await client.from('manga').select('cover_url').eq('id',mangaId).single();
    if(me){toast(`Could not load manga cover: ${me.message}`);return}
    const payload={manga_id:mangaId,chapter_number:Number(num),title,url_slug:slug,pages:existingChapterPages,feature_image_url:manga?.cover_url||null};
    const result=editingChapterId?await client.from('chapters').update(payload).eq('id',editingChapterId).select('id').single():await client.from('chapters').insert(payload).select('id').single();
    if(result.error){toast(`Chapter could not be saved: ${result.error.message}`);return}
    toast(editingChapterId?'Chapter updated successfully.':'Chapter added successfully.');
    if(typeof window.resetChapter==='function')window.resetChapter();else{$('chapterImageUrls').value='';$('chapterPages').value='';}
    loadChapters();
  };

  const coverUrl=$('mCoverUrl');
  if(coverUrl)$('mCover').addEventListener('change',()=>{if(!coverUrl.value&&$('mCover').files?.[0]){const reader=new FileReader();reader.onload=()=>{};reader.readAsDataURL($('mCover').files[0]);}});
})();
