"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, DollarSign, Percent } from "lucide-react"

interface LSDProtocol {
  name: string
  symbol: string
  apy: number
  fee: number
  minStake: number
  withdrawalTime: string
  tokenType: "rebasing" | "value-accruing"
  description: string
}

const LSD_PROTOCOLS: LSDProtocol[] = [
  {
    name: "Lido",
    symbol: "stETH",
    apy: 3.8,
    fee: 10,
    minStake: 0.01,
    withdrawalTime: "1-5 days",
    tokenType: "rebasing",
    description: "Largest liquid staking protocol with high liquidity",
  },
  {
    name: "Rocket Pool",
    symbol: "rETH",
    apy: 3.6,
    fee: 15,
    minStake: 0.01,
    withdrawalTime: "1-7 days",
    tokenType: "value-accruing",
    description: "Decentralized protocol with node operator network",
  },
  {
    name: "Coinbase",
    symbol: "cbETH",
    apy: 3.2,
    fee: 25,
    minStake: 0.001,
    withdrawalTime: "2-4 days",
    tokenType: "value-accruing",
    description: "Centralized exchange offering with easy access",
  },
  {
    name: "Frax",
    symbol: "sfrxETH",
    apy: 4.1,
    fee: 8,
    minStake: 0.01,
    withdrawalTime: "1-3 days",
    tokenType: "value-accruing",
    description: "DeFi-native protocol with competitive yields",
  },
]

export default function LSDCalculator() {
  const [stakeAmount, setStakeAmount] = useState<string>("1")
  const [selectedProtocol, setSelectedProtocol] = useState<string>("Lido")
  const [timeframe, setTimeframe] = useState<string>("1")
  const [ethPrice, setEthPrice] = useState<number>(3500)
  const [results, setResults] = useState<any>(null)

  const protocol = LSD_PROTOCOLS.find((p) => p.name === selectedProtocol) || LSD_PROTOCOLS[0]

  useEffect(() => {
    calculateRewards()
  }, [stakeAmount, selectedProtocol, timeframe, ethPrice])

  const calculateRewards = () => {
    const amount = Number.parseFloat(stakeAmount) || 0
    const years = Number.parseFloat(timeframe) || 0

    if (amount <= 0 || years <= 0) {
      setResults(null)
      return
    }

    // Calculate compound interest with fees
    const netAPY = (protocol.apy - (protocol.apy * protocol.fee) / 100) / 100
    const compoundedAmount = amount * Math.pow(1 + netAPY, years)
    const totalRewards = compoundedAmount - amount
    const grossRewards = amount * (protocol.apy / 100) * years
    const fees = grossRewards * (protocol.fee / 100)

    // USD values
    const stakeValueUSD = amount * ethPrice
    const rewardsValueUSD = totalRewards * ethPrice
    const feesValueUSD = fees * ethPrice

    setResults({
      initialStake: amount,
      finalAmount: compoundedAmount,
      totalRewards,
      grossRewards,
      fees,
      netAPY: protocol.apy - (protocol.apy * protocol.fee) / 100,
      stakeValueUSD,
      rewardsValueUSD,
      feesValueUSD,
      finalValueUSD: compoundedAmount * ethPrice,
    })
  }

  const formatNumber = (num: number, decimals = 4) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Calculator className="w-8 h-8 text-blue-600" />
          Liquid Staking Derivatives Calculator
        </h1>
        <p className="text-gray-600">
          Compare rewards across different liquid staking protocols and calculate your potential earnings
        </p>
      </div>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="comparison">Protocol Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Staking Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="stakeAmount">ETH Amount to Stake</Label>
                  <Input
                    id="stakeAmount"
                    type="number"
                    placeholder="1.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <Label htmlFor="protocol">Liquid Staking Protocol</Label>
                  <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LSD_PROTOCOLS.map((protocol) => (
                        <SelectItem key={protocol.name} value={protocol.name}>
                          {protocol.name} ({protocol.symbol}) - {protocol.apy}% APY
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeframe">Staking Period (Years)</Label>
                  <Input
                    id="timeframe"
                    type="number"
                    placeholder="1"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    min="0.1"
                    step="0.1"
                  />
                </div>

                <div>
                  <Label htmlFor="ethPrice">ETH Price (USD)</Label>
                  <Input
                    id="ethPrice"
                    type="number"
                    placeholder="3500"
                    value={ethPrice}
                    onChange={(e) => setEthPrice(Number.parseFloat(e.target.value) || 3500)}
                    min="0"
                    step="50"
                  />
                </div>

                <Button onClick={calculateRewards} className="w-full">
                  Calculate Rewards
                </Button>
              </CardContent>
            </Card>

            {/* Protocol Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  {protocol.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Token Symbol:</span>
                    <p className="text-gray-600">{protocol.symbol}</p>
                  </div>
                  <div>
                    <span className="font-medium">APY:</span>
                    <p className="text-gray-600">{protocol.apy}%</p>
                  </div>
                  <div>
                    <span className="font-medium">Protocol Fee:</span>
                    <p className="text-gray-600">{protocol.fee}%</p>
                  </div>
                  <div>
                    <span className="font-medium">Min Stake:</span>
                    <p className="text-gray-600">{protocol.minStake} ETH</p>
                  </div>
                  <div>
                    <span className="font-medium">Withdrawal Time:</span>
                    <p className="text-gray-600">{protocol.withdrawalTime}</p>
                  </div>
                  <div>
                    <span className="font-medium">Token Type:</span>
                    <p className="text-gray-600 capitalize">{protocol.tokenType}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium">Description:</span>
                  <p className="text-gray-600 text-sm mt-1">{protocol.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Staking Rewards Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">ETH Values</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Initial Stake:</span>
                        <span className="font-medium">{formatNumber(results.initialStake)} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Rewards:</span>
                        <span className="font-medium text-green-600">+{formatNumber(results.totalRewards)} ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protocol Fees:</span>
                        <span className="font-medium text-red-600">-{formatNumber(results.fees)} ETH</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Final Amount:</span>
                        <span className="font-semibold">{formatNumber(results.finalAmount)} ETH</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">USD Values</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Initial Value:</span>
                        <span className="font-medium">{formatCurrency(results.stakeValueUSD)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rewards Value:</span>
                        <span className="font-medium text-green-600">+{formatCurrency(results.rewardsValueUSD)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fees Paid:</span>
                        <span className="font-medium text-red-600">-{formatCurrency(results.feesValueUSD)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Final Value:</span>
                        <span className="font-semibold">{formatCurrency(results.finalValueUSD)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Key Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Gross APY:</span>
                        <span className="font-medium">{protocol.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net APY:</span>
                        <span className="font-medium">{formatNumber(results.netAPY, 2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Return:</span>
                        <span className="font-medium text-green-600">
                          {formatNumber((results.totalRewards / results.initialStake) * 100, 2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Impact:</span>
                        <span className="font-medium text-red-600">-{protocol.fee}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Protocol Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Protocol</th>
                      <th className="text-left p-3">Token</th>
                      <th className="text-left p-3">APY</th>
                      <th className="text-left p-3">Fee</th>
                      <th className="text-left p-3">Net APY</th>
                      <th className="text-left p-3">Min Stake</th>
                      <th className="text-left p-3">Withdrawal</th>
                      <th className="text-left p-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LSD_PROTOCOLS.map((protocol) => {
                      const netAPY = protocol.apy - (protocol.apy * protocol.fee) / 100
                      return (
                        <tr key={protocol.name} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{protocol.name}</td>
                          <td className="p-3">{protocol.symbol}</td>
                          <td className="p-3">{protocol.apy}%</td>
                          <td className="p-3">{protocol.fee}%</td>
                          <td className="p-3 font-medium text-green-600">{formatNumber(netAPY, 2)}%</td>
                          <td className="p-3">{protocol.minStake} ETH</td>
                          <td className="p-3">{protocol.withdrawalTime}</td>
                          <td className="p-3 capitalize">{protocol.tokenType}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-lg">Token Types Explained</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Rebasing Tokens</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Token balance increases over time to reflect staking rewards. Example: 1 stETH becomes 1.05 stETH
                      after earning rewards.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">Value-Accruing Tokens</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Token balance stays the same, but value increases relative to ETH. Example: 1 rETH = 1.05 ETH
                      after earning rewards.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
