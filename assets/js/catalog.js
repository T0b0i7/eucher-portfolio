/* Catalogue public des projets — source de vérité, ES5, sans build ni dépendance.
   Chargé avant data.js. Les contenus sont factuels : aucun chiffre, métrique ou
   résultat inventé ; impact reste vide quand aucune donnée réelle n'est connue. */
(function(){
  var PROJECTS=[
    {
      id:1,
      n:'Akouè App',
      cat:'Mobile',
      st:'Publié',
      d:'Application mobile de gestion financière personnelle : portefeuilles multiples, suivi des transactions et statistiques pour piloter son budget au quotidien.',
      long:'Akouè App est une application mobile de gestion financière personnelle. Elle réunit plusieurs portefeuilles, le suivi des transactions et des statistiques pour aider à piloter un budget au quotidien.\n\nElle est développée avec Expo 54 et React Native en TypeScript, avec Supabase côté données.',
      f:['Portefeuilles multiples','Suivi des transactions','Statistiques pour piloter son budget'],
      t:'Expo 54, React Native, TypeScript, Supabase',
      u:'https://akoue-app.vercel.app',
      preview:'https://akoue-app.vercel.app',
      cover:'assets/img/projects/akoue/cover.jpg',
      media:[
        'assets/img/projects/akoue/cover.jpg',
        'assets/img/projects/akoue/home.png',
        'assets/img/projects/akoue/stats.png',
        'assets/img/projects/akoue/profile.png'
      ],
      role:'Conception et développement',
      sec:'Fintech personnelle',
      impact:[]
    },
    {
      id:2,
      n:'NaviGarde IA',
      cat:'IA',
      st:'Publié',
      d:'Cockpit maritime de supervision : embarcations, alertes, inspections, rapports et bulletins, avec assistance IA et validation humaine.',
      long:'NaviGarde IA est un cockpit maritime de supervision. Il rassemble les embarcations, les alertes, les inspections, les rapports et les bulletins dans une interface unique.\n\nUne assistance IA vient appuyer le travail de supervision, avec une validation humaine avant application. La pile combine React et TypeScript côté interface, Node.js avec tRPC côté services, et MySQL pour les données.',
      f:['Supervision des embarcations','Gestion des alertes','Inspections et rapports','Bulletins','Assistance IA avec validation humaine'],
      t:'React, TypeScript, Node.js, tRPC, MySQL',
      u:'https://t0b0i7.github.io/NaviGarde_IA/',
      preview:'https://t0b0i7.github.io/NaviGarde_IA/',
      cover:'',
      role:'Conception et développement',
      sec:'Maritime',
      impact:[]
    },
    {
      id:3,
      n:'Clavis',
      cat:'Web',
      st:'Publié',
      d:'Application de test de frappe : modes minutés, citations et zen, clavier interactif, sons mécaniques et statistiques de précision.',
      long:'Clavis est une application de test de frappe. Elle propose des modes minutés, des citations et un mode zen, un clavier interactif, des sons mécaniques et des statistiques de précision.\n\nElle est construite avec Next.js 16 et React 19 en TypeScript.',
      f:['Modes minutés, citations et zen','Clavier interactif','Sons mécaniques','Statistiques de précision'],
      t:'Next.js 16, React 19, TypeScript',
      u:'https://clavis-azure.vercel.app',
      preview:'https://clavis-azure.vercel.app',
      cover:'',
      role:'Conception et développement',
      sec:'Productivité',
      impact:[]
    },
    {
      id:4,
      n:'Havre',
      cat:'Web',
      st:'Publié',
      d:'Site immobilier complet : landing, catalogue de biens, journal éditorial et visite 3D générée depuis un plan.',
      long:'Havre est un site immobilier complet. Il comprend une page d’accueil, un catalogue de biens, un journal éditorial et une visite 3D générée à partir d’un plan.\n\nIl est développé en JavaScript, HTML et CSS.',
      f:['Page d’accueil','Catalogue de biens','Journal éditorial','Visite 3D générée depuis un plan'],
      t:'JavaScript, HTML, CSS',
      u:'https://havre-olive.vercel.app',
      preview:'https://havre-olive.vercel.app',
      cover:'',
      role:'Conception et développement',
      sec:'Immobilier',
      impact:[]
    },
    {
      id:5,
      n:'Cauris Group International',
      cat:'Web',
      st:'Publié',
      d:'Site corporate multi-pages : accueil, à propos, services, projets, blog et contact, avec composants réutilisables et styles normés.',
      long:'Cauris Group International est un site corporate multi-pages. Il regroupe une page d’accueil, une page à propos, les services, les projets, le blog et le contact, avec des composants réutilisables et des styles normés.\n\nLe site est développé avec Next.js 13 et React 18 en TypeScript.',
      f:['Pages accueil, à propos, services, projets, blog et contact','Composants réutilisables','Styles normés'],
      t:'Next.js 13, React 18, TypeScript',
      u:'https://github.com/T0b0i7/cauris-group-international-site-web-corporate',
      preview:'',
      cover:'',
      repo:'https://github.com/T0b0i7/cauris-group-international-site-web-corporate',
      role:'Conception et développement',
      sec:'Corporate',
      impact:[]
    },
    {
      id:6,
      n:'Savekari Beauty',
      cat:'Web',
      st:'Publié',
      d:'Portfolio numérique et catalogue produits pour une marque de beauté : histoire, valeurs, produits phares et commande directe par WhatsApp.',
      long:'Savekari Beauty est un portfolio numérique et un catalogue produits pour une marque de beauté. Il présente l’histoire de la marque, ses valeurs et ses produits phares, avec une commande directe par WhatsApp.\n\nIl est développé avec Next.js, React et TypeScript.',
      f:['Portfolio de la marque','Catalogue produits','Histoire et valeurs','Commande directe par WhatsApp'],
      t:'Next.js, React, TypeScript',
      u:'https://github.com/T0b0i7/savekari-beauty',
      preview:'',
      cover:'',
      repo:'https://github.com/T0b0i7/savekari-beauty',
      role:'Conception et développement',
      sec:'Beauté et commerce',
      impact:[]
    },
    {
      id:8,
      n:'Portefolio.OS',
      cat:'Web',
      st:'Publié',
      d:'Template de portfolio prêt à personnaliser : structure modulaire, sections réutilisables et base de design system.',
      long:'Portefolio.OS est un template de portfolio prêt à personnaliser. Il repose sur une structure modulaire, des sections réutilisables et une base de design system.\n\nIl est développé avec Next.js, React et TypeScript.',
      f:['Structure modulaire','Sections réutilisables','Base de design system'],
      t:'Next.js, React, TypeScript',
      u:'https://portefolio-os-bice.vercel.app',
      preview:'https://portefolio-os-bice.vercel.app',
      cover:'',
      role:'Conception et développement',
      sec:'Outils de développement',
      impact:[]
    },
    {
      id:9,
      n:'Vigilance BJ',
      cat:'Web',
      st:'Publié',
      d:'Plateforme collaborative de signalement anonyme des menaces numériques au Bénin : arnaques, faux profils, harcèlement et phishing.',
      long:'Vigilance BJ est une plateforme collaborative de signalement anonyme des menaces numériques au Bénin. Elle couvre les arnaques, les faux profils, le harcèlement et le phishing.\n\nElle est développée avec Next.js, React, TypeScript et Supabase.',
      f:['Signalement anonyme','Menaces numériques : arnaques, faux profils, harcèlement et phishing','Plateforme collaborative'],
      t:'Next.js, React, TypeScript, Supabase',
      u:'https://vigilance-bj.vercel.app',
      preview:'https://vigilance-bj.vercel.app',
      cover:'',
      role:'Conception et développement',
      sec:'Cybersécurité citoyenne',
      impact:[]
    }
  ];

  function eaSlug(name){
    var s=String(name==null?'':name).toLowerCase();
    s=s.replace(/[àâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[îï]/g,'i')
       .replace(/[ôö]/g,'o').replace(/[ùûü]/g,'u').replace(/ç/g,'c');
    s=s.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
    return s;
  }

  function artInitials(name){
    var parts=String(name||'').trim().split(/[\s.\-–—/]+/).filter(Boolean);
    if(!parts.length)return 'EA';
    if(parts.length===1)return parts[0].slice(0,2).toUpperCase();
    return (parts[0].charAt(0)+parts[1].charAt(0)).toUpperCase();
  }

  function xml(s){
    return String(s==null?'':s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  }

  function eaProjectArt(project){
    var p=project||{};
    var name=String(p.n||p.name||'Projet');
    var cat=String(p.cat||p.category||p.c||'');
    var ini=artInitials(name);
    var nameSize=name.length>24?34:name.length>18?42:name.length>13?50:58;
    var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">'
      +'<rect width="800" height="500" fill="#0a0a0a"/>'
      +'<path d="M0 500L470 0h160L160 500Z" fill="#e60012"/>'
      +'<path d="M0 500L470 0" fill="none" stroke="#ff4444" stroke-width="2" opacity=".55"/>'
      +'<path d="M640 0v500M700 0v500" stroke="#1c1c1c" stroke-width="1"/>'
      +'<path d="M0 120h800M0 380h800" stroke="#1c1c1c" stroke-width="1"/>'
      +'<text x="52" y="228" font-family="Anton, Impact, Arial Black, sans-serif" font-size="210" font-weight="900" fill="#ffffff">'+xml(ini)+'</text>'
      +'<rect x="56" y="292" width="76" height="7" fill="#e60012"/>'
      +'<text x="56" y="362" font-family="Inter, Arial, Helvetica, sans-serif" font-size="'+nameSize+'" font-weight="800" fill="#ffffff">'+xml(name)+'</text>'
      +(cat?'<text x="58" y="410" font-family="Inter, Arial, Helvetica, sans-serif" font-size="21" letter-spacing="4" fill="#ffb3b8">'+xml(cat.toUpperCase())+'</text>':'')
      +'<text x="748" y="470" text-anchor="end" font-family="Anton, Impact, Arial Black, sans-serif" font-size="21" letter-spacing="2" fill="#ffffff" opacity=".5">EA · PROJET</text>'
      +'<circle cx="748" cy="40" r="9" fill="#e60012"/>'
      +'</svg>';
    return 'data:image/svg+xml,'+encodeURIComponent(svg);
  }

  /* Icônes technologies : SVG inline monochromes (currentColor), jeu fermé.
     Le repli est un hexagone avec les initiales, jamais une image externe. */
  function techSvg(inner){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"'
      +' stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'
      +' aria-hidden="true" focusable="false">'+inner+'</svg>';
  }
  function techText(x,y,size,label,anchor){
    return '<text x="'+x+'" y="'+y+'"'+(anchor?' text-anchor="'+anchor+'"':'')
      +' font-family="Arial,Helvetica,sans-serif" font-size="'+size+'" font-weight="700"'
      +' fill="currentColor" stroke="none">'+xml(label)+'</text>';
  }
  var TECH_ICONS={
    react: techSvg('<circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none"/>'
      +'<ellipse cx="12" cy="12" rx="9" ry="3.6"/>'
      +'<ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/>'
      +'<ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>'),
    next: techSvg('<circle cx="12" cy="12" r="9"/><path d="M9 16V8l6 8V8"/>'),
    typescript: techSvg('<rect x="3" y="3" width="18" height="18" rx="3"/>'+techText(12,15.5,8,'TS','middle')),
    javascript: techSvg('<rect x="3" y="3" width="18" height="18" rx="3"/>'+techText(12,15.5,8,'JS','middle')),
    node: techSvg('<path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/>'+techText(12,15,6.5,'JS','middle')),
    php: techSvg('<ellipse cx="12" cy="12" rx="9" ry="5.5"/>'+techText(12,14.5,6.5,'php','middle')),
    laravel: techSvg('<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 7v10h8"/>'),
    python: techSvg('<path d="M12 3c-3 0-4 1.2-4 3v2.5h8"/>'
      +'<path d="M12 21c3 0 4-1.2 4-3v-2.5H8"/>'
      +'<path d="M8 8.5H6.5C5 8.5 4 9.5 4 11s1 2.5 2.5 2.5H8"/>'
      +'<path d="M16 15.5h1.5c1.5 0 2.5-1 2.5-2.5s-1-2.5-2.5-2.5H16"/>'
      +'<circle cx="9.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>'
      +'<circle cx="14.5" cy="17.5" r=".8" fill="currentColor" stroke="none"/>'),
    django: techSvg('<rect x="3" y="3" width="18" height="18" rx="4"/>'+techText(12,15.5,8,'dj','middle')),
    mysql: techSvg('<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/>'
      +'<path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/>'
      +'<path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'
      +techText(12,21.5,6,'SQL','middle')),
    postgresql: techSvg('<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/>'
      +'<path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/>'
      +'<path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'
      +techText(12,21.5,6,'Pg','middle')),
    docker: techSvg('<rect x="4" y="11" width="4" height="4" rx=".5"/>'
      +'<rect x="9" y="11" width="4" height="4" rx=".5"/>'
      +'<rect x="14" y="11" width="4" height="4" rx=".5"/>'
      +'<rect x="9" y="6" width="4" height="4" rx=".5"/>'
      +'<path d="M3 17h13a5 5 0 0 0 5-5h2c0 5-4 8-8 8H5a2 2 0 0 1-2-2z"/>'),
    git: techSvg('<circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/>'
      +'<circle cx="18" cy="10" r="2.2"/><path d="M6 8.2v7.6"/>'
      +'<path d="M6 12h6a4 4 0 0 0 4-4V8"/>'),
    github: techSvg('<path fill="currentColor" stroke="none" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>'),
    tailwind: techSvg('<path fill="currentColor" stroke="none" d="M4 11.5c1.2-3.2 3.3-4.8 6.2-4.8 4 0 4.8 3 7 3 1 0 1.8-.4 2.8-1.5-1.2 3.2-3.3 4.8-6.2 4.8-4 0-4.8-3-7-3-1 0-1.8.4-2.8 1.5z"/>'
      +'<path fill="currentColor" stroke="none" d="M4 18.5c1.2-3.2 3.3-4.8 6.2-4.8 4 0 4.8 3 7 3 1 0 1.8-.4 2.8-1.5-1.2 3.2-3.3 4.8-6.2 4.8-4 0-4.8-3-7-3-1 0-1.8.4-2.8 1.5z"/>'),
    html: techSvg('<path d="M8 6 3 12l5 6"/><path d="M16 6l5 6-5 6"/>'),
    css: techSvg('<path d="M9 3 7 21"/><path d="M17 3l-2 18"/><path d="M4 8h17"/><path d="M3 16h17"/>'),
    expo: techSvg('<circle cx="12" cy="12" r="9"/><path d="M8 16 12 8l4 8"/>'),
    reactnative: techSvg('<rect x="7" y="2.5" width="10" height="19" rx="2.5"/>'
      +'<path d="M11 18.5h2"/><ellipse cx="12" cy="10" rx="3" ry="1.4"/>'),
    supabase: techSvg('<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>'),
    trpc: techSvg('<rect x="3" y="4" width="18" height="16" rx="3"/>'
      +'<path d="M7 9l3 3-3 3"/><path d="M13 15h4"/>'),
    vercel: techSvg('<path d="M12 4 21 19H3z"/>'),
    prisma: techSvg('<path d="M13 3 20 17l-8 4-5-8z"/>'),
    redis: techSvg('<path d="M12 3 21 7.5 12 12 3 7.5z"/><path d="M3 12.5 12 17l9-4.5"/><path d="M3 17.5 12 22l9-4.5"/>'),
    graphql: techSvg('<path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/>'
      +'<path d="M12 2.5v19"/><path d="M4 7l16 10"/><path d="M20 7 4 17"/>'),
    vue: techSvg('<path d="M3 5l9 15L21 5h-4l-5 8-5-8z"/>'),
    firebase: techSvg('<path d="M5 20 8 3l5 8 2-3 4 12z"/>'),
    flutter: techSvg('<path d="M15 3 5 13l4 4L19 7z"/><path d="M9 17l4 4h6l-6-6z"/>'),
    aws: techSvg('<path d="M6 17a4 4 0 0 1 .6-8A6 6 0 0 1 18 9.5a3.5 3.5 0 0 1 0 7"/>'
      +'<path d="M4 19c4 2.5 12 2.5 16 0"/>')
  };
  var TECH_ALIASES={
    'react':'react','reactjs':'react','react.js':'react',
    'next':'next','nextjs':'next','next.js':'next',
    'typescript':'typescript','ts':'typescript',
    'javascript':'javascript','js':'javascript',
    'node':'node','nodejs':'node','node.js':'node',
    'php':'php','laravel':'laravel','python':'python','django':'django',
    'mysql':'mysql','postgresql':'postgresql','postgres':'postgresql','pg':'postgresql',
    'docker':'docker','git':'git','github':'github','git / github':'github','git/github':'github',
    'tailwind':'tailwind','tailwind css':'tailwind','tailwindcss':'tailwind',
    'html':'html','html5':'html','css':'css','css3':'css',
    'expo':'expo','react native':'reactnative','react-native':'reactnative',
    'supabase':'supabase','trpc':'trpc','t rpc':'trpc','vercel':'vercel','prisma':'prisma',
    'redis':'redis','graphql':'graphql','vue':'vue','vue.js':'vue','vuejs':'vue',
    'firebase':'firebase','flutter':'flutter','aws':'aws','amazon web services':'aws'
  };
  function techRef(name){
    var value=String(name==null?'':name).toLowerCase().trim().replace(/\s+/g,' ');
    if(!value)return '';
    if(TECH_ALIASES[value])return TECH_ALIASES[value];
    value=value.replace(/\([^)]*\)/g,' ').replace(/\s+\d+(?:\.\d+)*/g,' ').replace(/\s+/g,' ').trim();
    if(TECH_ALIASES[value])return TECH_ALIASES[value];
    var keys=Object.keys(TECH_ALIASES).sort(function(a,b){return b.length-a.length});
    for(var i=0;i<keys.length;i+=1){
      var key=keys[i];
      if(key.length>=3&&value.indexOf(key)>-1)return TECH_ALIASES[key];
    }
    return '';
  }
  function techFallback(name){
    var ini=artInitials(name);
    return techSvg('<path d="M12 2 21 7v10l-9 5-9-5V7z"/>'+techText(12,15,7,ini,'middle'));
  }
  window.eaTechIcon=function(name){
    var ref=techRef(name);
    if(ref&&TECH_ICONS[ref])return TECH_ICONS[ref];
    return techFallback(name);
  };

  /* Aperçus générés (data URI SVG 800x500) : 4 variantes distinctes,
     charte rouge/noir, nom et initiales du projet, aucune ressource externe. */
  function shotText(x,y,size,weight,fill,label,anchor){
    return '<text x="'+x+'" y="'+y+'"'+(anchor?' text-anchor="'+anchor+'"':'')
      +' font-family="Inter,Arial,Helvetica,sans-serif" font-size="'+size+'" font-weight="'+weight+'"'
      +' fill="'+fill+'">'+xml(label)+'</text>';
  }
  function eaProjectShot(project,index){
    var p=project||{};
    var name=String(p.n||p.name||'Projet');
    var cat=String(p.cat||p.category||p.c||'');
    var ini=artInitials(name);
    var variant=((parseInt(index,10)||0)%4+4)%4;
    var nameSize=name.length>34?16:name.length>26?20:27;
    var seed=0,i;
    for(i=0;i<name.length;i+=1)seed=(seed*37+name.charCodeAt(i))%997;
    var labels=['INTERFACE','MOBILE','CODE','DONNÉES'];
    var svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">'
      +'<rect width="800" height="500" fill="#0a0a0a"/>'
      +'<g stroke="#1c1c1c" stroke-width="1">';
    for(i=0;i<=800;i+=80)svg+='<path d="M'+i+' 0v500"/>';
    for(i=0;i<=500;i+=80)svg+='<path d="M0 '+i+'h800"/>';
    svg+='</g>'
      +'<circle cx="52" cy="46" r="7" fill="#ff1a1a"/>'
      +shotText(70,51,15,700,'#ffffff','EA · '+(cat?cat.toUpperCase():'PROJET'))
      +shotText(748,51,13,600,'#9ca3af','APERÇU '+(variant+1)+' · '+labels[variant],'end')
      +'<text x="760" y="286" text-anchor="end" font-family="Anton,Impact,Arial Black,sans-serif"'
      +' font-size="190" font-weight="900" fill="#151515">'+xml(ini)+'</text>';
    if(variant===0){
      svg+='<rect x="60" y="96" width="680" height="320" rx="14" fill="#101010" stroke="#262626"/>'
        +'<path d="M60 140h680" stroke="#262626"/>'
        +'<circle cx="84" cy="118" r="5" fill="#ff1a1a"/>'
        +'<circle cx="102" cy="118" r="5" fill="#3a3a3a"/>'
        +'<circle cx="120" cy="118" r="5" fill="#3a3a3a"/>'
        +'<rect x="150" y="112" width="250" height="12" rx="6" fill="#1c1c1c"/>'
        +'<rect x="80" y="160" width="150" height="236" rx="10" fill="#0b0b0b" stroke="#222"/>'
        +'<rect x="96" y="184" width="66" height="8" rx="4" fill="#ff1a1a"/>'
        +'<rect x="96" y="208" width="112" height="7" rx="3" fill="#242424"/>'
        +'<rect x="96" y="228" width="94" height="7" rx="3" fill="#1c1c1c"/>'
        +'<rect x="96" y="248" width="104" height="7" rx="3" fill="#1c1c1c"/>'
        +'<rect x="252" y="160" width="222" height="86" rx="10" fill="#0b0b0b" stroke="#222"/>'
        +'<rect x="490" y="160" width="222" height="86" rx="10" fill="#0b0b0b" stroke="#222"/>'
        +shotText(270,196,28,800,'#ffffff','0'+(seed%9+1))
        +shotText(508,196,28,800,'#ffffff','0'+(seed%7+1))
        +'<rect x="252" y="258" width="460" height="138" rx="10" fill="#0b0b0b" stroke="#222"/>';
      for(i=0;i<8;i+=1){
        var bh=24+(seed+i*97)%78;
        svg+='<rect x="'+(274+i*52)+'" y="'+(380-bh)+'" width="30" height="'+bh+'" rx="4" fill="'+(i%3===0?'#ff1a1a':'#2a2a2a')+'"/>';
      }
      svg+='<path d="M274 350h420" stroke="#333"/>';
    }else if(variant===1){
      svg+='<path d="M0 500 360 0h120L120 500Z" fill="#150003"/>'
        +'<rect x="438" y="150" width="150" height="290" rx="24" fill="#0d0d0d" stroke="#242424"/>'
        +'<rect x="292" y="76" width="204" height="356" rx="28" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="2"/>'
        +'<rect x="304" y="92" width="180" height="324" rx="20" fill="#0a0a0a"/>'
        +'<rect x="368" y="84" width="52" height="10" rx="5" fill="#1c1c1c"/>'
        +'<circle cx="330" cy="128" r="11" fill="#ff1a1a"/>'
        +shotText(350,133,13,700,'#ffffff','APERÇU · '+(cat?cat.toUpperCase():'PROJET'))
        +'<rect x="318" y="156" width="152" height="52" rx="9" fill="#121212" stroke="#232323"/>'
        +shotText(330,178,20,800,'#ffffff','0'+(seed%9+1))
        +shotText(330,196,9,600,'#9ca3af','INDICATEURS')
        +'<rect x="318" y="220" width="152" height="8" rx="4" fill="#242424"/>'
        +'<rect x="318" y="238" width="118" height="8" rx="4" fill="#1c1c1c"/>'
        +'<rect x="318" y="256" width="136" height="8" rx="4" fill="#1c1c1c"/>'
        +'<rect x="318" y="274" width="104" height="8" rx="4" fill="#1c1c1c"/>'
        +'<rect x="318" y="292" width="130" height="8" rx="4" fill="#1c1c1c"/>'
        +'<rect x="318" y="330" width="152" height="42" rx="21" fill="#ff1a1a"/>'
        +shotText(394,357,13,700,'#ffffff',cat?cat.toUpperCase():'PROJET','middle');
    }else if(variant===2){
      svg+='<rect x="60" y="96" width="680" height="320" rx="12" fill="#0c0c0c" stroke="#262626"/>'
        +'<path d="M60 134h680" stroke="#262626"/>'
        +'<rect x="82" y="112" width="66" height="20" rx="6" fill="#1a1a1a"/>'
        +'<rect x="156" y="112" width="66" height="20" rx="6" fill="#141414"/>'
        +'<rect x="230" y="112" width="66" height="20" rx="6" fill="#141414"/>'
        +'<rect x="112" y="258" width="56" height="20" rx="4" fill="#2a0a0d"/>';
      var widths=[250,180,320,210,280,150,300,240];
      for(i=0;i<8;i+=1){
        var y=158+i*22;
        svg+='<rect x="84" y="'+(y+3)+'" width="14" height="6" rx="3" fill="#333"/>'
          +'<rect x="112" y="'+y+'" width="'+widths[i]+'" height="8" rx="4" fill="'+(i%4===0?'#ff1a1a':i%3===0?'#e5e5e5':'#2a2a2a')+'"/>';
      }
      svg+='<rect x="112" y="360" width="220" height="8" rx="4" fill="#2a2a2a"/>';
    }else{
      svg+='<rect x="60" y="96" width="680" height="320" rx="14" fill="#100f0f" stroke="#262626"/>'
        +'<rect x="80" y="118" width="205" height="80" rx="10" fill="#0b0b0b" stroke="#232323"/>'
        +'<rect x="298" y="118" width="205" height="80" rx="10" fill="#0b0b0b" stroke="#232323"/>'
        +'<rect x="516" y="118" width="205" height="80" rx="10" fill="#0b0b0b" stroke="#232323"/>'
        +shotText(96,154,26,800,'#ffffff','0'+(seed%9+1))
        +shotText(314,154,26,800,'#ffffff','0'+(seed%8+2))
        +shotText(532,154,26,800,'#ff1a1a','0'+(seed%7+3))
        +shotText(96,178,9,600,'#9ca3af','TOTAL')
        +shotText(314,178,9,600,'#9ca3af','MENSUEL')
        +shotText(532,178,9,600,'#9ca3af','OBJECTIF')
        +'<rect x="80" y="216" width="641" height="180" rx="10" fill="#0b0b0b" stroke="#232323"/>'
        +'<path d="M100 380h600" stroke="#2a2a2a"/>'
        +'<path d="M100 300h600" stroke="#1c1c1c"/>';
      for(i=0;i<9;i+=1){
        var dh=20+(seed+i*61)%90;
        svg+='<rect x="'+(120+i*64)+'" y="'+(370-dh)+'" width="22" height="'+dh+'" rx="3" fill="'+(i%3===1?'#ff1a1a':'#262626')+'"/>';
      }
      svg+='<path d="M120 330 184 300 248 320 312 270 376 290 440 250 504 268 568 230 632 246"'
        +' fill="none" stroke="#ff1a1a" stroke-width="3"/>';
    }
    svg+='<rect x="60" y="430" width="680" height="2" fill="#1f1f1f"/>'
      +shotText(60,468,nameSize,800,'#ffffff',name)
      +shotText(748,467,13,600,'#9ca3af',ini+' · EA','end')
      +'</svg>';
    return 'data:image/svg+xml,'+encodeURIComponent(svg);
  }
  window.eaProjectShot=eaProjectShot;

  /* Slug stable dérivé du nom : utilisé par les liens du carrousel et la fiche projet. */
  PROJECTS.forEach(function(p){ if(p&&!p.slug)p.slug=eaSlug(p.n); });

  window.EA_PROJECTS=PROJECTS;
  window.eaSlug=eaSlug;
  window.eaProjectArt=eaProjectArt;
  window.eaPublishedProjects=function(){
    return PROJECTS.filter(function(p){return p&&p.st==='Publié'});
  };
})();
