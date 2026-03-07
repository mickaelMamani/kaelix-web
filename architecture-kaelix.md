# KAELIX — Architecture du Site

**"Crafted Code, Proven Performance"**
Site Vitrine + Espace Client

---

> Document confidentiel — Version 2.0 — Mars 2026

---

## 1. Vision Globale

Le site Kaelix se compose de deux espaces distincts avec des objectifs complémentaires : un **site public** (vitrine) qui attire et convertit les prospects, et un **espace client** (portail authentifié) qui fidélise et centralise la relation client.

### 1.1 Positionnement de Marque

**Mission :** Démocratiser le développement web sur-mesure en rendant accessible aux TPE/PME/startups la qualité et la performance habituellement réservées aux grandes entreprises.

**Vision :** Devenir la référence du développement "from scratch" en France, reconnu pour transformer les sites web en véritables outils de croissance.

**Proposition de valeur unique (UVP) :**
> "Des sites web codés à la main, 3x plus rapides, 2x moins chers à maintenir que WordPress"

**Avantages concurrentiels à mettre en avant sur le site :**
- Performance garantie : Score PageSpeed > 90/100
- Coût total réduit : Pas de licences, plugins ou mises à jour payantes
- Sécurité maximale : Code propriétaire sans failles connues
- Évolutivité infinie : Architecture pensée pour grandir avec l'entreprise
- SEO natif : Optimisation technique dès la conception
- **Modèle économique par abonnement** : accessible sans frais d'entrée

### 1.2 Identité Visuelle

| Élément | Valeur | Signification |
|---------|--------|---------------|
| Nom | **Kaelix** | Sonorité moderne, technique, mémorisable |
| Tagline | *"Crafted Code, Proven Performance"* | Savoir-faire artisanal + résultats mesurables |
| Typographie | Inter / Space Grotesk | Sans-serif moderne, technique, lisible |
| Noir profond | `#0A0A0A` | Expertise, premium |
| Blanc pur | `#FFFFFF` | Clarté, simplicité |
| Bleu électrique | `#0066FF` | Innovation, confiance |
| Vert succès | `#00D46A` | Performance, résultats |

**Concept visuel :** Minimaliste, évoquant la précision du code. Le site Kaelix est lui-même la vitrine du savoir-faire technique de l'agence (dogfooding).

### 1.3 Ton de Voix

**Personnalité de marque :** Expert, Accessible, Transparent, Orienté résultats.

| Cible | Messages clés |
|-------|---------------|
| **TPE/PME** | "Un site professionnel sans abonnements cachés" — "Votre site, votre propriété, votre code" — "80 €/mois, tout compris, sans surprise" |
| **Startups** | "Scale sans refonte technique" — "Architecture prête pour votre série A" — "Performance = conversions = croissance" |

> Le ton sur le site doit être **technique mais jamais jargonnant** : on explique pourquoi le from scratch est supérieur avec des preuves mesurables (scores, temps de chargement, conversions), pas avec du discours marketing creux.

### 1.4 Offre Tarifaire

| Offre | Prix | Détail |
|-------|------|--------|
| **Site Vitrine** | **80 € HT / mois** | Conception sur mesure, hébergement, support, petites mises à jour incluses. Aucun frais d'entrée. |
| **SEO Régulier** | **50 € HT / mois** | Optimisation continue, suivi des positions, ajustements techniques et contenus. |
| **E-commerce / SaaS** | **Sur devis** | Étude personnalisée selon la complexité, le volume et les fonctionnalités requises. |

> Le modèle sans frais d'entrée à 80 €/mois est le levier commercial principal. Il élimine la barrière à l'entrée pour les TPE/PME et garantit un revenu récurrent pour Kaelix. Le site public doit mettre ce tarif en avant de manière très visible.

### 1.5 Stack Technique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Frontend | Next.js 14+ (App Router) | SSR/SSG, routing, performance |
| Styling | Tailwind CSS | Utility-first CSS, responsive design |
| UI Components | shadcn/ui | Bibliothèque de composants accessible et personnalisable |
| Typage | TypeScript | Sécurité du code, DX |
| Backend / BDD | Supabase (PostgreSQL) | Auth, database, storage, realtime |
| Paiements | Stripe | Facturation, paiement sécurisé |
| Messaging | Microsoft Teams (Webhooks) | Support client pass-through |
| Déploiement | Vercel | CI/CD, edge network, analytics |

---

## 2. Sitemap Complet

### 2.1 Site Public (Vitrine)

Le site public a pour mission de convertir les visiteurs en leads qualifiés. L'architecture est conçue autour de trois piliers : **pages de conversion** (transformer), **pages piliers SEO** (attirer), et **pages locales/sectorielles** (cibler).

#### Pages principales

| Route | Page | Objectif |
|-------|------|----------|
| `/` | Accueil (Homepage) | Hero + UVP + pricing + preuves sociales + CTA |
| `/services` | Nos Services | Détail des offres : vitrine, e-commerce, SaaS, refonte |
| `/services/[slug]` | Détail Service | Page dédiée par service (SEO long-tail) |
| `/tarifs` | Tarifs | Grille tarifaire détaillée + comparateur + FAQ prix |
| `/realisations` | Portfolio | Showcases projets avec métriques de performance |
| `/realisations/[slug]` | Étude de Cas | Détail projet : brief, solution, résultats |
| `/a-propos` | À Propos | Storytelling agence, équipe, valeurs, méthodologie |
| `/blog` | Blog | Articles SEO, guides, actualités tech |
| `/blog/[slug]` | Article | Contenu long-form optimisé SEO |

#### Pages de conversion

| Route | Page | Objectif |
|-------|------|----------|
| `/contact` | Contact / Devis | Formulaire de contact + estimateur de projet |
| `/audit-gratuit` | Audit Gratuit | Formulaire qualifiant — lead magnet principal |
| `/process` | Notre Process | Transparence totale sur les étapes de collaboration |
| `/garanties` | Nos Garanties | Réassurance : performance, satisfaction, propriété du code |

#### Pages piliers SEO (cornerstone content)

Pages de contenu long-form optimisées pour des requêtes à fort volume, servant de hubs de maillage interne.

| Route | Cible SEO | Rôle |
|-------|-----------|------|
| `/developpement-site-sur-mesure` | développement site sur mesure | Pilier principal — explique le from scratch |
| `/alternative-wordpress-performance` | alternative wordpress | Comparatif CMS vs custom, preuves techniques |
| `/agence-web-tpe-pme` | agence web tpe pme | Ciblage cœur de marché |
| `/creation-site-ecommerce-sans-cms` | site ecommerce sans cms | Niche e-commerce from scratch |
| `/refonte-site-web-performance` | refonte site web | Capture des insatisfaits WordPress/Wix |

#### Pages locales (SEO local)

Pages géolocalisées pour capter le trafic de recherche locale. Structure dynamique via `[ville]`.

| Route | Exemples | Cible SEO |
|-------|----------|-----------|
| `/agence-web-[ville]` | agence-web-montpellier, agence-web-paris | agence web + ville |
| `/developpeur-site-internet-[ville]` | developpeur-site-internet-lyon | développeur site internet + ville |
| `/creation-site-web-[ville]` | creation-site-web-marseille | création site web + ville |

> Ces pages sont générées dynamiquement avec du contenu unique par ville (pas de duplicate content). Elles incluent des références locales, des témoignages clients de la zone, et des données GMB.

#### Pages sectorielles

Pages ciblant des secteurs d'activité spécifiques pour un SEO ultra-qualifié.

| Route | Cible SEO |
|-------|-----------|
| `/site-web-restaurant` | site web restaurant |
| `/site-ecommerce-mode` | site ecommerce mode |
| `/site-vitrine-artisan` | site vitrine artisan |
| `/plateforme-saas-startup` | plateforme saas startup |

> Chaque page sectorielle contient : les problématiques spécifiques du secteur, une réalisation associée, des fonctionnalités adaptées, et un CTA contextualisé.

#### Pages légales

| Route | Page |
|-------|------|
| `/mentions-legales` | Mentions Légales |
| `/politique-confidentialite` | Politique de confidentialité |
| `/cgv` | Conditions générales de vente |

### 2.2 Espace Client (Portail)

L'espace client est accessible après authentification. Il centralise le suivi de projets, la facturation et la communication avec l'équipe Kaelix.

| Route | Page | Description |
|-------|------|-------------|
| `/auth/login` | Connexion | Email + mot de passe, OAuth Google |
| `/auth/register` | Inscription | Création de compte (sur invitation) |
| `/auth/forgot-password` | Mot de passe oublié | Réinitialisation par email |
| `/dashboard` | Tableau de Bord | Vue d'ensemble : projets actifs, factures, activité |
| `/projects` | Mes Projets | Liste de tous les projets du client |
| `/projects/[id]` | Détail Projet | Progression, livrables, équipe, timeline |
| `/billing` | Facturation | Liste factures + méthodes de paiement Stripe |
| `/billing/[id]` | Détail Facture | Facture complète + actions (payer, PDF) |
| `/billing/[id]/pay` | Paiement | Checkout Stripe sécurisé |
| `/profile` | Mon Profil | Infos personnelles, sécurité, notifications |
| `/support` | Support | Interface messaging Microsoft Teams |

---

## 3. Site Public — Détail des Pages

### 3.1 Homepage

La homepage est la page la plus stratégique. Elle doit convaincre en moins de 5 secondes et guider le visiteur vers une demande de devis. Le **prix de 80 €/mois sans engagement** doit être visible dès le hero ou juste en dessous.

**Structure de la page :**

- **Hero Section** : Headline percutant reprenant l'UVP ("Des sites 3x plus rapides, codés à la main") + sous-titre + prix d'appel "À partir de 80 €/mois, sans frais d'entrée" + CTA principal ("Audit gratuit") + CTA secondaire ("Voir nos réalisations")
- **Bandeau de confiance** : Logos clients + métriques clés (PageSpeed 95+, temps de chargement <1s, 0 faille de sécurité, 100% propriété du code)
- **Section Problème/Solution** : "Pourquoi votre site WordPress ralentit votre croissance" — comparatif visuel From scratch vs CMS (vitesse, sécurité, coût sur 3 ans, SEO)
- **Section Pricing** : Les 3 offres en cartes (Vitrine 80 €, SEO 50 €, E-commerce/SaaS sur devis) avec détail des inclusions et CTA vers `/tarifs`
- **Services en bref** : 3-4 cartes avec icônes, titre, description courte, lien vers page détaillée
- **Showcases** : 2-3 réalisations phares avec captures, métriques avant/après, témoignage client
- **Section processus** : Les 4 étapes (Découverte → Design → Développement → Lancement) avec timeline visuelle, lien vers `/process`
- **Social proof** : Témoignages clients (carousel ou grille) avec photo, nom, entreprise, résultat chiffré
- **FAQ** : Questions fréquentes (accordéon) — inclut les objections courantes : "Pourquoi pas WordPress ?", "Que comprend le 80 €/mois ?", "Et si je veux changer d'agence ?", "Combien de temps pour un site ?"
- **CTA final** : Bloc de conversion avec formulaire simplifié d'audit gratuit ou bouton devis

### 3.2 Page Tarifs (`/tarifs`)

Page dédiée à la grille tarifaire — essentielle pour la transparence et le SEO (requête "prix création site web").

**Carte Vitrine — 80 € HT/mois :**
- Conception et design sur mesure
- Développement from scratch (Next.js)
- Hébergement et nom de domaine
- Certificat SSL
- Support technique prioritaire
- Petites mises à jour incluses (textes, images)
- Performance Lighthouse 95+
- Responsive design (mobile, tablette, desktop)
- SEO technique de base inclus
- Aucun frais d'entrée, sans engagement longue durée
- Propriété totale du code source

**Carte SEO — 50 € HT/mois :**
- Audit SEO initial
- Optimisation technique continue
- Suivi des positions sur les mots-clés cibles
- Rapports mensuels de performance
- Ajustements contenus et balises
- Google My Business (si activité locale)
- Cumulable avec l'offre Vitrine

**Carte E-commerce / SaaS — Sur devis :**
- Étude personnalisée
- Architecture sur mesure
- Fonctionnalités avancées (paiement, gestion stock, dashboard…)
- Devis gratuit sous 48h

**Comparateur visuel** : Tableau "Kaelix 80 €/mois vs WordPress tout compris" montrant le coût total sur 1 an, 2 ans, 3 ans (hébergement + thème + plugins + maintenance + sécurité) pour démontrer l'avantage économique du modèle Kaelix.

**Section FAQ Prix** : Que comprend le 80 €/mois ? Y a-t-il un engagement ? Que se passe-t-il si je résilie ? Comment fonctionne le SEO à 50 €/mois ? Le code m'appartient-il ? Puis-je faire évoluer mon site plus tard ? Etc.

### 3.3 Page Services (`/services`)

Page mère listant tous les services, avec des pages enfants dédiées pour chaque service (SEO long-tail).

| Service | Slug | Cible SEO |
|---------|------|-----------|
| Site Vitrine | `/services/site-vitrine` | création site vitrine professionnel |
| Site E-commerce | `/services/site-ecommerce` | développement boutique en ligne sur mesure |
| Application Web / SaaS | `/services/application-web` | développement application web custom |
| Refonte de Site | `/services/refonte-site` | refonte site internet moderne performant |
| SEO & Performance | `/services/seo-performance` | optimisation SEO technique site web |
| Maintenance & Support | `/services/maintenance` | maintenance site web professionnel |

**Structure de chaque page service :**
- Hero avec titre, sous-titre orienté bénéfice, et illustration/capture
- Section problème : "Ce que vous vivez aujourd'hui" (empathie)
- Section solution : "Ce que Kaelix fait différemment" (avantage from scratch)
- Fonctionnalités incluses (checklist visuelle)
- Réalisation associée avec métriques (preuve)
- Tarif applicable (80 €/mois pour vitrine, sur devis pour le reste)
- Témoignage client du même secteur
- CTA vers audit gratuit ou devis

### 3.4 Pages de Conversion

#### Audit Gratuit (`/audit-gratuit`)

Lead magnet principal et porte d'entrée du funnel de conversion. C'est la page la plus poussée vers l'outbound (LinkedIn, email).

**Formulaire qualifiant :**
- Nom, Prénom
- Email professionnel
- URL du site actuel (obligatoire)
- Secteur d'activité (select)
- Objectif principal : plus de trafic / plus de conversions / refonte visuelle / lancement (select)
- Taille d'entreprise (select)

**Promesse affichée :** "Recevez sous 48h un rapport complet : score de performance, comparaison avec vos concurrents, et 3 quick wins gratuits pour améliorer votre site."

**Post-soumission :** page de remerciement avec estimation de délai + lien vers un article pertinent + CTA "Planifier un appel découverte".

> L'audit est réalisé manuellement par Kaelix (analyse PageSpeed, SEO, sécurité, UX). Le rapport est envoyé par email au format PDF. C'est le prétexte idéal pour recontacter le prospect.

#### Notre Process (`/process`)

Transparence totale sur les étapes de collaboration. Rassure les prospects hésitants.

**Les 5 étapes :**
1. **Découverte** (gratuit) : Appel de 30 min, compréhension des besoins, audit du site actuel
2. **Proposition** : Devis détaillé sous 48h, maquettes wireframe, planning prévisionnel
3. **Design** : Maquettes graphiques, itérations illimitées jusqu'à validation
4. **Développement** : Code from scratch, accès à l'espace client pour suivre la progression
5. **Lancement** : Tests, mise en production, formation, suivi post-lancement inclus

Chaque étape avec : durée estimée, livrables concrets, ce que le client doit fournir.

#### Nos Garanties (`/garanties`)

Page de réassurance qui lève les dernières objections.

- **Garantie performance** : Score PageSpeed > 90/100 ou on refait gratuitement
- **Propriété du code** : Le code source vous appartient à 100%, même si vous quittez Kaelix
- **Pas de frais cachés** : 80 €/mois tout compris, pas de surcoût surprise
- **Support réactif** : Réponse sous 24h, support technique inclus
- **Satisfaction** : Si le site ne correspond pas au brief validé, on corrige sans frais supplémentaire
- **Transparence** : Accès au suivi en temps réel dans l'espace client

### 3.5 Portfolio / Réalisations (`/realisations`)

Vitrine des projets livrés. C'est la preuve sociale la plus puissante.

**Page liste :** Grille de projets filtrables par type (vitrine, e-commerce, SaaS, refonte) avec captures, nom du client, secteur, et score de performance.

**Page étude de cas (`/realisations/[slug]`) :**
- Le brief client : problème initial, objectifs
- La solution technique : choix d'architecture, technologies
- Captures avant/après (si refonte)
- Métriques de performance : score Lighthouse, temps de chargement, Core Web Vitals
- Résultats business : trafic, conversions, chiffre d'affaires (si autorisé)
- Témoignage client avec photo, nom, entreprise
- CTA : "Vous voulez les mêmes résultats ?"

### 3.6 Page Contact / Devis (`/contact`)

Page de conversion directe avec deux zones complémentaires :

- **Formulaire intelligent** : Nom, email, téléphone, type de projet (select), description du besoin, URL site actuel (optionnel), comment nous avez-vous connu ? (select)
- **Informations de contact directes** : Email, téléphone, adresse, liens réseaux sociaux, horaires de réponse
- **FAQ rapide** sur le processus de collaboration + lien vers `/process`

### 3.7 À Propos (`/a-propos`)

Storytelling de l'agence, humain et technique.

- L'histoire de Kaelix : pourquoi le from scratch, quelle vision
- L'équipe : portraits, compétences, rôles
- Les valeurs : performance, transparence, accessibilité, artisanat du code
- La méthodologie : process de travail résumé (lien vers `/process`)
- Chiffres clés : nombre de projets, score moyen Lighthouse, satisfaction client

### 3.8 Blog (`/blog`)

Le blog est le pilier de la stratégie SEO organique à 0€. Il cible des mots-clés informationnels pour attirer du trafic qualifié et démontrer l'expertise technique.

**Catégories :**
- Guides techniques
- Tendances web
- Études de cas
- Conseils SEO/Performance
- Comparatifs (WordPress vs custom, etc.)

**Planning éditorial (cf. stratégie marketing) :**

| Période | Focus | Exemples d'articles |
|---------|-------|---------------------|
| Mois 1 | Fondations | "Pourquoi votre site WordPress ralentit votre croissance", "From Scratch vs CMS : le vrai coût sur 3 ans", "Guide : Mesurer la performance réelle de votre site" |
| Mois 2 | Éducation technique | "Core Web Vitals : l'impact sur votre SEO", "Sécurité web : les failles WordPress qui vous menacent", "Combien coûte vraiment un site sur-mesure ?" |
| Mois 3 | Conversion | Cas clients détaillés avec métriques, comparatifs techniques avec preuves, calculateurs ROI |

> Objectif : 3 articles/semaine en phase de lancement, puis 2-4 articles/mois en rythme de croisière. Chaque article est maillé vers les pages piliers et les pages de service.

### 3.9 Pages Piliers SEO

Pages de contenu long-form (2000-3000 mots) optimisées pour des requêtes à fort volume. Elles servent de hubs de maillage interne et redirigent vers les pages de service et les articles de blog.

**`/developpement-site-sur-mesure`** — Pilier principal
- Qu'est-ce que le développement sur mesure ?
- Avantages vs CMS (performance, sécurité, SEO, évolutivité)
- Pour qui c'est pertinent ?
- Combien ça coûte ? (lien vers `/tarifs`)
- Exemples concrets (liens vers `/realisations`)

**`/alternative-wordpress-performance`** — Page d'attaque directe
- Les limites de WordPress en 2026 (preuves, benchmarks)
- Ce que le from scratch change (comparatif technique)
- Étude de cas : migration WordPress → custom
- CTA vers audit gratuit

**`/agence-web-tpe-pme`** — Ciblage cœur de marché
- Pourquoi les TPE/PME méritent un vrai site
- Le modèle 80 €/mois expliqué
- Témoignages TPE/PME
- CTA vers audit gratuit

**`/creation-site-ecommerce-sans-cms`** — Niche e-commerce
- Limites de Shopify/WooCommerce à grande échelle
- Avantages d'un e-commerce custom (performance, conversion)
- Stack recommandée
- CTA vers devis

**`/refonte-site-web-performance`** — Capture des insatisfaits
- Signes qu'il est temps de refondre
- Le process de refonte Kaelix
- Avant/après avec métriques
- CTA vers audit gratuit

### 3.10 Pages Locales

Pages géolocalisées ciblant les recherches "agence web + ville". Contenu unique par ville pour éviter le duplicate content.

**Structure type (ex: `/agence-web-montpellier`) :**
- Titre H1 : "Agence Web à Montpellier — Sites sur mesure, codés à la main"
- Introduction contextualisée (tissu économique local, besoins spécifiques)
- Services proposés dans la zone
- Réalisations locales (si disponibles)
- Témoignages de clients de la zone
- Informations pratiques (bureau si applicable, zones d'intervention)
- Structured Data : LocalBusiness
- CTA vers audit gratuit

**Villes prioritaires (à adapter selon la stratégie commerciale) :**
Montpellier, Paris, Lyon, Marseille, Toulouse, Bordeaux, Nantes, Lille

### 3.11 Pages Sectorielles

Pages ciblant des secteurs d'activité spécifiques.

**Structure type (ex: `/site-web-restaurant`) :**
- Titre H1 : "Création de Site Web pour Restaurant — Réservation, Menu, Performance"
- Problématiques spécifiques du secteur
- Fonctionnalités adaptées (réservation en ligne, carte interactive, etc.)
- Réalisation associée avec résultats
- Tarif applicable + CTA
- FAQ sectorielle

**Secteurs prioritaires :**
- Restaurant / Restauration (`/site-web-restaurant`)
- E-commerce Mode (`/site-ecommerce-mode`)
- Artisans (`/site-vitrine-artisan`)
- Startup SaaS (`/plateforme-saas-startup`)

---

## 4. Espace Client — Architecture Simplifiée

> **Simplifications par rapport à la doc existante :**
> - Dashboard : projets actifs sans comparatifs / évolutions statistiques
> - Support : pas de stockage de messages — pass-through Microsoft Teams via webhooks
> - Facturation : flow Stripe complet conservé (paiement en ligne + gestion cartes)
> - Profil : inchangé (infos, sécurité, notifications)

### 4.1 Dashboard

Page d'accueil du portail offrant une vue d'ensemble rapide. L'objectif est de donner au client une photo instantanée de sa situation sans surcharge d'information.

**Composants du Dashboard :**

| Composant | Contenu | Données |
|-----------|---------|---------|
| Message de bienvenue | "Bonjour, [Prénom]" | user_metadata.full_name |
| Widget Projets Actifs | Nombre de projets en cours (sans comparatif) | COUNT projets status=actif |
| Widget Progression | % moyen d'avancement (sans évolution) | AVG progression projets |
| Widget Factures | Nombre de factures en attente + échéance proche | Factures status=pending |
| Liste Projets en Cours | Cartes : nom, type, échéance, statut, barre de progression | Projets du client |
| Activité Récente | 4 derniers événements (validation, upload, facture) | Events log |
| Actions Rapides | Boutons : Contacter le support, Mes fichiers, Facturation | Liens internes |

> **Décision : Widget Messages supprimé.** Le widget "Messages Non Lus" de la doc originale est retiré du dashboard. Le support se fait via Microsoft Teams en pass-through : Kaelix ne stocke aucun message. Le bouton "Contacter le support" dans les actions rapides redirige vers l'interface Teams.

### 4.2 Projets

Page de suivi détaillé des projets du client. Un client typique aura **1 à 3 projets** (son site vitrine, éventuellement un service SEO, ou une refonte). L'affichage est donc pensé pour un petit nombre de projets, avec un format qui valorise chaque projet individuellement.

**Format d'affichage : Liste verticale en cartes pleine largeur (stack)**

Plutôt qu'une grille multi-colonnes (adaptée aux longues listes), chaque projet occupe une carte horizontale pleine largeur qui offre plus d'espace pour afficher les informations sans clic supplémentaire.

**Carte Projet (pleine largeur) :**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  🟢 En développement                               Échéance 15/04  │
│                                                                     │
│  Site Vitrine — Restaurant Le Provençal                             │
│  Création d'un site vitrine moderne avec réservation en ligne       │
│                                                                     │
│  ████████████████████░░░░░░░░  65%                                  │
│                                                                     │
│  Type: Site Vitrine    Budget: 80 €/mois    Équipe: 2 membres      │
│                                                                     │
│                                          [ Voir détails ]           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Avantages de ce format :**
- Lecture naturelle de haut en bas, pas de scan horizontal
- Plus d'espace pour les barres de progression et les détails
- Chaque projet a une présence visuelle forte (important quand il n'y en a que 1 à 3)
- Meilleur rendu mobile (pas de passage de 2 colonnes à 1)
- Possibilité d'afficher un mini-résumé des prochaines étapes directement dans la carte

**Détail Projet (modale ou page dédiée) :**

- **Onglet Vue d'ensemble** : type, budget/abonnement, dates de début et échéance, équipe assignée (avatars + rôles), progression détaillée
- **Onglet Livrables** : liste des livrables avec statut (Terminé ✅, En cours 🔵, À venir ⚪) et dates

**Section Aide** : carte en bas de page avec deux actions — "Contacter le support" (ouvre Teams) et "Planifier un appel" (lien Calendly ou similaire).

**État vide** : message central + CTA "Demander un devis".

### 4.3 Facturation

Interface complète de gestion financière avec intégration Stripe. Le flow de paiement complet est conservé.

**Synthèse Financière (4 widgets) :**
- **Montant Dû** : total factures impayées + alerte retards
- **Total Payé** : cumul de l'année en cours
- **Factures en Attente** : nombre de factures à régler
- **Méthodes de Paiement** : nombre de cartes enregistrées

**Onglets :**

| Onglet | Contenu | Actions |
|--------|---------|---------|
| Factures | Tableau : n°, projet, montant, statut, échéance | Voir détail, Télécharger PDF, Payer |
| Méthodes de Paiement | Liste cartes : type, numéro masqué, expiration | Définir par défaut, Supprimer, Ajouter |
| Historique | Liste des paiements effectués (V2) | À venir |

**Flow de Paiement Stripe :**

1. Client clique "Payer maintenant" sur une facture
2. Redirection vers page de paiement dédiée (`/billing/[id]/pay`)
3. Formulaire Stripe Elements : numéro carte, expiration, CVC, code postal
4. Résumé latéral : n° facture, projet, montant, échéance
5. Traitement sécurisé (3D Secure, PCI-DSS via Stripe)
6. Confirmation + redirection automatique vers le détail facture (statut mis à jour)
7. Email de confirmation envoyé automatiquement

### 4.4 Support — Intégration Microsoft Teams

Le système de support fonctionne en pass-through : le site Kaelix ne stocke aucun message. Les messages du client transitent via des webhooks Microsoft Teams vers les canaux internes de l'équipe.

**Architecture Technique :**

| Étape | Action | Détail Technique |
|-------|--------|------------------|
| 1 | Le client écrit un message dans le portail | Formulaire : sujet, projet concerné, message, pièces jointes (optionnel) |
| 2 | Le message est envoyé à l'API Next.js | Route API : `POST /api/support/send` |
| 3 | L'API transmet à Teams via Incoming Webhook | HTTP POST vers l'URL du webhook Teams avec payload Adaptive Card |
| 4 | L'équipe reçoit le message dans le canal Teams dédié | Canal : #support-clients ou canal par projet |
| 5 | L'équipe répond directement dans Teams | Le client reçoit la réponse par email (via Power Automate) |

**Interface Client :**
- Page `/support` avec formulaire d'envoi de message
- Champs : Sujet (select : question technique, facturation, autre), Projet concerné (select), Message (textarea), Pièces jointes (optionnel)
- Confirmation visuelle après envoi : "Votre message a été transmis à l'équipe. Vous recevrez une réponse par email sous 24h."
- Pas d'historique local — le client est informé que les échanges se font via email/Teams
- Alternative : lien "Planifier un appel" (Calendly) pour les demandes urgentes

> **Configuration Teams requise :**
> 1. Créer un canal dédié dans Teams (ex: #support-clients)
> 2. Configurer un Incoming Webhook sur ce canal
> 3. Stocker l'URL du webhook dans les variables d'environnement Vercel
> 4. (Optionnel) Power Automate pour router les réponses Teams vers l'email du client

### 4.5 Profil

Page de gestion du compte utilisateur avec trois onglets, conforme à la documentation existante.

| Onglet | Champs / Fonctionnalités |
|--------|--------------------------|
| Informations Personnelles | Prénom, Nom, Email, Téléphone, Entreprise, Adresse, Ville, Pays (sélection) |
| Sécurité | Modification mot de passe (actuel + nouveau + confirmation). Min 8 caractères. |
| Notifications | 4 toggles : emails projet, alertes factures, messages équipe, rappels échéance |

---

## 5. Authentification

L'authentification est gérée par Supabase Auth avec support OAuth Google. L'inscription se fait sur invitation uniquement (le client reçoit un lien d'accès après signature de contrat).

| Page | Fonctionnalités |
|------|-----------------|
| Login (`/auth/login`) | Connexion email/password + OAuth Google. Redirection vers `/dashboard` après connexion. |
| Register (`/auth/register`) | Création de compte via lien d'invitation. Prénom, Nom, Email (pré-rempli), Mot de passe. |
| Forgot Password (`/auth/forgot-password`) | Saisie email, envoi lien de réinitialisation par Supabase, page de reset. |

**Sécurité :**
- Sessions JWT avec refresh automatique des tokens
- Middleware Next.js sur toutes les routes `/dashboard`, `/projects`, `/billing`, `/profile`, `/support`
- Redirection automatique vers `/auth/login` si non authentifié
- Protection CSRF intégrée
- Rate limiting sur les tentatives de connexion

---

## 6. Principes UX/UI

### 6.1 Navigation

| Zone | Desktop | Tablet | Mobile |
|------|---------|--------|--------|
| Site Public | Navbar fixe en haut + méga-menu services | Navbar + menu hamburger | Menu hamburger plein écran |
| Espace Client | Sidebar permanente à gauche | Sidebar rétractable | Bottom navigation bar (5 icônes) |

### 6.2 Design System

- **Typographie** : Inter pour le corps, Space Grotesk pour les titres du site public
- **Palette principale** :
  - Noir profond `#0A0A0A` — Expertise, premium
  - Blanc pur `#FFFFFF` — Clarté, simplicité
  - Bleu électrique `#0066FF` — Innovation, CTA, liens
  - Vert succès `#00D46A` — Performance, validations, métriques positives
- **Composants** : shadcn/ui comme base, personnalisés avec les tokens Kaelix
- **Icônes** : Lucide Icons (cohérence avec shadcn/ui)
- **Animations** : Framer Motion pour les transitions de page et micro-interactions
- **Concept visuel** : Minimaliste, évoquant la précision du code — le site doit incarner le savoir-faire technique de l'agence
- **Mode sombre** : support natif via CSS variables (V2)

### 6.3 Performance

- Lighthouse cible : **95+** sur toutes les métriques (c'est une promesse client, le site Kaelix doit l'incarner)
- Skeleton loaders sur toutes les listes et données asynchrones
- Code splitting automatique par route (Next.js App Router)
- Images : `next/image` avec lazy loading et formats WebP/AVIF
- Fonts : preload + font-display:swap
- Cache : ISR (Incremental Static Regeneration) pour le blog et portfolio

---

## 7. Stratégie SEO

Le site public est conçu SEO-first. L'architecture à trois niveaux (pages piliers → pages de service → articles de blog) crée un maillage interne puissant.

### 7.1 Fondations Techniques

| Élément | Implémentation |
|---------|----------------|
| Métadonnées | Next.js Metadata API : title, description, OG tags dynamiques par page |
| Structured Data | JSON-LD : Organization, LocalBusiness, Service, Article, BreadcrumbList, FAQ |
| Sitemap | next-sitemap : génération automatique avec priorités |
| Performance | Core Web Vitals optimisés : LCP <2.5s, FID <100ms, CLS <0.1 |
| Architecture URL | URLs propres, hiérarchiques, sémantiques (pas de paramètres) |
| Maillage Interne | Pages piliers ↔ Pages services ↔ Articles blog ↔ Études de cas |
| Pages locales | Structured Data LocalBusiness + contenu unique par ville |

### 7.2 Architecture de Maillage

```
Pages Piliers (5)
  ├── /developpement-site-sur-mesure
  │     ├── → /services/site-vitrine
  │     ├── → /services/application-web
  │     ├── → /blog/from-scratch-vs-cms
  │     └── → /realisations/[slug]
  ├── /alternative-wordpress-performance
  │     ├── → /blog/pourquoi-wordpress-ralentit
  │     ├── → /blog/core-web-vitals-impact-seo
  │     └── → /audit-gratuit
  └── ...

Pages Locales (8+)
  ├── /agence-web-montpellier → pages services + réalisations locales
  ├── /agence-web-paris → pages services + réalisations locales
  └── ...

Pages Sectorielles (4+)
  ├── /site-web-restaurant → /services/site-vitrine + /realisations/[slug]
  └── ...
```

### 7.3 Stratégie de Contenu

Le blog cible trois types de requêtes :
- **Informationnelles** : guides, tutoriels ("Comment mesurer la performance de votre site")
- **Comparatives** : WordPress vs custom, Webflow vs Next.js ("From scratch vs CMS : le vrai coût sur 3 ans")
- **Transactionnelles** : tarifs, agence ("Combien coûte un site sur mesure en 2026")

Objectif : 3 articles/semaine en lancement (mois 1-3), puis 2-4 articles/mois en croisière. Chaque article est maillé vers les pages piliers et les pages de service pertinentes.

---

## 8. Roadmap de Développement

| Phase | Périmètre | Durée estimée |
|-------|-----------|---------------|
| Phase 1 — Fondations | Setup projet, design system (palette, typo, composants), auth Supabase, layout public + client | 2 semaines |
| Phase 2 — Site Public Core | Homepage, pages services, page tarifs, portfolio, page contact, pages légales, SEO technique | 3 semaines |
| Phase 3 — Espace Client Core | Dashboard, projets (liste stack + détail), profil utilisateur | 2 semaines |
| Phase 4 — Facturation Stripe | Liste factures, détail facture, flow paiement, gestion cartes | 2 semaines |
| Phase 5 — Support Teams | Intégration webhooks Teams, formulaire support, notifications email | 1 semaine |
| Phase 6 — Blog & SEO | Système blog (MDX ou Supabase), sitemap, structured data, premiers articles | 2 semaines |
| Phase 7 — Pages Conversion & SEO | Pages piliers, audit-gratuit, process, garanties, pages locales, pages sectorielles | 2 semaines |
| Phase 8 — Polish & Launch | Tests E2E, optimisation performance, responsive final, déploiement production | 1 semaine |

> **Durée totale estimée : ~15 semaines**
> Ce planning suppose un développeur principal à temps plein. Les phases 2 et 3 peuvent être partiellement parallélisées. Le contenu blog et les pages piliers (Phases 6-7) peuvent démarrer en rédaction pendant les phases techniques.

---

## 9. Structure des Fichiers (App Router)

```
src/
  app/
    (public)/                            # Layout site public (navbar + footer)
      page.tsx                           # Homepage
      tarifs/page.tsx                    # Page tarifs
      services/
        page.tsx                         # Liste services
        [slug]/page.tsx                  # Détail service
      realisations/
        page.tsx                         # Portfolio
        [slug]/page.tsx                  # Étude de cas
      a-propos/page.tsx
      contact/page.tsx
      audit-gratuit/page.tsx             # Lead magnet — formulaire qualifiant
      process/page.tsx                   # Transparence process
      garanties/page.tsx                 # Page réassurance
      blog/
        page.tsx                         # Liste articles
        [slug]/page.tsx                  # Article
      # Pages piliers SEO
      developpement-site-sur-mesure/page.tsx
      alternative-wordpress-performance/page.tsx
      agence-web-tpe-pme/page.tsx
      creation-site-ecommerce-sans-cms/page.tsx
      refonte-site-web-performance/page.tsx
      # Pages locales
      agence-web-[ville]/page.tsx        # Dynamique par ville
      developpeur-site-internet-[ville]/page.tsx
      creation-site-web-[ville]/page.tsx
      # Pages sectorielles
      site-web-restaurant/page.tsx
      site-ecommerce-mode/page.tsx
      site-vitrine-artisan/page.tsx
      plateforme-saas-startup/page.tsx
    (auth)/                              # Layout auth (minimal, centré)
      auth/login/page.tsx
      auth/register/page.tsx
      auth/forgot-password/page.tsx
    (client)/                            # Layout espace client (sidebar)
      dashboard/page.tsx
      projects/
        page.tsx
        [id]/page.tsx
      billing/
        page.tsx
        [id]/page.tsx
        [id]/pay/page.tsx
      profile/page.tsx
      support/page.tsx
    api/                                 # API Routes
      support/send/route.ts              # Webhook Teams
      stripe/webhook/route.ts            # Webhook Stripe
      audit/request/route.ts             # Soumission audit gratuit
  components/
    ui/                                  # shadcn/ui components
    public/                              # Composants site public
    client/                              # Composants espace client
    shared/                              # Composants partagés
  lib/
    supabase/                            # Client + helpers Supabase
    stripe/                              # Helpers Stripe
    teams/                               # Helper webhook Teams
  types/                                 # Types TypeScript globaux
```
