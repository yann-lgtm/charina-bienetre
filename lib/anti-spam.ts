/**
 * Honeypot + limitation de débit, repris du pattern éprouvé sur coeuru.
 *
 * L’état vit en mémoire de l’instance : il se remet à zéro à chaque
 * redéploiement et n’est pas partagé entre régions. C’est assumé pour un site
 * à ce volume — l’objectif est d’arrêter les robots, pas de tenir un quota.
 */

export function honeypotDeclenche(honeypot: unknown): boolean {
  return typeof honeypot === "string" && honeypot.trim().length > 0;
}

export function ipDuClient(requete: Request): string {
  const transmis = requete.headers.get("x-forwarded-for");
  if (transmis) return transmis.split(",")[0].trim();
  return requete.headers.get("x-real-ip") ?? "inconnue";
}

type Seau = { compte: number; expireA: number };
const seaux = new Map<string, Seau>();

const FENETRE_MS = 60 * 60 * 1000; // une heure
const MAX_PAR_DEFAUT = 5;

/** Clé `route:ip`, comme sur coeuru : une route saturée n’en bloque pas une autre. */
export function verifierDebit(
  ip: string,
  route: string,
  max: number = MAX_PAR_DEFAUT,
): { ok: boolean; reessayerDans?: number } {
  const maintenant = Date.now();
  const cle = `${route}:${ip}`;
  const existant = seaux.get(cle);

  if (!existant || existant.expireA < maintenant) {
    seaux.set(cle, { compte: 1, expireA: maintenant + FENETRE_MS });
    return { ok: true };
  }

  if (existant.compte >= max) {
    return {
      ok: false,
      reessayerDans: Math.ceil((existant.expireA - maintenant) / 1000),
    };
  }

  existant.compte += 1;
  return { ok: true };
}
