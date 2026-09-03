/**
 * Les cinq soins.
 *
 * Prix et durées vivent ici, jamais en dur dans un composant : changer un
 * tarif doit rester une ligne à modifier, relue en diff avant d’être mise en
 * ligne. Le brief prévoyait une table Supabase ; Yann a tranché le
 * 2026-09-03 pour un fichier typé, le temps que le volume justifie une base.
 * Le jour où elle arrive, c’est ce module qui devient une requête — les
 * pages, elles, ne bougent pas.
 *
 * ⚠️ Registre : Charina n’est pas professionnelle de santé. On décrit des
 * sensations et du confort (« soulage », « apaise », « détend »), jamais un
 * effet thérapeutique (« soigne », « traite », « guérit »). Toute relecture
 * de ces textes doit tenir cette ligne.
 */

export type Soin = {
  slug: string;
  nom: string;
  /** Les trois mots de son vocabulaire à elle, repris du site actuel. */
  accroche: string;
  dureeMinutes: number;
  prixEuros: number;
  ordre: number;
  actif: boolean;
  /** Une à deux phrases : cartes d’aperçu et méta-description. */
  resume: string;
  metaTitre: string;
  metaDescription: string;
  /** Le corps de la page, dans l’ordre de lecture. */
  paragraphes: string[];
  pourQui: string[];
  deroule: { titre: string; texte: string }[];
  bienfaits: string[];
};

export const SOINS: Soin[] = [
  {
    slug: "signature-charina-fusion",
    nom: "Signature Charina Fusion",
    accroche: "Massage du monde",
    dureeMinutes: 60,
    prixEuros: 85,
    ordre: 1,
    actif: true,
    resume:
      "Le soin qui porte son nom. Huit techniques apprises aux quatre coins du monde, assemblées en un seul mouvement continu, recomposé pour chaque personne qui s’allonge sur la table.",
    metaTitre: "Massage signature Charina Fusion — Ruoms",
    metaDescription:
      "Le massage signature de Charina Duguet à Salavas : huit techniques du monde en un seul soin sur mesure, 1 h, 85 €. Ruoms, Vallon-Pont-d’Arc, sud Ardèche.",
    paragraphes: [
      "C’est le massage qu’on vient chercher de loin, et c’est aussi le plus difficile à raconter — parce qu’il n’a pas de protocole figé. Charina a appris le Hilot aux Philippines, d’où elle vient, puis le suédois, le californien, le lomi-lomi hawaïen, les étirements thaï, le travail profond, les ventouses, le drainage. Le Charina Fusion, c’est ce qui reste quand on cesse de les pratiquer séparément : un seul soin, assemblé sur place, à partir de ce que votre corps raconte ce jour-là.",
      "Sa particularité tient en une phrase, et c’est celle qui la distingue de la plupart des praticiens : elle ne travaille pas par la pression, mais par le mouvement. Beaucoup de massages appuient fort et attendent que le muscle cède. Ici, l’avant-bras, la paume et le coude circulent, reviennent, relancent — et la tension se relâche parce qu’elle n’a plus de raison de tenir. C’est cette approche qui a été distinguée en concours, et c’est ce que les clientes décrivent en se relevant : l’impression d’avoir été déplacée plutôt que pétrie.",
      "Concrètement, aucune séance ne ressemble à la précédente. Une nuque bloquée depuis trois semaines de bureau n’appelle pas les mêmes gestes qu’un dos de maçon, ni que des jambes de serveuse en fin de saison. Charina commence par regarder comment vous vous tenez debout, puis elle compose : long et enveloppant là où il faut détendre, précis et appuyé là où ça bloque, avec parfois une ventouse ou un étirement quand la zone le demande. Vous n’avez rien à choisir à l’avance — c’est son métier de le faire.",
      "Une heure, c’est le format juste pour un corps entier sans rien bâcler. Si vous hésitez entre les cinq soins de la carte, prenez celui-ci : c’est le plus complet, et c’est aussi le meilleur moyen de découvrir sa façon de travailler avant de revenir vers un soin plus ciblé.",
    ],
    pourQui: [
      "Vous découvrez son travail et vous voulez le format le plus représentatif",
      "Vous avez plusieurs zones tendues à la fois, sans savoir par laquelle commencer",
      "Vous avez déjà essayé des massages qui vous ont paru trop mous, ou au contraire trop brutaux",
      "Vous offrez un soin à quelqu’un et vous ne connaissez pas ses préférences",
    ],
    deroule: [
      {
        titre: "Quelques minutes pour parler",
        texte:
          "Ce que vous faites de vos journées, ce qui tire, ce qui vous a amenée là. Si vous préférez ne pas parler, dites-le : la séance se passera très bien en silence.",
      },
      {
        titre: "Le corps entier, en continu",
        texte:
          "Dos, nuque, épaules, bras, jambes, pieds. Le fil ne se coupe pas : les techniques s’enchaînent sans que vous ayez à suivre ce qui change.",
      },
      {
        titre: "Le temps de revenir",
        texte:
          "On ne vous demande pas de vous rhabiller dans la minute. Un verre d’eau, quelques minutes assise, et vous repartez à votre rythme.",
      },
    ],
    bienfaits: [
      "Soulage les tensions accumulées dans le dos, la nuque et les épaules",
      "Détend en profondeur sans laisser la sensation d’avoir été malmenée",
      "Améliore la sensation de mobilité et d’amplitude dans les gestes du quotidien",
      "Apaise le mental — beaucoup s’endorment en cours de séance",
    ],
  },
  {
    slug: "sport-ventouses-boost",
    nom: "Sport & Ventouses Boost",
    accroche: "Puissant · Dynamisant · Revitalisant",
    dureeMinutes: 60,
    prixEuros: 80,
    ordre: 2,
    actif: true,
    resume:
      "Pour les corps qui travaillent. Travail profond et ventouses sur les zones qui encaissent : dos, cuisses, mollets, épaules. Sortie tonique, jamais assommée.",
    metaTitre: "Massage sportif et ventouses — Ruoms, Vallon",
    metaDescription:
      "Massage sportif profond et ventouses à Salavas, près de Ruoms et Vallon-Pont-d’Arc : récupération, jambes lourdes, dos de travailleur. 1 h, 80 €.",
    paragraphes: [
      "Celui-ci est fait pour les corps qui produisent de l’effort — les sportifs, mais pas seulement. En Ardèche, ce sont autant des coureurs et des grimpeurs que des couvreurs, des viticulteurs, des saisonniers debout douze heures par jour. Le point commun : des zones qui encaissent toujours les mêmes contraintes, jusqu’à devenir dures au toucher.",
      "Le travail est franc, plus appuyé que sur les autres soins de la carte, mais il reste tenu par la même règle : on relance la circulation avant de forcer quoi que ce soit. Charina passe d’abord longuement sur la zone pour la réchauffer, puis entre en profondeur avec l’avant-bras et le coude, et n’insiste sur un point que quand le muscle autour a déjà lâché. C’est ce qui fait la différence entre un massage profond et un massage qui laisse des bleus.",
      "Les ventouses interviennent sur les zones qui résistent — souvent le haut du dos, les lombaires, l’arrière des cuisses. Posées quelques minutes, parfois glissées le long du muscle, elles décollent les plans et créent de l’espace là où tout adhérait. Il faut le savoir : elles laissent des marques rondes, plus ou moins foncées selon les personnes, qui s’estompent en quelques jours et ne sont pas douloureuses. Si vous avez un événement, un mariage ou des photos dans la semaine, dites-le en arrivant : la séance se fait très bien sans elles.",
      "En sortant, vous ne serez pas dans le brouillard cotonneux des massages relaxants — c’est voulu. Ce soin réveille. Beaucoup le prennent le lendemain d’une course ou en fin de semaine de chantier, et repartent conduire sans difficulté. Buvez de l’eau dans les heures qui suivent, et évitez l’effort maximal le jour même.",
    ],
    pourQui: [
      "Vous vous entraînez régulièrement et vous récupérez mal entre deux séances",
      "Votre métier sollicite toujours les mêmes zones — dos, épaules, mollets",
      "Vous avez des muscles durs au toucher, ou une sensation de raideur au réveil",
      "Vous cherchez un soin qui réveille plutôt qu’un soin qui endort",
    ],
    deroule: [
      {
        titre: "Repérage",
        texte:
          "Votre sport ou votre métier, les zones qui tirent, ce qui s’est passé récemment — une compétition, une grosse semaine, une vieille blessure à contourner.",
      },
      {
        titre: "Réchauffer, puis entrer",
        texte:
          "Passages longs pour préparer, puis travail profond à l’avant-bras et au coude sur les zones ciblées. Vous dites ce qui est trop : l’intensité s’ajuste en direct.",
      },
      {
        titre: "Ventouses si nécessaire",
        texte:
          "Quelques minutes sur les zones qui résistent, fixes ou glissées. Facultatif, et retiré de la séance si vous préférez éviter les marques.",
      },
    ],
    bienfaits: [
      "Soulage les muscles chargés après l’effort ou une journée de travail physique",
      "Aide à retrouver de l’amplitude sur les zones raides",
      "Accompagne la récupération entre deux entraînements",
      "Procure une sensation de jambes et de dos plus légers",
    ],
  },
  {
    slug: "art-du-toucher-intuitif",
    nom: "L’art du toucher intuitif",
    accroche: "Intuitif · Profond · Harmonisant",
    dureeMinutes: 60,
    prixEuros: 75,
    ordre: 3,
    actif: true,
    resume:
      "Aucun protocole, aucune zone décidée à l’avance. Charina suit ce qu’elle trouve sous ses mains, et le soin se construit là où le corps le demande.",
    metaTitre: "Massage intuitif à Ruoms et Vallon-Pont-d’Arc",
    metaDescription:
      "Massage intuitif à Salavas, près de Ruoms et Vallon-Pont-d’Arc : un soin sans protocole, guidé par ce que le corps demande. 1 h, 75 €.",
    paragraphes: [
      "C’est le soin le plus libre de la carte, et sans doute le plus personnel. Il n’y a pas d’enchaînement prévu, pas de zone décidée avant que vous soyez allongée. Charina pose les mains, écoute ce qu’elle trouve — une épaule plus haute que l’autre, un ventre qui ne respire pas, un mollet dur comme du bois — et le soin part de là.",
      "« Intuitif » ne veut pas dire mystérieux. Après plus de huit techniques apprises et des milliers d’heures de table, une praticienne sent sous ses doigts des choses qu’aucun protocole ne prévoit. Ce soin, c’est simplement le moment où elle cesse de suivre une trame pour ne suivre que ce qu’elle perçoit. Rien d’ésotérique là-dedans : de l’expérience, et une attention qui ne se disperse pas.",
      "En pratique, la séance peut passer quarante minutes sur une seule zone si c’est ce qu’il faut, ou parcourir tout le corps sans jamais insister. Certaines séances sont presque immobiles, d’autres très mobilisantes, avec des bercements et des étirements lents. Le rythme est en général plus lent que sur les autres soins : c’est ce qui permet à des tensions anciennes, celles qu’on ne sent même plus, de se signaler.",
      "C’est le soin que choisissent souvent les personnes qui ont du mal à dire ce dont elles ont besoin — parce que justement, ici, on ne vous le demande pas. C’est aussi celui vers lequel reviennent les habituées après avoir fait le tour de la carte, quand elles ont confiance et qu’elles veulent simplement se déposer.",
    ],
    pourQui: [
      "Vous ne savez pas nommer ce qui ne va pas, mais quelque chose ne va pas",
      "Vous avez traversé une période chargée, physiquement ou émotionnellement",
      "Vous connaissez déjà son travail et vous voulez lui laisser la main",
      "Vous cherchez un soin lent, où l’on ne vous demande rien",
    ],
    deroule: [
      {
        titre: "Presque pas de questions",
        texte:
          "Juste ce qu’il faut savoir : ce qu’il faut éviter, une zone sensible, une opération récente. Le reste se découvre sous les mains.",
      },
      {
        titre: "Le soin se construit sur place",
        texte:
          "Charina suit ce qu’elle trouve. Une zone peut occuper la moitié de la séance, une autre être à peine effleurée.",
      },
      {
        titre: "Rien à commenter",
        texte:
          "Vous n’avez pas à valider ni à raconter. Si quelque chose est trop, un mot suffit à le faire changer.",
      },
    ],
    bienfaits: [
      "Détend les zones tendues que l’on n’identifie pas soi-même",
      "Apaise après une période de fatigue ou de stress prolongé",
      "Aide à retrouver une respiration plus ample",
      "Procure un relâchement durable, souvent ressenti le lendemain",
    ],
  },
  {
    slug: "relax-lacher-prise",
    nom: "Relax & Lâcher-prise",
    accroche: "Apaisant · Enveloppant · Rééquilibrant",
    dureeMinutes: 60,
    prixEuros: 70,
    ordre: 4,
    actif: true,
    resume:
      "Le soin le plus doux de la carte. Des mouvements longs, enveloppants, sans appui profond — une heure pour que le système nerveux redescende.",
    metaTitre: "Massage relaxant — Ruoms, Vallon-Pont-d’Arc",
    metaDescription:
      "Massage relaxant à Salavas, près de Ruoms et Vallon-Pont-d’Arc : mouvements longs et enveloppants pour décrocher vraiment. 1 h, 70 €.",
    paragraphes: [
      "Il y a des jours où le corps n’a pas besoin qu’on aille chercher au fond. Il a besoin qu’on le laisse redescendre. C’est exactement ce que fait ce soin : des mouvements longs, continus, enveloppants, sans appui profond, avec un rythme qui ralentit à mesure que la séance avance.",
      "C’est le soin le plus doux de la carte, et c’est un choix technique, pas un soin au rabais. Le geste enveloppant, répété et prévisible, est ce qui permet au système nerveux de relâcher sa vigilance : le corps finit par comprendre qu’il n’a plus rien à surveiller. C’est là que la mâchoire se desserre, que les épaules descendent de deux centimètres, et que beaucoup s’endorment sans s’en rendre compte.",
      "Charina travaille sur le corps entier, dos et jambes en priorité, avec de l’huile chaude et sans à-coups. Aucune zone n’est retravaillée en force. Si une tension se signale au passage, elle est prise longuement plutôt que fort — la différence est nette, et c’est ce qui distingue ce soin du Charina Fusion, où l’on va chercher plus loin.",
      "Une remarque revient souvent : « je n’ai pas vu passer l’heure ». C’est le signe que ça a fonctionné. Le corps qui décroche perd la notion du temps, et c’est précisément ce qu’on ne peut pas obtenir en serrant les dents pendant un massage trop appuyé. Si vous avez tendance à surveiller la pendule, à penser à votre liste de courses ou à vous excuser de vous détendre, ce soin est fait pour vous — et il n’y a rien à réussir.",
      "C’est le soin à choisir quand vous dormez mal, quand vous enchaînez sans respirer depuis des semaines, ou tout simplement quand vous voulez une heure où personne ne vous demande rien. C’est aussi le plus accessible pour un premier massage, si l’idée d’un travail profond vous intimide. Et si, en cours de route, vous vous rendez compte que vous auriez besoin de quelque chose de plus appuyé, dites-le : Charina ajustera, ou vous orientera vers un autre soin la prochaine fois.",
    ],
    pourQui: [
      "Vous dormez mal ou vous vous réveillez déjà fatiguée",
      "Vous n’avez pas de douleur particulière, juste besoin de décrocher",
      "C’est votre premier massage et vous préférez commencer en douceur",
      "Vous supportez mal les massages appuyés",
    ],
    deroule: [
      {
        titre: "Installation",
        texte:
          "Table chauffée, huile tiède, lumière basse. On vérifie que vous avez chaud — un corps qui a froid ne se détend pas.",
      },
      {
        titre: "Une heure sans à-coups",
        texte:
          "Mouvements longs et enveloppants sur le corps entier, dos et jambes en priorité. Le rythme ralentit au fil de la séance.",
      },
      {
        titre: "Réveil en douceur",
        texte:
          "Si vous vous êtes endormie, on ne vous presse pas. Le temps de revenir fait partie du soin.",
      },
    ],
    bienfaits: [
      "Apaise le stress et l’agitation mentale",
      "Favorise un endormissement plus facile le soir même",
      "Détend les épaules, la nuque et la mâchoire",
      "Redonne une sensation de calme qui tient souvent plusieurs jours",
    ],
  },
  {
    slug: "detox-legerete",
    nom: "Détox & Légèreté",
    accroche: "Drainant · Sculptant · Régénérant",
    dureeMinutes: 60,
    prixEuros: 70,
    ordre: 5,
    actif: true,
    resume:
      "Un drainage manuel doux, tout en mouvements lents et rythmés, pour les jambes lourdes et les sensations de gonflement en fin de journée.",
    metaTitre: "Drainage lymphatique — Ruoms, Vallon-Pont-d’Arc",
    metaDescription:
      "Massage drainant bien-être à Salavas, près de Ruoms et Vallon-Pont-d’Arc : jambes lourdes, sensation de gonflement, légèreté. 1 h, 70 €.",
    paragraphes: [
      "Ce soin s’adresse d’abord aux jambes lourdes — celles de la fin de journée debout, des fortes chaleurs de l’été ardéchois, des longs trajets en voiture, ou des semaines où l’on se sent gonflée sans savoir pourquoi. C’est un drainage manuel de bien-être : des pressions douces, lentes et très rythmées, remontant toujours dans le même sens.",
      "La technique est à l’opposé du massage sportif. Ici, la pression est légère — beaucoup plus légère que ce à quoi on s’attend — parce que ce qu’on cherche à mobiliser circule juste sous la peau. La régularité du rythme compte davantage que la force : c’est répétitif, presque hypnotique, et c’est précisément ce qui produit la sensation de légèreté en se relevant.",
      "Charina travaille les jambes des pieds vers le haut, puis le ventre et les bras selon ce dont vous avez besoin. La séance est douce mais pas passive : le rythme soutenu la rend étonnamment tonique. On parle bien ici d’un soin de confort et de sensation, pas d’un acte de santé — s’il existe un problème circulatoire diagnostiqué, c’est un médecin ou un kinésithérapeute qui doit prendre le relais.",
      "Beaucoup de clientes le prennent en série pendant l’été, ou après une période de sédentarité. Buvez de l’eau après la séance, marchez un peu plutôt que de rester assise, et prévoyez si possible une soirée calme : l’effet de légèreté se prolonge dans les heures qui suivent.",
    ],
    pourQui: [
      "Vous avez les jambes lourdes en fin de journée ou par forte chaleur",
      "Vous ressentez une sensation de gonflement, surtout l’été",
      "Vous restez longtemps debout, assise ou en voiture",
      "Vous préférez une pression douce à un travail profond",
    ],
    deroule: [
      {
        titre: "Ce qui gonfle, et quand",
        texte:
          "Le moment de la journée, la saison, votre activité. On écarte aussi ce qui relève du médical plutôt que du bien-être.",
      },
      {
        titre: "Des pieds vers le haut",
        texte:
          "Pressions douces, lentes, très régulières, toujours dans le même sens. Puis le ventre et les bras si vous le souhaitez.",
      },
      {
        titre: "Après la séance",
        texte:
          "Un grand verre d’eau, un peu de marche plutôt que la voiture tout de suite, et une soirée sans course.",
      },
    ],
    bienfaits: [
      "Soulage la sensation de jambes lourdes",
      "Procure une impression de légèreté et de circulation retrouvée",
      "Apaise par la régularité du rythme, sans jamais appuyer fort",
      "Convient particulièrement aux périodes de forte chaleur",
    ],
  },
];

/** Les soins visibles sur le site, dans l’ordre voulu. */
export const SOINS_ACTIFS = SOINS.filter((soin) => soin.actif).sort(
  (a, b) => a.ordre - b.ordre,
);

export function trouverSoin(slug: string): Soin | undefined {
  return SOINS_ACTIFS.find((soin) => soin.slug === slug);
}

/** « 70 € » — un seul endroit pour la mise en forme d’un prix. */
export function formaterPrix(euros: number): string {
  return `${euros} €`;
}

/** « 1 h » plutôt que « 60 min » : c’est ainsi qu’on en parle de vive voix. */
export function formaterDuree(minutes: number): string {
  if (minutes % 60 === 0) return `${minutes / 60} h`;
  return `${Math.floor(minutes / 60)} h ${minutes % 60}`;
}
