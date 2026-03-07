export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string // ISO date
  category: BlogCategory
  author: string
  readTime: string
  image?: string
  content: string // raw MDX
}

export type BlogCategory =
  | "guides"
  | "tendances"
  | "etudes-de-cas"
  | "seo"
  | "comparatifs"

export const categoryLabels: Record<BlogCategory, string> = {
  guides: "Guides techniques",
  tendances: "Tendances web",
  "etudes-de-cas": "Études de cas",
  seo: "Conseils SEO",
  comparatifs: "Comparatifs",
}
