<div align="center">

# 🏠 Atelier 228

### High-Conversion Website for Renovation & Interior Design

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**A production-ready, conversion-focused website built with modern web technologies**

[Demo](#-demo) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Deployment](#-deployment)

</div>

---

## 🎯 Overview

Atelier 228 is a **professional website for a renovation and interior design company** based in Lomé, Togo. It's designed to maximize lead generation and showcase craftsmanship through interactive 3D experiences and before/after transformations.

### 🎨 Key Highlights

- **📊 Real-time conversion tracking** - Know which pages generate the most leads
- **🏠 Interactive 3D showroom** - Explore the space with Three.js
- **📸 Before/After comparators** - Visual proof of transformations
- **💬 Smart quote system** - Multi-step form with validation
- **📱 Mobile-first design** - Perfect on all devices
- **⚡ Optimized performance** - Code splitting, lazy loading
- **🔒 Secure backend** - Neon PostgreSQL with serverless API

---

## ✨ Features

### 🎨 User-Facing Features

- **Homepage** - Hero section, services, featured projects, 3D teaser
- **Services Page** - Detailed service offerings with FAQs
- **Portfolio** - Filterable gallery with before/after sliders
- **3D Showroom** - Interactive Three.js scene with orbit controls
- **Contact Form** - Multi-step quote request with validation
- **Admin Dashboard** - Analytics and quote management

### 🛠️ Technical Features

- **TypeScript** - Full type safety with strict mode
- **Code Splitting** - Three.js lazy-loaded (130kB separate chunk)
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Responsive** - Mobile-first, tested on 320px+
- **Testing** - Unit tests with Vitest
- **CI/CD Ready** - GitHub Actions workflows included

---

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library with hooks
- **TypeScript 5.7** - Type safety
- **Vite 6.3** - Build tool & dev server
- **Tailwind CSS 4.1** - Utility-first styling
- **React Router 6** - Client-side routing
- **Three.js** - 3D showroom (lazy-loaded)

### Backend & Database
- **Neon** - Serverless PostgreSQL
- **Vercel Functions** - Serverless API endpoints

### Quality & Testing
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript strict mode** - Maximum type safety

### Deployment
- **Vercel** - Hosting & serverless functions
- **GitHub** - Version control & CI/CD

---

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Anonyme-18/atelier228.git
cd atelier228

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Neon database URL

# Initialize database
npm run db:setup

# Start development server
npm run dev
```

Visit `http://localhost:5173`

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

---

## 🏗️ Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

**Bundle Analysis:**
- `three.js`: 130 kB (lazy-loaded)
- `vendor.js`: 54 kB (React, Router)
- `index.js`: 37 kB (App code)
- `styles.css`: 10 kB (Tailwind)

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `VITE_NEON_DATABASE_URL`
   - `VITE_ADMIN_CODE`
   - `VITE_GA_ID` (optional)
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📊 Conversion Tracking

The site includes built-in analytics to track:

- **Page views** - Which pages get the most traffic
- **Conversion rates** - Which pages generate the most leads
- **Form submissions** - Quote request success rate
- **CTA clicks** - Which calls-to-action perform best

Access the dashboard at `/#/admin` (protected by code).

---

## 🎨 Design System

### Colors
- **Primary**: `#1a231e` (Deep Green)
- **Secondary**: `#d9bc7f` (Brass)
- **Background**: `#f2f0e9` (Paper)
- **Text**: `#2d3436` (Ink)

### Typography
- **Headings**: Fraunces (serif)
- **Body**: Archivo (sans-serif)

---

## 📁 Project Structure

```
atelier228/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route pages
│   ├── lib/            # Business logic
│   ├── data/           # Content data
│   └── App.tsx         # Router setup
├── api/                # Vercel serverless functions
├── tests/              # Unit tests
├── scripts/            # Utility scripts
├── public/             # Static assets
└── [config files]      # ESLint, Prettier, TypeScript, etc.
```

---

## 🔒 Security

- **Input validation** - Both client and server-side
- **Rate limiting** - Prevents spam submissions
- **Honeypot fields** - Catches bots
- **SQL injection protection** - Parameterized queries
- **XSS protection** - React's built-in escaping
- **Environment variables** - Secrets never in code

---

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Anonyme-18**
- GitHub: [@Anonyme-18](https://github.com/Anonyme-18)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Neon](https://neon.tech/)
- [Vercel](https://vercel.com/)

---

## 📞 Support

For questions or issues, please [open an issue](https://github.com/Anonyme-18/atelier228/issues) on GitHub.

---

<div align="center">

**Built with ❤️ for Atelier 228**

*This project demonstrates professional web development skills including modern React patterns, TypeScript best practices, performance optimization, conversion-focused design, database integration, testing, SEO optimization, and accessibility.*

[⬆ Back to Top](#-atelier-228)

</div>
