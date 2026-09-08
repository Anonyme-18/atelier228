import { lazy, Suspense } from "react";
import { HashRouter, Link, Route, Routes } from "react-router-dom";
import { Layout, ScrollManager } from "./components/chrome";
import { ButtonLink, Overline, Reveal } from "./components/ui";
import { usePageMeta } from "./lib/usePageMeta";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import RealisationDetail from "./pages/RealisationDetail";
import Realisations from "./pages/Realisations";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import APropos from "./pages/APropos";

const Visite3D = lazy(() => import("./pages/Visite3D"));

function NotFound() {
  usePageMeta(
    "Page introuvable | Atelier 228",
    "La page demandée n'existe pas. Revenez à l'accueil d'Atelier 228, rénovation et aménagement intérieur à Lomé."
  );
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-5 pb-28 pt-40 sm:px-8">
      <Reveal>
        <Overline>Erreur 404</Overline>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
          Cette page n'existe pas,{" "}
          <em className="italic text-brassdark">mais votre projet, si.</em>
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-5 max-w-xl text-ink/65">
          Le lien est peut-être erroné. Retrouvez nos services, nos
          réalisations et le formulaire de devis ci-dessous.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/" variant="dark">
            Retour à l'accueil
          </ButtonLink>
          <ButtonLink to="/contact" trackSource="404">
            Demander un devis
          </ButtonLink>
        </div>
      </Reveal>
      <Reveal delay={320}>
        <p className="mt-10 text-sm text-ink/50">
          Liens utiles :{" "}
          <Link to="/services" className="link-line text-brassdark">
            Services
          </Link>{" "}
          ·{" "}
          <Link to="/realisations" className="link-line text-brassdark">
            Réalisations
          </Link>
        </p>
      </Reveal>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/realisations/:slug" element={<RealisationDetail />} />
          <Route
            path="/visite-3d"
            element={
              <Suspense fallback={<div className="min-h-[60vh] bg-deep" />}>
                <Visite3D />
              </Suspense>
            }
          />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
