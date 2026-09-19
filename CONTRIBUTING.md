# 🤝 Guide de Contribution - Atelier 228

Merci de votre intérêt à contribuer à Atelier 228 ! Ce document vous guide dans le processus.

## 📋 Table des matières

- [Code de conduite](#code-de-conduite)
- [Comment contribuer](#comment-contribuer)
- [Setup de développement](#setup-de-développement)
- [Style de code](#style-de-code)
- [Processus de pull request](#processus-de-pull-request)
- [Structure du projet](#structure-du-projet)

## 📜 Code de conduite

En contribuant à ce projet, vous vous engagez à :

- Être respectueux et inclusif
- Accepter les critiques constructives
- Se concentrer sur ce qui est meilleur pour la communauté
- Faire preuve d'empathie envers les autres contributeurs

## 🚀 Comment contribuer

### 🐛 Signaler un bug

1. Vérifier si le bug n'a pas déjà été signalé dans les [Issues](https://github.com/Anonyme-18/atelier228/issues)
2. Créer une nouvelle issue avec :
   - Description claire du bug
   - Étapes pour reproduire
   - Comportement attendu vs actuel
   - Screenshots si possible
   - Environnement (OS, navigateur, version Node)

### 💡 Suggérer une amélioration

1. Ouvrir une issue avec le label "enhancement"
2. Décrire clairement l'amélioration proposée
3. Expliquer pourquoi elle serait utile

### 📝 Contribuer du code

1. Fork le repository
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Coder votre feature
4. Tester (`npm test`)
5. Commit (`git commit -m 'Add AmazingFeature'`)
6. Push (`git push origin feature/AmazingFeature`)
7. Ouvrir une Pull Request

## 🛠️ Setup de développement

```bash
# Cloner votre fork
git clone https://github.com/VOTRE_USERNAME/atelier228.git
cd atelier228

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# Initialiser la base de données
npm run db:setup

# Lancer le serveur de développement
npm run dev
```

## 🎨 Style de code

### TypeScript

- Utiliser TypeScript strict mode
- Typage explicite (éviter `any`)
- Interfaces pour les objets complexes
- Types pour les props React

### React

- Components fonctionnels avec hooks
- Props typées avec TypeScript
- Hooks personnalisés pour la logique réutilisable
- Lazy loading pour les components lourds

### CSS

- Tailwind CSS uniquement
- Mobile-first approach
- BEM naming pour les classes custom
- Variables CSS pour les couleurs

### Commits

Format conventionnel :

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types :

- `feat`: Nouvelle feature
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactoring
- `test`: Ajout de tests
- `chore`: Maintenance

Exemples :

```
feat(quote): add budget range selector

fix(3d): resolve camera clipping issue

docs(readme): update deployment instructions
```

## 🔄 Processus de Pull Request

1. **Vérifier** que votre code suit les guidelines
2. **Tester** localement (`npm test`, `npm run build`)
3. **Mettre à jour** la documentation si nécessaire
4. **Créer** la PR avec une description claire
5. **Attendre** la review
6. **Corriger** les commentaires si nécessaire
7. **Merge** après approbation

### Checklist PR

- [ ] Code suit les guidelines
- [ ] Tests passent (`npm test`)
- [ ] Build fonctionne (`npm run build`)
- [ ] Documentation mise à jour
- [ ] Pas de console.log ou code de debug
- [ ] Responsive testé (mobile, tablet, desktop)
- [ ] Accessibilité vérifiée (contrastes, aria-labels)

## 📁 Structure du projet

```
atelier228/
├── src/
│   ├── components/      # Composants réutilisables
│   │   ├── ui.tsx      # Primitives UI (Button, Input, etc.)
│   │   ├── cards.tsx   # Cards (Project, Service, etc.)
│   │   └── chrome.tsx  # Layout (Header, Footer)
│   ├── pages/          # Pages de l'application
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Realisations.tsx
│   │   └── Contact.tsx
│   ├── lib/            # Logique métier
│   │   ├── api.ts     # Appels API
│   │   ├── store.ts   # État global
│   │   └── analytics.ts # Tracking
│   ├── data/           # Données statiques
│   │   └── content.ts # Services, projets, etc.
│   └── App.tsx         # Router principal
├── api/                # Serverless functions
│   └── quotes.ts      # API pour les devis
├── tests/              # Tests unitaires
├── scripts/            # Scripts utilitaires
└── public/             # Assets statiques
```

## 🧪 Tests

```bash
# Lancer tous les tests
npm test

# Tests avec coverage
npm run test:coverage

# Mode watch
npm run test:watch
```

### Écrire des tests

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Testing Library](https://testing-library.com/docs/)

## ❓ Questions ?

Ouvrez une [issue](https://github.com/Anonyme-18/atelier228/issues) ou contactez-nous !

---

**Merci de contribuer à Atelier 228 ! 🎉**
