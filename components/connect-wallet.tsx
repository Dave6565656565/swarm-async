"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Update the ConnectWallet component to work with WalletConnect
export function ConnectWallet() {
  const { isConnected, address, connect, disconnect, balance, tokenBalances } = useWeb3()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Update the handleClick function
  const handleClick = async () => {
    if (isConnected) {
      disconnect()
    } else {
      // Try to connect and wait for the result
      const success = await connect()

      if (success) {
        console.log("Successfully connected to wallet:", address)
      } else {
        console.log("Wallet connection initiated but not yet completed")
      }
    }
  }

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Update the button styling
  return (
    <div className="relative">
      {isConnected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative flex items-center gap-2 pl-2 pr-3 py-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border-purple-600/50"
            >
              <Image src="/images/favcoin.png" alt="Favcoin" width={20} height={20} className="rounded-full" />
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                <span className="text-xs font-medium">{formatAddress(address)}</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Your Assets</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src="/images/favcoin.png" alt="ETH" width={20} height={20} className="rounded-full" />
                  <span>ETH</span>
                </div>
                <span className="font-medium">{balance}</span>
              </div>
              {Object.entries(tokenBalances)
                .filter(([symbol]) => symbol !== "ETH" && Number.parseFloat(tokenBalances[symbol]) > 0) // Skip ETH and zero balances
                .map(([symbol, amount]) => (
                  <div key={symbol} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        {symbol.charAt(0)}
                      </div>
                      <span>{symbol}</span>
                    </div>
                    <span className="font-medium">{amount}</span>
                  </div>
                ))}
              <hr className="my-2" />
              <div className="text-xs text-gray-500 mb-2">
                <a
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {formatAddress(address)} ↗
                </a>
              </div>
              <Button variant="destructive" size="sm" className="w-full" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          onClick={handleClick}
          variant="outline"
          className="relative flex items-center gap-2 pl-2 pr-4 py-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border-purple-600/50"
        >
          <Image src="/images/favcoin.png" alt="Favcoin" width={20} height={20} className="rounded-full" />
          <span className="text-xs font-medium">Connect</span>
        </Button>
      )}
    </div>
  )
}

const fallbackAvatarUrl = "/placeholder.svg"
