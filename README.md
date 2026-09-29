# Portfolio photo

Site portfolio de photographe, construit avec Next.js 16 et TypeScript.

## Développement

```bash
npm run dev
```

## Images

Les trois dossiers d'images sont locaux et hors Git :

```text
images-original/ -> public/images/ -> public/images-thumbnails/
```

Pour ajouter une galerie : déposer les originaux dans `images-original/galleries/<slug>/`, ajouter son entrée dans `src/data/galleries.ts`, puis lancer `npm run photos` et `npm run build`. Commiter ensuite `src/data/photo-manifest.json`.

## Mise en ligne

Commande de déploiement à compléter.
