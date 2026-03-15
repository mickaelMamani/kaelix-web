# Kaelix — Spécification Fonctionnelle Admin

> **Version :** 1.0  
> **Date :** 15 mars 2026  
> **Scope :** Espace d'administration (`/admin/*`)  
> **Stack :** Next.js 14+ (App Router) · Supabase · Stripe · Vercel

---

## 1. État actuel du schéma (audit)

### 1.1 Tables existantes

| Table | RLS | Rows | Rôle |
|---|---|---|---|
| `profiles` | ✅ | 1 | Profil utilisateur lié à `auth.users` |
| `projects` | ✅ | 0 | Projets client |
| `invoices` | ✅ | 0 | Factures liées à Stripe |
| `deliverables` | ✅ | 0 | Livrables par projet |
| `payment_methods` | ✅ | 0 | Moyens de paiement Stripe |
| `activity_log` | ✅ | 0 | Journal d'activité |

### 1.2 Enums custom (public)

| Enum | Valeurs |
|---|---|
| `project_type` | `site-vitrine`, `site-ecommerce`, `application-web`, `refonte-site`, `seo-performance`, `maintenance` |
| `project_status` | `discovery`, `proposal`, `design`, `development`, `review`, `launched`, `maintenance` |
| `invoice_status` | `draft`, `open`, `paid`, `void`, `uncollectible` |
| `deliverable_status` | `pending`, `in_progress`, `completed` |
| `payment_method_type` | `card`, `sepa` |

### 1.3 Fonctions existantes

| Fonction | Rôle |
|---|---|
| `handle_new_user()` | Trigger `auth.users` → crée une ligne dans `profiles` (id, full_name, avatar_url) |
| `handle_updated_at()` | Trigger → met à jour `updated_at = now()` sur modification |

### 1.4 Policies RLS actuelles

Toutes les policies sont **client-scoped** (`auth.uid() = user_id` ou équivalent). Aucune policy admin n'existe.

| Table | Policies |
|---|---|
| `profiles` | SELECT own, UPDATE own |
| `projects` | SELECT own, INSERT own, UPDATE own |
| `invoices` | SELECT own, service_role full access |
| `deliverables` | SELECT via project ownership |
| `payment_methods` | SELECT own, DELETE own, service_role full access |
| `activity_log` | SELECT own, INSERT own |

### 1.5 Éléments manquants pour l'admin

| Élément | Statut | Action requise |
|---|---|---|
| Colonne `role` dans `profiles` | ❌ Absente | Ajouter avec check constraint `('client', 'admin')` |
| Colonne `admin_id` dans `projects` | ❌ Absente | Ajouter FK vers `auth.users` |
| Colonne `started_at` dans `projects` | ❌ Absente | Ajouter timestamp nullable |
| Fonction `get_user_role()` | ❌ Absente | Créer pour les policies RLS admin |
| Policies RLS admin | ❌ Absentes | Ajouter sur toutes les tables |
| Enum `project_status` : valeur `pending` | ❌ Absente | **Décision à prendre** (cf. section 2.1) |

---

## 2. Décisions d'architecture

### 2.1 Mapping du workflow admin sur `project_status`

L'enum actuel modélise un cycle projet complet en 7 étapes. Le workflow admin simplifié (pending → in_progress) doit s'y mapper proprement.

**Option retenue : ajouter `pending` à l'enum existant**

Le statut `pending` représente un projet validé commercialement mais pas encore démarré — il se place logiquement avant `discovery` dans le pipeline.

```
pending → discovery → proposal → design → development → review → launched → maintenance
   ↑                                                                          
Admin démarre                                                                 
le projet                                                                     
```

**Mapping du workflow admin :**

| Action admin | Transition | Champs impactés |
|---|---|---|
| L'admin crée le projet | → `pending` | `status = pending`, `admin_id = null` |
| "Démarrer projet" | `pending` → `discovery` | `admin_id = current_user`, `started_at = now()` |
| Progression classique | `discovery` → ... → `launched` | `status`, `progress`, `updated_at` |

> **Note :** "in_progress" au sens admin = tout statut entre `discovery` et `review` inclus. Pas besoin d'une valeur enum dédiée.

### 2.2 Stratégie de rôles

Colonne `role` dans `profiles` avec check constraint — cohérent avec le document d'architecture existant.

```sql
role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin'))
```

### 2.3 Flux d'invitation utilisateur

L'admin crée un utilisateur via Supabase Admin API (server-side). L'utilisateur reçoit un email d'invitation pour définir son mot de passe. Le projet est créé dans un second temps, après confirmation de l'inscription.

```
Admin crée l'utilisateur (email + full_name)
       ↓
Supabase envoie un email "Invitation" avec magic link
       ↓
L'utilisateur clique → redirigé vers /auth/set-password
       ↓
Il définit son mot de passe → profil actif
       ↓
Admin peut maintenant créer un projet pour cet utilisateur
```

---

## 3. Migrations requises

### 3.1 Migration : ajout du rôle admin

```sql
-- Ajouter la colonne role à profiles
ALTER TABLE profiles
ADD COLUMN role TEXT NOT NULL DEFAULT 'client'
CHECK (role IN ('client', 'admin'));
```

### 3.2 Migration : ajout `pending` à `project_status` + colonnes admin

```sql
-- Ajouter le statut 'pending' à l'enum
ALTER TYPE project_status ADD VALUE 'pending' BEFORE 'discovery';

-- Ajouter les colonnes admin au projet
ALTER TABLE projects
ADD COLUMN admin_id UUID REFERENCES auth.users(id),
ADD COLUMN started_at TIMESTAMPTZ;
```

### 3.3 Migration : fonction helper `get_user_role()`

```sql
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;
```

### 3.4 Migration : policies RLS admin

```sql
-- ═══════════════════════════════════════
-- PROFILES
-- ═══════════════════════════════════════

-- Admin peut voir tous les profils
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (get_user_role() = 'admin');

-- Admin peut modifier tous les profils
CREATE POLICY "Admins can update all profiles"
  ON profiles FOR UPDATE
  USING (get_user_role() = 'admin');

-- ═══════════════════════════════════════
-- PROJECTS
-- ═══════════════════════════════════════

-- Admin peut voir tous les projets
CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  USING (get_user_role() = 'admin');

-- Admin peut créer des projets
CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- Admin peut modifier tous les projets
CREATE POLICY "Admins can update all projects"
  ON projects FOR UPDATE
  USING (get_user_role() = 'admin');

-- ═══════════════════════════════════════
-- INVOICES
-- ═══════════════════════════════════════

-- Admin peut voir toutes les factures
CREATE POLICY "Admins can view all invoices"
  ON invoices FOR SELECT
  USING (get_user_role() = 'admin');

-- Admin peut créer des factures
CREATE POLICY "Admins can insert invoices"
  ON invoices FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- Admin peut modifier les factures
CREATE POLICY "Admins can update invoices"
  ON invoices FOR UPDATE
  USING (get_user_role() = 'admin');

-- ═══════════════════════════════════════
-- DELIVERABLES
-- ═══════════════════════════════════════

-- Admin peut voir tous les livrables
CREATE POLICY "Admins can view all deliverables"
  ON deliverables FOR SELECT
  USING (get_user_role() = 'admin');

-- Admin peut gérer les livrables
CREATE POLICY "Admins can insert deliverables"
  ON deliverables FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "Admins can update deliverables"
  ON deliverables FOR UPDATE
  USING (get_user_role() = 'admin');

CREATE POLICY "Admins can delete deliverables"
  ON deliverables FOR DELETE
  USING (get_user_role() = 'admin');

-- ═══════════════════════════════════════
-- ACTIVITY LOG
-- ═══════════════════════════════════════

-- Admin peut voir tout le journal
CREATE POLICY "Admins can view all activity"
  ON activity_log FOR SELECT
  USING (get_user_role() = 'admin');

-- Admin peut insérer dans le journal
CREATE POLICY "Admins can insert activity"
  ON activity_log FOR INSERT
  WITH CHECK (get_user_role() = 'admin');

-- ═══════════════════════════════════════
-- PAYMENT METHODS
-- ═══════════════════════════════════════

-- Admin peut voir tous les moyens de paiement
CREATE POLICY "Admins can view all payment methods"
  ON payment_methods FOR SELECT
  USING (get_user_role() = 'admin');
```

---

## 4. Spécification fonctionnelle — Pages admin

### 4.1 `/admin/dashboard` — Tableau de bord

**Accès :** `role = 'admin'` uniquement (middleware + RLS)

#### Données affichées

**Bloc 1 — KPIs en haut de page (cards)**

| KPI | Source | Calcul |
|---|---|---|
| Projets en attente | `projects` | `COUNT WHERE status = 'pending'` |
| Projets en cours | `projects` | `COUNT WHERE status IN ('discovery','proposal','design','development','review')` |
| Projets livrés (mois) | `projects` | `COUNT WHERE status = 'launched' AND updated_at >= début du mois` |
| Revenus du mois | `invoices` | `SUM(amount) WHERE status = 'paid' AND paid_at >= début du mois` |
| Factures impayées | `invoices` | `COUNT WHERE status IN ('open','uncollectible')` |
| Montant impayé total | `invoices` | `SUM(amount) WHERE status IN ('open','uncollectible')` |

**Bloc 2 — Liste des projets en attente (`pending`)**

Pour chaque projet :
- Nom du projet, type, client (via `user_id` → `profiles.full_name`)
- Date de création
- Budget
- Bouton **"Démarrer le projet"**

**Bloc 3 — Liste des projets en cours**

Pour chaque projet (`status` entre `discovery` et `review`) :
- Nom, type, client, admin assigné
- Statut actuel + barre de progression (`progress`)
- Date de début (`started_at`), deadline (`due_date`)
- Indicateur de retard si `due_date < today AND status != 'launched'`

**Bloc 4 — Factures récentes**

Les 10 dernières factures triées par `created_at DESC` :
- Client, montant, statut (badge coloré), date d'échéance
- Lien vers la facture PDF (`pdf_url`)
- Indicateur "en retard" si `status = 'open' AND due_date < today`

#### Action : "Démarrer le projet"

**Déclencheur :** bouton sur un projet `pending`

**Opération (server action) :**

```ts
// Pseudo-code Next.js Server Action
async function startProject(projectId: string) {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('projects')
    .update({
      status: 'discovery',
      admin_id: user.id,
      started_at: new Date().toISOString()
    })
    .eq('id', projectId)
    .eq('status', 'pending') // guard: uniquement si encore pending

  // Log dans activity_log
  await supabase.from('activity_log').insert({
    project_id: projectId,
    user_id: user.id,
    action: 'project_started',
    description: `Projet démarré par l'admin`
  })
}
```

**Post-conditions :**
- `status` = `discovery`
- `admin_id` = UUID de l'admin connecté
- `started_at` = timestamp actuel
- Entrée créée dans `activity_log`

---

### 4.2 `/admin/users` — Gestion des utilisateurs

#### 4.2.1 Liste des utilisateurs

**Données :** tous les `profiles` avec jointure sur `auth.users` (email)

| Colonne | Source |
|---|---|
| Nom complet | `profiles.full_name` |
| Email | `auth.users.email` (via Supabase Admin API) |
| Entreprise | `profiles.company` |
| Rôle | `profiles.role` |
| Date d'inscription | `profiles.created_at` |
| Nombre de projets | `COUNT(projects) WHERE user_id = profile.id` |
| Statut du compte | `auth.users.email_confirmed_at IS NOT NULL` → Actif / En attente |

**Filtres :** par rôle, par statut du compte, recherche par nom/email

#### 4.2.2 Action : Inviter un utilisateur

**Flow en 2 étapes :**

**Étape 1 — Formulaire d'invitation (admin)**

| Champ | Type | Requis |
|---|---|---|
| Email | email | ✅ |
| Nom complet | text | ✅ |
| Entreprise | text | ❌ |
| Téléphone | text | ❌ |

**Étape 2 — Traitement server-side (API Route ou Server Action)**

```ts
// Pseudo-code — Route API /api/admin/invite-user
import { createClient } from '@supabase/supabase-js'

async function inviteUser(formData: InviteFormData) {
  // Client admin avec service_role key (server-side uniquement)
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // 1. Créer l'utilisateur via Admin API
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
    formData.email,
    {
      data: {
        full_name: formData.fullName,
        // Ces métadonnées sont lues par handle_new_user() pour créer le profil
      },
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/set-password`
    }
  )

  if (error) throw error

  // 2. Compléter le profil (entreprise, téléphone) si fournis
  if (formData.company || formData.phone) {
    await supabaseAdmin
      .from('profiles')
      .update({
        company: formData.company,
        phone: formData.phone,
      })
      .eq('id', data.user.id)
  }

  // 3. Logger l'action
  await supabaseAdmin.from('activity_log').insert({
    user_id: currentAdminId,
    action: 'user_invited',
    description: `Invitation envoyée à ${formData.email}`
  })
}
```

**Ce qui se passe côté utilisateur :**
1. Il reçoit un email "Vous êtes invité à rejoindre Kaelix"
2. Clique sur le lien → redirigé vers `/auth/set-password`
3. Définit son mot de passe
4. Son compte est activé, `email_confirmed_at` est renseigné
5. Il accède à son espace client `/dashboard`

**Ce qui se passe côté admin :**
- Le profil apparaît dans la liste avec statut "En attente" tant que l'email n'est pas confirmé
- Une fois confirmé → statut "Actif"
- L'admin peut alors créer un projet pour ce client

---

### 4.3 `/admin/projects` — Gestion des projets

#### Liste complète

Tous les projets avec filtres :

| Filtre | Valeurs |
|---|---|
| Statut | `pending`, `discovery`, `proposal`, `design`, `development`, `review`, `launched`, `maintenance` |
| Type | Tous les `project_type` |
| Admin assigné | Liste des admins |
| Client | Recherche par nom/entreprise |

#### Création de projet

**Pré-requis :** l'utilisateur cible doit avoir un compte actif (email confirmé).

| Champ | Type | Requis | Défaut |
|---|---|---|---|
| Nom du projet | text | ✅ | — |
| Description | text | ❌ | — |
| Type | select (`project_type`) | ✅ | `site-vitrine` |
| Client | select (utilisateurs actifs) | ✅ | — |
| Budget | text | ❌ | — |
| Date de début prévue | date | ❌ | — |
| Date de livraison prévue | date | ❌ | — |

**À la création :**
- `status` = `pending`
- `admin_id` = `null` (assigné au démarrage)
- `progress` = `0`
- Entrée dans `activity_log` : `project_created`

#### Détail d'un projet (vue admin)

- Infos du projet + client
- Timeline des statuts (progression visuelle)
- Liste des livrables (CRUD complet pour l'admin)
- Factures liées au projet
- Journal d'activité filtré sur ce projet

#### Transition de statuts (admin)

L'admin peut faire avancer ou reculer le statut :

```
pending → discovery → proposal → design → development → review → launched → maintenance
```

Chaque transition :
- Met à jour `status` et `updated_at`
- Crée une entrée dans `activity_log`
- Met à jour `progress` automatiquement (mapping suggéré ci-dessous)

| Statut | `progress` suggéré |
|---|---|
| `pending` | 0% |
| `discovery` | 10% |
| `proposal` | 20% |
| `design` | 40% |
| `development` | 65% |
| `review` | 85% |
| `launched` | 100% |
| `maintenance` | 100% |

---

### 4.4 `/admin/billing` — Suivi des paiements

#### Vue d'ensemble

**KPIs :**

| Indicateur | Calcul |
|---|---|
| Revenus totaux (mois en cours) | `SUM(amount) WHERE status = 'paid' AND paid_at >= début du mois` |
| Revenus totaux (année) | `SUM(amount) WHERE status = 'paid' AND paid_at >= début de l'année` |
| Montant en attente | `SUM(amount) WHERE status = 'open'` |
| Montant impayé (en retard) | `SUM(amount) WHERE status = 'open' AND due_date < today` |
| Taux de recouvrement | `paid / (paid + open + uncollectible) * 100` |

#### Liste des factures

| Colonne | Source |
|---|---|
| Numéro (ID court) | `invoices.id` (truncated) ou `stripe_invoice_id` |
| Client | `profiles.full_name` via `invoices.user_id` |
| Projet | `projects.name` via `invoices.project_id` |
| Montant | `invoices.amount` (en centimes → affichage €) |
| Statut | Badge coloré selon `invoice_status` |
| Émise le | `invoices.created_at` |
| Échéance | `invoices.due_date` |
| Payée le | `invoices.paid_at` |
| PDF | Lien vers `invoices.pdf_url` |

**Badges de statut :**

| Statut | Couleur | Label |
|---|---|---|
| `draft` | Gris | Brouillon |
| `open` | Bleu | En attente |
| `open` + retard | Rouge | En retard |
| `paid` | Vert | Payée |
| `void` | Gris barré | Annulée |
| `uncollectible` | Rouge foncé | Irrécouvrable |

**Filtres :** par statut, par client, par projet, par période (date range)

#### Actions admin sur les factures

| Action | Conditions | Effet |
|---|---|---|
| Créer une facture | Projet existant | Crée en `draft`, synchronise avec Stripe |
| Envoyer une facture | `draft` | Passe en `open`, envoie via Stripe |
| Marquer comme payée | `open` | Passe en `paid`, renseigne `paid_at` |
| Annuler | `draft` ou `open` | Passe en `void` |
| Relancer | `open` + retard | Renvoie un rappel via Stripe |

> **Note :** la synchronisation Stripe (création, envoi, webhooks) est gérée côté API routes / webhooks — hors scope de cette spécification fonctionnelle.

---

## 5. Architecture des routes

```
app/
├── (public)/                    → Site vitrine (marketing)
├── (auth)/
│   ├── login/
│   └── set-password/            → Page de définition du mot de passe (invitation)
├── (client)/                    → Layout vérifie role = 'client' | 'admin'
│   ├── dashboard/
│   ├── projects/
│   ├── billing/
│   └── profile/
└── admin/                       → Layout vérifie role = 'admin' strictement
    ├── layout.tsx               → Guard admin (redirect si non-admin)
    ├── dashboard/               → KPIs + projets pending + factures
    ├── users/
    │   ├── page.tsx             → Liste des utilisateurs
    │   └── invite/              → Formulaire d'invitation
    ├── projects/
    │   ├── page.tsx             → Liste complète des projets
    │   ├── new/                 → Création de projet
    │   └── [id]/                → Détail projet (statut, livrables, factures)
    └── billing/
        ├── page.tsx             → Dashboard paiements + liste factures
        └── [id]/                → Détail facture
```

---

## 6. Sécurité — Couches de protection

| Couche | Rôle | Implémentation |
|---|---|---|
| **RLS (Supabase)** | Source de vérité | Policies avec `get_user_role() = 'admin'` |
| **Middleware (Next.js)** | UX guard | Redirection si non-admin sur `/admin/*` |
| **Layout admin** | Double check | Server component qui vérifie le rôle en DB |
| **Server Actions** | Protection des mutations | Vérification du rôle avant chaque opération |
| **Service Role Key** | Opérations privilégiées | Invitation utilisateur (server-side uniquement, jamais exposée au client) |

**Règle d'or :** le middleware et le layout sont des gardes UX pour une redirection propre. La vraie sécurité repose exclusivement sur les policies RLS et la vérification server-side.

---

## 7. Ordre d'implémentation recommandé

| Phase | Tâche | Dépendance |
|---|---|---|
| **1** | Migration : `role` dans `profiles` | — |
| **2** | Migration : `get_user_role()` + policies RLS admin | Phase 1 |
| **3** | Migration : `pending` dans `project_status` + `admin_id` / `started_at` | — |
| **4** | Middleware + layout admin | Phase 2 |
| **5** | `/admin/dashboard` (KPIs + projets pending) | Phase 3, 4 |
| **6** | `/admin/users` + invitation | Phase 4 |
| **7** | `/admin/projects` (CRUD + transitions) | Phase 5, 6 |
| **8** | `/admin/billing` (dashboard paiements) | Phase 7 |

---

## 8. Schéma relationnel final (post-migrations)

```
auth.users
    │
    ├── 1:1 ── profiles
    │            ├── id (PK, FK → auth.users.id)
    │            ├── role ← NOUVEAU ('client' | 'admin')
    │            ├── full_name
    │            ├── company
    │            ├── phone, address, city, country
    │            ├── avatar_url
    │            ├── stripe_customer_id
    │            ├── notification_*
    │            └── created_at, updated_at
    │
    ├── 1:N ── projects
    │            ├── id (PK)
    │            ├── user_id (FK → auth.users) — le client
    │            ├── admin_id (FK → auth.users) ← NOUVEAU — l'admin assigné
    │            ├── name, description
    │            ├── type (project_type)
    │            ├── status (project_status) — inclut 'pending' ← NOUVEAU
    │            ├── progress (0-100)
    │            ├── budget
    │            ├── start_date, due_date
    │            ├── started_at ← NOUVEAU
    │            └── created_at, updated_at
    │            │
    │            ├── 1:N ── deliverables
    │            │            ├── id, title, description
    │            │            ├── status (deliverable_status)
    │            │            ├── due_date, sort_order
    │            │            └── created_at, updated_at
    │            │
    │            └── 1:N ── invoices
    │                         ├── id
    │                         ├── user_id (FK → auth.users)
    │                         ├── project_id (FK → projects)
    │                         ├── stripe_invoice_id
    │                         ├── amount, currency
    │                         ├── status (invoice_status)
    │                         ├── due_date, paid_at, pdf_url
    │                         └── created_at, updated_at
    │
    ├── 1:N ── payment_methods
    │            ├── stripe_payment_method_id
    │            ├── type, brand, last4, exp_month, exp_year
    │            └── is_default
    │
    └── 1:N ── activity_log
                 ├── id
                 ├── user_id, project_id
                 ├── action, description
                 └── created_at
```
