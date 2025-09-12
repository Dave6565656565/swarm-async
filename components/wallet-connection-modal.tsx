"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, ExternalLink, Smartphone, Monitor, HardDrive, Zap } from "lucide-react"
import Image from "next/image"

type WalletInfo = {
  name: string
  id: string
  icon: string
  color: string
  downloadUrl: string
  description: string
  category: string
}

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  detectedWallets: WalletInfo[]
  popularWallets: WalletInfo[]
  onSelectWallet: (walletId: string) => Promise<boolean>
}

export function WalletConnectionModal({
  isOpen,
  onClose,
  detectedWallets,
  popularWallets,
  onSelectWallet,
}: WalletConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

  const handleWalletClick = async (walletId: string) => {
    setIsConnecting(true)
    setConnectingWallet(walletId)

    try {
      const success = await onSelectWallet(walletId)
      if (success) {
        onClose()
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
    } finally {
      setIsConnecting(false)
      setConnectingWallet(null)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "hardware":
        return <HardDrive className="h-4 w-4" />
      case "protocol":
        return <Zap className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const renderWalletButton = (wallet: WalletInfo, isDetected = false) => {
    const isWalletConnect = wallet.id === "walletconnect"

    return (
      <Button
        key={wallet.id}
        variant="outline"
        className="w-full h-auto p-4 justify-start gap-3 glassmorphism border-gray-600/30 hover:border-purple-500/50 transition-all duration-200 bg-transparent relative group"
        onClick={() => handleWalletClick(wallet.id)}
        disabled={isConnecting}
      >
        <div className="flex items-center gap-3 flex-1">
          {isConnecting && connectingWallet === wallet.id ? (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : isWalletConnect ? (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: wallet.color }}
              dangerouslySetInnerHTML={{
                __html: atob(wallet.icon.split(",")[1]),
              }}
            />
          ) : (
            <div className="w-10 h-10 relative">
              <Image
                src={wallet.icon || "/placeholder.svg"}
                alt={wallet.name}
                fill
                className="object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const parent = target.parentElement!
                  parent.innerHTML = `<div class="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-sm font-bold">${wallet.name.charAt(0)}</div>`
                }}
              />
            </div>
          )}

          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {isConnecting && connectingWallet === wallet.id ? "Connecting..." : wallet.name}
              </span>
              {isDetected && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Detected
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{wallet.description}</p>
          </div>

          <div className="flex items-center gap-2">
            {getCategoryIcon(wallet.category)}
            {!isDetected && <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </div>
        </div>
      </Button>
    )
  }

  const installedWallets = detectedWallets.filter((wallet) => wallet.id !== "walletconnect")
  const walletConnectOption = detectedWallets.find((wallet) => wallet.id === "walletconnect")
  const notInstalledWallets = popularWallets.filter(
    (wallet) => !detectedWallets.some((detected) => detected.id === wallet.id),
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg glassmorphism border-purple-500/30 max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Connect Wallet</DialogTitle>
          <p className="text-center text-sm text-muted-foreground">
            Choose how you want to connect. If you don't have a wallet, you can select a provider and create one.
          </p>
        </DialogHeader>

        <Tabs defaultValue="detected" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detected">
              Detected ({installedWallets.length + (walletConnectOption ? 1 : 0)})
            </TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="detected" className="space-y-3 mt-4 max-h-[400px] overflow-y-auto">
            {installedWallets.length === 0 && !walletConnectOption ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No wallets detected</p>
                <p className="text-sm text-muted-foreground">
                  Install a wallet extension or use WalletConnect to connect your mobile wallet
                </p>
              </div>
            ) : (
              <>
                {installedWallets.map((wallet) => renderWalletButton(wallet, true))}
                {walletConnectOption && (
                  <>
                    {installedWallets.length > 0 && (
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                      </div>
                    )}
                    {renderWalletButton(walletConnectOption, true)}
                  </>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="popular" className="space-y-3 mt-4 max-h-[400px] overflow-y-auto">
            {notInstalledWallets.map((wallet) => renderWalletButton(wallet, false))}
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-muted-foreground mt-4 pt-4 border-t">
          By connecting a wallet, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
          .
        </div>
      </DialogContent>
    </Dialog>
  )
}
