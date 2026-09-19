import { useMemo, useState } from "react";
import { ButtonLink, IconCheck, Overline, Reveal, SectionHead } from "../components/ui";
import { usePageMeta } from "../lib/usePageMeta";
import { usePreferences } from "../lib/preferences";

const steps = [
  ["01", "Échange", "Décrivez votre projet, vos envies et vos contraintes."],
  ["02", "Visite & analyse", "Nous observons les volumes, les usages et les points techniques."],
  ["03", "Conception", "Plans, matières et ambiance prennent forme avant les travaux."],
  ["04", "Réalisation", "Le chantier avance avec un suivi clair jusqu’à la livraison."],
];

function BudgetCalculator() {
  const [type, setType] = useState("Rénovation complète");
  const [surface, setSurface] = useState(60);
  const [finish, setFinish] = useState("standard");
  const multipliers: Record<string, number> = {
    "Rénovation complète": 450000,
    "Aménagement intérieur": 280000,
    Cuisine: 350000,
    "Salle de bain": 300000,
  };
  const finishMultiplier: Record<string, number> = { standard: 1, premium: 1.35, signature: 1.75 };
  const estimate =
    Math.round(
      (surface * (multipliers[type] ?? 300000) * (finishMultiplier[finish] ?? 1)) / 100000
    ) * 100000;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
      <div className="space-y-5">
        <label className="block text-sm font-semibold text-ink">
          Type de projet
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-2 w-full rounded-[3px] border border-line bg-bone px-4 py-3 text-ink"
          >
            <option>Rénovation complète</option>
            <option>Aménagement intérieur</option>
            <option>Cuisine</option>
            <option>Salle de bain</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-ink">
          Surface estimée <span className="font-mono text-brassdark">{surface} m²</span>
          <input
            type="range"
            min="5"
            max="300"
            step="5"
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className="mt-4 w-full accent-brassdark"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Niveau de finition</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              ["standard", "Essentiel"],
              ["premium", "Premium"],
              ["signature", "Signature"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFinish(value ?? "")}
                className={`rounded-[3px] border px-3 py-3 text-sm ${finish === value ? "border-deep bg-deep text-paper" : "border-line text-ink/70"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col justify-between rounded-[4px] bg-deep p-7 text-paper">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brasssoft">
            Estimation indicative
          </p>
          <p className="mt-4 font-display text-4xl text-brasssoft">
            {new Intl.NumberFormat("fr-FR").format(estimate)} FCFA
          </p>
          <p className="mt-3 text-sm leading-relaxed text-paper/65">
            Une première indication, à affiner après une visite et le choix des matériaux.
          </p>
        </div>
        <ButtonLink to="/contact" variant="primary" className="mt-8">
          Affiner avec un devis
        </ButtonLink>
      </div>
    </div>
  );
}

function RecommendationQuiz() {
  const [answers, setAnswers] = useState({
    usage: "vivre",
    mood: "chaleureux",
    light: "naturelle",
  });
  const groups: Array<[keyof typeof answers, string, string[]]> = [
    ["usage", "Votre priorité", ["Vivre", "Recevoir", "Travailler"]],
    ["mood", "Votre ambiance", ["Chaleureux", "Minimaliste", "Contemporain"]],
    ["light", "Votre lumière", ["Naturelle", "Douce", "Contraste"]],
  ];
  const result = useMemo(
    () =>
      answers.mood === "minimaliste"
        ? "Minimalisme doux"
        : answers.mood === "contemporain"
          ? "Contemporain graphique"
          : "Naturel chaleureux",
    [answers.mood]
  );
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr]">
      <div className="space-y-5">
        {groups.map(([key, label, options]) => (
          <fieldset key={key}>
            <legend className="text-sm font-semibold text-ink">{label}</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setAnswers((current) => ({ ...current, [key]: option.toLowerCase() }))
                  }
                  className={`rounded-full border px-4 py-2 text-sm ${answers[key] === option.toLowerCase() ? "border-deep bg-deep text-paper" : "border-line text-ink/70"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="rounded-[4px] border border-brassdark/25 bg-sand/60 p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brassdark">
          Votre direction
        </p>
        <h3 className="mt-3 font-display text-3xl text-ink">{result}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          Une base équilibrée entre matières tactiles, lignes justes et lumière maîtrisée.
        </p>
        <ButtonLink to="/contact" className="mt-7">
          Parler de ce style
        </ButtonLink>
      </div>
    </div>
  );
}

function BookingDemo() {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("10:00");
  if (sent)
    return (
      <div className="rounded-[4px] border border-ok/25 bg-okbg p-7">
        <IconCheck className="h-7 w-7 text-ok" />
        <h3 className="mt-4 font-display text-2xl text-ink">Créneau pré-réservé</h3>
        <p className="mt-2 text-sm text-ink/65">
          Votre demande de rendez-vous pour le {date} à {slot} est prête. Cette démonstration peut
          ensuite être reliée à un calendrier.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="link-line mt-5 text-sm font-semibold text-brassdark"
        >
          Modifier le créneau
        </button>
      </div>
    );
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-ink">
        Date souhaitée
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 w-full rounded-[3px] border border-line bg-bone px-4 py-3"
        />
      </label>
      <label className="text-sm font-semibold text-ink">
        Créneau
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          className="mt-2 w-full rounded-[3px] border border-line bg-bone px-4 py-3"
        >
          <option>10:00</option>
          <option>14:00</option>
          <option>16:30</option>
        </select>
      </label>
      <button
        type="button"
        disabled={!date}
        onClick={() => setSent(true)}
        className="h-12 rounded-[3px] bg-deep px-6 text-sm font-semibold uppercase tracking-wider text-paper disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2"
      >
        Pré-réserver ce créneau
      </button>
    </div>
  );
}

export default function Outils() {
  const { language } = usePreferences();
  usePageMeta(
    "Studio projet | Atelier 228",
    "Explorez votre projet avec nos outils interactifs Atelier 228."
  );
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-36 sm:px-8 lg:pb-24">
        <Reveal>
          <Overline>Studio projet</Overline>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight text-ink sm:text-6xl">
            {language === "fr"
              ? "Imaginez votre espace avant de le transformer."
              : "Imagine your space before transforming it."}
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/65">
            {language === "fr"
              ? "Un laboratoire interactif pour estimer, choisir une ambiance et préparer votre prochain rendez-vous."
              : "An interactive lab to estimate, choose a mood and prepare your next appointment."}
          </p>
        </Reveal>
      </section>
      <section className="border-y border-ink/10 bg-sand/40 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            overline="01 · Estimation"
            title={
              <>
                Quel budget prévoir&nbsp;?{" "}
                <em className="italic text-brassdark">Une première réponse.</em>
              </>
            }
            intro="Ajustez les paramètres pour obtenir une estimation indicative en quelques secondes."
          />
          <div className="mt-10 rounded-[4px] border border-ink/10 bg-paper p-6 sm:p-10">
            <BudgetCalculator />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead
          overline="02 · Inspiration"
          title={
            <>
              Quelle ambiance vous ressemble&nbsp;?{" "}
              <em className="italic text-brassdark">Faites le test.</em>
            </>
          }
          intro="Trois choix suffisent pour faire émerger une direction esthétique."
        />
        <div className="mt-10 rounded-[4px] border border-ink/10 bg-bone p-6 sm:p-10">
          <RecommendationQuiz />
        </div>
      </section>
      <section className="bg-deep py-16 text-paper lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            overline="03 · Méthode"
            title={
              <>
                Un projet clair, <em className="italic text-brasssoft">étape par étape.</em>
              </>
            }
            intro="Notre méthode transforme une intention en espace habitable."
            tone="dark"
          />
          <ol className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([number, title, text]) => (
              <li key={number} className="bg-deep p-6">
                <span className="font-mono text-sm text-brasssoft">{number}</span>
                <h3 className="mt-8 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead
          overline="04 · Rendez-vous"
          title={
            <>
              Choisissez un moment pour <em className="italic text-brassdark">en parler.</em>
            </>
          }
          intro="Une réservation de démonstration pour préparer une future intégration calendrier."
        />
        <div className="mt-10 max-w-3xl rounded-[4px] border border-ink/10 bg-bone p-6 sm:p-10">
          <BookingDemo />
        </div>
      </section>
    </>
  );
}
