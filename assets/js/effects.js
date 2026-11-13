(function(){
var $=function(s,r){return(r||document).querySelector(s)};
var SVG="<svg viewBox='0 0 80 90'><ellipse cx='40' cy='86' rx='20' ry='3.5' fill='rgba(0,0,0,.4)'/><line x1='40' y1='9' x2='40' y2='20' stroke='#000' stroke-width='3'/><circle class='an' cx='40' cy='6' r='5' fill='#fff' stroke='#000' stroke-width='2.5'/><circle cx='40' cy='48' r='32' fill='#e60012' stroke='#000' stroke-width='4' style='fill:var(--red)'/><path d='M16 38 Q40 20 64 38' fill='none' stroke='rgba(255,255,255,.4)' stroke-width='4' stroke-linecap='round'/><path d='M8 50 Q1 55 8 62M72 50 Q79 55 72 62' stroke='#000' stroke-width='4' fill='none' stroke-linecap='round'/><rect x='16' y='35' width='48' height='23' rx='11.5' fill='#000'/><circle class='eye' cx='30' cy='46.5' r='7' fill='#fff'/><circle class='eye' cx='50' cy='46.5' r='7' fill='#fff'/><circle class='pp' cx='30' cy='46.5' r='3.2' fill='#000'/><circle class='pp' cx='50' cy='46.5' r='3.2' fill='#000'/><rect class='mo' x='33' y='66' width='14' height='4' rx='2' fill='#000'/></svg>";
var z=document.createElement('div');z.id='zeo';
z.innerHTML="<div class='zbox'><div class='zb'></div><button class='zbody' aria-label='Ouvrir Aether'>"+SVG+"</button></div>";
document.body.appendChild(z);
var box=$('.zbox',z),body=$('.zbody',z),bub=$('.zb',z),pp=z.querySelectorAll('.pp');
var pn=document.createElement('div');pn.id='zp';
pn.innerHTML="<div class='zh'><b>AETHER</b><small>assistant IA textuel</small><button id='zx' aria-label='Fermer'>✕</button></div><div id='zl'></div><div class='zc'></div><div class='zi'><input id='zin' placeholder='Écris une commande…' autocomplete='off' aria-label='Commande'><button id='zs' aria-label='Envoyer'>➤</button></div>";
document.body.appendChild(pn);
var zl=$('#zl'),inp=$('#zin');
['Résume les projets','Qui es-tu ?','Qui est Eucher ?','Ses compétences','Va dans le blog','Raconte une blague'].forEach(function(t){var b=document.createElement('button');b.textContent=t;b.onclick=function(){go(t)};$('.zc',pn).appendChild(b)});
var bx=innerWidth-90,by=innerHeight-170,tx=bx,ty=by,vx=0,vy=0,face=1,hold=false,ht=0,nextMove=Date.now()+2500,mx=bx,my=by,st='idle',lastAct=Date.now(),lastHint=Date.now(),hints=0,tid=0,greeted=false,bt2=0;
var HINTS=['Psst… essaie « résume les projets » !','Clique sur moi pour écrire une commande !','Essaie : « ouvre ZemPro ».'];
function setSt(s){st=s;['think','sleep'].forEach(function(c){z.classList.toggle(c,s===c)})}
function bubble(t,ms){bub.textContent=t.length>120?t.slice(0,117)+'…':t;bub.classList.add('on');clearTimeout(bt2);bt2=setTimeout(function(){bub.classList.remove('on')},ms||Math.max(3500,t.length*60))}
function logm(w,t){var d=document.createElement('div');d.className='m '+w;d.textContent=t;zl.appendChild(d);while(zl.children.length>14)zl.removeChild(zl.firstChild);zl.scrollTop=zl.scrollHeight}
function say(text,cb){lastAct=Date.now();if(window.LANG==='en')text=trs(text);if(st==='sleep')setSt('idle');logm('bot',text);bubble(text);
var done=false,tm;
function fin(){if(done)return;done=true;clearTimeout(tm);setSt('idle');hold=false;if(cb)cb()}
tm=setTimeout(fin,Math.max(2200,text.length*45+1200))}
function pick(){var m=60;tx=m+Math.random()*Math.max(10,innerWidth-2*m);ty=110+Math.random()*Math.max(10,innerHeight-260)}
function goNear(el){var r=el.getBoundingClientRect(),left=r.left>110;tx=left?r.left-55:Math.min(r.right+55,innerWidth-50);ty=Math.max(110,Math.min(innerHeight-120,r.top+r.height/2));hold=true;clearTimeout(ht);ht=setTimeout(function(){hold=false},9000)}
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
(function loop(){var t=Date.now();
if(st==='sleep'){tx=innerWidth-70;ty=innerHeight-110}
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
say('Allons voir les projets de Tobi !',function(){step(0)});
function step(i){if(my!==tid)return;if(i>=P.length){say('Voilà, c’est la fin du tour ! Dis “ouvre” suivi du nom d’un projet pour voir son détail.');return}
var c=document.querySelectorAll('#grid .card')[i];if(c){c.scrollIntoView({behavior:'smooth',block:'center'});c.classList.add('zeo-hl');setTimeout(function(){goNear(c)},500)}
say(sumP(P[i],i),function(){if(c)c.classList.remove('zeo-hl');setTimeout(function(){step(i+1)},400)})}}
function showP(i,open){resetF();nav('projects');if(open)setTimeout(function(){openP(i)},800);say(sumP(P[i],i,true))}
var JOKES=['Pourquoi les développeurs préfèrent le mode sombre ? Parce que la lumière attire les bugs !','Il y a 10 types de personnes : celles qui comprennent le binaire, et les autres.','Pourquoi le développeur est-il malheureux ? Parce qu’il a trop de problèmes et pas assez de solutions.'];
var ME='Je suis Aether, l’assistant du portfolio de Tobi. Je peux t’emmener dans une section, ouvrir et résumer ses projets, ou te parler de lui. Pose-moi aussi une question par écrit !';
var HELP='Voici ce que je sais faire : résumer les projets, ouvrir un projet, par exemple “ouvre Clavis”, t’emmener dans une section, te présenter Tobi et ses compétences, lire le dernier article, couper ou activer le son, ou te raconter une blague.';
var SECS=[['home','l’accueil',/accueil|haut|debut|home/],['projects','les projets',/projet|realisation/],['skills','les compétences',/competence/],['about','la section à propos',/propos|biographie/],['blog','le blog',/blog|article/],['shop','la boutique',/boutique|marketplace|shop/],['contact','le contact',/contact/]];
function ctx(){var p=pr();return JSON.stringify({nom:p.nom,titre:p.titre,a_propos:p.bio,projets:P.map(function(x){return{nom:x.n,categorie:x.cat,description:x.d,details:x.long,fonctions:x.f,technologies:x.t}}),competences:S2,articles:BP.map(function(b){return b.t})})}
function askAI(q){return(window.claude&&claude.use?claude.use('sample'):Promise.resolve(null)).then(function(s){if(!s)throw{code:'none'};return s('Tu es Aether, l’assistant textuel du portfolio d’Eucher ABATTI. Réponds en '+(window.LANG==='en'?'anglais':'français')+', en 2 à 3 phrases courtes, ton chaleureux, sans markdown, sans liste, sans emoji. Appuie-toi uniquement sur les données JSON ci-dessous. Si l’information n’y figure pas, dis-le simplement et propose de contacter Eucher. N’invente rien.\nDONNÉES : '+ctx()+'\nQUESTION : '+q,{modelTier:'quick'})}).then(function(r){return String(r.text||'').trim()})}
function go(raw){raw=String(raw||'').trim();if(!raw)return;openPanel();logm('me',raw);lastAct=Date.now();var q=nz(raw);if(window.LANG==='en')q=en2fr(q);var my=++tid,has=function(r){return r.test(q)},pi=-1;
P.forEach(function(p,i){if(pi<0&&q.indexOf(nz(p.n))>-1)pi=i});
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
if(has(/^(bonjour|salut|coucou|hello|hey)/))return say('Salut ! Je suis Aether. Demande-moi de résumer les projets !');
if(has(/merci/))return say('Avec plaisir !');
setSt('think');bubble('Je réfléchis…',9000);
askAI(raw).then(function(t){if(my===tid&&t)say(t);else setSt('idle')}).catch(function(){setSt('idle');say('Je n’ai pas compris. Essaie : « résume les projets », « ouvre ZemPro », « qui es-tu ? » ou « va dans le blog ».')})}
function openPanel(){if(!pn.classList.contains('open')){pn.classList.add('open');if(!zl.children.length)logm('bot','Salut, je suis Aether, l’assistant du portfolio ! Saisis une commande ou choisis une suggestion.')}}
function closePanel(){pn.classList.remove('open')}
window.zeoLines=function(){var p=pr(),L=[ME,HELP,'Allons voir les projets de Tobi !','Voilà, c’est la fin du tour ! Saisis “ouvre” suivi du nom d’un projet pour voir son détail.','Salut, je suis Aether, l’assistant du portfolio d’Eucher. Demande-moi de résumer ses projets !','Salut ! Je suis Aether. Demande-moi de résumer les projets !','Avec plaisir !','C’est la fête !','Son coupé.','Son activé.','Tu peux écrire à Eucher par e-mail, ou via LinkedIn et GitHub. Je t’emmène à la section contact.','Ses compétences les plus solides : '+top(5).join(', ')+'. Il en maîtrise '+S2.length+' au total.',p.nom+', '+p.titre+'. Ses technologies phares : '+top(3).join(', ')+'. Il a notamment réalisé '+P.map(function(x){return x.n}).join(', ')+'. Pour le contacter, rendez-vous dans la section contact.'].concat(JOKES);SECS.forEach(function(s){L.push('Direction '+s[1]+' !')});P.forEach(function(x,i){L.push(sumP(x,i),sumP(x,i,true))});return L};
window.zeoOpen=openPanel;
body.addEventListener('click',function(){lastAct=Date.now();if(st==='sleep'){setSt('idle');bubble('Hein ? Je suis réveillé !',3000)}pn.classList.contains('open')?closePanel():openPanel()});
$('#zx').onclick=closePanel;$('#zs').onclick=function(){var t=inp.value;inp.value='';go(t)};
inp.addEventListener('keydown',function(e){if(e.key==='Enter'){var t=inp.value;inp.value='';go(t)}});
function greet(){if(greeted)return;greeted=true;bubble('Salut ! Je suis Aether, l’assistant du portfolio. Clique sur moi pour saisir une commande.',6000)}
var ib=document.querySelectorAll('#intro .btn');
if(ib.length)ib.forEach(function(b){b.addEventListener('click',function(){setTimeout(greet,1100)})});else setTimeout(greet,900);
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
'Tous':'All','IA':'AI','aperçu':'preview','Voir le projet':'View project','Voir l’aperçu':'View preview','Bientôt de nouvelles missions…':'New missions coming soon…',
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
'Couper le son':'Turn sound off','Activer le son':'Turn sound on','Copier mon e-mail':'Copy my email','Ouvrir l’espace admin':'Open admin area','Mode fête':'Party mode','Ouvrir Aether, assistant écrit':'Open Aether, text assistant','Aucun résultat':'No results','Passer en anglais':'Switch to English',
'Ouvrir':'Open','Go !':'Go!','Clique !':'Click!','Son ♪':'Sound ♪','Niveau !':'Level!','Incline-moi':'Tilt me','Parle-moi':'Talk to me','Clic !':'Click!',
'E-MAIL COPIÉ':'EMAIL COPIED','★ MODE FÊTE ★':'★ PARTY MODE ★',
'Bientôt de retour':'Back soon','Portfolio hors ligne':'Portfolio offline','Le site est momentanément indisponible.':'The site is temporarily unavailable.','Espace admin':'Admin area',
'assistant IA textuel':'Text assistant','Écris une commande…':'Type a command…',
'Résume les projets':'Summarize the projects','Qui es-tu ?':'Who are you?','Qui est Eucher ?':'Who is Eucher?','Ses compétences':'His skills','Va dans le blog':'Go to the blog','Raconte une blague':'Tell me a joke',
'Ouvrir Aether':'Open Aether','Fermer':'Close','Commande':'Command','Envoyer':'Send','Palette de commandes':'Command palette','Rechercher':'Search',
'Salut, je suis Aether, l’assistant du portfolio ! Saisis une commande ou choisis une suggestion.':'Hi, I’m Aether, the portfolio assistant! Type a command or choose a suggestion.',
'Salut ! Je suis Aether, l’assistant du portfolio. Clique sur moi pour saisir une commande.':'Hi! I’m Aether, the portfolio assistant. Click me to type a command.',
'Psst… essaie « résume les projets » !':'Psst… try “summarize the projects”!','Clique sur moi pour écrire une commande !':'Click me to type a command!','Essaie : « ouvre ZemPro ».':'Try: “open ZemPro”.',
'Hein ? Je suis réveillé !':'Huh? I’m awake!','Je réfléchis…':'Thinking…',
'Je n’ai pas compris. Essaie : « résume les projets », « ouvre ZemPro », « qui es-tu ? » ou « va dans le blog ».':'I didn’t get that. Try: “summarize the projects”, “open ZemPro”, “who are you?” or “go to the blog”.',
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
Object.keys(pj).forEach(function(k){var o=R[k];if(!o)return;var a=pj[k],ks=k==='CodeDrive'?['d','role','st','sec','long']:k==='ZemPro'?['d','sec','long']:k==='CertiDiplôme BJ'?['d','role','sec','long']:['d','role','st','sec','long'];
pair(ks.map(function(f){return o[f]}),a[1]);pair(o.f,a[2])});

var ps=[['Red and black animation pack','Diagonal-band transitions, slamming titles, animated cursor: ready-to-copy effects.','A collection of CSS and JavaScript effects that give a site a bold graphic style: diagonal-band transition, slamming titles, click stars and an animated cursor. Every effect comes with a commented example.',['Diagonal-band transition','Slamming titles','Click stars','Animated cursor','Commented examples'],'Personal and commercial use on your own projects. Reselling or sharing the code is not allowed.'],
['Admin dashboard kit','A dark, responsive dashboard with projects, blog and settings.','An admin dashboard in a single HTML file, with management of projects, articles, skills and messages, a Markdown editor with preview and a mobile-friendly layout.',['Projects, Blog, Skills and Messages menus','Markdown editor with preview','Mobile layout','Single HTML file'],'Use on unlimited projects of your own. Reselling the template is not allowed.'],
['Zéo cursor, source code','The round, lively cursor that blinks and falls asleep.','The code for a custom cursor: a circle that stretches as it moves, blinks, follows the mouse with its eyes, shows bubbles on hover and falls asleep when you stop moving.',['Full code','Colour settings','Usage example'],'Personal and commercial use on your own projects. Reselling the code is not allowed.'],
['Red and black portfolio template','A complete portfolio: animated intro, projects, blog, shop and admin area.','The site you are visiting, as a template: intro screen, Home, Projects, Skills, About, Blog and Shop sections, Ctrl+K command palette, mobile layout and a built-in admin area. It ships without my photos or logo: you add your own texts, colours and images.',['Complete site in one HTML file','Built-in admin area','Blog with Markdown editor','Shop and donations','Mobile layout','Installation guide'],'Use on your own portfolio or a client’s. Reselling the template is not allowed.'],
['Aether, a text-based AI assistant','A little robot that moves around, understands written commands and summarizes your projects.','An animated assistant for your site: it floats on screen, responds to written commands, takes visitors to sections, and opens and summarizes projects. You can add your own commands.',['Full bot code','Animated SVG character','Written commands','Guide to adding your own commands'],'Use on your own projects. Reselling the code is not allowed.'],
['Blog module with Markdown editor','A complete blog: cards, article reader and a manager with live preview.','A blog module to drop into a site: article list with category filters, reading window, reading time, and a manager with drafts, publishing and a Markdown editor with live preview.',['Site blog section','Article manager','Markdown editor with toolbar','Live preview'],'Use on your own projects. Reselling the code is not allowed.'],
['Ctrl+K command palette','A quick keyboard search to navigate a site.','A command palette opened with Ctrl+K: instant search, arrow-key navigation, sections, projects, articles and quick actions.',['Full code','Integration example','Command customization'],'Use on your own projects. Reselling the code is not allowed.'],
['Shop and donations module','A product showcase with payment links and a donation block.','A module to sell digital products on a static site: product cards with animated previews, detail pages, external payment links, per-project donations with suggested amounts and an admin manager.',['Shop section','Product pages','Donation block','Product manager','Payment guide using external links'],'Use on your own projects. Reselling the code is not allowed.']];
P2.forEach(function(p,i){pair([p.n,p.d,p.long,p.lic],[ps[i][0],ps[i][1],ps[i][2],ps[i][4]]);pair(String(p.inc||'').split(',').map(function(x){return x.trim()}),ps[i][3])});
Object.keys(D18).forEach(function(k){});
var Z=window.zeoLines?window.zeoLines():[];
pair(Z.slice(0,11),['I’m Aether, the assistant in Tobi’s portfolio. I can take you to a section, open and summarize projects, or tell you about him. You can also ask me a question in writing!','Here is what I can do: summarize projects, open one (for example “open ZemPro”), take you to a section, introduce Tobi and his skills, read the latest article, turn the sound on or off, or tell you a joke.','Let’s go and see Tobi’s projects!','That’s the end of the tour! Type “open” followed by a project name to see its details.','Hi, I’m Aether, the assistant in Eucher’s portfolio. Ask me to summarize his projects!','Hi! I’m Aether. Ask me to summarize the projects!','My pleasure!','Party time!','Sound off.','Sound on.','You can write to Eucher by email, or via LinkedIn and GitHub. I’ll take you to the contact section.']);
pair(Z.slice(13,16),['Why do developers prefer dark mode? Because light attracts bugs!','There are 10 types of people: those who understand binary, and those who don’t.','Why is the developer unhappy? Because he has too many problems and not enough solutions.']);
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
];
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
if(!window.eaSend)return;
e.preventDefault();var en=window.LANG==='en',btn=q('bMail'),old=btn.textContent;btn.textContent=en?'Sending…':'Envoi…';btn.style.pointerEvents='none';
var body=(q('bB').value.trim()?(en?'Budget: ':'Budget : ')+q('bB').value.trim()+'\n':'')+(q('bD').value.trim()?(en?'Timeline: ':'Délai : ')+q('bD').value.trim()+'\n':'')+(q('bM').value.trim()||'');
window.eaSend({name:n,email:em,subject:q('bT').value,body:body}).then(function(){btn.textContent=old;btn.style.pointerEvents='';;['bN','bE','bB','bD','bM'].forEach(function(id){q(id).value=''});upd();btn.textContent=en?'Message sent':'Message envoyé';setTimeout(function(){btn.textContent=old},4000)}).catch(function(){btn.textContent=old;btn.style.pointerEvents='';er.textContent=en?'Sending failed. Please use email.':'Envoi impossible. Utilise l’e-mail.';er.hidden=false})});
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
if(window.CALM&&window.on)setSound(false);
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
function buildOrbit(){var SL=(S2||[]).slice(0,14);n=Math.max(1,SL.length);var R=Math.max(150,Math.round(52/Math.tan(Math.PI/Math.max(n,3)))+24);
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
/* compétences : rendu par sections.js (applyData) */

/* Chargement du contenu publié depuis Supabase (remplace le cache local) */
(function(){
function rerender(){try{applyData();drawB();drawS();drawSv();drawTicker();drawJ();drawAbout();if(window.regTr)regTr()}catch(e){}}
if(!window.eaLoad)return;
window.eaLoad().then(function(ok){if(ok)rerender()}).catch(function(){});
})();
