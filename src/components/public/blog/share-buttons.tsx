"use client"

import { useCallback, useState } from "react"
import { Linkedin, Twitter, LinkIcon, Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareOnLinkedIn = useCallback(() => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }, [url])

  const shareOnTwitter = useCallback(() => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }, [title, url])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Lien copié dans le presse-papier")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Impossible de copier le lien")
    }
  }, [url])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">
        Partager :
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={shareOnLinkedIn}
        aria-label="Partager sur LinkedIn"
      >
        <Linkedin className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={shareOnTwitter}
        aria-label="Partager sur X (Twitter)"
      >
        <Twitter className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={copyLink}
        aria-label="Copier le lien"
      >
        {copied ? (
          <Check className="size-4 text-kaelix-green" />
        ) : (
          <LinkIcon className="size-4" />
        )}
      </Button>
    </div>
  )
}
