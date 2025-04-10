"use client"

import { StartStakingNowButton } from "./start-staking-now-button"

interface StartStakingButtonProps {
  className?: string
  size?: "default" | "sm" | "lg"
}

export function StartStakingButton({ className = "", size = "default" }: StartStakingButtonProps) {
  // Size mapping for padding classes
  const sizeClasses = {
    default: "",
    sm: "py-2 px-3 text-sm",
    lg: "py-4 px-6 text-lg",
  }

  return <StartStakingNowButton className={`${sizeClasses[size]} ${className}`} fullWidth={false} />
}
