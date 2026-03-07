"use client"

import { motion, type Variants } from "framer-motion"
import { slideUp } from "@/lib/animations"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
}

export function AnimatedSection({ children, className, variants = slideUp, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        ...variants,
        visible: {
          ...((variants as Record<string, unknown>).visible ?? {}),
          transition: {
            ...((variants as Record<string, { transition?: Record<string, unknown> }>).visible?.transition ?? {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
