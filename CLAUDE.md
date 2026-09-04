# Charina Bien-Être — consignes de travail

Site vitrine de **Charina Duguet**, praticienne en soins corporels en sud Ardèche.
Réalisé par Cœuru Atelier Web (Yann Cœuru).

**Avant toute chose : lire `RAPPORT-V1.md`.** Il contient l'état réel du site, ce qui a
été livré, et surtout les questions encore ouvertes. Ce fichier-ci ne donne que les
règles ; le rapport donne le contexte.

---

## Langue

**Tout en français, sans exception** : code, noms de fichiers, composants, commentaires,
interface, messages de commit, titres et descriptions de PR, réponses.

---

## Interdits — ils ont tous une histoire

Chacune de ces règles vient d'une erreur réellement commise sur ce projet.

### Aucune biographie inventée

Le site a affiché pendant un temps que Charina était **née aux Philippines** et y avait
appris le Hilot dans sa famille. C'était faux, et ça irriguait cinq fichiers.

Ne jamais écrire sur son parcours, ses origines, sa formation ou sa vie ce qui n'a pas
été confirmé par elle. Parler de l'origine **des techniques** — le Hilot est philippin,
le lomi-lomi hawaïen — jamais de la sienne. Sa biographie définitive reste à écrire avec
ses mots.

### Aucun claim médical ou thérapeutique

Charina **n'est pas professionnelle de santé**. « Soulage les tensions », « apaise »,
« détend » : oui. « Soigne », « traite », « guérit », toute allusion à une pathologie :
non. Le registre est celui de la sensation et du confort, jamais de l'effet
thérapeutique.

### Aucun titre de concours non vérifié

`DISTINCTION` dans `lib/marque.ts` affiche « Championne de France de massage 2025 ».
Le brief initial mentionnait « Médaillée d'Or — Championnat de Massage Occitanie, Prix
Innovation », et les recherches confirment l'existence d'un Championnat Occitanie 2025
mais ne relient Charina à aucun titre national. **L'intitulé exact reste à confirmer
avec elle**, diplôme en main. C'est elle qui porte le titre en cas de contestation.

### Aucun prix en dur dans le code

Durées et tarifs vivent dans `lib/soins.ts`, et nulle part ailleurs.

### Aucune image stock

Les emplacements photo sont tenus par le composant `PhotoReservee`, qui réserve le bon
ratio et **documente la photo attendue** dans son attribut `data-photo-attendue` — c'est
la liste de courses du shooting, lisible dans le code. Les remplacer par de vraies
photos, jamais par des images de banque.

### Aucune mention d'une autre marque

Ni Escales, ni Qiora, ni aucun autre projet de l'atelier. Ce site ne parle que de
Charina. Cela vaut aussi pour l'adresse d'expédition des e-mails.

### Jamais l'infrastructure de coeuru

Ni le projet Supabase `fzcvuxczukzqdylfhaxu`, ni le projet Vercel de coeuru, ni son
Stripe. Ce site a son propre projet Vercel (`charina-bienetre`) et son propre dépôt.

---

## Où intervenir

| Besoin | Fichier |
|---|---|
| Prix, durée, texte d'un soin | `lib/soins.ts` |
| Nom, domaine, téléphone, réseaux, distinction, statut juridique | `lib/marque.ts` |
| Bio, piliers, précautions, étapes de réservation | `lib/contenu.ts` |
| Couleurs, typographie, grain, filets | `app/globals.css` |
| Données structurées (JSON-LD) | `lib/seo.tsx` |
| Circuit d'une demande de rendez-vous | `app/api/reservation/route.ts` |
| Gabarit des e-mails transactionnels | `lib/courriel.ts` |

---

## Deux pièges déjà rencontrés

**Les variables d'environnement vides.** Sur Vercel, une variable créée sans valeur vaut
`""` et non `undefined` : `??` ne la rattrape pas. La fonction `variable()` de
`app/api/reservation/route.ts` centralise la lecture, nettoie les espaces et traite
« vide » comme « absente ». L'utiliser plutôt que `process.env.X` en dur — un accès
littéral peut en outre être figé à la compilation.

**Le mode sombre des messageries.** Les e-mails déclarent `color-scheme: light` pour
Mail d'Apple et portent des surcharges `data-ogsb` / `data-ogsc` pour Outlook. Outlook
mobile impose malgré tout son mode sombre : c'est son choix, ce n'est pas un défaut à
corriger.

---

## Vérifications avant toute PR

```bash
npx tsc --noEmit   # doit être propre
npm run build      # doit être vert
```
