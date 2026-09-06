/* ============================================================
   Atelier 228 — Source unique de contenu.
   ⚠ CONTENU À PERSONNALISER : remplacez les textes, coordonnées
   et images de démonstration par les données réelles de
   l'entreprise (photos de chantiers, téléphone, adresse…).
   Toute nouvelle prestation ou réalisation s'ajoute ici sans
   toucher au reste du site.
   ============================================================ */

export const BRAND = {
  name: "Atelier 228",
  baseline: "Rénovation & aménagement intérieur",
  city: "Lomé",
  country: "Togo",
};

/* ————— Coordonnées (placeholder : à remplacer) ————— */
export const CONTACT = {
  phoneDisplay: "+228 90 12 34 56",
  phoneHref: "tel:+22890123456",
  whatsappUrl: "https://wa.me/22890123456",
  email: "contact@atelier228.tg",
  address: "Agoè Assiyéyé, Lomé — Togo",
  hours: "Lun – Sam · 8h à 18h",
  zone: "Lomé et environs",
};

/* ————— Visuels de démonstration (à remplacer par les photos
   réelles des chantiers) ————— */
const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/0dd2dcce-e36b-4781-8252-6de7d81ee4d9/_result.png",
  renovation: "https://image.qwenlm.ai/generated-images/388c7f12-9fce-43e1-bc74-1ad872f4d430/_result.png",
  amenagement: "https://image.qwenlm.ai/generated-images/65aa29e4-fccf-47ae-ab00-1a5cfd859d6d/_result.png",
  cuisine: "https://image.qwenlm.ai/generated-images/daa6483d-7139-4b81-b3fa-9f1188009efa/_result.png",
  salleDeBain: "https://image.qwenlm.ai/generated-images/bee62600-a030-449f-bad8-e18741bd9b03/_result.png",
  villaBaguida: "https://image.qwenlm.ai/generated-images/fa44c917-a132-4c3a-8897-fffeea505811/_result.png",
  cuisineAgoe: "https://image.qwenlm.ai/generated-images/ab5a6364-6731-4742-a895-00541de36526/_result.png",
  sdbCacaveli: "https://image.qwenlm.ai/generated-images/7890f02d-df12-4f69-ad06-b2fd835d1b24/_result.png",
  appartementBd30: "https://image.qwenlm.ai/generated-images/f3773e70-8759-40d4-b6b5-01b52c4f0b38/_result.png",
  craft: "https://image.qwenlm.ai/generated-images/0cdbddb3-6493-4b7b-84bd-16fdd0a3d91d/_result.png",
};

export const IMAGES = IMG;

export type ServiceSlug =
  | "renovation-complete"
  | "amenagement-interieur"
  | "cuisine"
  | "salle-de-bain";

export interface Service {
  slug: ServiceSlug;
  index: string;
  name: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  benefits: string[];
  scope: string[];
  projectTypes: string[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "renovation-complete",
    index: "01",
    name: "Rénovation complète",
    short:
      "La remise à neuf intégrale de votre maison ou appartement, du gros œuvre aux dernières finitions, pilotée par un interlocuteur unique.",
    description:
      "Vous souhaitez repartir d'une page blanche sans multiplier les intermédiaires ? Nous prenons en charge l'intégralité de votre rénovation : étude, démolition, second œuvre, finitions. Chaque corps de métier est coordonné par notre équipe, selon un planning défini avec vous avant le démarrage du chantier.",
    image: IMG.renovation,
    imageAlt: "Pièce de vie lumineuse après une rénovation complète à Lomé",
    benefits: [
      "Un interlocuteur unique de la visite à la livraison",
      "Tous les corps de métier coordonnés par notre équipe",
      "Devis détaillé poste par poste, sans surprise",
      "Planning défini et points d'avancement réguliers",
    ],
    scope: [
      "Démolition et redistribution des cloisons",
      "Électricité et plomberie complètes",
      "Sols, carrelage et revêtements",
      "Enduits, peinture et finitions",
      "Plafonds et mise en lumière",
      "Menuiseries intérieures et placards",
    ],
    projectTypes: ["Maison", "Appartement", "Local professionnel"],
    faq: [
      {
        q: "Prenez-vous en charge les rénovations partielles ?",
        a: "Oui. Nous intervenons aussi sur des périmètres réduits — une aile de maison, un étage, un plateau de bureaux — avec le même niveau d'exigence qu'une rénovation complète.",
      },
      {
        q: "Comment est établi le devis ?",
        a: "Après une visite sur site, chaque poste est chiffré séparément : matériaux, main-d'œuvre, délais. Vous savez exactement ce que vous payez, et toute modification en cours de chantier fait l'objet d'un accord écrit préalable.",
      },
      {
        q: "Qui suit le chantier au quotidien ?",
        a: "Un conducteur de travaux dédié organise les équipes, contrôle la qualité d'exécution et vous rend compte régulièrement — photos à l'appui si vous n'êtes pas sur place.",
      },
      {
        q: "Dans quelles zones intervenez-vous ?",
        a: "Nous intervenons à Lomé et dans ses environs. Pour un projet situé ailleurs au Togo, parlez-nous-en : nous étudions chaque demande au cas par cas.",
      },
    ],
  },
  {
    slug: "amenagement-interieur",
    index: "02",
    name: "Aménagement intérieur",
    short:
      "Des espaces optimisés et habillés sur mesure : rangements, dressings, claustras, mobilier intégré et ambiances pensées pour votre façon de vivre.",
    description:
      "Un intérieur réussi n'est pas une question de surface, mais d'organisation. Nous concevons et réalisons des aménagements sur mesure qui exploitent chaque mètre carré : bibliothèques toute hauteur, dressings, bureaux intégrés, claustras qui filtrent la lumière… Le tout dessiné avec vous, puis fabriqué et posé par nos menuisiers.",
    image: IMG.amenagement,
    imageAlt: "Menuiserie sur mesure avec éclairage intégré dans un séjour",
    benefits: [
      "Conception dessinée avec vous, au centimètre près",
      "Fabrication et pose par nos menuisiers",
      "Matériaux choisis pour durer sous climat tropical",
      "Chantier court, propre et sans mauvaise surprise",
    ],
    scope: [
      "Rangements et placards sur mesure",
      "Dressings et bibliothèques",
      "Claustras et séparations ajourées",
      "Mobilier intégré et têtes de lit",
      "Mise en lumière et ambiances",
      "Optimisation des circulations",
    ],
    projectTypes: ["Maison", "Appartement", "Bureau", "Commerce"],
    faq: [
      {
        q: "Travaillez-vous à partir de plans ou d'inspiration ?",
        a: "Les deux. Si vous avez des plans ou des images d'inspiration, nous les traduisons en solutions techniques. Sinon, nous partons de vos usages réels pour proposer un aménagement qui vous ressemble.",
      },
      {
        q: "Quels matériaux utilisez-vous ?",
        a: "Bois massif et panneaux de qualité, quincaillerie fiable, finitions adaptées à l'humidité et à la chaleur. Nous vous conseillons selon votre budget et l'usage de chaque pièce.",
      },
      {
        q: "Peut-il s'agir d'une seule pièce ?",
        a: "Bien sûr. Un dressing, un salon, un bureau à domicile : nous traitons chaque projet avec la même précision, quelle que soit son échelle.",
      },
    ],
  },
  {
    slug: "cuisine",
    index: "03",
    name: "Cuisine",
    short:
      "Des cuisines fonctionnelles et durables, pensées pour la cuisine de tous les jours : du plan de travail à l'électroménager, tout est posé et raccordé.",
    description:
      "La cuisine est la pièce la plus sollicitée de la maison. Nous la concevons autour de vos gestes quotidiens : zones de préparation, rangements accessibles, ventilation efficace, matériaux faciles à vivre. Du plan d'implantation à la pose des derniers équipements, nous livrons une cuisine prête à l'emploi.",
    image: IMG.cuisine,
    imageAlt: "Cuisine moderne aux façades vert sapin et plan de travail en bois",
    benefits: [
      "Plan d'implantation optimisé selon vos usages",
      "Meubles fabriqués pour résister à l'humidité",
      "Raccordements plomberie et électricité réalisés dans les règles",
      "Livraison prête à cuisiner, électroménager compris si souhaité",
    ],
    scope: [
      "Plan d'implantation et façades",
      "Fabrication et pose des meubles",
      "Plans de travail et crédences",
      "Électroménager : pose et intégration",
      "Plomberie, évacuations et robinetterie",
      "Éclairage de plan de travail",
    ],
    projectTypes: ["Maison", "Appartement", "Restaurant", "Location meublée"],
    faq: [
      {
        q: "Fournissez-vous l'électroménager ?",
        a: "Oui, nous pouvons fournir et poser plaques, fours, hottes et réfrigérateurs, ou installer les équipements que vous avez choisis. Dans tous les cas, les raccordements sont réalisés et testés par nos soins.",
      },
      {
        q: "Quels délais pour une cuisine ?",
        a: "Après validation du devis, comptez la fabrication puis la pose, selon la complexité du projet. Le calendrier précis figure dans votre devis, et nous vous tenons informé à chaque étape.",
      },
      {
        q: "Reprenez-vous l'ancienne cuisine ?",
        a: "Oui : dépose, évacuation des gravats et remise en état des murs et sols font partie de notre intervention si vous le souhaitez.",
      },
    ],
  },
  {
    slug: "salle-de-bain",
    index: "04",
    name: "Salle de bain",
    short:
      "Des salles d'eau et salles de bain refaites dans les règles de l'art : étanchéité sérieuse, matériaux nobles, équipements posés pour durer.",
    description:
      "Une salle de bain réussie repose sur des détails invisibles : étanchéité parfaite, pentes d'évacuation correctes, ventilation efficace. Nous refaisons vos salles d'eau de bout en bout, avec des matériaux qui vieillissent bien et des finitions soignées — parce que c'est la pièce où l'à-peu-près se paie le plus cher.",
    image: IMG.salleDeBain,
    imageAlt:
      "Salle de bain contemporaine avec douche à l'italienne et robinetterie laiton",
    benefits: [
      "Étanchéité et évacuations traitées dans les règles",
      "Douche à l'italienne, baignoire, double vasque",
      "Matériaux adaptés à l'humidité permanente",
      "Ventilation et éclairage pensés dès la conception",
    ],
    scope: [
      "Dépose complète et évacuation",
      "Étanchéité et formes de pente",
      "Carrelage, terrazzo et enduits",
      "Douches à l'italienne et baignoires",
      "Meubles vasques et miroirs",
      "Ventilation et éclairage",
    ],
    projectTypes: ["Maison", "Appartement", "Hôtel", "Location meublée"],
    faq: [
      {
        q: "Peut-on transformer une baignoire en douche ?",
        a: "C'est l'une de nos interventions les plus fréquentes. Nous déposons la baignoire, reprenons l'étanchéité et les évacuations, et posons une douche à l'italienne avec paroi vitrée.",
      },
      {
        q: "Comment gérez-vous l'humidité ?",
        a: "Étanchéité sous carrelage, matériaux hydrofuges, ventilation mécanique et joints adaptés : chaque point sensible est traité selon les règles de l'art, pas selon l'habitude.",
      },
      {
        q: "Travaillez-vous pour les locations meublées ?",
        a: "Oui, nous accompagnons propriétaires et gestionnaires pour des salles d'eau robustes, faciles à entretenir et pensées pour durer en usage intensif.",
      },
    ],
  },
];

export const serviceBySlug = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);

/* ————— Réalisations ————— */
export type ProjectCategory =
  | "renovation"
  | "amenagement"
  | "cuisine"
  | "salle-de-bain";

export interface GalleryItem {
  src: string;
  label: string;
  ratio: string; // classe d'aspect réservée (anti layout-shift)
  position: string; // cadrage object-position
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  image: string;
  imageAlt: string;
  portrait: boolean; // format de carte dans la grille
  featured?: boolean;
  summary: string;
  context: string[];
  scope: string[];
  materials: string[];
  gallery: GalleryItem[];
}

/* Galerie de démonstration — à remplacer par les photos réelles
   des chantiers de l'entreprise. */
export const PROJECTS: Project[] = [
  {
    slug: "villa-baguida",
    title: "Villa T4 — rénovation complète",
    category: "renovation",
    location: "Baguida, Lomé",
    image: IMG.villaBaguida,
    imageAlt: "Salon rénové d'une villa à Baguida, fauteuil vert et parquet bois",
    portrait: true,
    featured: true,
    summary:
      "Une villa des années 90 repensée entièrement : distributions, électricité, sols et menuiseries.",
    context: [
      "Les propriétaires souhaitaient moderniser leur villa familiale sans la dénaturer : conserver les volumes généreux, ouvrir les pièces de vie sur le jardin et remettre l'ensemble aux normes.",
      "Nous avons redistribué les espaces, repris l'électricité et la plomberie, posé un parquet bois dans les pièces de vie et créé des rangements sur mesure. Les teintes — os, chêne et vert sapin — accompagnent la lumière traversante du site.",
    ],
    scope: [
      "Redistribution des cloisons du rez-de-chaussée",
      "Électricité et plomberie refaites intégralement",
      "Parquet bois et carrelage grès cérame",
      "Peintures minérales et menuiseries sur mesure",
    ],
    materials: ["Chêne", "Enduit à la chaux", "Laiton", "Grès cérame"],
    gallery: [
      {
        src: IMG.villaBaguida,
        label: "Le salon, côté jardin",
        ratio: "aspect-[4/5]",
        position: "object-[50%_20%]",
      },
      {
        src: IMG.villaBaguida,
        label: "Détail des assises et textiles",
        ratio: "aspect-[4/3]",
        position: "object-[50%_85%]",
      },
      {
        src: IMG.hero,
        label: "La pièce de vie après travaux",
        ratio: "aspect-[4/3]",
        position: "object-[50%_40%]",
      },
    ],
  },
  {
    slug: "cuisine-agoe",
    title: "Cuisine familiale avec îlot central",
    category: "cuisine",
    location: "Agoè, Lomé",
    image: IMG.cuisineAgoe,
    imageAlt: "Cuisine avec îlot central vert sapin et suspensions en laiton à Agoè",
    portrait: true,
    summary:
      "Une cuisine fermée devenue pièce de vie : îlot central, rangements toute hauteur et lumière traversante.",
    context: [
      "La cuisine d'origine, fermée et sombre, ne correspondait plus à la vie de la famille. L'objectif : ouvrir l'espace, gagner en rangement et créer un vrai lieu de rassemblement.",
      "L'îlot central en bois peint concentre la préparation et le lavage ; les colonnes toute hauteur accueillent fours et réfrigérateur. Les crédences en zellige et le plan de travail en chêne réchauffent l'ensemble.",
    ],
    scope: [
      "Ouverture de la cloison et reprise structurelle",
      "Îlot central avec évier et rangements",
      "Colonnes toute hauteur, fours intégrés",
      "Crédence zellige et plan de travail chêne",
    ],
    materials: ["Chêne", "Zellige", "Laiton", "Béton ciré"],
    gallery: [
      {
        src: IMG.cuisineAgoe,
        label: "L'îlot, cœur de la pièce",
        ratio: "aspect-[4/5]",
        position: "object-[50%_25%]",
      },
      {
        src: IMG.cuisineAgoe,
        label: "Perspective sur la cour",
        ratio: "aspect-[4/3]",
        position: "object-[50%_80%]",
      },
      {
        src: IMG.cuisine,
        label: "Façades vert sapin et laiton",
        ratio: "aspect-[4/3]",
        position: "object-[50%_45%]",
      },
    ],
  },
  {
    slug: "sdb-cacaveli",
    title: "Salle de bain parentale terrazzo",
    category: "salle-de-bain",
    location: "Cacavéli, Lomé",
    image: IMG.sdbCacaveli,
    imageAlt: "Douche à l'italienne en terrazzo dans une salle de bain à Cacavéli",
    portrait: true,
    summary:
      "Une salle de bain datée transformée en salle d'eau contemporaine : douche à l'italienne et terrazzo continu.",
    context: [
      "Baignoire peu utilisée, carrelage fatigué, humidité mal maîtrisée : la salle de bain parentale devait être entièrement reprise, étanchéité comprise.",
      "Nous avons déposé l'existant, refait l'étanchéité et les pentes, puis posé un terrazzo continu du sol à la douche. Paroi cannelée, robinetterie laiton et niche éclairée complètent l'ensemble.",
    ],
    scope: [
      "Dépose complète et évacuation des gravats",
      "Étanchéité et formes de pente reprises",
      "Terrazzo continu sol et douche",
      "Paroi cannelée, robinetterie encastrée",
    ],
    materials: ["Terrazzo", "Verre cannelé", "Laiton", "Enduit minéral"],
    gallery: [
      {
        src: IMG.sdbCacaveli,
        label: "La douche à l'italienne",
        ratio: "aspect-[4/5]",
        position: "object-[50%_30%]",
      },
      {
        src: IMG.sdbCacaveli,
        label: "Jeu d'ombre et de matière",
        ratio: "aspect-[4/3]",
        position: "object-[50%_75%]",
      },
      {
        src: IMG.salleDeBain,
        label: "Vasque et miroir laiton",
        ratio: "aspect-[4/3]",
        position: "object-[50%_50%]",
      },
    ],
  },
  {
    slug: "appartement-bd30",
    title: "Appartement — aménagement sur mesure",
    category: "amenagement",
    location: "Bd du 30 Août, Lomé",
    image: IMG.appartementBd30,
    imageAlt: "Chambre aménagée avec tête de lit en chêne toute hauteur à Lomé",
    portrait: true,
    summary:
      "Un appartement en location meublée optimisé du sol au plafond : tête de lit technique, rangements invisibles.",
    context: [
      "Le propriétaire souhaitait un appartement meublé haut de gamme, prêt à louer, avec des rangements généreux sans encombrer les volumes.",
      "Nous avons dessiné une tête de lit toute hauteur intégrant tables de chevet, liseuses et rangements, complétée par un banc-coffre en cannage. Chaque centimètre disponible a été exploité.",
    ],
    scope: [
      "Tête de lit technique toute hauteur",
      "Tables de chevet et liseuses intégrées",
      "Banc-coffre en cannage",
      "Éclairage et prises intégrés au mobilier",
    ],
    materials: ["Chêne", "Cannage", "Lin", "Laiton"],
    gallery: [
      {
        src: IMG.appartementBd30,
        label: "La tête de lit toute hauteur",
        ratio: "aspect-[4/5]",
        position: "object-[50%_25%]",
      },
      {
        src: IMG.appartementBd30,
        label: "Le banc-coffre en cannage",
        ratio: "aspect-[4/3]",
        position: "object-[50%_80%]",
      },
      {
        src: IMG.amenagement,
        label: "Menuiserie et lumière intégrée",
        ratio: "aspect-[4/3]",
        position: "object-[50%_50%]",
      },
    ],
  },
];

export const projectBySlug = (slug: string) =>
  PROJECTS.find((p) => p.slug === slug);

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  renovation: "Rénovation",
  amenagement: "Aménagement intérieur",
  cuisine: "Cuisine",
  "salle-de-bain": "Salle de bain",
};

/* Correspondance catégorie → type de projet du formulaire devis */
export const CATEGORY_TO_FORM_TYPE: Record<ProjectCategory, string> = {
  renovation: "Rénovation complète",
  amenagement: "Aménagement intérieur",
  cuisine: "Cuisine",
  "salle-de-bain": "Salle de bain",
};

/* ————— Processus ————— */
export const PROCESS = [
  {
    step: "01",
    title: "Échange",
    text: "Par formulaire, téléphone ou WhatsApp : vous nous décrivez votre projet et vos contraintes.",
  },
  {
    step: "02",
    title: "Visite & analyse",
    text: "Nous venons sur place, mesurons, écoutons vos usages et identifions les points techniques.",
  },
  {
    step: "03",
    title: "Devis détaillé",
    text: "Un chiffrage poste par poste, clair et sans ligne floue. Vous comparez, vous décidez.",
  },
  {
    step: "04",
    title: "Réalisation",
    text: "Un conducteur de travaux dédié, des points réguliers, un chantier propre jusqu'à la livraison.",
  },
];

/* ————— Réassurance (qualitative, sans chiffre inventé) ————— */
export const REASONS = [
  {
    icon: "interlocuteur" as const,
    title: "Un interlocuteur unique",
    text: "De la première visite à la remise des clés, vous parlez à une seule personne qui connaît votre dossier.",
  },
  {
    icon: "devis" as const,
    title: "Un devis détaillé, poste par poste",
    text: "Chaque ligne est chiffrée et expliquée. Ce qui n'est pas écrit n'est pas facturé.",
  },
  {
    icon: "planning" as const,
    title: "Un planning annoncé et tenu",
    text: "Le calendrier est fixé avant le démarrage. Vous êtes informé de l'avancement, sans avoir à demander.",
  },
  {
    icon: "execution" as const,
    title: "Une exécution contrôlée",
    text: "Chaque étape est vérifiée avant la suivante : étanchéité, niveaux, raccordements, finitions.",
  },
  {
    icon: "chantier" as const,
    title: "Un chantier propre et respectueux",
    text: "Zones protégées, gravats évacués, lieux laissés propres chaque soir. Votre quotidien est préservé.",
  },
];

/* ————— FAQ générale (page contact) ————— */
export const GENERAL_FAQ = [
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui. La visite sur site et l'établissement du devis détaillé sont gratuits et sans engagement.",
  },
  {
    q: "Quels types de projets prenez-vous en charge ?",
    a: "Rénovation complète, aménagement intérieur, cuisines et salles de bain — pour les particuliers comme pour les professionnels (bureaux, commerces, locations meublées).",
  },
  {
    q: "Intervenez-vous en dehors de Lomé ?",
    a: "Nous intervenons à Lomé et dans ses environs. Pour un projet ailleurs au Togo, décrivez-le nous : nous étudions chaque demande.",
  },
  {
    q: "Comment se passe la première prise de contact ?",
    a: "Vous remplissez le formulaire ou nous appelez. Nous revenons vers vous pour organiser une visite sur site, puis vous recevez un devis détaillé.",
  },
];
