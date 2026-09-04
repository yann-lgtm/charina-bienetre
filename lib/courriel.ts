import { MARQUE, ZONE } from "@/lib/marque";

/**
 * Gabarit des e-mails transactionnels.
 *
 * Séparé de la route parce qu'un e-mail se relit et se retouche seul, sans
 * toucher à la logique d'envoi.
 *
 * Trois contraintes propres au courriel, qui expliquent le style du code :
 * — pas de feuille de style ni de classe : les clients de messagerie les
 *   ignorent ou les suppriment, tout est donc en attribut `style` ;
 * — une mise en page en tableau, seule structure qu'Outlook rend fidèlement ;
 * — pas de police web : Fraunces ne se chargera pas, on retombe sur une
 *   pile serif système qui garde l'esprit du site.
 */

/** Palette reprise de `globals.css`, valeurs figées ici — un e-mail parti ne
 *  se met plus à jour, autant qu'il ne dépende de rien. */
const COULEURS = {
  fond: "#f4ede2",
  carte: "#faf7f2",
  sable: "#e9dccb",
  encre: "#2a231e",
  encreDoux: "#5c5148",
  encreDiscret: "#8a7d70",
  terracotta: "#9d5740",
} as const;

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Échappe le contenu saisi par la visiteuse avant de l'insérer dans le HTML.
 *
 * Sans ça, un nom ou un message contenant `<` casserait la mise en page — et
 * une balise fermante bien placée permettrait d'injecter du contenu dans un
 * e-mail signé « Charina Bien-Être ». La version texte, elle, n'a pas ce
 * risque : elle n'interprète rien.
 */
export function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Remet une majuscule au prénom.
 *
 * Le formulaire reprend la saisie telle quelle : « yann », « MARIE »,
 * « marie-claire ». Un premier e-mail qui commence par « Bonjour marie » se
 * remarque, et pas en bien.
 *
 * Une saisie entièrement en majuscules (verrouillage clavier) est ramenée en
 * minuscules avant recapitalisation ; sinon on ne touche qu'aux initiales,
 * pour ne pas abîmer un « McDonald » ni un « d'Arc ».
 */
export function prenomPresentable(nomComplet: string): string {
  const prenom = nomComplet.trim().split(/\s+/)[0] ?? "";
  const base = prenom === prenom.toUpperCase() ? prenom.toLowerCase() : prenom;
  return base.replace(/(^|[-'’])(\p{L})/gu, (_, separateur, lettre: string) =>
    separateur + lettre.toUpperCase(),
  );
}

/** Une ligne du bloc récapitulatif : intitulé discret, valeur lisible. */
export function ligne(intitule: string, valeur: string): string {
  return `
    <tr>
      <td style="padding:0 0 10px;font-family:${SANS};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${COULEURS.encreDiscret};white-space:nowrap;vertical-align:top;">${echapper(intitule)}</td>
      <td style="padding:0 0 10px 20px;font-family:${SANS};font-size:15px;line-height:1.5;color:${COULEURS.encre};vertical-align:top;">${echapper(valeur)}</td>
    </tr>`;
}

/** Paragraphe courant. */
export function paragraphe(texte: string): string {
  return `<p style="margin:0 0 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${COULEURS.encreDoux};">${texte}</p>`;
}

/** Encadré récapitulatif, sur fond sable comme les sections du site. */
export function recapitulatif(lignes: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COULEURS.sable};border-radius:2px;margin:0 0 24px;">
      <tr><td style="padding:22px 24px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0">${lignes}</table>
      </td></tr>
    </table>`;
}

/**
 * Enveloppe commune : fond crème, carte centrée, filet terracotta, signature.
 *
 * `apercu` est la ligne que les messageries affichent à côté de l'objet dans
 * la liste des messages. Sans elle, elles y mettent le début du HTML.
 */
export function gabarit({
  titre,
  apercu,
  contenu,
}: {
  titre: string;
  apercu: string;
  contenu: string;
}): string {
  return `<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${echapper(titre)}</title></head>
<body style="margin:0;padding:0;background-color:${COULEURS.fond};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${echapper(apercu)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${COULEURS.fond};">
    <tr><td align="center" style="padding:32px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background-color:${COULEURS.carte};">
        <tr><td style="padding:40px 32px 32px;">

          <p style="margin:0 0 28px;font-family:${SANS};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COULEURS.terracotta};">${echapper(MARQUE.nom)}</p>

          <h1 style="margin:0 0 8px;font-family:${SERIF};font-size:27px;line-height:1.25;font-weight:400;color:${COULEURS.encre};">${echapper(titre)}</h1>

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="48" style="margin:0 0 26px;"><tr><td style="border-top:1px solid ${COULEURS.terracotta};font-size:0;line-height:0;">&nbsp;</td></tr></table>

          ${contenu}

        </td></tr>

        <tr><td style="padding:0 32px 36px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top:1px solid ${COULEURS.sable};font-size:0;line-height:0;">&nbsp;</td></tr></table>
          <p style="margin:20px 0 0;font-family:${SERIF};font-size:15px;color:${COULEURS.encre};">${echapper(MARQUE.praticienne)}</p>
          <p style="margin:4px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${COULEURS.encreDiscret};">
            ${echapper(ZONE.resume)}<br>
            <a href="tel:${echapper(MARQUE.telephoneLien)}" style="color:${COULEURS.terracotta};text-decoration:none;">${echapper(MARQUE.telephone)}</a>
          </p>
        </td></tr>
      </table>

    </td></tr>
  </table>
</body>
</html>`;
}

export { COULEURS, SANS, SERIF };
