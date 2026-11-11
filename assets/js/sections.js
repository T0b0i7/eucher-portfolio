(function(){var bw=document.querySelector('.bgword'),hp=document.querySelector('.hero-photo');addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;bw.style.translate=(x*40)+'px '+(y*24)+'px';if(hp&&innerWidth>700)hp.style.translate=(x*-16)+'px '+(y*-10)+'px'})})();

var SEED_POSTS=[];
var BF='all',BP=[];
function fd(d){var x=new Date(d);return isNaN(x)?d:x.toLocaleDateString(window.LANG==='en'?'en-GB':'fr-FR',{day:'numeric',month:'long',year:'numeric'})}
function rmin(p){return Math.max(1,Math.round(String(p.body||'').split(/\s+/).length/200))}
function mdr(s){var o=[];String(s||'').replace(/\r/g,'').split(/\n{2,}/).forEach(function(b){b=b.trim();if(!b)return;
var inl=function(t){return E(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/`(.+?)`/g,'<code>$1</code>').replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')};
if(/^```/.test(b))o.push('<pre><code>'+E(b.replace(/^```.*\n?/,'').replace(/```$/,''))+'</code></pre>');
else if(/^#{1,3} /.test(b))o.push('<h2>'+inl(b.replace(/^#+ /,''))+'</h2>');
else if(/^(- .*(\n|$))+$/.test(b))o.push('<ul>'+b.split('\n').map(function(l){return '<li>'+inl(l.replace(/^- /,''))+'</li>'}).join('')+'</ul>');
else if(/^> /.test(b))o.push('<blockquote>'+inl(b.replace(/^> /gm,''))+'</blockquote>');
else o.push('<p>'+inl(b).replace(/\n/g,'<br>')+'</p>')});return o.join('')}
function drawB(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}var src=(d&&d.posts)||SEED_POSTS;
BP=src.filter(function(p){return p.st==='Publié'}).sort(function(a,b){return a.d<b.d?1:-1});
var cats=['all'].concat(BP.map(function(p){return p.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));if(cats.indexOf(BF)<0)BF='all';
document.getElementById('bfilters').innerHTML=cats.map(function(c){return '<button'+(c===BF?' class="on"':'')+' data-b="'+E(c)+'">'+(c==='all'?'Tous':E(c))+'</button>'}).join('');
var gb=document.getElementById('bgrid');gb.innerHTML='';
BP.forEach(function(p,i){if(BF!=='all'&&p.cat!==BF)return;var c=document.createElement('div');c.className='card bc';
c.innerHTML='<div class="shot" style="--h:'+(p.id*37%40)+'"><b>'+E(p.cat)+'</b></div><h3>'+E(p.t)+'</h3><p>'+E(p.ex)+'</p><div class="chips">'+String(p.tags||'').split(',').map(function(s){return s.trim()}).filter(Boolean).slice(0,3).map(function(s){return '<span>'+E(s)+'</span>'}).join('')+'</div><a href="#" class="more" data-b="'+i+'">Lire l’article</a><span class="n">'+fd(p.d)+' · '+rmin(p)+' min de lecture</span>';gb.appendChild(c)});
if(!gb.children.length)gb.innerHTML='<p class="lead">Les premiers articles arrivent bientôt…</p>';reveal(gb.querySelectorAll('.card'))}
function openB(i){var p=BP[i];if(!p)return;var tg=String(p.tags||'').split(',').map(function(s){return s.trim()}).filter(Boolean);
M.querySelector('.mbody').innerHTML='<div class="mhead"><span class="cat">'+E(p.cat)+'</span><h3>'+E(p.t)+'</h3><p>'+fd(p.d)+' · '+rmin(p)+' min de lecture</p></div><div class="mb art">'+mdr(window.LANG==='en'?trs(p.body):p.body)+'<div class="chips" style="margin:18px 0 0">'+tg.map(function(s){return '<span>'+E(s)+'</span>'}).join('')+'</div></div>';
M.classList.add('open');document.body.style.overflow='hidden';M.querySelector('.mbox').scrollTop=0;sfx.slam()}
document.getElementById('bfilters').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;BF=b.dataset.b;drawB()});
document.getElementById('bgrid').addEventListener('click',function(e){var c=e.target.closest('.card');if(!c)return;e.preventDefault();openB(+c.querySelector('.more').dataset.b)});

var SEED_SHOP=[
{id:1,n:'Pack d’animations rouge et noir',type:'Animation',d:'Transitions en bandes, titres qui claquent, curseur animé : des effets prêts à copier.',long:'Une collection d’effets en CSS et JavaScript pour donner un style graphique fort à un site : transition en bandes diagonales, titres qui claquent, étoiles au clic et curseur animé. Chaque effet est fourni avec un exemple commenté.',inc:'Transition en bandes diagonales, Titres qui claquent, Étoiles au clic, Curseur animé, Exemples commentés',price:5000,cur:'FCFA',link:'',lic:'Usage personnel et commercial sur vos propres projets. La revente ou le partage du code sont interdits.',st:'Brouillon'},
{id:2,n:'Kit tableau de bord admin',type:'Template',d:'Un tableau de bord sombre et responsive avec projets, blog et réglages.',long:'Un tableau de bord d’administration en un seul fichier HTML, avec gestion des projets, des articles, des compétences et des messages, un éditeur Markdown avec aperçu et un affichage adapté au mobile.',inc:'Menus Projets Blog Compétences Messages, Éditeur Markdown avec aperçu, Affichage mobile, Un seul fichier HTML',price:15000,cur:'FCFA',link:'',lic:'Usage sur un nombre illimité de vos propres projets. La revente du template est interdite.',st:'Brouillon'},
{id:3,n:'Curseur Zéo, code source',type:'Code source',d:'Le curseur rond et vivant qui cligne des yeux et s’endort.',long:'Le code d’un curseur personnalisé : un rond qui s’étire quand il bouge, cligne des yeux, suit la souris du regard, affiche des bulles au survol et s’endort quand on ne bouge plus.',inc:'Code complet, Réglages des couleurs, Exemple d’utilisation',price:3000,cur:'FCFA',link:'',lic:'Usage personnel et commercial sur vos propres projets. La revente du code est interdite.',st:'Brouillon'},
{id:4,n:'Template portfolio rouge et noir',type:'Projet',d:'Un portfolio complet : intro animée, projets, blog, boutique et espace admin.',long:'Le site que vous visitez, en version template : écran d’intro, sections Accueil, Projets, Compétences, À propos, Blog et Boutique, palette de commandes Ctrl+K, affichage mobile et espace d’administration intégré. Il est livré sans mes photos ni mon logo : vous y ajoutez vos propres textes, couleurs et images.',inc:'Site complet en un fichier HTML, Espace admin intégré, Blog avec éditeur Markdown, Boutique et dons, Affichage mobile, Guide d’installation',price:0,cur:'FCFA',link:'',lic:'Usage sur votre propre portfolio ou celui d’un client. La revente du template est interdite.',st:'Brouillon'},
{id:5,n:'Aether, l’assistant vocal IA',type:'Projet',d:'Un petit robot qui se déplace, comprend les commandes vocales et résume vos projets.',long:'Un assistant animé pour votre site : il flotte à l’écran, écoute le micro, lit ses réponses à voix haute, vous emmène dans les sections, ouvre et résume vos projets. Vous pouvez ajouter vos propres commandes et lui donner une voix personnalisée.',inc:'Code complet du bot, Personnage animé en SVG, Commandes vocales et écrites, Réglages de la voix, Guide pour ajouter tes commandes',price:0,cur:'FCFA',link:'',lic:'Usage sur vos propres projets. La revente du code est interdite.',st:'Brouillon'},
{id:6,n:'Module blog avec éditeur Markdown',type:'Code source',d:'Un blog complet : cartes, lecture d’article et gestionnaire avec aperçu en direct.',long:'Un module de blog à intégrer dans un site : liste d’articles avec filtres par catégorie, fenêtre de lecture, temps de lecture, et un gestionnaire avec brouillons, publication et éditeur Markdown avec aperçu en direct.',inc:'Section blog du site, Gestionnaire d’articles, Éditeur Markdown avec barre d’outils, Aperçu en direct',price:0,cur:'FCFA',link:'',lic:'Usage sur vos propres projets. La revente du code est interdite.',st:'Brouillon'},
{id:7,n:'Palette de commandes Ctrl+K',type:'Code source',d:'Une recherche rapide au clavier pour naviguer dans un site.',long:'Une palette de commandes à ouvrir avec Ctrl+K : recherche instantanée, navigation aux flèches, sections, projets, articles et actions rapides.',inc:'Code complet, Exemple d’intégration, Personnalisation des commandes',price:0,cur:'FCFA',link:'',lic:'Usage sur vos propres projets. La revente du code est interdite.',st:'Brouillon'},
{id:8,n:'Module boutique et dons',type:'Code source',d:'Une vitrine de produits avec liens de paiement et bloc de dons.',long:'Un module pour vendre des produits numériques sur un site statique : cartes produits avec aperçus animés, fiches détaillées, liens de paiement externes, dons par projet avec montants suggérés et gestionnaire d’administration.',inc:'Section boutique, Fiches produits, Bloc de dons, Gestionnaire de produits, Guide de paiement avec liens externes',price:0,cur:'FCFA',link:'',lic:'Usage sur vos propres projets. La revente du code est interdite.',st:'Brouillon'}];
var BS=[],SF='all';
function fmtP(p){return p.price>0?Number(p.price).toLocaleString(window.LANG==='en'?'en-US':'fr-FR')+' '+(p.cur||'FCFA'):'Prix sur demande'}
function okLink(u){return /^https?:\/\//i.test(String(u||'').trim())}
function aLink(u){return String(u).trim().replace(/"/g,'%22')}
function pv(t){var k={Animation:'a',Template:'t','Code source':'c',Design:'a',Projet:'t'}[t]||'a';return '<div class="pv pv-'+k+'">'+(k==='t'?'<u></u><u></u><u></u>':k==='c'?'<s></s><s></s><s></s><s></s>':'<i></i><i></i><i></i>')+'</div>'}
function donCfg(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}return(d&&d.set)||{}}
function donBlock(link,s,title,sub){var am=String(s.damounts||'1000, 2000, 5000').split(',').map(function(x){return x.trim()}).filter(Boolean);
return '<div class="don"><h4>'+title+'</h4><p>'+sub+'</p><div class="chips da">'+am.map(function(a){return '<button class="dc">'+E(Number(a)?Number(a).toLocaleString(window.LANG==='en'?'en-US':'fr-FR')+' FCFA':a)+'</button>'}).join('')+'</div>'+(okLink(link)?'<a class="btn" href="'+aLink(link)+'" target="_blank" rel="noopener">Faire un don →</a>':'')+(s.momo?'<p class="mm">'+E(s.momo)+'</p>':'')+'<p class="nt" hidden></p></div>'}
function drawS(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}var src=(d&&d.shop)||SEED_SHOP;
BS=src.filter(function(p){return p.st==='Publié'});
var ty=['all'].concat(BS.map(function(p){return p.type}).filter(function(c,i,a){return a.indexOf(c)===i}));if(ty.indexOf(SF)<0)SF='all';
document.getElementById('sfilters').innerHTML=ty.length>2?ty.map(function(c){return '<button'+(c===SF?' class="on"':'')+' data-s="'+E(c)+'">'+(c==='all'?'Tous':E(c))+'</button>'}).join(''):'';
var g2=document.getElementById('sgrid');g2.innerHTML='';
BS.forEach(function(p,i){if(SF!=='all'&&p.type!==SF)return;var c=document.createElement('div');c.className='card sh';
c.innerHTML=pv(p.type)+'<h3>'+E(p.n)+'</h3><p>'+E(p.d)+'</p><div class="chips"><span>'+E(p.type)+'</span></div><span class="price">'+E(fmtP(p))+'</span><a href="#" class="more" data-i="'+i+'">Voir le détail</a><button class="pay" data-i="'+i+'">'+payLabel(p)+'</button>';g2.appendChild(c)});
if(!BS.length)g2.innerHTML='<div class="don" style="grid-column:1/-1"><h4>La boutique ouvre bientôt</h4><p>Des animations, des templates et des codes sources arrivent. Une idée ou une commande sur mesure ? <a href="#contact" data-cs="1">Contactez-moi</a>.</p></div>';
var s=donCfg();document.getElementById('sdon').innerHTML=(s.dlink||s.momo)?donBlock(s.dlink,s,'Soutiens mes projets','Ce que je crée vous plaît ? Un petit don m’aide à continuer et à publier de nouveaux projets.'):'';
reveal(g2.querySelectorAll('.card'))}
function openS(i){var p=BS[i];if(!p)return;var inc=String(p.inc||'').split(',').map(function(x){return x.trim()}).filter(Boolean);
M.querySelector('.mbody').innerHTML='<div class="mhead"><span class="cat">'+E(p.type)+'</span><h3>'+E(p.n)+'</h3><p>'+E(p.d)+'</p><div class="mshot">'+pv(p.type)+'</div></div><div class="mb art"><p>'+E(p.long||p.d)+'</p>'+(inc.length?'<h2>Contenu</h2><ul>'+inc.map(function(x){return '<li>'+E(x)+'</li>'}).join('')+'</ul>':'')+(p.lic?'<h2>Licence</h2><p>'+E(p.lic)+'</p>':'')+'<div class="buy"><b class="price">'+E(fmtP(p))+'</b>'+'<button class="btn pay" data-i="'+i+'">'+payLabel(p)+' →</button>'+'</div><p class="nt">Vous serez redirigé vers une page de paiement sécurisée. Une question ? <a href="#contact" data-cs="1">Contactez-moi</a></p></div>';
M.classList.add('open');document.body.style.overflow='hidden';M.querySelector('.mbox').scrollTop=0;sfx.slam()}
document.getElementById('sfilters').addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;SF=b.dataset.s;drawS()});
document.getElementById('sgrid').addEventListener('click',function(e){var pb=e.target.closest('.pay');if(pb){e.preventDefault();openPay(+pb.dataset.i);return}var c=e.target.closest('.card');if(!c)return;e.preventDefault();openS(+c.querySelector('.more').dataset.i)});
document.addEventListener('click',function(e){var cs=e.target.closest('[data-cs]');if(cs){e.preventDefault();closeP();var a=document.querySelector('nav a[href="#contact"]');if(a)a.click();return}
var b=e.target.closest('.dc');if(!b)return;var w=b.closest('.don');w.querySelectorAll('.dc').forEach(function(x){x.classList.remove('on')});b.classList.add('on');var n=w.querySelector('.nt');n.hidden=false;n.textContent='Montant choisi : '+b.textContent+'. Vous pourrez le saisir sur la page de paiement.'});
function payLabel(p){return p.price>0?'Payer':'Demander un devis'}
function cEmail(){var a=document.querySelector('.links a');return a?String(a.getAttribute('href')||'').replace('mailto:',''):''}
function gv(id){return(document.getElementById(id)||{}).value||''}
function openPay(i){var p=BS[i];if(!p)return;var s=donCfg(),wa=String(s.wa||'').replace(/\D/g,''),link=okLink(p.link),q=p.price>0,en=window.LANG==='en';
var h='<div class="mhead"><span class="cat">Paiement</span><h3>'+E(p.n)+'</h3><p>'+E(fmtP(p))+'</p></div><div class="mb art">';
if(link)h+='<p>Tu vas être redirigé vers la page de paiement sécurisée, où vous pourrez payer par Mobile Money ou par carte selon la plateforme.</p><div class="buy"><a class="btn" href="'+aLink(p.link)+'" target="_blank" rel="noopener">Payer maintenant →</a></div><p class="nt">Une fois le paiement effectué, contactez-moi avec votre preuve de paiement pour recevoir votre produit.</p>';
else h+='<p>Le paiement en ligne n’est pas encore ouvert pour ce produit. Envoyez votre commande : je vous réponds avec les modalités de paiement (Mobile Money ou carte).</p><div class="ord"><label>Nom complet<input id="oN" autocomplete="name"></label><label>E-mail<input id="oE" type="email" autocomplete="email"></label><label>Téléphone ou WhatsApp<input id="oT" autocomplete="tel"></label><label>Message (optionnel)<textarea id="oM" rows="2"></textarea></label></div><div class="buy"><a class="btn" id="oMail" href="#">Envoyer ma commande par e-mail →</a>'+(wa?'<a class="btn alt" id="oWa" href="#" target="_blank" rel="noopener">Commander sur WhatsApp →</a>':'')+'</div><p class="nt err" id="oErr" hidden>Indiquez votre nom et un e-mail ou un téléphone.</p>';
M.querySelector('.mbody').innerHTML=h+'</div>';
if(!link){var upd=function(){var b=en?'Hello Eucher,\n\nI would like to order: '+p.n+' ('+fmtP(p)+').\n\nName: '+gv('oN')+'\nEmail: '+gv('oE')+'\nPhone: '+gv('oT')+'\n\nMessage: '+gv('oM'):'Bonjour Eucher,\n\nJe souhaite commander : '+p.n+' ('+fmtP(p)+').\n\nNom : '+gv('oN')+'\nE-mail : '+gv('oE')+'\nTéléphone : '+gv('oT')+'\n\nMessage : '+gv('oM');b=encodeURIComponent(b);
document.getElementById('oMail').href='mailto:'+cEmail()+'?subject='+encodeURIComponent((en?(q?'Order: ':'Quote request: '):(q?'Commande : ':'Demande de devis : '))+p.n)+'&body='+b;var w=document.getElementById('oWa');if(w)w.href='https://wa.me/'+wa+'?text='+b},
chk=function(e){if(!gv('oN').trim()||!(gv('oE').trim()||gv('oT').trim())){e.preventDefault();document.getElementById('oErr').hidden=false}};
['oN','oE','oT','oM'].forEach(function(id){document.getElementById(id).addEventListener('input',upd)});upd();
document.getElementById('oMail').addEventListener('click',chk);var w2=document.getElementById('oWa');if(w2)w2.addEventListener('click',chk)}
M.classList.add('open');document.body.style.overflow='hidden';M.querySelector('.mbox').scrollTop=0;sfx.slam()}
document.addEventListener('click',function(e){var b=e.target.closest('.pay');if(b&&b.closest('.mbody')){e.preventDefault();openPay(+b.dataset.i)}});
var _o3=openP;openP=function(i){_o3(i);var p=P[i],s=donCfg(),l=(p&&p.dl)||s.dlink;if(p&&p.don&&(l||s.momo)){var mb=M.querySelector('.mb');if(mb)mb.insertAdjacentHTML('beforeend',donBlock(l,s,'Soutenir ce projet','Ce projet vous plaît ? Un petit don m’aide à le faire évoluer.'))}};

var SEED_SERVICES=[{id:1,t:'Sites et applications web',d:'Sites vitrines, plateformes et applications métier avec Laravel et React.'},{id:2,t:'Applications mobiles',d:'Des applications pensées mobile-first, rapides et utilisables hors connexion.'},{id:3,t:'API et back-office',d:'Des API robustes et des tableaux de bord pour piloter votre activité.'},{id:4,t:'Conseil et accompagnement',d:'Cadrage de projet, choix techniques et revue de code pour avancer en confiance.'}];
var SEED_STEPS=[{id:1,t:'Échange',d:'Je comprends votre besoin et vos objectifs.'},{id:2,t:'Conception',d:'Maquettes, choix techniques et cahier des charges.'},{id:3,t:'Développement',d:'Des livraisons régulières, que vous validez à chaque étape.'},{id:4,t:'Mise en ligne',d:'Déploiement, formation et suivi après livraison.'}];
function drawSv(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}var sv=(d&&d.services)||SEED_SERVICES,st=(d&&d.steps)||SEED_STEPS;
var g=document.getElementById('svGrid'),s=document.getElementById('svSteps');if(!g||!s)return;
g.innerHTML=sv.map(function(x,i){return '<div class="sv"><span class="sn">'+String(i+1).padStart(2,'0')+'</span><h3>'+E(x.t)+'</h3><p>'+E(x.d)+'</p></div>'}).join('');
s.innerHTML=st.map(function(x,i){return '<li><b>'+(i+1)+'</b><div><h4>'+E(x.t)+'</h4><p>'+E(x.d)+'</p></div></li>'}).join('');
var sel=document.getElementById('bT');if(sel){var cur=sel.value,opts=sv.map(function(x){return x.t}).concat(['Autre']);sel.innerHTML=opts.map(function(o){return '<option>'+E(o)+'</option>'}).join('');if(opts.indexOf(cur)>-1)sel.value=cur;sel.dispatchEvent(new Event('input'))}
reveal(document.querySelectorAll('#svGrid .sv,#svSteps li'))}

var TICK0='Code propre, Impact réel, Full Stack Developer, Laravel, React, Mobile first, Made in Benin, Let’s build together';
function tickFill(el,unit){el.innerHTML='<span>'+E(unit)+'</span>';var w=el.firstChild.offsetWidth||700,k=Math.max(1,Math.ceil((window.innerWidth*1.15)/w)),half=unit.repeat(k);
el.innerHTML='<span>'+E(half)+'</span><span>'+E(half)+'</span>';var hw=el.firstChild.offsetWidth||window.innerWidth;el.style.animationDuration=Math.max(12,hw/85)+'s'}
function drawTicker(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}
var raw=(d&&d.set&&String(d.set.ticker||'').trim())||TICK0,t=raw.split(',').map(function(x){return x.trim()}).filter(Boolean);if(!t.length)t=TICK0.split(',').map(function(x){return x.trim()});
var a=document.querySelector('#mq1 .mqt'),b=document.querySelector('#mq2 .mqt');if(!a||!b)return;
tickFill(a,t.join(' ★ ')+' ★ ');tickFill(b,t.slice().reverse().join(' ★ ')+' ★ ');tickRun()}
var _tkR=0;
function tickRun(){cancelAnimationFrame(_tkR);var A=document.querySelector('#mq1 .mqt'),B=document.querySelector('#mq2 .mqt');if(!A||!B)return;
var slow=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches),sp=slow?32:85,pa=0,pb=-1,last=performance.now();
(function loop(t){var dt=Math.min(64,t-last)/1000;last=t;var ha=(A.firstChild&&A.firstChild.offsetWidth)||window.innerWidth,hb=(B.firstChild&&B.firstChild.offsetWidth)||window.innerWidth;if(pb===-1)pb=-hb;
if(!window.CALM){if(!A.parentNode.matches(':hover')){pa-=sp*dt;if(pa<=-ha)pa+=ha}if(!B.parentNode.matches(':hover')){pb+=sp*0.8*dt;if(pb>=0)pb-=hb}}
A.style.transform='translate3d('+pa+'px,0,0)';B.style.transform='translate3d('+pb+'px,0,0)';_tkR=requestAnimationFrame(loop)})(performance.now())}
var _tk=0;addEventListener('resize',function(){clearTimeout(_tk);_tk=setTimeout(drawTicker,250)});

function cu(b){if(b.dataset.done)return;b.dataset.done='1';var v=b.getAttribute('data-v')||b.textContent,m=/^(\d+)(.*)$/.exec(v);b.setAttribute('data-v',v);if(!m||window.CALM){b.textContent=v;return}var n=+m[1],t0=performance.now();(function f(t){var k=Math.min(1,(t-t0)/1100);b.textContent=Math.round(n*k)+m[2];if(k<1)requestAnimationFrame(f)})(t0)}
function cuAll(root){[].forEach.call((root||document).querySelectorAll('.kf b,.stat b,[data-count]'),cu)}
function cuWatch(root){var els=(root||document).querySelectorAll('.kf b,.stat b,[data-count]');if(!window.IntersectionObserver){[].forEach.call(els,cu);return}var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;o.unobserve(e.target);cu(e.target)})},{threshold:.4});[].forEach.call(els,function(el){o.observe(el)})}
function kfs(s){return String(s||'').split(',').map(function(x){return x.trim()}).filter(Boolean).map(function(x){var a=x.split('|');return '<span class="kf"><b>'+E(a[0])+'</b>'+(a[1]?'<small>'+E(a[1].trim())+'</small>':'')+'</span>'}).join('')}
function lgo(x){if(x.logo==='ea'){var n=document.querySelector('nav img.logo');if(n)return '<div class="lgo"><img src="'+n.src+'" alt=""></div>'}
if(x.logo&&/^data:image\//.test(x.logo))return '<div class="lgo"><img src="'+x.logo+'" alt=""></div>';
var nm=String(x.o||x.t||'?').replace(/[^A-Za-zÀ-ÿ0-9 ]/g,'').trim().split(/\s+/),ini=((nm[0]||'?').charAt(0)+(nm[1]?nm[1].charAt(0):(nm[0]||'').charAt(1))).toUpperCase(),h=0;String(x.o||x.t).split('').forEach(function(c){h=(h*31+c.charCodeAt(0))%360});
return '<div class="lgo mono" style="--h:'+h+'">'+E(ini)+'</div>'}
function seq(ol){var items=[].slice.call(ol.children);items.forEach(function(li){li.classList.add('seq')});
function run(){ol.classList.add('go');items.forEach(function(li,i){setTimeout(function(){li.classList.add('show');[].forEach.call(li.querySelectorAll('.kf b'),cu)},window.CALM?0:i*750)})}
if(window.CALM||!window.IntersectionObserver){items.forEach(function(li){li.classList.add('show')});ol.classList.add('go');return}
var o=new IntersectionObserver(function(es){if(es[0].isIntersecting){o.disconnect();run()}},{threshold:.12});o.observe(ol)}
function drawJ(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}
var ex=(d&&d.exp)||SEED_EXP,ed=(d&&d.edu)||SEED_EDU,pr=(d&&d.profile)||SEED_PROFILE;
function it(x){var b=String(x.d||'').split('\n').filter(function(l){return l.trim()}),sp=[x.o,x.l].filter(Boolean).map(function(v){return '<span>'+E(v)+'</span>'}).join(''),now=/pr[ée]sent/i.test(x.p||''),tg=String(x.s||'').split(',').map(function(t){return t.trim()}).filter(Boolean).map(function(t){return '<span>'+E(t)+'</span>'}).join('');
return '<li>'+lgo(x)+'<div class="tbd"><div class="tp">'+E(x.p||'')+(now?'<span class="cur">En cours</span>':'')+'</div><h4>'+E(x.t)+'</h4>'+(sp?'<div class="to">'+sp+'</div>':'')+(b.length?'<ul>'+b.map(function(l){return '<li>'+E(l.trim())+'</li>'}).join('')+'</ul>':'')+(x.k?'<div class="kfs">'+kfs(x.k)+'</div>':'')+(tg?'<div class="tg3">'+tg+'</div>':'')+'</div></li>'}
function ch(s){return String(s||'').split(',').map(function(x){return x.trim()}).filter(Boolean).map(function(x){return '<span>'+E(x)+'</span>'}).join('')}
var a=document.getElementById('tlExp'),b=document.getElementById('tlEdu');if(!a||!b)return;
a.className='tl';b.className='tl';a.innerHTML=ex.map(it).join('');b.innerHTML=ed.map(it).join('');
document.getElementById('jLang').innerHTML=ch(pr.langues);document.getElementById('jInt').innerHTML=ch(pr.interets);
seq(a);seq(b);reveal(document.querySelectorAll('#jLang span,#jInt span'))}
var AUD='cli';
function drawAbout(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}var p=(d&&d.profile)||SEED_PROFILE,r=AUD==='rec',S=SEED_PROFILE;
var h=document.getElementById('aboutHook');if(!h)return;h.textContent=p[r?'hook_r':'hook_c']||S[r?'hook_r':'hook_c'];
document.getElementById('aboutTxt').innerHTML=String(p[r?'about_r':'about_c']||S[r?'about_r':'about_c']).split(/\n{2,}/).map(function(x){return '<p>'+E(x.trim())+'</p>'}).join('');
var pf=document.getElementById('aboutProof');if(pf&&!pf.children.length)pf.innerHTML=kfs(p.proof||S.proof);
[].forEach.call(document.querySelectorAll('.aud button'),function(b){b.classList.toggle('on',b.dataset.aud===AUD)})}
(function(){var au=document.querySelector('.aud');if(au)au.addEventListener('click',function(e){var b=e.target.closest('button');if(!b||b.dataset.aud===AUD)return;AUD=b.dataset.aud;var t=document.getElementById('aboutTxt'),h=document.getElementById('aboutHook');[t,h].forEach(function(el){el.classList.remove('fd');void el.offsetWidth;el.classList.add('fd')});drawAbout()});
})();

var RICH={};P.forEach(function(p){RICH[p.n]=p});
function E(s){var d=document.createElement('div');d.textContent=s==null?'':s;return d.innerHTML}
function applyData(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){return}if(!d||!d.projects)return;
var pr=Object.assign({},SEED_PROFILE,d.profile||{}),se=Object.assign({online:true,sound:true,sh_bot:true},d.set||{}),cm={Web:'web',Mobile:'mobile',IA:'ia',Design:'design'};
P=d.projects.filter(function(x){return x.st==='Publié'}).map(function(x){var r=RICH[x.n]||{},c=cm[x.cat]||'web',t=String(x.t||'').split(',').map(function(s){return s.trim()}).filter(Boolean);return{n:x.n,c:r.c&&r.c.split(' ').indexOf(c)>-1?r.c:c,cat:r.cat||x.cat,d:x.d,role:r.role||'Porteur du projet',st:r.st||'Projet publié',sec:r.sec||x.cat,long:r.long||x.d,f:r.f||['Détails à venir'],t:t.length?t:(r.t||[]),m:r.m==null?-1:r.m,cover:x.cover||'',don:x.don==='Oui',dl:x.dl||''}});
if(d.skills&&d.skills.length){S3=d.skills;S2=S3.map(function(s){return s.n});LV=S3.map(function(s){return s.lv||80});drawSk();reveal(document.querySelectorAll('#sk .sk'))}
var nm=String(pr.nom||'').replace(/[<>&"]/g,'').trim().split(/\s+/),f1=nm[0]||'',f2=nm.slice(1).join(' ');
document.querySelectorAll('.name h1').forEach(function(h){h.innerHTML=ransom(f1)+'<br><span>'+ransom(f2)+'</span>'});
var h3=document.querySelector('.cc-in h3');if(h3)h3.innerHTML=E(f1.toUpperCase())+'<br><span>'+E(f2.toUpperCase())+'</span>';
var t1=document.querySelector('.t1');if(t1&&pr.slogan)t1.innerHTML=E(pr.slogan).replace(/(…|\.)\s+/,'$1<br>');
var L=document.querySelectorAll('.links a');
function lk(a,h,x){if(a&&x){a.href=h;a.querySelector('small').textContent=x}}
lk(L[0],'mailto:'+pr.email,pr.email);lk(L[1],'https://'+String(pr.linkedin||'').replace(/^https?:\/\//,''),pr.linkedin);lk(L[2],'https://'+String(pr.github||'').replace(/^https?:\/\//,''),pr.github);
var cb=document.querySelector('#contact .btn');if(cb&&pr.email)cb.href='mailto:'+pr.email;
['blog','shop','svc','bot','orbit','pal'].forEach(function(k){document.body.classList.toggle('sh-'+k,!!se['sh_'+k])});document.body.classList.toggle('no-journey',!!se.no_journey);
if(se.accent){document.documentElement.style.setProperty('--red',se.accent);document.documentElement.style.setProperty('--ac',se.accent)}
if(se.titre){document.title=se.titre;var og=document.querySelector('meta[property="og:title"]');if(og)og.content=se.titre}
if(se.desc){['meta[name=description]','meta[property="og:description"]'].forEach(function(q){var m=document.querySelector(q);if(m)m.content=se.desc})}
var ld=document.querySelector('script[type="application/ld+json"]');if(ld&&pr.nom){try{var lo=JSON.parse(ld.textContent);lo.name=pr.nom;if(pr.titre)lo.jobTitle=pr.titre;ld.textContent=JSON.stringify(lo)}catch(e){}}
var bd=document.querySelector('.badges'),av=document.getElementById('avail');if(se.avail){if(!av&&bd){av=document.createElement('span');av.id='avail';av.className='avail';av.textContent='● Disponible pour de nouvelles missions';bd.appendChild(av)}}else if(av)av.remove();
var ns=se.sound===false?'none':'';document.getElementById('snd').style.display=ns;document.querySelectorAll('#intro [data-snd="1"]').forEach(function(b){b.style.display=ns});
var mt=document.getElementById('maint');if(!mt){mt=document.createElement('div');mt.id='maint';document.body.appendChild(mt)}
mt.innerHTML='<div>'+(se.online===false?'Portfolio hors ligne':'Bientôt de retour')+'<small>Le site est momentanément indisponible.</small></div>';
mt.className=(se.maint||se.online===false)?'on':'';
if(window.regTr)regTr();draw('all');drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();cuWatch()}
document.body.classList.add('sh-bot');
applyData();drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();
