var SB=null,SBU=window.EA_SUPABASE||{},OWNER=String(SBU.owner||'T0b0i7');
try{if(window.supabase&&SBU.url&&SBU.key)SB=supabase.createClient(SBU.url,SBU.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})}catch(e){SB=null}
window.SB=SB;
window.eaLoad=function(){if(!SB)return Promise.resolve(false);return SB.from('portfolio').select('data').eq('id',1).maybeSingle().then(function(r){if(r.error||!r.data||!r.data.data)return false;var d=r.data.data;if(!d.projects)return false;try{localStorage.setItem('ea_admin_v1',JSON.stringify(d))}catch(e){}return true}).catch(function(){return false})};
var _adm=0;
function loadAdmin(cb){if(window.__requestAdmin){cb();return}if(_adm)return;_adm=1;var s=document.createElement('script');s.src='assets/js/admin.js';s.onload=function(){_adm=2;cb()};s.onerror=function(){_adm=0};document.body.appendChild(s)}
window.requestAdmin=function(){loadAdmin(function(){if(window.__requestAdmin)window.__requestAdmin()})};
addEventListener('keydown',function(e){if((e.key||'').toLowerCase()==='a'&&e.shiftKey&&(e.ctrlKey||e.metaKey||e.altKey)){e.preventDefault();window.requestAdmin()}});
(function(){var lk=document.getElementById('lockln');if(lk)lk.addEventListener('click',function(e){e.preventDefault();window.requestAdmin()})})();
