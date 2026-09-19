import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  BUDGET_OPTIONS,
  PROJECT_TYPES,
  submitQuoteRequest,
  validateQuote,
  type FieldErrors,
} from "../lib/api";
import { track } from "../lib/analytics";
import { CONTACT } from "../data/content";
import { ButtonAnchor, ButtonLink, cx, IconArrowRight, IconSpinner } from "./ui";

const DRAFT_KEY = "atelier228:draft:v1";

type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  desiredDate: string;
}

const EMPTY: Values = {
  fullName: "",
  email: "",
  phone: "",
  projectType: "",
  projectDescription: "",
  location: "",
  budget: "",
  desiredDate: "",
};

const FIELD_ORDER: (keyof Values)[] = [
  "fullName",
  "email",
  "phone",
  "projectType",
  "projectDescription",
  "location",
  "budget",
];

function FieldShell({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70"
        >
          {label}
          {required && <span className="ml-1 text-brassdark">*</span>}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] font-medium text-err">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({ defaultType = "" }: { defaultType?: string }) {
  const [values, setValues] = useState<Values>({
    ...EMPTY,
    projectType: PROJECT_TYPES.includes(defaultType as never) ? defaultType : "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [ref, setRef] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const submittingRef = useRef(false);
  const mounted = useRef(false);

  /* Ouverture du formulaire + reprise de brouillon */
  useEffect(() => {
    track("form_open");
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw && !defaultType) {
        const draft = JSON.parse(raw) as Partial<Values>;
        setValues((v) => ({ ...v, ...draft }));
      }
    } catch {
      /* brouillon illisible : on repart de zéro */
    }
    mounted.current = true;
  }, [defaultType]);

  /* Sauvegarde du brouillon (jamais après succès) */
  useEffect(() => {
    if (!mounted.current || status === "success") return;
    try {
      const hasContent = Object.values(values).some((v) => v !== "");
      if (hasContent) localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      else localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* non bloquant */
    }
  }, [values, status]);

  const set = (key: keyof Values) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const inputCls = (key: keyof Values) =>
    cx(
      /* text-base (16px) évite le zoom auto d'iOS au focus */
      "w-full rounded-[3px] border bg-bone px-4 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:outline-none",
      errors[key] ? "border-err focus:border-err" : "border-line focus:border-brassdark"
    );

  const aria = (key: keyof Values) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `f-${key}-err` : undefined,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return; // anti double-soumission
    track("form_submit_attempt");

    const fieldErrors = validateQuote({ ...values, website: honeypot });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      track("form_validation_error", {
        fields: Object.keys(fieldErrors).join(","),
      });
      const first = FIELD_ORDER.find((k) => fieldErrors[k]);
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    submittingRef.current = true;

    const result = await submitQuoteRequest({ ...values, website: honeypot });
    submittingRef.current = false;

    if (result.ok) {
      setRef(result.ref);
      setStatus("success");
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      // Récupère la page d'origine (HashRouter)
      const sourcePage = window.location.hash.replace("#", "") || "/";
      track("form_submit_success", { ref: result.ref, sourcePage });
      return;
    }

    if (result.code === "VALIDATION" && result.errors) {
      setErrors(result.errors);
      track("form_validation_error", { origin: "serveur" });
      setStatus("idle");
      return;
    }

    setServerError(result.error);
    setStatus("error");
    track("form_submit_error", { code: result.code });
  };

  /* ————— État succès : confirmation explicite ————— */
  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        ref={(el) => {
          if (el) setTimeout(() => el.scrollIntoView({ block: "start" }), 60);
        }}
        className="rise-in scroll-mt-28 rounded-[4px] border border-ok/25 bg-okbg p-8 sm:p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ok/12 text-ok">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
            <path
              d="m5 12.5 4.5 4.5L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="draw-check"
            />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-2xl font-medium text-ink sm:text-3xl">
          Votre demande a bien été enregistrée.
        </h2>
        <p className="mt-3 leading-relaxed text-ink/70">
          Merci {values.fullName.split(" ")[0]}. Nous revenons vers vous prochainement
          {values.email ? ` à l'adresse ${values.email}` : ""} pour organiser la visite et établir
          votre devis.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-[3px] bg-deep px-4 py-2 font-mono text-sm font-semibold tracking-widest text-brasssoft">
            Réf. {ref}
          </span>
          <span className="text-xs text-ink/55">Conservez cette référence pour tout échange.</span>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonAnchor
            href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(
              `Bonjour, j'ai envoyé une demande de devis (réf. ${ref}).`
            )}`}
            variant="dark"
            className="h-11"
          >
            Poursuivre sur WhatsApp
          </ButtonAnchor>
          <ButtonLink to="/" variant="outlineDark" className="h-11" arrow={false}>
            Retour à l'accueil
          </ButtonLink>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Erreur d'enregistrement — jamais de faux succès */}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[4px] border border-err/30 bg-errbg p-4"
        >
          <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-err" />
          <div className="text-sm leading-relaxed text-ink/80">
            <p className="font-semibold text-err">Nous n'avons pas pu enregistrer votre demande.</p>
            <p className="mt-1">{serverError}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="link-line mt-2 inline-flex cursor-pointer items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-err"
            >
              Réessayer <IconArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell id="f-fullName" label="Nom complet" required error={errors.fullName}>
          <input
            id="f-fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(e) => set("fullName")(e.target.value)}
            placeholder="Ex. Ama Kouassi"
            className={inputCls("fullName")}
            {...aria("fullName")}
          />
        </FieldShell>
        <FieldShell id="f-email" label="Email" required error={errors.email}>
          <input
            id="f-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="vous@exemple.tg"
            className={inputCls("email")}
            {...aria("email")}
          />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell id="f-phone" label="Téléphone" required error={errors.phone}>
          <input
            id="f-phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="+228 90 00 00 00"
            className={inputCls("phone")}
            {...aria("phone")}
          />
        </FieldShell>
        <FieldShell id="f-projectType" label="Type de projet" required error={errors.projectType}>
          <select
            id="f-projectType"
            value={values.projectType}
            onChange={(e) => set("projectType")(e.target.value)}
            className={cx(inputCls("projectType"), "cursor-pointer")}
            {...aria("projectType")}
          >
            <option value="" disabled>
              Sélectionnez…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <FieldShell
        id="f-projectDescription"
        label="Description du projet"
        required
        error={errors.projectDescription}
        hint={
          <span
            className={cx(
              "font-mono text-[11px]",
              values.projectDescription.length > 1500 ? "text-err" : "text-ink/40"
            )}
          >
            {values.projectDescription.length}/1500
          </span>
        }
      >
        <textarea
          id="f-projectDescription"
          rows={5}
          value={values.projectDescription}
          onChange={(e) => set("projectDescription")(e.target.value)}
          placeholder="Décrivez votre projet : surface approximative, état actuel, ce que vous souhaitez changer, vos contraintes…"
          className={cx(inputCls("projectDescription"), "resize-y")}
          {...aria("projectDescription")}
        />
      </FieldShell>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell id="f-location" label="Localisation du projet" error={errors.location}>
          <input
            id="f-location"
            type="text"
            value={values.location}
            onChange={(e) => set("location")(e.target.value)}
            placeholder="Quartier, ville — ex. Baguida, Lomé"
            className={inputCls("location")}
            {...aria("location")}
          />
        </FieldShell>
        <FieldShell id="f-budget" label="Budget estimatif" error={errors.budget}>
          <select
            id="f-budget"
            value={values.budget}
            onChange={(e) => set("budget")(e.target.value)}
            className={cx(inputCls("budget"), "cursor-pointer")}
            {...aria("budget")}
          >
            <option value="">Plutôt plus tard</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <FieldShell id="f-desiredDate" label="Date souhaitée pour démarrer">
        <input
          id="f-desiredDate"
          type="month"
          value={values.desiredDate}
          onChange={(e) => set("desiredDate")(e.target.value)}
          className={inputCls("desiredDate")}
        />
      </FieldShell>

      {/* Honeypot anti-bots — invisible pour les humains */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor="f-website">Ne pas remplir</label>
        <input
          id="f-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={cx(
            "group flex h-13 w-full cursor-pointer items-center justify-center gap-3 rounded-[3px] bg-brass px-7 text-[13px] font-semibold uppercase tracking-[0.14em] text-deep transition-all duration-300",
            submitting ? "cursor-wait opacity-80" : "hover:bg-brasssoft active:translate-y-px"
          )}
        >
          {submitting ? (
            <>
              <IconSpinner className="h-5 w-5" />
              Enregistrement en cours…
            </>
          ) : (
            <>
              Demander un devis gratuit
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs leading-relaxed text-ink/50">
          En envoyant ce formulaire, vous acceptez d'être recontacté au sujet de votre projet. Vos
          informations ne sont jamais transmises à des tiers.
        </p>
      </div>
    </form>
  );
}
