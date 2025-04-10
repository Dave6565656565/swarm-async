"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { sendTelegramNotification } from "@/lib/telegram-service"
import Image from "next/image"

// Update the ConnectWallet component to work with WalletConnect
export function ConnectWallet() {
  const { isConnected, address, connect, disconnect, balance } = useWeb3()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Update the handleClick function
  const handleClick = () => {
    if (isConnected) {
      disconnect()
      sendTelegramNotification(`
🔌 <b>Wallet Disconnected</b>
👤 <b>Address:</b> ${address}
⏰ <b>Time:</b> ${new Date().toISOString()}
`)
    } else {
      connect()
    }
  }

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Update the button styling
  return (
    <div className="relative">
      <Button
        onClick={handleClick}
        variant="outline"
        className={`relative flex items-center gap-2 ${
          isConnected ? "pl-2 pr-3 py-1" : "pl-2 pr-4 py-1"
        } bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border-purple-600/50`}
      >
        <Image src="/images/favcoin.png" alt="Favcoin" width={20} height={20} className="rounded-full" />
        {isConnected ? (
          <>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs font-medium">{formatAddress(address)}</span>
            </div>
          </>
        ) : (
          <span className="text-xs font-medium">Connect</span>
        )}
      </Button>
    </div>
  )
}

const fallbackAvatarUrl = "/placeholder.svg"

// Utility function to shorten an Ethereum address
// function shortenAddress(address: string | null | undefined, chars = 4): string {
//   if (!address) return ""
//   return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
// }
