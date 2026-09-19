#!/bin/bash

# Script de déploiement vers GitHub pour Atelier 228
# Usage: ./deploy.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Déploiement Atelier 228 vers GitHub..."
echo ""

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du repository Git..."
    git init
fi

# Configurer le remote
echo "🔗 Configuration du remote GitHub..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/Anonyme-18/atelier228.git

# Ajouter tous les fichiers
echo "📝 Ajout des fichiers..."
git add .

# Commit
echo "💾 Création du commit initial..."
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

Features:
- Interactive 3D showroom
- Before/After sliders for every project
- Real-time conversion tracking per page
- Secure quote request system
- Admin dashboard with analytics
- Multi-language support ready

Tech Stack:
- Frontend: React 18, TypeScript, Vite, Tailwind CSS 4
- Backend: Neon PostgreSQL, Vercel Serverless Functions
- 3D: Three.js
- Testing: Vitest, Testing Library
- Code Quality: ESLint, Prettier, TypeScript strict mode

Deployment: Vercel (manual)
Repository: https://github.com/Anonyme-18/atelier228"

# Pousser vers GitHub
echo "📤 Push vers GitHub..."
git branch -M main
git push -u origin main --force

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "🌐 Repository: https://github.com/Anonyme-18/atelier228"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Aller sur Vercel (https://vercel.com)"
echo "2. Importer le repository: Anonyme-18/atelier228"
echo "3. Configurer les variables d'environnement:"
echo "   - VITE_NEON_DATABASE_URL (votre URL Neon)"
echo "   - VITE_ADMIN_CODE (code admin personnalisé)"
echo "4. Déployer !"
echo ""
echo "🎉 Bonne chance avec votre projet !"
