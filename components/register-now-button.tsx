"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BaseGradientButton } from "./base-gradient-button"

interface RegisterNowButtonProps {
  className?: string
  href: string
}

export function RegisterNowButton({ className = "", href }: RegisterNowButtonProps) {
  return (
    <Link href={href} className="w-full">
      <BaseGradientButton
        className={className}
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
        trackingName="Register Now"
      >
        Register Now
      </BaseGradientButton>
    </Link>
  )
}
