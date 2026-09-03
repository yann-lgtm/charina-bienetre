import { DISTINCTION, ZONE } from "@/lib/marque";

/**
 * Les textes de fond du site — bio, piliers, promesses.
 * Séparés des composants pour qu’une relecture de Charina puisse se faire
 * dans un seul fichier, sans lire de JSX.
 */

/** Les trois raisons de venir chez elle plutôt qu’ailleurs, sur l’accueil. */
export const PILIERS = [
  {
    titre: "Le mouvement plutôt que la force",
    texte:
      "La plupart des massages appuient et attendent que le muscle cède. Charina fait circuler : l’avant-bras et la paume reviennent, relancent, et la tension se relâche d’elle-même. On sort déplacée, pas pétrie.",
  },
  {
    titre: "Huit techniques, un seul soin",
    texte:
      "Le Hilot de ses origines philippines, le suédois, le californien, le lomi-lomi, les étirements thaï, le travail profond, les ventouses, le drainage. Elles ne sont pas proposées séparément : elles sont assemblées pour vous, le jour même.",
  },
  {
    titre: `${DISTINCTION.court}`,
    texte:
      "Sa façon de travailler a été distinguée en concours, avec le Prix de l’Innovation la même année. C’est une reconnaissance de métier — pas un argument qu’elle met en avant elle-même, et il faut souvent le lui arracher.",
  },
] as const;

/** Bio de la page À propos, en blocs pour aérer la lecture sur mobile. */
export const BIO = {
  chapeau:
    "Praticienne en soins corporels à Salavas, entre Ruoms et Vallon-Pont-d’Arc. Née aux Philippines, formée à plus de huit techniques, et convaincue qu’un corps se dénoue par le mouvement bien plus que par la force.",
  sections: [
    {
      titre: "D’où viennent ses mains",
      paragraphes: [
        "Charina Duguet est née aux Philippines, où le massage n’est pas un luxe de fin de semaine mais un geste de famille. Le Hilot, la médecine traditionnelle philippine, s’y transmet à la maison : on masse un enfant qui a mal au ventre, une grand-mère qui ne dort plus, un frère rentré du champ. C’est là qu’elle a appris à toucher, bien avant d’en faire un métier.",
        "Le reste est venu par la formation, technique après technique : le suédois et ses longs mouvements, le californien, le lomi-lomi hawaïen, les étirements thaï, le travail profond, les ventouses, le drainage. Plus de huit approches, qu’elle a cessé de pratiquer séparément le jour où elle a compris que ce qui l’intéressait, c’était de les faire tenir ensemble.",
      ],
    },
    {
      titre: "Sa façon de travailler",
      paragraphes: [
        "Elle ne travaille pas par la pression, mais par le mouvement. C’est une différence qui s’explique mal et se ressent tout de suite : plutôt que d’appuyer jusqu’à ce que le muscle lâche, elle fait circuler, revient, relance, jusqu’à ce que la tension n’ait plus de raison de tenir. Les corps très noués s’en aperçoivent dès les premières minutes.",
        `Cette approche a été distinguée en concours — ${DISTINCTION.long.toLowerCase()}. Elle n’en parle pratiquement jamais : c’est une reconnaissance entre gens du métier, et ce qui l’intéresse reste ce qui se passe sur la table.`,
        "Elle poursuit aujourd’hui une formation en Médecine Traditionnelle Chinoise, pour affiner sa lecture des tensions et de la circulation dans le corps. Elle continue d’apprendre, et le dit volontiers.",
      ],
    },
    {
      titre: "Ce qu’elle cherche à vous rendre",
      paragraphes: [
        "Ralentir, respirer, se reconnecter : c’est la phrase qu’elle emploie, et elle la prend au pied de la lettre. On vient rarement pour une seule épaule bloquée. On vient parce qu’on n’a pas posé les armes depuis des mois, et qu’une heure sur une table est parfois le seul moment où personne ne demande rien.",
        `Elle reçoit à ${ZONE.villePrincipale}, et travaille pour toute la région de ${ZONE.resume}. Sa clientèle va des saisonniers en pleine saison touristique aux habitants de la vallée qui reviennent tous les mois, en passant par des vacanciers qui ont marché toute la journée dans les gorges.`,
      ],
    },
  ],
} as const;

/** Ce qui se passe après l’envoi du formulaire — dit clairement, ça rassure. */
export const ETAPES_RESERVATION = [
  {
    titre: "Vous envoyez votre demande",
    texte:
      "Le soin qui vous intéresse, vos disponibilités, et de quoi vous joindre. Rien n’est débité, rien n’est engagé.",
  },
  {
    titre: "Charina vous rappelle",
    texte:
      "Elle vous appelle ou vous écrit pour caler le créneau, sous 24 à 48 h en général. Si c’est urgent, le téléphone reste le plus rapide.",
  },
  {
    titre: "Le rendez-vous est confirmé",
    texte:
      "Vous recevez le lieu exact et l’heure. Le règlement se fait sur place, à l’issue du soin.",
  },
] as const;

/**
 * Précautions générales. Volontairement formulées comme des invitations à
 * signaler, pas comme un diagnostic : Charina n’est pas professionnelle de
 * santé, et ce site ne doit jamais laisser croire le contraire.
 */
export const PRECAUTIONS = {
  intro:
    "Le massage bien-être ne remplace ni un avis médical, ni un traitement, ni le travail d’un kinésithérapeute. Signalez simplement à Charina, avant la séance :",
  points: [
    "une grossesse, en cours ou récente",
    "une opération, une fracture ou une blessure des derniers mois",
    "un problème circulatoire, cardiaque ou cutané suivi par un médecin",
    "une fièvre ou une infection en cours — dans ce cas, mieux vaut décaler",
    "un traitement en cours dont vous pensez qu’il peut avoir son importance",
  ],
  conclusion:
    "Rien de tout cela n’empêche forcément la séance : cela permet d’adapter le soin, ou de vous orienter vers la bonne personne si ce n’est pas elle.",
} as const;
