import { MDXRemote } from "next-mdx-remote/rsc"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"

/**
 * Generate a URL-safe slug from heading text.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/**
 * Custom MDX components for blog article rendering.
 */
const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const id = slugify(String(children))
    return (
      <h2
        id={id}
        className="group mt-12 mb-4 scroll-mt-24 font-heading text-2xl font-bold tracking-tight text-foreground"
        {...props}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      </h2>
    )
  },
  h3: ({ children, ...props }) => {
    const id = slugify(String(children))
    return (
      <h3
        id={id}
        className="group mt-8 mb-3 scroll-mt-24 font-heading text-xl font-semibold tracking-tight text-foreground"
        {...props}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
      </h3>
    )
  },
  p: ({ children, ...props }) => (
    <p className="mb-4 text-base leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 text-base text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 text-base text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-4 border-kaelix-blue bg-kaelix-blue/5 py-4 pr-4 pl-6 text-base italic text-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-kaelix-black p-4 text-sm text-white"
      {...props}
    >
      {children}
    </pre>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http")
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-kaelix-blue underline underline-offset-4 hover:text-kaelix-blue/80"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href ?? "#"}
        className="font-medium text-kaelix-blue underline underline-offset-4 hover:text-kaelix-blue/80"
        {...props}
      >
        {children}
      </Link>
    )
  },
  hr: (props) => <hr className="my-8 border-border" {...props} />,
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="border-b border-border" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-semibold text-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border-b border-border px-4 py-3 text-muted-foreground" {...props}>
      {children}
    </td>
  ),
}

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="prose-custom">
      <MDXRemote source={content} components={mdxComponents} />
    </article>
  )
}
