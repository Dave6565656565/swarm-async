"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, TrendingUp, Shield, Zap, AlertTriangle, Wallet } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const STAKING_CONTRACT_ADDRESS = "0xcA8d23D51eDD65Fe70ee20dcd97B816424ec49A8"

export function StakingDashboard() {
  const { isConnected, address, balance, refreshBalance, sendTransaction, connect } = useWeb3()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [stakingData, setStakingData] = useState({
    totalStaked: "0.000000",
    rewards: "0.000000",
    apy: "0.0",
    validators: 0,
  })

  useEffect(() => {
    if (isConnected && address) {
      fetchStakingData()
    }
  }, [isConnected, address])

  const fetchStakingData = async () => {
    if (!address) return

    try {
      const response = await fetch(`/api/get-staking-data?address=${address}`)
      if (response.ok) {
        const data = await response.json()
        setStakingData({
          totalStaked: data.userStake || "0.000000",
          rewards: data.userRewards || "0.000000",
          apy: data.apy || "0.0",
          validators: data.validators || 0,
        })
      }
    } catch (error) {
      console.error("Failed to fetch staking data:", error)
    }
  }

  const validateStakeAmount = (amount: string): string | null => {
    const numAmount = Number(amount)
    const numBalance = Number(balance)

    if (!amount || numAmount <= 0) {
      return "Please enter a valid amount"
    }

    if (numAmount < 0.001) {
      return "Minimum staking amount is 0.001 ETH"
    }

    if (numAmount > numBalance) {
      return `Insufficient balance. You have ${balance} ETH available`
    }

    // Leave some ETH for gas fees
    if (numAmount > numBalance - 0.01) {
      return "Please leave some ETH for transaction fees (at least 0.01 ETH)"
    }

    return null
  }

  const handleStake = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    const validationError = validateStakeAmount(stakeAmount)
    if (validationError) {
      toast({
        title: "Invalid Amount",
        description: validationError,
        variant: "destructive",
      })
      return
    }

    setIsStaking(true)
    try {
      console.log(`Attempting to stake ${stakeAmount} ETH`)

      // Send the staking transaction
      const txHash = await sendTransaction(STAKING_CONTRACT_ADDRESS, stakeAmount, "0x3a4b66f1") // stake() function signature

      toast({
        title: "Transaction Sent",
        description: `Staking transaction sent! Hash: ${txHash.substring(0, 10)}...`,
      })

      // Clear the input
      setStakeAmount("")

      // Refresh balance and staking data
      await refreshBalance()
      setTimeout(fetchStakingData, 5000) // Wait a bit for the transaction to be mined

      console.log("Staking transaction successful:", txHash)
    } catch (error: any) {
      console.error("Staking failed:", error)

      let errorMessage = "Transaction failed. Please try again."

      if (error.code === 4001) {
        errorMessage = "Transaction was rejected by user."
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction and gas fees."
      } else if (error.message?.includes("gas")) {
        errorMessage = "Gas estimation failed. Please try again."
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Transaction was cancelled."
      }

      toast({
        title: "Staking Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsStaking(false)
    }
  }

  const handleUnstake = async () => {
    toast({
      title: "Coming Soon",
      description: "Unstaking functionality will be available soon.",
    })
  }

  const maxStake = () => {
    const maxAmount = Math.max(0, Number(balance) - 0.01) // Leave 0.01 ETH for gas
    setStakeAmount(maxAmount.toFixed(6))
  }

  const handleAmountChange = (value: string) => {
    // Only allow valid number input
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setStakeAmount(value)
    }
  }

  if (!isConnected) {
    return (
      <Card className="glassmorphism border-purple-500/30">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Wallet className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground text-center mb-6">
            Connect your wallet to start staking ETH and earning rewards
          </p>
          <Button onClick={connect} className="bg-gradient-to-r from-purple-600 to-blue-600">
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staked</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.totalStaked} ETH</div>
            <p className="text-xs text-muted-foreground">Your staked amount</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.rewards} ETH</div>
            <p className="text-xs text-muted-foreground">Accumulated rewards</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.apy}%</div>
            <p className="text-xs text-muted-foreground">Annual percentage yield</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance} ETH</div>
            <p className="text-xs text-muted-foreground">Ready to stake</p>
          </CardContent>
        </Card>
      </div>

      {/* Staking Interface */}
      <Tabs defaultValue="stake" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stake">Stake ETH</TabsTrigger>
          <TabsTrigger value="unstake">Unstake ETH</TabsTrigger>
        </TabsList>

        <TabsContent value="stake" className="space-y-4">
          <Card className="glassmorphism border-purple-500/30">
            <CardHeader>
              <CardTitle>Stake ETH</CardTitle>
              <CardDescription>Stake your ETH to earn rewards and help secure the Ethereum network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stake-amount">Amount to Stake</Label>
                <div className="flex space-x-2">
                  <Input
                    id="stake-amount"
                    type="text"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={maxStake} disabled={Number(balance) <= 0.01}>
                    Max
                  </Button>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Available: {balance} ETH</span>
                  <span>Min: 0.001 ETH</span>
                </div>
              </div>

              {stakeAmount && validateStakeAmount(stakeAmount) && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{validateStakeAmount(stakeAmount)}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Network Fee</span>
                  <span className="font-medium">~0.002-0.005 ETH</span>
                </div>
              </div>

              <Button
                onClick={handleStake}
                disabled={!stakeAmount || !!validateStakeAmount(stakeAmount) || isStaking}
                className="w-full"
              >
                {isStaking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Staking...
                  </>
                ) : (
                  "Stake ETH"
                )}
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Staking rewards are distributed automatically</p>
                <p>• Minimum staking amount is 0.001 ETH</p>
                <p>• Transaction fees will be deducted from your balance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unstake" className="space-y-4">
          <Card className="glassmorphism border-purple-500/30">
            <CardHeader>
              <CardTitle>Unstake ETH</CardTitle>
              <CardDescription>Withdraw your staked ETH and accumulated rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Number(stakingData.totalStaked) > 0 ? (
                <>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Staked Amount</div>
                        <div className="text-lg font-medium">{stakingData.totalStaked} ETH</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Rewards</div>
                        <div className="text-lg font-medium text-green-500">{stakingData.rewards} ETH</div>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleUnstake} className="w-full">
                    Unstake ETH
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Stakes</h3>
                  <p className="text-muted-foreground">You don't have any active stakes to withdraw</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
