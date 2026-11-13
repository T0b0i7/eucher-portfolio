# Aether en mode texte uniquement

## Intention

Conserver Aether comme assistant visuel et conversationnel, mais sans voix ni
commandes au micro. Les visiteurs peuvent toujours saisir leurs commandes et
lire les réponses. Les fichiers MP3 de la voix d’Aether sont supprimés.

## Approches

- **Aether en texte uniquement (retenue)** : préserver le panneau, les réponses
  et les commandes écrites tout en retirant l’entrée et la sortie vocales.
- **Supprimer Aether entièrement** : plus simple, mais supprime aussi l’assistant
  écrit que l’utilisateur souhaite conserver.

## Objectifs et limites

- Retirer les commandes vocales, la synthèse vocale, les réglages de voix, le
  bouton de test et le bouton micro.
- Supprimer les MP3 de `assets/voix/` et mettre à jour les explications de
  l’assistant devenues obsolètes.
- Conserver les fonctions écrites d’Aether, son apparence et les autres sons du
  portfolio.
- Ne pas supprimer ni modifier les autres effets sonores du site.

## Contraintes et choix d’implémentation

- Le portfolio reste statique et sans nouvelle dépendance.
- Les commandes écrites continuent d’utiliser les capacités actuelles du bot.
- Retirer tout appel à la synthèse ou reconnaissance vocales du navigateur.
- Mettre à jour la documentation d’utilisation et vérifier qu’aucune référence
  active ne pointe vers les MP3 supprimés.
