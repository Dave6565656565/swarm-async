"use client"

import { useWeb3 } from "./web3-provider"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ExternalLink, LogOut, Wallet } from "lucide-react"

export function WalletAssetsDisplay() {
  const { isConnected, address, balance, tokenBalances, disconnect } = useWeb3()
  const [isOpen, setIsOpen] = useState(false)

  if (!isConnected || !address) {
    return null
  }

  // Format address for display
  const shortAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`

  // Format ETH balance
  const formattedEthBalance = Number.parseFloat(balance).toFixed(4)

  // Get etherscan link
  const etherscanLink = `https://etherscan.io/address/${address}`

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-100">
          <Wallet className="h-4 w-4" />
          <span>{formattedEthBalance} ETH</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Connected Wallet</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                disconnect()
                setIsOpen(false)
              }}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Disconnect
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{shortAddress}</span>
            <a
              href={etherscanLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-sm font-medium mb-2">Assets</h4>
          <div className="space-y-2">
            {Object.entries(tokenBalances).map(([symbol, amount]) => (
              <div key={symbol} className="flex justify-between items-center">
                <span className="text-sm">{symbol}</span>
                <span className="text-sm font-medium">{Number.parseFloat(amount).toFixed(4)}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
