# Charina Bien-Être — site vitrine

Site de **Charina Duguet**, praticienne en soins corporels à Salavas, en sud Ardèche
(Ruoms, Vallon-Pont-d'Arc, Salavas). Vitrine + référencement local + demande de
rendez-vous. Réalisé par Cœuru Atelier Web.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run verifier   # tsc --noEmit
npm run build
```

Node 20+. Next.js 15 (App Router), TypeScript, Tailwind v4, Motion.

## Variables d'environnement

Voir `.env.example`. Toutes au niveau **projet** sur Vercel.

| Variable | Rôle |
|---|---|
| `RESEND_API_KEY` | Envoi de la demande à Charina + accusé de réception à la cliente |
| `EMAIL_NOTIFICATION` | Destinataire des demandes (repli : `MARQUE.emailContact`) |
| `NTFY_TOPIC` | Notification poussée à chaque demande — nom long et non devinable |
| `NTFY_URL` | Facultatif, uniquement pour un ntfy auto-hébergé |

Sans `RESEND_API_KEY`, le formulaire renvoie un 503 et affiche le numéro de
téléphone en repli plutôt que d'avaler la demande en silence.

## Où intervenir

| Besoin | Fichier |
|---|---|
| Prix, durée, texte d'un soin | `lib/soins.ts` |
| Nom, domaine, téléphone, réseaux, titre de concours, statut juridique | `lib/marque.ts` |
| Bio, piliers, précautions, étapes de réservation | `lib/contenu.ts` |
| Couleurs, typographie, grain, filets | `app/globals.css` |
| Données structurées (JSON-LD) | `lib/seo.tsx` |
| Circuit d'une demande | `app/api/reservation/route.ts` |

## Avant la mise en ligne

Trois informations manquent, toutes marquées `[À COMPLÉTER]` dans `lib/marque.ts` :
statut juridique (SIRET), lieu de pratique, et les photos du shooting.
La checklist complète est dans **`RAPPORT-V1.md`**.

## Structure

```
app/          routes (accueil, soins, à-propos, réservation, légales, sitemap, robots)
components/   composants d'interface, en français
lib/          contenu centralisé, SEO, anti-spam
```

Code, interface et commentaires en français.
