# Atelier 228

Site vitrine pour une entreprise de rénovation et d’aménagement intérieur à Lomé, au Togo.

Le projet présente les services, réalisations, comparatifs avant/après et une visite 3D. Le formulaire de devis enregistre les demandes dans PostgreSQL via une fonction serverless Vercel. L’espace entreprise est protégé par un jeton serveur et ne conserve pas les données clients dans le navigateur.

## Stack

- React 18, TypeScript, Vite et Tailwind CSS
- Three.js pour la visite 3D, chargée à la demande
- Vercel Functions et Neon PostgreSQL
- Vitest, ESLint, Prettier et TypeScript strict

## Développement local

Prérequis : Node.js 18+ et une base PostgreSQL Neon.

```bash
npm install
cp .env.example .env.local
npm run db:setup
npm run dev
```

Sous Windows PowerShell, utilise `Copy-Item .env.example .env.local` à la place de `cp`.

Variables requises dans `.env.local` :

```env
NEON_DATABASE_URL=postgresql://...
```


## Vérifications

```bash
npm run typecheck
npm run lint
npm test -- --run --pool=threads --maxWorkers=1
npm run build
```

## Déploiement Vercel

1. Pousse le dépôt sur GitHub et importe-le dans Vercel.
2. Conserve `npm run build` comme commande de build et `dist` comme dossier de sortie.
3. Configure `NEON_DATABASE_URL` dans les variables d’environnement Vercel.
4. Lance `npm run db:setup` une seule fois avec les mêmes identifiants pour créer les tables et index.
5. Vérifie en Preview l’envoi du formulaire de devis avant la Production.

Les demandes publiques passent par `POST /api/quotes`.

## Sécurité

- Validation client et serveur, requêtes SQL paramétrées et limitation anti-spam.
- Données stockées côté serveur, jamais dans `localStorage`.
- Headers de sécurité appliqués par Vercel et la fonction API.

Pour signaler une vulnérabilité, ouvre une demande privée auprès du mainteneur plutôt qu’une issue publique.

## Licence

MIT. Voir [LICENSE](LICENSE).
