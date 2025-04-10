"use client"

import { useRouter } from "next/navigation"
import { BaseGradientButton } from "./base-gradient-button"

interface CheckEligibilityButtonProps {
  className?: string
  onCheck?: () => void
  isChecking?: boolean
  inlineCheck?: boolean
}

export function CheckEligibilityButton({
  className = "",
  onCheck,
  isChecking = false,
  inlineCheck = false,
}: CheckEligibilityButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    // If onCheck is provided, use it (for inline eligibility checking)
    if (onCheck && inlineCheck) {
      onCheck()
    } else {
      // Otherwise navigate to the airdrop page which has the eligibility checker
      router.push("/airdrop#eligibility")
    }
  }

  return (
    <BaseGradientButton
      onClick={handleClick}
      className={className}
      isLoading={isChecking}
      trackingName="Check Eligibility"
    >
      Check Eligibility
    </BaseGradientButton>
  )
}
