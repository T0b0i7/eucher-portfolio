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

L.push({t:'Mode fête',k:'Surprise',f:party});L.push({t:window.LANG==='en'?'Switch to French':'Passer en anglais',k:'Action',f:function(){setLang(window.LANG==='en'?'fr':'en')}});L.push({t:window.CALM?'Réactiver les effets':'Réduire les effets',k:'Action',f:function(){setCalm(!window.CALM)}});L.push({t:'Ouvrir Aether, assistant écrit',k:'Action',f:function(){window.zeoOpen&&zeoOpen()}});
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
