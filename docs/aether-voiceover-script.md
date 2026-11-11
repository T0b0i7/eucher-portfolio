# Script de voix off d’Aether

Ce document rassemble les phrases françaises qu’Aether peut prononcer dans le
portfolio. Les indications entre crochets servent à la production : ne les
enregistre pas comme des mots.

## Direction de voix

Voix chaleureuse, claire et complice, comme un assistant de portfolio qui
accueille et guide sans être trop formel. Articule les noms de projets et les
termes techniques. Garde un débit modéré et une énergie légère; évite la voix
robotique ou les effets dramatiques. Enregistre chaque réplique séparément,
sans musique de fond ni silence ajouté au début ou à la fin.

## Répliques fixes à enregistrer

Enregistre chaque ligne comme un fichier audio distinct :

1. « Salut, je suis Aether, l’assistant vocal du portfolio d’Eucher. Clique sur moi et demande-moi de résumer ses projets ! »
2. « Salut, voici ma voix. Qu’en penses-tu ? »
3. « Je suis Aether, l’assistant vocal du portfolio de Tobi. Je me balade à ma guise, je comprends tes commandes vocales ou écrites, et je peux t’emmener dans une section, ouvrir et résumer ses projets, ou te parler de lui. Pose-moi aussi une question libre ! »
4. « Voici ce que je sais faire : résumer les projets, ouvrir un projet, par exemple “ouvre Clavis”, t’emmener dans une section, te présenter Tobi et ses compétences, lire le dernier article, couper ou activer le son, ou te raconter une blague. »
5. « Allons voir les projets de Tobi ! »
6. « Voilà, c’est la fin du tour ! Dis “ouvre” suivi du nom d’un projet pour voir son détail. »
7. « Pourquoi les développeurs préfèrent le mode sombre ? Parce que la lumière attire les bugs ! »
8. « Il y a 10 types de personnes : celles qui comprennent le binaire, et les autres. »
9. « Pourquoi le développeur est-il malheureux ? Parce qu’il a trop de problèmes et pas assez de solutions. »
10. « C’est la fête ! »
11. « Son coupé. »
12. « Son activé. »
13. « Merci ! Les dons se font depuis la fiche d’un projet ou depuis la boutique. »
14. « La boutique ouvre bientôt ! »
15. « Je passe en français ! »
16. « Salut ! Je suis Aether. Demande-moi de résumer les projets ! »
17. « Avec plaisir ! »
18. « Pourquoi le développeur est-il malheureux ? Parce qu’il a trop de problèmes et pas assez de solutions. »
19. « Je n’ai pas compris. Essaie : “résume les projets”, “ouvre Clavis”, “qui es-tu ?” ou “va dans le blog”. »

Certaines lignes ont un usage particulier :

- La ligne 1 est l’accueil vocal après l’écran d’introduction lorsque la voix est activée.
- La ligne 2 est le bouton « Tester la voix ».
- La ligne 16 est prononcée lorsqu’on dit bonjour à Aether.
- La ligne 19 sert de réponse de secours si Aether ne comprend pas une commande ou si sa réponse IA échoue.

## Messages affichés mais non lus

Ces textes sont montrés dans une bulle ou dans la conversation avec la voix en
mode silencieux. Ne les enregistre pas comme des réponses parlées :

- « Salut ! Je suis Aether ! Clique sur moi pour me parler. »
- « Salut, je suis Aether, l’assistant vocal du portfolio ! Tape une commande ou appuie sur 🎤 et parle-moi. »
- « Psst… dis-moi “résume les projets” ! »
- « Clique sur moi pour me parler ! »
- « Essaie : “ouvre ZemPro”. »
- « Zzz… »
- « Hein ? Je suis réveillé ! »
- « Je t’écoute… »
- « Je réfléchis… »
- « D’accord, je me tais. »
- « Ton navigateur ne gère pas la reconnaissance vocale. Écris-moi ta commande, je la comprendrai aussi ! »
- « Je n’ai pas accès au micro. Autorise-le dans ton navigateur, ou écris-moi ta commande. »
- « Je n’ai rien entendu. Réessaie ! »
- « La voix ne marche pas ici ([erreur de reconnaissance]). Écris-moi ta commande. »

Lorsque l’utilisateur demande à Aether de parler anglais, la phrase « Switching
to English. How can I help? » est prononcée en anglais par la synthèse vocale
du navigateur; elle n’utilise pas d’enregistrement personnalisé.

## Répliques variables

Ces réponses sont construites avec le contenu du portfolio. Les crochets
indiquent les valeurs insérées par le site et ne doivent pas être lus tels
quels. Pour utiliser un enregistrement personnalisé pour une réponse variable,
il faut enregistrer chaque texte final exact, après insertion des valeurs.

### Navigation

Modèle : « Direction [nom de la section] ! »

Exemples :

- « Direction l’accueil ! »
- « Direction les projets ! »
- « Direction les compétences ! »
- « Direction la section à propos ! »
- « Direction le blog ! »
- « Direction la boutique ! »
- « Direction le contact ! »

### Présentation d’un projet pendant la visite

Modèle : « [Rang] projet : [nom du projet]. [Description]. [Fonctions clés : trois fonctions, si renseignées]. Technologies : [jusqu’à quatre technologies]. »

Le rang peut être « Premier », « Deuxième », « Troisième », « Quatrième »,
« Cinquième », « Sixième », « Septième » ou « Huitième ».

### Résumé ou détail d’un projet demandé

Modèle : « [Nom du projet]. [Description détaillée]. [Fonctions clés : jusqu’à trois fonctions, si renseignées]. Technologies : [jusqu’à quatre technologies]. »

### Présentation d’Eucher

Modèle : « [Nom]. [Titre]. Ses technologies phares : [trois compétences]. Il a notamment réalisé [noms des projets]. Pour le contacter, rendez-vous dans la section contact. »

### Compétences

Modèle : « Ses compétences les plus solides : [cinq compétences]. Il en maîtrise [nombre] au total. »

### Boutique

Quand il y a des produits : « Dans la boutique, tu peux trouver : [noms des produits]. »

Quand la boutique est vide, Aether prononce la ligne fixe numéro 14.

### Dernier article

Modèle : « Dernier article : [titre de l’article]. [Extrait de l’article]. »

### Question libre

La réponse est générée à partir des données actuelles du profil et du portfolio.
Elle peut varier à chaque question et comporte deux ou trois phrases courtes.
Il n’existe donc pas de texte unique à enregistrer pour cette catégorie.

### Erreurs de micro

Les messages d’erreur de reconnaissance vocale sont affichés, mais volontairement
passés en mode silencieux. Ils n’ont pas besoin d’être enregistrés pour la voix
off. Il en va de même pour les bulles d’état comme « Je t’écoute… » et
« Je réfléchis… », les indications d’aide, et « Zzz… ».

## Nommage des fichiers MP3

Place les enregistrements français dans `assets/voix/`. Pour chaque phrase,
le portfolio cherche exactement :

```text
assets/voix/v<empreinte-en-base36>.mp3
```

L’empreinte est calculée sur le texte final prononcé après ces transformations :

1. Les guillemets français `«` et `»` sont supprimés.
2. Le caractère `·` est remplacé par une virgule.
3. `&` est remplacé par ` et `.
4. L’algorithme démarre à `5381`, puis calcule pour chaque caractère :
   `h = ((h << 5) + h + codeDuCaractère) | 0`.
5. Le résultat non signé est converti en base 36.

Pour calculer le chemin d’une réplique, colle-la telle quelle en dernier
argument de cette commande PowerShell (Node.js doit être installé) :

```powershell
node -e "const s=process.argv[1].replace(/[«»]/g, '').replace(/·/g, ',').replace(/&/g, ' et '); let h=5381; for(let i=0;i<s.length;i++) h=((h<<5)+h+s.charCodeAt(i))|0; console.log('assets/voix/v'+(h>>>0).toString(36)+'.mp3')" "Salut ! Je suis Aether. Demande-moi de résumer les projets !"
```

Copie le chemin affiché et donne ce nom au MP3 correspondant. Répète pour
chaque ligne que tu as enregistrée. Les réponses variables nécessitent
également un MP3 au nom exact pour chaque formulation finale; si le fichier
n’existe pas, le navigateur reprend automatiquement la synthèse vocale.

Les enregistrements personnalisés sont utilisés pour les répliques en français.
En anglais, Aether utilise la voix anglaise choisie dans le navigateur.
