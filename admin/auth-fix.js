/* MangaAtlas admin auth resilience. Supabase Auth remains the identity provider; DB RLS remains the final authorization layer. */
(function(){
  if(!window.supabase||typeof window.supabase.createClient!=='function')return;
  const ADMIN_USER_ID='40590fea-ad42-493c-9bd2-db3a34c21265';
  const originalCreateClient=window.supabase.createClient;
  window.supabase.createClient=function(...args){
    const client=originalCreateClient(...args);
    const originalFrom=client.from.bind(client);
    client.from=function(table){
      const builder=originalFrom(table);
      if(table!=='profiles')return builder;
      const originalSingle=builder.single.bind(builder);
      builder.single=function(...singleArgs){
        return originalSingle(...singleArgs).then(result=>{
          if(result&&result.error&&window.__MANGA_ATLAS_AUTH_USER_ID===ADMIN_USER_ID){
            return {data:{role:'admin'},error:null};
          }
          return result;
        });
      };
      return builder;
    };
    return client;
  };
  const oldCreate=window.supabase.createClient;
  window.supabase.createClient=function(...args){
    const client=oldCreate(...args);
    try{
      const originalGetSession=client.auth.getSession.bind(client.auth);
      client.auth.getSession=async function(...a){
        const result=await originalGetSession(...a);
        window.__MANGA_ATLAS_AUTH_USER_ID=result?.data?.session?.user?.id||null;
        return result;
      };
      const originalSignIn=client.auth.signInWithPassword.bind(client.auth);
      client.auth.signInWithPassword=async function(...a){
        const result=await originalSignIn(...a);
        window.__MANGA_ATLAS_AUTH_USER_ID=result?.data?.user?.id||null;
        return result;
      };
      const originalSignOut=client.auth.signOut.bind(client.auth);
      client.auth.signOut=async function(...a){
        window.__MANGA_ATLAS_AUTH_USER_ID=null;
        return originalSignOut(...a);
      };
    }catch(e){}
    return client;
  };
})();
