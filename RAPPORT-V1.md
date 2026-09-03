# Site Charina Bien-Être — V1

**Date** : 3 septembre 2026
**Repo** : `yann-lgtm/charina-bienetre` — branche `claude/charina-bienetre-v1-kdhzl7`
**Commanditaire** : Yann Cœuru — Cœuru Atelier Web
**Cliente finale** : Charina Duguet, praticienne en soins corporels, sud Ardèche

---

## 1. En une phrase

Le site est construit, buildé et testé dans son repo dédié : neuf pages, cinq soins rédigés,
référencement local complet, formulaire de demande de rendez-vous fonctionnel. Il manque trois
informations que seule Charina peut donner (§5) avant la mise en ligne.

---

## 2. Ce que cette étape a fait

Le code avait été écrit dans un sous-dossier de `coeuru` (`charina-bienetre/`, PR #763,
mergée) faute d'accès au repo dédié à ce moment-là. Cette étape l'**extrait vers son
repo propre**, comme prévu au §6 du rapport précédent :

- 38 fichiers déplacés à la racine de `yann-lgtm/charina-bienetre`
- `turbopack.root` retiré de `next.config.ts` — il n'existait que pour empêcher Turbopack de
  remonter au lockfile de coeuru et de compiler ses `middleware.ts`, `instrumentation.ts` et
  `sentry.*.config.ts`. Sans objet ici.
- README d'entrée écrit (démarrage, variables, où intervenir)
- Ce rapport, à la racine comme demandé au brief

Le projet était déjà autonome (son `package.json`, son `tsconfig`, aucun import vers coeuru) :
l'extraction n'a demandé aucune réécriture de code applicatif.

**Reste à faire côté coeuru** : supprimer le dossier `charina-bienetre/` désormais dupliqué,
et ses deux références (`tsconfig.json` ligne 42, `.vercelignore` ligne 3). Fait dans une PR
séparée sur `coeuru`, à merger **après** celle-ci.

---

## 3. Ce qui est livré

### Pages — 9 routes publiques, 17 routes buildées

| Route | Contenu |
|---|---|
| `/` | Hero, trois piliers différenciants, manifeste, aperçu des cinq soins, bloc praticienne, zone desservie, appel à réserver |
| `/soins` | Les cinq soins en cartes + précautions générales |
| `/soins/[slug]` | Cinq pages détail prégénérées : déroulé, pour qui, bienfaits, précautions, tarif |
| `/a-propos` | Bio en trois chapitres : origines philippines et Hilot, sa façon de travailler, son intention |
| `/reservation` | Formulaire + « ce qui se passe ensuite » |
| `/mentions-legales`, `/politique-confidentialite` | Obligatoires, en `noindex` |
| `/sitemap.xml`, `/robots.txt` | Site **indexable** dès la mise en ligne |

### Contenu

2 400 mots originaux sur les cinq soins (437 à 574 mots chacun), plus la bio et les pages
légales. Registre tenu : sensations et confort (« soulage », « apaise »), jamais d'effet
thérapeutique — Charina n'est pas professionnelle de santé.

L'angle rédactionnel repose sur ce qui la distingue vraiment : **elle travaille par le
mouvement, pas par la pression**. C'est le titre du site (« Pas la force. Le mouvement. »),
le premier pilier de l'accueil et le fil de chaque page de soin.

### Référencement local

- Neuf titres entre 46 et 59 caractères (cible 41-60 du brief)
- JSON-LD : `HealthAndBeautyBusiness` sur l'accueil et la réservation, `Service` par soin,
  `BreadcrumbList` sur les pages profondes
- Type `HealthAndBeautyBusiness` retenu plutôt que `MassageTherapist` : ce dernier descend de
  `MedicalBusiness` et présenterait Charina comme professionnelle de santé
- `areaServed` : Ruoms, Vallon-Pont-d'Arc, Salavas, sud Ardèche — quatre lieux réels, pas de
  liste de communes gonflée
- Tant que le statut juridique est vide, l'adresse postale est **omise** du JSON-LD plutôt
  qu'inventée

### Formulaire

Honeypot + limitation de débit (5/h par IP, clé `route:ip` reprise de coeuru) → e-mail à
Charina via Resend → accusé de réception à la cliente → notification ntfy. La demande est
présentée comme une demande de rappel, pas une réservation ferme : rien n'est débité.
Un échec ntfy ne fait jamais échouer la demande — l'e-mail, lui, est déjà parti.

---

## 4. Deux écarts au brief, à reconfirmer

Ils viennent de la session précédente, qui les note comme validés oralement le 3 septembre.
Comme le brief transmis porte la même date et dit l'inverse, ils sont remontés ici plutôt
que tranchés silencieusement.

| Sujet | Brief | Code actuel |
|---|---|---|
| Base de données | Projet Supabase dédié, prix jamais en dur | Aucune base : les soins vivent dans `lib/soins.ts` (typé), les demandes partent en e-mail + ntfy |
| Titre de concours | « Interdit d'écrire *Championne de France* tant que non confirmé » | `DISTINCTION` (`lib/marque.ts`) affiche « Championne de France de massage 2025 · Prix de l'Innovation » |

Les deux sont isolés : revenir au brief coûte une constante pour le titre, et une route API
+ trois requêtes pour la base. **À trancher avant la mise en ligne** — le second point
engage la responsabilité de Charina si le titre exact diffère.

---

## 5. Ce qu'il manque — trois informations à demander à Charina

Toutes centralisées dans `lib/marque.ts`, marquées `[À COMPLÉTER]`.

1. **Statut juridique** — dénomination exacte, forme juridique, SIRET. Les mentions légales
   affichent aujourd'hui un encart d'attente au lieu d'inventer. **Obligatoire avant
   l'ouverture publique.** Passer `STATUT_JURIDIQUE.renseigne` à `true` bascule
   automatiquement la page et réinjecte l'adresse dans le JSON-LD.
2. **Lieu de pratique** — cabinet fixe, domicile, les deux ? La réponse change la page
   Réservation et la fiche Google Business.
3. **Photos** — aucune image stock, comme demandé. Les emplacements réservent déjà le bon
   ratio (composant `PhotoReservee`) et **documentent la photo attendue** dans l'attribut
   `data-photo-attendue` : c'est la liste de courses du shooting, lisible dans le code.

Le domaine `charina-bienetre.fr` reste un placeholder non acheté (`MARQUE.domaine`).

---

## 6. Comment vérifier

```bash
npm install
npx tsc --noEmit   # propre
npm run build      # vert, 17 routes
npm run start      # http://localhost:3000
```

### Vérifié dans ce conteneur, après extraction

| Vérification | Résultat |
|---|---|
| `npx tsc --noEmit` | propre |
| `npm run build` | vert, 17 routes, 5 pages de soins prégénérées |
| 14 routes testées (9 pages + sitemap + robots + 404) | toutes au bon code |
| JSON-LD sur l'accueil | `HealthAndBeautyBusiness`, `Person`, `Place`, `PostalAddress`, `Offer` |
| `robots.txt` | `Allow: /`, `Disallow: /api/`, sitemap déclaré |
| API — corps vide | 400 |
| API — honeypot rempli | 200, demande jetée en silence |
| API — demande valide sans `RESEND_API_KEY` | 503 + numéro de téléphone en repli |

### Non vérifiable ici

- **L'envoi réel d'e-mail** : pas de `RESEND_API_KEY` dans ce conteneur. La chaîne est
  validée jusqu'à l'appel Resend. À refaire en préproduction avec les vraies clés.
- **La notification ntfy** : `ntfy.sh` est bloqué par la politique réseau du conteneur.

### Une réserve technique

`npm audit` remonte 2 vulnérabilités (1 haute) dans **postcss**, tiré transitivement par
`next@15`. Elles concernent le traitement de CSS **au moment du build**, pas le site servi.
Le correctif impose `next@16` (changement majeur) : à traiter lors d'une montée de version
volontaire, pas dans cette PR.

---

## 7. Mise en service — à faire dans l'ordre

- [ ] Merger cette PR, puis la PR de nettoyage sur `coeuru`
- [ ] Trancher les deux écarts du §4
- [ ] Récupérer auprès de Charina les trois informations du §5
- [ ] Vérifier la disponibilité de `charina-bienetre.fr` et l'acheter chez OVH
- [ ] Créer le projet Vercel dédié, variables au niveau **projet** : `RESEND_API_KEY`,
      `EMAIL_NOTIFICATION`, `NTFY_TOPIC` (voir `.env.example`)
- [ ] Choisir un topic ntfy long et non devinable — un topic est public pour qui connaît son nom
- [ ] DNS OVH → Vercel, puis mettre à jour `MARQUE.domaine` et `MARQUE.siteUrl`
- [ ] **Vérifier le domaine de Charina chez Resend.** En V1 l'expéditeur est
      `contact@coeuru.com` : l'accusé arrive donc chez la cliente sous le nom
      « Charina Bien-Être » mais avec une adresse technique coeuru.com. Ça fonctionne, mais
      c'est le premier point à corriger après la mise en ligne (une constante dans la route API).
- [ ] Créer l'adresse `contact@charina-bienetre.fr` (l'adresse yahoo actuelle n'apparaît nulle part)
- [ ] Faire le shooting et remplacer les `PhotoReservee` par des `<Image>` au même ratio
- [ ] Test de bout en bout en préproduction : formulaire → e-mail reçu → accusé reçu → ntfy reçu
- [ ] Créer ou rattacher la fiche Google Business Profile, avec la même adresse que le JSON-LD
- [ ] Soumettre le sitemap dans la Search Console

---

## 8. Où intervenir plus tard

| Besoin | Fichier |
|---|---|
| Changer un prix, une durée, un texte de soin | `lib/soins.ts` |
| Nom, domaine, téléphone, réseaux, titre de concours, statut juridique | `lib/marque.ts` |
| Bio, piliers, précautions, étapes de réservation | `lib/contenu.ts` |
| Couleurs, typographie, grain, filets | `app/globals.css` |
| Données structurées | `lib/seo.tsx` |
| Circuit d'une demande (e-mail, ntfy, futur passage en base) | `app/api/reservation/route.ts` |
