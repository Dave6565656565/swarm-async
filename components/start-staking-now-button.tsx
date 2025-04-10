"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { sendTelegramNotification } from "@/lib/telegram-service"
import { useWeb3 } from "@/hooks/use-web3"

interface StartStakingNowButtonProps {
  className?: string
  fullWidth?: boolean
  amount?: string
}

export function StartStakingNowButton({
  className = "",
  fullWidth = false,
  amount = "0.1",
}: StartStakingNowButtonProps) {
  const router = useRouter()
  const { isConnected, connect, address } = useWeb3()
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)

    // Send notification to Telegram
    await sendTelegramNotification(`
🚀 <b>Start Staking Now Button Clicked</b>
👤 <b>User:</b> ${address || "Not connected"}
📱 <b>Location:</b> Contract Features section
⏰ <b>Time:</b> ${new Date().toISOString()}
    `)

    // If not connected, connect wallet first
    if (!isConnected) {
      try {
        await connect()
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        setIsLoading(false)
        return
      }
    }

    // Navigate to dashboard with pre-filled amount
    router.push(`/dashboard?tab=stake&amount=${amount}`)
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-md px-4 py-2 font-medium text-white transition-all duration-300
        ${fullWidth ? "w-full" : ""}
        ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        ${className}
      `}
      style={{
        background: isHovered
          ? "linear-gradient(90deg, rgba(147, 51, 234, 1) 0%, rgba(79, 70, 229, 1) 100%)"
          : "linear-gradient(90deg, rgba(124, 58, 237, 1) 0%, rgba(99, 102, 241, 1) 100%)",
        boxShadow: isHovered ? "0 4px 12px rgba(124, 58, 237, 0.5)" : "none",
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Connecting...</span>
        </div>
      ) : (
        "Start Staking Now"
      )}
    </button>
  )
}
