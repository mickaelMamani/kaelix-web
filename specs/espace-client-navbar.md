# Feature Spec: Espace Client — Accès Navbar

## Overview

Ajouter un bouton "Espace Client" dans la navbar du site public, permettant aux clients existants de se connecter ou d'accéder directement à leur portail. Le bouton s'adapte selon l'état d'authentification du visiteur.

### Comportement

| État | Affichage | Action au clic |
|------|-----------|----------------|
| **Non connecté** | Bouton outline "Espace Client" | Redirige vers `/auth/login` |
| **Connecté** | Avatar/initiales + dropdown menu | Accès direct Dashboard, Projets, Facturation, Profil, Déconnexion |

### Positionnement

- **Desktop** : à droite du CTA "Audit Gratuit", tout à droite de la navbar
- **Mobile** : dans le Sheet (MobileNav), en haut du menu avant les liens de navigation
- **Tablet** : idem mobile (menu hamburger)

---

## Phase 1: Server-side auth check dans le layout public

### Tâche 1.1 — Rendre le layout `(public)` auth-aware

**Fichier :** `src/app/(public)/layout.tsx`

- Importer `createClient` depuis `@/lib/supabase/server`
- Appeler `supabase.auth.getUser()` pour vérifier si un utilisateur est connecté
- Si connecté, récupérer le profil (full_name, avatar_url) depuis la table `profiles`
- Passer les données user au composant `<Navbar />`

**Changements :**
```
- Ajouter: import createClient
- Ajouter: const supabase = await createClient()
- Ajouter: const { data: { user } } = await supabase.auth.getUser()
- Ajouter: if (user) → fetch profile
- Modifier: <Navbar user={user} profile={profile} />
```

**Note :** Le layout `(public)` devient `async` (il ne l'est probablement pas encore). C'est un server component donc pas de problème.

---

## Phase 2: Composant UserNavButton

### Tâche 2.1 — Créer le composant `UserNavButton`

**Fichier :** `src/components/public/user-nav-button.tsx` (nouveau)

Composant client (`"use client"`) qui affiche :

**État non connecté :**
- Bouton outline avec icône `LogIn` + texte "Espace Client"
- `render={<Link href="/auth/login" />}` (pattern shadcn v4)
- Style : `variant="outline"` avec border kaelix-blue/30, hover kaelix-blue

**État connecté — dropdown menu :**
- Trigger : `Avatar` (composant shadcn existant, size `"sm"`) avec initiales ou image
- Dropdown items :
  - "Mon Dashboard" → `/dashboard` (icône `LayoutDashboard`)
  - "Mes Projets" → `/projects` (icône `FolderKanban`)
  - "Facturation" → `/billing` (icône `CreditCard`)
  - Separator
  - "Mon Profil" → `/profile` (icône `User`)
  - "Se déconnecter" → POST `/auth/logout` (icône `LogOut`, variant `"destructive"`)

**Props :**
```typescript
interface UserNavButtonProps {
  user: { id: string; email: string } | null
  profile: { full_name: string | null; avatar_url: string | null } | null
}
```

**Composants shadcn réutilisés :** `Button`, `Avatar`, `AvatarImage`, `AvatarFallback`, `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`

**Patterns existants à respecter :**
- `DropdownMenuItem` utilise `render={<Link href="..." />}` pour la navigation (pas de `asChild`)
- `DropdownMenuItem` supporte `variant="destructive"` pour la déconnexion
- L'avatar utilise le prop `size="sm"`
- La déconnexion utilise le même pattern que dans `sidebar.tsx` et `client-header.tsx` : form POST vers `/auth/logout`

### Tâche 2.2 — Version mobile du composant

**Fichier :** `src/components/public/user-nav-button.tsx` (même fichier, export séparé ou section conditionnelle)

Dans le `MobileNav` (Sheet), l'affichage est différent :

**Non connecté :**
- Lien pleine largeur style "card" : avatar placeholder + "Se connecter à l'espace client" + chevron droit
- Positionné en haut du menu Sheet, avant les liens de navigation

**Connecté :**
- Carte avec avatar + nom + email
- En dessous : liens en liste (Dashboard, Projets, Facturation, Profil)
- Bouton "Se déconnecter" en bas de la section
- Séparateur visuel avant les liens publics

---

## Phase 3: Intégration dans la Navbar

### Tâche 3.1 — Modifier la Navbar desktop

**Fichier :** `src/components/public/navbar.tsx`

- Ajouter les props `user` et `profile` au composant `Navbar`
- Dans la zone droite (après le bouton "Audit Gratuit"), ajouter `<UserNavButton user={user} profile={profile} />`
- Ordre visuel desktop : `[Liens navigation] [Audit Gratuit (CTA primary)] [Espace Client (outline) ou Avatar]`

### Tâche 3.2 — Modifier la MobileNav

**Fichier :** `src/components/public/navbar.tsx` (MobileNav est dans le même fichier ou un sous-composant)

- Passer `user` et `profile` au composant `MobileNav`
- Ajouter la version mobile de `UserNavButton` en haut du contenu du Sheet
- Ajouter un `<Separator />` entre la section user et les liens de navigation

### Tâche 3.3 — Gérer le scroll state

La navbar change d'apparence au scroll (transparent → solid). Le bouton "Espace Client" doit :
- **En haut** (transparent) : outline avec border blanc semi-transparent
- **Après scroll** (solid) : outline avec border kaelix-blue/30

L'état `isScrolled` existe déjà dans la navbar, il suffit de le passer ou d'utiliser le contexte visuel existant.

---

## Phase 4: Polish & UX

### Tâche 4.1 — Transition fluide après login

**Fichier :** `src/app/(auth)/auth/login/page.tsx` ou `src/actions/auth.ts`

- Après login réussi, rediriger vers `/dashboard` (déjà en place)
- Vérifier que le `redirect` fonctionne bien quand on vient du site public
- Optionnel : supporter un param `?redirect=/` pour revenir à la page d'origine après login

### Tâche 4.2 — Transition après logout

**Fichier :** `src/app/(auth)/auth/logout/route.ts`

- Après déconnexion depuis le dropdown public, rediriger vers `/` (accueil) au lieu de `/auth/login`
- Vérifier le comportement actuel : si l'utilisateur est sur le site public et se déconnecte, il doit rester sur le site public

### Tâche 4.3 — Responsive fine-tuning

- Tester le dropdown sur petits écrans desktop (1024px-1280px) : s'assurer que le dropdown ne sort pas de l'écran
- `DropdownMenuContent` avec `align="end"` pour aligner à droite
- Vérifier que le Sheet mobile se ferme bien après clic sur un lien client

---

## SaaS Feature Checklist

- [x] RLS policies — déjà en place, pas de nouvelles tables
- [x] Auth gating — le layout (client) a déjà un auth guard
- [ ] Subscription tier gating — N/A (pas de restriction par tier pour l'accès au portail)
- [ ] Audit logging — N/A (pas d'action loggable, juste de la navigation)
- [ ] Error states — gérer le cas où getUser() échoue silencieusement (traiter comme non connecté)
- [ ] Loading states — N/A (server-side, pas de loading visible)
- [ ] Mobile responsive — oui, version mobile spécifique dans le Sheet
- [ ] Empty states — N/A

## Fichiers impactés (résumé)

| Fichier | Action |
|---------|--------|
| `src/app/(public)/layout.tsx` | Modifier — ajouter auth check + passer user à Navbar |
| `src/components/public/navbar.tsx` | Modifier — accepter props user/profile, intégrer UserNavButton |
| `src/components/public/user-nav-button.tsx` | **Créer** — composant bouton/dropdown auth-aware |
| `src/app/(auth)/auth/logout/route.ts` | Modifier — supporter redirect vers `/` depuis le site public |

## Risques & questions ouvertes

1. **Performance** : L'appel `getUser()` dans le layout public ajoute une requête Supabase sur chaque page publique. Supabase met en cache la session via les cookies, donc l'impact devrait être minimal. Surveiller le TTFB.

2. **Cache / ISR** : Les pages publiques qui utilisent ISR ou le cache statique ne peuvent pas avoir de contenu dynamique par utilisateur. Le `UserNavButton` étant un client component, il pourrait utiliser le hook `useUser()` existant côté client au lieu du server-side check. **Question : préférer server-side (layout async) ou client-side (hook useUser) ?**
   - Server-side : pas de flash "non connecté → connecté", mais empêche le cache des pages
   - Client-side : flash possible au chargement, mais les pages restent cacheable
   - **Recommandation** : client-side avec le hook `useUser()` existant, pour préserver les performances des pages publiques. Le layout public reste statique.

3. **Logout redirect** : Le route handler `/auth/logout` redirige actuellement vers `/auth/login`. Il faudra supporter un redirect dynamique (via `Referer` header ou query param) pour que la déconnexion depuis le site public ramène à `/` et depuis l'espace client ramène à `/auth/login`.
