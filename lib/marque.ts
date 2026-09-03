/**
 * Point unique de vérité pour l'identité du site.
 * Changer le nom, le domaine, un numéro ou une adresse doit rester
 * un commit d'une seule ligne ici — jamais une chasse dans les composants.
 */
export const MARQUE = {
  nom: "Charina Bien-Être",
  praticienne: "Charina Duguet",
  baseline: "Le massage par le mouvement, en sud Ardèche.",
  /** La baseline du hero, découpée pour l'affichage en gros titre. */
  heroLignes: ["Pas la force.", "Le mouvement."],

  /* ⚠️ Domaine pas encore acheté (décision Yann du 2026-09-03).
     Tout le site lit cette constante : le jour de l'achat OVH, cette ligne
     et la suivante suffisent. Vérifier la disponibilité avant de promettre
     l'adresse à Charina. */
  domaine: "charina-bienetre.fr",
  siteUrl: "https://charina-bienetre.fr",

  /* Adresse de contact publique. L'adresse yahoo personnelle de Charina ne
     doit apparaître nulle part sur le site — elle sera à créer sur le
     domaine en même temps que les DNS. */
  emailContact: "contact@charina-bienetre.fr",

  telephone: "06 22 97 62 67",
  /** Format international, pour les liens tel: et WhatsApp. */
  telephoneLien: "+33622976267",
  whatsapp: "https://wa.me/33622976267",

  instagram: "https://www.instagram.com/charina_bienetre/",
  facebook: "https://www.facebook.com/charina.duguet",
} as const;

/**
 * Le titre décerné en concours.
 *
 * Yann a confirmé la formulation le 2026-09-03 : c'est la même que celle
 * déjà en ligne sur l'autre site qu'il gère pour elle. Elle est isolée ici
 * parce qu'un titre de concours se conteste — si Charina précise un jour un
 * intitulé officiel différent, c'est cette constante qu'on corrige, et le
 * site entier suit.
 */
export const DISTINCTION = {
  court: "Championne de France de massage 2025",
  long: "Championne de France de massage 2025 · Prix de l'Innovation",
} as const;

/**
 * Zone réellement desservie. Pas de liste de villes gonflée pour ratisser
 * Google : quatre lieux où elle travaille vraiment, c'est plus crédible pour
 * une lectrice et mieux traité par Google qu'un pavé de communes.
 */
export const ZONE = {
  villePrincipale: "Salavas",
  codePostal: "07150",
  departement: "Ardèche",
  region: "Auvergne-Rhône-Alpes",
  /** Ordre d'affichage : ce que les clientes tapent le plus en premier. */
  communes: ["Ruoms", "Vallon-Pont-d'Arc", "Salavas", "Sud Ardèche"],
  resume: "Ruoms, Vallon-Pont-d'Arc, Salavas et le sud de l'Ardèche",
} as const;

/**
 * ⚠️ [À COMPLÉTER] — informations à récupérer auprès de Charina avant la
 * mise en ligne. Tant que `renseigne` vaut false, les mentions légales
 * affichent un encart d'attente au lieu d'inventer quoi que ce soit, et
 * l'adresse postale est retirée des données structurées envoyées à Google.
 */
export const STATUT_JURIDIQUE = {
  renseigne: false,
  denomination: "[À COMPLÉTER — dénomination exacte]",
  formeJuridique: "[À COMPLÉTER — entreprise individuelle / micro-entreprise ?]",
  siret: "[À COMPLÉTER — SIRET]",
  adresse: "[À COMPLÉTER — adresse du lieu de pratique]",
  /* Cabinet fixe, domicile de la cliente, ou les deux ? La réponse change la
     page Réservation autant que la fiche Google Business. */
  lieuPratique: "[À COMPLÉTER — cabinet fixe ? à domicile ? les deux ?]",
} as const;
