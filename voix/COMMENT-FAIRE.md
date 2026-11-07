# Donner une voix personnalisée à Zéo (ElevenLabs ou autre)

1. Ouvre `script-voix-zeo.txt` : chaque bloc contient un nom de fichier et la phrase à lire.
2. Dans ElevenLabs, choisis ou crée ta voix (clonage seulement avec ta propre voix ou une voix dont tu as les droits).
3. Génère chaque phrase et télécharge l’audio en mp3.
4. Renomme chaque fichier avec le nom indiqué (par exemple `v1i9f7wf.mp3`) et place-le dans `assets/voix/`.
5. Ouvre `index.html` : Zéo joue ton fichier quand il dit cette phrase exacte, et reprend la voix du navigateur pour les autres.

Important :
- Ne mets jamais ta clé API ElevenLabs dans `index.html` : tout visiteur pourrait la copier et dépenser ton crédit.
- Si tu changes un projet ou un texte de Zéo, la phrase change et son nom de fichier aussi. Ouvre la console du navigateur et tape `zeoLines()` pour obtenir la liste à jour des phrases.
- Pour une voix en direct sur n’importe quelle phrase, il faut un petit serveur intermédiaire (Netlify Function, Cloudflare Worker) qui garde la clé secrète.
