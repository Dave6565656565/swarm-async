"use client"

import { Share2 } from "lucide-react"
import { BaseGradientButton } from "./base-gradient-button"

interface ShareLinkButtonProps {
  link: string
  className?: string
  onShare?: () => void
}

export function ShareLinkButton({ link, className = "", onShare }: ShareLinkButtonProps) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join StakeETH Portal",
          text: "Stake your ETH and earn rewards. Use my referral link:",
          url: link,
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(link)
        alert("Link copied to clipboard!")
      }

      // Call the provided onShare callback if it exists
      if (onShare) {
        onShare()
      }
    } catch (error) {
      console.error("Failed to share:", error)
    }
  }

  return (
    <BaseGradientButton
      onClick={handleShare}
      className={className}
      icon={<Share2 className="h-4 w-4" />}
      iconPosition="left"
      trackingName="Share Your Link"
    >
      Share Your Link
    </BaseGradientButton>
  )
}
