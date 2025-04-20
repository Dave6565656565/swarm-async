"use client"

import { useState, useEffect, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Edit, Trash2, Wallet, Plus, RefreshCw } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchCryptoData, FALLBACK_PRICES } from "@/lib/price-service"
import Link from "next/link"

// Define types
export type Holding = {
  id: string
  symbol: string
  name: string
  amount: number
  priceUsd: number
  valueUsd: number
  color: string
  logoUrl?: string
}

export type HoldingFormData = {
  symbol: string
  name: string
  amount: string
}

// Cryptocurrency names
const CRYPTO_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  USDC: "USD Coin",
  BNB: "Binance Coin",
  SOL: "Solana",
  XRP: "XRP",
  ADA: "Cardano",
  AVAX: "Avalanche",
  DOGE: "Dogecoin",
  DOT: "Polkadot",
  LINK: "Chainlink",
  MATIC: "Polygon",
  UNI: "Uniswap",
  LTC: "Litecoin",
  SHIB: "Shiba Inu",
  ATOM: "Cosmos",
  XLM: "Stellar",
  FIL: "Filecoin",
  TRX: "Tron",
}

// Color mapping for the pie chart
const CRYPTO_COLORS: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  USDT: "#26A17B",
  USDC: "#2775CA",
  BNB: "#F3BA2F",
  SOL: "#14F195",
  XRP: "#23292F",
  ADA: "#0033AD",
  AVAX: "#E84142",
  DOGE: "#C2A633",
  DOT: "#E6007A",
  LINK: "#2A5ADA",
  MATIC: "#8247E5",
  UNI: "#FF007A",
  LTC: "#345D9D",
  SHIB: "#F6A900",
  ATOM: "#2E3148",
  XLM: "#14B6E7",
  FIL: "#0090FF",
  TRX: "#FF0013",
}

// Sample data for initial state
const INITIAL_HOLDINGS: Holding[] = []

// Fallback prices if API fails
const CRYPTO_PRICES: Record<string, number> = FALLBACK_PRICES

export default function PortfolioTracker() {
  const { isConnected, address, balance, connect, tokenBalances } = useWeb3()
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [activeTab, setActiveTab] = useState("holdings")
  const [totalValue, setTotalValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ symbol: "", name: "", amount: "" })
  const [selectedCoin, setSelectedCoin] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({})

  // Load holdings from localStorage and fetch prices/logos on mount
  useEffect(() => {
    const loadHoldings = async () => {
      setLoading(true)
      const savedHoldings = localStorage.getItem("crypto-holdings")
      let initialHoldings: Holding[] = []

      if (savedHoldings) {
        try {
          initialHoldings = JSON.parse(savedHoldings)
        } catch (e) {
          console.error("Failed to parse saved holdings", e)
          initialHoldings = INITIAL_HOLDINGS
        }
      } else {
        initialHoldings = INITIAL_HOLDINGS
      }

      // Get all symbols to fetch data for
      const symbols = initialHoldings.map((h) => h.symbol)

      try {
        // Fetch current prices and logos
        const { prices, logos } = await fetchCryptoData(symbols)

        // Update holdings with current prices and logos
        const updatedHoldings = initialHoldings.map((holding) => {
          const price = prices[holding.symbol] || holding.priceUsd
          return {
            ...holding,
            priceUsd: price,
            valueUsd: holding.amount * price,
            color: holding.color || CRYPTO_COLORS[holding.symbol] || `hsl(${Math.random() * 360}, 70%, 60%)`,
            logoUrl: logos[holding.symbol] || holding.logoUrl || "",
          }
        })

        setHoldings(updatedHoldings)
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error)
        setHoldings(initialHoldings)
        setError("Failed to fetch current prices. Using cached values.")
      }

      setLoading(false)
    }

    loadHoldings()
  }, [])

  // Calculate total value whenever holdings change
  useEffect(() => {
    const total = holdings.reduce((sum, holding) => sum + (holding.valueUsd || 0), 0)
    setTotalValue(total)

    // Save to localStorage
    if (holdings.length > 0) {
      localStorage.setItem("crypto-holdings", JSON.stringify(holdings))
    }
  }, [holdings])

  // Import wallet balances when connected
  useEffect(() => {
    if (isConnected && address && tokenBalances && Object.keys(tokenBalances).length > 0) {
      // Check if we already have these tokens in our holdings
      const existingSymbols = new Set(holdings.map((h) => h.symbol))

      // Create new holdings from wallet balances
      const walletHoldings: Holding[] = []
      const symbols: string[] = []

      Object.entries(tokenBalances).forEach(([symbol, amount]) => {
        if (!existingSymbols.has(symbol) && amount && Number.parseFloat(amount) > 0) {
          symbols.push(symbol)
          walletHoldings.push({
            id: uuidv4(),
            symbol,
            name: CRYPTO_NAMES[symbol] || symbol,
            amount: Number.parseFloat(amount),
            priceUsd: FALLBACK_PRICES[symbol] || 0,
            valueUsd: Number.parseFloat(amount) * (FALLBACK_PRICES[symbol] || 0),
            color: CRYPTO_COLORS[symbol] || `hsl(${Math.random() * 360}, 70%, 60%)`,
            logoUrl: "",
          })
        }
      })

      if (walletHoldings.length > 0) {
        setHoldings((prev) => [...prev, ...walletHoldings])

        // Fetch data for new wallet holdings
        const fetchWalletData = async () => {
          try {
            const { prices, logos } = await fetchCryptoData(symbols)

            setHoldings((prevHoldings) =>
              prevHoldings.map((holding) => {
                if (symbols.includes(holding.symbol) && prices[holding.symbol]) {
                  return {
                    ...holding,
                    priceUsd: prices[holding.symbol],
                    valueUsd: holding.amount * prices[holding.symbol],
                    logoUrl: logos[holding.symbol] || "",
                  }
                }
                return holding
              }),
            )
          } catch (error) {
            console.error("Failed to fetch wallet token data:", error)
          }
        }

        fetchWalletData()
      }
    }
  }, [isConnected, address, tokenBalances])

  // Periodic price updates (every 5 minutes)
  useEffect(() => {
    if (holdings.length === 0) return

    const updatePrices = async () => {
      try {
        const symbols = holdings.map((h) => h.symbol)
        const { prices, logos } = await fetchCryptoData(symbols)

        setHoldings((prevHoldings) =>
          prevHoldings.map((holding) => {
            if (prices[holding.symbol]) {
              return {
                ...holding,
                priceUsd: prices[holding.symbol],
                valueUsd: holding.amount * prices[holding.symbol],
                logoUrl: logos[holding.symbol] || holding.logoUrl || "",
              }
            }
            return holding
          }),
        )
      } catch (error) {
        console.error("Failed to update prices:", error)
      }
    }

    // Initial update
    updatePrices()

    // Set up interval for updates
    const interval = setInterval(updatePrices, 5 * 60 * 1000) // Every 5 minutes

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [holdings.length])

  // Handle coin selection
  const handleCoinSelect = useCallback((value: string) => {
    setSelectedCoin(value)
    if (value) {
      setFormData({
        symbol: value,
        name: CRYPTO_NAMES[value] || value,
        amount: "",
      })
    }
  }, [])

  // Add a new holding
  const handleAddHolding = useCallback(async () => {
    if (!formData.symbol || !formData.name || !formData.amount) {
      setError("All fields are required")
      return
    }

    const symbolUpper = formData.symbol.toUpperCase()
    const amount = Number.parseFloat(formData.amount)

    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number")
      return
    }

    setError(null)

    try {
      // Fetch current data for this symbol
      const { prices, logos } = await fetchCryptoData([symbolUpper])
      const price = prices[symbolUpper] || FALLBACK_PRICES[symbolUpper] || 0

      if (price === 0) {
        setError(`Could not get price for ${symbolUpper}. Please try another asset.`)
        return
      }

      const newHolding: Holding = {
        id: uuidv4(),
        symbol: symbolUpper,
        name: formData.name,
        amount: amount,
        priceUsd: price,
        valueUsd: amount * price,
        color: CRYPTO_COLORS[symbolUpper] || `hsl(${Math.random() * 360}, 70%, 60%)`,
        logoUrl: logos[symbolUpper] || "",
      }

      setHoldings((prev) => [...prev, newHolding])
      setFormData({ symbol: "", name: "", amount: "" })
      setSelectedCoin("")
      setShowAddForm(false)
    } catch (error) {
      console.error("Error adding holding:", error)
      setError("Failed to add asset. Please try again.")
    }
  }, [formData])

  // Update holding amount
  const handleUpdateHolding = useCallback((id: string, amount: number) => {
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number")
      return
    }

    setError(null)
    setHoldings((prevHoldings) =>
      prevHoldings.map((holding) =>
        holding.id === id ? { ...holding, amount, valueUsd: amount * holding.priceUsd } : holding,
      ),
    )
    setEditingId(null)
  }, [])

  // Remove a holding
  const handleRemoveHolding = useCallback((id: string) => {
    setHoldings((prevHoldings) => prevHoldings.filter((holding) => holding.id !== id))
  }, [])

  // Import all wallet balances
  const importWalletBalances = useCallback(async () => {
    if (!isConnected || !tokenBalances) return

    const newHoldings: Holding[] = []
    const symbols: string[] = []

    // Add ETH balance
    if (balance && Number.parseFloat(balance) > 0) {
      symbols.push("ETH")
      newHoldings.push({
        id: uuidv4(),
        symbol: "ETH",
        name: "Ethereum",
        amount: Number.parseFloat(balance),
        priceUsd: 0,
        valueUsd: 0,
        color: CRYPTO_COLORS.ETH,
        logoUrl: "",
      })
    }

    // Add other token balances
    Object.entries(tokenBalances).forEach(([symbol, amount]) => {
      if (symbol !== "ETH" && amount && Number.parseFloat(amount) > 0) {
        symbols.push(symbol)
        newHoldings.push({
          id: uuidv4(),
          symbol,
          name: CRYPTO_NAMES[symbol] || symbol,
          amount: Number.parseFloat(amount),
          priceUsd: 0,
          valueUsd: 0,
          color: CRYPTO_COLORS[symbol] || `hsl(${Math.random() * 360}, 70%, 60%)`,
          logoUrl: "",
        })
      }
    })

    const { prices, logos } = await fetchCryptoData(symbols)
    const updatedHoldings = newHoldings.map((holding) => {
      const price = prices[holding.symbol] || CRYPTO_PRICES[holding.symbol] || 0
      return {
        ...holding,
        priceUsd: price,
        valueUsd: holding.amount * price,
        logoUrl: logos[holding.symbol] || "",
      }
    })

    if (updatedHoldings.length > 0) {
      setHoldings(updatedHoldings)
    }
  }, [isConnected, balance, tokenBalances])

  // Refresh prices for all holdings
  const refreshPrices = useCallback(async () => {
    if (holdings.length === 0) return

    setIsRefreshing(true)
    setError(null)

    try {
      const symbols = holdings.map((h) => h.symbol)
      const { prices, logos } = await fetchCryptoData(symbols)

      setHoldings((prevHoldings) =>
        prevHoldings.map((holding) => {
          if (prices[holding.symbol]) {
            return {
              ...holding,
              priceUsd: prices[holding.symbol],
              valueUsd: holding.amount * prices[holding.symbol],
              logoUrl: logos[holding.symbol] || holding.logoUrl || "",
            }
          }
          return holding
        }),
      )
    } catch (error) {
      console.error("Failed to refresh prices:", error)
      setError("Failed to refresh prices. Please try again later.")
    } finally {
      setIsRefreshing(false)
    }
  }, [holdings])

  if (loading) {
    return <div className="text-center py-10">Loading portfolio...</div>
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold">Portfolio Value</h2>
              <p className="text-3xl font-bold">
                ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-500">Assets</span>
              <span className="text-lg font-semibold">{holdings.length}</span>
            </div>
          </div>

          {/* Refresh Prices Button */}
          <Button
            onClick={refreshPrices}
            className="w-full mb-2 bg-green-600 hover:bg-green-700"
            disabled={isRefreshing || holdings.length === 0}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing Prices..." : "Refresh Prices"}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="mb-2 p-2 bg-red-50 text-red-600 text-sm rounded border border-red-200">{error}</div>
          )}

          {/* Wallet Connection Button */}
          {!isConnected ? (
            <Button onClick={connect} className="w-full mt-2 bg-gradient-to-r from-blue-500 to-purple-600">
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          ) : (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Connected Wallet</p>
                  <p className="font-mono text-xs truncate w-32 md:w-48">
                    {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">ETH Balance</p>
                  <p className="font-semibold">{Number.parseFloat(balance).toFixed(4)} ETH</p>
                </div>
              </div>
              <Button onClick={importWalletBalances} className="w-full mt-2 bg-blue-500" size="sm">
                <RefreshCw className="mr-2 h-3 w-3" /> Import Wallet Balances
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="grid grid-cols-3 mb-4 w-full">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="holdings">
          {!showAddForm ? (
            <Button className="w-full mb-4 bg-blue-500 hover:bg-blue-600" onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          ) : (
            <Card className="mb-4">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Add New Asset</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Cryptocurrency</label>
                    <Select value={selectedCoin} onValueChange={handleCoinSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a coin" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(CRYPTO_NAMES).map(([symbol, name]) => (
                          <SelectItem key={symbol} value={symbol}>
                            {symbol} - {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Symbol</label>
                    <input
                      type="text"
                      placeholder="BTC"
                      className="w-full p-2 border rounded"
                      value={formData.symbol}
                      onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Bitcoin"
                      className="w-full p-2 border rounded"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount</label>
                    <input
                      type="number"
                      placeholder="0.5"
                      className="w-full p-2 border rounded"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleAddHolding}>
                    Add Asset
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Your Assets</h2>
              {holdings.length > 0 ? (
                <div className="space-y-6">
                  {holdings.map((holding) => (
                    <div key={holding.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden"
                            style={{ backgroundColor: holding.color }}
                          >
                            {holding.logoUrl ? (
                              <img
                                src={holding.logoUrl || "/placeholder.svg"}
                                alt={holding.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                  e.currentTarget.nextSibling!.style.display = "block"
                                }}
                              />
                            ) : (
                              <span className="text-white font-bold">{holding.symbol.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-lg">{holding.symbol}</div>
                            <div className="text-sm text-gray-500">{holding.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${holding.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                          <div className="text-sm text-gray-500">
                            {holding.amount.toLocaleString(undefined, { maximumFractionDigits: 8 })} × $
                            {holding.priceUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>

                      {editingId === holding.id ? (
                        <div className="mt-2 flex items-center space-x-2">
                          <input
                            type="number"
                            defaultValue={holding.amount}
                            className="flex-1 p-2 border rounded"
                            id={`edit-amount-${holding.id}`}
                          />
                          <Button
                            size="sm"
                            onClick={() => {
                              const amount = Number.parseFloat(
                                (document.getElementById(`edit-amount-${holding.id}`) as HTMLInputElement).value,
                              )
                              handleUpdateHolding(holding.id, amount)
                            }}
                          >
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setEditingId(holding.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                            onClick={() => handleRemoveHolding(holding.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-gray-500">No assets added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <Card>
            <CardContent className="pt-6">
              {holdings.length > 0 ? (
                <PieChart holdings={holdings} totalValue={totalValue} />
              ) : (
                <p className="text-center py-4 text-gray-500">Add assets to see charts</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <div className="space-y-4">
                <Achievement
                  title="Portfolio Builder"
                  description="Add your first asset"
                  isCompleted={holdings.length > 0}
                />
                <Achievement
                  title="Diversified Investor"
                  description="Hold at least 3 different assets"
                  isCompleted={holdings.length >= 3}
                />
                <Achievement
                  title="Crypto Whale"
                  description="Reach $100,000 in portfolio value"
                  isCompleted={totalValue >= 100000}
                />
                <Achievement
                  title="Bitcoin Believer"
                  description="Hold at least 1 BTC"
                  isCompleted={holdings.some((h) => h.symbol === "BTC" && h.amount >= 1)}
                />
                <Achievement
                  title="Ethereum Enthusiast"
                  description="Hold at least 10 ETH"
                  isCompleted={holdings.some((h) => h.symbol === "ETH" && h.amount >= 10)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 mb-8">
        <Link href="/dashboard">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

// PieChart and Achievement components remain unchanged
function PieChart({ holdings, totalValue }: { holdings: Holding[]; totalValue: number }) {
  if (holdings.length === 0) {
    return <div className="flex items-center justify-center h-full">No assets to display</div>
  }

  const sortedHoldings = [...holdings].sort((a, b) => b.valueUsd - a.valueUsd)
  let currentAngle = 0

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Asset Allocation</h2>
      <div className="relative aspect-square max-w-[250px] mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {sortedHoldings.map((holding, index) => {
            const percentage = (holding.valueUsd / totalValue) * 100
            const angle = (percentage / 100) * 360
            const startAngle = currentAngle
            const endAngle = currentAngle + angle
            currentAngle = endAngle

            const startX = 50 + 40 * Math.cos((startAngle - 90) * (Math.PI / 180))
            const startY = 50 + 40 * Math.sin((startAngle - 90) * (Math.PI / 180))
            const endX = 50 + 40 * Math.cos((endAngle - 90) * (Math.PI / 180))
            const endY = 50 + 40 * Math.sin((endAngle - 90) * (Math.PI / 180))

            const largeArcFlag = angle > 180 ? 1 : 0

            const pathData = [
              `M 50 50`,
              `L ${startX} ${startY}`,
              `A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`,
            ].join(" ")

            return <path key={holding.id} d={pathData} fill={holding.color} stroke="#fff" strokeWidth="0.5" />
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold">
            ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-gray-500">Total Value</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {sortedHoldings.map((holding) => {
          const percentage = (holding.valueUsd / totalValue) * 100
          return (
            <div key={holding.id} className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: holding.color }} />
                <span>{holding.symbol}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">
                  ${holding.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-gray-500">({percentage.toFixed(1)}%)</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Achievement({
  title,
  description,
  isCompleted,
}: {
  title: string
  description: string
  isCompleted: boolean
}) {
  return (
    <div className={`p-4 border rounded-lg ${isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50"}`}>
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
            isCompleted ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          {isCompleted && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}
