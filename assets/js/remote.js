var SBU=window.EA_SUPABASE||{},OWNER=String(SBU.owner||'T0b0i7');
var API=String(SBU.url||'').replace(/\/$/,'')+'/rest/v1';
function eaHead(x){var h={'apikey':SBU.key||''};if(x)for(var k in x)h[k]=x[k];return h}
window.eaLoad=function(){if(!SBU.key)return Promise.resolve(false);return fetch(API+'/portfolio?id=eq.1&select=data',{headers:eaHead()}).then(function(r){return r.ok?r.json():null}).then(function(j){var d=j&&j[0]&&j[0].data;if(!d||!d.projects)return false;try{localStorage.setItem('ea_admin_v1',JSON.stringify(d))}catch(e){}return true}).catch(function(){return false})};
window.eaSend=function(p){return fetch(API+'/messages',{method:'POST',headers:eaHead({'Content-Type':'application/json','Prefer':'return=minimal'}),body:JSON.stringify(p)}).then(function(r){if(!r.ok)throw new Error('http '+r.status);return true})};
var _adm=0;
function loadAdmin(cb){if(window.__requestAdmin){cb();return}if(_adm)return;_adm=1;
 function next(){var s=document.createElement('script');s.src='assets/js/admin.js';s.onload=function(){_adm=2;cb()};s.onerror=function(){_adm=0};document.body.appendChild(s)}
 if(window.supabase){next();return}
 var c=document.createElement('script');c.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';c.onload=next;c.onerror=function(){_adm=0};document.head.appendChild(c)}
window.requestAdmin=function(){loadAdmin(function(){if(window.__requestAdmin)window.__requestAdmin()})};
addEventListener('keydown',function(e){if((e.key||'').toLowerCase()==='a'&&e.shiftKey&&(e.ctrlKey||e.metaKey||e.altKey)){e.preventDefault();window.requestAdmin()}});
(function(){var lk=document.getElementById('lockln');if(lk)lk.addEventListener('click',function(e){e.preventDefault();window.requestAdmin()})})();
(function(){function rerender(){try{applyData();drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();if(window.regTr)regTr()}catch(e){}}window.eaLoad().then(function(ok){if(ok)rerender()}).catch(function(){})})();
if(/access_token=|error_description=|code=/.test(location.hash+location.search))setTimeout(function(){window.requestAdmin()},0);
