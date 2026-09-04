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
function motPresentable(mot: string): string {
  const base = mot === mot.toUpperCase() ? mot.toLowerCase() : mot;
  return base.replace(/(^|[-'’])(\p{L})/gu, (_, separateur, lettre: string) =>
    separateur + lettre.toUpperCase(),
  );
}

/** Nom complet, pour l'objet du message et le corps de la notification. */
export function nomPresentable(nomComplet: string): string {
  return nomComplet.trim().split(/\s+/).map(motPresentable).join(" ");
}

/** Prénom seul, pour la formule d'appel de l'accusé de réception. */
export function prenomPresentable(nomComplet: string): string {
  return motPresentable(nomComplet.trim().split(/\s+/)[0] ?? "");
}

/**
 * Une ligne du bloc récapitulatif : intitulé discret, valeur lisible.
 *
 * Les deux colonnes portent la même hauteur de ligne en pixels. Sans ça,
 * l'intitulé en corps 12 et la valeur en corps 15 alignés par le haut
 * donnaient deux lignes de base décalées, et l'intitulé flottait au-dessus
 * de sa valeur.
 */
export function ligne(intitule: string, valeur: string): string {
  return `
    <tr>
      <td class="intitule" style="padding:0 0 10px;font-family:${SANS};font-size:12px;line-height:22px;letter-spacing:0.08em;text-transform:uppercase;color:${COULEURS.encreDiscret};white-space:nowrap;vertical-align:top;">${echapper(intitule)}</td>
      <td class="valeur" style="padding:0 0 10px 20px;font-family:${SANS};font-size:15px;line-height:22px;color:${COULEURS.encre};vertical-align:top;">${echapper(valeur)}</td>
    </tr>`;
}

/** Paragraphe courant. */
export function paragraphe(texte: string): string {
  return `<p class="texte" style="margin:0 0 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${COULEURS.encreDoux};">${texte}</p>`;
}

/** Encadré récapitulatif, sur fond sable comme les sections du site. */
export function recapitulatif(lignes: string): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="encadre" style="background-color:${COULEURS.sable};border-radius:2px;margin:0 0 24px;">
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
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- Sans ces deux déclarations, Mail sur iOS et macOS applique sa propre
     inversion en mode sombre : le crème vire au brun sale et le terracotta
     se délave. Les annoncer désactive l'inversion et laisse le message tel
     qu'il a été dessiné. -->
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${echapper(titre)}</title>
<style>
  :root { color-scheme: only light; supported-color-schemes: light; }

  /* Outlook (iOS, Android, outlook.com) impose son propre mode sombre et
     ignore les déclarations ci-dessus. Il signale en revanche les éléments
     qu'il a repeints par les attributs data-ogsb (fond) et data-ogsc (texte).
     On les cible pour rétablir la palette. Selon les versions, l'attribut se
     pose sur l'élément lui-même ou sur un ancêtre : les deux formes sont
     écrites. Sans effet sur les autres messageries, qui ne posent jamais ces
     attributs. */
  [data-ogsb] .corps, .corps[data-ogsb] { background-color: ${COULEURS.fond} !important; }
  [data-ogsb] .carte, .carte[data-ogsb] { background-color: ${COULEURS.carte} !important; }
  [data-ogsb] .encadre, .encadre[data-ogsb] { background-color: ${COULEURS.sable} !important; }
  [data-ogsc] .titre, .titre[data-ogsc] { color: ${COULEURS.encre} !important; }
  [data-ogsc] .texte, .texte[data-ogsc] { color: ${COULEURS.encreDoux} !important; }
  [data-ogsc] .valeur, .valeur[data-ogsc] { color: ${COULEURS.encre} !important; }
  [data-ogsc] .intitule, .intitule[data-ogsc] { color: ${COULEURS.encreDiscret} !important; }
  [data-ogsc] .accent, .accent[data-ogsc] { color: ${COULEURS.terracotta} !important; }
</style>
</head>
<body class="corps" style="margin:0;padding:0;background-color:${COULEURS.fond};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${echapper(apercu)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" class="corps" width="100%" style="background-color:${COULEURS.fond};">
    <tr><td align="center" style="padding:32px 16px;">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" class="carte" style="max-width:560px;background-color:${COULEURS.carte};">
        <tr><td style="padding:40px 32px 32px;">

          <p class="accent" style="margin:0 0 28px;font-family:${SANS};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COULEURS.terracotta};">${echapper(MARQUE.nom)}</p>

          <h1 class="titre" style="margin:0 0 8px;font-family:${SERIF};font-size:27px;line-height:1.25;font-weight:400;color:${COULEURS.encre};">${echapper(titre)}</h1>

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
