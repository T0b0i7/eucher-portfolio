# Voix hybride d’Aether

## Intention

Garder une voix personnalisée pour l’accueil d’Aether sans alourdir le portfolio
avec un enregistrement pour chaque réponse. Les réponses restent utilisables
même lorsqu’aucun fichier audio personnalisé n’existe.

## Approches considérées

- **Hybride (retenue)** : MP3 ElevenLabs pour les phrases enregistrées; synthèse
  vocale du navigateur pour les autres. Léger et sans serveur ni coût de
  génération à chaque réponse.
- **ElevenLabs à la demande** : même voix pour les réponses dynamiques, mais
  nécessite une fonction serveur, une clé API protégée et peut entraîner des
  frais d’utilisation.
- **Synthèse du navigateur seulement** : aucune piste personnalisée, mais la
  voix varie selon l’appareil et le navigateur.

## Comportement attendu

- Quand la voix est activée, l’accueil utilise `assets/voix/v1d6d82q.mp3`.
- Les autres réponses utilisent la synthèse vocale française du navigateur,
  sauf si un MP3 personnalisé correspondant existe.
- Si le MP3 d’accueil est absent ou ne peut pas être lu, la synthèse du
  navigateur sert de secours.
- La voix peut être désactivée; les bulles de texte continuent de fonctionner.

## Hors périmètre et contraintes

- Ne pas générer ni stocker un MP3 pour chaque réplique.
- Ne pas ajouter de compte ElevenLabs, clé API, serveur ou MCP.
- Conserver le fonctionnement statique du portfolio et son secours vocal
  existant.

## État actuel

Le code utilise déjà ce mécanisme hybride et le MP3 d’accueil est présent.
Aucune modification de code n’est nécessaire pour le comportement décrit.
