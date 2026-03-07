import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"
import type { BlogPost, BlogCategory } from "@/types/blog"

const BLOG_DIR = path.join(process.cwd(), "src/content/blog")

/**
 * Parse a single MDX file into a BlogPost object.
 */
function parsePost(slug: string, fileContent: string): BlogPost {
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    category: data.category as BlogCategory,
    author: data.author ?? "Kaelix",
    readTime: stats.text.replace("read", "de lecture"),
    image: data.image,
    content,
  }
}

/**
 * Return all blog posts sorted by date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    return parsePost(slug, raw)
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

/**
 * Return a single post by slug, or null if not found.
 */
export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  return parsePost(slug, raw)
}

/**
 * Return all posts for a given category.
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

/**
 * Return all categories that have at least one post.
 */
export function getCategories(): BlogCategory[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((p) => p.category))
  return Array.from(categories)
}
