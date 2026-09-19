# Script de déploiement vers GitHub pour Atelier 228 (Windows PowerShell)
# Usage: .\deploy.ps1

Write-Host "🚀 Déploiement Atelier 228 vers GitHub..." -ForegroundColor Cyan
Write-Host ""

# Vérifier si Git est installé
try {
    $gitVersion = git --version
    Write-Host "✅ Git détecté: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Veuillez installer Git depuis https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Vérifier si Git est initialisé
if (-Not (Test-Path ".git")) {
    Write-Host "📦 Initialisation du repository Git..." -ForegroundColor Yellow
    git init
}

# Configurer le remote
Write-Host "🔗 Configuration du remote GitHub..." -ForegroundColor Yellow
try {
    git remote remove origin 2>$null
} catch {
    # Ignore if remote doesn't exist
}
git remote add origin https://github.com/Anonyme-18/atelier228.git

# Ajouter tous les fichiers
Write-Host "📝 Ajout des fichiers..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Création du commit initial..." -ForegroundColor Yellow
$commitMessage = @"
Initial commit: Atelier 228 - Renovation & Interior Design Website

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

Repository: https://github.com/Anonyme-18/atelier228
"@

git commit -m $commitMessage

# Pousser vers GitHub
Write-Host "📤 Push vers GitHub..." -ForegroundColor Yellow
git branch -M main

try {
    git push -u origin main --force
    Write-Host ""
    Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Repository: https://github.com/Anonyme-18/atelier228" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Prochaines étapes:" -ForegroundColor Yellow
    Write-Host "1. Aller sur Vercel (https://vercel.com)"
    Write-Host "2. Importer le repository: Anonyme-18/atelier228"
    Write-Host "3. Configurer les variables d'environnement:"
    Write-Host "   - VITE_NEON_DATABASE_URL (votre URL Neon)"
    Write-Host "   - VITE_ADMIN_CODE (code admin personnalisé)"
    Write-Host "4. Déployer !"
    Write-Host ""
    Write-Host "🎉 Bonne chance avec votre projet !" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ Erreur lors du push. Vérifiez votre authentification GitHub." -ForegroundColor Red
    Write-Host "Voir PUSH_INSTRUCTIONS.md pour plus d'informations." -ForegroundColor Yellow
    exit 1
}
