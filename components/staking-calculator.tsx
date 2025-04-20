"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Share2, Wallet, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type StakingPlatform = {
  id: string
  name: string
  apy: number
  logo: string
  description: string
  minStake: number
  lockPeriod: string
  riskScore?: number
}

type CompoundFrequency = "daily" | "weekly" | "monthly" | "yearly"

export function StakingCalculator() {
  const [platforms, setPlatforms] = useState<StakingPlatform[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>("stakeeth")
  const [amount, setAmount] = useState<number>(1)
  const [period, setPeriod] = useState<number>(12) // months
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [compoundFrequency, setCompoundFrequency] = useState<CompoundFrequency>("monthly")
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>("calculator")
  const amountInputRef = useRef<HTMLInputElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fix for iOS keyboard dismissal
  useEffect(() => {
    const input = document.getElementById("mobile-amount") as HTMLInputElement
    if (input) {
      const handleTouchEnd = (e: TouchEvent) => {
        e.preventDefault()
        input.focus()
      }
      input.addEventListener("touchend", handleTouchEnd)
      return () => input.removeEventListener("touchend", handleTouchEnd)
    }
  }, [])

  // Fetch ETH price
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        const data = await response.json()
        setEthPrice(data.ethereum.usd)
      } catch (error) {
        console.error("Failed to fetch ETH price:", error)
        // Fallback price if API fails
        setEthPrice(3500)
      }
    }

    fetchEthPrice()
    const interval = setInterval(fetchEthPrice, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Calculate rewards with compound frequency
  const calculateRewards = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform)
    if (!platform) return { totalValue: 0, totalRewards: 0 }

    const apy = platform.apy / 100
    const principal = amount
    const time = period / 12 // convert months to years

    let compoundsPerYear = 12 // Monthly default
    if (compoundFrequency === "daily") compoundsPerYear = 365
    if (compoundFrequency === "weekly") compoundsPerYear = 52
    if (compoundFrequency === "yearly") compoundsPerYear = 1

    // Compound interest formula: P(1 + r/n)^(nt)
    const totalValue = principal * Math.pow(1 + apy / compoundsPerYear, compoundsPerYear * time)
    const totalRewards = totalValue - principal

    return {
      totalValue,
      totalRewards,
    }
  }

  const { totalValue, totalRewards } = calculateRewards()
  const rewardPercentage = Math.min((totalRewards / amount) * 100, 100) // Cap at 100% for visual purposes

  // Handle swipe gestures for tab switching
  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX === null) return

    const endX = e.changedTouches[0].clientX
    const diff = swipeStartX - endX

    // If swipe distance is significant
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTab === "calculator") {
        // Swipe left: calculator -> comparison
        setActiveTab("comparison")
      } else if (diff < 0 && activeTab === "comparison") {
        // Swipe right: comparison -> calculator
        setActiveTab("calculator")
      }
    }

    setSwipeStartX(null)
  }

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" })

        // Get user's ETH balance
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [accounts[0], "latest"],
          })

          // Convert from wei to ETH
          const ethBalance = Number.parseInt(balance, 16) / 1e18
          setAmount(Number.parseFloat(ethBalance.toFixed(4)))
        }
      } catch (error) {
        console.error("Error connecting wallet:", error)
        alert("Failed to connect wallet. Please make sure MetaMask is installed and unlocked.")
      }
    } else {
      alert("Please install MetaMask to use this feature!")
    }
  }

  // Social sharing function
  const handleShare = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform)
    const { totalRewards: rewards } = calculateRewards()
    const text = `I'm staking ${amount} ETH on ${platform?.name || "StakeETH"} for ${rewards.toFixed(4)} ETH rewards (${(rewards * ethPrice).toFixed(2)} USD)! Calculate your rewards with the ToGo Calculator.`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, "_blank")
  }

  // Handle slider change with haptic feedback
  const handleSliderChange = (value: number[]) => {
    setPeriod(value[0])
    // Provide haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  // Fetch platform data with reliable logo handling
  useEffect(() => {
    const fetchStakingData = async () => {
      setIsDataLoading(true)
      try {
        // Use our hardcoded platforms with specific logo URLs
        setPlatforms(getFallbackPlatforms())
      } catch (error) {
        console.error("Failed to fetch staking data:", error)
        // Use fallback data if something goes wrong
        setPlatforms(getFallbackPlatforms())
      } finally {
        setIsDataLoading(false)
      }
    }

    fetchStakingData()

    // Cache the data in localStorage for offline use
    const cachedData = localStorage.getItem("stakingPlatforms")
    if (cachedData) {
      setPlatforms(JSON.parse(cachedData))
      setIsDataLoading(false)
    }
  }, [])

  // Save platforms to localStorage when they change
  useEffect(() => {
    if (platforms.length > 0) {
      localStorage.setItem("stakingPlatforms", JSON.stringify(platforms))
    }
  }, [platforms])

  // Fallback platform data
  const getFallbackPlatforms = (): StakingPlatform[] => {
    return [
      {
        id: "stakeeth",
        name: "StakeETH Portal",
        apy: 15.0,
        logo: "/images/favcoin.png",
        description: "Our premium staking service with highest APY",
        minStake: 0.1,
        lockPeriod: "Flexible",
        riskScore: 2,
      },
      {
        id: "lido",
        name: "Lido",
        apy: 3.5,
        logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png",
        description: "Liquid staking solution for ETH",
        minStake: 0.01,
        lockPeriod: "None (liquid staking)",
        riskScore: 3,
      },
      {
        id: "rocketpool",
        name: "Rocket Pool",
        apy: 3.8,
        logo: "https://docs.rocketpool.net/images/logo.png",
        description: "Decentralized ETH staking protocol",
        minStake: 0.01,
        lockPeriod: "None (liquid staking)",
        riskScore: 2,
      },
      {
        id: "binance",
        name: "Binance",
        apy: 3.6,
        logo: "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png",
        description: "Staking through Binance exchange",
        minStake: 0.1,
        lockPeriod: "Flexible or locked options",
        riskScore: 4,
      },
      {
        id: "coinbase",
        name: "Coinbase",
        apy: 3.2,
        logo: "https://cdn.iconscout.com/icon/free/png-256/free-coinbase-logo-icon-download-in-svg-png-gif-file-formats--web-crypro-trading-platform-logos-pack-icons-7651204.png",
        description: "Staking through Coinbase exchange",
        minStake: 0.001,
        lockPeriod: "Flexible",
        riskScore: 4,
      },
      {
        id: "kraken",
        name: "Kraken",
        apy: 3.3,
        logo: "https://99bitcoins.com/wp-content/uploads/2025/04/Kraken-Wallet.jpg",
        description: "Staking through Kraken exchange",
        minStake: 0.01,
        lockPeriod: "Flexible",
        riskScore: 3,
      },
      {
        id: "stakewise",
        name: "StakeWise",
        apy: 3.7,
        logo: "https://coin-images.coingecko.com/coins/images/15044/large/stakewise200.png?1696514703",
        description: "Decentralized ETH staking protocol",
        minStake: 0.01,
        lockPeriod: "None (liquid staking)",
        riskScore: 2,
      },
    ]
  }

  // Mobile-optimized calculator view
  const MobileCalculator = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform)
    const { totalRewards: rewards } = calculateRewards()

    return (
      <div className="space-y-4">
        {/* Quick Results Summary - Always visible at top */}
        <motion.div
          className="p-4 rounded-lg glassmorphism mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Value:</span>
            <motion.span
              className="font-bold text-lg"
              key={totalValue.toString()}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
            >
              {totalValue.toFixed(4)} ETH
            </motion.span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Rewards:</span>
            <motion.span
              className="font-bold text-green-500"
              key={totalRewards.toString()}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3 }}
            >
              {rewards.toFixed(4)} ETH
            </motion.span>
          </div>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>USD Value:</span>
            <span>${(totalRewards * ethPrice).toFixed(2)}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 pt-1">
            <Progress
              value={rewardPercentage}
              className="h-2"
              aria-label={`${rewardPercentage.toFixed(1)}% return on investment`}
            />
            <div className="flex justify-between text-xs mt-1 text-muted-foreground">
              <span>0%</span>
              <span>{rewardPercentage.toFixed(1)}% ROI</span>
            </div>
          </div>
        </motion.div>

        {/* Main Inputs - Compact Form */}
        <div className="p-4 rounded-lg glassmorphism">
          <div className="space-y-3">
            {/* Platform Selection */}
            <div>
              <Label htmlFor="mobile-platform" className="text-sm">
                Platform
              </Label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="glassmorphism border-none mt-1">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      <div className="flex items-center gap-2">
                        {p.logo ? (
                          <img
                            src={p.logo || "/placeholder.svg"}
                            alt={p.name}
                            className="w-5 h-5 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                            }}
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                        )}
                        <span>
                          {p.name} ({p.apy.toFixed(1)}%)
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input with Quick Presets */}
            <div>
              <Label htmlFor="mobile-amount" className="text-sm">
                Amount (ETH)
              </Label>
              <Input
                id="mobile-amount"
                type="number"
                min="0.1"
                step="0.1"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === "") {
                    setAmount(0)
                  } else {
                    setAmount(Number.parseFloat(value) || 0)
                  }
                }}
                onFocus={(e) => e.target.select()}
                className="glassmorphism border-none mt-1 bg-gray-500/10"
                inputMode="decimal"
              />

              {/* Quick Presets */}
              <div className="flex gap-2 mt-2">
                {[0.1, 1, 10, 32].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      amount === preset ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {preset} ETH
                  </button>
                ))}
              </div>
            </div>

            {/* Period Slider */}
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="mobile-period" className="text-sm">
                  Period
                </Label>
                <span className="text-xs">{period} months</span>
              </div>
              <Slider
                id="mobile-period"
                min={1}
                max={60}
                step={1}
                value={[period]}
                onValueChange={handleSliderChange}
                className="py-2 touch-manipulation"
                aria-label={`Staking period: ${period} months`}
                aria-valuemin={1}
                aria-valuemax={60}
                aria-valuenow={period}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1m</span>
                <span>5y</span>
              </div>
            </div>

            {/* Compound Frequency */}
            <div>
              <Label htmlFor="mobile-compound" className="text-sm">
                Compound Frequency
              </Label>
              <Select
                value={compoundFrequency}
                onValueChange={(value) => setCompoundFrequency(value as CompoundFrequency)}
              >
                <SelectTrigger id="mobile-compound" className="glassmorphism border-none mt-1">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Platform APY - Always visible */}
          <div className="mt-3 pt-3 border-t border-muted">
            <div className="flex justify-between items-center">
              <span className="text-sm">Current APY</span>
              <span className="font-medium text-green-500">{platform?.apy.toFixed(1) || "0.0"}%</span>
            </div>
          </div>
        </div>

        {/* Expandable Platform Details */}
        <div className="rounded-lg glassmorphism overflow-hidden">
          <button onClick={() => setShowDetails(!showDetails)} className="w-full p-3 flex justify-between items-center">
            <span className="font-medium">Platform Details</span>
            {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {showDetails && (
            <div className="p-4 pt-0 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Min Stake</span>
                <span className="font-medium">{platform?.minStake || 0} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lock Period</span>
                <span className="font-medium">{platform?.lockPeriod || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Risk Score</span>
                <span className="font-medium">{platform?.riskScore || 3}/5</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{platform?.description || ""}</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={connectWallet}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            aria-label="Connect wallet to prefill ETH amount"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
          <Button
            onClick={handleShare}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
            aria-label="Share your calculation on Twitter"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader>
        <CardTitle>Ethereum Staking Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        {isDataLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Tabs
            defaultValue="calculator"
            value={activeTab}
            onValueChange={setActiveTab}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <TabsList className="glassmorphism border-none mb-6">
              <TabsTrigger value="calculator">Calculator</TabsTrigger>
              <TabsTrigger value="comparison">Platform Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              {isMobile ? (
                <MobileCalculator />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Select Staking Platform</Label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger className="glassmorphism border-none">
                          <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform.id} value={platform.id}>
                              <div className="flex items-center gap-2">
                                {platform.logo ? (
                                  <img
                                    src={platform.logo || "/placeholder.svg"}
                                    alt={platform.name}
                                    className="w-5 h-5 rounded-full"
                                    onError={(e) => {
                                      // Fallback to a white placeholder if image fails to load
                                      e.currentTarget.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                                    }}
                                  />
                                ) : (
                                  <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                                )}
                                <span>
                                  {platform.name} ({platform.apy.toFixed(1)}% APY)
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount to Stake (ETH)</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={amount}
                        onChange={(e) => {
                          const value = e.target.value
                          if (value === "") {
                            setAmount(0)
                          } else {
                            setAmount(Number.parseFloat(value) || 0)
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        className="glassmorphism border-none bg-gray-500/10"
                        inputMode="decimal"
                      />

                      {/* Quick Presets */}
                      <div className="flex gap-2 mt-2">
                        {[0.1, 1, 10, 32].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                              amount === preset ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                            }`}
                          >
                            {preset} ETH
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="period">Staking Period</Label>
                        <span className="text-sm text-muted-foreground">{period} months</span>
                      </div>
                      <Slider
                        id="period"
                        min={1}
                        max={60}
                        step={1}
                        value={[period]}
                        onChange={(value) => setPeriod(value[0])}
                        className="py-4"
                        aria-label={`Staking period: ${period} months`}
                        aria-valuemin={1}
                        aria-valuemax={60}
                        aria-valuenow={period}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 month</span>
                        <span>5 years</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="compound-frequency">Compound Frequency</Label>
                      <Select
                        value={compoundFrequency}
                        onValueChange={(value) => setCompoundFrequency(value as CompoundFrequency)}
                      >
                        <SelectTrigger id="compound-frequency" className="glassmorphism border-none">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-4 rounded-lg glassmorphism">
                      <h3 className="text-lg font-medium mb-2">Platform Details</h3>
                      <div className="space-y-2">
                        {(() => {
                          const platform = platforms.find((p) => p.id === selectedPlatform)
                          if (!platform) return null

                          return (
                            <>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">APY</span>
                                <span className="font-medium text-green-500">{platform.apy.toFixed(1)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Minimum Stake</span>
                                <span className="font-medium">{platform.minStake} ETH</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Lock Period</span>
                                <span className="font-medium">{platform.lockPeriod}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Risk Score</span>
                                <span className="font-medium">{platform.riskScore || 3}/5</span>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">{platform.description}</div>
                            </>
                          )
                        })()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={connectWallet} className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </Button>
                      <Button onClick={handleShare} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Results
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comparison">
              <Alert className="mb-4 bg-blue-500/20">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <AlertDescription>
                  Compare different staking platforms to find the best option for your needs. StakeETH Portal offers the
                  highest APY in the market.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: platforms.indexOf(platform) * 0.1 }}
                  >
                    <Card
                      className={`glassmorphism border-none overflow-hidden h-full ${platform.id === "stakeeth" ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30" : ""}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          {platform.logo ? (
                            <img
                              src={platform.logo || "/placeholder.svg"}
                              alt={platform.name}
                              className="w-10 h-10 rounded-full"
                              onError={(e) => {
                                // Fallback to a white placeholder if image fails to load
                                e.currentTarget.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                              }}
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                              {platform.name.charAt(0)}
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold">{platform.name}</h3>
                            <p className="text-sm text-muted-foreground">Ethereum Staking</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">APY</span>
                            <span className="font-medium text-green-500">{platform.apy.toFixed(1)}%</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Min Stake</span>
                            <span className="font-medium">{platform.minStake} ETH</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Lock Period</span>
                            <span className="font-medium">{platform.lockPeriod}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Risk Score</span>
                            <span className="font-medium">{platform.riskScore || 3}/5</span>
                          </div>
                        </div>

                        {platform.id === "stakeeth" && (
                          <div className="mt-4 p-2 bg-purple-500/20 rounded text-center text-sm">
                            <span className="font-bold">Best APY Available!</span>
                          </div>
                        )}

                        <Button
                          className="w-full mt-4"
                          onClick={() => {
                            setSelectedPlatform(platform.id)
                            setActiveTab("calculator")
                          }}
                        >
                          Calculate with {platform.name}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
