# 🚀 Guide de Déploiement - Atelier 228

## 📋 Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Git](https://git-scm.com/)
- Compte [GitHub](https://github.com/)
- Compte [Vercel](https://vercel.com/)
- Base de données [Neon](https://neon.tech/) (gratuit)

## 🔧 Installation Locale

### 1. Cloner le repository

```bash
git clone https://github.com/Anonyme-18/atelier228.git
cd atelier228
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` :

```bash
cp .env.example .env.local
```

Éditer `.env.local` et ajouter :

```env
# Base de données Neon
VITE_NEON_DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require

# Code admin (changez-le !)
VITE_ADMIN_CODE=votre_code_secret

# Analytics (optionnel)
VITE_GA_ID=G-XXXXXXXXXX
```

### 4. Configurer la base de données

Créer votre base de données sur [Neon](https://console.neon.tech/) :

1. Créer un nouveau projet
2. Copier l'URL de connexion
3. L'ajouter dans `.env.local`

Initialiser les tables :

```bash
npm run db:setup
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Visiter [http://localhost:5173](http://localhost:5173)

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec coverage
npm run test:coverage

# Mode watch
npm run test:watch
```

## 🏗️ Build pour la production

```bash
npm run build
```

Le build sera dans le dossier `dist/`

## 🌐 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer depuis GitHub : `Anonyme-18/atelier228`
4. Vercel détecte automatiquement Vite
5. Configurer les variables d'environnement :
   - `VITE_NEON_DATABASE_URL`
   - `VITE_ADMIN_CODE`
   - `VITE_GA_ID` (optionnel)
6. Cliquer sur "Deploy"

### Méthode 2 : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🔐 Sécurité

### Variables d'environnement importantes

- **VITE_NEON_DATABASE_URL** : URL de connexion à votre base de données Neon
- **VITE_ADMIN_CODE** : Code pour accéder au dashboard admin (à personnaliser !)
- **VITE_GA_ID** : ID Google Analytics (optionnel)

### Bonnes pratiques

1. **Ne jamais committer** `.env.local`
2. **Changer le code admin** par défaut
3. **Utiliser HTTPS** (automatique sur Vercel)
4. **Restreindre l'accès** à la base de données Neon par IP si possible

## 📊 Analytics

Le site inclut un système de tracking intégré :

- Visites par page
- Taux de conversion par page
- Soumissions de formulaires
- Clics sur les CTA

Accéder au dashboard admin : `/#/admin`

## 🎨 Personnalisation

### Modifier les couleurs

Éditer `src/index.css` :

```css
:root {
  --color-primary: #1a231e;
  --color-accent: #d9bc7f;
  --color-background: #f2f0e9;
}
```

### Ajouter des projets

Éditer `src/data/content.ts` :

```typescript
export const projects = [
  {
    id: "villa-baguida",
    title: "Villa T4 — rénovation complète",
    category: "renovation",
    // ... autres champs
  },
];
```

### Modifier les services

Éditer `src/data/content.ts` dans la section `SERVICES`.

## 📱 Responsive

Le site est mobile-first et testé sur :

- Mobile (320px+)
- Tablette (768px+)
- Desktop (1024px+)
- Grand écran (1440px+)

## 🐛 Dépannage

### Erreur de base de données

```bash
# Vérifier la connexion
npm run db:setup

# Vérifier les variables d'environnement
cat .env.local
```

### Erreur de build

```bash
# Nettoyer et reconstruire
rm -rf node_modules dist
npm install
npm run build
```

### Erreur de type TypeScript

```bash
# Vérifier les types
npm run typecheck
```

## 📞 Support

- **Documentation** : [README.md](./README.md)
- **Issues** : [GitHub Issues](https://github.com/Anonyme-18/atelier228/issues)
- **Email** : contact@atelier228.tg

## 🎉 Félicitations !

Votre site est maintenant déployé et prêt à convertir des visiteurs en clients !

---

**Développé avec ❤️ pour Atelier 228**
