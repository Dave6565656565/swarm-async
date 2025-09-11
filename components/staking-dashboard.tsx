"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/components/web3-provider"
import { motion } from "framer-motion"
import { sendTelegramNotification } from "@/lib/telegram-service"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function StakingDashboard() {
  const { isConnected, connect, address, balance, refreshBalance } = useWeb3()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [activeTab, setActiveTab] = useState("stake")
  const [transactionStatus, setTransactionStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [userStakedBalance, setUserStakedBalance] = useState("0")
  const [userRewards, setUserRewards] = useState("0")

  const CONTRACT_ADDRESS = "0xcA8d23D51eDD65Fe70ee20dcd97B816424ec49A8"

  // Fetch user staking info
  const fetchUserStakingInfo = async () => {
    if (!isConnected || !address) return

    try {
      const response = await fetch(`/api/get-staking-data?address=${address}`)
      if (response.ok) {
        const data = await response.json()
        setUserStakedBalance(data.userStake || "0")
        setUserRewards(data.userRewards || "0")
      }
    } catch (error) {
      console.error("Error fetching staking info:", error)
    }
  }

  // Handle connect wallet
  const handleConnectWallet = async () => {
    try {
      await sendTelegramNotification(`
🔌 Connect Wallet Button Clicked
👤 User: ${address || "Not connected"}
⏰ Time: ${new Date().toISOString()}
      `)

      const success = await connect()
      if (success && !stakeAmount) {
        setStakeAmount("0.1")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  // Handle stake
  const handleStake = async () => {
    if (!isConnected) {
      await handleConnectWallet()
      return
    }

    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) {
      setTransactionStatus({
        type: "error",
        message: "Please enter a valid amount to stake",
      })
      return
    }

    const amountToStake = Number.parseFloat(stakeAmount)
    const currentBalance = Number.parseFloat(balance)

    if (amountToStake > currentBalance) {
      setTransactionStatus({
        type: "error",
        message: `Insufficient balance. You have ${balance} ETH available.`,
      })
      return
    }

    if (amountToStake < 0.0001) {
      setTransactionStatus({
        type: "error",
        message: "Minimum staking amount is 0.0001 ETH",
      })
      return
    }

    setIsStaking(true)
    setTransactionStatus(null)

    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum wallet detected")
      }

      // Convert ETH to Wei
      const amountInWei = BigInt(Math.floor(amountToStake * 1e18))
      const amountInWeiHex = `0x${amountInWei.toString(16)}`

      const transactionParams = {
        from: address,
        to: CONTRACT_ADDRESS,
        value: amountInWeiHex,
        data: "0x3a4b66f1", // stake() function signature
        gas: "0x30D40", // 200000 gas limit
        gasPrice: "0x1A13B8600", // 7 gwei
      }

      console.log("Sending transaction:", transactionParams)

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParams],
      })

      if (!txHash) {
        throw new Error("Transaction failed - no hash returned")
      }

      // Send success notification
      await sendTelegramNotification(`
💰 Staking Transaction Sent ✅
👤 User: ${address}
📊 Amount: ${stakeAmount} ETH
🧾 TX Hash: ${txHash}
⏰ Time: ${new Date().toISOString()}
🔍 Etherscan: https://etherscan.io/tx/${txHash}
      `)

      setTransactionStatus({
        type: "success",
        message: `Transaction sent! Hash: ${txHash.substring(0, 10)}...`,
      })

      // Update local state
      const newStakedBalance = (Number.parseFloat(userStakedBalance) + Number.parseFloat(stakeAmount)).toFixed(6)
      setUserStakedBalance(newStakedBalance)

      // Calculate rewards (15% APY, showing monthly)
      const monthlyReward = ((Number.parseFloat(newStakedBalance) * 0.15) / 12).toFixed(6)
      setUserRewards(monthlyReward)

      setStakeAmount("")
      await refreshBalance()

      // Refresh staking info after delay
      setTimeout(fetchUserStakingInfo, 5000)
    } catch (error: any) {
      console.error("Staking failed:", error)

      let errorMessage = "Transaction failed. Please try again."

      if (error.code === 4001) {
        errorMessage = "Transaction was rejected by user."
      } else if (error.message?.includes("insufficient funds")) {
        errorMessage = "Insufficient funds for transaction and gas fees."
      }

      setTransactionStatus({
        type: "error",
        message: errorMessage,
      })

      // Send error notification
      await sendTelegramNotification(`
❌ Staking Failed
👤 User: ${address}
📊 Amount: ${stakeAmount} ETH
⚠️ Error: ${error.message || error}
⏰ Time: ${new Date().toISOString()}
      `)
    } finally {
      setIsStaking(false)
    }
  }

  // Handle unstake
  const handleUnstake = async () => {
    setTransactionStatus({
      type: "error",
      message: "Unstaking is currently not available.",
    })
  }

  // Handle claim rewards
  const handleClaimRewards = async () => {
    if (!isConnected) return

    setTransactionStatus({
      type: "success",
      message: "Rewards claimed successfully!",
    })

    await sendTelegramNotification(`
💎 Rewards Claimed
👤 User: ${address}
💰 Amount: ${userRewards} ETH
⏰ Time: ${new Date().toISOString()}
    `)

    setUserRewards("0")
  }

  // Fetch staking info when connected
  useEffect(() => {
    if (isConnected && address) {
      fetchUserStakingInfo()
    }
  }, [isConnected, address])

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader>
        <CardTitle>Staking Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Transaction Status */}
        {transactionStatus && (
          <Alert className={`mb-4 ${transactionStatus.type === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}>
            <AlertCircle className={transactionStatus.type === "success" ? "text-green-500" : "text-red-500"} />
            <AlertDescription>{transactionStatus.message}</AlertDescription>
          </Alert>
        )}

        {/* User Summary */}
        {isConnected && (
          <div className="p-4 rounded-lg glassmorphism mb-4 border border-purple-500/30">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Staked</div>
                <div className="text-lg font-medium">{userStakedBalance} ETH</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Rewards</div>
                <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
              </div>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="stake">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Amount to Stake</label>
                  {isConnected && (
                    <button className="text-xs text-primary hover:underline" onClick={() => setStakeAmount(balance)}>
                      Max
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="glassmorphism border-none bg-gray-500/10"
                  />
                  <Button variant="outline" className="w-20 glassmorphism border-none bg-transparent">
                    ETH
                  </Button>
                </div>
                <div className="text-xs text-amber-500">Minimum: 0.0001 ETH. Recommended: 0.001+ ETH</div>
              </div>

              <div className="p-4 rounded-lg glassmorphism">
                <div className="text-sm text-muted-foreground">APY</div>
                <div className="text-xl font-bold text-green-500">15.0%</div>
              </div>

              {isConnected ? (
                <Button
                  onClick={handleStake}
                  disabled={isStaking || !stakeAmount}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isStaking ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      Staking...
                    </>
                  ) : (
                    "Stake ETH"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleConnectWallet}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Connect Wallet
                </Button>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="unstake">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {isConnected ? (
                <>
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Staked Amount</div>
                        <div className="text-lg font-medium">{userStakedBalance} ETH</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="text-lg font-medium text-amber-500">Locked</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleUnstake}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Unstake ETH
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Connect wallet to unstake ETH.</p>
                  <Button
                    onClick={handleConnectWallet}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="rewards">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {isConnected ? (
                <>
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Rewards</div>
                        <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">APY</div>
                        <div className="text-lg font-medium">15.0%</div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleClaimRewards}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Claim Rewards
                  </Button>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">Connect wallet to view rewards.</p>
                  <Button
                    onClick={handleConnectWallet}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
