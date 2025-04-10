"use client"

import { BaseGradientButton } from "./base-gradient-button"

interface RegisterAirdropButtonProps {
  className?: string
  onRegister?: () => void
  isRegistering?: boolean
  type?: "button" | "submit"
}

export function RegisterAirdropButton({
  className = "",
  onRegister,
  isRegistering = false,
  type = "submit",
}: RegisterAirdropButtonProps) {
  return (
    <BaseGradientButton
      onClick={onRegister}
      className={className}
      isLoading={isRegistering}
      type={type}
      trackingName="Register for Airdrop"
    >
      Register for Airdrop
    </BaseGradientButton>
  )
}
