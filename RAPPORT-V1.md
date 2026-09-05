# Site Charina Bien-Être — état des lieux

**Dernière mise à jour : 4 septembre 2026**
**Cliente** : Charina Duguet, praticienne en soins corporels, sud Ardèche
**Réalisation** : Cœuru Atelier Web — Yann Cœuru

> Ce document est le point d'entrée du projet. Les règles de travail sont dans
> `CLAUDE.md`. Les tarifs et le modèle d'abonnement vivent dans le dépôt de l'atelier,
> `yann-lgtm/coeuru-web`, fichier `MODELE-ECONOMIQUE.md`.

---

## 1. Où en est le site

**En ligne, fonctionnel, pas encore public.**

| | |
|---|---|
| Production | https://charina-bienetre.vercel.app |
| Dépôt | `yann-lgtm/charina-bienetre` |
| Projet Vercel | `charina-bienetre`, branche de production `main`, région `cdg1` (Paris) |
| Accès | protégé par l'authentification Vercel — invisible pour Google et pour le public |
| Domaine | `charina-bienetre.fr` **acheté chez OVH le 2026-09-05**, pointe encore sur la page de parking OVH — DNS à basculer vers Vercel |

Le formulaire de demande de rendez-vous a été **testé de bout en bout en production** le
4 septembre : envoi, réception chez Yann, accusé de réception à la cliente, notification
ntfy. Zéro erreur dans les journaux.

### Ce qui est livré

Neuf pages publiques : accueil, vue d'ensemble des soins, cinq pages de soin détaillées,
parcours, demande de rendez-vous, plus les deux pages légales et le sitemap.

Le référencement local est en place : titres calibrés, JSON-LD `HealthAndBeautyBusiness`,
`Service` par soin, `BreadcrumbList`, sitemap et robots. Le type `HealthAndBeautyBusiness`
a été retenu plutôt que `MassageTherapist` : ce dernier descend de `MedicalBusiness` et
présenterait Charina comme professionnelle de santé, ce qu'elle n'est pas.

Les e-mails transactionnels sont habillés à la charte du site (`lib/courriel.ts`), en HTML
avec version texte, contenu échappé, et déclarations de thème clair.

---

## 2. Ce qui a été corrigé, et pourquoi

Ces corrections expliquent des choix de code qui paraîtraient arbitraires sans elles.

| Corrigé | Pourquoi ça comptait |
|---|---|
| **Origine personnelle inventée** | Le site affirmait que Charina était née aux Philippines et y avait appris le Hilot en famille. Faux. Le texte ne parle plus que de l'origine des techniques. |
| **Variable d'environnement vide** | Une variable Vercel sans valeur vaut `""` : `??` ne la rattrape pas, et le destinataire partait vide chez Resend. Fonction `variable()` centralisée. |
| **Prénom en minuscule** | « Bonjour yann » dans le premier e-mail reçu par la cliente. Recapitalisation, y compris dans l'objet et la notification. |
| **Mode sombre des messageries** | Le crème virait au brun. Déclarations `color-scheme` pour Apple, surcharges `data-ogsb`/`data-ogsc` pour Outlook. Outlook mobile résiste : c'est son choix, pas un défaut. |
| **Injection dans les e-mails** | Le champ message, passé en HTML, permettait d'injecter du contenu dans un courrier signé « Charina Bien-Être ». Échappement systématique. |

---

## 3. Ce qui bloque la mise en ligne publique

**Un seul point est bloquant : le statut juridique.**

Sans dénomination, forme juridique et SIRET, les mentions légales ne sont pas conformes
et le site ne peut pas ouvrir au public. Tant que `STATUT_JURIDIQUE.renseigne` vaut
`false`, la page affiche un encart d'attente et l'adresse postale est **omise** du
JSON-LD plutôt qu'inventée. Passer le drapeau à `true` bascule automatiquement les deux.

---

## 4. Questions ouvertes — à trancher avec Charina

### L'adresse du lieu de pratique ⚠️

Trois sources, trois réponses différentes :

| Source | Adresse |
|---|---|
| Le site actuel | Salavas (07150) — c'est ce que dit `ZONE` et ce qui part dans le JSON-LD |
| Son ancien site Wix | 6 place du Général de Gaulle, **Ruoms** (07120) — ancien cabinet médical |
| Sa fiche Fresha | **Salavas** (07150) |

À trancher avec elle : **où reçoit-elle réellement les clientes ?** Y a-t-elle un accès
permanent ou loue-t-elle une salle quelques jours ? Se déplace-t-elle à domicile ?

L'adresse du site, celle de la fiche Google Business et celle des mentions légales
doivent être **identiques au caractère près** — c'est un critère de référencement local.

### Le titre de concours ⚠️

`DISTINCTION` affiche « Championne de France de massage 2025 · Prix de l'Innovation ».
Le brief initial mentionnait « Médaillée d'Or — Championnat de Massage **Occitanie**,
Prix Innovation ». Les recherches confirment l'existence d'un Championnat Occitanie 2025
(première édition, 29-30 novembre 2025 à Pérols) mais ne relient Charina à aucun titre
national. **L'intitulé exact est à confirmer, diplôme en main.**

### Sa biographie

À réécrire avec ses mots : où elle a appris, ce qui l'a menée au massage. Le texte actuel
est volontairement neutre depuis le retrait de l'origine inventée.

### Les photos

Trois questions distinctes, et la troisième est celle qu'on oublie :
qui les a prises et détient les droits · a-t-elle les fichiers originaux · les personnes
massées ont-elles consenti à une **nouvelle** publication ?

### La fiche Google Business

Aucune fiche trouvée pour Charina Bien-Être. Le pack local — les trois établissements
affichés sur la carte — pèse souvent plus que tout le reste en recherche locale, et il
est gratuit. À créer ou à reprendre en main, avec l'adresse tranchée ci-dessus.

---

## 5. Paysage concurrentiel

Relevé le 4 septembre 2026. C'est la base de tout travail de référencement futur, et
c'est l'argument commercial le plus solide qui existe : pas de la théorie, des voisines
positionnées là où Charina est absente.

| Concurrente | Ce qu'elle a |
|---|---|
| [Harmonie de l'Écho](https://www.harmoniedelecho.fr/massage-ruoms) — Chauzon, à côté de Ruoms | Un domaine à son nom, et **une page entièrement dédiée au massage à Ruoms** |
| [L'instant d'ailleurs](https://www.massagesruoms.com/) | Un nom de domaine qui **est** la requête |

Charina, elle, est présente sur [Fresha](https://www.fresha.com/fr/lvp/charina-bien-etre-salavas-vwvPeo)
— fiche à Salavas 07150 avec son numéro — et sur un sous-domaine `wixsite.com` de deux
pages. Aucune fiche Google Business trouvée.

**Ce que ça dit de la stratégie** : la requête « massage Ruoms » est déjà tenue par deux
sites structurés. Le terrain le moins disputé est celui des soins spécifiques — massage
sportif, ventouses, drainage lymphatique — croisés avec les communes du secteur. C'est
exactement ce que permet le découpage en une page par soin.

---

## 6. Mise en service — dans l'ordre

- [ ] Obtenir le statut juridique et le SIRET, passer `STATUT_JURIDIQUE.renseigne` à `true`
- [ ] Trancher l'adresse, l'aligner partout
- [ ] Confirmer l'intitulé de la distinction, corriger `DISTINCTION` si besoin
- [x] ~~Acheter `charina-bienetre.fr` chez OVH~~ — fait le 2026-09-05
- [ ] Ajouter le domaine au projet Vercel `charina-bienetre`, puis chez OVH remplacer l'enregistrement A `@` par `76.76.21.21` et le CNAME `www` par la valeur affichée par Vercel. Une fois le certificat délivré, basculer `MARQUE.siteUrl` sur `https://charina-bienetre.fr`
- [ ] Créer la boîte `contact@charina-bienetre.fr` chez OVH (MX Plan, inclus avec un .fr) — sans elle, `MARQUE.emailContact` annonce une adresse qui ne reçoit rien
- [ ] Créer l'adresse `contact@charina-bienetre.fr` — l'adresse yahoo actuelle n'apparaît nulle part
- [ ] Vérifier le domaine chez Resend, puis basculer `EXPEDITEUR` dans `app/api/reservation/route.ts` : en V1 l'expéditeur est `contact@coeuru.com`, seul domaine vérifié
- [ ] Shooting photo, remplacer les `PhotoReservee` au même ratio
- [ ] Créer ou rattacher la fiche Google Business
- [ ] Retirer la protection Vercel le jour de l'ouverture publique
- [ ] Soumettre le sitemap dans la Search Console

---

## 7. Comment vérifier

```bash
npm install
npx tsc --noEmit   # propre
npm run build      # vert, 17 routes
npm run start      # http://localhost:3000
```

**Pour capturer le site** : les animations au défilement laissent les pages vides en
capture headless. Passer `--force-prefers-reduced-motion` à Chromium. Et pour une vraie
capture mobile, `--window-size` ne suffit pas : il faut l'émulation par le protocole de
débogage (`Emulation.setDeviceMetricsOverride`), sinon le rendu est tronqué à droite et
fait croire à un débordement. Il n'y en a pas — vérifié, `scrollWidth` = 390 à 390 px.

---

## 8. Réserve technique

`npm audit` remonte deux vulnérabilités, dont une haute, dans **postcss**, tiré
transitivement par `next@15`. Elles concernent le traitement du CSS **au moment du
build**, pas le site servi. Le correctif impose `next@16`, changement majeur : à traiter
lors d'une montée de version volontaire.
