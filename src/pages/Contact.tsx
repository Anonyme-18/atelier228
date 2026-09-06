import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHead } from "../components/cards";
import { QuoteForm } from "../components/QuoteForm";
import {
  Accordion,
  ButtonAnchor,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
  Overline,
  Reveal,
} from "../components/ui";
import { CONTACT, GENERAL_FAQ } from "../data/content";
import { PROJECT_TYPES } from "../lib/api";
import { trackPhone, trackWhatsApp } from "../lib/analytics";
import { usePageMeta } from "../lib/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Demander un devis gratuit à Lomé | Atelier 228",
    "Décrivez votre projet de rénovation ou d'aménagement intérieur en 2 minutes. Devis détaillé gratuit, visite sur site à Lomé et environs. Réponse rapide garantie."
  );

  const [params] = useSearchParams();
  const defaultType = useMemo(() => {
    const t = params.get("type") ?? "";
    return PROJECT_TYPES.includes(t as never) ? t : "";
  }, [params]);

  return (
    <>
      <PageHead
        overline="Contact & devis"
        title={
          <>
            Parlons de <em className="italic text-brassdark">votre projet.</em>
          </>
        }
        intro="Décrivez votre projet en deux minutes. Chaque demande est enregistrée et traitée personnellement — vous êtes recontacté pour organiser la visite et établir votre devis gratuit."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ——— Coordonnées & réassurance ——— */}
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <div className="space-y-3">
                <a
                  href={CONTACT.phoneHref}
                  onClick={trackPhone}
                  className="group flex items-center gap-4 rounded-[4px] border border-ink/12 bg-bone p-5 transition-all duration-300 hover:border-brassdark hover:shadow-[0_10px_30px_-12px_rgba(26,35,30,0.25)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-deep text-brasssoft">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                      Téléphone — réponse directe
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-medium text-ink">
                      {CONTACT.phoneDisplay}
                    </span>
                  </span>
                </a>

                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWhatsApp}
                  className="group flex items-center gap-4 rounded-[4px] border border-ink/12 bg-bone p-5 transition-all duration-300 hover:border-brassdark hover:shadow-[0_10px_30px_-12px_rgba(26,35,30,0.25)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-deep text-brasssoft">
                    <IconWhatsApp className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                      WhatsApp — photos & messages
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-medium text-ink">
                      Écrire sur WhatsApp
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-4 rounded-[4px] border border-ink/12 bg-bone p-5 transition-all duration-300 hover:border-brassdark hover:shadow-[0_10px_30px_-12px_rgba(26,35,30,0.25)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-deep text-brasssoft">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                      Email
                    </span>
                    <span className="mt-0.5 block font-display text-lg font-medium text-ink">
                      {CONTACT.email}
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[4px] bg-deep p-7 text-paper">
                <Overline tone="light">Où nous trouver</Overline>
                <ul className="mt-5 space-y-4 text-sm text-paper/75">
                  <li className="flex items-start gap-3">
                    <IconPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brasssoft" />
                    {CONTACT.address}
                  </li>
                  <li className="flex items-start gap-3">
                    <IconClock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brasssoft" />
                    {CONTACT.hours}
                  </li>
                  <li className="flex items-start gap-3">
                    <IconPhone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brasssoft" />
                    Zone d'intervention : {CONTACT.zone}
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div>
                <Overline>Et après l'envoi&nbsp;?</Overline>
                <ol className="mt-5 space-y-4">
                  {[
                    "Votre demande est enregistrée et reçoit une référence unique.",
                    "Nous vous recontactons pour organiser la visite sur site.",
                    "Vous recevez un devis détaillé, poste par poste — gratuit.",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-4">
                      <span className="font-display text-xl italic text-brassdark">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14.5px] leading-relaxed text-ink/75">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="border-t border-ink/10 pt-2">
                <Accordion items={GENERAL_FAQ} />
              </div>
            </Reveal>
          </div>

          {/* ——— Formulaire ——— */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="rounded-[4px] border border-ink/12 bg-bone p-6 shadow-[0_30px_70px_-30px_rgba(26,35,30,0.3)] sm:p-9 lg:p-10">
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
                      Demande de devis gratuit
                    </h2>
                    <p className="mt-2 text-sm text-ink/60">
                      Les champs marqués <span className="text-brassdark">*</span> sont
                      obligatoires. Votre demande est enregistrée de manière sécurisée.
                    </p>
                  </div>
                </div>
                <QuoteForm defaultType={defaultType} />
              </div>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-5 text-center text-xs text-ink/45">
                Vous préférez le contact direct&nbsp;?{" "}
                <a href={CONTACT.phoneHref} onClick={trackPhone} className="link-line font-semibold text-brassdark">
                  Appelez le {CONTACT.phoneDisplay}
                </a>{" "}
                ou{" "}
                <ButtonAnchor
                  href={CONTACT.whatsappUrl}
                  variant="outlineDark"
                  onClick={trackWhatsApp}
                  className="mx-1 inline-flex h-8 px-3 text-[11px]"
                >
                  <IconWhatsApp className="h-3.5 w-3.5" /> WhatsApp
                </ButtonAnchor>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
