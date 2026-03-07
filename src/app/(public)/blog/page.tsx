import { Suspense } from "react"
import type { Metadata } from "next"

import { generatePageMetadata } from "@/lib/metadata"
import { organizationSchema, breadcrumbSchema } from "@/lib/structured-data"
import { JsonLd } from "@/components/shared/json-ld"
import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeader } from "@/components/public/section-header"
import { CtaSection } from "@/components/public/cta-section"
import { BlogCard } from "@/components/public/blog/blog-card"
import { BlogCategoryFilter } from "@/components/public/blog/blog-category-filter"
import { getAllPosts, getPostsByCategory, getCategories } from "@/lib/blog"
import type { BlogCategory } from "@/types/blog"

export const metadata: Metadata = generatePageMetadata({
  title: "Blog - Articles & Ressources",
  description:
    "Guides techniques, tendances web, comparatifs et conseils SEO. Retrouvez tous nos articles pour optimiser votre présence en ligne et améliorer les performances de votre site.",
  path: "/blog",
})

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams
  const categories = getCategories()

  const posts =
    category && categories.includes(category as BlogCategory)
      ? getPostsByCategory(category as BlogCategory)
      : getAllPosts()

  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              label="Blog"
              title="Articles & ressources"
              description="Guides techniques, comparatifs, tendances web et conseils SEO pour vous aider à prendre les meilleures décisions pour votre présence en ligne."
              centered
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Category filter + Posts */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <AnimatedSection delay={0.1}>
            <div className="mb-10 flex justify-center">
              <Suspense fallback={null}>
                <BlogCategoryFilter categories={categories} />
              </Suspense>
            </div>
          </AnimatedSection>

          {/* Post grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedSection key={post.slug} delay={0.1 * i}>
                  <BlogCard post={post} className="h-full" />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection delay={0.1}>
              <div className="py-20 text-center">
                <p className="text-lg text-muted-foreground">
                  Aucun article dans cette catégorie pour le moment.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA */}
      <CtaSection />
    </>
  )
}
