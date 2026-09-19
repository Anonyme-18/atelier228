# Atelier 228 - Renovation & Interior Design Website

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A high-conversion website for a renovation and interior design company based in Lomé, Togo. Built with modern web technologies to maximize lead generation and showcase craftsmanship.

![Atelier 228 Preview](https://via.placeholder.com/1200x630/1a231e/d9bc7f?text=Atelier+228)

## 🎯 Project Overview

This is a **production-ready, conversion-focused website** for a renovation company. It's designed to:
- Convert visitors into qualified leads
- Showcase before/after transformations
- Provide interactive 3D showroom experience
- Track conversion metrics per page
- Store quote requests in PostgreSQL (Neon)

**Key Features:**
- 📊 Real-time conversion tracking (visitors vs. quote requests per page)
- 🏠 Interactive 3D showroom with Three.js
- 📸 Before/After image comparators for every project
- 📱 Fully responsive (mobile-first design)
- 🔐 Secure quote request system with validation
- 📈 Admin dashboard with analytics
- ⚡ Optimized performance (code splitting, lazy loading)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 6.3** - Build tool & dev server
- **Tailwind CSS 4.1** - Utility-first CSS
- **React Router 6** - Client-side routing
- **Three.js** - 3D showroom (lazy-loaded)

### Backend & Database
- **Neon** - Serverless PostgreSQL
- **Serverless Functions** - API endpoints (Vercel)

### Quality & Testing
- **Vitest** - Unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript strict mode** - Type checking

### Deployment
- **Vercel** - Hosting & serverless functions
- **GitHub** - Version control

## 📁 Project Structure

```
atelier228/
├── public/                  # Static assets
│   ├── robots.txt          # SEO
│   └── sitemap.xml         # SEO
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui.tsx         # Base UI primitives
│   │   ├── cards.tsx      # Card components
│   │   ├── chrome.tsx     # Layout (header, footer)
│   │   ├── AvantApres.tsx # Before/After comparator
│   │   ├── RoomScene.tsx  # 3D showroom (Three.js)
│   │   └── QuoteForm.tsx  # Quote request form
│   ├── pages/             # Route pages
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Realisations.tsx
│   │   ├── Contact.tsx
│   │   ├── Visite3D.tsx
│   │   ├── APropos.tsx
│   │   └── Admin.tsx
│   ├── lib/               # Business logic
│   │   ├── api.ts        # API client
│   │   ├── store.ts      # State management
│   │   └── analytics.ts  # Conversion tracking
│   ├── data/              # Content data
│   │   └── content.ts    # Services, projects, etc.
│   ├── App.tsx            # Router setup
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── api/                   # Vercel serverless functions
│   └── quotes.ts         # Quote request API
├── tests/                 # Unit tests
│   └── api.test.ts
├── .env.example          # Environment variables template
├── vercel.json           # Vercel configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL database

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Anonyme-18/atelier228.git
cd atelier228
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Neon database URL:
```env
VITE_NEON_DATABASE_URL=postgresql://user:password@host/database
```

4. **Set up the database**
```bash
npm run db:setup
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173`

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🏗️ Building for Production

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_NEON_DATABASE_URL`
4. Deploy!

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎨 Design System

### Color Palette
- **Primary**: `#1a231e` (Deep Green)
- **Secondary**: `#d9bc7f` (Brass)
- **Background**: `#f2f0e9` (Paper)
- **Text**: `#2d3436` (Ink)

### Typography
- **Headings**: Fraunces (serif)
- **Body**: Archivo (sans-serif)

## 📊 Features in Detail

### 1. Conversion Tracking
Every page view and form submission is tracked. The admin dashboard (`/#/admin`) shows:
- Total visitors per page
- Quote requests per page
- Conversion rate per page
- Real-time analytics

### 2. 3D Showroom
Interactive Three.js scene accessible at `/visite-3d`:
- Orbit controls (drag to rotate)
- Zoom in/out
- Multiple viewpoints
- Toggle lighting

### 3. Before/After Comparators
Each project has an interactive slider showing transformation:
- Drag to compare
- Touch-friendly on mobile
- Smooth animations

### 4. Quote Request System
Multi-step form with:
- Client-side validation
- Server-side validation (API)
- Honeypot spam protection
- Rate limiting
- Success/error states
- Reference number generation

### 5. Admin Dashboard
Protected area (`/#/admin`) with:
- Quote request management
- Status updates (New, In Progress, Completed, Archived)
- Analytics dashboard
- Export to JSON

## 🔒 Security

- **Input validation**: Both client and server-side
- **Rate limiting**: Prevents spam submissions
- **Honeypot fields**: Catches bots
- **SQL injection protection**: Parameterized queries
- **XSS protection**: React's built-in escaping
- **Environment variables**: Secrets never in code

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a production project for a real business. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anonyme-18**
- GitHub: [@Anonyme-18](https://github.com/Anonyme-18)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Neon](https://neon.tech/)
- [Vercel](https://vercel.com/)

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for Atelier 228**

*This project demonstrates professional web development skills including:*
- *Modern React patterns (hooks, context, lazy loading)*
- *TypeScript best practices*
- *Performance optimization*
- *Conversion-focused design*
- *Database integration*
- *Testing*
- *SEO optimization*
- *Accessibility*
