"use client"

import { useState } from "react"
import { useWeb3 } from "@/hooks/use-web3"
import { sendTelegramNotification } from "@/lib/telegram-service"
import { useRouter } from "next/navigation"

interface ConnectWalletButtonProps {
  className?: string
  size?: "default" | "sm" | "lg"
}

export function ConnectWalletButton({ className = "", size = "default" }: ConnectWalletButtonProps) {
  const router = useRouter()
  const { isConnected, connect, address } = useWeb3()
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Replace the handleClick function with this improved version
  const handleClick = async () => {
    if (isLoading) return

    setIsLoading(true)

    try {
      // Send notification to Telegram
      await sendTelegramNotification(`
🔌 <b>Connect Wallet Button Clicked</b>
👤 <b>User:</b> ${address || "Not connected"}
📱 <b>Location:</b> Hero section
⏰ <b>Time:</b> ${new Date().toISOString()}
    `)

      // If already connected, go to dashboard
      if (isConnected) {
        router.push("/dashboard")
        return
      }

      // If not connected, connect wallet
      const connected = await connect()
      console.log("Connection result:", connected)

      if (connected) {
        // After connecting, go to dashboard
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Determine gradient colors based on hover state
  const gradientFrom = isHovering ? "from-purple-700" : "from-purple-600"
  const gradientTo = isHovering ? "to-blue-700" : "to-blue-600"

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isLoading}
      className={`
        relative inline-flex items-center justify-center px-6 py-3 
        text-base font-medium text-white rounded-lg
        bg-gradient-to-r ${gradientFrom} ${gradientTo}
        shadow-lg hover:shadow-xl transition-all duration-200
        cursor-pointer
        ${isLoading ? "opacity-80" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Connecting...
        </div>
      ) : (
        "Connect Wallet"
      )}
    </button>
  )
}
