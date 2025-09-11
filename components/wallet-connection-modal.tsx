"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface WalletOption {
  name: string
  color: string
  icon: string
}

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  walletOptions: WalletOption[]
  otherWalletOptions: WalletOption[]
  onSelectWallet: (walletName: string) => Promise<boolean>
}

export function WalletConnectionModal({
  isOpen,
  onClose,
  walletOptions = [],
  otherWalletOptions = [],
  onSelectWallet,
}: WalletConnectionModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

  const handleWalletSelect = async (walletName: string) => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue")
      return
    }

    if (isConnecting) return

    setIsConnecting(true)
    setConnectingWallet(walletName)

    try {
      const success = await onSelectWallet(walletName)
      if (success) {
        onClose()
      }
    } catch (error) {
      console.error("Error selecting wallet:", error)
    } finally {
      setIsConnecting(false)
      setConnectingWallet(null)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              className="flex w-full items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors disabled:opacity-50"
              onClick={() => handleWalletSelect(wallet.name)}
              disabled={isConnecting}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-md">
                  <img
                    src={wallet.icon || "/placeholder.svg"}
                    alt={wallet.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      target.parentElement!.innerHTML = `<div class="h-8 w-8 rounded-md bg-gray-200 flex items-center justify-center text-xs font-bold">${wallet.name.charAt(0)}</div>`
                    }}
                  />
                </div>
                <span className="font-medium">{wallet.name}</span>
                {isConnecting && connectingWallet === wallet.name && (
                  <div className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                )}
              </div>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: wallet.color }} />
            </button>
          ))}

          <div className="text-center text-sm text-muted-foreground">
            Don't have a wallet? Install{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MetaMask
            </a>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-4">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the terms and conditions
            </Label>
            <p className="text-xs text-muted-foreground">
              By connecting, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
