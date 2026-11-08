/* Données issues du CV */
var SEED_PROFILE={nom:'Eucher ABATTI',titre:'Développeur Full Stack',bio:'Développeur full-stack spécialisé en gestion des identités et des accès (IAM/RBAC), avec une expérience combinant secteur industriel béninois, startups et écosystème tech international. Candidat au Master Génie Logiciel de l’IFRI pour formaliser des compétences construites sur le terrain.',slogan:'Code propre. Impact réel.',email:'abattieucher@gmail.com',tel:'+229 01 57 00 24 27',ville:'Porto-Novo, Bénin',langues:'Français : courant, Minan : langue maternelle, Anglais : niveau B2',interets:'Innovation numérique, Intelligence artificielle, Cybersécurité et IAM, Web3 et fintech, Communauté tech (GDG Cotonou), veille technologique, lecture, jeux de stratégie, cuisine',hook_r:'Je construis des plateformes où chacun voit exactement ce qu’il doit voir, et rien d’autre.',about_r:'Je suis Eucher ABATTI, ingénieur logiciel et architecte de solutions numériques basé au Bénin. Je m’intéresse particulièrement à la rencontre entre la technologie et les besoins humains.\n\nPour moi, l’ingénierie logicielle ne consiste pas à faire fonctionner les choses parce qu’elles le peuvent. Il s’agit de comprendre pourquoi une solution doit exister, de questionner la manière dont elle doit fonctionner et de construire un produit qui garde du sens au-delà de sa première version.\n\nJe travaille sur toutes les couches d’un produit numérique : interfaces, logique applicative, systèmes backend, bases de données et architecture. J’accorde une attention particulière à ce qui passe souvent inaperçu : la communication entre les systèmes, la circulation des données, l’impact des décisions sur la performance et la valeur réelle produite.\n\nJe suis attiré par les problèmes complexes, l’ingénierie réfléchie et les idées qui méritent de devenir plus que des concepts. Je ne mesure pas le progrès uniquement à ce que j’ai construit, mais à ma compréhension de ce que je construis.\n\nLa technologie ne doit pas exister pour impressionner. Elle doit exister pour faire la différence.\n\nEucher ABATTI, ingénieur logiciel et architecte de solutions numériques. Bénin. Je construis avec intention.',hook_c:'Je transforme des idées complexes en produits numériques utiles.',about_c:'Je suis Eucher ABATTI, ingénieur logiciel et architecte de solutions numériques basé au Bénin.\n\nJe transforme des idées complexes en solutions numériques utiles. Mes domaines de prédilection : l’architecture logicielle, l’ingénierie et la création de technologies qui résolvent de vrais problèmes.\n\nToujours en questionnement, toujours en train de construire, jamais fini d’apprendre.\n\nJe ne construis pas seulement des logiciels. Je construis des possibilités.',proof:'10+|clients actifs, 87 %|de temps de recherche en moins, 7|modules métiers conçus',linkedin:'linkedin.com/in/eucher-abatti',github:'github.com/eucherabatti'};
var SEED_SKILLS=[['React','Frontend & Mobile'],['Next.js','Frontend & Mobile'],['TypeScript','Frontend & Mobile'],['React Native','Frontend & Mobile'],['PHP','Backend & API'],['Laravel','Backend & API'],['Python','Backend & API'],['Django','Backend & API'],['Node.js','Backend & API'],['MySQL','Bases de données'],['PostgreSQL','Bases de données'],['RBAC','Sécurité & IAM'],['IAM','Sécurité & IAM'],['JWT','Sécurité & IAM'],['2FA','Sécurité & IAM'],['Audit logs','Sécurité & IAM'],['Docker','DevOps & Outils'],['Git','DevOps & Outils'],['CI/CD','DevOps & Outils']].map(function(s,i){return{id:i+1,n:s[0],cat:s[1],lv:80}});
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
function drawSk(){var el=document.getElementById('sk');if(!el)return;var cats=[],by={};S3.forEach(function(s){if(!by[s.cat]){by[s.cat]=[];cats.push(s.cat)}by[s.cat].push(s)});
el.innerHTML=cats.map(function(c){return '<div class="skg"><h4>'+E(c)+'</h4><div class="skl">'+by[c].map(function(s){return '<div class="sk">'+skI(s.n)+E(s.n)+'</div>'}).join('')+'</div></div>'}).join('')}

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

var P=[
 {n:'CodeDrive',c:'web mobile',cat:'Web · Mobile',d:'Le permis de conduire numérique pour le Bénin',role:'Conception et dossier de candidature',st:'Candidature au Prix National de la Simplification Administrative 2026',sec:'Travaux publics et Transports (ANATT)',long:'Hub numérique et application mobile-first qui dématérialise tout le parcours d’apprentissage du permis de conduire au Bénin. Il s’intègre en amont du système SIGPCB de l’ANATT et met fin aux registres papier.',f:['Livret numérique certifié avec QR code','Marketplace des auto-écoles agréées','Enrôlement numérique des élèves','Simulateur de code avec algorithme prédictif de réussite','Évaluation citoyenne anonyme des auto-écoles et classement public','Tableau de bord ANATT avec indice de préparation'],t:['React','Node.js','Base relationnelle','Offline-first','Bluetooth / NFC','API ANIP']},
 {n:'ZemPro',c:'web mobile',cat:'Web · Mobile',d:'La plateforme des conducteurs de taxi-moto (Zémidjan)',role:'Conception et dossier de candidature',st:'Candidature au Prix National de la Simplification Administrative 2026',sec:'Mobilité urbaine et Smart City',long:'Plateforme numérique qui professionnalise les conducteurs de taxi-moto et de taxis urbains au Bénin, en simplifiant leurs démarches et en renforçant la confiance des usagers.',f:['Carte professionnelle avec QR code','Contrôle par la police','Taxes communales','Tontine numérique','Alertes Smart City','Évaluation citoyenne','Bouton SOS'],t:['React','Node.js','Mobile-first','API ANIP (NPI)','MTN MoMo','Moov Money','TrésorPay']},
 {n:'CertiDiplôme BJ',c:'web',cat:'Web',d:'Authentification et équivalence des diplômes',role:'Porteur du projet',st:'Candidature au Prix National de la Simplification Administrative 2026',sec:'Éducation et administration',long:'Plateforme qui authentifie les diplômes au Bénin et facilite leur équivalence, pour des démarches plus rapides et des documents infalsifiables.',f:['Authentification par QR code','Identification via NPI / ANIP','Conversion des notes ECTS et GPA','Vérification instantanée par les employeurs et les écoles'],t:['NPI / ANIP','QR code','ECTS / GPA']},
 {n:'Kiffa-Agro IA',c:'ia web mobile',cat:'IA · Web · Mobile',d:'Le diagnostic des maladies des plantes par l’IA',role:'Développeur frontend et responsable du frontend',st:'Candidature au SAHAL TECH INNOVATION CHALLENGE 2026',sec:'AgriTech',long:'Application AgriTech qui diagnostique les maladies des plantes à partir d’une photo et restitue le résultat à l’oral dans les langues locales, pour être utile à tous les agriculteurs.',f:['Diagnostic par réseau CNN (MobileNetV3)','Restitution audio en fon, nago, adja et baatonu','PWA offline-first avec expériences desktop et mobile distinctes','Site vitrine one-page déployé sur Vercel'],t:['Next.js 14','TypeScript','PWA','Workbox','MobileNetV3','Vercel']}
];P.forEach(function(p,i){p.m=i});
var S=["HTML","CSS","JavaScript","TypeScript","React","Next.js","Node.js","Python","Git","GitHub","Tailwind CSS","Figma"];
var g=document.getElementById("grid");
function draw(f){
  g.innerHTML="";
  P.forEach(function(p,i){
    if(f!=="all"&&(' '+p.c+' ').indexOf(' '+f+' ')<0)return;
    var d=document.createElement("div");d.className="card";
    d.innerHTML='<div class="shot">'+p.n.slice(0,2).toUpperCase()+'</div><h3>'+p.n+'</h3><p>'+p.d+'</p><div class="chips">'+p.t.map(function(x){return"<span>"+x+"</span>"}).join("")+'</div><a href="#" class="more" data-i="'+i+'">Voir le projet</a><span class="n">#0'+(i+1)+'</span>';
    g.appendChild(d);
  });
  if(!g.children.length)g.innerHTML='<p class="lead">Bientôt de nouvelles missions…</p>';
}
draw("all");
document.getElementById("filters").addEventListener("click",function(e){
  if(e.target.tagName!=="BUTTON")return;
  document.querySelectorAll("#filters button").forEach(function(b){b.classList.remove("on")});
  e.target.classList.add("on");draw(e.target.dataset.f);
});
document.getElementById("sk").innerHTML=S.map(function(s){return'<div class="sk"><i>'+s.slice(0,2)+'</i>'+s+'</div>'}).join("");
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
document.querySelectorAll('#intro button').forEach(function(b){b.onclick=function(){if(b.dataset.snd==='1'){setSound(true);sfx.slam()}var i=document.getElementById('intro');i.classList.add('out');setTimeout(function(){i.remove()},750)}});
var wp=document.getElementById('wipe');
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var h=a.getAttribute('href')||'';if(h.length<2||h.charAt(0)!=='#')return;var t=document.querySelector(h);if(!t)return;e.preventDefault();sfx.whoosh();wp.classList.remove('go');void wp.offsetWidth;wp.classList.add('go');setTimeout(function(){t.scrollIntoView({behavior:'instant'})},420);setTimeout(function(){wp.classList.remove('go')},1100)})});
document.addEventListener('mouseover',function(e){if(e.target.closest&&e.target.closest('a,button,.card,.sk'))sfx.hover()});
document.addEventListener('click',function(e){if(e.target.closest('a,button'))sfx.click();[0,1].forEach(function(k){var s=document.createElement('i');s.className='star'+(k?' w':'');s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(function(){s.remove()},700)})});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;io.unobserve(t);if(t.classList.contains('pre')){t.classList.add('slam');sfx.slam();document.body.classList.add('shake');setTimeout(function(){document.body.classList.remove('shake')},300)}else{t.classList.add('in');setTimeout(function(){t.classList.remove('rv','in')},1100)}})},{threshold:.25});
function reveal(l){[].forEach.call(l,function(t,i){if(t.classList.contains('title')||t.classList.contains('note')||t.classList.contains('quote'))t.classList.add('pre');else{t.classList.add('rv');t.style.setProperty('--i',(i%6)*80+'ms')}io.observe(t)})}
reveal(document.querySelectorAll('.title,.note,.quote,.sk,.links a,.card'));
var _d=draw;draw=function(f){_d(f);reveal(g.querySelectorAll('.card'))};
var px=document.querySelectorAll('#home .shard1,#home .shard2,.hero-art,.tag');
addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;px.forEach(function(el,i){el.style.translate=(x*-(14+i*8))+'px '+(y*-(10+i*5))+'px'})});
var M=document.createElement('div');M.id='modal';M.innerHTML='<div class="mbox" role="dialog" aria-modal="true"><button class="mx" aria-label="Fermer">✕</button><div class="mbody"></div></div>';document.body.appendChild(M);
function li(a){return a.map(function(x){return '<li>'+x+'</li>'}).join('')}
function openP(i){var p=P[i];M.querySelector('.mbody').innerHTML='<div class="mhead"><span class="cat">'+p.cat+'</span><h3>'+p.n+'</h3><p>'+p.d+'</p></div><div class="mb"><div class="meta"><div><small>Rôle</small>'+p.role+'</div><div><small>Statut</small>'+p.st+'</div><div><small>Secteur</small>'+p.sec+'</div></div><div><h4>Le projet</h4><p>'+p.long+'</p></div><div><h4>Fonctionnalités clés</h4><ul>'+li(p.f)+'</ul></div><div><h4>Technologies</h4><div class="chips" style="margin:0">'+p.t.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div></div></div>';M.classList.add('open');document.body.style.overflow='hidden';M.querySelector('.mbox').scrollTop=0;sfx.slam()}
function closeP(){M.classList.remove('open');document.body.style.overflow=''}
M.addEventListener('click',function(e){if(e.target===M||e.target.classList.contains('mx'))closeP()});
addEventListener('keydown',function(e){if(e.key==='Escape')closeP()});
g.addEventListener('click',function(e){var c=e.target.closest('.card');if(!c)return;e.preventDefault();openP(+c.querySelector('.more').dataset.i)});
var nv=document.getElementById('nav'),bgr=document.getElementById('burger');
bgr.onclick=function(){var o=nv.classList.toggle('open');bgr.setAttribute('aria-expanded',o)};
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){nv.classList.remove('open');bgr.setAttribute('aria-expanded',false)})});
draw('all');
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
draw=function(f){g.innerHTML='';P.forEach(function(p,i){if(f!=='all'&&(' '+p.c+' ').indexOf(' '+f+' ')<0)return;var d=document.createElement('div');d.className='card';d.innerHTML=`<div class='shot'>${mock(p.m)}<em>aperçu</em></div><h3>${p.n}</h3><p>${p.d}</p><div class='chips'>${p.t.slice(0,3).map(x=>'<span>'+x+'</span>').join('')}</div><a href='#' class='more' data-i='${i}'>Voir le projet</a><span class='n'>#0${i+1}</span>`;g.appendChild(d)});if(!g.children.length)g.innerHTML=`<p class='lead'>Bientôt de nouvelles missions…</p>`;reveal(g.querySelectorAll('.card'))};
var _o=openP;openP=function(i){_o(i);M.querySelector('.mhead').insertAdjacentHTML('beforeend','<div class="mshot">'+mock(P[i].m)+'</div>')};
draw('all');
var S2=SEED_SKILLS.map(function(s){return s.n}),LV=SEED_SKILLS.map(function(){return 80});
drawSk();
reveal(document.querySelectorAll('#sk .sk'));
var sub=document.querySelector('.sub');sub.innerHTML='Développeur <span id="rot"></span>';
var W=['Full Stack','Laravel','React','Next.js','IAM / RBAC'],wi=0,ci=0,dl=false,rt=document.getElementById('rot');
(function ty(){if(window.CALM){rt.textContent=W[0];setTimeout(ty,800);return}var w=W[wi];ci+=dl?-1:1;rt.textContent=w.slice(0,ci);var t=dl?45:90;if(!dl&&ci===w.length){dl=true;t=1100}else if(dl&&ci===0){dl=false;wi=(wi+1)%W.length;t=250}setTimeout(ty,t)})();
var pr=document.createElement('div');pr.id='prog';document.body.appendChild(pr);
addEventListener('scroll',function(){var m=document.documentElement.scrollHeight-innerHeight;pr.style.width=(m>0?scrollY/m*100:0)+'%'});
var cc=document.getElementById('cc');
if(cc){cc.addEventListener('mousemove',function(e){var r=cc.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;cc.firstElementChild.style.transform='rotateY('+(x*24)+'deg) rotateX('+(-y*24)+'deg)'});cc.addEventListener('mouseleave',function(){cc.firstElementChild.style.transform=''})}
if(matchMedia('(hover:hover) and (pointer:fine)').matches){
var cu=document.createElement('div');cu.id='cur';cu.innerHTML='<div class="cb"></div><div class="fc"><span class="e"><i></i></span><span class="e"><i></i></span></div><span class="cl"></span>';document.body.appendChild(cu);document.body.classList.add('hc');
var cb=cu.querySelector('.cb'),ps=cu.querySelectorAll('.e i'),cl=cu.querySelector('.cl'),tr=[];
for(var k=0;k<6;k++){var td=document.createElement('i'),sz=15-k*2;td.className='td';td.style.cssText='width:'+sz+'px;height:'+sz+'px;margin:'+(-sz/2)+'px 0 0 '+(-sz/2)+'px;opacity:'+(.5-k*.07);document.body.appendChild(td);tr.push({el:td,x:0,y:0})}
var cx=0,cy=0,tx=-100,ty=-100,lookx=0,looky=0,idle=Date.now();
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;idle=Date.now();if(cu.classList.contains('zz')){cu.classList.remove('zz');cl.textContent=''}});
(function lp(){var nx=cx+(tx-cx)*.28,ny=cy+(ty-cy)*.28,vx=nx-cx,vy=ny-cy;cx=nx;cy=ny;
var sp=Math.min(Math.hypot(vx,vy)/22,.6),an=Math.atan2(vy,vx)*180/Math.PI;
cu.style.translate=cx+'px '+cy+'px';
cb.style.transform='rotate('+an+'deg) scale('+(1+sp)+','+(1-sp*.45)+')';
lookx+=(Math.max(-2.5,Math.min(2.5,vx*.8))-lookx)*.3;looky+=(Math.max(-2.5,Math.min(2.5,vy*.8))-looky)*.3;
ps.forEach(function(p){p.style.transform='translate('+lookx+'px,'+looky+'px)'});
var px=cx,py=cy;tr.forEach(function(t){t.x+=(px-t.x)*.35;t.y+=(py-t.y)*.35;t.el.style.translate=t.x+'px '+t.y+'px';px=t.x;py=t.y});
if(Date.now()-idle>3000&&!cu.classList.contains('zz')){cu.classList.add('zz');cl.textContent='Zzz…'}
requestAnimationFrame(lp)})();
setInterval(function(){cu.classList.add('bl');setTimeout(function(){cu.classList.remove('bl')},130)},3200);
document.addEventListener('mouseover',function(e){var t=e.target.closest?e.target.closest('a,button,.card,.sk,.cc-in'):null;cu.classList.toggle('hv',!!t);if(t){cl.textContent=t.closest('.card')?'Ouvrir':t.closest('nav')?'Go !':t.closest('.btn')?'Clique !':t.id==='snd'?'Son ♪':t.closest('.sk')?'Niveau !':t.closest('.cc-in')?'Incline-moi':t.closest('#zeo')?'Parle-moi':'Clic !'}else if(!cu.classList.contains('zz'))cl.textContent=''});
document.addEventListener('mousedown',function(){cu.classList.add('dn')});
document.addEventListener('mouseup',function(){cu.classList.remove('dn')});
document.documentElement.addEventListener('mouseleave',function(){cu.style.opacity=0});
document.documentElement.addEventListener('mouseenter',function(){cu.style.opacity=1});
}
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
{id:5,n:'Zéo, le bot IA vocal',type:'Projet',d:'Un petit robot qui se déplace, comprend les commandes vocales et résume vos projets.',long:'Un assistant animé pour votre site : il flotte à l’écran, écoute le micro, lit ses réponses à voix haute, vous emmène dans les sections, ouvre et résume vos projets. Vous pouvez ajouter vos propres commandes et lui donner une voix personnalisée.',inc:'Code complet du bot, Personnage animé en SVG, Commandes vocales et écrites, Réglages de la voix, Guide pour ajouter tes commandes',price:0,cur:'FCFA',link:'',lic:'Usage sur vos propres projets. La revente du code est interdite.',st:'Brouillon'},
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
var pr=d.profile||{},se=d.set||{},cm={Web:'web',Mobile:'mobile',IA:'ia',Design:'design'};
P=d.projects.filter(function(x){return x.st==='Publié'}).map(function(x){var r=RICH[x.n]||{},c=cm[x.cat]||'web',t=String(x.t||'').split(',').map(function(s){return s.trim()}).filter(Boolean);return{n:x.n,c:r.c&&r.c.split(' ').indexOf(c)>-1?r.c:c,cat:r.cat||x.cat,d:x.d,role:r.role||'Porteur du projet',st:r.st||'Projet publié',sec:r.sec||x.cat,long:r.long||x.d,f:r.f||['Détails à venir'],t:t.length?t:(r.t||[]),m:r.m==null?-1:r.m,don:x.don==='Oui',dl:x.dl||''}});
S3=d.skills;S2=d.skills.map(function(s){return s.n});LV=d.skills.map(function(s){return s.lv||80});
drawSk();
reveal(document.querySelectorAll('#sk .sk'));
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
applyData();drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();
(function(){
var A=document.getElementById('adm');

var K='ea_admin_v1',D,V='dash',SEL=0,MS=null;
var IC={home:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',folder:'<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',code:'<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',mail:'<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><path d="M22 6l-10 7L2 6"/>',set:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',plus:'<path d="M12 5v14M5 12h14"/>',search:'<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',eye:'<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',trash:'<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',bolt:'<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',chart:'<path d="M3 3v18h18M7 14l4-4 3 3 5-6"/>',doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',cart:'<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>',brief:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'};
function I(n,s){return '<svg viewBox="0 0 24 24" width="'+(s||20)+'" height="'+(s||20)+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+IC[n]+'</svg>'}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function seed(){var n=Date.now(),H=36e5;return{
profile:Object.assign({},window.SEED_PROFILE),
projects:[
{id:1,n:'CodeDrive',d:'Hub numérique mobile-first pour dématérialiser le parcours du permis de conduire au Bénin.',cat:'Web',st:'Publié',t:'React, Node.js, QR Code, NFC',u:''},
{id:2,n:'ZemPro',d:'Plateforme des conducteurs de taxi-moto (Zémidjan) : carte pro, tontine, SOS.',cat:'Mobile',st:'Publié',t:'React, Node.js, Mobile Money',u:''},
{id:3,n:'CertiDiplôme BJ',d:'Authentification et équivalence des diplômes au Bénin.',cat:'Web',st:'Publié',t:'NPI / ANIP, QR Code, ECTS / GPA',u:''},
{id:4,n:'Kiffa-Agro IA',d:'Diagnostic des maladies des plantes par IA, avec restitution audio en langues locales.',cat:'IA',st:'Publié',t:'Next.js 14, TypeScript, PWA, MobileNetV3',u:''}],
skills:window.SEED_SKILLS.map(function(s){return Object.assign({},s)}),exp:window.SEED_EXP.map(function(s){return Object.assign({},s)}),edu:window.SEED_EDU.map(function(s){return Object.assign({},s)}),cvV:3,
msgs:[],
set:{titre:'Eucher ABATTI | Développeur Full Stack',desc:'Portfolio de Eucher ABATTI, développeur Full Stack Web et Mobile spécialisé en Laravel et React.',domain:'',online:true,maint:false,sound:true,accent:'#e60012'},
posts:[],services:(window.SEED_SERVICES||[]).map(function(x){return Object.assign({},x)}),steps:(window.SEED_STEPS||[]).map(function(x){return Object.assign({},x)}),shopV:3,shop:[],act:[{t:n-6*H,a:'Portfolio créé',b:'Thème rouge et noir',c:'var(--ac)',i:'home'},{t:n-5*H,a:'Projets importés',b:'CodeDrive, ZemPro, CertiDiplôme BJ, Kiffa-Agro IA',c:'var(--ok)',i:'folder'}],upd:n}}
function load(){try{D=JSON.parse(localStorage.getItem(K))}catch(e){D=null}if(!D||!D.projects)D=seed();if(!D.posts)D.posts=[];if(!D.shop)D.shop=[];if(D.mockV!==1){D.mockV=1;D.posts=[];D.shop=[];save()}if(D.shopV!==3){D.shopV=3}
if(D.msgV!==2){D.msgV=2;D.msgs=(D.msgs||[]).filter(function(m){return ['Jean Dupont','Marie L.','Thomas K.'].indexOf(m.from)<0});save()}
if(!D.services||!D.steps){D.services=D.services||window.SEED_SERVICES.map(function(x){return Object.assign({},x)});D.steps=D.steps||window.SEED_STEPS.map(function(x){return Object.assign({},x)});save()}
if(!D.cvV){D.cvV=1;var cp=function(x){return Object.assign({},x)};D.profile=Object.assign({},D.profile,window.SEED_PROFILE);D.skills=window.SEED_SKILLS.map(cp);D.exp=window.SEED_EXP.map(cp);D.edu=window.SEED_EDU.map(cp);save()}
if(D.cvV===1){D.cvV=2;D.edu=(D.edu||[]).filter(function(x){return x.t!=='Baccalauréat scientifique, série D'});D.edu.forEach(function(x){if(/^Licence professionnelle/.test(x.t)&&/Major de promotion/.test(x.d||''))x.d='Soutenue avec mention très bien.'});save()}
if(D.cvV===2){D.cvV=3;var SP=window.SEED_PROFILE,pf=D.profile=D.profile||{};['hook_r','about_r','hook_c','about_c','proof'].forEach(function(k){if(!pf[k])pf[k]=SP[k]});if(!/Fran[cç]ais/i.test(pf.langues||''))pf.langues=SP.langues;if(!pf.interets||pf.interets==='Innovation numérique, veille technologique, lecture, jeux de stratégie, cuisine')pf.interets=SP.interets;
(D.exp||[]).forEach(function(x){var s=window.SEED_EXP.filter(function(y){return y.t===x.t})[0];if(s)['k','s','logo'].forEach(function(k){if(x[k]===undefined&&s[k]!==undefined)x[k]=s[k]})});
(D.edu||[]).forEach(function(x){if(/^Licence professionnelle/.test(x.t)&&x.d==='Soutenue avec mention très bien.')x.d='Soutenue avec mention très bien.\nMajor de promotion sur plusieurs semestres.'});save()}document.documentElement.style.setProperty('--ac',D.set.accent)}
function save(){D.upd=Date.now();try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}if(window.eaPush)window.eaPush()}
function log(a,b,i,c){D.act.unshift({t:Date.now(),a:a,b:b,i:i||'bolt',c:c||'var(--ac)'});D.act=D.act.slice(0,12)}
function ago(t){var m=Math.round((Date.now()-t)/6e4);return m<1?'à l’instant':m<60?'Il y a '+m+' min':m<1440?'Il y a '+Math.round(m/60)+' h':'Il y a '+Math.round(m/1440)+' j'}
function toast(s){var e=document.getElementById('toast');e.textContent=s;e.classList.add('on');setTimeout(function(){e.classList.remove('on')},2200)}
function nid(a){return a.reduce(function(m,x){return Math.max(m,x.id)},0)+1}
function unread(){return D.msgs.filter(function(m){return !m.r}).length}
function sections(){var p=D.profile,P=D.projects.filter(function(x){return x.st==='Publié'});return[['Profil',!!(p.nom&&p.titre)],['À propos',p.bio.length>40],['Contact',!!p.email],['Réseaux sociaux',!!(p.linkedin&&p.github)],['Projets publiés (3 minimum)',P.length>=3],['Compétences (8 minimum)',D.skills.length>=8],['Liens des projets',D.projects.length>0&&D.projects.every(function(x){return x.u})],['Référencement (SEO)',D.set.desc.length>20],['Services (3 minimum)',(D.services||[]).length>=3]]}
function nav(){var N=[['dash','home','Tableau de bord'],['proj','folder','Projets',D.projects.length],['blog','doc','Blog',D.posts.length],['shop','cart','Boutique',D.shop.length],['svc','brief','Services',D.services.length],['par','doc','Parcours',(D.exp||[]).length+(D.edu||[]).length],['skills','code','Compétences',D.skills.length],['prof','user','Profil'],['msg','mail','Messages',unread()||''],['set','set','Paramètres']];
document.getElementById('sb').innerHTML='<div class="brand"><span class="lg">E<i>A</i></span><div><b>'+esc(D.profile.nom)+'</b><small>Portfolio Admin</small></div></div>'+N.map(function(n){return '<button class="nv'+(V===n[0]?' on':'')+'" data-v="'+n[0]+'">'+I(n[1])+'<span>'+n[2]+'</span>'+(n[3]!==undefined&&n[3]!==''?'<span class="bd">'+n[3]+'</span>':'')+'</button>'}).join('')+'<div class="qt">Un bon outil<br><b>ne remplace pas ta vision,</b><br>il la rend plus puissante.<br><br>— '+esc(D.profile.nom)+'</div>';
document.getElementById('mn').textContent=D.profile.nom}
function chart(a,lb){var W=560,H=200,m=34,mx=Math.max.apply(null,a)*1.15,pts=a.map(function(v,i){return[m+i*(W-m-10)/(a.length-1),H-24-(v/mx)*(H-40)]}),l=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1)}).join(' ');
var g=[0,1,2,3].map(function(i){var y=H-24-i*(H-40)/3;return '<line x1="'+m+'" x2="'+W+'" y1="'+y+'" y2="'+y+'" stroke="#22222b"/><text x="4" y="'+(y+4)+'">'+Math.round(mx*i/3)+'</text>'}).join('');
var x=pts.map(function(p,i){return a.length>10&&i%5?'':'<text x="'+(p[0]-8)+'" y="'+(H-6)+'">'+lb[i]+'</text>'}).join('');
return '<svg viewBox="0 0 '+W+' '+H+'" width="100%"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e11d2e" stop-opacity=".45"/><stop offset="1" stop-color="#e11d2e" stop-opacity="0"/></linearGradient></defs>'+g+'<polygon points="'+m+','+(H-24)+' '+l+' '+(W-10)+','+(H-24)+'" fill="url(#gr)"/><polyline points="'+l+'" fill="none" stroke="#e11d2e" stroke-width="2.5"/>'+pts.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="#e11d2e"/>'}).join('')+x+'</svg>'}
function vis(n){var d=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];if(n===7)return[[28,52,47,90,74,108,136],d];var a=[],l=[];for(var i=0;i<30;i++){a.push(Math.round(40+i*3+22*Math.sin(i/2)));l.push('J'+(i+1))}return[a,l]}
function pc(p){return '<div class="pcd"><div class="th" style="--h:'+(p.id*37%40)+'"><span class="chip '+(p.st==='Publié'?'ok':'wa')+'">'+p.st+'</span>'+esc(p.n.slice(0,2).toUpperCase())+'</div><h4>'+esc(p.n)+'</h4><p>'+esc(p.d)+'</p><div class="rw"><button class="bt sm gh" data-a="editp" data-i="'+p.id+'">Gérer '+I('arrow',14)+'</button><button class="ib" data-a="delp" data-i="'+p.id+'" aria-label="Supprimer">'+I('trash',16)+'</button></div></div>'}
function stat(i,c,l,v,s){return '<div class="cd st"><span class="ico" style="background:'+c+'">'+I(i,24)+'</span><div><small>'+l+'</small><b>'+v+'</b><em>'+s+'</em></div></div>'}
function ring(p){var C=2*Math.PI*52;return '<div class="ring"><svg width="130" height="130" viewBox="0 0 130 130"><circle cx="65" cy="65" r="52" fill="none" stroke="#2a2a33" stroke-width="10"/><circle cx="65" cy="65" r="52" fill="none" stroke="var(--ac)" stroke-width="10" stroke-linecap="round" stroke-dasharray="'+(C*p/100)+' '+C+'" transform="rotate(-90 65 65)"/></svg><div><b>'+p+'%</b></div></div>'}
var RG=7,CMP=false;
var VW={
dash:function(){var S=sections(),ok=S.filter(function(s){return s[1]}).length,pc2=Math.round(ok/S.length*100),vs=vis(RG),pub=D.projects.filter(function(p){return p.st==='Publié'}).length,cats=new Set(D.skills.map(function(s){return s.cat})).size;
return '<div class="hd"><div><h1>Tableau de bord</h1><p class="sbt">Gérez facilement votre portfolio et son contenu depuis cet espace.</p></div><div class="sbt">'+new Date().toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'short',year:'numeric'})+'</div></div>'
+'<div class="g4">'+stat('folder','var(--ac)','Projets',D.projects.length,pub+' publiés')+stat('code','var(--pu)','Compétences',D.skills.length,cats+' catégories')+stat('mail','var(--bl)','Messages',D.msgs.length,'<span style="color:var(--mu)">'+unread()+' non lus</span>')+'</div>'
+'<div class="dash"><div class="col"><div class="two"><div class="cd"><h3>'+I('chart')+'Vue d’ensemble<select data-a="rg" style="margin-left:auto;background:var(--p);border:1px solid var(--ln);border-radius:6px;padding:6px 10px"><option value="7"'+(RG===7?' selected':'')+'>7 derniers jours</option><option value="30"'+(RG===30?' selected':'')+'>30 derniers jours</option></select></h3>'+chart(vs[0],vs[1])+'</div>'
+'<div class="cd"><h3 style="font-size:14px">Taux de complétion du portfolio</h3>'+ring(pc2)+'<p style="text-align:center;color:var(--mu);margin-bottom:12px">'+ok+' / '+S.length+' sections</p>'+(CMP?'<div style="margin-bottom:12px">'+S.map(function(s){return '<div style="color:'+(s[1]?'var(--ok)':'#f5a524')+'">'+(s[1]?'✓ ':'○ ')+s[0]+'</div>'}).join('')+'</div>':'')+'<button class="bt gh blk" style="justify-content:center" data-a="cmp">Voir les détails '+I('arrow',14)+'</button></div></div>'
+'<div class="cd"><h3>'+I('folder')+'Gestion des projets<a data-v="proj">Voir tous →</a></h3><div class="pg">'+D.projects.slice(0,4).map(pc).join('')+'</div></div>'
+'<div class="two"><div class="cd"><h3>'+I('code')+'Mes compétences<a data-v="skills">Gérer →</a></h3><div class="tags">'+D.skills.map(function(s){return '<span class="tg">'+esc(s.n)+'</span>'}).join('')+'</div></div>'
+'<div class="cd msgs"><h3>'+I('mail')+'Messages<a data-v="msg">Voir tout →</a></h3>'+D.msgs.slice(0,3).map(function(m,i){return '<div class="m'+(m.r?'':' un')+'" data-a="openm" data-i="'+i+'"><span class="pill">'+esc(m.from[0])+'</span><div><b>'+esc(m.from)+'</b><br><small>'+esc(m.txt.slice(0,34))+'…</small></div><time>'+ago(m.t)+'</time></div>'}).join('')+'</div></div></div>'
+'<div class="col"><div class="cd"><h3>'+I('bolt')+'Activité récente</h3>'+D.act.slice(0,5).map(function(a){return '<div class="act"><span class="ico" style="background:'+a.c+'">'+I(a.i,18)+'</span><div><b>'+esc(a.a)+'</b><small>'+esc(a.b)+'</small></div><time>'+ago(a.t)+'</time></div>'}).join('')+'</div>'
+'<div class="cd"><h3>'+I('bolt')+'Actions rapides</h3><button class="bt blk" data-a="addp">'+I('plus')+'Ajouter un projet</button><button class="bt gh blk" data-a="addsk">'+I('plus')+'Ajouter une compétence</button><button class="bt gh blk" data-a="bnew">'+I('doc')+'Écrire un article</button><button class="bt gh blk" data-v="prof">'+I('user')+'Modifier le profil</button><button class="bt gh blk" data-v="msg">'+I('mail')+'Voir les messages</button></div>'
+'<div class="cd"><div class="live"><i></i>Portfolio '+(D.set.online?'en ligne':'hors ligne')+'</div><small style="color:var(--mu)">Dernière mise à jour : '+new Date(D.upd).toLocaleString('fr-FR',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})+'</small><br><br><button class="bt gh sm" data-a="close">Voir le portfolio '+I('arrow',14)+'</button></div></div></div>'},
proj:function(){var q=(VW.pq||'').toLowerCase(),f=VW.pf||'Toutes',L=D.projects.filter(function(p){return(f==='Toutes'||p.cat===f||p.st===f)&&(p.n+p.d+p.t).toLowerCase().indexOf(q)>-1});
return '<div class="hd"><div><h1>Projets</h1><p class="sbt">Ajoutez, modifiez et publiez vos réalisations.</p></div><button class="bt" data-a="addp">'+I('plus')+'Ajouter un projet</button></div><div class="tb"><input id="pq" placeholder="Filtrer les projets…" value="'+esc(VW.pq||'')+'"><select id="pf">'+['Toutes','Web','Mobile','IA','Design','Publié','Brouillon'].map(function(o){return '<option'+(o===f?' selected':'')+'>'+o+'</option>'}).join('')+'</select></div>'
+'<div class="cd" style="overflow:auto"><table><tr><th>Projet</th><th>Catégorie</th><th>Technologies</th><th>Statut</th><th></th></tr>'+(L.map(function(p){return '<tr><td><b>'+esc(p.n)+'</b><br><small style="color:var(--mu)">'+esc(p.d.slice(0,60))+'…</small></td><td>'+p.cat+'</td><td style="max-width:220px;color:var(--mu)">'+esc(p.t)+'</td><td><button class="chip '+(p.st==='Publié'?'ok':'wa')+'" style="border:0;cursor:pointer" data-a="togp" data-i="'+p.id+'" title="Changer le statut">'+p.st+'</button></td><td style="white-space:nowrap"><button class="ib" data-a="editp" data-i="'+p.id+'" aria-label="Modifier">'+I('edit',17)+'</button><button class="ib" data-a="delp" data-i="'+p.id+'" aria-label="Supprimer">'+I('trash',17)+'</button></td></tr>'}).join('')||'<tr><td colspan="5" style="color:var(--mu)">Aucun projet.</td></tr>')+'</table></div>'},
skills:function(){var cs=['Frontend & Mobile','Backend & API','Bases de données','Sécurité & IAM','DevOps & Outils','Design'];return '<div class="hd"><div><h1>Compétences</h1><p class="sbt">Organisez vos outils et réglez votre niveau.</p></div><button class="bt" data-a="addsk">'+I('plus')+'Ajouter une compétence</button></div><div class="two" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">'+cs.map(function(c){return '<div class="cd"><h3>'+c+'</h3>'+(D.skills.filter(function(s){return s.cat===c}).map(function(s){return '<div class="skr"><span class="sic">'+(window.skI?skI(s.n,1):'')+'</span><b style="width:110px">'+esc(s.n)+'</b><span style="flex:1"></span><button class="ib" data-a="editsk" data-i="'+s.id+'" aria-label="Modifier">'+I('edit',16)+'</button><button class="ib" data-a="delsk" data-i="'+s.id+'" aria-label="Supprimer">'+I('trash',16)+'</button></div>'}).join('')||'<small style="color:var(--mu)">Aucune compétence.</small>')+'</div>'}).join('')+'</div>'},
prof:function(){var p=D.profile,F=[['nom','Nom complet'],['titre','Titre'],['slogan','Slogan de l’accueil','w'],['bio','À propos','w','a'],['email','E-mail'],['linkedin','LinkedIn'],['github','GitHub'],['ville','Ville'],['tel','Téléphone (affiché seulement sur le CV)'],['langues','Langues (séparées par des virgules)','w'],['interets','Centres d’intérêt (séparés par des virgules)','w'],['hook_c','Accroche « J’ai un projet »','w'],['about_c','Texte « J’ai un projet » (paragraphes séparés par une ligne vide)','w','a'],['proof','Chiffres clés (valeur|libellé, séparés par des virgules)','w'],['en_hook_c','Accroche « J’ai un projet » en anglais','w'],['en_about_c','Texte « J’ai un projet » en anglais','w','a']];
return '<div class="hd"><div><h1>Profil</h1><p class="sbt">Ces informations alimentent l’accueil, la section À propos et le contact.</p></div><button class="bt" data-a="svp">Enregistrer</button></div><div class="two"><div class="cd fm" id="pf">'+F.map(function(f){return '<label class="'+(f[2]||'')+'">'+f[1]+(f[3]?'<textarea data-k="'+f[0]+'" rows="4">'+esc(p[f[0]])+'</textarea>':'<input data-k="'+f[0]+'" value="'+esc(p[f[0]])+'">')+'</label>'}).join('')+'<div class="w"><button class="bt gh" data-a="tren" type="button" data-map=\'{"hook_c":"en_hook_c","about_c":"en_about_c"}\'>✨ Traduire l’À propos en anglais</button><small style="color:var(--mu);display:block;margin-top:4px">Brouillon à relire avant d’enregistrer.</small></div></div><div class="cd"><h3>Aperçu</h3><div class="cc2"><small style="letter-spacing:2px;color:#666">CARTE DE VISITE</small><h4>'+esc(p.nom)+'</h4><p style="font-weight:600">'+esc(p.titre)+'</p><p style="color:#555;font-size:13px">'+esc(p.email)+'<br>'+esc(p.linkedin)+'<br>'+esc(p.github)+'</p></div></div></div>'},
msg:function(){var m=D.msgs[SEL];return '<div class="hd"><div><h1>Messages</h1><p class="sbt">'+unread()+' non lu(s) sur '+D.msgs.length+'.</p></div></div><div class="dm">Le formulaire du portfolio n’est pas encore relié à cette boîte de réception.</div><div class="mg"><div class="cd ml">'+(D.msgs.map(function(x,i){return '<div class="m'+(x.r?'':' un')+(i===SEL?' on':'')+'" data-a="openm" data-i="'+i+'"><span class="pill">'+esc(x.from[0])+'</span><div><b>'+esc(x.from)+'</b><br><small style="color:var(--mu)">'+ago(x.t)+'</small></div></div>'}).join('')||'<small style="color:var(--mu)">Boîte vide.</small>')+'</div><div class="cd">'+(m?'<h3>'+esc(m.from)+'</h3><p style="margin-bottom:20px;line-height:1.7">'+esc(m.txt)+'</p><div class="ac" style="justify-content:flex-start"><a class="bt" style="text-decoration:none" href="mailto:?subject=Re: votre message">'+I('mail',16)+'Répondre</a><button class="bt gh" data-a="unr" data-i="'+SEL+'">Marquer non lu</button><button class="bt gh" data-a="delm" data-i="'+SEL+'">'+I('trash',16)+'Supprimer</button></div>':'<small style="color:var(--mu)">Sélectionnez un message.</small>')+'</div></div>'},
set:function(){var s=D.set;function sw(k,t,d){return '<div class="row"><div><b>'+t+'</b><small>'+d+'</small></div><button class="sw'+(s[k]?' on':'')+'" data-a="tog" data-k="'+k+'" role="switch" aria-checked="'+!!s[k]+'" aria-label="'+t+'"></button></div>'}
return '<div class="hd"><div><h1>Paramètres</h1><p class="sbt">Réglez la publication, l’apparence et vos données.</p></div><button class="bt" data-a="svs">Enregistrer</button></div><div class="two" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr))"><div class="cd fm" id="sf"><h3 class="w">Général</h3><label class="w">Titre du site (SEO)<input data-k="titre" value="'+esc(s.titre)+'"></label><label class="w">Description (SEO)<textarea data-k="desc" rows="3">'+esc(s.desc)+'</textarea></label><label class="w">Nom de domaine<input data-k="domain" placeholder="exemple.com" value="'+esc(s.domain)+'"></label><label class="w">Bandeau défilant (phrases séparées par des virgules)<textarea data-k="ticker" rows="2" placeholder="Code propre, Impact réel, Full Stack Developer, Laravel, React, Mobile first, Made in Benin, Let’s build together">'+esc(s.ticker)+'</textarea></label><h3 class="w" style="margin-top:8px">Dons</h3><label class="w">Lien de don (page de paiement)<input data-k="dlink" placeholder="https://…" value="'+esc(s.dlink)+'"></label><label class="w">Mobile Money (texte affiché au public)<input data-k="momo" placeholder="Ex. MTN MoMo : …" value="'+esc(s.momo)+'"></label><label class="w">Montants suggérés en FCFA (séparés par des virgules)<input data-k="damounts" placeholder="1000, 2000, 5000" value="'+esc(s.damounts)+'"></label><h3 class="w" style="margin-top:8px">Commandes</h3><label class="w">Numéro WhatsApp pour les commandes (format international, sans +)<input data-k="wa" placeholder="22901000000" value="'+esc(s.wa)+'"></label></div>'
+'<div class="cd"><h3>Publication et effets</h3>'+sw('online','Portfolio en ligne','Rend le portfolio visible aux visiteurs')+sw('maint','Mode maintenance','Affiche une page « bientôt de retour »')+sw('sound','Sons du portfolio','Effets sonores et musique d’ambiance')+sw('avail','Badge « Disponible »','Affiche « Disponible pour de nouvelles missions » sur l’accueil')+'<div class="row" style="border:0;padding-bottom:0"><b>Sections et extras</b></div>'+sw('no_journey','Masquer la section Parcours','Garde uniquement le bouton « Voir mon CV »')+sw('sh_svc','Services et formulaire de projet','Section « Ce que je propose » et « Démarrer un projet »')+sw('sh_blog','Blog','Section Blog et lien du menu')+sw('sh_shop','Boutique et dons','Section Boutique, bouton Payer et dons')+sw('sh_bot','Zéo, le bot IA','Assistant animé et vocal')+sw('sh_orbit','Orbite 3D des technologies','Anneau 3D sous les compétences')+sw('sh_pal','Palette de commandes','Bouton et raccourci Ctrl+K')+'<div class="row"><div><b>Couleur d’accent</b><small>Appliquée au tableau de bord et au portfolio</small></div><div class="cols">'+['#e60012','#f97316','#3b82f6','#22c55e'].map(function(c){return '<button class="'+(s.accent===c?'on':'')+'" style="background:'+c+'" data-a="acc" data-k="'+c+'" aria-label="Couleur '+c+'"></button>'}).join('')+'</div></div></div>'
+'<div class="cd"><h3>Données</h3><div class="row"><div><b>Exporter</b><small>Télécharge un fichier JSON avec tout le contenu</small></div><button class="bt gh sm" data-a="exp">'+I('dl',16)+'Exporter</button></div><div class="row"><div><b>Réinitialiser</b><small>Revient aux données de départ</small></div><button class="bt gh sm" data-a="reset">Réinitialiser</button></div></div></div>'}};
function render(){nav();document.getElementById('ct').innerHTML=VW[V]();document.getElementById('si').innerHTML=I('search');document.getElementById('gi').innerHTML=I('bolt',18)}
function go(v){V=v;render();A.scrollTo(0,0)}
function closeM(){document.getElementById('md').className=''}
function formM(title,F,Vl,ok){var m=document.getElementById('md');m.innerHTML='<div class="mb2" role="dialog" aria-modal="true"><h3>'+title+'</h3>'+F.map(function(f){if(f.t==='img')return '<label>'+f.l+'<input type="file" accept="image/*" data-imgfor="'+f.k+'"><input type="hidden" data-k="'+f.k+'" value="'+esc(Vl[f.k]||'')+'">'+(Vl[f.k]&&String(Vl[f.k]).indexOf('data:image')===0?'<img class="imgp" src="'+esc(Vl[f.k])+'" alt="" style="max-height:48px;margin-top:6px;background:#fff;padding:3px">':(Vl[f.k]==='ea'?'<small style="color:var(--mu)">Logo EA par défaut. Choisis une image pour le remplacer.</small>':''))+'</label>';if(f.t==='tr')return '<div><button class="bt gh" data-a="tren" type="button" data-map=\''+JSON.stringify(f.map)+'\'>✨ '+f.l+'</button><small style="color:var(--mu);display:block;margin-top:4px">Brouillon à relire avant d’enregistrer.</small></div>';var v=Vl[f.k]==null?'':Vl[f.k];return '<label>'+f.l+(f.t==='area'?'<textarea data-k="'+f.k+'" rows="3">'+esc(v)+'</textarea>':f.t==='select'?'<select data-k="'+f.k+'">'+f.o.map(function(o){return '<option'+(o===v?' selected':'')+'>'+o+'</option>'}).join('')+'</select>':f.t==='range'?'<span><input data-k="'+f.k+'" type="range" min="1" max="100" value="'+(v||60)+'" style="width:85%"> <b class="rg2">'+(v||60)+'%</b></span>':'<input data-k="'+f.k+'" value="'+esc(v)+'">')+'</label>'}).join('')+'<div class="ac"><button class="bt gh" data-a="mx">Annuler</button><button class="bt" data-a="ms">Enregistrer</button></div></div>';m.className='open';MS=function(){var o={};m.querySelectorAll('[data-k]').forEach(function(i){o[i.dataset.k]=i.value});if(ok(o)!==false)closeM()}}
function pform(id){var p=D.projects.find(function(x){return x.id===id})||{cat:'Web',st:'Publié'};formM(id?'Modifier le projet':'Nouveau projet',[{k:'n',l:'Nom du projet'},{k:'d',l:'Description',t:'area'},{k:'cat',l:'Catégorie',t:'select',o:['Web','Mobile','IA','Design']},{k:'t',l:'Technologies (séparées par des virgules)'},{k:'u',l:'Lien du projet'},{k:'st',l:'Statut',t:'select',o:['Publié','Brouillon']},{k:'don',l:'Activer les dons sur ce projet',t:'select',o:['Non','Oui']},{k:'dl',l:'Lien de don propre à ce projet (optionnel)'},{k:'en_d',l:'Description en anglais',t:'area'},{t:'tr',l:'Traduire en anglais',map:{d:'en_d'}}],Object.assign({},p,{en_d:(p.en||{}).d}),function(o){o=packEn(o);if(!o.n.trim()){toast('Le nom est obligatoire');return false}if(id){Object.assign(p,o);log('Projet '+o.n+' mis à jour',o.cat+' · '+o.st,'folder','var(--ok)')}else{o.id=nid(D.projects);D.projects.push(o);log('Nouveau projet ajouté',o.n,'folder','var(--ok)')}save();render();toast('Projet enregistré')})}
function sform(id){var s=D.skills.find(function(x){return x.id===id})||{cat:'Frontend & Mobile',lv:80};formM(id?'Modifier la compétence':'Nouvelle compétence',[{k:'n',l:'Nom'},{k:'cat',l:'Catégorie',t:'select',o:['Frontend & Mobile','Backend & API','Bases de données','Sécurité & IAM','DevOps & Outils','Design']}],s,function(o){if(!o.n.trim()){toast('Le nom est obligatoire');return false}o.lv=+o.lv||80;if(id)Object.assign(s,o);else{o.id=nid(D.skills);D.skills.push(o)}log('Compétence '+(id?'modifiée':'ajoutée'),o.n,'code','var(--pu)');save();render();toast('Compétence enregistrée')})}
function gen(){var P=D.projects.filter(function(p){return p.st==='Publié'}),j=JSON.stringify({generatedAt:new Date().toISOString(),profile:D.profile,projects:P,skills:D.skills,settings:D.set},null,2);
(window.claude?claude.use('downloads'):Promise.resolve({save:function(o){var a=document.createElement('a');a.href=URL.createObjectURL(o.data);a.download=o.filename;document.body.appendChild(a);a.click();a.remove();return Promise.resolve()}})).then(function(dl){if(!dl){toast('Téléchargement indisponible ici');return}return dl.save({filename:'portfolio-data.json',data:new Blob([j],{type:'application/json'})}).then(function(){log('Portfolio généré',P.length+' projets · '+D.skills.length+' compétences','bolt');save();render();toast('Données du portfolio générées')})}).catch(function(e){if(!e||e.code!=='declined')toast('Export impossible')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-v],[data-a]');if(!t)return;if(t.dataset.v){go(t.dataset.v);return}var a=t.dataset.a,i=+t.dataset.i;
if(a==='addp')pform();else if(a==='editp')pform(i);else if(a==='delp'){ask('Supprimer ce projet ?',function(){D.projects=D.projects.filter(function(p){return p.id!==i});log('Projet supprimé','','trash','#555');save();render()})}
else if(a==='togp'){var p=D.projects.find(function(x){return x.id===i});p.st=p.st==='Publié'?'Brouillon':'Publié';log('Statut de '+p.n,p.st,'folder','var(--ok)');save();render()}
else if(a==='addsk')sform();else if(a==='editsk')sform(i);else if(a==='delsk'){D.skills=D.skills.filter(function(s){return s.id!==i});save();render()}
else if(a==='openm'){SEL=i;D.msgs[i].r=1;save();if(SB&&D.msgs[i].id)SB.from('messages').update({read:true}).eq('id',D.msgs[i].id).then(function(){}).catch(function(){});V='msg';render()}else if(a==='unr'){D.msgs[i].r=0;save();if(SB&&D.msgs[i].id)SB.from('messages').update({read:false}).eq('id',D.msgs[i].id).then(function(){}).catch(function(){});render()}else if(a==='delm'){if(SB&&D.msgs[i]&&D.msgs[i].id)SB.from('messages').delete().eq('id',D.msgs[i].id).then(function(){}).catch(function(){});D.msgs.splice(i,1);SEL=0;save();render()}
else if(a==='cmp'){CMP=!CMP;render()}else if(a==='gen')applyClose();else if(a==='exp')gen();else if(a==='close')window.closeAdmin();else if(a==='mx')closeM();else if(a==='ms'&&MS)MS();
else if(a==='svp'||a==='svs'){document.querySelectorAll(a==='svp'?'#pf [data-k]':'#sf [data-k]').forEach(function(x){(a==='svp'?D.profile:D.set)[x.dataset.k]=x.value});log(a==='svp'?'Profil mis à jour':'Paramètres enregistrés','','user','var(--bl)');save();render();toast('Enregistré')}
else if(a==='tog'){D.set[t.dataset.k]=!D.set[t.dataset.k];save();render()}else if(a==='acc'){D.set.accent=t.dataset.k;document.documentElement.style.setProperty('--ac',t.dataset.k);save();render()}
else if(a==='reset'){ask('Revenir aux données de départ ?',function(){D=seed();save();document.documentElement.style.setProperty('--ac',D.set.accent);render();toast('Données réinitialisées')})}});
document.addEventListener('change',function(e){if(e.target.dataset.a==='rg'){RG=+e.target.value;render()}if(e.target.id==='pf'){VW.pf=e.target.value;render()}});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='pq'){VW.pq=t.value;var p=t.selectionStart;render();var n=document.getElementById('pq');n.focus();n.setSelectionRange(p,p)}if(t.type==='range'&&t.nextElementSibling)t.nextElementSibling.textContent=t.value+'%';if(t.id==='q')srch(t.value)});
function srch(v){var r=document.getElementById('res'),q=v.trim().toLowerCase();if(!q){r.style.display='none';return}var H=[];[['dash','Tableau de bord'],['proj','Projets'],['skills','Compétences'],['prof','Profil'],['msg','Messages'],['set','Paramètres']].forEach(function(x){if(x[1].toLowerCase().indexOf(q)>-1)H.push([x[0],x[1],'Menu'])});D.projects.forEach(function(p){if(p.n.toLowerCase().indexOf(q)>-1)H.push(['proj',p.n,'Projet'])});D.skills.forEach(function(s){if(s.n.toLowerCase().indexOf(q)>-1)H.push(['skills',s.n,'Compétence'])});
r.innerHTML=H.slice(0,6).map(function(h){return '<button data-v="'+h[0]+'">'+esc(h[1])+'<small>'+h[2]+'</small></button>'}).join('')||'<button disabled>Aucun résultat</button>';r.style.display='block'}
document.addEventListener('click',function(e){if(!e.target.closest('.sr')||e.target.closest('#res')){document.getElementById('res').style.display='none';if(e.target.closest('#res'))document.getElementById('q').value=''}});
addEventListener('keydown',function(e){if(e.key==='Escape')closeM()});


var ED=null,BCATS=['Laravel','React','Mobile','IA','Web','Carrière'];
function ask(m,cb){var d=document.getElementById('md');d.innerHTML='<div class="mb2"><h3>Confirmation</h3><p>'+esc(m)+'</p><div class="ac"><button class="bt gh" data-a="mx">Annuler</button><button class="bt" data-a="ms">Confirmer</button></div></div>';d.className='open';MS=function(){closeM();cb()}}
VW.blog=function(){var q=(VW.bq||'').toLowerCase(),f=VW.bs||'Tous',all=D.posts,pub=all.filter(function(p){return p.st==='Publié'}).length,L=all.filter(function(p){return(f==='Tous'||p.st===f)&&(p.t+p.ex+p.tags).toLowerCase().indexOf(q)>-1}).sort(function(a,b){return a.d<b.d?1:-1});
return '<div class="hd"><div><h1>Blog</h1><p class="sbt">Rédigez, publiez et organisez vos articles.</p></div><button class="bt" data-a="bnew">'+I('plus')+'Nouvel article</button></div><div class="g4" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">'+stat('doc','var(--ac)','Articles',all.length,pub+' publiés')+stat('edit','var(--pu)','Brouillons',all.length-pub,'à terminer')+stat('folder','var(--bl)','Catégories',new Set(all.map(function(p){return p.cat})).size,'')+'</div><div class="tb"><input id="bq" placeholder="Rechercher un article…" value="'+esc(VW.bq||'')+'"><select id="bs">'+['Tous','Publié','Brouillon'].map(function(o){return '<option'+(o===f?' selected':'')+'>'+o+'</option>'}).join('')+'</select></div><div class="cd" style="overflow:auto"><table><tr><th>Article</th><th>Catégorie</th><th>Date</th><th>Statut</th><th></th></tr>'+(L.map(function(p){return '<tr><td><b>'+esc(p.t)+'</b><br><small style="color:var(--mu)">'+esc((p.ex||'').slice(0,70))+'</small></td><td>'+esc(p.cat)+'</td><td style="white-space:nowrap">'+esc(p.d)+'</td><td><button class="chip '+(p.st==='Publié'?'ok':'wa')+'" style="border:0;cursor:pointer" data-a="btog" data-i="'+p.id+'" title="Changer le statut">'+p.st+'</button></td><td style="white-space:nowrap"><button class="ib" data-a="bedit" data-i="'+p.id+'" aria-label="Modifier">'+I('edit',17)+'</button><button class="ib" data-a="bdel" data-i="'+p.id+'" aria-label="Supprimer">'+I('trash',17)+'</button></td></tr>'}).join('')||'<tr><td colspan="5" style="color:var(--mu)">Aucun article.</td></tr>')+'</table></div>'};
VW.bedit=function(){var e=ED;return '<div class="hd"><div><h1>'+(e.id?'Modifier l’article':'Nouvel article')+'</h1><p class="sbt">Markdown simplifié : ## titre, **gras**, - liste, &gt; citation, `code`, [texte](lien).</p></div><div class="tb" style="margin:0"><button class="bt gh" data-a="bcancel">Annuler</button><button class="bt gh" data-a="bsave" data-k="Brouillon">Enregistrer le brouillon</button><button class="bt" data-a="bsave" data-k="Publié">Publier</button></div></div><div class="two" style="grid-template-columns:repeat(auto-fit,minmax(340px,1fr))"><div class="cd fm" id="bf"><label class="w">Titre<input data-k="t" value="'+esc(e.t)+'"></label><label>Catégorie<select data-k="cat">'+BCATS.map(function(c){return '<option'+(c===e.cat?' selected':'')+'>'+c+'</option>'}).join('')+'</select></label><label>Date<input type="date" data-k="d" value="'+esc(e.d)+'"></label><label class="w">Tags (séparés par des virgules)<input data-k="tags" value="'+esc(e.tags)+'"></label><label class="w">Résumé (affiché sur la carte)<textarea data-k="ex" rows="2">'+esc(e.ex)+'</textarea></label><div class="w"><div class="tb" style="margin-bottom:8px">'+[['h2','Titre'],['b','Gras'],['ul','Liste'],['q','Citation'],['code','Code'],['a','Lien']].map(function(x){return '<button class="bt gh sm" data-a="fmt" data-k="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div><textarea id="bb" data-k="body" rows="16" style="width:100%">'+esc(e.body)+'</textarea></div><h3 class="w" style="margin-top:8px">Version anglaise</h3><label class="w">Titre en anglais<input data-k="en_t" value="'+esc(e.en_t)+'"></label><label class="w">Tags en anglais (séparés par des virgules)<input data-k="en_tags" value="'+esc(e.en_tags)+'"></label><label class="w">Résumé en anglais<textarea data-k="en_ex" rows="2">'+esc(e.en_ex)+'</textarea></label><label class="w">Contenu en anglais<textarea data-k="en_body" rows="10" style="width:100%">'+esc(e.en_body)+'</textarea></label><div class="w"><button class="bt gh" data-a="tren" type="button" data-map=\''+JSON.stringify({t:'en_t',tags:'en_tags',ex:'en_ex',body:'en_body'})+'\'>✨ Traduire en anglais</button><small style="color:var(--mu);display:block;margin-top:4px">Brouillon à relire avant d’enregistrer.</small></div></div><div class="cd"><h3>Aperçu</h3><div class="art" id="bp">'+window.mdr(e.body)+'</div></div></div>'};
function P1(id){return D.posts.find(function(p){return p.id===id})}
function fmt(k){var t=document.getElementById('bb'),s=t.selectionStart,e=t.selectionEnd,v=t.value,sel=v.slice(s,e)||'texte',m={h2:['\n\n## ',''],b:['**','**'],ul:['\n\n- ',''],a:['[','](https://)'],code:['`','`'],q:['\n\n> ','']}[k];t.value=v.slice(0,s)+m[0]+sel+m[1]+v.slice(e);ED.body=t.value;document.getElementById('bp').innerHTML=window.mdr(t.value);t.focus()}
document.addEventListener('click',function(e){var t=e.target.closest('[data-a]');if(!t)return;var a=t.dataset.a,i=+t.dataset.i;
if(a==='bnew'){ED={id:0,t:'',cat:'Web',tags:'',ex:'',body:'',st:'Brouillon',d:new Date().toISOString().slice(0,10)};V='bedit';render();A.scrollTo(0,0)}
else if(a==='bedit'){ED=Object.assign({},P1(i));var e0=ED.en||{};['t','ex','tags','body'].forEach(function(k){ED['en_'+k]=e0[k]||''});V='bedit';render();A.scrollTo(0,0)}
else if(a==='bcancel'){V='blog';render()}
else if(a==='bdel'){var p=P1(i);ask('Supprimer l’article « '+p.t+' » ?',function(){D.posts=D.posts.filter(function(x){return x.id!==i});log('Article supprimé',p.t,'trash','#555');save();render()})}
else if(a==='btog'){var q=P1(i);q.st=q.st==='Publié'?'Brouillon':'Publié';log('Article '+(q.st==='Publié'?'publié':'dépublié'),q.t,'doc','var(--ok)');save();render()}
else if(a==='bsave'){if(!ED.t.trim()){toast('Le titre est obligatoire');return}ED.st=t.dataset.k;packEn(ED);if(ED.id)Object.assign(P1(ED.id),ED);else{ED.id=nid(D.posts);D.posts.push(ED)}log('Article '+(ED.st==='Publié'?'publié':'enregistré'),ED.t,'doc',ED.st==='Publié'?'var(--ok)':'var(--bl)');save();V='blog';render();toast(ED.st==='Publié'?'Article publié':'Brouillon enregistré')}
else if(a==='fmt')fmt(t.dataset.k)});
document.addEventListener('input',function(e){var t=e.target;if(t.id==='bq'){VW.bq=t.value;var s=t.selectionStart;render();var n=document.getElementById('bq');n.focus();n.setSelectionRange(s,s);return}if(t.id==='bs'){VW.bs=t.value;render();return}if(ED&&V==='bedit'&&t.closest&&t.closest('#bf')&&t.dataset.k){ED[t.dataset.k]=t.value;if(t.id==='bb')document.getElementById('bp').innerHTML=window.mdr(t.value)}});

function S1(id){return D.shop.find(function(p){return p.id===id})}
VW.shop=function(){var all=D.shop,pub=all.filter(function(p){return p.st==='Publié'}).length;
return '<div class="hd"><div><h1>Boutique</h1><p class="sbt">Vends tes animations, templates et projets.</p></div><button class="bt" data-a="snew">'+I('plus')+'Nouveau produit</button></div><div class="g4" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">'+stat('cart','var(--ac)','Produits',all.length,pub+' publiés')+stat('edit','var(--pu)','Brouillons',all.length-pub,'à terminer')+stat('code','var(--bl)','Avec lien de paiement',all.filter(function(p){return p.link}).length,'')+'</div>'
+'<div class="cd" style="margin-bottom:20px"><h3>Comment encaisser ?</h3><p style="color:var(--mu);line-height:1.7">1. Crée un compte chez une plateforme de paiement locale, par exemple FedaPay ou KKiaPay (Mobile Money et cartes).<br>2. Crée un lien de paiement pour chaque produit.<br>3. Colle-le dans « Lien de paiement » : le bouton « Acheter » du portfolio y mène.<br>Tes ventes se suivent dans le tableau de bord de la plateforme choisie. Les dons se règlent dans Paramètres.</p></div>'
+'<div class="cd" style="overflow:auto"><table><tr><th>Produit</th><th>Prix</th><th>Lien</th><th>Statut</th><th></th></tr>'+(all.map(function(p){return '<tr><td><b>'+esc(p.n)+'</b><br><small style="color:var(--mu)">'+esc(p.type)+'</small></td><td style="white-space:nowrap">'+(p.price>0?Number(p.price).toLocaleString('fr-FR')+' '+esc(p.cur||'FCFA'):'Sur demande')+'</td><td>'+(p.link?'<span style="color:var(--ok)">✓ défini</span>':'<span style="color:var(--mu)">à ajouter</span>')+'</td><td><button class="chip '+(p.st==='Publié'?'ok':'wa')+'" style="border:0;cursor:pointer" data-a="stog" data-i="'+p.id+'" title="Changer le statut">'+p.st+'</button></td><td style="white-space:nowrap"><button class="ib" data-a="sedit" data-i="'+p.id+'" aria-label="Modifier">'+I('edit',17)+'</button><button class="ib" data-a="sdel" data-i="'+p.id+'" aria-label="Supprimer">'+I('trash',17)+'</button></td></tr>'}).join('')||'<tr><td colspan="5" style="color:var(--mu)">Aucun produit.</td></tr>')+'</table></div>'};
function shform(id){var p=S1(id)||{type:'Animation',cur:'FCFA',st:'Brouillon'};
formM(id?'Modifier le produit':'Nouveau produit',[{k:'n',l:'Nom du produit'},{k:'type',l:'Type',t:'select',o:['Animation','Template','Projet','Code source','Design']},{k:'d',l:'Description courte'},{k:'long',l:'Description détaillée',t:'area'},{k:'inc',l:'Contenu inclus (séparé par des virgules)'},{k:'price',l:'Prix (nombre, 0 pour « sur demande »)'},{k:'cur',l:'Devise',t:'select',o:['FCFA','EUR','USD']},{k:'link',l:'Lien de paiement (https://…)'},{k:'lic',l:'Licence',t:'area'},{k:'st',l:'Statut',t:'select',o:['Publié','Brouillon']},{k:'en_n',l:'Nom en anglais'},{k:'en_d',l:'Description courte en anglais'},{k:'en_long',l:'Description détaillée en anglais',t:'area'},{k:'en_inc',l:'Contenu inclus en anglais (séparé par des virgules)'},{k:'en_lic',l:'Licence en anglais',t:'area'},{t:'tr',l:'Traduire en anglais',map:{n:'en_n',d:'en_d',long:'en_long',inc:'en_inc',lic:'en_lic'}}],Object.assign({},p,{en_n:(p.en||{}).n,en_d:(p.en||{}).d,en_long:(p.en||{}).long,en_inc:(p.en||{}).inc,en_lic:(p.en||{}).lic}),function(o){o=packEn(o);
if(!o.n.trim()){toast('Le nom est obligatoire');return false}
if(o.link&&!/^https?:\/\//i.test(o.link.trim())){toast('Le lien doit commencer par https://');return false}
o.price=+String(o.price).replace(/\s/g,'')||0;o.link=o.link.trim();
if(id)Object.assign(p,o);else{o.id=nid(D.shop);D.shop.push(o)}
log('Produit '+(id?'modifié':'ajouté'),o.n,'cart','var(--ok)');save();render();toast('Produit enregistré')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-a]');if(!t)return;var a=t.dataset.a,i=+t.dataset.i;
if(a==='snew')shform();else if(a==='sedit')shform(i);
else if(a==='stog'){var q=S1(i);q.st=q.st==='Publié'?'Brouillon':'Publié';log('Produit '+(q.st==='Publié'?'publié':'dépublié'),q.n,'cart','var(--ok)');save();render()}
else if(a==='sdel'){var p=S1(i);ask('Supprimer le produit « '+p.n+' » ?',function(){D.shop=D.shop.filter(function(x){return x.id!==i});log('Produit supprimé',p.n,'trash','#555');save();render()})}});

function packEn(o){var en={};Object.keys(o).forEach(function(k){if(k.indexOf('en_')===0){if(String(o[k]||'').trim())en[k.slice(3)]=o[k];delete o[k]}});o.en=en;return o}
function trFill(root,map){var src={},keys=Object.keys(map);keys.forEach(function(k){var el=root.querySelector('[data-k="'+k+'"]');src[k]=el?el.value:''});
if(!keys.some(function(k){return src[k].trim()})){toast('Remplis d’abord les champs en français');return}
if(!window.claude||!claude.use){toast('Traduction automatique indisponible : saisis la version anglaise à la main');return}
toast('Traduction en cours…');
claude.use('sample').then(function(s){if(!s)throw{code:'none'};return s('Tu es traducteur professionnel du français vers l’anglais, pour un portfolio de développeur. Traduis chaque valeur du JSON ci-dessous en anglais naturel et professionnel. Conserve la mise en forme Markdown, les retours à la ligne, les noms propres et les noms de technologies. Réponds uniquement avec un JSON valide, mêmes clés, sans commentaire ni bloc de code.\n'+JSON.stringify(src),{modelTier:'quick'})}).then(function(r){var t=String(r.text||'').trim().replace(/^```(?:json)?/,'').replace(/```$/,'').trim(),o=JSON.parse(t);
keys.forEach(function(k){var el=root.querySelector('[data-k="'+map[k]+'"]');if(el&&typeof o[k]==='string'){el.value=o[k];el.dispatchEvent(new Event('input',{bubbles:true}))}});toast('Brouillon prêt : relis-le puis enregistre')}).catch(function(e){toast(e&&e.code==='none'?'Traduction indisponible ici':'La traduction a échoué : réessaie ou saisis-la à la main')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-a="tren"]');if(!t)return;e.preventDefault();trFill(t.closest('#bf,#pf')||document.getElementById('md'),JSON.parse(t.dataset.map))});

VW.svc=function(){function tbl(kind,title,hint){var a=D[kind];return '<div class="cd" style="margin-bottom:20px;overflow:auto"><h3>'+title+'<a data-a="svnew" data-k="'+kind+'">+ Ajouter</a></h3><p style="color:var(--mu);margin:-6px 0 10px">'+hint+'</p><table><tr><th>#</th><th>Titre</th><th>Description</th><th></th></tr>'+(a.map(function(x,i){var at=' data-k="'+kind+'" data-i="'+x.id+'"';return '<tr><td>'+(i+1)+'</td><td><b>'+esc(x.t)+'</b></td><td style="color:var(--mu);max-width:340px">'+esc(x.d)+'</td><td style="white-space:nowrap"><button class="ib" data-a="svup"'+at+' aria-label="Monter">▲</button><button class="ib" data-a="svdn"'+at+' aria-label="Descendre">▼</button><button class="ib" data-a="svedit"'+at+' aria-label="Modifier">'+I('edit',17)+'</button><button class="ib" data-a="svdel"'+at+' aria-label="Supprimer">'+I('trash',17)+'</button></td></tr>'}).join('')||'<tr><td colspan="4" style="color:var(--mu)">Aucun élément.</td></tr>')+'</table></div>'}
return '<div class="hd"><div><h1>Services</h1><p class="sbt">Ce que tu proposes et ta méthode de travail, affichés sur le portfolio.</p></div></div>'+tbl('services','Ce que je propose','Ces services alimentent aussi le choix « Type de projet » du formulaire « Démarrer un projet » et la liste de services de ton CV.')+tbl('steps','Ma façon de travailler','Les étapes de ta méthode, dans l’ordre.')};
function svform(kind,id){var arr=D[kind],p=arr.find(function(x){return x.id===id})||{},nm=kind==='services'?'service':'étape';
formM(id?'Modifier le '+nm:'Nouveau '+nm,[{k:'t',l:'Titre'},{k:'d',l:'Description',t:'area'},{k:'en_t',l:'Titre en anglais'},{k:'en_d',l:'Description en anglais',t:'area'},{t:'tr',l:'Traduire en anglais',map:{t:'en_t',d:'en_d'}}],Object.assign({},p,{en_t:(p.en||{}).t,en_d:(p.en||{}).d}),function(o){o=packEn(o);if(!o.t.trim()){toast('Le titre est obligatoire');return false}
if(id)Object.assign(p,o);else{o.id=nid(arr);arr.push(o)}log((kind==='services'?'Service ':'Étape ')+(id?'modifié':'ajouté'),o.t,'brief','var(--ok)');save();render();toast('Enregistré')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-a]');if(!t)return;var a=t.dataset.a,k=t.dataset.k,i=+t.dataset.i;
if(a==='svnew')svform(k);else if(a==='svedit')svform(k,i);
else if(a==='svdel'){var p=D[k].find(function(x){return x.id===i});ask('Supprimer « '+p.t+' » ?',function(){D[k]=D[k].filter(function(x){return x.id!==i});log('Élément supprimé',p.t,'trash','#555');save();render()})}
else if(a==='svup'||a==='svdn'){var A2=D[k],ix=A2.findIndex(function(x){return x.id===i}),j=a==='svup'?ix-1:ix+1;if(j>=0&&j<A2.length){var tmp=A2[ix];A2[ix]=A2[j];A2[j]=tmp;save();render()}}});

VW.par=function(){function tbl(kind,title,hint){var a=D[kind]||[];return '<div class="cd" style="margin-bottom:20px;overflow:auto"><h3>'+title+'<a data-a="pnew" data-k="'+kind+'">+ Ajouter</a></h3><p style="color:var(--mu);margin:-6px 0 10px">'+hint+'</p><table><tr><th>Période</th><th>Intitulé</th><th>Organisation</th><th></th></tr>'+(a.map(function(x){var at=' data-k="'+kind+'" data-i="'+x.id+'"';return '<tr><td style="white-space:nowrap;color:var(--mu)">'+esc(x.p)+'</td><td><b>'+esc(x.t)+'</b></td><td style="color:var(--mu)">'+esc([x.o,x.l].filter(Boolean).join(' · '))+'</td><td style="white-space:nowrap"><button class="ib" data-a="pup"'+at+' aria-label="Monter">▲</button><button class="ib" data-a="pdn"'+at+' aria-label="Descendre">▼</button><button class="ib" data-a="pedit"'+at+' aria-label="Modifier">'+I('edit',17)+'</button><button class="ib" data-a="pdel"'+at+' aria-label="Supprimer">'+I('trash',17)+'</button></td></tr>'}).join('')||'<tr><td colspan="4" style="color:var(--mu)">Aucun élément.</td></tr>')+'</table></div>'}
return '<div class="hd"><div><h1>Parcours</h1><p class="sbt">Expérience et formation affichées sur le portfolio et sur le CV.</p></div></div>'+tbl('exp','Expérience professionnelle','Du plus récent au plus ancien. Utilise ▲ ▼ pour réordonner.')+tbl('edu','Formation','Les langues et centres d’intérêt se règlent dans le menu Profil.')};
function parform(kind,id){var arr=D[kind],p=arr.find(function(x){return x.id===id})||{};
formM(id?'Modifier l’élément':'Nouvel élément',[{k:'t',l:'Intitulé'},{k:'o',l:'Organisation'},{k:'l',l:'Lieu'},{k:'p',l:'Période (ex. août 2026 – présent)'},{k:'d',l:'Détails (une ligne par point)',t:'area'},{k:'k',l:'Chiffres clés (valeur|libellé, séparés par des virgules)'},{k:'s',l:'Mots-clés (séparés par des virgules)'},{t:'img',k:'logo',l:'Logo de l’organisation (image, optionnel)'},{k:'en_t',l:'Intitulé en anglais'},{k:'en_p',l:'Période en anglais'},{k:'en_d',l:'Détails en anglais (une ligne par point)',t:'area'},{k:'en_k',l:'Chiffres clés en anglais (même format)'},{t:'tr',l:'Traduire en anglais',map:{t:'en_t',p:'en_p',d:'en_d',k:'en_k'}}],Object.assign({},p,{en_t:(p.en||{}).t,en_p:(p.en||{}).p,en_d:(p.en||{}).d,en_k:(p.en||{}).k}),function(o){o=packEn(o);if(!o.t.trim()){toast('L’intitulé est obligatoire');return false}
if(id)Object.assign(p,o);else{o.id=nid(arr);arr.push(o)}log('Parcours mis à jour',o.t,'doc','var(--ok)');save();render();toast('Enregistré')})}
document.addEventListener('click',function(e){var t=e.target.closest('[data-a]');if(!t)return;var a=t.dataset.a,k=t.dataset.k,i=+t.dataset.i;
if(a==='pnew')parform(k);else if(a==='pedit')parform(k,i);
else if(a==='pdel'){var p=D[k].find(function(x){return x.id===i});ask('Supprimer « '+p.t+' » ?',function(){D[k]=D[k].filter(function(x){return x.id!==i});log('Élément supprimé',p.t,'trash','#555');save();render()})}
else if(a==='pup'||a==='pdn'){var A2=D[k],ix=A2.findIndex(function(x){return x.id===i}),j=a==='pup'?ix-1:ix+1;if(j>=0&&j<A2.length){var tmp=A2[ix];A2[ix]=A2[j];A2[j]=tmp;save();render()}}});

document.addEventListener('change',function(e){var t=e.target;if(!t.dataset||!t.dataset.imgfor)return;var hid=t.parentNode.querySelector('[data-k="'+t.dataset.imgfor+'"]'),f=t.files&&t.files[0];if(!f){hid.value='';return}
var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){var s=Math.min(1,160/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*s));c.height=Math.max(1,Math.round(im.height*s));c.getContext('2d').drawImage(im,0,0,c.width,c.height);hid.value=c.toDataURL('image/png');var pv=t.parentNode.querySelector('.imgp');if(!pv){pv=document.createElement('img');pv.className='imgp';pv.style.cssText='max-height:48px;margin-top:6px;background:#fff;padding:3px';t.parentNode.appendChild(pv)}pv.src=hid.value};im.src=r.result};r.readAsDataURL(f)});
function applyClose(){log('Portfolio mis à jour',D.projects.filter(function(p){return p.st==='Publié'}).length+' projets publiés','bolt','var(--ok)');save();window.closeAdmin()}
var openAdminRaw=function(){load();V='dash';SEL=0;render();A.classList.add('open');document.body.classList.add('adm-open');document.body.style.overflow='hidden';A.scrollTo(0,0);A._s=window.on;if(window.on)setSound(false)};
window.closeAdmin=function(){A.classList.remove('open');document.body.classList.remove('adm-open');document.body.style.overflow='';if(A._s){setSound(true);A._s=false}applyData()};
var SB=null,SBU=window.EA_SUPABASE||{},OWNER=String(SBU.owner||'T0b0i7');if(!window.claude)document.documentElement.classList.add('no-ai');
try{if(window.supabase&&SBU.url&&SBU.key)SB=supabase.createClient(SBU.url,SBU.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})}catch(e){SB=null}
function sbName(s){var u=s&&s.user;return u?String((u.user_metadata&&(u.user_metadata.user_name||u.user_metadata.preferred_username))||u.email||''):''}
function sbOk(s){return !!s&&sbName(s).toLowerCase()===OWNER.toLowerCase()}
window.SB=SB;
var pushT=null;
function remotePush(){if(!SB||!window.SB_ADMIN)return;clearTimeout(pushT);pushT=setTimeout(function(){SB.from('portfolio').upsert({id:1,data:D,updated_at:new Date().toISOString()}).then(function(r){if(r.error)console.warn('sync',r.error.message)}).catch(function(e){console.warn('sync',e)})},700)}
window.eaPush=remotePush;
window.eaLoad=function(){if(!SB)return Promise.resolve(false);return SB.from('portfolio').select('data').eq('id',1).maybeSingle().then(function(r){if(r.error||!r.data||!r.data.data)return false;var d=r.data.data;if(!d.projects)return false;try{localStorage.setItem(K,JSON.stringify(d))}catch(e){}return true}).catch(function(){return false})};
function msgPull(){if(!SB)return;SB.from('messages').select('*').order('created_at',{ascending:false}).then(function(r){if(r.error)return;D.msgs=(r.data||[]).map(function(m){return{id:m.id,from:m.name||'Anonyme',email:m.email||'',txt:m.body||'',subject:m.subject||'',t:m.created_at?new Date(m.created_at).getTime():Date.now(),r:m.read?1:0}});try{localStorage.setItem(K,JSON.stringify(D))}catch(e){}if(A.classList.contains('open'))render()}).catch(function(){})}
window.eaMsgPull=msgPull;
var lg=document.createElement('div');lg.id='lg';lg.setAttribute('data-notr','1');document.body.appendChild(lg);
var GH='<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>';
function login(mode){var M2={net:'Impossible de joindre Supabase. Réessaie dans un instant.',denied:'Connexion refusée : ce compte GitHub n’est pas autorisé.',cfg:'La connexion administrateur n’est pas encore configurée.'},cfg=!!SB;
lg.innerHTML='<div class="lb" role="dialog" aria-modal="true"><h3>Espace administrateur</h3><p>'+(M2[mode]||'Accès réservé au propriétaire du site. Connecte-toi avec ton compte GitHub autorisé.')+'</p><button class="gh" id="lgb">'+GH+'<span>Se connecter avec GitHub</span></button><p class="lgn" id="lgn"'+(cfg?' hidden':'')+'>⚙ La connexion administrateur n’est pas encore configurée.</p><div id="lgo"></div><button class="x" id="lgx">Fermer</button></div>';
lg.classList.add('open');
document.getElementById('lgb').onclick=function(){if(!cfg){var n=document.getElementById('lgn');n.hidden=false;n.classList.remove('fl');void n.offsetWidth;n.classList.add('fl');return}SB.auth.signInWithOAuth({provider:'github',options:{redirectTo:location.origin+location.pathname}}).then(function(r){if(r&&r.error)login('net')}).catch(function(){login('net')})};
document.getElementById('lgx').onclick=function(){lg.classList.remove('open')};
}
function enter(){lg.classList.remove('open');window.SB_ADMIN=true;openAdminRaw();if(SB){msgPull();SB.from('portfolio').select('id').eq('id',1).maybeSingle().then(function(r){if(!r.error&&!r.data)remotePush()}).catch(function(){})}}
window.requestAdmin=function(){if(!SB)return login('cfg');SB.auth.getSession().then(function(r){var s=r&&r.data&&r.data.session;if(sbOk(s))enter();else if(s){SB.auth.signOut();login('denied')}else login()}).catch(function(){login('net')})};
addEventListener('keydown',function(e){if((e.key||'').toLowerCase()==='a'&&e.shiftKey&&(e.ctrlKey||e.metaKey||e.altKey)){e.preventDefault();window.requestAdmin()}});
var lk=document.getElementById('lockln');if(lk)lk.addEventListener('click',function(e){e.preventDefault();window.requestAdmin()});
if(SB)SB.auth.onAuthStateChange(function(ev,s){window.SB_ADMIN=!!(s&&sbOk(s));if((ev==='SIGNED_IN'||ev==='INITIAL_SESSION')&&sbOk(s))enter()});
})();

(function(){
/* intro : boutons groupés, salutation selon l’heure, défilement verrouillé */
var bs=document.querySelectorAll('#intro .btn');
if(bs.length){var w=document.createElement('div');w.className='btns';bs[0].parentNode.insertBefore(w,bs[0]);bs.forEach(function(b){w.appendChild(b);b.addEventListener('click',function(){setTimeout(function(){document.body.style.overflow=''},760)})});document.body.style.overflow='hidden'}
var g0=document.querySelector('#intro .disp'),hr=new Date().getHours();
if(g0)g0.textContent=(hr<6?'Bonne nuit':hr<18?'Bonjour':'Bonsoir')+' ! Bienvenue sur mon portfolio.';
/* bannière + HUD calendrier / lieu */
var bn=document.createElement('div');bn.id='banner';document.body.appendChild(bn);
function flash(t){bn.textContent=t;bn.classList.remove('go');void bn.offsetWidth;bn.classList.add('go')}
var nw=new Date(),hud=document.createElement('div');hud.id='hud';
hud.innerHTML='<div class="cal"><b>'+String(nw.getDate()).padStart(2,'0')+'/'+String(nw.getMonth()+1).padStart(2,'0')+'</b><span>'+nw.toLocaleDateString('fr-FR',{weekday:'short'}).replace('.','').toUpperCase()+'</span></div><div class="loc"><small>'+(hr<6?'NUIT':hr<12?'MATIN':hr<18?'APRÈS-MIDI':'SOIR')+'</small><b>Accueil</b></div>';
document.body.appendChild(hud);
var NAMES={home:'Accueil',projects:'Projets',skills:'Compétences',about:'À propos',blog:'Blog',shop:'Boutique',services:'Services',journey:'Parcours',contact:'Contact'},cur0='home',hl=hud.querySelector('.loc b');
addEventListener('scroll',function(){var y=scrollY+innerHeight*.4,c='home';document.querySelectorAll('section').forEach(function(s){if(s.offsetParent&&s.offsetTop<=y)c=s.id});
if(c!==cur0&&NAMES[c]){cur0=c;hl.textContent=NAMES[c];hud.classList.remove('chg');void hud.offsetWidth;hud.classList.add('chg');flash('▶ '+(window.LANG==='en'?trs(NAMES[c]):NAMES[c]).toUpperCase());sfx.hover()}},{passive:true});
/* mode fête */
function party(){for(var k=0;k<36;k++)setTimeout(function(){var s=document.createElement('i');s.className='star'+(Math.random()>.5?' w':'');s.style.left=Math.random()*innerWidth+'px';s.style.top=Math.random()*innerHeight+'px';s.style.zIndex=130;document.body.appendChild(s);setTimeout(function(){s.remove()},700)},k*45);
document.body.classList.add('shake');setTimeout(function(){document.body.classList.remove('shake')},400);sfx.slam();flash('★ MODE FÊTE ★')}
window.party=party;var seq=[38,38,40,40,37,39,37,39,66,65],ps=0;
addEventListener('keydown',function(e){ps=e.keyCode===seq[ps]?ps+1:(e.keyCode===38?1:0);if(ps===seq.length){ps=0;party()}});
/* palette de commandes (Ctrl+K) */
var pl=document.createElement('div');pl.id='pal';pl.innerHTML='<div class="pb"><input placeholder="Que cherches-tu ? (Échap pour fermer)" autocomplete="off" aria-label="Rechercher"><ul></ul></div>';document.body.appendChild(pl);
var inp=pl.querySelector('input'),ul=pl.querySelector('ul'),items=[],sel=0;
function norm(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function build(){var L=[];
[['home','Accueil'],['projects','Projets'],['skills','Compétences'],['about','À propos'],['blog','Blog'],['shop','Boutique'],['contact','Contact']].forEach(function(s){L.push({t:'Aller à '+s[1],k:'Navigation',f:function(){var a=document.querySelector('nav a[href="#'+s[0]+'"]');if(a)a.click()}})});
P.forEach(function(p,i){L.push({t:p.n,k:'Projet',f:function(){openP(i)}})});
BP.forEach(function(p,i){L.push({t:p.t,k:'Article',f:function(){openB(i)}})});
L.push({t:window.on?'Couper le son':'Activer le son',k:'Action',f:function(){var s=document.getElementById('snd');if(s&&s.style.display!=='none')s.click()}});
L.push({t:'Copier mon e-mail',k:'Action',f:function(){var m=((document.querySelector('.links a')||{}).href||'').replace('mailto:','');try{navigator.clipboard.writeText(m);flash('E-MAIL COPIÉ')}catch(e){flash(m)}}});

L.push({t:'Mode fête',k:'Surprise',f:party});L.push({t:window.LANG==='en'?'Switch to French':'Passer en anglais',k:'Action',f:function(){setLang(window.LANG==='en'?'fr':'en')}});L.push({t:window.CALM?'Réactiver les effets':'Réduire les effets',k:'Action',f:function(){setCalm(!window.CALM)}});L.push({t:'Parler à Zéo, le bot IA',k:'Action',f:function(){window.zeoOpen&&zeoOpen()}});
return L}
function draw2(){var q=norm(inp.value).split(/\s+/).filter(Boolean);
items=build().filter(function(x){var t=norm(x.t+' '+x.k+' '+(window.trs?trs(x.t)+' '+trs(x.k):''));return q.every(function(z){return t.indexOf(z)>-1})}).slice(0,9);if(sel>=items.length)sel=0;
ul.innerHTML=items.map(function(x,i){return '<li class="'+(i===sel?'on':'')+'" data-i="'+i+'"><span>'+E(x.t)+'</span><small>'+x.k+'</small></li>'}).join('')||'<li><span>Aucun résultat</span></li>'}
function popen(){pl.classList.add('open');inp.value='';sel=0;draw2();setTimeout(function(){inp.focus()},30);sfx.hover()}
function pclose(){pl.classList.remove('open')}
function run(i){var x=items[i];if(!x)return;pclose();x.f()}
inp.addEventListener('input',function(){sel=0;draw2()});
inp.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,items.length-1);draw2()}else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0);draw2()}else if(e.key==='Enter'){run(sel)}else if(e.key==='Escape'){pclose()}});
ul.addEventListener('click',function(e){var l=e.target.closest('li[data-i]');if(l)run(+l.dataset.i)});
pl.addEventListener('click',function(e){if(e.target===pl)pclose()});
document.getElementById('palbtn').addEventListener('click',function(){pl.classList.contains('open')?pclose():popen()});
addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'&&document.body.classList.contains('sh-pal')){e.preventDefault();pl.classList.contains('open')?pclose():popen()}});
})();

(function(){
var $=function(s,r){return(r||document).querySelector(s)};
var SVG="<svg viewBox='0 0 80 90'><ellipse cx='40' cy='86' rx='20' ry='3.5' fill='rgba(0,0,0,.4)'/><line x1='40' y1='9' x2='40' y2='20' stroke='#000' stroke-width='3'/><circle class='an' cx='40' cy='6' r='5' fill='#fff' stroke='#000' stroke-width='2.5'/><circle cx='40' cy='48' r='32' fill='#e60012' stroke='#000' stroke-width='4' style='fill:var(--red)'/><path d='M16 38 Q40 20 64 38' fill='none' stroke='rgba(255,255,255,.4)' stroke-width='4' stroke-linecap='round'/><path d='M8 50 Q1 55 8 62M72 50 Q79 55 72 62' stroke='#000' stroke-width='4' fill='none' stroke-linecap='round'/><rect x='16' y='35' width='48' height='23' rx='11.5' fill='#000'/><circle class='eye' cx='30' cy='46.5' r='7' fill='#fff'/><circle class='eye' cx='50' cy='46.5' r='7' fill='#fff'/><circle class='pp' cx='30' cy='46.5' r='3.2' fill='#000'/><circle class='pp' cx='50' cy='46.5' r='3.2' fill='#000'/><rect class='mo' x='33' y='66' width='14' height='4' rx='2' fill='#000'/></svg>";
var z=document.createElement('div');z.id='zeo';
z.innerHTML="<div class='zbox'><div class='zr'></div><div class='zr' style='animation-delay:.6s'></div><div class='zb'></div><button class='zbody' aria-label='Parler à Zéo'>"+SVG+"</button></div>";
document.body.appendChild(z);
var box=$('.zbox',z),body=$('.zbody',z),bub=$('.zb',z),pp=z.querySelectorAll('.pp');
var pn=document.createElement('div');pn.id='zp';
pn.innerHTML="<div class='zh'><b>ZÉO</b><small>bot IA vocal</small><button id='zg' title='Réglages de la voix' aria-label='Réglages de la voix'>⚙</button><button id='zv' title='Voix' aria-label='Activer ou couper la voix'>🔊</button><button id='zx' aria-label='Fermer'>✕</button></div><div id='zset'><label>Voix <select id='zsv'></select></label><label>Vitesse <input id='zsr' type='range' min='.8' max='1.3' step='.05'></label><label>Hauteur <input id='zsp' type='range' min='.8' max='1.6' step='.05'></label><button id='zst'>Tester la voix</button></div><div id='zl'></div><div class='zc'></div><div class='zi'><input id='zin' placeholder='Écris ou parle…' autocomplete='off' aria-label='Commande'><button id='zm' aria-label='Parler'>🎤</button><button id='zs' aria-label='Envoyer'>➤</button></div>";
document.body.appendChild(pn);
var zl=$('#zl'),inp=$('#zin'),mic=$('#zm'),zv=$('#zv');
['Résume les projets','Qui es-tu ?','Qui est Eucher ?','Ses compétences','Va dans le blog','Raconte une blague'].forEach(function(t){var b=document.createElement('button');b.textContent=t;b.onclick=function(){go(t)};$('.zc',pn).appendChild(b)});
var VOICE=false,sv=null;try{sv=localStorage.getItem('ea_zeo_voice');if(sv!==null)VOICE=sv==='1'}catch(e){}
var VS={v:'',r:1.05,p:1.2},PACK=true;try{var t0=JSON.parse(localStorage.getItem('ea_zeo_vs'));if(t0)VS=Object.assign(VS,t0)}catch(e){}
function h32(s){var h=5381;for(var i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return(h>>>0).toString(36)}
function setVoice(v){VOICE=v;zv.textContent=v?'🔊':'🔇';try{localStorage.setItem('ea_zeo_voice',v?'1':'0')}catch(e){}if(!v)stopSpeak()}
zv.textContent=VOICE?'🔊':'🔇';zv.onclick=function(){setVoice(!VOICE)};
var zs=$('#zset'),zsv=$('#zsv'),zsr=$('#zsr'),zsp=$('#zsp');
function fillV(){var vs=(window.speechSynthesis&&speechSynthesis.getVoices()||[]).filter(function(x){return/^fr/i.test(x.lang)});zsv.innerHTML=vs.map(function(x){return '<option value="'+x.voiceURI+'"'+(x.voiceURI===VS.v?' selected':'')+'>'+x.name+' ('+x.lang+')</option>'}).join('')||'<option value="">Voix par défaut</option>'}
if(window.speechSynthesis){fillV();speechSynthesis.onvoiceschanged=fillV}
zsr.value=VS.r;zsp.value=VS.p;
function saveVS(){VS.v=zsv.value;VS.r=+zsr.value;VS.p=+zsp.value;try{localStorage.setItem('ea_zeo_vs',JSON.stringify(VS))}catch(e){}}
[zsv,zsr,zsp].forEach(function(e){e.addEventListener('input',saveVS)});
$('#zg').onclick=function(){zs.classList.toggle('on')};
$('#zst').onclick=function(){if(!VOICE)setVoice(true);say('Salut, voici ma voix. Qu’en penses-tu ?')};
var bx=innerWidth-90,by=innerHeight-170,tx=bx,ty=by,vx=0,vy=0,face=1,hold=false,ht=0,nextMove=Date.now()+2500,mx=bx,my=by,st='idle',lastAct=Date.now(),lastHint=Date.now(),hints=0,rec=null,tid=0,greeted=false,bt2=0;
var HINTS=['Psst… dis-moi « résume les projets » !','Clique sur moi pour me parler !','Essaie : « ouvre ZemPro ».'];
function setSt(s){st=s;['listen','talk','think','sleep'].forEach(function(c){z.classList.toggle(c,s===c)})}
function bubble(t,ms){bub.textContent=t.length>120?t.slice(0,117)+'…':t;bub.classList.add('on');clearTimeout(bt2);bt2=setTimeout(function(){bub.classList.remove('on')},ms||Math.max(3500,t.length*60))}
function logm(w,t){var d=document.createElement('div');d.className='m '+w;d.textContent=t;zl.appendChild(d);while(zl.children.length>14)zl.removeChild(zl.firstChild);zl.scrollTop=zl.scrollHeight}
function duck(v){try{if(window.master)master.gain.value=v?.12:.5}catch(e){}}
function stopSpeak(){try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}
function say(text,cb,quiet){lastAct=Date.now();if(window.LANG==='en')text=trs(text);if(st==='sleep')setSt('idle');logm('bot',text);bubble(text);
var done=false,tm,clean=text.replace(/[«»]/g,'').replace(/·/g,',').replace(/&/g,' et '),voc=VOICE&&!quiet&&window.speechSynthesis;
function fin(){if(done)return;done=true;clearTimeout(tm);if(st==='talk')setSt('idle');duck(false);hold=false;if(cb)cb()}
var ttsd=false;function tts(){if(ttsd)return;ttsd=true;if(!voc){setSt('talk');return}try{speechSynthesis.cancel();var lg=window.LANG==='en'?'en':'fr',u=new SpeechSynthesisUtterance(clean),vs=speechSynthesis.getVoices()||[],v=vs.filter(function(x){return x.voiceURI===VS.v&&x.lang.slice(0,2).toLowerCase()===lg})[0]||vs.filter(function(x){return x.lang.slice(0,2).toLowerCase()===lg})[0];u.lang=lg==='en'?'en-US':'fr-FR';if(v)u.voice=v;u.rate=VS.r;u.pitch=VS.p;u.onstart=function(){setSt('talk');duck(true)};u.onend=u.onerror=fin;speechSynthesis.speak(u)}catch(e){}}
if(PACK&&VOICE&&!quiet&&window.LANG!=='en'){try{var au=new Audio('assets/voix/v'+h32(clean)+'.mp3');au.onplay=function(){setSt('talk');duck(true)};au.onended=fin;au.onerror=tts;au.play().catch(tts)}catch(e){tts()}}else tts();
tm=setTimeout(fin,Math.max(2200,clean.length*(voc?95:45)+1200))}
function pick(){var m=60;tx=m+Math.random()*Math.max(10,innerWidth-2*m);ty=110+Math.random()*Math.max(10,innerHeight-260)}
function goNear(el){var r=el.getBoundingClientRect(),left=r.left>110;tx=left?r.left-55:Math.min(r.right+55,innerWidth-50);ty=Math.max(110,Math.min(innerHeight-120,r.top+r.height/2));hold=true;clearTimeout(ht);ht=setTimeout(function(){hold=false},9000)}
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
(function loop(){var t=Date.now();
if(st==='sleep'){tx=innerWidth-70;ty=innerHeight-110}
else if(st==='listen'&&pn.classList.contains('open')){var r=pn.getBoundingClientRect();tx=r.right-30;ty=r.top-60}
else if(!hold&&t>nextMove){pick();nextMove=t+3500+Math.random()*4500}
vx+=(tx-bx)*.0017;vy+=(ty-by)*.0017;vx*=.93;vy*=.93;bx+=vx;by+=vy;if(Math.abs(vx)>.25)face=vx>0?1:-1;
box.style.translate=(bx-36)+'px '+(by-40+Math.sin(t/380)*6)+'px';
body.style.transform='rotate('+Math.max(-14,Math.min(14,vx*2.4))+'deg) scaleX('+face+')';
var dx=mx-bx,dy=my-by,d=Math.hypot(dx,dy)||1,k=Math.min(3,d/40);
pp.forEach(function(p){p.style.translate=(dx/d*k*face)+'px '+(dy/d*k)+'px'});
bub.classList.toggle('rt',bx>innerWidth*.55);bub.classList.toggle('dn2',by<150);
if(st==='idle'&&t-lastAct>25000){setSt('sleep');bubble('Zzz…',4000)}
if(st==='idle'&&hints<3&&t-lastHint>14000&&!pn.classList.contains('open')){bubble(HINTS[hints++],4500);lastHint=t}
requestAnimationFrame(loop)})();
function nz(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ')}
function nav(id){var a=$('nav a[href="#'+id+'"]');if(a)a.click()}
function setSnd(v){var b=document.getElementById('snd');if(b&&b.style.display!=='none'&&!!window.on!==v)b.click()}
function pr(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){}return(d&&d.profile)||{nom:'Eucher ABATTI',titre:'Développeur Full Stack Web et Mobile',bio:'',email:''}}
function top(n){return S2.map(function(s,i){return{n:s,l:LV[i]}}).sort(function(a,b){return b.l-a.l}).slice(0,n).map(function(x){return x.n})}
var ORD=['Premier','Deuxième','Troisième','Quatrième','Cinquième','Sixième','Septième','Huitième'];
function sumP(p,i,full){var f=p.f&&p.f[0]!=='Détails à venir'?' Fonctions clés : '+p.f.slice(0,3).join(', ')+'.':'';return (full?p.n+'. '+p.long:ORD[i]+' projet : '+p.n+'. '+p.d.replace(/\.?$/,'.'))+f+' Technologies : '+p.t.slice(0,4).join(', ')+'.'}
function resetF(){var b=$('#filters button[data-f="all"]');if(b&&!b.classList.contains('on'))b.click()}
function tour(){var my=++tid;resetF();nav('projects');
say('Allons voir les projets d’Eucher !',function(){step(0)});
function step(i){if(my!==tid)return;if(i>=P.length){say('Voilà, c’est la fin du tour ! Dis « ouvre » suivi du nom d’un projet pour voir son détail.');return}
var c=document.querySelectorAll('#grid .card')[i];if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('zeo-hl');setTimeout(function(){goNear(c)},500)}
say(sumP(P[i],i),function(){if(c)c.classList.remove('zeo-hl');setTimeout(function(){step(i+1)},400)})}}
function showP(i,open){resetF();nav('projects');if(open)setTimeout(function(){openP(i)},800);say(sumP(P[i],i,true))}
var JOKES=['Pourquoi les développeurs préfèrent le mode sombre ? Parce que la lumière attire les bugs !','Il y a 10 types de personnes : celles qui comprennent le binaire, et les autres.','Pourquoi le développeur est-il malheureux ? Parce qu’il a trop de problèmes et pas assez de solutions.'];
var ME='Je suis Zéo, un petit bot IA qui vit dans le portfolio d’Eucher. Je me balade à ma guise, je comprends tes commandes vocales ou écrites, et je peux t’emmener dans une section, ouvrir et résumer ses projets, ou te parler de lui. Pose-moi aussi une question libre !';
var HELP='Voici ce que je sais faire : résumer les projets, ouvrir un projet, par exemple « ouvre ZemPro », t’emmener dans une section, te présenter Eucher et ses compétences, lire le dernier article, couper ou activer le son, ou te raconter une blague.';
var SECS=[['home','l’accueil',/accueil|haut|debut|home/],['projects','les projets',/projet|realisation/],['skills','les compétences',/competence/],['about','la section à propos',/propos|biographie/],['blog','le blog',/blog|article/],['shop','la boutique',/boutique|marketplace|shop/],['contact','le contact',/contact/]];
function ctx(){var p=pr();return JSON.stringify({nom:p.nom,titre:p.titre,a_propos:p.bio,projets:P.map(function(x){return{nom:x.n,categorie:x.cat,description:x.d,details:x.long,fonctions:x.f,technologies:x.t}}),competences:S2,articles:BP.map(function(b){return b.t})})}
function askAI(q){return(window.claude&&claude.use?claude.use('sample'):Promise.resolve(null)).then(function(s){if(!s)throw{code:'none'};return s('Tu es Zéo, l’assistant vocal du portfolio d’Eucher ABATTI. Réponds en '+(window.LANG==='en'?'anglais':'français')+', en 2 à 3 phrases courtes, ton chaleureux, sans markdown, sans liste, sans emoji. Appuie-toi uniquement sur les données JSON ci-dessous. Si l’information n’y figure pas, dis-le simplement et propose de contacter Eucher. N’invente rien.\nDONNÉES : '+ctx()+'\nQUESTION : '+q,{modelTier:'quick'})}).then(function(r){return String(r.text||'').trim()})}
function go(raw){raw=String(raw||'').trim();if(!raw)return;openPanel();logm('me',raw);lastAct=Date.now();var q=nz(raw);if(window.LANG==='en')q=en2fr(q);var my=++tid,has=function(r){return r.test(q)},pi=-1;
P.forEach(function(p,i){if(pi<0&&q.indexOf(nz(p.n))>-1)pi=i});
if(has(/(^| )(stop|tais toi|silence|arrete toi|ca suffit)( |$)/)&&!has(/son|musique/)){stopSpeak();setSt('idle');return say('D’accord, je me tais.',null,true)}
if(has(/(parle|passe|traduis|mets|switch|speak|change|translate|talk).*(anglais|english)/)){setLang('en');return say('Switching to English. How can I help?')}
if(has(/(parle|passe|traduis|mets|switch|speak|change|translate|talk).*(francais|french)/)){setLang('fr');return say('Je passe en français !')}
if(has(/aide|que sais tu|que peux tu|commandes|capable/))return say(HELP);
if(has(/qui es tu|tu es qui|ton nom|comment t appelles|presente toi|t es qui/))return say(ME);
if(has(/blague|drole|rigol/))return say(JOKES[Math.floor(Math.random()*JOKES.length)]);
if(has(/fete|surprise|konami|danse/)){window.party&&party();return say('C’est la fête !')}
if(has(/(coupe|arrete|eteins|desactive).*(son|musique)/)){setSnd(false);return say('Son coupé.')}
if(has(/(active|mets|lance|allume|remets).*(son|musique)/)){setSnd(true);return say('Son activé.')}
if(has(/(resum|presente|parle|fais moi|tour|montre|explique|decris|raconte|liste).*(projets|realisations)/)&&pi<0||has(/tour des projets/))return tour();
if(pi>-1&&has(/resum|presente|parle|explique|decris|raconte|c est quoi|ouvre|montre|detail|affiche/))return showP(pi,has(/ouvre|montre|detail|affiche/));
if(has(/(qui est|parle moi d|presente|decris|raconte).*(eucher|abatti|il|lui|createur|developpeur)|qui a cree/)){var p=pr();return say(p.nom+', '+p.titre+'. Ses technologies phares : '+top(3).join(', ')+'. Il a notamment réalisé '+P.map(function(x){return x.n}).join(', ')+'. Pour le contacter, rendez-vous dans la section contact.')}
var nv=has(/(^| )(va|vas|aller|emmene|retourne|direction|ouvre|affiche|montre|descends|monte)( |$)/);
if(!nv&&has(/boutique|marketplace|vendre|a vendre|acheter|achat/)){nav('shop');return say(BS.length?'Dans la boutique, tu peux trouver : '+BS.map(function(x){return x.n}).join(', ')+'.':'La boutique ouvre bientôt !')}
if(has(/(^| )(don|dons|soutenir|soutien)( |$)/)){nav('shop');return say('Merci ! Les dons se font depuis la fiche d’un projet ou depuis la boutique.')}
if(nv)for(var s=0;s<SECS.length;s++)if(SECS[s][2].test(q)){nav(SECS[s][0]);return say('Direction '+SECS[s][1]+' !')}
if(has(/competence|technologie|sait faire|stack|langage|maitrise/))return say('Ses compétences les plus solides : '+top(5).join(', ')+'. Il en maîtrise '+S2.length+' au total.');
if(has(/dernier article|dernier post|dernier blog|lis .*article/)&&BP[0]){openB(0);return say('Dernier article : '+BP[0].t+'. '+BP[0].ex)}
if(has(/contact|joindre|email|mail|ecrire|embauch|recrut|collabor/)){nav('contact');return say('Tu peux écrire à Eucher par e-mail, ou via LinkedIn et GitHub. Je t’emmène à la section contact.')}
if(has(/^(bonjour|salut|coucou|hello|hey)/))return say('Salut ! Je suis Zéo. Demande-moi de résumer les projets !');
if(has(/merci/))return say('Avec plaisir !');
setSt('think');bubble('Je réfléchis…',9000);
askAI(raw).then(function(t){if(my===tid&&t)say(t);else setSt('idle')}).catch(function(){setSt('idle');say('Je n’ai pas compris. Essaie : « résume les projets », « ouvre ZemPro », « qui es-tu ? » ou « va dans le blog ».')})}
function listen(){var SR=window.SpeechRecognition||window.webkitSpeechRecognition;openPanel();
if(!SR)return say('Ton navigateur ne gère pas la reconnaissance vocale. Écris-moi ta commande, je la comprendrai aussi !',null,true);
if(rec){try{rec.stop()}catch(e){}return}
stopSpeak();rec=new SR();rec.lang=window.LANG==='en'?'en-US':'fr-FR';rec.interimResults=true;rec.continuous=false;var fin2='';
rec.onstart=function(){setSt('listen');bubble('Je t’écoute…',9000);mic.classList.add('on')};
rec.onresult=function(e){var t='';for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;inp.value=t;fin2=e.results[e.results.length-1].isFinal?t:''};
rec.onerror=function(e){rec=null;mic.classList.remove('on');setSt('idle');say(e.error==='not-allowed'||e.error==='service-not-allowed'?'Je n’ai pas accès au micro. Autorise-le dans ton navigateur, ou écris-moi ta commande.':e.error==='no-speech'?'Je n’ai rien entendu. Réessaie !':'La voix ne marche pas ici ('+e.error+'). Écris-moi ta commande.',null,true)};
rec.onend=function(){rec=null;mic.classList.remove('on');if(st==='listen')setSt('idle');if(fin2){inp.value='';go(fin2)}};
try{rec.start()}catch(e){rec=null}}
function openPanel(){if(!pn.classList.contains('open')){pn.classList.add('open');if(!zl.children.length)logm('bot','Salut, je suis Zéo, le bot IA du portfolio ! Tape une commande ou appuie sur 🎤 et parle-moi.')}}
function closePanel(){pn.classList.remove('open');if(rec)try{rec.stop()}catch(e){}}
window.zeoLines=function(){var p=pr(),L=[ME,HELP,'Allons voir les projets d’Eucher !','Voilà, c’est la fin du tour ! Dis « ouvre » suivi du nom d’un projet pour voir son détail.','D’accord, je me tais.','Salut, je suis Zéo, le bot du portfolio d’Eucher. Clique sur moi et demande-moi de résumer ses projets !','Salut ! Je suis Zéo. Demande-moi de résumer les projets !','Avec plaisir !','C’est la fête !','Son coupé.','Son activé.','Salut, voici ma voix. Qu’en penses-tu ?','Tu peux écrire à Eucher par e-mail, ou via LinkedIn et GitHub. Je t’emmène à la section contact.','Ses compétences les plus solides : '+top(5).join(', ')+'. Il en maîtrise '+S2.length+' au total.',p.nom+', '+p.titre+'. Ses technologies phares : '+top(3).join(', ')+'. Il a notamment réalisé '+P.map(function(x){return x.n}).join(', ')+'. Pour le contacter, rendez-vous dans la section contact.'].concat(JOKES);SECS.forEach(function(s){L.push('Direction '+s[1]+' !')});P.forEach(function(x,i){L.push(sumP(x,i),sumP(x,i,true))});return L};
window.zeoOpen=openPanel;
body.addEventListener('click',function(){lastAct=Date.now();if(st==='sleep'){setSt('idle');bubble('Hein ? Je suis réveillé !',3000)}pn.classList.contains('open')?closePanel():openPanel()});
$('#zx').onclick=closePanel;mic.onclick=listen;$('#zs').onclick=function(){var t=inp.value;inp.value='';go(t)};
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){var t=inp.value;inp.value='';go(t)}});
function greet(sp){if(greeted)return;greeted=true;if(sp&&sv===null)VOICE=!!window.on;zv.textContent=VOICE?'🔊':'🔇';
if(sp&&VOICE)say('Salut, je suis Zéo, le bot du portfolio d’Eucher. Clique sur moi et demande-moi de résumer ses projets !');else bubble('Salut, je suis Zéo ! Clique sur moi pour me parler.',6000)}
var ib=document.querySelectorAll('#intro .btn');
if(ib.length)ib.forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){greet(true)},1100)})});else setTimeout(function(){greet(false)},900);
})();

/* ============ Traduction FR / EN ============ */
var LANG='fr';
var D18={
'Accueil':'Home','Projets':'Projects','Compétences':'Skills','À propos':'About','Boutique':'Shop',
'Développeur':'Developer','Développeur Full Stack':'Full Stack Developer','Développeur Full Stack Web et Mobile':'Full Stack Web and Mobile Developer',
'Passionné par le code, l’innovation et les nouvelles technologies.':'Passionate about code, innovation and new technologies.',
'Explorer mon univers →':'Explore my world →','Me contacter':'Contact me','Innovation numérique':'Digital innovation',
'Entrer avec le son ♪':'Enter with sound ♪','Entrer sans le son':'Enter without sound',
'♪ SON : OFF':'♪ SOUND: OFF','♪ SON : ON':'♪ SOUND: ON',
'NUIT':'NIGHT','MATIN':'MORNING','APRÈS-MIDI':'AFTERNOON','SOIR':'EVENING','LUN':'MON','MAR':'TUE','MER':'WED','JEU':'THU','VEN':'FRI','SAM':'SAT','DIM':'SUN',
'Mes Projets':'My Projects','Des missions accomplies, un objectif : créer. Chaque projet est une nouvelle aventure.':'Missions accomplished, one goal: to create. Every project is a new adventure.',
'Tous':'All','IA':'AI','aperçu':'preview','Voir le projet':'View project','Bientôt de nouvelles missions…':'New missions coming soon…',
'Rôle':'Role','Statut':'Status','Secteur':'Sector','Le projet':'The project','Fonctionnalités clés':'Key features',
'Base relationnelle':'Relational database','Web · Mobile':'Web · Mobile','IA · Web · Mobile':'AI · Web · Mobile',
'LIVRET NUMÉRIQUE':'DIGITAL BOOKLET','SIMULATEUR DE CODE':'THEORY SIMULATOR','DIPLÔME':'DIPLOMA','CERTIFIÉ':'CERTIFIED',
'Mes Compétences':'My Skills','Un ensemble d’outils pour donner vie à mes idées.':'A toolkit to bring my ideas to life.','Compétences = Possibilités':'Skills = Possibilities',
'À propos de moi':'About me',
'Chaque produit commence par une question : à quel problème répond-il ?':'Every product starts with a question: what problem does it solve?','Curieux':'Curious','Créatif':'Creative','Déterminé':'Determined','Passionné':'Passionate','En savoir plus →':'Learn more →',
'Mon Blog':'My Blog','Notes, tutoriels et retours d’expérience.':'Notes, tutorials and lessons learned.','Lire l’article':'Read article','Les premiers articles arrivent bientôt…':'The first articles are coming soon…','Carrière':'Career',
'développement':'development','Bénin':'Benin','bonnes pratiques':'best practices',
'Mes animations, templates et codes sources, prêts à utiliser dans vos projets.':'My animations, templates and source codes, ready to use in your projects.',
'Code source':'Source code','Projet':'Project','Voir le détail':'View details','Payer':'Pay','Demander un devis':'Request a quote','Prix sur demande':'Price on request',
'Contenu':'Included','Licence':'License','Paiement':'Payment',
'Vous serez redirigé vers une page de paiement sécurisée. Une question ?':'You will be redirected to a secure payment page. Any questions?','Contactez-moi':'Contact me',
'La boutique ouvre bientôt':'The shop opens soon','Des animations, des templates et des codes sources arrivent. Une idée ou une commande sur mesure ?':'Animations, templates and source codes are on their way. Have an idea or a custom order?',
'Tu vas être redirigé vers la page de paiement sécurisée, où vous pourrez payer par Mobile Money ou par carte selon la plateforme.':'You will be redirected to the secure payment page, where you can pay by Mobile Money or card depending on the platform.',
'Payer maintenant →':'Pay now →','Une fois le paiement effectué, contactez-moi avec votre preuve de paiement pour recevoir votre produit.':'Once the payment is made, contact me with your proof of payment to receive your product.',
'Le paiement en ligne n’est pas encore ouvert pour ce produit. Envoyez votre commande : je vous réponds avec les modalités de paiement (Mobile Money ou carte).':'Online payment is not open yet for this product. Send your order and I will reply with the payment options (Mobile Money or card).',
'Nom complet':'Full name','E-mail':'Email','Téléphone ou WhatsApp':'Phone or WhatsApp','Message (optionnel)':'Message (optional)',
'Envoyer ma commande par e-mail →':'Send my order by email →','Commander sur WhatsApp →':'Order on WhatsApp →','Indiquez votre nom et un e-mail ou un téléphone.':'Please enter your name and an email or phone number.',
'Soutiens mes projets':'Support my projects','Ce que je crée vous plaît ? Un petit don m’aide à continuer et à publier de nouveaux projets.':'Like what I create? A small donation helps me keep going and publish new projects.',
'Soutenir ce projet':'Support this project','Ce projet vous plaît ? Un petit don m’aide à le faire évoluer.':'Like this project? A small donation helps me improve it.','Faire un don →':'Donate →',
'Me Contacter':'Contact Me','Une idée ? Un projet ? Parlons-en !':'An idea? A project? Let’s talk!','CARTE DE VISITE':'BUSINESS CARD','Envoyer un message →':'Send a message →',
'Que cherches-tu ? (Échap pour fermer)':'What are you looking for? (Esc to close)','Navigation':'Navigation','Article':'Article','Action':'Action','Surprise':'Surprise',
'Couper le son':'Turn sound off','Activer le son':'Turn sound on','Copier mon e-mail':'Copy my email','Ouvrir l’espace admin':'Open admin area','Mode fête':'Party mode','Parler à Zéo, le bot IA':'Talk to Zéo, the AI bot','Aucun résultat':'No results','Passer en anglais':'Switch to English',
'Ouvrir':'Open','Go !':'Go!','Clique !':'Click!','Son ♪':'Sound ♪','Niveau !':'Level!','Incline-moi':'Tilt me','Parle-moi':'Talk to me','Clic !':'Click!',
'E-MAIL COPIÉ':'EMAIL COPIED','★ MODE FÊTE ★':'★ PARTY MODE ★',
'Bientôt de retour':'Back soon','Portfolio hors ligne':'Portfolio offline','Le site est momentanément indisponible.':'The site is temporarily unavailable.','Espace admin':'Admin area',
'bot IA vocal':'AI voice bot','Voix':'Voice','Vitesse':'Speed','Hauteur':'Pitch','Tester la voix':'Test voice','Voix par défaut':'Default voice','Écris ou parle…':'Type or speak…',
'Résume les projets':'Summarize the projects','Qui es-tu ?':'Who are you?','Qui est Eucher ?':'Who is Eucher?','Ses compétences':'His skills','Va dans le blog':'Go to the blog','Raconte une blague':'Tell me a joke',
'Parler à Zéo':'Talk to Zéo','Activer ou couper la voix':'Turn voice on or off','Fermer':'Close','Commande':'Command','Parler':'Speak','Envoyer':'Send','Réglages de la voix':'Voice settings','Palette de commandes':'Command palette','Rechercher':'Search',
'Salut, je suis Zéo, le bot IA du portfolio ! Tape une commande ou appuie sur 🎤 et parle-moi.':'Hi, I’m Zéo, the portfolio’s AI bot! Type a command or press 🎤 and talk to me.',
'Salut, je suis Zéo ! Clique sur moi pour me parler.':'Hi, I’m Zéo! Click me to talk.',
'Psst… dis-moi « résume les projets » !':'Psst… tell me “summarize the projects”!','Clique sur moi pour me parler !':'Click me to talk to me!','Essaie : « ouvre ZemPro ».':'Try: “open ZemPro”.',
'Hein ? Je suis réveillé !':'Huh? I’m awake!','Je t’écoute…':'I’m listening…','Je réfléchis…':'Thinking…',
'Je n’ai pas compris. Essaie : « résume les projets », « ouvre ZemPro », « qui es-tu ? » ou « va dans le blog ».':'I didn’t get that. Try: “summarize the projects”, “open ZemPro”, “who are you?” or “go to the blog”.',
'Ton navigateur ne gère pas la reconnaissance vocale. Écris-moi ta commande, je la comprendrai aussi !':'Your browser doesn’t support voice recognition. Type your command, I’ll understand that too!',
'Je n’ai pas accès au micro. Autorise-le dans ton navigateur, ou écris-moi ta commande.':'I can’t access the microphone. Allow it in your browser, or type your command.',
'Je n’ai rien entendu. Réessaie !':'I didn’t hear anything. Try again!',
'Merci ! Les dons se font depuis la fiche d’un projet ou depuis la boutique.':'Thank you! Donations can be made from a project page or from the shop.','La boutique ouvre bientôt !':'The shop opens soon!',
'Je passe en français !':'Switching to French!',
'Premier projet : ':'First project: ','Deuxième projet : ':'Second project: ','Troisième projet : ':'Third project: ','Quatrième projet : ':'Fourth project: ','Cinquième projet : ':'Fifth project: ','Sixième projet : ':'Sixth project: ',
' Fonctions clés : ':' Key features: ',' Technologies : ':' Technologies: ','Dernier article : ':'Latest article: ',
'Ses compétences les plus solides : ':'His strongest skills: ','Ses technologies phares : ':'His flagship technologies: ','Il a notamment réalisé ':'He has notably built ','Pour le contacter, rendez-vous dans la section contact.':'To contact him, head to the contact section.',
'l’accueil':'the home page','les projets':'the projects','les compétences':'the skills','la section à propos':'the About section','le blog':'the blog','la boutique':'the shop','le contact':'the contact section',
'Ce que je propose':'What I offer','Des solutions sur mesure, du prototype à la mise en ligne.':'Tailor-made solutions, from prototype to launch.','Sites et applications web':'Websites and web applications','Sites vitrines, plateformes et applications métier avec Laravel et React.':'Showcase sites, platforms and business applications built with Laravel and React.','Applications mobiles':'Mobile applications','Des applications pensées mobile-first, rapides et utilisables hors connexion.':'Mobile-first applications that are fast and usable offline.','API et back-office':'APIs and back-office','Des API robustes et des tableaux de bord pour piloter votre activité.':'Robust APIs and dashboards to run your business.','Conseil et accompagnement':'Consulting and support','Cadrage de projet, choix techniques et revue de code pour avancer en confiance.':'Project scoping, technical choices and code reviews to move forward with confidence.','Ma façon de travailler':'How I work','Échange':'Discussion','Je comprends votre besoin et vos objectifs.':'I understand your needs and goals.','Conception':'Design','Maquettes, choix techniques et cahier des charges.':'Mockups, technical choices and specifications.','Développement':'Development','Des livraisons régulières, que vous validez à chaque étape.':'Regular deliveries that you validate at each step.','Mise en ligne':'Launch','Déploiement, formation et suivi après livraison.':'Deployment, training and post-delivery support.','Démarrer un projet →':'Start a project →','Démarrer un projet':'Start a project','Décrivez votre besoin, je vous réponds par e-mail.':'Describe your needs and I will reply by email.','Type de projet':'Project type','Site web':'Website','Application web':'Web application','Application mobile':'Mobile app','API / back-office':'API / back-office','Conseil':'Consulting','Autre':'Other','Budget estimé (optionnel)':'Estimated budget (optional)','Délai souhaité (optionnel)':'Desired timeline (optional)','Votre message':'Your message','Envoyer ma demande →':'Send my request →','Indiquez votre nom et un e-mail.':'Please enter your name and an email.','Mon CV (PDF)':'My CV (PDF)','Imprimer / PDF':'Print / PDF','Fermer le CV':'Close CV','Astuce : Ctrl + P puis « Enregistrer au format PDF ».':'Tip: press Ctrl + P, then “Save as PDF”.','Profil':'Profile','Compétences clés':'Key skills','Technologies :':'Technologies:','🔒 Connexion':'🔒 Sign in','● Disponible pour de nouvelles missions':'● Available for new projects','Aller au contenu':'Skip to content',
'Entrer sans son':'Enter without sound','Entrer en mode sobre':'Enter in calm mode','Réduire les effets':'Reduce effects','Réactiver les effets':'Restore effects','Glisse pour tourner':'Drag to rotate','Voir mon CV':'View my CV','Détails à venir':'Details coming soon','Projet publié':'Published project','Eucher ABATTI — Développeur Full Stack':'Eucher ABATTI — Full Stack Developer','Eucher ABATTI | Développeur Full Stack':'Eucher ABATTI | Full Stack Developer'
};
function pair(fr,en){if(typeof fr==='string'){D18[fr]=en}else fr.forEach(function(x,i){if(en[i]!==undefined)D18[x]=en[i]})}
(function(){var R=RICH,S=SEED_POSTS,P2=SEED_SHOP;
var pj={'CodeDrive':[['Le permis de conduire numérique pour le Bénin','Conception et dossier de candidature','Candidature au Prix National de la Simplification Administrative 2026','Travaux publics et Transports (ANATT)','Hub numérique et application mobile-first qui dématérialise tout le parcours d’apprentissage du permis de conduire au Bénin. Il s’intègre en amont du système SIGPCB de l’ANATT et met fin aux registres papier.'],['The digital driving licence for Benin','Design and application file','Application to the 2026 National Administrative Simplification Award','Public works and transport (ANATT)','A digital hub and mobile-first app that moves the whole driving-licence learning journey online in Benin. It plugs in upstream of ANATT’s SIGPCB system and ends paper registers.'],['Certified digital booklet with QR code','Marketplace of approved driving schools','Digital student enrolment','Theory-test simulator with a predictive success algorithm','Anonymous citizen reviews of driving schools with a public ranking','ANATT dashboard with a readiness index']],
'ZemPro':[['La plateforme des conducteurs de taxi-moto (Zémidjan)','Mobilité urbaine et Smart City','Plateforme numérique qui professionnalise les conducteurs de taxi-moto et de taxis urbains au Bénin, en simplifiant leurs démarches et en renforçant la confiance des usagers.'],['The platform for motorbike-taxi drivers (Zémidjan)','Urban mobility and Smart City','A digital platform that professionalises motorbike-taxi and city-taxi drivers in Benin, simplifying their paperwork and strengthening user trust.'],['Professional card with QR code','Police checks','Municipal taxes','Digital tontine (savings circle)','Smart City alerts','Citizen reviews','SOS button']],
'CertiDiplôme BJ':[['Authentification et équivalence des diplômes','Porteur du projet','Éducation et administration','Plateforme qui authentifie les diplômes au Bénin et facilite leur équivalence, pour des démarches plus rapides et des documents infalsifiables.'],['Diploma authentication and equivalence','Project owner','Education and administration','A platform that authenticates diplomas in Benin and simplifies their equivalence, for faster procedures and tamper-proof documents.'],['QR-code authentication','Identification via NPI / ANIP','ECTS and GPA grade conversion','Instant verification by employers and schools']],
'Kiffa-Agro IA':[['Le diagnostic des maladies des plantes par l’IA','Développeur frontend et responsable du frontend','Candidature au SAHAL TECH INNOVATION CHALLENGE 2026','Application AgriTech qui diagnostique les maladies des plantes à partir d’une photo et restitue le résultat à l’oral dans les langues locales, pour être utile à tous les agriculteurs.'],['AI-powered plant disease diagnosis','Frontend developer and frontend lead','Pitch for the SAHAL TECH INNOVATION CHALLENGE 2026','An AgriTech app that diagnoses plant diseases from a photo and reads the result aloud in local languages, so it is useful to every farmer.'],['Diagnosis with a CNN (MobileNetV3)','Audio output in Fon, Nago, Adja and Baatonu','Offline-first PWA with distinct desktop and mobile experiences','One-page showcase site deployed on Vercel']]};
Object.keys(pj).forEach(function(k){var o=R[k],a=pj[k],ks=k==='CodeDrive'?['d','role','st','sec','long']:k==='ZemPro'?['d','sec','long']:k==='CertiDiplôme BJ'?['d','role','sec','long']:['d','role','st','sec','long'];
pair(ks.map(function(f){return o[f]}),a[1]);pair(o.f,a[2])});

var ps=[['Red and black animation pack','Diagonal-band transitions, slamming titles, animated cursor: ready-to-copy effects.','A collection of CSS and JavaScript effects that give a site a bold graphic style: diagonal-band transition, slamming titles, click stars and an animated cursor. Every effect comes with a commented example.',['Diagonal-band transition','Slamming titles','Click stars','Animated cursor','Commented examples'],'Personal and commercial use on your own projects. Reselling or sharing the code is not allowed.'],
['Admin dashboard kit','A dark, responsive dashboard with projects, blog and settings.','An admin dashboard in a single HTML file, with management of projects, articles, skills and messages, a Markdown editor with preview and a mobile-friendly layout.',['Projects, Blog, Skills and Messages menus','Markdown editor with preview','Mobile layout','Single HTML file'],'Use on unlimited projects of your own. Reselling the template is not allowed.'],
['Zéo cursor, source code','The round, lively cursor that blinks and falls asleep.','The code for a custom cursor: a circle that stretches as it moves, blinks, follows the mouse with its eyes, shows bubbles on hover and falls asleep when you stop moving.',['Full code','Colour settings','Usage example'],'Personal and commercial use on your own projects. Reselling the code is not allowed.'],
['Red and black portfolio template','A complete portfolio: animated intro, projects, blog, shop and admin area.','The site you are visiting, as a template: intro screen, Home, Projects, Skills, About, Blog and Shop sections, Ctrl+K command palette, mobile layout and a built-in admin area. It ships without my photos or logo: you add your own texts, colours and images.',['Complete site in one HTML file','Built-in admin area','Blog with Markdown editor','Shop and donations','Mobile layout','Installation guide'],'Use on your own portfolio or a client’s. Reselling the template is not allowed.'],
['Zéo, the voice AI bot','A little robot that moves around, understands voice commands and summarizes your projects.','An animated assistant for your site: it floats on screen, listens to the microphone, reads its answers aloud, takes visitors to sections, and opens and summarizes your projects. You can add your own commands and give it a custom voice.',['Full bot code','Animated SVG character','Voice and typed commands','Voice settings','Guide to adding your own commands'],'Use on your own projects. Reselling the code is not allowed.'],
['Blog module with Markdown editor','A complete blog: cards, article reader and a manager with live preview.','A blog module to drop into a site: article list with category filters, reading window, reading time, and a manager with drafts, publishing and a Markdown editor with live preview.',['Site blog section','Article manager','Markdown editor with toolbar','Live preview'],'Use on your own projects. Reselling the code is not allowed.'],
['Ctrl+K command palette','A quick keyboard search to navigate a site.','A command palette opened with Ctrl+K: instant search, arrow-key navigation, sections, projects, articles and quick actions.',['Full code','Integration example','Command customization'],'Use on your own projects. Reselling the code is not allowed.'],
['Shop and donations module','A product showcase with payment links and a donation block.','A module to sell digital products on a static site: product cards with animated previews, detail pages, external payment links, per-project donations with suggested amounts and an admin manager.',['Shop section','Product pages','Donation block','Product manager','Payment guide using external links'],'Use on your own projects. Reselling the code is not allowed.']];
P2.forEach(function(p,i){pair([p.n,p.d,p.long,p.lic],[ps[i][0],ps[i][1],ps[i][2],ps[i][4]]);pair(String(p.inc||'').split(',').map(function(x){return x.trim()}),ps[i][3])});
Object.keys(D18).forEach(function(k){});
var Z=window.zeoLines?window.zeoLines():[];
pair(Z.slice(0,13),['I’m Zéo, a little AI bot living in Eucher’s portfolio. I wander around as I please, understand your spoken or typed commands, and can take you to a section, open and summarize his projects, or tell you about him. You can also ask me a free question!','Here is what I can do: summarize the projects, open a project, for example “open ZemPro”, take you to a section, introduce Eucher and his skills, read the latest article, turn the sound on or off, or tell you a joke.','Let’s go and see Eucher’s projects!','That’s the end of the tour! Say “open” followed by a project name to see its details.','Okay, I’ll be quiet.','Hi, I’m Zéo, the portfolio’s bot. Click me and ask me to summarize his projects!','Hi! I’m Zéo. Ask me to summarize the projects!','My pleasure!','Party time!','Sound off.','Sound on.','Hi, this is my voice. What do you think?','You can write to Eucher by email, or via LinkedIn and GitHub. I’ll take you to the contact section.']);
pair(Z.slice(15,18),['Why do developers prefer dark mode? Because light attracts bugs!','There are 10 types of people: those who understand binary, and those who don’t.','Why is the developer unhappy? Because he has too many problems and not enough solutions.']);
})();
(function(){var EN={
'Parcours':'Background','Mon Parcours':'My Background','Expérience, formation et langues.':'Experience, education and languages.','Expérience professionnelle':'Professional experience','Formation':'Education','Langues':'Languages','Centres d’intérêt':'Interests','Télécharger le PDF':'Download PDF',
'Bases de données':'Databases','Sécurité & IAM':'Security & IAM','DevOps & Outils':'DevOps & Tools','Indépendant':'Independent','Porto-Novo, Bénin':'Porto-Novo, Benin',
'Minan : langue maternelle':'Minan: native language','Anglais : niveau B2':'English: B2 level','veille technologique':'technology watch','lecture':'reading','jeux de stratégie':'strategy games','cuisine':'cooking',
'__BIO__':'Full-stack developer specialized in identity and access management (IAM/RBAC), with experience spanning Benin’s industrial sector, startups and the international tech ecosystem. Candidate for the Master’s in Software Engineering at IFRI to formalize skills built in the field.'};
Object.assign(D18,EN);
var X=SEED_EXP,Y=SEED_EDU;
pair([X[0].t,X[0].l,X[0].p].concat(X[0].d.split('\n')),['Web Operations Associate / Full-Stack Developer','Tallinn, Estonia (remote)','August 2026 – present','Front-end and back-end development of international fintech (Web3) platforms, within a team distributed across several time zones.','Development of CMS, publishing tools and internal APIs; optimization of performance and cloud availability.']);
pair([X[1].t,X[1].l,X[1].p].concat(X[1].d.split('\n')),['Full-Stack Developer Intern','Cotonou (remote)','November 2025 – February 2026','Front-end development with React/Next.js on the IMONA real-estate platform, integration of Figma mockups.','Project coordination using Agile methodology and integration of team feedback.']);
pair([X[2].t,X[2].l,X[2].p].concat(X[2].d.split('\n')),['Developer / IT Intern','Djeffa','June 2024 – January 2025','Design of HUB_DATASYS (7 business modules) with an RBAC system and temporary delegation of validation rights.','Centralization and indexing of more than 500 documents, reducing search time by 87%.']);
pair([X[3].t,X[3].l,X[3].p].concat(X[3].d.split('\n')),['Freelance Full-Stack & Design','Porto-Novo','2017 – present','Custom web and mobile development for a portfolio of more than 10 active clients (small businesses, startups).','Institutional platform for the Paul Hazoumè Polytechnic Institute, with an IAM system with 5 hierarchical roles.']);
pair([Y[0].t,Y[0].o,Y[0].p].concat(Y[0].d.split('\n')),['Application — Master 1 in Software Engineering','IFRI, University of Abomey-Calavi','Application submitted in July 2026','Admission pending.']);
pair([Y[1].t,Y[1].p].concat(Y[1].d.split('\n')),['Professional Bachelor’s degree in Computer Systems and Software','2022 – 2025','Graduated with “Very Good” honors.','Class valedictorian for several semesters.']);
D18[SEED_PROFILE.bio]=EN['__BIO__'];delete D18['__BIO__'];
})();
(function(){var Z={
'Je recrute':'I’m hiring','J’ai un projet':'I have a project','En cours':'Current','Français : courant':'French: fluent',
'Intelligence artificielle':'Artificial intelligence','Cybersécurité et IAM':'Cybersecurity and IAM','Web3 et fintech':'Web3 and fintech','Communauté tech (GDG Cotonou)':'Tech community (GDG Cotonou)',
'clients actifs':'active clients','de temps de recherche en moins':'less search time','modules métiers conçus':'business modules designed','documents indexés':'documents indexed','modules métiers':'business modules','rôles hiérarchiques (IAM)':'hierarchical roles (IAM)','Indexation':'Indexing','Délégation de droits':'Rights delegation',
'Major de promotion sur plusieurs semestres.':'Class valedictorian for several semesters.'};
Object.assign(D18,Z);var S=SEED_PROFILE;
pair([S.hook_r],['I build platforms where everyone sees exactly what they should see, and nothing else.']);
pair(S.about_r.split('\n\n'),['I’m Eucher ABATTI, a Software Engineer and Digital Solutions Architect from Benin. I have a particular interest in the space where technology meets human needs.','For me, software engineering is not about making things work just because they can. It’s about understanding why something needs to exist, questioning how it should work, and engineering a solution that makes sense beyond its first release.','I work across every layer of a digital product: interfaces, application logic, backend systems, databases and architecture. I pay close attention to what often goes unnoticed: how systems communicate, how data flows, how decisions affect performance, and how technology translates into real value.','I’m drawn to complex problems, thoughtful engineering and ideas that deserve to become more than concepts. I don’t measure progress only by what I’ve built, but by how much better I understand what I’m building.','Technology should not exist to impress. It should exist to make a difference.','Eucher ABATTI, Software Engineer and Digital Solutions Architect. Benin. Building with intention.']);
pair([S.hook_c],['I turn complex ideas into purposeful digital products.']);
pair(S.about_c.split('\n\n'),['I’m Eucher ABATTI, a Software Engineer & Digital Solutions Architect from Benin 🇧🇯.','I turn complex ideas into purposeful digital solutions. My interests lie in software architecture, engineering and the art of building technology that solves real problems.','Always questioning, always building, never done learning.','I don’t just build software. I build possibilities.']);
})();
var RX=[[/(\d+) min de lecture/g,'$1 min read'],[/Il en maîtrise (\d+) au total\./g,'He masters $1 in total.'],[/^(Bonjour|Bonsoir|Bonne nuit) ! /,function(_,g){return{'Bonjour':'Hello! ','Bonsoir':'Good evening! ','Bonne nuit':'Good night! '}[g]}],
[/^Direction (.+) !$/,function(_,g){return 'Heading to '+xl(g)+'!'}],[/^Aller à (.+)$/,function(_,g){return 'Go to '+xl(g)}],
[/^Montant choisi : (.+)\. Tu pourras le saisir sur la page de paiement\.$/,'Selected amount: $1. You can enter it on the payment page.'],
[/^Dans la boutique, tu peux trouver : (.+)\.$/,function(_,g){return 'In the shop you can find: '+xl(g)+'.'}],
[/^La voix ne marche pas ici \((.+)\)\. Écris-moi ta commande\.$/,'Voice doesn’t work here ($1). Please type your command.']];
var KEYS=null,ORIG=new WeakMap(),MT=null,MTC={},PEND={},MTT=0;
function xl(s){var m=/^(\s*)([\s\S]*?)(\s*)$/.exec(s),c=m[2];if(c.length<2)return s;var o=D18[c];if(o!==undefined)return m[1]+o+m[3];
if(!KEYS)KEYS=Object.keys(D18).filter(function(k){return k.length>=12}).sort(function(a,b){return b.length-a.length});
var r=c;RX.forEach(function(x){r=r.replace(x[0],x[1])});
for(var i=0;i<KEYS.length;i++){var k=KEYS[i];if(r.indexOf(k)>-1)r=r.split(k).join(D18[k])}
return m[1]+r+m[3]}
window.trs=function(s){return window.LANG==='en'?xl(s):s};
function en2fr(q){[[/summari[sz]e|summary|sum up|overview/g,'resume'],[/who are you( |$)|what are you( |$)|your name|introduce yourself/g,'qui es tu '],[/who is eucher|about eucher|who made this|who built this/g,'qui est eucher'],[/projects?/g,'projets'],[/skills?|technolog(y|ies)|tech stack/g,'competences'],[/go to|take me to|navigate to|head to/g,'va'],[/show me|show/g,'montre'],[/open/g,'ouvre'],[/latest article|last article|latest post/g,'dernier article'],[/shop|store|marketplace|buy|purchase|sell/g,'boutique'],[/donat(e|ion|ions)|support/g,'don'],[/reach|email|e mail/g,'contact'],[/mute|sound off|turn off the sound|stop the music/g,'coupe le son'],[/sound on|turn on the sound|play music/g,'active le son'],[/joke|funny/g,'blague'],[/party|surprise/g,'fete'],[/what can you do|help/g,'aide'],[/^(hello|hi|hey)/g,'bonjour'],[/about/g,'propos'],[/home|top/g,'accueil'],[/be quiet|shut up/g,'silence'],[/\b(the|me|please) /g,'']].forEach(function(r){q=q.replace(r[0],r[1])});return q.replace(/\s+/g,' ').trim()}
window.en2fr=en2fr;
function okNode(n){var p=n.parentNode;return p&&!/^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT)$/.test(p.nodeName)&&!(p.closest&&p.closest('#adm,[data-notr]'))}
function needMT(s){return s.trim().split(/\s+/).length>=3&&/[àâçéèêëîïôûùüœ]|(^|\s)(le|la|les|des|une|un|et|est|pour|avec|dans|sur|du|que|qui|ton|ta|mes|ses)(\s|$)/i.test(s)}
function mtAsk(s){var k=s.trim();if(PEND[k]||MTC[k])return;PEND[k]=1;MT.translate(k).then(function(t){MTC[k]=t;clearTimeout(MTT);MTT=setTimeout(function(){walk(document.body)},200)}).catch(function(){MTC[k]=k})}
function tnode(n){if(!okNode(n))return;var v=n.nodeValue,r=ORIG.get(n);if(!r||(v!==r.cur&&v!==r.fr)){r={fr:v,cur:v};ORIG.set(n,r)}
var o=window.LANG==='en'?xl(r.fr):r.fr;
if(window.LANG==='en'&&MT&&o===r.fr&&needMT(o)){var c=MTC[o.trim()];if(c)o=o.replace(o.trim(),c);else mtAsk(o)}
if(o!==v)n.nodeValue=o;r.cur=o}
var AT=['placeholder','aria-label','title','alt'];
function tattr(el){if(el.closest&&el.closest('#adm,[data-notr]'))return;el.__fr=el.__fr||{};AT.forEach(function(a){if(!el.hasAttribute(a))return;var v=el.getAttribute(a),r=el.__fr[a];if(!r||(v!==r.cur&&v!==r.fr)){r={fr:v,cur:v};el.__fr[a]=r}var o=window.LANG==='en'?xl(r.fr):r.fr;if(o!==v)el.setAttribute(a,o);r.cur=o})}
function walk(root){if(root.nodeType===3){tnode(root);return}var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null),n,L=[];while((n=w.nextNode()))L.push(n);L.forEach(tnode);
if(root.nodeType===1){tattr(root);[].forEach.call(root.querySelectorAll('[placeholder],[aria-label],[title],[alt]'),tattr)}}
new MutationObserver(function(ms){if(window.LANG!=='en')return;ms.forEach(function(m){if(m.type==='characterData')tnode(m.target);else m.addedNodes.forEach(function(n){if(n.nodeType===1||n.nodeType===3)walk(n)})})}).observe(document.body,{childList:true,subtree:true,characterData:true});
function regTr(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){return}if(!d)return;
function sp(s){return String(s||'').split(',').map(function(x){return x.trim()})}
(d.projects||[]).forEach(function(x){if(x.en&&x.en.d)D18[x.d]=x.en.d});
(d.posts||[]).forEach(function(p){var e=p.en||{};if(e.t)D18[p.t]=e.t;if(e.ex)D18[p.ex]=e.ex;if(e.body)D18[p.body]=e.body;if(e.tags)pair(sp(p.tags),sp(e.tags))});
(d.shop||[]).forEach(function(p){var e=p.en||{};if(e.n)D18[p.n]=e.n;if(e.d)D18[p.d]=e.d;if(e.long)D18[p.long]=e.long;if(e.lic)D18[p.lic]=e.lic;if(e.inc)pair(sp(p.inc),sp(e.inc))});
(d.services||[]).concat(d.steps||[]).forEach(function(x){var e=x.en||{};if(e.t)D18[x.t]=e.t;if(e.d)D18[x.d]=e.d});
(d.exp||[]).concat(d.edu||[]).forEach(function(x){var e=x.en||{};if(e.t)D18[x.t]=e.t;if(e.p)D18[x.p]=e.p;if(e.d)pair(String(x.d||'').split('\n').map(function(l){return l.trim()}).filter(Boolean),String(e.d).split('\n').map(function(l){return l.trim()}).filter(Boolean))});
(d.exp||[]).forEach(function(x){var e=x.en||{};if(e.k&&x.k){var lb=function(s){return String(s).split(',').map(function(t){return(t.split('|')[1]||'').trim()})};pair(lb(x.k),lb(e.k))}});
var pp=d.profile||{};[['hook_c','en_hook_c'],['bio','en_bio']].forEach(function(k){if(pp[k[0]]&&pp[k[1]])D18[pp[k[0]]]=pp[k[1]]});[['about_c','en_about_c']].forEach(function(k){if(pp[k[0]]&&pp[k[1]])pair(String(pp[k[0]]).split(/\n{2,}/).map(function(s){return s.trim()}),String(pp[k[1]]).split(/\n{2,}/).map(function(s){return s.trim()}))});
KEYS=null}
window.regTr=regTr;
function mtInit(){if(MT!==null)return;MT=false;try{if(window.Translator&&Translator.create)Translator.create({sourceLanguage:'fr',targetLanguage:'en'}).then(function(t){MT=t;if(window.LANG==='en')walk(document.body)}).catch(function(){})}catch(e){}}
var T0=document.title;
function setLang(l){window.LANG=LANG=l==='en'?'en':'fr';try{localStorage.setItem('ea_lang',LANG)}catch(e){}document.documentElement.lang=LANG;regTr();
document.title=LANG==='en'?xl(document.title===T0?T0:document.title):T0;walk(document.body);
try{drawB();drawS();draw('all')}catch(e){}
[].forEach.call(document.querySelectorAll('#hud .lg2 button'),function(b){b.classList.toggle('on',b.dataset.l===LANG)})}
window.setLang=setLang;
(function(){var h=document.getElementById('hud');if(h){var g=document.createElement('div');g.className='lg2';g.innerHTML='<button data-l="fr" data-notr="1" title="Français" aria-label="Français">FR</button><button data-l="en" data-notr="1" title="English" aria-label="English">EN</button><button id="calmb" aria-pressed="false" title="Réduire les effets" aria-label="Réduire les effets">✦</button>';h.insertBefore(g,h.firstChild);g.addEventListener('click',function(e){var b=e.target.closest('button');if(b&&b.dataset.l)setLang(b.dataset.l)})}
var sl=null;try{sl=localStorage.getItem('ea_lang')}catch(e){}
var init=sl||((navigator.language||'fr').slice(0,2).toLowerCase()==='en'?'en':'fr');window.LANG='fr';setLang(init)})();

(function(){var q=function(id){return document.getElementById(id)};
reveal(document.querySelectorAll('.sv,.steps li'));
function upd(){var en=window.LANG==='en',g=function(id){return(q(id).value||'').trim()};
var b=en?'Hello Eucher,\n\nI would like to start a project.\n\nName: '+g('bN')+'\nEmail: '+g('bE')+'\nProject type: '+g('bT')+'\nBudget: '+g('bB')+'\nTimeline: '+g('bD')+'\n\nMessage: '+g('bM'):'Bonjour Eucher,\n\nJe souhaite démarrer un projet.\n\nNom : '+g('bN')+'\nE-mail : '+g('bE')+'\nType de projet : '+g('bT')+'\nBudget : '+g('bB')+'\nDélai : '+g('bD')+'\n\nMessage : '+g('bM');
q('bMail').href='mailto:'+cEmail()+'?subject='+encodeURIComponent((en?'Project request: ':'Demande de projet : ')+g('bT'))+'&body='+encodeURIComponent(b)}
['bN','bE','bT','bB','bD','bM'].forEach(function(id){q(id).addEventListener('input',upd)});upd();
q('bMail').addEventListener('click',function(e){var n=q('bN').value.trim(),em=q('bE').value.trim(),er=q('bErr');if(!(n&&em)){e.preventDefault();er.textContent=window.LANG==='en'?'Please enter your name and email.':'Indiquez votre nom et un e-mail.';er.hidden=false;return}er.hidden=true;
if(!window.SB||!window.EA_SUPABASE||!window.EA_SUPABASE.url)return;
e.preventDefault();var en=window.LANG==='en',btn=q('bMail'),old=btn.textContent;btn.textContent=en?'Sending…':'Envoi…';btn.style.pointerEvents='none';
var body=(q('bB').value.trim()?(en?'Budget: ':'Budget : ')+q('bB').value.trim()+'\n':'')+(q('bD').value.trim()?(en?'Timeline: ':'Délai : ')+q('bD').value.trim()+'\n':'')+(q('bM').value.trim()||'');
window.SB.from('messages').insert({name:n,email:em,subject:q('bT').value,body:body}).then(function(r){btn.textContent=old;btn.style.pointerEvents='';if(r.error){er.textContent=en?'Sending failed. Please use email.':'Envoi impossible. Utilise l’e-mail.';er.hidden=false;return}['bN','bE','bB','bD','bM'].forEach(function(id){q(id).value=''});upd();btn.textContent=en?'Message sent':'Message envoyé';setTimeout(function(){btn.textContent=old},4000)}).catch(function(){btn.textContent=old;btn.style.pointerEvents='';er.textContent=en?'Sending failed. Please use email.':'Envoi impossible. Utilise l’e-mail.';er.hidden=false})});
/* CV imprimable */
var cv=document.createElement('div');cv.id='cv';document.body.appendChild(cv);
function cvOpen(){var d;try{d=JSON.parse(localStorage.getItem('ea_admin_v1'))}catch(e){d=null}
var p=(d&&d.profile)||SEED_PROFILE,ex=(d&&d.exp)||SEED_EXP,ed=(d&&d.edu)||SEED_EDU,sk=(d&&d.skills)||SEED_SKILLS,cats=[],by={};
sk.forEach(function(s){if(!by[s.cat]){by[s.cat]=[];cats.push(s.cat)}by[s.cat].push(s.n)});
function it(x){var b=String(x.d||'').split('\n').filter(function(l){return l.trim()}),sp=[x.o,x.l].filter(Boolean).map(function(v){return '<span>'+E(v)+'</span>'}).join('');return '<div class="cvj"><b>'+E(x.t)+'</b>'+(sp?'<em>'+sp+'</em>':'')+'<i class="cvq">'+E(x.p||'')+'</i>'+(b.length?'<ul>'+b.map(function(l){return '<li>'+E(l.trim())+'</li>'}).join('')+'</ul>':'')+'</div>'}
function ch(s){return String(s||'').split(',').map(function(x){return x.trim()}).filter(Boolean).map(function(x){return '<span>'+E(x)+'</span>'}).join('')}
var ct=[p.ville,p.email,p.tel,p.linkedin,p.github].filter(Boolean).map(function(v){return '<span>'+E(v)+'</span>'}).join('');
cv.innerHTML='<div class="cvbar"><button id="cvp">Imprimer / PDF</button><button class="cx" id="cvx">Fermer le CV</button><small>Astuce : Ctrl + P puis « Enregistrer au format PDF ».</small></div><article class="cvp"><h1>'+E(p.nom)+'</h1><h2>'+E(p.titre)+'</h2><p class="cvc cvl">'+ct+'</p><h3>Profil</h3><p>'+E(p.bio)+'</p><h3>Formation</h3>'+ed.map(it).join('')+'<h3>Expérience professionnelle</h3>'+ex.map(it).join('')+'<h3>Compétences</h3>'+cats.map(function(c){return '<p class="cvk"><b>'+E(c)+'</b>'+by[c].map(function(n){return '<span>'+E(n)+'</span>'}).join('')+'</p>'}).join('')+'<h3>Langues</h3><p class="cvl">'+ch(p.langues)+'</p><h3>Centres d’intérêt</h3><p class="cvl">'+ch(p.interets)+'</p></article>';
cv.classList.add('open');document.body.style.overflow='hidden';
document.getElementById('cvx').onclick=function(){cv.classList.remove('open');document.body.style.overflow=''};
document.getElementById('cvp').onclick=function(){try{window.print()}catch(e){}}}
window.cvOpen=cvOpen;
['cvBtn','cvBtn2','cvBtn3'].forEach(function(id){var b=q(id);if(b)b.addEventListener('click',function(e){e.preventDefault();cvOpen()})});
})();

(function(){
function setCalm(v,persist){window.CALM=!!v;document.body.classList.toggle('calm',window.CALM);
if(persist!==false)try{localStorage.setItem('ea_calm',window.CALM?'1':'0')}catch(e){}
if(window.CALM){if(window.on)setSound(false);try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}
var b=document.getElementById('calmb');if(b){b.classList.toggle('on',window.CALM);b.setAttribute('aria-pressed',String(window.CALM));var t=window.CALM?'Réactiver les effets':'Réduire les effets';b.setAttribute('title',t);b.setAttribute('aria-label',t)}}
window.setCalm=setCalm;
var cb=document.getElementById('calmb');if(cb)cb.addEventListener('click',function(){setCalm(!window.CALM)});
[].forEach.call(document.querySelectorAll('#intro [data-calm]'),function(b){b.addEventListener('click',function(){setCalm(true)})});
[].forEach.call(document.querySelectorAll('#intro [data-snd]'),function(b){b.addEventListener('click',function(){setCalm(false)})});
var sv=null;try{sv=localStorage.getItem('ea_calm')}catch(e){}
var pref=sv==='1';
if(pref)setCalm(true,false);
})();

(function(){
var calm=function(){return !!window.CALM};
/* 1. Inclinaison 3D des cartes (souris) */
var cur=null;function rs(el){if(!el)return;el.style.transform='';el.classList.remove('tilting')}
document.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse'||calm()){rs(cur);cur=null;return}
var el=e.target.closest&&e.target.closest('.card,.sv');if(el!==cur){rs(cur);cur=el}if(!el||el.classList.contains('rv'))return;
var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/(r.width||1),y=(e.clientY-r.top)/(r.height||1);
el.style.transform='perspective(900px) rotateX('+((.5-y)*12).toFixed(2)+'deg) rotateY('+((x-.5)*14).toFixed(2)+'deg) translateZ(8px)';el.style.setProperty('--mx',(x*100).toFixed(1)+'%');el.style.setProperty('--my',(y*100).toFixed(1)+'%');el.classList.add('tilting')});
document.documentElement.addEventListener('mouseleave',function(){rs(cur);cur=null});
/* 2. Profondeur de l’accueil */
var hn=document.querySelector('#home .name'),hp=document.querySelector('.hero-photo');
addEventListener('mousemove',function(e){if(calm()||innerWidth<701)return;var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
if(hn)hn.style.transform='rotate(-4deg) perspective(900px) rotateY('+(x*14).toFixed(2)+'deg) rotateX('+(-y*10).toFixed(2)+'deg)';
if(hp)hp.style.transform='perspective(1000px) rotateY('+(-x*10).toFixed(2)+'deg) rotateX('+(y*7).toFixed(2)+'deg)'});
/* 3. Orbite 3D des technologies */
var orbit=document.getElementById('orbit'),o=document.getElementById('orb3'),ang=0,vel=.25,drag=false,lx=0,vis=true,n=1;
function buildOrbit(){var SL=S2.slice(0,14);n=Math.max(1,SL.length);var R=Math.max(150,Math.round(52/Math.tan(Math.PI/Math.max(n,3)))+24);
o.innerHTML=SL.map(function(s,i){var ic=skI(s,1)||('<i>'+E(String(s).slice(0,2))+'</i>');return '<div class="orc" style="transform:rotateY('+(i*360/n).toFixed(2)+'deg) translateZ('+R+'px)">'+ic+E(s)+'</div>'}).join('')}
if(orbit&&o){buildOrbit();
orbit.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;try{orbit.setPointerCapture(e.pointerId)}catch(x){}});
addEventListener('pointerup',function(){drag=false});
orbit.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-lx;lx=e.clientX;ang+=dx*.45;vel=dx*.06});
try{new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(orbit)}catch(x){}
var mo=0;new MutationObserver(function(){clearTimeout(mo);mo=setTimeout(buildOrbit,60)}).observe(document.getElementById('sk'),{childList:true});
(function loop(){if(vis){if(!calm()&&!drag){ang+=vel;vel+=(.25-vel)*.03}
o.style.transform='rotateX(-9deg) rotateY('+ang.toFixed(2)+'deg)';
for(var i=0;i<o.children.length;i++){var a=((ang+i*360/n)%360+360)%360,k=(Math.cos(a*Math.PI/180)+1)/2;o.children[i].style.opacity=(.3+.7*k).toFixed(2)}}
requestAnimationFrame(loop)})()}
window.buildOrbit=buildOrbit;
})();

/* Chargement du contenu publié depuis Supabase (remplace le cache local) */
(function(){
function rerender(){try{applyData();drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();if(window.regTr)regTr()}catch(e){}}
if(!window.eaLoad)return;
window.eaLoad().then(function(ok){if(ok)rerender()}).catch(function(){});
})();
