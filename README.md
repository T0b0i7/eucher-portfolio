# Portfolio d’Eucher ABATTI

Portfolio rouge et noir avec animations, sons, blog, espace d’administration et pages projets détaillées.

## Contenu du dossier

- `index.html` : la page principale du site (structure HTML uniquement).
- `project.html` : la fiche « étude de cas » d’un projet, ouverte depuis le carrousel.
- `assets/css/app.css` : tout le style du site principal.
- `assets/css/project-details.css` : le style des fiches projet.
- `assets/js/config.js` : configuration publique Supabase partagée (clé publishable, aucun secret).
- `assets/js/api.js` : lecture publique des projets depuis Supabase (pagination, filtres, détail), avec repli catalogue.
- `assets/js/catalog.js` : le catalogue public des vrais projets (données de repli pour les visiteurs et pour `project.html`).
- `assets/js/data.js` : données de départ (profil, CV, compétences), utilitaires et carrousel des projets.
- `assets/js/sections.js` : rendu public (blog, boutique, parcours, à propos, services).
- `assets/js/remote.js` : lecture du contenu publié sur Supabase et envoi du formulaire de contact.
- `assets/js/ui.js` : intro, HUD, palette Ctrl+K.
- `assets/js/effects.js` : Aether, traduction FR/EN (`D18`), CV imprimable, formulaire de contact, mode sobre, effets 3D et orbite.
- `assets/js/project-details.js` : rendu des fiches `project.html` (API puis repli catalogue).
- `assets/js/admin.js` : espace d’administration, chargé seulement à l’ouverture.
- `assets/js/admin-doc.js` : assainit le document publié (projets publiés uniquement, sans messages ni téléphone) ; les brouillons partent dans une table privée.
- `assets/img/` : logo et portrait.
- `supabase/` : scripts SQL de la base, migrations P0 et seed des projets.
- `docs/` : architecture, runbook de migration (`MIGRATION-P0.md`), notes et specs superpowers.
- `tests/` et `scripts/` : outillage de développement (jamais déployé).

## Ouvrir le site

Double-clique sur `index.html`. Une connexion internet est utile pour charger les polices (Anton, Oswald, Inter) et pour récupérer le contenu publié sur Supabase. Sans connexion, des polices de secours s’affichent et le site utilise ses données de repli.

## Utiliser l’espace d’administration

- Clique sur « 🔒 Connexion » en bas de page, ou appuie sur `Ctrl + Maj + A` (ou `Alt + Maj + A` : sur Chrome, `Ctrl + Maj + A` peut être réservé par le navigateur).
- L’espace est protégé par une connexion GitHub via Supabase. Seuls les comptes présents dans la table `admins` de la base sont autorisés : le navigateur vérifie ton identité auprès du serveur, et la RLS refuse de toute façon l’écriture aux non-admins.
- Menus, dans cet ordre : Tableau de bord, Projets, Blog, Boutique, Services, Parcours, Compétences, Profil, Messages, Paramètres.
- Le bouton « Mettre à jour le portfolio » enregistre et te ramène sur le site.
- Quand tu es connecté, tes modifications sont enregistrées dans le navigateur puis poussées vers Supabase (avec un court délai). Le dernier contenu publié est ensuite servi à tous les visiteurs.
- Paramètres, puis Exporter : télécharge un fichier JSON avec l’essentiel du contenu (profil, projets publiés, compétences, réglages).

## Astuces

- `Ctrl + K` : palette de commandes (navigation, projets, articles, son, e-mail), à condition d’avoir activé « Palette de commandes » dans Admin, Paramètres, « Sections et extras ».
- Le coin bas droite affiche la date, le moment de la journée et la section où tu te trouves, avec le sélecteur FR / EN et le bouton du mode sobre.
- Un code secret se cache sur la page : essaie le fameux code Konami (flèches haut, haut, bas, bas, gauche, droite, gauche, droite, B, A).

## Aether, l’assistant écrit

- Aether se balade tout seul sur la page. Clique sur lui pour ouvrir son panneau.
- Saisis une commande ou choisis une suggestion : « résume les projets », « ouvre Clavis », « qui es-tu ? », « qui est Eucher ? », « ses compétences », « va dans le blog », « coupe le son », « raconte une blague ».
- Les commandes connues fonctionnent sans connexion. Les questions libres ne sont pas envoyées à un service externe depuis ce site.
- Aether n’utilise ni micro ni lecture audio : il est uniquement textuel. Les effets sonores du portfolio restent indépendants.
- Le mode sobre masque Aether (le personnage et son panneau). Zéo reste le nom du produit distinct de curseur personnalisé.

## Boutique et dons

- Menu Admin, puis Boutique : ajoute tes produits (animations, templates, codes sources) avec prix, description, contenu inclus, licence et lien de paiement.
- La boutique démarre vide : plus aucun produit de démonstration n’est prérempli. Ce que tu vois publiquement est ce que tu publies.
- Pour encaisser sans serveur : crée un lien de paiement chez une plateforme locale (par exemple FedaPay ou KKiaPay) et colle-le dans « Lien de paiement ». Le bouton « Payer » y mène. Le suivi des ventes se fait chez la plateforme.
- Dons : renseigne le lien de don et, si tu veux, ton texte Mobile Money dans Paramètres. Active ensuite « Dons » projet par projet depuis la fiche du projet dans l’admin.
- Ne vends jamais d’éléments tirés de jeux ou de personnages dont tu n’as pas les droits.

## Langues (français et anglais)

- Le sélecteur FR / EN se trouve dans le petit bloc en bas à droite, pas dans le menu. Le choix est mémorisé, et la langue du navigateur est détectée à la première visite.
- Tout le portfolio public est traduit : textes, projets, articles, boutique, paiement, palette Ctrl+K et Aether, qui comprend alors les commandes en anglais.
- Pour ton propre contenu (projets, articles, produits, services, parcours), l’admin a des champs « version anglaise » et un bouton « Traduire en anglais » qui prépare un brouillon à relire. Ce bouton n’est actif que si un service de traduction est disponible dans l’environnement d’exécution ; sinon, saisis la version anglaise à la main.
- Pour ajouter une traduction à un texte fixe, ajoute une ligne dans l’objet `D18` (français : anglais) dans `assets/js/effects.js`.

## Bouton Payer

- Chaque produit de la boutique a un bouton « Payer » (ou « Demander un devis » si le prix est sur demande).
- Avec un lien de paiement, il mène à la page de paiement. Sans lien, il ouvre un formulaire de commande qui prépare un e-mail (et un message WhatsApp si tu renseignes ton numéro dans Paramètres).

## Services et demandes de projet

- La section « Ce que je propose » présente les services (4 au départ) et ta méthode de travail. Ils se gèrent dans Admin, menu Services (ajouter, modifier, réordonner, supprimer, version anglaise). Relis les textes de départ : ils sont à adapter à ton offre réelle.
- Les services alimentent aussi le choix « Type de projet » du formulaire « Démarrer un projet ». Le titre et la description de Paramètres alimentent la description pour les moteurs de recherche.
- Le formulaire « Démarrer un projet » (section Contact) envoie ta demande dans la messagerie privée de l’admin quand Supabase est configuré ; sinon il prépare un e-mail complet (le repli).
- Le bouton « Mon CV (PDF) » (section À propos ou Parcours) ouvre un CV généré depuis ton profil, tes expériences, ta formation et tes compétences. Imprime-le ou enregistre-le en PDF avec `Ctrl + P`.
- Dans Admin, Paramètres : le badge « Disponible pour de nouvelles missions » est désactivé par défaut. Active-le quand c’est vrai.
- Le site contient aussi une description pour les moteurs de recherche et les réseaux sociaux, un lien « Aller au contenu » et un focus clavier visible.

## Mode sobre

- Le bouton « ✦ » dans le bloc en bas à droite (ou « Entrer en mode sobre » sur l’écran d’accueil, ou Ctrl+K puis « Réduire les effets ») coupe les sons, les animations, le curseur personnalisé, les effets 3D, l’orbite et Aether (personnage et panneau).
- Le choix est mémorisé et les libellés du bouton suivent la langue choisie. Le mode sobre ne s’active jamais tout seul : c’est le visiteur qui le choisit.

## Effets 3D

- Cartes (blog, boutique, services) : inclinaison 3D qui suit la souris, avec un reflet.
- Accueil : le nom et le portrait bougent en profondeur avec la souris (ordinateur).
- Compétences : une orbite 3D des logos de technologies, qu’on fait tourner en glissant. Elle suit la liste de compétences de l’admin.
- Tout est en CSS et JavaScript léger, sans bibliothèque. Le mode sobre (✦) désactive ces effets.

## Projets et fiches projet

- Le carrousel de l’accueil affiche les vrais projets publiés. Le site lit d’abord les tables Supabase via l’API, puis retombe sur `assets/js/catalog.js` si la base n’est pas encore migrée ou indisponible ; il se balaie au doigt sur mobile.
- La migration P0 (tables normalisées + seed) et la procédure de rollback sont décrites dans `docs/MIGRATION-P0.md`.
- Chaque carte mène à `project.html?project=<slug>` : une étude de cas avec logo, résumé, tags technos, visuel, description, fonctionnalités clés, carte des technologies, repères du projet, galerie d’aperçus générés, et les boutons « Voir la démo en ligne », « Voir le code sur GitHub » (quand ces liens existent) et « Retour aux projets ».
- Le contenu publié depuis l’admin est chargé depuis Supabase puis gardé dans le navigateur : le carrousel et les fiches déjà connues reprennent ces modifications quand elles sont présentes.
- Les visuels sont générés localement (motif rouge et noir avec les initiales du projet) quand il n’y a pas de capture ; le badge indique « Projet publié ». Aucun visuel de démonstration externe n’est utilisé.
- Les six anciens projets fictifs (Relay, Atlas, Ledger, Nexus, Pulse, Orbit) ont disparu.
- Limite connue : un projet créé dans l’admin et absent de `catalog.js` ne s’affiche sur `project.html` que sur un appareil où le cache local le connaît déjà (un lien direct depuis un navigateur neuf affiche « Projet introuvable »). Pour un projet durablement public, ajoute-le au catalogue.

## Sur mobile

- La navigation passe par le menu burger à partir de 900 px ; les liens et boutons principaux ont une zone tactile d’au moins 44 px.
- Le carrousel se balaie horizontalement au doigt ; les pastilles restent cliquables et le clavier (← / →) fonctionne toujours.
- Le HUD (langue, mode sobre, section) et le bouton son deviennent compacts et ne masquent plus la fin de page.
- L’intro, le formulaire de contact, la palette Ctrl+K, Aether et le CV occupent la largeur disponible ; le site ne déborde jamais horizontalement (vérifié de 360 à 1440 px).
- Les fiches projet empilent le contenu, passent les technologies sur une colonne et transforment la galerie d’aperçus en carrousel horizontal à défilement aimanté.

## Ton CV dans le portfolio

- Les contenus de ton CV sont intégrés : profil, expériences, formation, compétences par catégorie, langues et centres d’intérêt. Section « Parcours » du site.
- Tout se modifie dans Admin : menu Parcours (expériences et formation), menu Profil (profil, ville, téléphone, langues, intérêts), menu Compétences.
- Pour n’afficher que le CV : Admin, Paramètres, « Masquer la section Parcours ». Le bouton « Voir mon CV » apparaît alors sur l’accueil.
- Ton téléphone n’est plus affiché sur les pages du site ni publié dans le document public ; il n’apparaît que dans le CV généré.
- Ton ancien PDF n’est plus dans le dossier. Si tu veux proposer un PDF à télécharger, enregistre le CV généré (Ctrl + P) puis dépose-le dans `assets/`.

## Parcours animé et À propos

- Les expériences et la formation apparaissent une à une, avec la ligne du temps qui se dessine, un logo par organisation, la pastille « En cours », des chiffres clés et des mots-clés.
- Logos : une pastille avec les initiales par défaut, ton logo EA pour le freelance. Dans Admin, Parcours, chaque expérience accepte une image de logo.
- « À propos de moi » propose deux lectures : « Je recrute » et « J’ai un projet ». Les textes, les accroches et les chiffres se modifient dans Admin, Profil, avec leur version anglaise.

## Essentiel par défaut

- Services, Blog, Boutique et dons, orbite 3D et palette Ctrl+K sont masqués. Aether est visible par défaut et peut être masqué dans Admin, Paramètres, « Sections et extras ». Rien n’est supprimé.
- L’écran d’accueil avec les trois choix (avec le son, sans son, mode sobre) s’affiche toujours.

## Sécurité et base de données

- La base Supabase sert de source de vérité quand tu publies depuis l’admin. Les visiteurs reçoivent le document public assaini (sans messages privés, sans activité et sans téléphone) et le catalogue de repli.
- Sur une base existante, exécute **une fois** `supabase/migration-securite.sql` dans Supabase → SQL Editor → Run, **après** avoir déployé le nouveau `admin.js` et le nouveau `remote.js`. Ce script est idempotent : le relancer ne casse rien.
- Sur une base neuve, exécute plutôt `supabase/schema-complete.sql`.
- Ensuite, connecte-toi au site avec GitHub (au moins une fois) : la migration enregistre ton compte comme administrateur. Si la requête de bootstrap ne trouve personne, connecte-toi d’abord, puis relance le bloc `insert into public.admins ...` indiqué en tête de la migration.
- L’accès admin est vérifié côté serveur via la table `public.admins` (aucun champ du JWT modifiable n’est utilisé). Les champs privés sont exclus du document public, et l’insertion dans `messages` est limitée (nom, e-mail, sujet et message contrôlés) pour freiner le spam.

## Limites importantes

- Sans connexion admin, le site affiche le document public chargé depuis Supabase (même assaini) ; en cas d’absence de réseau ou de contenu publié, il retombe sur `catalog.js` et les données de départ. C’est suffisant pour un visiteur, pas pour publier.
- Le contenu publié depuis l’admin part vers Supabase après un court délai. Si tu quittes la page trop vite, attends la fin de la synchronisation avant de fermer.
- Ce que tu enregistres localement reste aussi dans le navigateur de l’appareil utilisé ; vider le stockage du site remet le cache local à zéro (le prochain chargement récupère le contenu publié s’il existe).
- Les messages et les visites du tableau de bord ne sont plus préremplis.
- Le blog démarre vide : ajoute tes propres articles depuis l’admin.
- Le numéro de téléphone reste présent dans les données de départ du code (`assets/js/data.js`) et donc dans le CV généré côté navigateur ; ne le mets là que si tu acceptes qu’il soit techniquement lisible.

## Mettre en ligne

- GitHub Pages : pousse le dossier sur `main`. Le fichier `.nojekyll` empêche Jekyll de filtrer les assets.
- Vercel : importe le dépôt ; `.vercelignore` exclut les fichiers inutiles au déploiement statique.
- Le site fonctionne sans serveur ni étape de build.
