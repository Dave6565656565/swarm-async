"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

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

  // Update the handleWalletSelect function to better handle wallet selection
  const handleWalletSelect = async (walletName: string) => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue")
      return
    }

    if (onSelectWallet) {
      try {
        const success = await onSelectWallet(walletName)
        if (success) {
          // Only close the modal if connection was successful
          onClose()
        }
      } catch (error) {
        console.error("Error selecting wallet:", error)
        // Keep the modal open if there was an error
      }
    }
  }

  const handleMoreOptions = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue")
      return
    }

    // Close our modal first
    onClose()

    // Use the browser's native wallet selector
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // This will trigger the browser's wallet selection UI
        await window.ethereum.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.error("Error requesting accounts:", error)
      }
    } else if (onSelectWallet) {
      // If no ethereum provider is available, fallback to WalletConnect
      handleWalletSelect("WalletConnect")
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
              className="flex w-full items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              onClick={() => handleWalletSelect(wallet.name)}
            >
              <div className="flex items-center gap-3">
                {wallet.icon && wallet.icon.startsWith("data:") ? (
                  <div
                    className="h-8 w-8 rounded-md"
                    dangerouslySetInnerHTML={{
                      __html:
                        wallet.name === "WalletConnect"
                          ? `<svg width="32" height="32" viewBox="0 0 300 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M60.102 30.226C104.096 -10.0753 175.904 -10.0753 219.898 30.226L226.307 36.017C228.275 37.8364 228.275 40.9596 226.307 42.779L197.76 69.0133C196.776 70.4232 194.926 70.4232 193.942 69.0133L184.735 60.5532C154.489 32.7726 125.511 32.7726 95.2649 60.5532L85.3067 69.7369C84.3227 71.1468 82.4727 71.1468 81.4887 69.7369L52.9416 43.5026C50.9736 41.6832 50.9736 38.56 52.9416 36.7406L60.102 30.226ZM242.342 51.3466L267.951 74.9866C269.919 76.806 269.919 79.9292 267.951 81.7486L200.293 144.015C198.325 145.834 195.377 145.834 193.409 144.015C193.409 144.015 193.409 144.015 193.409 144.015L143.562 98.0574C143.07 97.3524 142.145 97.3524 141.653 98.0574C141.653 98.0574 141.653 98.0574 141.653 98.0574L101.891 144.015C99.923 145.834 96.975 145.834 95.007 144.015C95.007 144.015 95.007 144.015 95.007 144.015L27.3491 81.7486C25.3811 79.9292 25.3811 76.806 27.3491 74.9866L52.9581 51.3466C54.9261 49.5272 57.8741 49.5272 59.8421 51.3466L109.689 97.3042C110.181 98.0092 111.106 98.0092 111.598 97.3042C111.598 97.3042 111.598 97.3042 111.598 97.3042L151.36 51.3466C153.328 49.5272 156.276 49.5272 158.244 51.3466C158.244 51.3466 158.244 51.3466 158.244 51.3466L208.091 97.3042C208.583 98.0092 209.508 98.0092 210 97.3042C210 97.3042 210 97.3042 210 97.3042L259.847 51.3466C261.815 49.5272 264.763 49.5272 266.731 51.3466L242.342 51.3466Z" fill="#3B99FC"/>
                      </svg>`
                          : `<img src="${wallet.icon}" alt="${wallet.name}" class="h-8 w-8 rounded-md" />`,
                    }}
                  />
                ) : (
                  <div className="h-8 w-8 overflow-hidden rounded-md">
                    <img
                      src={wallet.icon || "/placeholder.svg"}
                      alt={wallet.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <span className="font-medium">{wallet.name}</span>
              </div>
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: wallet.color }} />
            </button>
          ))}

          {/* More Options Button - This will trigger the browser's native wallet selector */}
          <button
            className="flex w-full items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
            onClick={handleMoreOptions}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                <PlusCircle className="h-5 w-5 text-gray-600" />
              </div>
              <span className="font-medium">More Options</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </button>
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
