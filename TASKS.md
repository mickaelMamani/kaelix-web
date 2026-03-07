# TASKS.md -- Kaelix Build Plan

> Site vitrine + espace client pour agence web. "Crafted Code, Proven Performance"

**Reference:** `architecture-kaelix.md` for full specifications.
**Conventions:** `CLAUDE.md` for project conventions and patterns.

---

## Phase 0: Project Setup [COMPLETE]

- [x] Create Next.js 16 app (TypeScript, Tailwind v4, App Router, `src/`)
- [x] Install dependencies (Supabase SSR, Stripe v20, Zod v4, shadcn/ui v4, Lucide)
- [x] Create Supabase clients (`src/lib/supabase/server.ts`, `client.ts`, `middleware.ts`)
- [x] Create Stripe client (`src/lib/stripe/client.ts`)
- [x] Create Teams webhook helper (`src/lib/teams/webhook.ts`)
- [x] Set up route groups: `(public)`, `(auth)`, `(client)` with placeholder layouts
- [x] Database migration: `create_core_tables` (profiles, organizations, org_members + RLS + triggers)
- [x] Database migration: `create_projects_tables` (projects, deliverables, activity_log + RLS + triggers)
- [x] Initialize shadcn/ui v4 (button component, CSS vars, Geist font)
- [x] Configure Kaelix CSS custom properties (`--kaelix-black`, `--kaelix-blue`, `--kaelix-green`, `--kaelix-white`)
- [x] Font setup: Inter (`--font-inter`), Space Grotesk (`--font-space-grotesk`), Geist (`--font-sans`)
- [x] Root layout with metadata (title template, OG tags, `lang="fr"`)
- [x] Auth callback route (`src/app/(auth)/auth/callback/route.ts`)
- [x] API routes scaffolded: `api/support/send`, `api/stripe/webhook`, `api/audit/request`
- [x] Client layout with auth guard (server-side `getUser()` + redirect)
- [x] Middleware protecting all non-static routes
- [x] Placeholder pages for all client portal routes (dashboard, projects, billing, profile, support)
- [x] Placeholder auth pages (login, register, forgot-password)
- [x] Placeholder homepage
- [x] Create `.env.example`, `CLAUDE.md`, `TASKS.md`
- [x] `.gitignore` with `!.env.example` exception

**Existing files:**
- `src/app/layout.tsx` -- root layout (Inter + Space Grotesk + Geist, metadata, TooltipProvider + Toaster)
- `src/app/globals.css` -- Tailwind v4 + shadcn/ui CSS vars + Kaelix custom props (primary = blue)
- `src/app/(public)/layout.tsx` -- public layout with Navbar + Footer
- `src/app/(auth)/layout.tsx` -- auth layout (centered, dark background)
- `src/app/(client)/layout.tsx` -- client layout with sidebar, header, bottom nav + auth guard
- `src/middleware.ts` -- Supabase session refresh
- `src/components/ui/` -- 22 shadcn/ui v4 components installed (base-ui based)

---

## Phase 1: Design System & Layouts [COMPLETE]

> Foundation for all UI work. Must be completed before any page implementation.
> This phase produces the shared components and layout shells that every subsequent phase depends on.

### 1A. shadcn/ui Components Installation

- [x] Installed 22 shadcn/ui components: card, input, label, select, textarea, badge, avatar, dropdown-menu, sheet, dialog, tabs, accordion, separator, progress, sonner, table, switch, navigation-menu, breadcrumb, skeleton, tooltip, scroll-area

### 1B. Typography & Color Theme

- [x] `--primary` customized to Kaelix blue (`oklch(0.546 0.245 264)` ≈ `#0066FF`)
- [x] `--primary-foreground` set to white, `--ring` and `--sidebar-primary` matched
- [x] Kaelix CSS vars mapped in `@theme inline`: `--color-kaelix-blue`, `--color-kaelix-green`, `--color-kaelix-black`, `--color-kaelix-white`
- [x] `--font-heading` mapped to `--font-space-grotesk` in `@theme inline`
- [x] Created `src/lib/constants.ts` (siteConfig, navItems, clientNavItems, serviceSlugs, citySlugs, sectorSlugs, footerLinks)
- [x] Created `src/lib/metadata.ts` (generatePageMetadata helper with OG/Twitter/canonical)
- [x] Created `src/lib/animations.ts` (Framer Motion variants: fadeIn, slideUp, slideInLeft/Right, staggerContainer, scaleIn)

### 1C. Public Site Layout

- [x] Created `src/components/public/navbar.tsx` -- fixed top navbar with scroll behavior, NavigationMenu mega-menu, active link highlighting
- [x] Created `src/components/public/footer.tsx` -- 4-column dark footer with copyright bar
- [x] Created `src/components/public/mobile-nav.tsx` -- Sheet-based mobile menu with all nav items
- [x] Updated `src/app/(public)/layout.tsx` with Navbar + Footer
- [x] Created `src/components/public/cta-section.tsx` -- blue gradient CTA block
- [x] Created `src/components/public/section-header.tsx` -- reusable section heading with optional label

### 1D. Client Portal Layout

- [x] Created `src/components/client/sidebar.tsx` -- desktop sidebar with logo, user info, nav links, logout
- [x] Created `src/components/client/mobile-bottom-nav.tsx` -- fixed bottom nav for mobile
- [x] Created `src/components/client/client-header.tsx` -- sticky header with dynamic page title and avatar dropdown
- [x] Updated `src/app/(client)/layout.tsx` with sidebar, header, bottom nav, profile + org data fetching
- [x] Auth guard fetches user profile (full_name, avatar_url) and organization name

### 1E. Auth Layout Polish

- [x] Created `src/components/auth/auth-card.tsx` -- card wrapper with Kaelix logo link
- [ ] Update `src/app/(auth)/layout.tsx` to use auth-card (deferred to Phase 2 auth page builds)

### 1F. Shared Components

- [x] Created `src/components/shared/page-header.tsx` -- breadcrumbs + title + description + actions
- [x] Created `src/components/shared/empty-state.tsx` -- icon + title + description + optional CTA
- [x] Created `src/components/shared/loading-skeleton.tsx` -- CardSkeleton, WidgetSkeleton, TableRowSkeleton, ProjectCardSkeleton
- [x] Created `src/components/shared/status-badge.tsx` -- maps statuses to French labels and brand colors
- [x] Created `src/components/shared/animated-section.tsx` -- Framer Motion scroll-triggered animation wrapper

### 1G. Framer Motion Setup

- [x] Installed `framer-motion` package
- [x] Created `src/lib/animations.ts` -- shared animation variants
- [x] Created `src/components/shared/animated-section.tsx` -- wrapper component

**Existing files created/modified in Phase 1:**
- `src/lib/constants.ts`, `src/lib/animations.ts`, `src/lib/metadata.ts`
- `src/components/public/navbar.tsx`, `mobile-nav.tsx`, `footer.tsx`, `section-header.tsx`, `cta-section.tsx`
- `src/components/client/sidebar.tsx`, `mobile-bottom-nav.tsx`, `client-header.tsx`
- `src/components/shared/page-header.tsx`, `empty-state.tsx`, `loading-skeleton.tsx`, `status-badge.tsx`, `animated-section.tsx`
- `src/components/auth/auth-card.tsx`
- `src/app/(public)/layout.tsx`, `src/app/(client)/layout.tsx`, `src/app/layout.tsx` (updated)
- `src/app/globals.css` (customized CSS vars)

**Verify:** `npm run build` passes ✅ (0 errors, 0 warnings)

---

## Phase 2: Authentication [COMPLETE]

> Implements the full auth flow. Depends on Phase 1 (auth layout, auth-card component, form components).

- [x] Created `src/lib/validations/auth.ts` -- Zod v4 schemas (loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema)
- [x] Created `src/actions/auth.ts` -- Server actions: login, loginWithGoogle, register, logout, forgotPassword, resetPassword (all use `useActionState` pattern)
- [x] Created `src/components/auth/login-form.tsx` -- Client form with email/password + Google OAuth + loading states
- [x] Created `src/components/auth/register-form.tsx` -- Client form with name/email/password/confirm
- [x] Created `src/components/auth/forgot-password-form.tsx` -- Client form with success state toggle
- [x] Created `src/components/auth/reset-password-form.tsx` -- Client form for password reset
- [x] Updated `src/app/(auth)/auth/login/page.tsx` -- Renders LoginForm, exports metadata
- [x] Updated `src/app/(auth)/auth/register/page.tsx` -- Renders RegisterForm, exports metadata
- [x] Updated `src/app/(auth)/auth/forgot-password/page.tsx` -- Renders ForgotPasswordForm, exports metadata
- [x] Created `src/app/(auth)/auth/reset-password/page.tsx` -- Renders ResetPasswordForm, exports metadata
- [x] Updated `src/app/(auth)/auth/callback/route.ts` -- Handles OAuth, email verification, password reset callbacks
- [x] Created `src/app/(auth)/auth/logout/route.ts` -- POST handler for sign out
- [x] Updated `src/app/(auth)/layout.tsx` -- Radial gradient background
- [x] Created `src/hooks/use-user.ts` -- Client hook with auth state change subscription

**Verify:** `npm run build` passes ✅

---

## Phase 3: Site Public -- Core Pages [COMPLETE]

> Builds the main public-facing pages. Depends on Phase 1C (navbar, footer, shared components).

### 3A. Homepage — [x] Complete
- [x] 9 section components in `src/components/public/home/`: hero-section, trust-banner, problem-solution, services-overview, pricing-preview, showcases-section, process-section, testimonials-section, faq-section
- [x] `src/app/(public)/page.tsx` wired with AnimatedSection wrappers, CtaSection, JSON-LD (Organization + WebSite)

### 3B. Page Tarifs — [x] Complete
- [x] `src/components/public/tarifs/pricing-cards.tsx` -- 3 detailed pricing cards (Vitrine/SEO/E-commerce)
- [x] `src/components/public/tarifs/cost-comparator.tsx` -- Kaelix vs WordPress comparison table
- [x] `src/components/public/tarifs/pricing-faq.tsx` -- 8-item accordion
- [x] `src/app/(public)/tarifs/page.tsx` with JSON-LD (Organization + 3 Service + FAQPage schemas)

### 3C. Pages Services — [x] Complete
- [x] `src/lib/data/services.ts` -- 6 services with full data (features, benefits, FAQ, testimonials)
- [x] `src/app/(public)/services/page.tsx` -- listing with icon grid
- [x] `src/app/(public)/services/[slug]/page.tsx` -- dynamic detail with generateStaticParams + generateMetadata
- [x] 6 section components in `src/components/public/services/`: service-hero, service-problem, service-solution, service-features, service-testimonial, service-faq, service-cta

### 3D. Page Realisations — [x] Complete
- [x] `src/lib/data/portfolio.ts` -- 4 case studies (boulangerie-martin, mode-ethique, logistik-pro, cabinet-dupont)
- [x] `src/app/(public)/realisations/page.tsx` -- filterable portfolio grid
- [x] `src/app/(public)/realisations/[slug]/page.tsx` -- case study detail with generateStaticParams
- [x] Components: portfolio-grid, portfolio-card, case-study-hero, case-study-content, case-study-testimonial

### 3E. Page Contact — [x] Complete
- [x] `src/lib/validations/contact.ts` -- Zod v4 schema
- [x] `src/actions/contact.ts` -- server action with Teams webhook
- [x] `src/app/(public)/contact/page.tsx` -- two-column layout (form + info)
- [x] `src/components/public/contact/contact-form.tsx` -- useActionState form with success state
- [x] `src/components/public/contact/contact-info.tsx` -- contact details + social links

### 3F. Page A Propos — [x] Complete
- [x] `src/app/(public)/a-propos/page.tsx` -- 6 sections: hero, story, values (4 cards), team (3 members), key figures (4 stats), methodology

### 3G. Pages Legales — [x] Complete
- [x] `src/app/(public)/mentions-legales/page.tsx` -- 7 sections (RGPD compliant)
- [x] `src/app/(public)/politique-confidentialite/page.tsx` -- 11 sections
- [x] `src/app/(public)/cgv/page.tsx` -- 11 articles

### 3H. SEO Foundation — [x] Complete
- [x] `src/components/shared/json-ld.tsx` -- reusable JSON-LD component
- [x] `src/lib/structured-data.ts` -- 6 schema helpers (organization, localBusiness, service, breadcrumb, faq, article)

**Verify:** `npm run build` passes ✅ (36 routes, 0 errors, static + SSG + dynamic pages)

---

## Phase 4: Espace Client -- Dashboard & Projects [COMPLETE]

> Builds the authenticated client portal. Depends on Phase 1D (sidebar, client layout) and Phase 2 (auth flow).

### 4A. TypeScript Types — [x] Complete
- [x] Created `src/types/database.ts` — manually typed from live DB schema (Profile, Organization, OrgMember, Project, Deliverable, ActivityLog + enums)
- [x] Created `src/types/index.ts` — re-exports all types

### 4B. Data Fetching Helpers — [x] Complete
- [x] `src/lib/queries/profiles.ts` — `getProfile(userId)`, `updateProfile(userId, data)`
- [x] `src/lib/queries/projects.ts` — `getProjects(orgId)`, `getProject(projectId)`, `getProjectDeliverables(projectId)`, `getProjectWithDeliverables(projectId)`
- [x] `src/lib/queries/activity.ts` — `getRecentActivity(orgId, limit)`
- [x] `src/lib/queries/organizations.ts` — `getUserOrganization(userId)`, `getOrgMembers(orgId)`

### 4C. Dashboard Page — [x] Complete
- [x] `src/app/(client)/dashboard/page.tsx` — parallel data fetching, empty state handling
- [x] `src/components/client/dashboard/welcome-header.tsx` — "Bonjour, [Prénom]" + French date
- [x] `src/components/client/dashboard/stats-widgets.tsx` — 3 stat cards (active projects, avg progress, pending deliverables)
- [x] `src/components/client/dashboard/project-list.tsx` — condensed project list with progress bars
- [x] `src/components/client/dashboard/activity-feed.tsx` — 5 recent activities with relative French timestamps
- [x] `src/components/client/dashboard/quick-actions.tsx` — 3 action cards

### 4D. Projects List Page — [x] Complete
- [x] `src/app/(client)/projects/page.tsx` — project list with count badge
- [x] `src/components/client/projects/project-card.tsx` — full-width card with status, progress, metadata
- [x] `src/components/client/projects/project-list.tsx` — vertical stack

### 4E. Project Detail Page — [x] Complete
- [x] `src/app/(client)/projects/[id]/page.tsx` — await params, breadcrumbs, 2 tabs, org access check, notFound()
- [x] `src/components/client/projects/project-overview.tsx` — info card, progress, dates
- [x] `src/components/client/projects/project-deliverables.tsx` — timeline list with status icons

### 4F. Profile Page — [x] Complete
- [x] `src/app/(client)/profile/page.tsx` — 3 tabs (Informations, Sécurité, Notifications)
- [x] `src/components/client/profile/personal-info-tab.tsx` — form with split name fields
- [x] `src/components/client/profile/security-tab.tsx` — password change form
- [x] `src/components/client/profile/notifications-tab.tsx` — 4 switch toggles with auto-save
- [x] `src/actions/profile.ts` — updateProfile, updatePassword, updateNotificationPreferences
- [x] `src/lib/validations/profile.ts` — Zod v4 schemas

**Verify:** `npm run build` passes ✅

---

## Phase 5: Facturation Stripe [COMPLETE]

> Full billing integration with Stripe. Depends on Phase 4A (types) and Phase 2 (auth).

### 5A. Database: Billing Tables — [x] Complete
- [x] Created Supabase migration `create_billing_tables` via MCP:
  - `invoices` table with RLS + `handle_updated_at()` trigger
  - `payment_methods` table with RLS
  - `stripe_customers` table with RLS
- [x] Updated `src/types/database.ts` with Invoice, PaymentMethod, StripeCustomer types + InvoiceStatus, PaymentMethodType enums
- [x] Updated `src/types/index.ts` to re-export billing types

### 5B. Stripe Server-Side Helpers — [x] Complete
- [x] `src/lib/stripe/customers.ts` — getOrCreateStripeCustomer, getStripeCustomer
- [x] `src/lib/stripe/invoices.ts` — syncInvoicesFromStripe, getInvoice
- [x] `src/lib/stripe/payment-methods.ts` — listPaymentMethods, setDefaultPaymentMethod, detachPaymentMethod
- [x] `src/lib/queries/billing.ts` — getInvoices, getInvoice, getPaymentMethods, getBillingSummary

### 5C. Billing Page — [x] Complete
- [x] `src/app/(client)/billing/page.tsx` — fetches billing summary + invoices + payment methods, 2 tabs
- [x] `src/components/client/billing/billing-summary.tsx` — 4 stat widgets
- [x] `src/components/client/billing/invoices-tab.tsx` — table with status badges and actions
- [x] `src/components/client/billing/payment-methods-tab.tsx` — saved cards list with manage actions

### 5D. Invoice Detail Page — [x] Complete
- [x] `src/app/(client)/billing/[id]/page.tsx` — invoice detail with breadcrumbs

### 5E. Payment Page — [x] Complete
- [x] `src/app/(client)/billing/[id]/pay/page.tsx` — two-column layout
- [x] `src/components/client/billing/payment-form.tsx` — Stripe Elements PaymentElement with 3D Secure
- [x] `src/components/client/billing/payment-summary.tsx` — invoice summary + secure badge
- [x] `src/components/client/billing/stripe-provider.tsx` — loadStripe + Elements wrapper
- [x] `src/actions/billing.ts` — createPaymentIntent, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod
- [x] Installed `@stripe/react-stripe-js` and `@stripe/stripe-js`

### 5F. Stripe Webhook Handler — [x] Complete
- [x] `src/app/api/stripe/webhook/route.ts` — signature verification, handles invoice.paid/created/updated, payment_method.attached/detached, customer.subscription events

### 5G. Stripe Customer Auto-Creation — [x] Complete
- [x] Auto-creates Stripe customer on first billing page visit via getOrCreateStripeCustomer

**Verify:** `npm run build` passes ✅

---

## Phase 6: Support Microsoft Teams [COMPLETE]

> Implements the Teams pass-through support system. Depends on Phase 2 (auth) and Phase 4A (types).

- [x] `src/lib/validations/support.ts` — Zod schema (sujet enum, projectId optional, message min 10)
- [x] `src/actions/support.ts` — `sendSupportMessage()` with auth, Teams webhook, activity_log
- [x] `src/app/(client)/support/page.tsx` — fetches user projects for dropdown
- [x] `src/components/client/support/support-form.tsx` — useActionState form with sujet/project/message fields
- [x] `src/components/client/support/support-confirmation.tsx` — success state with checkmark
- [x] `src/components/client/support/support-alternatives.tsx` — email, call, SLA card

**Verify:** `npm run build` passes ✅

---

## Phase 7: Blog & SEO Pages [COMPLETE]

> Content-heavy phase. Depends on Phase 1C (public layout) and Phase 3H (SEO foundation).

### 7A. Blog System — [x] Complete
- [x] Installed `next-mdx-remote`, `gray-matter`, `reading-time`
- [x] `src/types/blog.ts` — BlogPost interface, BlogCategory type, categoryLabels
- [x] `src/lib/blog.ts` — getAllPosts, getPost, getPostsByCategory, getCategories (reads MDX from src/content/blog/)
- [x] 3 seed blog posts in `src/content/blog/`: pourquoi-coder-site-a-la-main.mdx, wordpress-vs-nextjs-performance.mdx, seo-technique-checklist.mdx
- [x] `src/app/(public)/blog/page.tsx` — listing with URL-based category filter, responsive grid
- [x] `src/app/(public)/blog/[slug]/page.tsx` — article page with generateStaticParams, generateMetadata, JSON-LD (Article + Breadcrumb), related posts
- [x] `src/components/public/blog/blog-card.tsx` — card with category badge, meta row, hover effects
- [x] `src/components/public/blog/blog-category-filter.tsx` — client filter with useRouter/useSearchParams
- [x] `src/components/public/blog/blog-content.tsx` — MDXRemote server component with custom heading/blockquote/code components
- [x] `src/components/public/blog/table-of-contents.tsx` — sticky sidebar TOC with IntersectionObserver active tracking
- [x] `src/components/public/blog/share-buttons.tsx` — LinkedIn, Twitter/X, copy link with toast

### 7B. Conversion Pages — [x] Complete
- [x] `src/lib/validations/audit.ts` — Zod schema (nom, prenom, email, urlSite, secteur, objectif, tailleEntreprise)
- [x] `src/actions/audit.ts` — server action with Teams webhook
- [x] `src/app/(public)/audit-gratuit/page.tsx` — dark hero + two-column form + benefits
- [x] `src/components/public/audit/audit-form.tsx` — useActionState form
- [x] `src/components/public/audit/audit-confirmation.tsx` — success UI with animated checkmark
- [x] `src/app/(public)/process/page.tsx` — 5-step visual timeline
- [x] `src/components/public/process/process-timeline.tsx` — timeline with staggered animations
- [x] `src/app/(public)/garanties/page.tsx` — 6 guarantee cards in responsive grid
- [x] `src/components/public/garanties/guarantee-card.tsx` — icon + title + commitment + description

### 7C. SEO Pillar Pages — [x] Complete (3 pages, trimmed from 5)
- [x] `src/components/public/pillar/pillar-page-layout.tsx` — sticky TOC sidebar + article content
- [x] `src/app/(public)/developpement-site-sur-mesure/page.tsx` — ~800 words, JSON-LD, internal links
- [x] `src/app/(public)/alternative-wordpress-performance/page.tsx` — ~800 words, comparison table
- [x] `src/app/(public)/agence-web-tpe-pme/page.tsx` — ~800 words, 80€/mois model

### 7D. Local SEO Pages — [x] Complete (1 route × 3 cities, trimmed from 3 routes × 8 cities)
- [x] `src/lib/data/cities.ts` — 8 cities data (all data ready, 3 cities active)
- [x] `src/components/public/local/local-page-layout.tsx` — hero, services, why Kaelix, CTA
- [x] `src/app/(public)/agence-web-[ville]/page.tsx` — generateStaticParams for Montpellier, Paris, Lyon

### 7E. Sector Pages — [x] Complete (2 pages, trimmed from 4)
- [x] `src/lib/data/sectors.ts` — 4 sectors data (all data ready, 2 pages active)
- [x] `src/components/public/sector/sector-page-layout.tsx` — problems, features, FAQ accordion
- [x] `src/app/(public)/site-web-restaurant/page.tsx`
- [x] `src/app/(public)/site-vitrine-artisan/page.tsx`

### 7F. Sitemap & robots.txt — [x] Complete
- [x] `src/app/sitemap.ts` — Next.js Metadata API, 30 URLs with priority tiers
- [x] `src/app/robots.ts` — allows public, disallows private routes

**Verify:** `npm run build` passes ✅ (55+ routes, 0 errors)

---

## Phase 8: Polish & Launch

> Final optimization, testing, and deployment. Depends on all previous phases.

### 8A. Performance Optimization

- [ ] Run Lighthouse audit on all key pages (homepage, tarifs, services, dashboard)
- [ ] Target: 95+ on Performance, Accessibility, Best Practices, SEO
- [ ] Optimize images: ensure all images use `next/image` with proper sizing, lazy loading, WebP/AVIF formats
- [ ] Verify font loading: preload Inter + Space Grotesk, `font-display: swap`
- [ ] Code splitting: verify each route only loads necessary JS
- [ ] Check bundle size: identify and tree-shake unused dependencies
- [ ] Add `loading.tsx` files for key routes that need streaming
- [ ] Implement ISR (Incremental Static Regeneration) for blog and portfolio pages if using dynamic data

### 8B. Responsive Testing

- [ ] Test all public pages at 3 breakpoints: mobile (375px), tablet (768px), desktop (1280px)
- [ ] Test client portal at 3 breakpoints
- [ ] Verify public navbar: transparent hero -> solid on scroll (desktop), hamburger menu (mobile)
- [ ] Verify client sidebar: permanent (desktop), hidden (tablet), bottom nav (mobile)
- [ ] Test all forms at mobile width (inputs, selects, textareas should be full width)
- [ ] Test pricing cards stack correctly on mobile
- [ ] Test portfolio grid: 1 col mobile, 2 col tablet, 3 col desktop
- [ ] Test blog grid responsiveness

### 8C. Error Handling — [x] Complete

- [x] Created `src/app/not-found.tsx` -- custom 404 page (Kaelix branded, link to homepage)
- [x] Created `src/app/error.tsx` -- custom error boundary (friendly error message, retry button, link to homepage)
- [x] Created `src/app/(client)/error.tsx` -- client portal error boundary

### 8D. Accessibility Audit

- [ ] Run axe-core or similar tool on all pages
- [ ] Verify all interactive elements have proper focus styles
- [ ] Verify all images have alt text
- [ ] Verify form labels are associated with inputs
- [ ] Verify color contrast ratios meet WCAG AA (especially kaelix-blue on white, kaelix-green on white/black)
- [ ] Verify keyboard navigation works for: navbar, sidebar, tabs, accordion, dialog, dropdown
- [ ] Add skip-to-content link in layouts
- [ ] Verify aria-labels on icon-only buttons

### 8E. SEO Final Audit

- [ ] Validate all JSON-LD with Google Structured Data Testing Tool
- [ ] Verify all pages have unique title and description
- [ ] Verify canonical URLs are correct
- [ ] Verify OG tags render correctly (test with social media debuggers)
- [ ] Verify sitemap.xml is complete and valid
- [ ] Verify robots.txt is correct
- [ ] Check internal linking: pillar pages link to services, services link to portfolio, etc.
- [ ] Verify hreflang if needed (fr)
- [ ] Test meta robots tags on legal pages

### 8F. Animation & Polish

- [ ] Add Framer Motion scroll-triggered animations to homepage sections (fadeIn, slideUp)
- [ ] Add page transition animations for public site navigation
- [ ] Add subtle hover effects on cards (scale, shadow)
- [ ] Add loading animations for form submissions (button spinner)
- [ ] Add success animations for form completions (checkmark)
- [ ] Verify animations respect `prefers-reduced-motion`

### 8G. Security Review

- [ ] Verify all API routes validate input with Zod
- [ ] Verify Stripe webhook signature verification is in place
- [ ] Verify no sensitive data is exposed in client-side code (API keys, service role key)
- [ ] Verify RLS policies are correct on all tables (test with different user contexts)
- [ ] Verify CSRF protection on all forms (Next.js server actions handle this)
- [ ] Verify rate limiting on auth endpoints and form submissions
- [ ] Check for XSS vectors in user-generated content display
- [ ] Verify environment variables are not leaked in build output

### 8H. Deployment

- [ ] Set up Vercel project
- [ ] Configure environment variables in Vercel (all from .env.example)
- [ ] Configure custom domain
- [ ] Set up Stripe live mode keys
- [ ] Configure Stripe webhook endpoint to production URL
- [ ] Configure Teams webhook URL for production
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Run production build locally to verify
- [ ] Deploy to Vercel
- [ ] Verify all pages load correctly in production
- [ ] Test auth flow in production
- [ ] Test Stripe payment flow with live test mode
- [ ] Set up Vercel Analytics (optional)
- [ ] Configure Supabase project for production (connection pooling, backups)

### 8I. Final E2E Testing

- [ ] Test complete user journey: visit homepage -> browse services -> request audit -> receive confirmation
- [ ] Test complete client journey: login -> view dashboard -> check project -> view invoice -> make payment -> contact support -> update profile -> logout
- [ ] Test auth edge cases: wrong password, expired session, OAuth error
- [ ] Test billing edge cases: failed payment, 3D Secure, card decline
- [ ] Test mobile user journey end-to-end
- [ ] Test with slow network simulation (3G throttle)

**Dependencies:** All previous phases complete.
**Verify:** Lighthouse 95+ on all key pages. All user journeys work. Production deployment is live. No console errors. No accessibility violations.

---

## Phase Dependencies Summary

```
Phase 0 (Setup)          [COMPLETE]
    |
Phase 1 (Design System)  [COMPLETE]
    |
    +---> Phase 2 (Auth)         [COMPLETE]
    |                            |
    +---> Phase 3 (Public Pages) [COMPLETE]
              |                  |
              |     Phase 4 (Client Portal)  [COMPLETE]
              |         |
              |     Phase 5 (Stripe)         [COMPLETE]
              |         |
              |     Phase 6 (Support)        [COMPLETE]
              |
         Phase 7 (Blog & SEO)               [COMPLETE]
              |
         Phase 8 (Polish & Launch)           [IN PROGRESS — 8C done]
```

**Remaining:** Phase 8 (Polish & Launch) — 8C done, 8A/8B/8D-8I pending

---

## shadcn/ui Components Needed Per Phase

| Phase | Components Required |
|-------|-------------------|
| 1 | card, input, label, select, textarea, badge, avatar, dropdown-menu, sheet, dialog, tabs, accordion, separator, progress, toast/sonner, table, switch, navigation-menu, breadcrumb, skeleton, tooltip, form, scroll-area |
| 2 | input, label, button (exists), card, toast |
| 3 | card, accordion, badge, tabs, separator, navigation-menu |
| 4 | card, tabs, badge, progress, avatar, table, skeleton, breadcrumb, input, label, switch, toast |
| 5 | card, table, tabs, badge, dialog, skeleton, toast |
| 6 | select, textarea, card, toast |
| 7 | card, badge, accordion, separator |
| 8 | (no new components -- polish existing) |

---

## Notes

- All site content is in **French**. Code and comments are in **English**.
- Placeholder/seed data should be used for portfolio, testimonials, and blog until real content is available.
- The blog system can start with 2-3 MDX seed articles. Real content will be written post-launch.
- Local and sector pages use templated content with unique per-page data (no duplicate content).
- Framer Motion animations should be progressive enhancement (site works without JS animations).
- The Stripe integration uses server-side actions for security. No Stripe secret key in client code.
- Microsoft Teams support is fire-and-forget (pass-through). No message storage.
