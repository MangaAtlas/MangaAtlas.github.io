/* MangaAtlas admin access-key bridge. */
(function(){
  if(!window.supabase||typeof window.supabase.createClient!=='function')return;
  const ADMIN_USER_ID='40590fea-ad42-493c-9bd2-db3a34c21265';
  const KEY_NAME='mangaatlas_admin_key';
  const getKey=()=>sessionStorage.getItem(KEY_NAME)||'';
  const originalCreate=window.supabase.createClient;
  window.supabase.createClient=function(url,anon,options){
    options=options||{};
    options.global=options.global||{};
    options.global.headers={...(options.global.headers||{}),...(getKey()?{'x-admin-key':getKey()}: {})};
    const client=originalCreate(url,anon,options);
    client.auth.getSession=async()=>getKey()?{data:{session:{user:{id:ADMIN_USER_ID}}},error:null}:{data:{session:null},error:null};
    client.auth.signOut=async()=>{sessionStorage.removeItem(KEY_NAME);location.reload();return {error:null}};
    client.auth.signInWithPassword=async()=>({data:{user:null,session:null},error:new Error('Use the Admin Access Key.')});
    return client;
  };
  const boot=()=>{
    const box=document.querySelector('#login .loginbox');
    if(!box)return;
    box.innerHTML='<h1>Manga<span class="accent">Atlas</span></h1><p class="muted">Admin access</p><label>Admin Access Key</label><input id="adminAccessKey" type="password" autocomplete="off" placeholder="Enter admin key"><button class="btn" id="adminAccessBtn" style="width:100%;margin-top:12px">Unlock Admin</button><div id="loginStatus" class="status"></div>';
    const input=document.getElementById('adminAccessKey'),btn=document.getElementById('adminAccessBtn'),status=document.getElementById('loginStatus');
    const unlock=()=>{const v=input.value.trim();if(!v){status.textContent='Enter the admin access key.';return}sessionStorage.setItem(KEY_NAME,v);location.reload()};
    btn.onclick=unlock;input.onkeydown=e=>{if(e.key==='Enter')unlock()};
    if(getKey()){box.querySelector('p').textContent='Checking admin key…'}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
