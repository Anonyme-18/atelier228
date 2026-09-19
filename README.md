# Atelier 228

Showcase website for a renovation and interior design company based in Lomé, Togo.

The project presents the company’s services, projects, before-and-after comparisons, and an interactive 3D visit. Quote requests are stored in PostgreSQL through a Vercel serverless function. No customer request data is stored in the browser.

## Stack

- React 18, TypeScript, Vite, and Tailwind CSS
- Three.js for the 3D experience, loaded on demand
- Vercel Functions and Neon PostgreSQL
- Vitest, ESLint, Prettier, and strict TypeScript

## Local development

Requirements: Node.js 18+ and a Neon PostgreSQL database.

```bash
npm install
cp .env.example .env.local
npm run db:setup
npm run dev
```

On Windows PowerShell, use `Copy-Item .env.example .env.local` instead of `cp`.

Required environment variable:

```env
NEON_DATABASE_URL=postgresql://...
```

## Quality checks

```bash
npm run format:check
npm run typecheck
npm run lint
npm test -- --run --pool=threads --maxWorkers=1
npm run build
```

## Vercel deployment

1. Push the repository to GitHub and import it into Vercel.
2. Keep `npm run build` as the build command and `dist` as the output directory.
3. Add `NEON_DATABASE_URL` to the Vercel environment variables.
4. Run `npm run db:setup` once with the same database credentials to create the tables and indexes.
5. Test the quote form in a Preview deployment before promoting it to Production.

Public quote requests are handled by `POST /api/quotes`.

## Security

- Input is validated on both the client and the server.
- SQL queries use parameterized values.
- A honeypot field and IP-based rate limiting reduce spam.
- Customer requests are stored server-side, never in `localStorage`.
- Security headers are applied by Vercel and the API function.

For responsible disclosure, contact the maintainer privately instead of opening a public issue.

## License

MIT. See [LICENSE](LICENSE).
