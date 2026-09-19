# 🚀 Guide Rapide - Atelier 228

## ✅ Checklist avant de pousser sur GitHub

### 1. Vérifier les fichiers importants

- [x] README.md (documentation principale)
- [x] README_GITHUB.md (version avec badges pour GitHub)
- [x] DEPLOYMENT.md (guide de déploiement)
- [x] CONTRIBUTING.md (guide de contribution)
- [x] PUSH_INSTRUCTIONS.md (instructions pour push)
- [x] FINAL_SUMMARY.md (résumé complet)
- [x] .env.example (template de configuration)
- [x] LICENSE (licence MIT)
- [x] deploy.sh (script Linux/Mac)
- [x] deploy.ps1 (script Windows)

### 2. Vérifier la configuration

- [x] package.json (nom: atelier228)
- [x] tsconfig.json (mode strict)
- [x] .eslintrc.json (linting configuré)
- [x] .prettierrc (formatage configuré)
- [x] vercel.json (déploiement Vercel)
- [x] .gitignore (fichiers ignorés)

### 3. Vérifier le code

- [x] Build réussi (`npm run build`)
- [x] Tests passent (`npm test`)
- [x] TypeScript strict (0 erreurs)
- [x] Code optimisé (code splitting)

---

## 🎯 Étapes pour pousser sur GitHub

### Option 1 : Script automatique (Recommandé)

**Sur Linux/Mac :**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Sur Windows :**
```powershell
.\deploy.ps1
```

### Option 2 : Commandes manuelles

```bash
# 1. Initialiser Git
git init

# 2. Ajouter le remote
git remote add origin https://github.com/Anonyme-18/atelier228.git

# 3. Ajouter tous les fichiers
git add .

# 4. Commit
git commit -m "Initial commit: Atelier 228"

# 5. Renommer en main
git branch -M main

# 6. Push
git push -u origin main --force
```

---

## 🌐 Étapes pour déployer sur Vercel

### 1. Créer la base de données Neon

1. Aller sur [neon.tech](https://neon.tech)
2. Créer un compte (gratuit)
3. Créer un nouveau projet
4. Copier l'URL de connexion

### 2. Déployer sur Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "New Project"
3. Importer depuis GitHub : `Anonyme-18/atelier228`
4. Vercel détecte automatiquement Vite
5. Ajouter les variables d'environnement :
   ```
   VITE_NEON_DATABASE_URL=postgresql://...
   VITE_ADMIN_CODE=votre_code_secret
   VITE_GA_ID=G-XXXXXXXXXX (optionnel)
   ```
6. Cliquer sur "Deploy"

### 3. Initialiser la base de données

Après le déploiement, exécuter localement :
```bash
npm run db:setup
```

---

## 🎨 Personnalisation rapide

### Modifier les coordonnées

Éditer `src/data/content.ts` :
```typescript
export const CONTACT = {
  phoneDisplay: "+228 XX XX XX XX",
  phoneHref: "tel:+228XXXXXXXX",
  whatsappUrl: "https://wa.me/228XXXXXXXX",
  email: "contact@votre-entreprise.tg",
  address: "Votre adresse, Lomé — Togo",
  // ...
};
```

### Ajouter des photos réelles

Remplacer les URLs dans `src/data/content.ts` :
```typescript
const IMG = {
  hero: "URL_DE_VOTRE_PHOTO.jpg",
  // ... autres photos
};
```

### Modifier le code admin

Dans `.env.local` :
```env
VITE_ADMIN_CODE=votre_code_secret
```

---

## 📊 Fonctionnalités à tester

### Site public
- [ ] Page d'accueil
- [ ] Navigation responsive
- [ ] Formulaire de devis
- [ ] Comparateur avant/après
- [ ] Visite 3D
- [ ] Page services
- [ ] Page réalisations

### Dashboard admin
- [ ] Accès avec code
- [ ] Liste des demandes
- [ ] Statistiques de conversion
- [ ] Export des données

---

## 🐛 Dépannage

### Erreur de build
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Erreur de base de données
```bash
# Vérifier .env.local
cat .env.local

# Réinitialiser la base
npm run db:setup
```

### Erreur de push
Voir `PUSH_INSTRUCTIONS.md` pour les solutions.

---

## 📞 Ressources

- **Documentation complète** : README.md
- **Guide de déploiement** : DEPLOYMENT.md
- **Instructions push** : PUSH_INSTRUCTIONS.md
- **Guide de contribution** : CONTRIBUTING.md
- **Résumé final** : FINAL_SUMMARY.md

---

## 🎉 Félicitations !

Votre site est prêt ! 

**Prochaine action :**
```bash
# Lire les instructions détaillées
cat PUSH_INSTRUCTIONS.md

# Puis exécuter le script
./deploy.sh  # ou .\deploy.ps1
```

---

**Bonne chance avec votre projet ! 🚀**
