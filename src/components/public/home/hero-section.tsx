"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { fadeIn, slideUp } from "@/lib/animations"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-kaelix-black pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-36">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-kaelix-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-[300px] w-[500px] rounded-full bg-kaelix-green/5 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70">
            <span className="inline-block size-2 rounded-full bg-kaelix-green" />
            Crafted Code, Proven Performance
          </span>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={slideUp}
          className="mx-auto mt-8 max-w-4xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          Des sites{" "}
          <span className="text-kaelix-blue">3x plus rapides</span>
          , codés à la main
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            ...slideUp,
            visible: { ...slideUp.visible, transition: { duration: 0.5, delay: 0.1 } },
          }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl"
        >
          Finis les templates WordPress. Kaelix conçoit des sites sur mesure,
          performants et évolutifs.
        </motion.p>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={{
            ...slideUp,
            visible: { ...slideUp.visible, transition: { duration: 0.5, delay: 0.15 } },
          }}
          className="mt-4 text-sm font-medium text-kaelix-green sm:text-base"
        >
          À partir de 80&nbsp;€/mois, sans frais d&apos;entrée
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            ...slideUp,
            visible: { ...slideUp.visible, transition: { duration: 0.5, delay: 0.2 } },
          }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            render={<Link href="/audit-gratuit" />}
            size="lg"
            className="bg-kaelix-blue px-6 text-white hover:bg-kaelix-blue/90 border-transparent"
          >
            Audit Gratuit
            <ArrowRight className="ml-1 size-4" />
          </Button>
          <Button
            render={<Link href="/realisations" />}
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 hover:text-white"
          >
            Voir nos réalisations
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
