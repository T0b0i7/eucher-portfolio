/* Données issues du CV */
var SEED_PROFILE={nom:'Eucher ABATTI',titre:'AI-Augmented & Agentic Software Engineer',bio:'Ingénieur logiciel spécialisé dans l’IA augmentée, les systèmes agents, l’architecture logicielle et la transformation numérique. Je conçois des solutions fiables, intelligentes et orientées impact métier.',slogan:'Code propre. Impact réel.',email:'abattieucher@gmail.com',tel:'+229 01 57 00 24 27',ville:'Porto-Novo, Bénin',langues:'Français : courant, Minan : langue maternelle, Anglais : niveau B2',interets:'Innovation numérique, Intelligence artificielle, Cybersécurité et IAM, Web3 et fintech, Communauté tech (GDG Cotonou), veille technologique, lecture, jeux de stratégie, cuisine',hook_r:'Je construis des plateformes où chacun voit exactement ce qu’il doit voir, et rien d’autre.',about_r:'Je suis Eucher ABATTI, ingénieur logiciel et architecte de solutions numériques basé au Bénin. Je m’intéresse particulièrement à la rencontre entre la technologie et les besoins humains.\n\nPour moi, l’ingénierie logicielle ne consiste pas à faire fonctionner les choses parce qu’elles le peuvent. Il s’agit de comprendre pourquoi une solution doit exister, de questionner la manière dont elle doit fonctionner et de construire un produit qui garde du sens au-delà de sa première version.\n\nJe travaille sur toutes les couches d’un produit numérique : interfaces, logique applicative, systèmes backend, bases de données et architecture. J’accorde une attention particulière à ce qui passe souvent inaperçu : la communication entre les systèmes, la circulation des données, l’impact des décisions sur la performance et la valeur réelle produite.\n\nJe suis attiré par les problèmes complexes, l’ingénierie réfléchie et les idées qui méritent de devenir plus que des concepts. Je ne mesure pas le progrès uniquement à ce que j’ai construit, mais à ma compréhension de ce que je construis.\n\nLa technologie ne doit pas exister pour impressionner. Elle doit exister pour faire la différence.\n\nEucher ABATTI, ingénieur logiciel et architecte de solutions numériques. Bénin. Je construis avec intention.',hook_c:'Je transforme des idées complexes en produits numériques utiles.',about_c:'Je suis Eucher ABATTI, ingénieur logiciel et architecte de solutions numériques basé au Bénin.\n\nJe transforme des idées complexes en solutions numériques utiles. Mes domaines de prédilection : l’architecture logicielle, l’ingénierie et la création de technologies qui résolvent de vrais problèmes.\n\nToujours en questionnement, toujours en train de construire, jamais fini d’apprendre.\n\nJe ne construis pas seulement des logiciels. Je construis des possibilités.',proof:'10+|clients actifs, 87 %|de temps de recherche en moins, 7|modules métiers conçus',linkedin:'linkedin.com/in/eucher-abatti',github:'github.com/eucherabatti'};
var SEED_SKILLS=[['React','Frontend & Mobile'],['Next.js','Frontend & Mobile'],['TypeScript','Frontend & Mobile'],['React Native','Frontend & Mobile'],['PHP','Backend & API'],['Laravel','Backend & API'],['Python','Backend & API'],['Django','Backend & API'],['Node.js','Backend & API'],['MySQL','Bases de données'],['PostgreSQL','Bases de données'],['RBAC','Sécurité & IAM'],['IAM','Sécurité & IAM'],['JWT','Sécurité & IAM'],['2FA','Sécurité & IAM'],['Audit logs','Sécurité & IAM'],['Docker','DevOps & Outils'],['Git','DevOps & Outils'],['CI/CD','DevOps & Outils'],['AI Integration','AI Engineering'],['Agentic Development','AI Engineering']].map(function(s,i){return{id:i+1,n:s[0],cat:s[1],lv:80}});
var SEED_EXP=[
{id:1,t:'Web Operations Associate / Développeur Full-Stack',o:'Intelligent Revenue OÜ',l:'Tallinn, Estonie (télétravail)',p:'août 2026 – présent',d:'Développement front-end et back-end de plateformes fintech internationales (Web3), au sein d’une équipe distribuée sur plusieurs fuseaux horaires.\nDéveloppement de CMS, d’outils de publication et d’API internes ; optimisation des performances et de la disponibilité cloud.'},
{id:2,t:'Stagiaire Développeur Full-Stack',o:'INNOVTECH',l:'Cotonou (télétravail)',p:'novembre 2025 – février 2026',d:'Développement frontend React/Next.js sur la plateforme immobilière IMONA, intégration de maquettes Figma.\nCoordination de projet en méthodologie Agile et intégration des retours d’équipe.'},
{id:3,t:'Stagiaire Développeur / IT',o:'SIAB',l:'Djeffa',p:'juin 2024 – janvier 2025',d:'Conception de HUB_DATASYS (7 modules métiers) avec système RBAC et délégation temporaire des droits de validation.\nCentralisation et indexation de plus de 500 documents, réduisant le temps de recherche de 87 %.'},
{id:4,t:'Freelance Full-Stack & Design',o:'Indépendant',l:'Porto-Novo',p:'2017 – présent',d:'Développement web et mobile sur mesure pour un portefeuille de plus de 10 clients actifs (TPE, startups).\nPlateforme institutionnelle pour l’Institut Polytechnique Paul Hazoumè, avec système IAM à 5 rôles hiérarchiques.'}];
SEED_EXP[0].s='Web3, Fintech, CMS, API';SEED_EXP[1].s='React, Next.js, Figma, Agile';SEED_EXP[2].s='RBAC, Indexation, Délégation de droits';SEED_EXP[2].k='87 %|de temps de recherche en moins, 500+|documents indexés, 7|modules métiers';SEED_EXP[3].s='Web, Mobile, IAM';SEED_EXP[3].k='10+|clients actifs, 5|rôles hiérarchiques (IAM)';SEED_EXP[3].logo='ea';
var SEED_EDU=[
{id:1,t:'Candidature — Master 1 Génie Logiciel',o:'IFRI, Université d’Abomey-Calavi',l:'',p:'Dossier soumis en juillet 2026',d:'Admission en cours.'},
{id:2,t:'Licence professionnelle en Systèmes Informatiques et Logiciels',o:'HECM',l:'Porto-Novo',p:'2022 – 2025',d:'Soutenue avec mention très bien.\nMajor de promotion sur plusieurs semestres.'}];
var S3=SEED_SKILLS;
var SKILL_DETAILS={
 'AI Integration':{fr:'Intègre des modèles d’IA aux applications pour automatiser des tâches et enrichir leurs fonctionnalités.',en:'Integrates AI models into applications to automate tasks and add intelligent features.'},
 'Agentic Development':{fr:'Conçoit des agents capables de planifier et d’exécuter des tâches avec des outils et des garde-fous.',en:'Builds agents that plan and execute tasks using tools within defined safeguards.'},
 RBAC:{fr:'Attribue les permissions selon les rôles pour limiter chaque utilisateur aux accès nécessaires.',en:'Assigns permissions by role so each user has only the access they need.'},
 IAM:{fr:'Gère les identités et leurs accès aux applications et aux ressources.',en:'Manages identities and their access to applications and resources.'},
 JWT:{fr:'Utilise des jetons signés pour transmettre des informations d’authentification entre services.',en:'Uses signed tokens to carry authentication information between services.'},
 '2FA':{fr:'Ajoute une seconde vérification à la connexion pour renforcer la sécurité d’un compte.',en:'Adds a second verification step at sign-in to strengthen account security.'},
 'Audit logs':{fr:'Consigne les actions importantes pour faciliter le suivi et les vérifications de sécurité.',en:'Records important actions to support monitoring and security reviews.'}
};
function drawSk(){var el=document.getElementById('sk');if(!el)return;var cats=[],by={};S3.forEach(function(s){if(!by[s.cat]){by[s.cat]=[];cats.push(s.cat)}by[s.cat].push(s)});
el.innerHTML=cats.map(function(c){return '<div class="skg"><h4>'+E(c)+'</h4><div class="skl">'+by[c].map(function(s){var details=SKILL_DETAILS[s.n],content='<span aria-hidden="true">'+skI(s.n)+'</span>'+E(s.n);return details?'<button class="sk skill-details-trigger" type="button" data-skill="'+E(s.n)+'" data-category="'+E(c)+'" aria-haspopup="dialog">'+content+'</button>':'<div class="sk">'+skI(s.n)+E(s.n)+'</div>'}).join('')+'</div></div>'}).join('')}
var skillGrid=document.getElementById('sk'),skillDialog=document.getElementById('skillDialog');
if(skillGrid&&skillDialog)skillGrid.addEventListener('click',function(e){var trigger=e.target.closest('.skill-details-trigger');if(!trigger)return;var details=SKILL_DETAILS[trigger.dataset.skill];if(!details)return;
document.getElementById('skillDialogCategory').textContent=trigger.dataset.category;
document.getElementById('skillDialogTitle').textContent=trigger.dataset.skill;
document.getElementById('skillDialogDescription').textContent=window.LANG==='en'?details.en:details.fr;
skillDialog.showModal()});

/* Logos des technologies (SVG intégrés) */
var ICONS=(function(){var s=function(vb,b){return '<svg viewBox="'+vb+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+b+'</svg>'},tx=function(x,y,sz,c,t,a){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(a||'middle')+'" font-size="'+sz+'" font-weight="800" fill="'+c+'" font-family="Arial,Helvetica,sans-serif">'+t+'</text>'};
var shield='<path d="M7 4l3.4 37.6L24 45l13.6-3.4L41 4z" fill="@A"/><path d="M24 8v33.2l11-2.8L38 8z" fill="@B"/>';
return{
html:s('0 0 48 48',shield.replace('@A','#E34F26').replace('@B','#EF652A')+tx(24,31,22,'#fff','5')),
css:s('0 0 48 48',shield.replace('@A','#1572B6').replace('@B','#33A9DC')+tx(24,31,22,'#fff','3')),
js:s('0 0 48 48','<rect x="5" y="5" width="38" height="38" rx="3" fill="#F7DF1E"/>'+tx(40,40,17,'#222','JS','end')),
ts:s('0 0 48 48','<rect x="5" y="5" width="38" height="38" rx="3" fill="#3178C6"/>'+tx(40,40,17,'#fff','TS','end')),
react:s('0 0 48 48','<g fill="none" stroke="#61DAFB" stroke-width="2.2"><ellipse cx="24" cy="24" rx="20" ry="7.6"/><ellipse cx="24" cy="24" rx="20" ry="7.6" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7.6" transform="rotate(120 24 24)"/></g><circle cx="24" cy="24" r="3.6" fill="#61DAFB"/>'),
next:s('0 0 48 48','<circle cx="24" cy="24" r="20" fill="#000" stroke="#fff" stroke-width="2"/><path d="M17 33V15h2.6l11 15.2M31 15v10" fill="none" stroke="#fff" stroke-width="2.4"/>'),
node:s('0 0 48 48','<path d="M24 3l18 10.5v21L24 45 6 34.5v-21z" fill="#5FA04E"/>'+tx(24,29,15,'#fff','JS')),
laravel:s('0 0 48 48','<rect x="5" y="5" width="38" height="38" rx="9" fill="#FF2D20"/><path d="M17 13v21h14" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>'),
python:s('0 0 48 48','<path d="M24 5c-8 0-8 3.5-8 3.5V13h8v1.5H12S6 14 6 24s5 9.5 5 9.5h3v-4.5s-.3-5 5-5h8s4.5.1 4.5-4.3V9s.8-4-8.5-4z" fill="#3776AB"/><path d="M24 43c8 0 8-3.5 8-3.5V35h-8v-1.5h12S42 34 42 24s-5-9.5-5-9.5h-3v4.5s.3 5-5 5h-8s-4.5-.1-4.5 4.3V39s-.8 4 8.5 4z" fill="#FFD43B"/><circle cx="19" cy="10" r="1.6" fill="#fff"/><circle cx="29" cy="38" r="1.6" fill="#fff"/>'),
git:s('0 0 48 48','<rect x="8" y="8" width="32" height="32" rx="5" fill="#F05032" transform="rotate(45 24 24)"/><path d="M24 20v14M24 20l8-7" stroke="#fff" stroke-width="2.6" fill="none"/><g fill="#fff"><circle cx="24" cy="20" r="3.2"/><circle cx="24" cy="34" r="3.2"/><circle cx="32" cy="13" r="3.2"/></g>'),
github:s('0 0 24 24','<path fill="#fff" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>'),
tw:s('0 0 54 33','<path fill="#38BDF8" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/>'),
figma:s('6 2 36 50','<path d="M16 4h8v16h-8a8 8 0 0 1 0-16z" fill="#F24E1E"/><path d="M24 4h8a8 8 0 0 1 0 16h-8z" fill="#FF7262"/><path d="M16 20h8v16h-8a8 8 0 0 1 0-16z" fill="#A259FF"/><circle cx="32" cy="28" r="8" fill="#1ABCFE"/><path d="M16 36h8v8a8 8 0 1 1-8-8z" fill="#0ACF83"/>'),
php:s('0 0 48 48','<ellipse cx="24" cy="24" rx="21" ry="12" fill="#777BB4"/>'+tx(24,29,14,'#fff','php')),
vue:s('0 0 48 48','<path d="M3 6h9l12 20L36 6h9L24 43z" fill="#41B883"/><path d="M12 6h6l6 10 6-10h6L24 32z" fill="#35495E"/>'),
django:s('0 0 48 48','<rect x="5" y="5" width="38" height="38" rx="8" fill="#092E20"/>'+tx(24,32,20,'#44B78B','dj')),
mysql:s('0 0 48 48','<rect x="5" y="5" width="38" height="38" rx="8" fill="#00758F"/>'+tx(24,28,14,'#fff','SQL')+'<path d="M10 36c9 4 19 4 28 0" stroke="#F29111" stroke-width="3" fill="none" stroke-linecap="round"/>'),
pg:s('0 0 48 48','<circle cx="24" cy="24" r="20" fill="#336791"/>'+tx(24,30,16,'#fff','Pg')),
docker:s('0 0 48 48','<path d="M3 24h37c2-2 3-5 3-8 3 1 4 3 4 5-1 12-10 20-22 20C13 41 5 34 3 24z" fill="#2496ED"/><g fill="#2496ED"><rect x="9" y="16" width="6" height="6"/><rect x="16" y="16" width="6" height="6"/><rect x="23" y="16" width="6" height="6"/><rect x="16" y="9" width="6" height="6"/><rect x="23" y="9" width="6" height="6"/><rect x="30" y="16" width="6" height="6"/></g>'),
sec:s('0 0 48 48','<path d="M24 4l16 6v12c0 11-7 19-16 22C15 41 8 33 8 22V10z" fill="#e60012"/><path d="M17 24l5 5 9-10" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>'),
cicd:s('0 0 48 48','<g fill="none" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 24a14 14 0 0 1 24-9"/><path d="M38 24a14 14 0 0 1-24 9"/><path d="M35 6v9h-9"/><path d="M13 42v-9h9"/></g>')}})();
var ICMAP={'html':'html','html5':'html','css':'css','css3':'css','javascript':'js','js':'js','typescript':'ts','ts':'ts','react':'react','react native':'react','next.js':'next','nextjs':'next','node.js':'node','nodejs':'node','node':'node','laravel':'laravel','python':'python','git':'git','github':'github','git / github':'gg','tailwind css':'tw','tailwind':'tw','figma':'figma','php':'php','vue':'vue','vue.js':'vue'};
Object.assign(ICMAP,{'django':'django','mysql':'mysql','postgresql':'pg','docker':'docker','rbac':'sec','iam':'sec','jwt':'sec','2fa':'sec','audit logs':'sec','ci/cd':'cicd'});
function skI(s,raw){var k=ICMAP[String(s).toLowerCase().trim()],o=k==='gg'?ICONS.git+ICONS.github:(k?ICONS[k]:'');if(!o)return raw?'':'<i>'+String(s).slice(0,2).replace(/[<>&"]/g,'')+'</i>';return raw?o:'<i class="ic">'+o+'</i>'}
window.E = window.E || function(s){var d=document.createElement('div');d.textContent=s==null?'':String(s);return d.innerHTML};

/* Projets construits depuis le catalogue public (assets/js/catalog.js). */
var P=(function(){
  var src=(window.EA_PROJECTS&&window.EA_PROJECTS.length)?window.EA_PROJECTS:[];
  var CM={Web:'web',Mobile:'mobile',IA:'ia',Design:'design'};
  function slug(p){
    if(p.slug)return p.slug;
    if(window.eaSlug)return window.eaSlug(p.n);
    return String(p.n||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  }
  return src.filter(function(x){return x&&x.st==='Publié'}).map(function(x,i){
    var cat=x.cat||'Web';
    var t=String(x.t||'').split(',').map(function(v){return v.trim()}).filter(Boolean);
    return {
      n:x.n,
      c:x.c||CM[cat]||'web',
      cat:cat,
      d:x.d||'',
      role:x.role||'Conception et développement',
      st:x.st||'Publié',
      sec:x.sec||cat,
      long:x.long||x.d||'',
      f:(x.f||[]).slice(),
      t:t,
      m:i,
      u:x.u||'',
      preview:x.preview||'',
      cover:x.cover||'',
      don:false,
      dl:'',
      slug:slug(x),
      impact:(x.impact||[]).slice()
    };
  });
})();
/* Ancienne grille #grid supprimée : le carrousel dynamique la remplace.
   `draw` reste défini (no-op) car sections.js et effects.js l'appellent encore. */
function draw(){}
var links=document.querySelectorAll("nav a"),secs=[].slice.call(document.querySelectorAll("section"));
addEventListener("scroll",function(){
  var y=scrollY+120,cur=secs[0].id;
  secs.forEach(function(s){if(s.offsetParent&&s.offsetTop<=y)cur=s.id});
  links.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+cur)});
});
var AC=null,on=false,master,bt=null,step=0;
function ac(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=.5;master.connect(AC.destination)}if(AC.state==='suspended')AC.resume();return AC}
function tone(f,d,ty,v,sl){if(!on)return;var a=ac(),o=a.createOscillator(),g=a.createGain();o.type=ty||'square';o.frequency.setValueAtTime(f,a.currentTime);if(sl)o.frequency.exponentialRampToValueAtTime(sl,a.currentTime+d);g.gain.setValueAtTime(v||.15,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);o.connect(g);g.connect(master);o.start();o.stop(a.currentTime+d)}
function noise(d,v,fq){if(!on)return;var a=ac(),n=Math.floor(a.sampleRate*d),b=a.createBuffer(1,n,a.sampleRate),x=b.getChannelData(0);for(var i=0;i<n;i++)x[i]=Math.random()*2-1;var s=a.createBufferSource();s.buffer=b;var f=a.createBiquadFilter();f.type='highpass';f.frequency.value=fq||1000;var g=a.createGain();g.gain.setValueAtTime(v||.3,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);s.connect(f);f.connect(g);g.connect(master);s.start()}
var sfx={hover:function(){tone(880,.06,'square',.05,1320)},click:function(){noise(.18,.35,2500);tone(1200,.15,'sawtooth',.1,200)},slam:function(){tone(110,.35,'sine',.5,40);noise(.12,.3,300)},whoosh:function(){noise(.5,.25,600);tone(200,.45,'sawtooth',.08,900)}};
var bass=[110,0,110,131,0,147,110,0,98,0,98,123,0,131,98,0];
function beat(){if(!on)return;var i=step%16;if(i%4===0)tone(120,.15,'sine',.35,45);if(i%2===1)noise(.04,.07,7000);if(i===4||i===12)noise(.1,.14,1500);if(bass[i])tone(bass[i],.14,'triangle',.14);if(i%8===6)tone(440,.08,'square',.03);step++}
function setSound(v){on=v;var b=document.getElementById('snd');b.textContent=v?'♪ SON : ON':'♪ SON : OFF';b.classList.toggle('on',v);clearInterval(bt);if(v){ac();bt=setInterval(beat,134)}}
document.getElementById('snd').onclick=function(){setSound(!on);if(on)sfx.click()};
function ransom(w){return w.split('').map(function(c,i){return '<b class="L l'+(i%3)+'" style="--r:'+((i*7%9)-4)+'deg;--d:'+(i*70)+'ms">'+c+'</b>'}).join('')}
document.querySelectorAll('.name h1').forEach(function(h){h.innerHTML=ransom('Eucher')+'<br><span>'+ransom('ABATTI')+'</span>'});
var fromProject=new URLSearchParams(location.search).get('fromProject')==='1';
if(fromProject){
  var projectIntro=document.getElementById('intro');
  if(projectIntro)projectIntro.remove();
  var returnToProjects=function(){
    var projectsSection=document.getElementById('projects');
    if(projectsSection)projectsSection.scrollIntoView({behavior:'auto',block:'start'});
  };
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){requestAnimationFrame(returnToProjects)},{once:true});
  }else{
    requestAnimationFrame(returnToProjects);
  }
}
document.querySelectorAll('#intro button').forEach(function(b){b.onclick=function(){if(b.dataset.snd==='1'){setSound(true);sfx.slam()}var i=document.getElementById('intro');i.classList.add('out');setTimeout(function(){i.remove()},750)}});
var wp=document.getElementById('wipe');
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href')||'';if(h.length<2||h.charAt(0)!=='#')return;var t=document.querySelector(h);if(!t)return;e.preventDefault();sfx.whoosh();wp.classList.remove('go');void wp.offsetWidth;wp.classList.add('go');setTimeout(function(){t.scrollIntoView({behavior:'instant'})},420);setTimeout(function(){wp.classList.remove('go')},1100)})});
document.addEventListener('mouseover',function(e){if(e.target.closest&&e.target.closest('a,button,.card,.sk'))sfx.hover()});
document.addEventListener('click',function(e){if(e.target.closest('a,button'))sfx.click();[0,1].forEach(function(k){var s=document.createElement('i');s.className='star'+(k?' w':'');s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(function(){s.remove()},700)})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;io.unobserve(t);if(t.classList.contains('pre')){t.classList.add('slam');sfx.slam();document.body.classList.add('shake');setTimeout(function(){document.body.classList.remove('shake')},300)}else{t.classList.add('in');setTimeout(function(){t.classList.remove('rv','in')},1100)}})},{threshold:.25});
function reveal(l){[].forEach.call(l,function(t,i){if(t.classList.contains('title')||t.classList.contains('note')||t.classList.contains('quote'))t.classList.add('pre');else{t.classList.add('rv');t.style.setProperty('--i',(i%6)*80+'ms')}io.observe(t)})}
reveal(document.querySelectorAll('.title,.note,.quote,.sk,.links a'));
var px=document.querySelectorAll('#home .shard1,#home .shard2,.hero-art,#home .tag');
addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;px.forEach(function(el,i){el.style.translate=(x*-(14+i*8))+'px '+(y*-(10+i*5))+'px'})});
var M=document.createElement('div');M.id='modal';M.innerHTML='<div class="mbox" role="dialog" aria-modal="true"><button class="mx" aria-label="Fermer">✕</button><div class="mbody"></div></div>';document.body.appendChild(M);
function li(a){return a.map(function(x){return '<li>'+x+'</li>'}).join('')}
function openP(i){var p=P[i];M.querySelector('.mbody').innerHTML='<div class="mhead"><span class="cat">'+p.cat+'</span><h3>'+p.n+'</h3><p>'+p.d+'</p></div><div class="mb"><div class="meta"><div><small>Rôle</small>'+p.role+'</div><div><small>Statut</small>'+p.st+'</div><div><small>Secteur</small>'+p.sec+'</div></div><div><h4>Le projet</h4><p>'+p.long+'</p></div><div><h4>Fonctionnalités clés</h4><ul>'+li(p.f)+'</ul></div><div><h4>Technologies</h4><div class="chips" style="margin:0">'+p.t.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div></div></div>';M.classList.add('open');document.body.style.overflow='hidden';M.querySelector('.mbox').scrollTop=0;sfx.slam()}
function closeP(){M.classList.remove('open');document.body.style.overflow=''}
M.addEventListener('click',function(e){if(e.target===M||e.target.classList.contains('mx'))closeP()});
addEventListener('keydown',function(e){if(e.key==='Escape')closeP()});
var nv=document.getElementById('nav'),bgr=document.getElementById('burger');
bgr.onclick=function(){var o=nv.classList.toggle('open');bgr.setAttribute('aria-expanded',o)};
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){nv.classList.remove('open');bgr.setAttribute('aria-expanded',false)})});
function mock(k){var R='#e60012',o='',i,j;
var T=(x,y,s,t,c)=>`<text x='${x}' y='${y}' font-family='Anton,Impact,sans-serif' font-size='${s}' fill='${c||'#fff'}'>${t}</text>`;
var base=`<svg viewBox='0 0 320 180' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg'><rect width='320' height='180' fill='#0f0f0f'/><path d='M0 180L120 0H190L70 180Z' fill='#2a0006'/><rect width='320' height='16' fill='#1d1d1d'/><circle cx='9' cy='8' r='3' fill='${R}'/><circle cx='19' cy='8' r='3' fill='#777'/><circle cx='29' cy='8' r='3' fill='#777'/>`;
if(k===0){for(i=0;i<9;i++)for(j=0;j<9;j++)if((i*5+j*7+i*j)%3===0)o+=`<rect x='${28+i*9}' y='${46+j*9}' width='8' height='8' fill='#fff'/>`;
o+=`<rect x='24' y='42' width='92' height='92' fill='none' stroke='${R}' stroke-width='3'/>`+T(130,60,18,'LIVRET NUMÉRIQUE')+`<rect x='130' y='72' width='110' height='6' fill='#333'/><rect x='130' y='72' width='84' height='6' fill='${R}'/><rect x='130' y='88' width='150' height='24' fill='#1b1b1b' stroke='${R}'/>`+T(138,106,14,'SIMULATEUR DE CODE')+`<circle cx='270' cy='150' r='22' fill='none' stroke='#333' stroke-width='6'/><circle cx='270' cy='150' r='22' fill='none' stroke='${R}' stroke-width='6' stroke-dasharray='113 140' transform='rotate(-90 270 150)'/>`+T(257,156,13,'82%')}
if(k===1){for(i=0;i<8;i++)o+=`<path d='M${i*45} 16V180' stroke='#1f1f1f'/>`;for(i=0;i<5;i++)o+=`<path d='M0 ${30+i*36}H320' stroke='#1f1f1f'/>`;
o+=`<path d='M20 160C80 150 90 90 150 100S240 60 300 40' fill='none' stroke='${R}' stroke-width='4' stroke-dasharray='8 5'/><circle cx='150' cy='100' r='8' fill='#fff' stroke='${R}' stroke-width='4'/><rect x='186' y='96' width='120' height='64' fill='#fff'/><rect x='186' y='96' width='120' height='14' fill='${R}'/>`+T(192,107,10,'ZEM·PRO')+`<rect x='194' y='118' width='28' height='28' fill='#000'/><rect x='198' y='122' width='8' height='8' fill='#fff'/><rect x='210' y='134' width='8' height='8' fill='#fff'/><rect x='230' y='120' width='64' height='5' fill='#000'/><rect x='230' y='132' width='44' height='5' fill='#999'/><circle cx='40' cy='40' r='16' fill='${R}'/>`+T(28,45,12,'SOS')}
if(k===2){o+=`<rect x='60' y='30' width='200' height='130' fill='#f4f4f4'/><rect x='68' y='38' width='184' height='114' fill='none' stroke='#000' stroke-width='2'/>`+T(92,70,20,'DIPLÔME','#000')+`<rect x='92' y='82' width='130' height='5' fill='#999'/><rect x='92' y='94' width='100' height='5' fill='#bbb'/><rect x='92' y='106' width='116' height='5' fill='#bbb'/><circle cx='222' cy='128' r='20' fill='${R}'/><path d='M212 128l7 7 13-14' stroke='#fff' stroke-width='4' fill='none'/><rect x='92' y='126' width='36' height='24' fill='#000'/><rect x='97' y='131' width='7' height='7' fill='#fff'/><g transform='rotate(-12 250 50)'><rect x='214' y='36' width='80' height='24' fill='none' stroke='${R}' stroke-width='3'/>`+T(222,55,16,'CERTIFIÉ',R)+`</g>`}
if(k===3){o+=`<path d='M160 160C90 140 70 70 100 40C140 30 210 50 220 100C225 140 200 160 160 160Z' fill='#1f5a2a'/><path d='M160 158C150 120 140 90 120 55' stroke='#3c8a4a' stroke-width='3' fill='none'/><circle cx='170' cy='96' r='12' fill='#6b4b12'/><circle cx='138' cy='120' r='7' fill='#6b4b12'/><path d='M80 34h22M80 34v22M240 34h-22M240 34v22M80 162h22M80 162v-22M240 162h-22M240 162v-22' stroke='${R}' stroke-width='4'/><rect x='230' y='64' width='84' height='44' fill='#000' stroke='${R}' stroke-width='2'/>`+T(238,84,13,'DIAGNOSTIC')+`<rect x='238' y='94' width='62' height='6' fill='#333'/><rect x='238' y='94' width='58' height='6' fill='${R}'/>`+T(8,60,12,'FON · NAGO','#aaa')}
return base+o+'</svg>'}
function safePreviewUrl(s){var v=String(s||'').trim(),u;if(!v)return '';try{u=new URL(v)}catch(e){return ''}return u.protocol==='http:'||u.protocol==='https:'?u.href:''}
window.safePreviewUrl=safePreviewUrl;
var _o=openP;openP=function(i){_o(i);M.querySelector('.mhead').insertAdjacentHTML('beforeend','<div class="mshot">'+mock(P[i].m)+'</div>')};
/* ===== Carrousel dynamique des projets ===== */
var EA_CAROUSEL={index:0,interval:null,hover:false,focusInside:false,bound:false,host:null,swiped:false,pointerDown:false};

function carouselCards(){return [].slice.call(document.querySelectorAll('#projectCarousel .project-card'))}
function carouselPaused(){return EA_CAROUSEL.hover||EA_CAROUSEL.focusInside}

function carouselAutoAllowed(){
  if(window.CALM)return false;
  if(document.hidden)return false;
  try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return false}catch(e){}
  return true;
}

function stopProjectCarousel(){if(EA_CAROUSEL.interval){clearInterval(EA_CAROUSEL.interval);EA_CAROUSEL.interval=null}}

function startProjectCarousel(){
  stopProjectCarousel();
  if(carouselPaused()||!carouselAutoAllowed()||carouselCards().length<2)return;
  EA_CAROUSEL.interval=setInterval(function(){
    if(carouselPaused()||!carouselAutoAllowed()){stopProjectCarousel();return}
    nextProjectCarousel();
  },4000);
}

function restartProjectCarousel(){if(!carouselPaused())startProjectCarousel()}

function updateProjectCarousel(){
  var cards=carouselCards(),dots=[].slice.call(document.querySelectorAll('#projectDots .dot')),total=cards.length;
  if(!total)return;
  if(EA_CAROUSEL.index<0||EA_CAROUSEL.index>=total)EA_CAROUSEL.index=0;
  var active=EA_CAROUSEL.index;
  cards.forEach(function(card,index){
    var diff=(index-active+total)%total;
    if(diff>total/2)diff-=total;
    card.classList.remove('active','prev','next');
    if(diff===0)card.classList.add('active');
    else if(diff===-1)card.classList.add('prev');
    else if(diff===1)card.classList.add('next');
    card.setAttribute('aria-hidden',diff===0?'false':'true');
    var link=card.querySelector('.btn-project');
    if(link)link.setAttribute('tabindex',diff===0?'0':'-1');
  });
  dots.forEach(function(dot,index){
    var on=index===active;
    dot.classList.toggle('active',on);
    dot.setAttribute('aria-current',on?'true':'false');
  });
}

function goProjectCarousel(index){
  var total=carouselCards().length;
  if(!total)return;
  EA_CAROUSEL.index=((index%total)+total)%total;
  updateProjectCarousel();
}
function nextProjectCarousel(){goProjectCarousel(EA_CAROUSEL.index+1)}
function prevProjectCarousel(){goProjectCarousel(EA_CAROUSEL.index-1)}

/* Changement de carte au geste horizontal.
   Seuil 40px, geste vertical ignoré (le scroll reste prioritaire).
   Les liens/boutons ne déclenchent jamais le swipe. */
function carouselSwipe(dx,dy){
  if(!isFinite(dx)||!isFinite(dy))return false;
  if(carouselCards().length<2)return false;
  if(Math.abs(dx)<40)return false;
  if(Math.abs(dx)<=Math.abs(dy)*1.2)return false;
  stopProjectCarousel();
  EA_CAROUSEL.swiped=true;
  if(dx<0)nextProjectCarousel();else prevProjectCarousel();
  restartProjectCarousel();
  setTimeout(function(){EA_CAROUSEL.swiped=false},350);
  return true;
}
function ignoreSwipeTarget(el){
  return !!(el&&el.closest&&el.closest('a,button,input,select,textarea'));
}

function initProjectCarousel(){
  if(EA_CAROUSEL.bound)return;
  var host=document.getElementById('carouselSection');
  if(!host)return;
  EA_CAROUSEL.bound=true;EA_CAROUSEL.host=host;
  host.addEventListener('mouseenter',function(){EA_CAROUSEL.hover=true;stopProjectCarousel()});
  host.addEventListener('mouseleave',function(){EA_CAROUSEL.hover=false;restartProjectCarousel()});
  host.addEventListener('focusin',function(){
    /* Un tap tactile ne doit pas couper définitivement l'autoplay : on
       n'arrête que pour un focus venu du clavier (Tab). */
    if(EA_CAROUSEL.pointerDown)return;
    EA_CAROUSEL.focusInside=true;stopProjectCarousel();
  });
  host.addEventListener('focusout',function(e){
    if(host.contains(e.relatedTarget))return;
    EA_CAROUSEL.focusInside=false;restartProjectCarousel();
  });
  host.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'){e.preventDefault();prevProjectCarousel()}
    else if(e.key==='ArrowRight'){e.preventDefault();nextProjectCarousel()}
  });
  /* Swipe tactile (Pointer Events + repli Touch Events) */
  var sx=0,sy=0,tracking=false;
  function swipeStart(x,y,target){
    if(ignoreSwipeTarget(target)){tracking=false;return}
    sx=x;sy=y;tracking=true;EA_CAROUSEL.pointerDown=true;
  }
  function swipeEnd(x,y){
    if(!tracking)return false;
    tracking=false;
    var done=carouselSwipe(x-sx,y-sy);
    setTimeout(function(){EA_CAROUSEL.pointerDown=false},0);
    return done;
  }
  if(window.PointerEvent){
    host.addEventListener('pointerdown',function(e){
      if(e.isPrimary===false)return;
      EA_CAROUSEL.pointerDown=true;
      if(e.pointerType==='mouse')return;
      swipeStart(e.clientX,e.clientY,e.target);
    });
    document.addEventListener('pointermove',function(e){
      if(!tracking)return;
      var dx=e.clientX-sx,dy=e.clientY-sy;
      if(Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)&&e.cancelable)e.preventDefault();
    },{passive:false});
    document.addEventListener('pointerup',function(e){
      if(e.pointerType==='mouse'){tracking=false;EA_CAROUSEL.pointerDown=false;return}
      if(!tracking){EA_CAROUSEL.pointerDown=false;return}
      swipeEnd(e.clientX,e.clientY);
    });
    document.addEventListener('pointercancel',function(){tracking=false;EA_CAROUSEL.pointerDown=false});
  }else{
    host.addEventListener('touchstart',function(e){
      if(e.touches.length!==1)return;
      swipeStart(e.touches[0].clientX,e.touches[0].clientY,e.target);
    },{passive:true});
    host.addEventListener('touchend',function(e){
      if(!tracking)return;
      var t=e.changedTouches&&e.changedTouches[0];
      if(!t){tracking=false;EA_CAROUSEL.pointerDown=false;return}
      swipeEnd(t.clientX,t.clientY);
    },{passive:true});
    host.addEventListener('touchcancel',function(){tracking=false;EA_CAROUSEL.pointerDown=false},{passive:true});
  }
  var prev=document.getElementById('prevBtn');
  if(prev)prev.addEventListener('click',function(){prevProjectCarousel()});
  var next=document.getElementById('nextBtn');
  if(next)next.addEventListener('click',function(){nextProjectCarousel()});
  var container=document.getElementById('projectCarousel');
  if(container)container.addEventListener('click',function(e){
    if(EA_CAROUSEL.swiped)return;
    if(!e.target.closest)return;
    if(e.target.closest('a'))return;
    var card=e.target.closest('.project-card');
    if(!card)return;
    var index=parseInt(card.getAttribute('data-index'),10);
    if(isNaN(index)||index===EA_CAROUSEL.index)return;
    goProjectCarousel(index);
  });
  var dots=document.getElementById('projectDots');
  if(dots)dots.addEventListener('click',function(e){
    var button=e.target.closest?e.target.closest('button[data-index]'):null;
    if(!button)return;
    goProjectCarousel(parseInt(button.getAttribute('data-index'),10));
  });
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)stopProjectCarousel();
    else restartProjectCarousel();
  });
}

/* Reconstruit les cartes et les pastilles depuis P. Idempotent :
   peut être appelé au boot, après eaLoad et après fermeture de l'admin. */
function renderProjectCarousel(){
  var container=document.getElementById('projectCarousel');
  if(!container)return;
  stopProjectCarousel();
  var previous=EA_CAROUSEL.index;
  var list=(Array.isArray(P)?P:[]);
  container.innerHTML='';
  list.forEach(function(p,index){
    if(!p)return;
    var slug=p.slug||(window.eaSlug?window.eaSlug(p.n):'');
    var art=p.cover||(window.eaProjectArt?window.eaProjectArt(p):'');
    var card=document.createElement('article');
    card.className='project-card';
    card.setAttribute('data-index',String(index));
    card.setAttribute('data-slug',slug);
    card.setAttribute('data-name',String(p.n||''));

    var image=document.createElement('div');
    image.className='card-image';
    if(art)image.style.backgroundImage='url("'+String(art).replace(/"/g,'%22')+'")';
    var badge=document.createElement('div');
    badge.className='badge-top-right';
    badge.textContent='Projet publié';
    image.appendChild(badge);
    card.appendChild(image);

    var content=document.createElement('div');
    content.className='card-content';
    var tags=(p.t&&p.t.length?p.t.slice(0,3):[]).map(function(tech){
      return '<span class="tag">'+E(tech)+'</span>';
    }).join('');
    content.innerHTML='<div class="tags">'+tags+'</div>'
      +'<h3 class="project-title">'+E(p.n)+'</h3>'
      +'<p class="project-desc">'+E(p.d)+'</p>'
      +'<a class="btn-project" href="project.html?project='+encodeURIComponent(slug)+'">Voir le projet '
      +'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>';
    card.appendChild(content);
    container.appendChild(card);
  });

  var dots=document.getElementById('projectDots');
  if(dots){
    dots.innerHTML='';
    [].forEach.call(container.querySelectorAll('.project-card'),function(card,index){
      var button=document.createElement('button');
      button.type='button';
      button.className='dot';
      button.setAttribute('data-index',String(index));
      button.setAttribute('aria-label','Afficher le projet '+(index+1)+(card.getAttribute('data-name')?' : '+card.getAttribute('data-name'):''));
      dots.appendChild(button);
    });
  }

  EA_CAROUSEL.index=(previous>=0&&previous<list.length)?previous:0;
  updateProjectCarousel();
  initProjectCarousel();
  startProjectCarousel();
}
window.renderProjectCarousel=renderProjectCarousel;
renderProjectCarousel();

/* P0 : lecture publique depuis l'API Supabase, avec repli catalogue. */
(function syncProjectsFromApi(){
  var api=window.EA_API;
  if(!api||typeof api.listProjects!=='function'||!api.isEnabled()){
    document.body.dataset.dataSource='catalog';
    return;
  }
  api.listProjects({perPage:24}).then(function(res){
    var items=(res&&res.items)?res.items.filter(function(x){return x&&x.st==='published'}):[];
    if(!items.length){
      document.body.dataset.dataSource='catalog';
      try{console.warn('[EA] API vide ou indisponible, catalogue utilisé')}catch(e){}
      return;
    }
    P=items.map(function(x,i){
      var tech=Array.isArray(x.t)?x.t.slice():String(x.t||'').split(',').map(function(s){return s.trim()}).filter(Boolean);
      return {
        n:x.n,c:'web',cat:x.cat||'',d:x.d||'',role:x.role||'',st:'Publié',sec:x.sec||'',
        long:x.long||x.d||'',f:Array.isArray(x.f)?x.f:[],t:tech,m:i,u:x.u||'',preview:'',cover:'',
        don:false,dl:'',slug:x.slug||(window.eaSlug?window.eaSlug(x.n):''),
        repo:x.repo||'',repo_visible:!!x.repo_visible,demo_visible:x.demo_visible!==false
      };
    });
    document.body.dataset.dataSource='api';
    renderProjectCarousel();
  },function(){
    document.body.dataset.dataSource='catalog';
    try{console.warn('[EA] API indisponible, catalogue utilisé')}catch(e){}
  });
})();
var S2=SEED_SKILLS.map(function(s){return s.n}),LV=SEED_SKILLS.map(function(){return 80});
var sub=document.querySelector('.sub');sub.innerHTML='AI-Augmented <span id="rot"></span>';
var W=['Agentic Software Engineer','LLM Systems','Automation','Product Engineering'],wi=0,ci=0,dl=false,rt=document.getElementById('rot');
(function ty(){if(window.CALM){rt.textContent=W[0];setTimeout(ty,800);return}var w=W[wi];ci+=dl?-1:1;rt.textContent=w.slice(0,ci);var t=dl?45:90;if(!dl&&ci===w.length){dl=true;t=1100}else if(dl&&ci===0){dl=false;wi=(wi+1)%W.length;t=250}setTimeout(ty,t)})();
var pr=document.createElement('div');pr.id='prog';document.body.appendChild(pr);
addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;pr.style.width=(m>0?scrollY/m*100:0)+'%'});
var cc=document.getElementById('cc');
if(cc){cc.addEventListener('mousemove',function(e){var r=cc.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cc.firstElementChild.style.transform='rotateY('+(x*24)+'deg) rotateX('+(-y*24)+'deg)'});cc.addEventListener('mouseleave',function(){cc.firstElementChild.style.transform=''})}
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
var cursorEl=document.createElement('div');cursorEl.id='cur';cursorEl.innerHTML='<div class="cb"></div><div class="fc"><span class="e"><i></i></span><span class="e"><i></i></span></div><span class="cl"></span>';document.body.appendChild(cursorEl);document.body.classList.add('hc');
var cb=cursorEl.querySelector('.cb'),ps=cursorEl.querySelectorAll('.e i'),cl=cursorEl.querySelector('.cl'),tr=[];
for(var k=0;k<6;k++){var td=document.createElement('i'),sz=15-k*2;td.className='td';td.style.cssText='width:'+sz+'px;height:'+sz+'px;margin:'+(-sz/2)+'px 0 0 '+(-sz/2)+'px;opacity:'+(.5-k*.07);document.body.appendChild(td);tr.push({el:td,x:0,y:0})}
var cx=0,cy=0,tx=-100,ty=-100,lookx=0,looky=0,idle=Date.now();
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;idle=Date.now();if(cursorEl.classList.contains('zz')){cursorEl.classList.remove('zz');cl.textContent=''}});
(function lp(){var nx=cx+(tx-cx)*.28,ny=cy+(ty-cy)*.28,vx=nx-cx,vy=ny-cy;cx=nx;cy=ny;
var sp=Math.min(Math.hypot(vx,vy)/22,.6),an=Math.atan2(vy,vx)*180/Math.PI;
cursorEl.style.translate=cx+'px '+cy+'px';
cb.style.transform='rotate('+an+'deg) scale('+(1+sp)+','+(1-sp*.45)+')';
lookx+=(Math.max(-2.5,Math.min(2.5,vx*.8))-lookx)*.3;looky+=(Math.max(-2.5,Math.min(2.5,vy*.8))-looky)*.3;
ps.forEach(function(p){p.style.transform='translate('+lookx+'px,'+looky+'px)'});
var px=cx,py=cy;tr.forEach(function(t){t.x+=(px-t.x)*.35;t.y+=(py-t.y)*.35;t.el.style.translate=t.x+'px '+t.y+'px';px=t.x;py=t.y});
if(Date.now()-idle>3000&&!cursorEl.classList.contains('zz')){cursorEl.classList.add('zz');cl.textContent='Zzz…'}
requestAnimationFrame(lp)})();
setInterval(function(){cursorEl.classList.add('bl');setTimeout(function(){cursorEl.classList.remove('bl')},130)},3200);
document.addEventListener('mouseover',function(e){var t=e.target.closest?e.target.closest('a,button,.card,.sk,.cc-in'):null;cursorEl.classList.toggle('hv',!!t);if(t){cl.textContent=t.closest('.card')?'Ouvrir':t.closest('nav')?'Go !':t.closest('.btn')?'Clique !':t.id==='snd'?'Son ♪':t.closest('.sk')?'Niveau !':t.closest('.cc-in')?'Incline-moi':t.closest('#zeo')?'Parle-moi':'Clic !'}else if(!cursorEl.classList.contains('zz'))cl.textContent=''});
document.addEventListener('mousedown',function(){cursorEl.classList.add('dn')});
document.addEventListener('mouseup',function(){cursorEl.classList.remove('dn')});
document.documentElement.addEventListener('mouseleave',function(){cursorEl.style.opacity=0});
document.documentElement.addEventListener('mouseenter',function(){cursorEl.style.opacity=1});
}
