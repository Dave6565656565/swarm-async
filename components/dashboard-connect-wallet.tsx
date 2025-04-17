"use client"

import type React from "react"
import { useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { sendTelegramNotification } from "@/lib/telegram-service"
import Image from "next/image"
import { toast } from "@/hooks/use-toast"

interface DashboardConnectWalletProps {
  className?: string
  onConnect?: () => void
}

export function DashboardConnectWallet({ className = "", onConnect }: DashboardConnectWalletProps) {
  const { isConnected, connect, address } = useWeb3()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isConnecting) return

    setIsConnecting(true)

    try {
      console.log("Connecting wallet from dashboard button...")

      // Connect wallet first
      await connect()

      console.log("Wallet connected successfully")

      // Try to send notification to Telegram
      try {
        await sendTelegramNotification(`
🔌 <b>Dashboard Connect Wallet Button Clicked</b>
👤 <b>User:</b> ${address || "Not connected"}
📱 <b>Location:</b> Dashboard center
⏰ <b>Time:</b> ${new Date().toISOString()}
        `)
      } catch (telegramError) {
        // Just log the error but don't block the user experience
        console.error("Failed to send Telegram notification:", telegramError)
      }

      // Call onConnect callback if provided
      if (onConnect) {
        onConnect()
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Base styles
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    gap-3
    px-6
    py-4
    text-lg
    font-medium
    text-white
    rounded-lg
    transition-all
    duration-200
    shadow-lg
    ${isConnecting ? "opacity-90 cursor-not-allowed" : "cursor-pointer"}
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
      disabled={isConnecting}
      className={`${baseStyles} ${gradientStyles}`}
      style={{ cursor: isConnecting ? "not-allowed" : "pointer" }}
    >
      {isConnecting ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Image src="/images/favcoin.png" alt="Favcoin" width={24} height={24} className="rounded-full" />
          <span>{isConnected ? "Dashboard" : "Connect Wallet"}</span>
        </>
      )}
    </button>
  )
}
