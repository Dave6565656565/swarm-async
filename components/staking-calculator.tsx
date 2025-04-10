"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

type StakingPlatform = {
  id: string
  name: string
  apy: number
  logo: string
  description: string
  minStake: number
  lockPeriod: string
}

export function StakingCalculator() {
  const [platforms, setPlatforms] = useState<StakingPlatform[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>("stakeeth")
  const [amount, setAmount] = useState<number>(1)
  const [period, setPeriod] = useState<number>(12) // months
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate rewards
  const calculateRewards = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform)
    if (!platform) return { totalValue: 0, totalRewards: 0 }

    const apy = platform.apy / 100

    // Simple compound interest formula: P(1 + r)^t
    const principal = amount
    const rate = apy
    const time = period / 12 // convert months to years

    const totalValue = principal * Math.pow(1 + rate, time)
    const totalRewards = totalValue - principal

    return {
      totalValue,
      totalRewards,
    }
  }

  const { totalValue, totalRewards } = calculateRewards()

  // Fetch real staking data from API
  useEffect(() => {
    const fetchStakingData = async () => {
      setIsDataLoading(true)
      try {
        // Use fallback data since the API might not be working
        setFallbackData()
      } catch (error) {
        console.error("Failed to fetch staking data:", error)
        setFallbackData()
      } finally {
        setIsDataLoading(false)
      }
    }

    const setFallbackData = () => {
      const fallbackPlatforms = [
        {
          id: "stakeeth",
          name: "StakeETH Portal",
          apy: 15.0,
          logo: "/images/favcoin.png", // Updated to use the correct logo path
          description: "Our premium staking service with highest APY",
          minStake: 0.1,
          lockPeriod: "30 days minimum",
        },
        {
          id: "lido",
          name: "Lido",
          apy: 3.5,
          logo: "https://cryptologos.cc/logos/lido-dao-ldo-logo.png",
          description: "Liquid staking solution for ETH",
          minStake: 0.01,
          lockPeriod: "None (liquid staking)",
        },
        {
          id: "rocketpool",
          name: "Rocket Pool",
          apy: 3.8,
          logo: "https://cryptologos.cc/logos/rocket-pool-rpl-logo.png",
          description: "Decentralized ETH staking protocol",
          minStake: 0.01,
          lockPeriod: "None (liquid staking)",
        },
        {
          id: "coinbase",
          name: "Coinbase",
          apy: 3.2,
          logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-rTabQwk4zCFLL4Rg7jQIDYqe8qZevc.png",
          description: "Staking through Coinbase exchange",
          minStake: 0.001,
          lockPeriod: "Flexible",
        },
        {
          id: "binance",
          name: "Binance",
          apy: 3.6,
          logo: "https://nairametrics.com/wp-content/uploads/2021/08/BNB-Binance-coin.png",
          description: "Staking through Binance exchange",
          minStake: 0.1,
          lockPeriod: "Flexible or locked options",
        },
        {
          id: "kraken",
          name: "Kraken",
          apy: 3.3,
          logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kraken-lockup-new-nobg.jpg-v9WlSolPFbVEMcCkP9wNmeKDzndvsm.jpeg",
          description: "Staking through Kraken exchange",
          minStake: 0.01,
          lockPeriod: "Flexible",
        },
        {
          id: "bitfinex",
          name: "Bitfinex",
          apy: 3.1,
          logo: "https://cryptologos.cc/logos/bitfinex-logo.png?v=029",
          description: "Staking through Bitfinex exchange",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "huobi",
          name: "Huobi",
          apy: 3.4,
          logo: "https://cryptologos.cc/logos/huobi-token-ht-logo.png",
          description: "Staking through Huobi exchange",
          minStake: 0.1,
          lockPeriod: "Flexible or locked options",
        },
        {
          id: "okx",
          name: "OKX",
          apy: 3.2,
          logo: "https://cryptologos.cc/logos/okb-okb-logo.png",
          description: "Staking through OKX exchange",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "kucoin",
          name: "KuCoin",
          apy: 3.0,
          logo: "https://cryptologos.cc/logos/kucoin-token-kcs-logo.png",
          description: "Staking through KuCoin exchange",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "gemini",
          name: "Gemini",
          apy: 3.1,
          logo: "https://cryptologos.cc/logos/gemini-dollar-gusd-logo.png",
          description: "Staking through Gemini exchange",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "blockfi",
          name: "BlockFi",
          apy: 3.0,
          logo: "https://cryptologos.cc/logos/blockfi-logo.png",
          description: "Staking through BlockFi platform",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "celsius",
          name: "Celsius",
          apy: 3.5,
          logo: "https://cryptologos.cc/logos/celsius-network-cel-logo.png",
          description: "Staking through Celsius platform",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "nexo",
          name: "Nexo",
          apy: 3.2,
          logo: "https://cryptologos.cc/logos/nexo-nexo-logo.png",
          description: "Staking through Nexo platform",
          minStake: 0.1,
          lockPeriod: "Flexible",
        },
        {
          id: "stakewise",
          name: "StakeWise",
          apy: 3.7,
          logo: "https://cryptologos.cc/logos/stakewise-swise-logo.png",
          description: "Decentralized ETH staking protocol",
          minStake: 0.01,
          lockPeriod: "None (liquid staking)",
        },
      ]
      setPlatforms(fallbackPlatforms)
    }

    fetchStakingData()
  }, [])

  // Mobile-optimized calculator view
  const MobileCalculator = () => {
    const platform = platforms.find((p) => p.id === selectedPlatform)

    return (
      <div className="space-y-4">
        {/* Quick Results Summary - Always visible at top */}
        <div className="p-4 rounded-lg glassmorphism mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Total Value:</span>
            <span className="font-bold text-lg">{totalValue.toFixed(4)} ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total Rewards:</span>
            <span className="font-bold text-green-500">{totalRewards.toFixed(4)} ETH</span>
          </div>
        </div>

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

            {/* Amount Input */}
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
                onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
                className="glassmorphism border-none mt-1 bg-gray-500/10"
              />
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
                onValueChange={(value) => setPeriod(value[0])}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1m</span>
                <span>5y</span>
              </div>
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
              <div className="mt-2 text-sm text-muted-foreground">{platform?.description || ""}</div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-lg glassmorphism text-xs text-muted-foreground">
          <p>This calculator provides estimates based on current APY rates. Actual returns may vary.</p>
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
          <Tabs defaultValue="calculator">
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
                        onChange={(e) => setAmount(Number.parseFloat(e.target.value) || 0)}
                        className="glassmorphism border-none bg-gray-500/10"
                      />
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
                        onValueChange={(value) => setPeriod(value[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 month</span>
                        <span>5 years</span>
                      </div>
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
                              <div className="mt-2 text-sm text-muted-foreground">{platform.description}</div>
                            </>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-lg glassmorphism">
                      <h3 className="text-lg font-medium mb-4">Staking Summary</h3>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Selected Platform</span>
                          <span className="font-medium flex items-center gap-2">
                            {(() => {
                              const platform = platforms.find((p) => p.id === selectedPlatform)
                              if (!platform) return null

                              if (platform.logo) {
                                return (
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
                                )
                              } else {
                                return <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                              }
                            })()}
                            {platforms.find((p) => p.id === selectedPlatform)?.name || "StakeETH Portal"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current APY</span>
                          <span className="font-medium text-green-500">
                            {platforms.find((p) => p.id === selectedPlatform)?.apy.toFixed(1) || "15.0"}%
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Initial Investment</span>
                          <span className="font-medium">{amount.toFixed(4)} ETH</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Staking Period</span>
                          <span className="font-medium">{period} months</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-muted">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">Total Value</span>
                          <span className="font-bold text-lg">{totalValue.toFixed(4)} ETH</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Rewards</span>
                          <span className="font-bold text-green-500">{totalRewards.toFixed(4)} ETH</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg glassmorphism text-sm text-muted-foreground">
                      <p>
                        This calculator provides estimates based on current APY rates. Actual returns may vary based on
                        market conditions and staking provider.
                      </p>
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
                  <Card
                    key={platform.id}
                    className={`glassmorphism border-none overflow-hidden ${platform.id === "stakeeth" ? "bg-gradient-to-br from-purple-900/30 to-blue-900/30" : ""}`}
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
                          <span className="text-sm text-muted-foreground">1 Year Return on 1 ETH</span>
                          <span className="font-medium text-green-500">
                            {(1 * (1 + platform.apy / 100) - 1).toFixed(4)} ETH
                          </span>
                        </div>
                      </div>

                      {platform.id === "stakeeth" && (
                        <div className="mt-4 p-2 bg-purple-500/20 rounded text-center text-sm">
                          <span className="font-bold">Best APY Available!</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
