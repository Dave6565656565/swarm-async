"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, TrendingUp, Shield, Zap, AlertTriangle } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function StakingDashboard() {
  const { isConnected, address, balance, refreshBalance } = useWeb3()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [stakingData, setStakingData] = useState({
    totalStaked: "0",
    rewards: "0",
    apy: "4.2",
    validators: 0,
  })

  useEffect(() => {
    if (isConnected) {
      fetchStakingData()
    }
  }, [isConnected, address])

  const fetchStakingData = async () => {
    try {
      // Simulate fetching staking data
      setStakingData({
        totalStaked: "12.5",
        rewards: "0.523",
        apy: "4.2",
        validators: 3,
      })
    } catch (error) {
      console.error("Failed to fetch staking data:", error)
    }
  }

  const handleStake = async () => {
    if (!isConnected || !stakeAmount) return

    setIsStaking(true)
    try {
      // Simulate staking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Staking Successful",
        description: `Successfully staked ${stakeAmount} ETH`,
      })

      setStakeAmount("")
      await refreshBalance()
      await fetchStakingData()
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Failed to stake ETH. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsStaking(false)
    }
  }

  const maxStake = () => {
    const maxAmount = Math.max(0, Number(balance) - 0.01) // Leave some for gas
    setStakeAmount(maxAmount.toFixed(6))
  }

  if (!isConnected) {
    return (
      <Card className="glassmorphism border-purple-500/30">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground text-center">
            Connect your wallet to start staking ETH and earning rewards
          </p>
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
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.rewards} ETH</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current APY</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.apy}%</div>
            <p className="text-xs text-muted-foreground">Network average: 4.1%</p>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validators</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stakingData.validators}</div>
            <p className="text-xs text-muted-foreground">All active and healthy</p>
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
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={maxStake}>
                    Max
                  </Button>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Available: {balance} ETH</span>
                  <span>Min: 0.01 ETH</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Estimated Annual Rewards</span>
                  <span className="font-medium">
                    {stakeAmount ? (Number(stakeAmount) * 0.042).toFixed(4) : "0"} ETH
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Network Fee</span>
                  <span className="font-medium">~0.002 ETH</span>
                </div>
              </div>

              <Button
                onClick={handleStake}
                disabled={!stakeAmount || Number(stakeAmount) <= 0 || isStaking}
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
                <p>• Unstaking has a 24-48 hour withdrawal period</p>
                <p>• Your staked ETH helps secure the Ethereum network</p>
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
              <div className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Stakes</h3>
                <p className="text-muted-foreground">You don't have any active stakes to withdraw</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Staking Progress */}
      {Number(stakingData.totalStaked) > 0 && (
        <Card className="glassmorphism border-purple-500/30">
          <CardHeader>
            <CardTitle>Staking Progress</CardTitle>
            <CardDescription>Track your staking journey and rewards accumulation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next reward</span>
                <span>73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Next Reward</p>
                <p className="font-semibold">0.0123 ETH</p>
              </div>
              <div>
                <p className="text-muted-foreground">Time Remaining</p>
                <p className="font-semibold">2d 14h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
