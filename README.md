# trainning-app

Web app (PWA) pour suivre mon programme : tennis de table, renforcement musculaire et running.

- **Semaine** : le programme jour par jour (ping le vendredi, lundi et mardi en déplacement ; options « Match ce dimanche » et « Ping exceptionnel mardi » qui adaptent la semaine).
- **Séance** : exercices avec dosage, consignes, charges, ressenti (RPE) et notes.
- **Exercices** : bibliothèque avec l'intérêt de chaque exercice pour le ping.
- **Historique** : séances faites et bilan des 4 dernières semaines.

Cycle de 4 semaines (3 de progression, 1 allégée). Les données restent sur le téléphone (localStorage), avec export et import JSON dans Réglages.

Le contenu et les sources sont dans [`docs/recherche-entrainements.md`](docs/recherche-entrainements.md) ; les séances sont définies dans `js/data.js`.

## Lancer en local

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

Aucune dépendance ni build. Pour l'installer sur le téléphone, le servir en HTTPS (par exemple GitHub Pages), puis « Ajouter à l'écran d'accueil ».
