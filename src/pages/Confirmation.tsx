import { useLocation } from "react-router-dom";
import { ButtonLink, Overline, Reveal } from "../components/ui";
import { usePageMeta } from "../lib/usePageMeta";

interface ConfirmationState {
  ref?: string;
  fullName?: string;
  email?: string;
}

export default function Confirmation() {
  const location = useLocation();
  const state = (location.state as ConfirmationState | null) ?? {};

  usePageMeta(
    "Demande envoyée | Atelier 228",
    "Votre demande de devis a bien été enregistrée par Atelier 228."
  );

  return (
    <section className="mx-auto max-w-3xl px-5 pb-28 pt-36 sm:px-8">
      <Reveal>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ok/12 text-ok">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Reveal>
      <Reveal delay={80}>
        <Overline>Demande envoyée</Overline>
      </Reveal>
      <Reveal delay={140}>
        <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
          Merci{state.fullName ? ` ${state.fullName.split(" ")[0]}` : ""}, votre demande a bien été
          enregistrée.
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-5 max-w-xl leading-relaxed text-ink/65">
          Nous reviendrons vers vous prochainement pour échanger sur votre projet et préparer votre
          devis.
          {state.email ? ` Un message de confirmation pourra être envoyé à ${state.email}.` : ""}
        </p>
      </Reveal>
      {state.ref && (
        <Reveal delay={260}>
          <p className="mt-6 inline-flex rounded-[3px] bg-deep px-4 py-2 font-mono text-sm font-semibold tracking-widest text-brasssoft">
            Réf. {state.ref}
          </p>
        </Reveal>
      )}
      <Reveal delay={320}>
        <div className="mt-10">
          <ButtonLink to="/" variant="dark" arrow={false}>
            Retour à l’accueil
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
