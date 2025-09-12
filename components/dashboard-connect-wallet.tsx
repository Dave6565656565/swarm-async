"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Wallet, Shield, TrendingUp, Zap } from "lucide-react"

export function DashboardConnectWallet() {
  const { connect, detectedWallets } = useWeb3()

  const handleConnect = async () => {
    await connect()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md glassmorphism border-purple-500/30">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20">
            <Wallet className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to access the staking dashboard and start earning rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-xs text-muted-foreground">Profitable</p>
            </div>
            <div className="space-y-2">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-xs text-muted-foreground">Fast</p>
            </div>
          </div>

          <Button onClick={handleConnect} className="w-full" size="lg">
            Connect Wallet
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>
              {detectedWallets.length > 0
                ? `${detectedWallets.length} wallet${detectedWallets.length > 1 ? "s" : ""} detected`
                : "No wallets detected - we'll help you get started"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
