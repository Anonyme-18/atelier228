# 📤 Instructions pour Push sur GitHub

## 🎯 Objectif

Pousser le code du projet Atelier 228 vers le repository GitHub : **https://github.com/Anonyme-18/atelier228**

## 📋 Prérequis

1. **Git installé** sur votre machine
   - Vérifier : `git --version`
   - Installer : https://git-scm.com/downloads

2. **Compte GitHub** avec accès au repository
   - Si le repo n'existe pas encore, créez-le sur GitHub

3. **Authentification GitHub configurée**
   - SSH key (recommandé) ou Personal Access Token

## 🚀 Méthode 1 : Script automatique (Recommandé)

### Sur Linux/Mac :

```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Exécuter le script
./deploy.sh
```

### Sur Windows (PowerShell) :

```powershell
# Exécuter le script PowerShell
.\deploy.ps1
```

## 🛠️ Méthode 2 : Commandes manuelles

### Étape 1 : Initialiser Git

```bash
git init
```

### Étape 2 : Configurer le remote

```bash
git remote add origin https://github.com/Anonyme-18/atelier228.git
```

Ou avec SSH :

```bash
git remote add origin git@github.com:Anonyme-18/atelier228.git
```

### Étape 3 : Ajouter tous les fichiers

```bash
git add .
```

### Étape 4 : Créer le commit initial

```bash
git commit -m "Initial commit: Atelier 228 - Renovation & Interior Design Website

- High-conversion website for renovation company in Lomé, Togo
- React 18 + TypeScript + Vite + Tailwind CSS
- Three.js 3D showroom (lazy-loaded)
- Before/After image comparators
- Quote request system with Neon PostgreSQL
- Admin dashboard with conversion tracking
- Full responsive design (mobile-first)
- SEO optimized
- Unit tests with Vitest
- ESLint + Prettier configured

Repository: https://github.com/Anonyme-18/atelier228"
```

### Étape 5 : Renommer la branche en main

```bash
git branch -M main
```

### Étape 6 : Pousser vers GitHub

```bash
git push -u origin main --force
```

**Note** : `--force` est nécessaire si le repo existe déjà avec du contenu.

## 🔐 Authentification

### Option A : HTTPS (avec Personal Access Token)

1. Aller sur GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Générer un nouveau token avec les scopes : `repo`, `workflow`
3. Copier le token
4. Lors du push, utiliser le token comme mot de passe

### Option B : SSH (Recommandé)

1. Générer une clé SSH :
   ```bash
   ssh-keygen -t ed25519 -C "votre-email@example.com"
   ```

2. Ajouter la clé à l'agent SSH :
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copier la clé publique :
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. Ajouter sur GitHub :
   - Settings → SSH and GPG keys → New SSH key
   - Coller la clé

5. Utiliser l'URL SSH pour le remote :
   ```bash
   git remote set-url origin git@github.com:Anonyme-18/atelier228.git
   ```

## ✅ Vérification

Après le push, vérifier sur GitHub :

1. Aller sur https://github.com/Anonyme-18/atelier228
2. Rafraîchir la page
3. Vérifier que tous les fichiers sont présents

## 🌐 Prochaine étape : Déploiement sur Vercel

1. Aller sur https://vercel.com
2. Cliquer sur "New Project"
3. Importer depuis GitHub : `Anonyme-18/atelier228`
4. Configurer les variables d'environnement :
   - `VITE_NEON_DATABASE_URL`
   - `VITE_ADMIN_CODE`
   - `VITE_GA_ID` (optionnel)
5. Cliquer sur "Deploy"

## 🐛 Dépannage

### Erreur : "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/Anonyme-18/atelier228.git
```

### Erreur : "Updates were rejected"

```bash
git push -u origin main --force
```

### Erreur : "Permission denied (publickey)"

Vérifier votre configuration SSH :
```bash
ssh -T git@github.com
```

### Erreur : "Authentication failed"

Vérifier votre token ou clé SSH, puis :
```bash
git remote set-url origin https://github.com/Anonyme-18/atelier228.git
```

## 📞 Besoin d'aide ?

- Documentation Git : https://git-scm.com/doc
- GitHub Docs : https://docs.github.com
- Issues : https://github.com/Anonyme-18/atelier228/issues

---

**Bonne chance avec votre déploiement ! 🚀**
