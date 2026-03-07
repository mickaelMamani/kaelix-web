import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react"

import { generatePageMetadata } from "@/lib/metadata"
import {
  articleSchema,
  breadcrumbSchema,
} from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { BlogContent } from "@/components/public/blog/blog-content"
import { BlogCard } from "@/components/public/blog/blog-card"
import { ShareButtons } from "@/components/public/blog/share-buttons"
import { TableOfContents } from "@/components/public/blog/table-of-contents"
import { Button } from "@/components/ui/button"
import { getAllPosts, getPost } from "@/lib/blog"
import { categoryLabels } from "@/types/blog"
import { siteConfig } from "@/lib/constants"

// Category badge color map (same as blog-card)
const categoryColors: Record<string, string> = {
  guides: "bg-kaelix-blue/10 text-kaelix-blue",
  tendances:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  "etudes-de-cas":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  seo: "bg-kaelix-green/10 text-green-700 dark:text-kaelix-green",
  comparatifs:
    "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString))
}

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return generatePageMetadata({
      title: "Article introuvable",
      description: "Cet article n'existe pas ou a été supprimé.",
      path: `/blog/${slug}`,
    })
  }

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
  })
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  // Get related articles (other posts, max 3)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const articleUrl = `/blog/${post.slug}`
  const fullUrl = `${siteConfig.url}${articleUrl}`

  return (
    <>
      <JsonLd
        data={articleSchema(
          post.title,
          post.excerpt,
          articleUrl,
          post.date,
          post.date,
          post.author
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: articleUrl },
        ])}
      />

      {/* Article header */}
      <section className="pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            {/* Back link */}
            <div className="mb-8">
              <Button
                render={<Link href="/blog" />}
                variant="ghost"
                size="sm"
              >
                <ArrowLeft className="mr-1 size-4" />
                Retour au blog
              </Button>
            </div>

            {/* Category badge */}
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                categoryColors[post.category] ??
                "bg-muted text-muted-foreground"
              }`}
            >
              {categoryLabels[post.category]}
            </span>

            {/* Title */}
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readTime}
              </span>
            </div>

            {/* Share buttons */}
            <div className="mt-6">
              <ShareButtons title={post.title} url={fullUrl} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article content with table of contents */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            {/* Main content */}
            <AnimatedSection delay={0.1}>
              <div className="mx-auto max-w-3xl">
                <BlogContent content={post.content} />
              </div>
            </AnimatedSection>

            {/* Table of contents sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents content={post.content} />
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <SectionHeader
                label="À lire aussi"
                title="Articles similaires"
                centered
              />
            </AnimatedSection>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost, i) => (
                <AnimatedSection key={relatedPost.slug} delay={0.1 * i}>
                  <BlogCard post={relatedPost} className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CtaSection />
    </>
  )
}
