"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, LogOut, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ConnectWallet() {
  const { isConnected, address, connect, disconnect, balance, tokenBalances, refreshBalance } = useWeb3()
  const [mounted, setMounted] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleClick = async () => {
    if (isConnected) {
      return // Let the popover handle the interaction
    } else {
      const success = await connect()
      if (success) {
        console.log("Successfully connected to wallet:", address)
      }
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshBalance()
      toast({
        title: "Balance Updated",
        description: "Your wallet balance has been refreshed.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh balance. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard.",
      })
    }
  }

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return ""
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  return (
    <div className="relative">
      {isConnected ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative flex items-center gap-2 pl-2 pr-3 py-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border-purple-600/50 transition-all duration-200"
            >
              <Image src="/images/favcoin.png" alt="Wallet" width={20} height={20} className="rounded-full" />
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium">{formatAddress(address)}</span>
              </div>
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                Connected
              </Badge>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 glassmorphism border-purple-500/30">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Wallet Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Image src="/images/favcoin.png" alt="ETH" width={24} height={24} className="rounded-full" />
                    <div>
                      <p className="font-medium">ETH</p>
                      <p className="text-sm text-muted-foreground">Ethereum</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{balance}</p>
                    <p className="text-sm text-muted-foreground">ETH</p>
                  </div>
                </div>

                {Object.entries(tokenBalances)
                  .filter(([symbol]) => symbol !== "ETH" && Number.parseFloat(tokenBalances[symbol]) > 0)
                  .map(([symbol, amount]) => (
                    <div key={symbol} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                          {symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{amount}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Address:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{formatAddress(address)}</span>
                    <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Etherscan
                  </Button>
                  <Button variant="destructive" size="sm" onClick={disconnect} className="flex-1">
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button
          onClick={handleClick}
          variant="outline"
          className="relative flex items-center gap-2 pl-2 pr-4 py-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border-purple-600/50 transition-all duration-200"
        >
          <Image src="/images/favcoin.png" alt="Wallet" width={20} height={20} className="rounded-full" />
          <span className="text-xs font-medium">Connect Wallet</span>
        </Button>
      )}
    </div>
  )
}
