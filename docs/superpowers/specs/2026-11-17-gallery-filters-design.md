# Design: Simplifier les filtres de la galerie

## Intention

Rendre la galerie des huit projets publiés plus accueillante sur mobile : montrer rapidement les projets et éviter d'exposer tous les filtres d'emblée.

## État actuel

Le référentiel compte 40 familles, 254 sous-catégories et 42 tags. La galerie expose 12 familles principales et empile six filtres sur mobile. À 390 × 844, le panneau de filtres mesure environ 542 px et le premier projet commence juste sous le premier écran.

## Approches

- **A — Conserver le référentiel, simplifier la galerie (retenue)** : garder les données pour l'avenir, n'exposer que les sept familles déjà mises en avant et utilisées par les projets publiés, puis replier les filtres secondaires sur mobile.
- **B — Réduire réellement le référentiel** : supprimer ou reclasser les familles et sous-catégories non utilisées. Plus radical, avec un risque de perte de taxonomie utile aux projets futurs.
- **C — Ne changer que la disposition mobile** : réduire la hauteur sans retirer les cinq familles mises en avant qui ne correspondent à aucun projet actuel.

## Conception retenue

- La liste principale de la galerie montre : Développement Web, Développement Mobile, Intelligence artificielle, Agents IA et systèmes agentiques, SaaS et produits logiciels, Design UI/UX et Cybersécurité.
- Le référentiel complet et les associations des projets restent conservés. Les autres familles ne sont pas supprimées; elles ne sont simplement plus mises en avant dans ce filtre.
- Sur mobile, la recherche, la catégorie et le tri restent accessibles d'emblée. Sous « Plus de filtres », placer sous-catégorie, technologie, tag et réinitialisation.
- La sous-catégorie n'apparaît qu'après le choix d'une catégorie qui possède des sous-catégories.
- L'ouverture des filtres avancés est accessible au clavier et annoncée avec `aria-expanded`. Les filtres actifs et les paramètres d'URL continuent de fonctionner.
- Le bureau conserve sa disposition actuelle, à l'exception de la liste de catégories plus courte.

## Hors périmètre et contraintes

- Pas de suppression ni de réaffectation des catégories dans les données des projets.
- Pas de changement des filtres de recherche, de pagination ou de tri.
- La mise à jour de la taxonomie Supabase sera fournie sous forme de seed SQL généré; elle ne sera pas appliquée au projet distant par l'agent.
- Les fichiers de traduction déjà modifiés dans le worktree ne font pas partie de cette tâche.

## Validation attendue

- Tests DOM : sept familles proposées, sous-catégorie masquée sans catégorie, ouverture/fermeture du panneau avancé, filtres et réinitialisation inchangés.
- `npm test` et vérification visuelle de la galerie aux tailles mobile et bureau.
