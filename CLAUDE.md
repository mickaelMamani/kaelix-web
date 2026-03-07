# Kaelix — Crafted Code, Proven Performance

Site vitrine + espace client pour agence web spécialisée dans le développement from scratch.

## Stack Technique

- **Framework**: Next.js 16 (App Router, `src/` directory)
- **Styling**: Tailwind CSS v4 + shadcn/ui v4
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Paiements**: Stripe (invoices, subscriptions)
- **Support**: Microsoft Teams (webhooks pass-through)
- **Déploiement**: Vercel
- **Langage**: TypeScript strict

## Structure du Projet

```
src/
  app/
    (public)/         # Site vitrine — layout avec navbar + footer
    (auth)/           # Auth — layout centré minimal
    (client)/         # Espace client — layout avec sidebar
    api/              # API Routes (support, stripe, audit)
  components/
    ui/               # shadcn/ui components
    public/           # Composants site public
    client/           # Composants espace client
    shared/           # Composants partagés
  lib/
    supabase/         # Server/Client/Middleware Supabase clients
    stripe/           # Stripe SDK client
    teams/            # Teams webhook helper
  hooks/              # Custom React hooks
  types/              # Global TypeScript types
  actions/            # Server Actions
```

## Conventions

### Auth
- Utiliser `@supabase/ssr` (jamais `@supabase/supabase-js` directement pour les clients)
- Server: `createClient()` from `@/lib/supabase/server` (async)
- Client: `createClient()` from `@/lib/supabase/client`
- Toujours utiliser `getUser()` (jamais `getSession()`) pour les vérifications d'auth
- Middleware protège `/dashboard`, `/projects`, `/billing`, `/profile`, `/support`

### Base de Données
- RLS activé sur toutes les tables
- Profil auto-créé via trigger `on_auth_user_created`
- `updated_at` géré automatiquement par triggers

### Schéma DB (public)
- `profiles` — Profils utilisateurs (FK auth.users)
- `organizations` — Organisations/entreprises clients
- `org_members` — Membres d'organisation (role: owner/admin/member)
- `projects` — Projets clients (type enum, status enum, progress 0-100)
- `deliverables` — Livrables de projet
- `activity_log` — Journal d'activité

### Style
- Couleurs: `#0A0A0A` (noir), `#FFFFFF` (blanc), `#0066FF` (bleu), `#00D46A` (vert)
- Typo: Inter (corps), Space Grotesk (titres)
- CSS: `font-sans` = Inter, `font-heading` = Space Grotesk
- Tailwind custom colors: `kaelix-black`, `kaelix-white`, `kaelix-blue`, `kaelix-green`

### Code
- Server Actions pour les mutations (dossier `actions/`)
- Validation avec Zod
- Pas de fichier `.env` dans git — utiliser `.env.example`
- Langue du site: Français
- Langue du code/commentaires: Anglais

## Supabase Project
- **ID**: xjbpucxoyokvduyhlulk
- **Nom**: Kaelix Emergent
- **Région**: eu-west-1
