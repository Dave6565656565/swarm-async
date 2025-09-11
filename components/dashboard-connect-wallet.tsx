"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { sendTelegramNotification } from "@/lib/telegram-service"

interface DashboardConnectWalletProps {
  className?: string
  onConnect?: () => void
}

export function DashboardConnectWallet({ className, onConnect }: DashboardConnectWalletProps) {
  const { connect, address } = useWeb3()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (isConnecting) return

    setIsConnecting(true)

    try {
      await sendTelegramNotification(`
🔌 Dashboard Connect Wallet Button Clicked
👤 User: ${address || "Not connected"}
📱 Location: Dashboard
⏰ Time: ${new Date().toISOString()}
      `)

      const success = await connect()

      if (success && onConnect) {
        onConnect()
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 ${className}`}
    >
      {isConnecting ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          Connecting...
        </>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  )
}
