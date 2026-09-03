import { DISTINCTION, MARQUE, STATUT_JURIDIQUE, ZONE } from "@/lib/marque";
import { SOINS_ACTIFS, type Soin } from "@/lib/soins";

/**
 * Données structurées.
 *
 * Type retenu : `HealthAndBeautyBusiness`. `MassageTherapist` existe aussi
 * chez schema.org, mais il descend de `MedicalBusiness` — le déclarer
 * reviendrait à présenter Charina comme une professionnelle de santé, ce
 * qu’elle n’est pas. `HealthAndBeautyBusiness` est le type reconnu par Google
 * pour un institut ou un praticien bien-être, sans connotation médicale.
 */

const ID_ETABLISSEMENT = `${MARQUE.siteUrl}/#etablissement`;

export function ficheEtablissement() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": ID_ETABLISSEMENT,
    name: MARQUE.nom,
    description: `Massages bien-être par ${MARQUE.praticienne}, ${DISTINCTION.court.toLowerCase()}, à ${ZONE.villePrincipale}. ${ZONE.resume}.`,
    url: MARQUE.siteUrl,
    telephone: MARQUE.telephoneLien,
    email: MARQUE.emailContact,
    priceRange: "70 € – 85 €",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      /* L’adresse précise du lieu de pratique n’est pas encore connue : on
         n’envoie que ce qui est vrai. Dès que STATUT_JURIDIQUE est renseigné,
         la rue apparaît ici — et c’est ce qu’attend la fiche Google Business. */
      ...(STATUT_JURIDIQUE.renseigne
        ? { streetAddress: STATUT_JURIDIQUE.adresse }
        : {}),
      addressLocality: ZONE.villePrincipale,
      postalCode: ZONE.codePostal,
      addressRegion: ZONE.departement,
      addressCountry: "FR",
    },
    areaServed: ZONE.communes.map((commune) => ({
      "@type": "Place",
      name: commune,
    })),
    sameAs: [MARQUE.instagram, MARQUE.facebook],
    founder: {
      "@type": "Person",
      name: MARQUE.praticienne,
      jobTitle: "Praticienne en soins corporels",
      award: DISTINCTION.long,
    },
    makesOffer: SOINS_ACTIFS.map((soin) => ({
      "@type": "Offer",
      name: soin.nom,
      price: soin.prixEuros,
      priceCurrency: "EUR",
      url: `${MARQUE.siteUrl}/soins/${soin.slug}`,
    })),
  };
}

export function ficheSoin(soin: Soin) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: soin.nom,
    serviceType: "Massage bien-être",
    description: soin.resume,
    url: `${MARQUE.siteUrl}/soins/${soin.slug}`,
    provider: { "@id": ID_ETABLISSEMENT },
    areaServed: ZONE.communes.map((commune) => ({
      "@type": "Place",
      name: commune,
    })),
    offers: {
      "@type": "Offer",
      price: soin.prixEuros,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

/** Fil d’Ariane : `chemins` va du plus général au plus précis. */
export function filAriane(chemins: { nom: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: chemins.map((etape, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: etape.nom,
      item: `${MARQUE.siteUrl}${etape.url}`,
    })),
  };
}

/**
 * Injecte un bloc JSON-LD. Le contenu vient de nos propres modules typés,
 * jamais d’une saisie extérieure — c’est ce qui rend ce
 * `dangerouslySetInnerHTML` sans danger ici.
 */
export function DonneesStructurees({ donnees }: { donnees: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }}
    />
  );
}
