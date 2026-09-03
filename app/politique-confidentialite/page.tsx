import type { Metadata } from "next";
import { PageTexte, type BlocTexte } from "@/components/page-texte";
import { MARQUE } from "@/lib/marque";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Ce que devient ce que vous écrivez sur le site ${MARQUE.nom} : données collectées, durée de conservation, vos droits.`,
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: false, follow: true },
};

const BLOCS: BlocTexte[] = [
  {
    titre: "Ce que nous collectons",
    paragraphes: [
      "Uniquement ce que vous écrivez vous-même dans le formulaire de demande de rendez-vous :",
    ],
    points: [
      "votre prénom et votre nom",
      "votre numéro de téléphone et votre adresse e-mail",
      "le soin qui vous intéresse et vos disponibilités",
      "le message libre, si vous en écrivez un",
    ],
  },
  {
    titre: "À quoi cela sert",
    paragraphes: [
      "À vous rappeler pour convenir d’un rendez-vous, et à rien d’autre. Vos coordonnées ne sont ni vendues, ni louées, ni transmises à un tiers à des fins commerciales. Vous ne serez pas inscrite à une lettre d’information : aucun envoi automatique n’est prévu en dehors de l’accusé de réception de votre demande.",
      "Si vous mentionnez une information de santé dans le champ libre (une grossesse, une opération récente, une zone douloureuse), elle sert uniquement à adapter le soin ou, le cas échéant, à vous orienter vers un professionnel de santé. N’y écrivez que ce que vous jugez utile.",
    ],
  },
  {
    titre: "Où vont ces informations",
    paragraphes: [
      "Votre demande est transmise par e-mail à Charina, via le service d’envoi Resend, et signalée par une notification. Elle n’est pas enregistrée dans une base de données publique et n’est consultable que par Charina et par le prestataire technique du site.",
    ],
  },
  {
    titre: "Combien de temps",
    paragraphes: [
      "Les demandes sont conservées dans la messagerie de Charina le temps du suivi de la relation, puis supprimées au plus tard trois ans après le dernier contact.",
    ],
  },
  {
    titre: "Mesure d’audience et cookies",
    paragraphes: [
      "Ce site ne dépose aucun cookie publicitaire et n’utilise aucun traceur tiers à des fins de profilage. Aucun bandeau de consentement n’est nécessaire.",
    ],
  },
  {
    titre: "Vos droits",
    paragraphes: [
      `Vous pouvez à tout moment demander l’accès, la rectification ou la suppression des informations vous concernant, en écrivant à ${MARQUE.emailContact} ou en appelant le ${MARQUE.telephone}. Vous disposez également du droit d’introduire une réclamation auprès de la CNIL (cnil.fr).`,
    ],
  },
];

export default function PagePolitiqueConfidentialite() {
  return (
    <PageTexte
      surtitre="Vos données"
      titre="Politique de confidentialité"
      chapeau="Ce site demande le strict minimum, pour une seule raison : vous rappeler. Voici précisément ce qui est collecté, et ce que ça devient."
      blocs={BLOCS}
    />
  );
}
