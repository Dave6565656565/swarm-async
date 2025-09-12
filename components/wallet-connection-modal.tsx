"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Loader2 } from "lucide-react"
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
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

  const handleWalletClick = async (walletId: string) => {
    setConnectingWallet(walletId)
    try {
      const success = await onSelectWallet(walletId)
      if (success) {
        onClose()
      }
    } catch (error) {
      console.error("Wallet connection failed:", error)
    } finally {
      setConnectingWallet(null)
    }
  }

  const WalletCard = ({ wallet, isDetected }: { wallet: WalletInfo; isDetected: boolean }) => (
    <Button
      key={wallet.id}
      variant="outline"
      className="h-auto p-4 flex flex-col items-center gap-3 hover:bg-muted/50 transition-all duration-200 relative bg-transparent"
      onClick={() => handleWalletClick(wallet.id)}
      disabled={connectingWallet === wallet.id}
    >
      {isDetected && <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">Detected</Badge>}

      <div className="relative">
        <Image
          src={wallet.icon || "/placeholder.svg"}
          alt={wallet.name}
          width={48}
          height={48}
          className="rounded-lg"
        />
        {connectingWallet === wallet.id && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="font-medium text-sm">{wallet.name}</div>
        <div className="text-xs text-muted-foreground mt-1">{wallet.description}</div>
        <Badge variant="secondary" className="mt-2 text-xs">
          {wallet.category}
        </Badge>
      </div>

      {!isDetected && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <ExternalLink className="h-3 w-3" />
          Install
        </div>
      )}
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl glassmorphism border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Connect Your Wallet</DialogTitle>
          <p className="text-center text-muted-foreground">
            Choose your preferred wallet to connect to the staking platform
          </p>
        </DialogHeader>

        <Tabs defaultValue="detected" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detected">Detected ({detectedWallets.length})</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="detected" className="mt-6">
            {detectedWallets.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {detectedWallets.map((wallet) => (
                  <WalletCard key={wallet.id} wallet={wallet} isDetected={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-muted-foreground mb-4">No wallets detected</div>
                <p className="text-sm text-muted-foreground">
                  Install a wallet extension or check the Popular tab for more options
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularWallets.map((wallet) => {
                const isDetected = detectedWallets.some((d) => d.id === wallet.id)
                return <WalletCard key={wallet.id} wallet={wallet} isDetected={isDetected} />
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By connecting a wallet, you agree to our{" "}
            <a href="/terms" className="underline hover:no-underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
