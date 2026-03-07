import Link from "next/link"
import { Linkedin, Twitter, Github } from "lucide-react"

import { siteConfig, footerLinks } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-tight"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-white/60">{siteConfig.tagline}</p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-kaelix-blue"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-kaelix-blue"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 transition-colors hover:text-kaelix-blue"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-kaelix-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-kaelix-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white/80">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-white/60 transition-colors hover:text-kaelix-blue"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="text-sm text-white/60 transition-colors hover:text-kaelix-blue"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <span className="text-sm text-white/60">
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Tous droits
            r&eacute;serv&eacute;s.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/40 transition-colors hover:text-kaelix-blue"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
