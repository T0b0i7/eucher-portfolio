# Portfolio d’Eucher ABATTI

Portfolio rouge et noir avec animations, sons, blog et espace d’administration intégré.

## Contenu du dossier

- `index.html` : le site complet (un seul fichier, tout est intégré)
- `assets/logo-ea.png` : ton logo EA détouré (fond transparent)
- `assets/portrait.jpg` : ton portrait retravaillé en noir et blanc

## Ouvrir le site

Double-clique sur `index.html`. Une connexion internet n’est utile que pour charger les polices (Anton, Oswald, Inter). Sans connexion, des polices de secours s’affichent.

## Utiliser l’espace d’administration

- Clique sur « 🔒 Connexion » en bas de page, ou appuie sur `Ctrl + Maj + A` (ou `Alt + Maj + A` : sur Chrome, `Ctrl + Maj + A` peut être réservé par le navigateur).
- L’espace est protégé par une connexion GitHub via Supabase, réservée à ton compte. Voir `docs/ARCHITECTURE.md`.
- Menus : Tableau de bord, Projets, Blog, Boutique, Compétences, Profil, Messages, Paramètres.
- Le bouton « Mettre à jour le portfolio » enregistre et te ramène sur le site.
- Paramètres, puis Exporter : télécharge toutes tes données dans un fichier JSON (sauvegarde).

## Astuces

- `Ctrl + K` : palette de commandes (navigation, projets, articles, son, e-mail).
- Le coin bas droite affiche la date, le moment de la journée et la section où tu te trouves.
- Un code secret se cache sur la page : essaie le fameux code Konami (flèches haut, haut, bas, bas, gauche, droite, gauche, droite, B, A).

## Zéo, le bot IA

- Zéo se balade tout seul sur la page. Clique sur lui pour ouvrir son panneau.
- Commandes vocales (bouton 🎤) ou écrites : « résume les projets », « ouvre ZemPro », « qui es-tu ? », « qui est Eucher ? », « ses compétences », « va dans le blog », « coupe le son », « raconte une blague ».
- La voix (reconnaissance et synthèse) dépend du navigateur : elle marche surtout sur Chrome, Edge et Safari, avec l’autorisation du micro. Sans micro, on peut écrire.
- Les commandes connues fonctionnent sans connexion. Les questions libres ne sont pas envoyées à un service externe depuis ce site.

## Voix personnalisée

- Dans le panneau de Zéo, le bouton ⚙ règle la voix du navigateur : choix de la voix, vitesse et hauteur.
- Pour utiliser ta propre voix (par exemple avec ElevenLabs), suis `docs/voix/COMMENT-FAIRE.md` : tu déposes des mp3 dans `docs/voix-assets/`.

## Boutique et dons

- Menu Admin, puis Boutique : ajoute tes produits (animations, templates, codes sources) avec prix, description, contenu inclus, licence et lien de paiement.
- Pour encaisser sans serveur : crée un lien de paiement chez une plateforme locale (par exemple FedaPay ou KKiaPay) et colle-le dans « Lien de paiement ». Le bouton « Acheter » y mène. Le suivi des ventes se fait chez la plateforme.
- Dons : renseigne le lien de don et, si tu veux, ton texte Mobile Money dans Paramètres. Active ensuite « Dons » projet par projet depuis la fiche du projet dans l’admin.
- Les 8 produits fournis sont des exemples en brouillon : modifie les prix, les textes et la licence avant de les publier. Ne vends jamais d’éléments tirés de jeux ou de personnages dont tu n’as pas les droits.

## Langues (français et anglais)

- Le sélecteur FR / EN se trouve dans le petit bloc en bas à droite, pas dans le menu. Le choix est mémorisé, et la langue du navigateur est détectée à la première visite.
- Tout le portfolio public est traduit : textes, projets, articles d’exemple, boutique, paiement, palette Ctrl+K et Zéo, qui comprend alors les commandes en anglais.
- Pour ton propre contenu (projets, articles, produits), l’admin a des champs « version anglaise » et un bouton « Traduire en anglais » qui prépare un brouillon à relire. La traduction automatique n’est pas branchée sur ce site : saisis la version anglaise à la main.
- Pour ajouter une traduction à un texte fixe, ajoute une ligne dans l’objet `D18` (français : anglais) en bas de `index.html`.

## Bouton Payer

- Chaque produit de la boutique a un bouton « Payer » (ou « Demander un devis » si le prix est sur demande).
- Avec un lien de paiement, il mène à la page de paiement. Sans lien, il ouvre un formulaire de commande qui prépare un e-mail (et un message WhatsApp si tu renseignes ton numéro dans Paramètres).

## Services et demandes de projet

- La section « Ce que je propose » présente 4 services et ta méthode de travail. Ils se gèrent dans Admin, menu Services (ajouter, modifier, réordonner, supprimer, version anglaise). Relis les textes de départ : ils sont à adapter à ton offre réelle.
- Les services alimentent aussi le choix « Type de projet » du formulaire et la liste de services du CV. Le titre et la description de Paramètres alimentent la description pour les moteurs de recherche.
- Le formulaire « Démarrer un projet » (section Contact) prépare un e-mail complet pour toi.
- Le bouton « Mon CV (PDF) » (section À propos) ouvre un CV généré depuis ton profil, tes compétences et tes projets. Imprime-le ou enregistre-le en PDF avec `Ctrl + P`.
- Dans Admin, Paramètres : le badge « Disponible pour de nouvelles missions » est désactivé par défaut. Active-le quand c’est vrai.
- Le site contient aussi une description pour les moteurs de recherche et les réseaux sociaux, un lien « Aller au contenu » et un focus clavier visible.

## Mode sobre

- Le bouton « ✦ » dans le bloc en bas à droite (ou « Entrer en mode sobre » sur l’écran d’accueil, ou Ctrl+K puis « Réduire les effets ») coupe les sons, les animations, le curseur personnalisé et Zéo.
- Le choix est mémorisé. Le mode sobre ne s’active jamais tout seul : c’est le visiteur qui le choisit.

## Effets 3D

- Cartes (projets, blog, boutique, services) : inclinaison 3D qui suit la souris, avec un reflet.
- Accueil : le nom et le portrait bougent en profondeur avec la souris (ordinateur).
- Compétences : une orbite 3D des logos de technologies, qu’on fait tourner en glissant. Elle suit la liste de compétences de l’admin.
- Tout est en CSS et JavaScript léger, sans bibliothèque. Le mode sobre (✦) désactive ces effets.

## Ton CV dans le portfolio

- Les contenus de ton CV sont intégrés : profil, expériences, formation, compétences par catégorie, langues et centres d’intérêt. Section « Parcours » du site.
- Tout se modifie dans Admin : menu Parcours (expériences et formation), menu Profil (profil, ville, téléphone, langues, intérêts), menu Compétences.
- Pour n'afficher que le CV : Admin, Paramètres, « Masquer la section Parcours ». Le bouton « Voir mon CV » apparaît alors sur l'accueil.
- Le bouton « Mon CV (PDF) » génère un CV propre depuis ces données (Ctrl + P puis « Enregistrer au format PDF »). Ton téléphone n’apparaît que sur ce CV, pas sur le site.
- Ton ancien PDF n’est plus dans le dossier. Si tu veux proposer un PDF à télécharger, enregistre le CV généré (Ctrl + P) puis dépose-le dans `assets/`.

## Parcours animé et À propos

- Les expériences et la formation apparaissent une à une, avec la ligne du temps qui se dessine, un logo par organisation, la pastille « En cours », des chiffres clés et des mots-clés.
- Logos : une pastille avec les initiales par défaut, ton logo EA pour le freelance. Dans Admin, Parcours, chaque expérience accepte une image de logo.
- « À propos de moi » propose deux lectures : « Je recrute » et « J’ai un projet ». Les textes, les accroches et les chiffres se modifient dans Admin, Profil, avec leur version anglaise.

## Essentiel par défaut

- Services, Blog, Boutique et dons, Zéo, orbite 3D et palette Ctrl+K sont masqués. Rien n’est supprimé : active-les dans Admin, Paramètres, « Sections et extras ».
- L’écran d’accueil avec les trois choix (avec le son, sans son, mode sobre) s’affiche toujours.

## Limites importantes

- Les modifications sont enregistrées dans le navigateur (localStorage), sur l’appareil où tu les fais. Les autres visiteurs ne les voient pas.
- La connexion GitHub protège l’accès à l’interface d’administration. Tes contenus restent enregistrés dans le navigateur, pas sur un serveur.
- Pour que tes articles et projets soient visibles publiquement, ils doivent être écrits dans le fichier lui-même (par exemple avec l’export JSON, à réintégrer dans le code du site).
- Les messages et les visites du tableau de bord ne sont plus préremplis.
- Le blog démarre vide : ajoute tes propres articles depuis l’admin.
- Les aperçus des projets sont des visuels générés en SVG, signalés par le badge « aperçu ».

## Mettre en ligne

Glisse le dossier sur Netlify Drop, Vercel, ou publie-le avec GitHub Pages. Le site fonctionne sans serveur.
