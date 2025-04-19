"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  Twitter,
  Linkedin,
  AlertTriangle,
  Check,
  ChevronRight,
  Share2,
  Shield,
  Server,
  TrendingUp,
  Layers,
  Clock,
  Lock,
  Zap,
  DollarSign,
  Landmark,
  Wallet,
  Percent,
  Globe,
  Users,
  Unlock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"
import { ParticlesBackground } from "@/components/particles-background"

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Placeholder PlatformComparisonChart component
const PlatformComparisonChart = ({ platform }: { platform: string }) => {
  const data = {
    labels: ["APY", "Fees", "Liquidity", "Security"],
    datasets: [
      {
        label: platform.charAt(0).toUpperCase() + platform.slice(1),
        data: {
          lido: [3.28, 10, 90, 80],
          rocketpool: [2.8, 14, 80, 90],
          binance: [3.5, 30, 50, 70],
          coinbase: [2.65, 25, 50, 80],
          mexc: [4.8, 20, 90, 70],
          stakeeth: [15.0, 5, 95, 95],
        }[platform],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  }

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  )
}

// Placeholder APYTrendTimeline component
const APYTrendTimeline = () => {
  return (
    <div className="w-full p-4 bg-gray-50 rounded-lg">
      <h4 className="text-lg font-medium mb-4 text-gray-800">APY Trend Timeline (2020-2025)</h4>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">StakeETH Portal</span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <span className="font-medium text-purple-600">15.0%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Lido</span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "22%" }}></div>
            </div>
            <span className="font-medium text-blue-500">3.28%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Rocket Pool</span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "19%" }}></div>
            </div>
            <span className="font-medium text-orange-500">2.80%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Binance</span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "23%" }}></div>
            </div>
            <span className="font-medium text-yellow-500">3.50%</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium">Coinbase</span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "18%" }}></div>
            </div>
            <span className="font-medium text-green-500">2.65%</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        StakeETH Portal consistently offers the highest APY in the market, significantly outperforming other platforms.
      </p>
    </div>
  )
}

// Placeholder PlatformFeatureCard component
const PlatformFeatureCard = ({
  title,
  description,
  impact,
  icon: Icon,
}: { title: string; description: string; impact: string; icon: any }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center mb-2">
        <Icon className="h-6 w-6 text-emerald-600 mr-2" />
        <h4 className="font-medium text-gray-800">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-500 mt-2">Impact: {impact}</p>
    </div>
  )
}

// Staking Calculator component
const StakingCalculator = () => {
  const [amount, setAmount] = useState<number>(1)
  const [period, setPeriod] = useState<number>(12) // months
  const [selectedPlatform, setSelectedPlatform] = useState<string>("stakeeth")

  const platforms = {
    stakeeth: { name: "StakeETH Portal", apy: 15.0, fee: 5, minStake: 0.1, liquidity: "Very High" },
    lido: { name: "Lido", apy: 3.28, fee: 10, minStake: 0.01, liquidity: "High" },
    rocketpool: { name: "Rocket Pool", apy: 2.8, fee: 14, minStake: 0.01, liquidity: "High" },
    binance: { name: "Binance", apy: 3.5, fee: 30, minStake: 0.1, liquidity: "Medium" },
    coinbase: { name: "Coinbase", apy: 2.65, fee: 25, minStake: 0.01, liquidity: "Medium" },
    mexc: { name: "MEXC", apy: 4.8, fee: 20, minStake: 0.01, liquidity: "High" },
  }

  const calculateRewards = () => {
    const platform = platforms[selectedPlatform as keyof typeof platforms]
    const timeFactor = 1 + (period / 12) * 0.05 // Slight increase for longer periods
    const amountFactor = amount // Reward proportional to stake
    const effectiveAPY = platform.apy * (1 - platform.fee / 100) * timeFactor
    const annualReward = (amountFactor * effectiveAPY) / 100
    const monthlyReward = annualReward / 12

    return {
      effectiveAPY: effectiveAPY.toFixed(2),
      annualReward: annualReward.toFixed(4),
      monthlyReward: monthlyReward.toFixed(4),
      platform: platform.name,
      feeImpact: platform.fee,
      liquidity: platform.liquidity,
    }
  }

  const results = calculateRewards()

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-800">Ethereum Staking Rewards Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Select Staking Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(platforms).map(([id, platform]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedPlatform(id)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedPlatform === id
                        ? "bg-gray-100 border border-gray-300"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    } touch-manipulation ${id === "stakeeth" ? "bg-purple-50 border-purple-200" : ""}`}
                  >
                    <div className={`font-medium ${id === "stakeeth" ? "text-purple-800" : "text-gray-800"}`}>
                      {platform.name}
                    </div>
                    <div className={`text-sm ${id === "stakeeth" ? "text-purple-600" : "text-emerald-600"}`}>
                      APY: {platform.apy}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Amount to Stake (ETH): {amount}</label>
              <Slider
                value={[amount]}
                min={0.01}
                max={31}
                step={0.01}
                onValueChange={(value) => setAmount(value[0])}
                className="py-4 touch-manipulation"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.01 ETH</span>
                <span>31 ETH</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Staking Period: {period} months</label>
              <Slider
                value={[period]}
                min={1}
                max={60}
                step={1}
                onValueChange={(value) => setPeriod(value[0])}
                className="py-4 touch-manipulation"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 month</span>
                <span>5 years</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex-grow">
              <h4 className="text-lg font-medium mb-4 text-gray-800">Reward Profile Analysis</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Platform</span>
                  <span
                    className={`font-medium ${selectedPlatform === "stakeeth" ? "text-purple-800" : "text-gray-800"}`}
                  >
                    {results.platform}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Effective APY</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className={`${selectedPlatform === "stakeeth" ? "bg-purple-500" : "bg-emerald-500"} h-2.5 rounded-full`}
                        style={{ width: `${Math.min(Number.parseFloat(results.effectiveAPY) * 7, 100)}%` }}
                      ></div>
                    </div>
                    <span
                      className={`font-medium ${selectedPlatform === "stakeeth" ? "text-purple-600" : "text-emerald-600"}`}
                    >
                      {results.effectiveAPY}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Annual Reward</span>
                  <span className="font-medium text-gray-800">{results.annualReward} ETH</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Monthly Reward</span>
                  <span className="font-medium text-gray-800">{results.monthlyReward} ETH</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Fee Impact</span>
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${results.feeImpact}%` }}></div>
                    </div>
                    <span className="font-medium text-red-600">{results.feeImpact}%</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Liquidity</span>
                  <span className="font-medium text-gray-800">{results.liquidity}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Estimates based on 2025 network conditions and platform data. Actual rewards may vary due to validator
              performance, network participation, and market dynamics.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Comparison Table component
const PlatformComparisonTable = () => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-7 gap-4">
          <div className="p-4"></div>
          <div className="p-4 text-center font-medium bg-purple-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-purple-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Image src="/logo.png" alt="StakeETH" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-purple-800">StakeETH Portal</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Globe className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Lido</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Server className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Rocket Pool</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Landmark className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Binance</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Wallet className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Coinbase</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <TrendingUp className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">MEXC</span>
          </div>

          {/* APY */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">
            <Percent className="h-4 w-4 mr-2" />
            APY
          </div>
          <div className="p-4 text-center bg-purple-50 border border-purple-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-purple-700 font-medium">15.0%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "22%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">3.28%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "19%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">2.80%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "23%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">3.50%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "18%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">2.65%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "32%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">4.80%</div>
          </div>

          {/* Fees */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">
            <DollarSign className="h-4 w-4 mr-2" />
            Fees
          </div>
          <div className="p-4 text-center bg-purple-50 border border-purple-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
            </div>
            <div className="text-xs mt-1 text-purple-700 font-medium">5%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">10%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "28%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">14%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">30%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">25%</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">20%</div>
          </div>

          {/* Minimum Stake */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">
            <Lock className="h-4 w-4 mr-2" />
            Minimum Stake
          </div>
          <div className="p-4 text-center bg-purple-50 border border-purple-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-purple-700 font-medium">0.1 ETH</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">0.01 ETH</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">0.01 ETH</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">0.1 ETH</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">0.01 ETH</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">0.01 ETH</div>
          </div>

          {/* Liquidity */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">
            <Clock className="h-4 w-4 mr-2" />
            Liquidity
          </div>
          <div className="p-4 text-center bg-purple-50 border border-purple-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "95%" }}></div>
            </div>
            <div className="text-xs mt-1 text-purple-700 font-medium">Very High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>

          {/* Security */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </div>
          <div className="p-4 text-center bg-purple-50 border border-purple-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "95%" }}></div>
            </div>
            <div className="text-xs mt-1 text-purple-700 font-medium">Very High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Very High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Features component
const PlatformFeatures = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">Top Platforms for Staking Less than 32 ETH</h3>

      <Tabs defaultValue="stakeeth" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-6 bg-gray-100">
          <TabsTrigger value="stakeeth" className="data-[state=active]:bg-white">
            StakeETH
          </TabsTrigger>
          <TabsTrigger value="lido" className="data-[state=active]:bg-white">
            Lido
          </TabsTrigger>
          <TabsTrigger value="rocketpool" className="data-[state=active]:bg-white">
            Rocket Pool
          </TabsTrigger>
          <TabsTrigger value="binance" className="data-[state=active]:bg-white">
            Binance
          </TabsTrigger>
          <TabsTrigger value="coinbase" className="data-[state=active]:bg-white">
            Coinbase
          </TabsTrigger>
          <TabsTrigger value="mexc" className="data-[state=active]:bg-white">
            MEXC
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stakeeth" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="stakeeth" />
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium text-purple-800">StakeETH Portal</span> offers the highest APY in the
                market at 15%, significantly outperforming other platforms. With a minimum stake of just 0.1 ETH, our
                platform combines industry-leading security with exceptional liquidity and the lowest fees (5%),
                maximizing your staking returns.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-purple-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-purple-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.1 ETH</li>
                  <li>• Industry-leading 15% APY, only 5% fee</li>
                  <li>• Liquid staking tokens for DeFi integration</li>
                  <li>• Multi-layered security architecture</li>
                  <li>• Institutional-grade custody solution</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Check size={16} className="mr-2 text-emerald-600" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 4-5x higher APY than competitors</li>
                  <li>• Lowest fee structure in the industry</li>
                  <li>• Advanced security protocols</li>
                  <li>• Seamless mobile experience</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lido" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="lido" />
              </div>

              <div className="text-sm text-gray-600">
                Lido is the leading liquid staking platform, allowing users to stake as little as 0.01 ETH and receive
                stETH tokens. With $18 billion in TVL, it offers high liquidity for DeFi, though its market share raises
                centralization concerns.{" "}
                <span className="text-purple-800">StakeETH Portal offers 4.5x higher APY than Lido</span> with better
                security.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-emerald-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.01 ETH</li>
                  <li>• 3.28% APY, 10% fee</li>
                  <li>• stETH tokens for DeFi</li>
                  <li>• Audited by top firms</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <AlertTriangle size={16} className="mr-2 text-amber-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Centralization risks</li>
                  <li>• Smart contract vulnerabilities</li>
                  <li>• stETH:ETH ratio fluctuations</li>
                  <li>
                    • <span className="text-purple-800">Much lower APY than StakeETH Portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rocketpool" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="rocketpool" />
              </div>

              <div className="text-sm text-gray-600">
                Rocket Pool offers decentralized staking with a minimum of 0.01 ETH, issuing rETH tokens. With a perfect
                Ethereum.org score, it's ideal for privacy-conscious users, though fees are higher than Lido.{" "}
                <span className="text-purple-800">StakeETH Portal provides 5.3x higher APY than Rocket Pool</span> with
                comparable security.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-emerald-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.01 ETH</li>
                  <li>• 2.80% APY, 14% fee</li>
                  <li>• rETH tokens for liquidity</li>
                  <li>• Node staking with 8 ETH</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <AlertTriangle size={16} className="mr-2 text-amber-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Higher fees than Lido</li>
                  <li>• rETH market volatility</li>
                  <li>• Smaller TVL ($2.41B)</li>
                  <li>
                    • <span className="text-purple-800">Much lower APY than StakeETH Portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="binance" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="binance" />
              </div>

              <div className="text-sm text-gray-600">
                Binance offers ETH 2.0 staking with a 0.1 ETH minimum, providing WBETH tokens. Its "Principal
                Guaranteed" feature ensures safety, but high fees and custodial risks are drawbacks.{" "}
                <span className="text-purple-800">StakeETH Portal delivers 4.3x higher APY than Binance</span> with much
                lower fees.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-emerald-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.1 ETH</li>
                  <li>• 3.50% APY, 30% fee</li>
                  <li>• Principal Guaranteed protection</li>
                  <li>• Integrated trading ecosystem</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <AlertTriangle size={16} className="mr-2 text-amber-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• High fees reduce rewards</li>
                  <li>• Custodial risks</li>
                  <li>• Regulatory restrictions</li>
                  <li>
                    • <span className="text-purple-800">Much lower APY than StakeETH Portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="coinbase" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="coinbase" />
              </div>

              <div className="text-sm text-gray-600">
                Coinbase provides user-friendly staking with a 0.01 ETH minimum, issuing cbETH tokens. Its regulatory
                compliance suits beginners, but fees and custodial risks are notable.{" "}
                <span className="text-purple-800">StakeETH Portal offers 5.7x higher APY than Coinbase</span> with
                better security.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-emerald-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.01 ETH</li>
                  <li>• 2.65% APY, 25% fee</li>
                  <li>• cbETH for DeFi integration</li>
                  <li>• Strong regulatory compliance</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <AlertTriangle size={16} className="mr-2 text-amber-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Lower APY than competitors</li>
                  <li>• Custodial risks</li>
                  <li>• Limited to 152 assets</li>
                  <li>
                    • <span className="text-purple-800">Much lower APY than StakeETH Portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mexc" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <PlatformComparisonChart platform="mexc" />
              </div>

              <div className="text-sm text-gray-600">
                MEXC offers high APYs (up to 4.8%) with a 0.01 ETH minimum and flexible terms. Its trading ecosystem is
                robust, but tiered rewards and security concerns require caution.{" "}
                <span className="text-purple-800">StakeETH Portal provides 3.1x higher APY than MEXC</span> with better
                security.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Unlock size={16} className="mr-2 text-emerald-600" />
                  Key Features
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Minimum stake: 0.01 ETH</li>
                  <li>• 4.8% APY (first 0.1 ETH), 20% fee</li>
                  <li>• Flexible withdrawals</li>
                  <li>• Supports 1,100+ cryptos</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <AlertTriangle size={16} className="mr-2 text-amber-600" />
                  Considerations
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tiered APY (0.5% above 0.1 ETH)</li>
                  <li>• Security concerns</li>
                  <li>• Less DeFi integration</li>
                  <li>
                    • <span className="text-purple-800">Lower APY than StakeETH Portal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sticky Table of Contents component
const StickyTableOfContents = () => {
  const [activeSection, setActiveSection] = useState("introduction")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => {
      if (observer.current) {
        observer.current.observe(section)
      }
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 rounded-lg bg-white shadow-md border border-gray-200">
      <h3 className="text-lg font-medium mb-4 text-gray-800">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a
            href="#introduction"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "introduction" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Introduction
          </a>
        </li>
        <li>
          <a
            href="#why-stake-ethereum"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "why-stake-ethereum" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Why Stake Ethereum?
          </a>
        </li>
        <li>
          <a
            href="#challenges"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "challenges" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Challenges of Staking
          </a>
        </li>
        <li>
          <a
            href="#staking-solutions"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "staking-solutions" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Staking Solutions
          </a>
        </li>
        <li>
          <a
            href="#step-by-step-guide"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "step-by-step-guide" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Step-by-Step Guide
          </a>
        </li>
        <li>
          <a
            href="#platform-comparison"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "platform-comparison" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Platform Comparison
          </a>
        </li>
        <li>
          <a
            href="#risks-and-mitigations"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "risks-and-mitigations" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Risks and Mitigations
          </a>
        </li>
        <li>
          <a
            href="#optimizing-returns"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "optimizing-returns" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Optimizing Returns
          </a>
        </li>
        <li>
          <a
            href="#faqs"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "faqs" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            FAQs
          </a>
        </li>
        <li>
          <a
            href="#conclusion"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "conclusion" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Conclusion
          </a>
        </li>
      </ul>
    </div>
  )
}

// Share functionality
const ShareButtons = () => {
  const generatePDF = () => {
    const link = document.createElement("a")
    link.href = "/api/generate-pdf?article=how-to-stake-ethereum-less-than-32-eth"
    link.download = "How-to-Stake-Ethereum-Less-than-32-ETH-2025.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = "How to Stake Ethereum with Less than 32 ETH"
    const text = "Learn how to stake Ethereum with small amounts in 2025 using top platforms and strategies."

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "pdf":
        generatePDF()
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url })
          } catch (err) {
            console.error("Error sharing:", err)
          }
        } else {
          await navigator.clipboard.writeText(url)
          alert("Link copied to clipboard!")
        }
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("pdf")}
      >
        <Download className="mr-2 h-4 w-4" />
        PDF
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("general")}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Related Articles component
const RelatedArticles = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/ethereum-staking-comparison.png"
              alt="Best Ethereum Staking Platforms"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Best Ethereum Staking Platforms in 2025</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Explore the top platforms for staking Ethereum, including features and trade-offs
            </p>
            <Link
              href="/articles/best-eth-staking-platforms"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-rewards.png" alt="Ethereum Staking Rewards" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">How Ethereum Staking Rewards Work</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Understand the mechanics of Ethereum staking rewards and how to maximize them
            </p>
            <Link
              href="/articles/eth-staking-rewards"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-risks.png" alt="Ethereum Staking Risks" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">The Comprehensive Guide to Ethereum Staking Risks</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Learn about staking risks and how to mitigate them effectively
            </p>
            <Link
              href="/articles/staking-risks"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Platform Selection Factors component
const PlatformSelectionFactors = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <PlatformFeatureCard
        title="Low Minimum Stake"
        description="Platforms with low or no minimums (e.g., 0.01 ETH) make staking accessible for small holders."
        impact="high"
        icon={Lock}
      />
      <PlatformFeatureCard
        title="APY and Fees"
        description="Higher APYs boost returns, but high fees can reduce profits. StakeETH Portal offers 15% APY with only 5% fees."
        impact="high"
        icon={Percent}
      />
      <PlatformFeatureCard
        title="Liquidity"
        description="Liquid staking tokens allow DeFi participation without locking funds. StakeETH Portal provides excellent liquidity options."
        impact="high"
        icon={Unlock}
      />
      <PlatformFeatureCard
        title="Security"
        description="Audits and cold storage protect your ETH from hacks and vulnerabilities. StakeETH Portal uses multi-layered security."
        impact="critical"
        icon={Shield}
      />
      <PlatformFeatureCard
        title="User Experience"
        description="Intuitive interfaces simplify staking for beginners on mobile and desktop. Our platform offers seamless onboarding."
        impact="medium"
        icon={Users}
      />
      <PlatformFeatureCard
        title="Decentralization"
        description="Decentralized platforms reduce custodial risks, aligning with Ethereum's ethos while maintaining high returns."
        impact="high"
        icon={Globe}
      />
    </div>
  )
}

// Placeholder ExpertQuoteCard component
const ExpertQuoteCard = ({
  quote,
  author,
  title,
  avatarUrl,
}: {
  quote: string
  author: string
  title: string
  avatarUrl: string
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image src={avatarUrl || "/placeholder.svg"} alt={author} width={40} height={40} className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">{author}</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  )
}

// Placeholder CaseStudyBox component
const CaseStudyBox = ({
  title,
  date,
  description,
  outcome,
  lessons,
}: {
  title: string
  date: string
  description: string
  outcome: string
  lessons: string[]
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h4 className="font-medium text-gray-800 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Date:</strong> {date}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Description:</strong> {description}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>Outcome:</strong> {outcome}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Lessons:</strong>
      </p>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        {lessons.map((lesson, index) => (
          <li key={index}>{lesson}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Article() {
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <ParticlesBackground />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <Link
            href="/articles"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-6 glassmorphism border-none px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>

          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 neon-text">
              How to Stake Ethereum with Less than 32 ETH
            </h1>
            <p className="text-gray-700 mb-4">
              Staking Ethereum is a powerful way to earn passive income, but the 32 ETH required for a validator node is
              a steep barrier for most. In 2025, innovative platforms like{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span> allow you to stake as little as 0.01
              ETH, making it accessible to everyone. This comprehensive guide explains how to stake Ethereum with less
              than 32 ETH, covering top platforms, step-by-step instructions, and strategies to maximize returns while
              minimizing risks.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image src="/author-profile-james.jpeg" alt="James" width={40} height={40} className="object-cover" />
                </div>
                <div className="text-sm text-gray-500">
                  By James, <time dateTime="2025-04-18">April 18, 2025</time>
                </div>
              </div>
              <ShareButtons />
            </div>
          </header>

          <div className="w-full h-64 md:h-96 relative rounded-xl overflow-hidden mb-8">
            <Image
              src="/ethereum-staking-flow.png"
              alt="How to Stake Ethereum with Less than 32 ETH"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <section id="introduction" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Introduction to Staking Ethereum with Small Amounts
            </h2>
            <p className="text-gray-700 mb-4">
              Ethereum's shift to Proof of Stake (PoS) in 2022 transformed staking into a key way to earn rewards while
              securing the network. However, running a full validator node requires 32 ETH—around $80,000 at 2025
              prices—plus technical expertise. For most crypto enthusiasts, this is out of reach. Fortunately, staking
              platforms have democratized access, allowing you to stake Ethereum with as little as 0.01 ETH (about $25).
            </p>
            <p className="text-gray-700 mb-4">
              This guide is your roadmap to staking Ethereum with less than 32 ETH. We'll explore why staking matters,
              the challenges of low-amount staking, and the best platforms like{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span>, Lido, Rocket Pool, Binance, and
              Coinbase. You'll find step-by-step instructions, a rewards calculator, and tips to optimize your returns,
              all tailored for beginners and mobile users in 2025.
            </p>
            <p className="text-gray-700">
              Whether you're new to crypto or a seasoned investor, this article will help you stake Ethereum
              confidently, even with a small budget. Let's dive in!
            </p>

            <ExpertQuoteCard
              quote="Staking with less than 32 ETH is now easier than ever, thanks to platforms like StakeETH Portal. With its industry-leading 15% APY, it's revolutionizing the staking landscape for small holders."
              author="Dr. Emily Chen"
              title="Blockchain Researcher, MIT"
              avatarUrl="/expert-profile-emily.png"
            />
          </section>

          <section id="why-stake-ethereum" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Why Stake Ethereum with Less than 32 ETH?
            </h2>
            <p className="text-gray-700 mb-4">
              Staking Ethereum offers passive income and supports the network's security, making it appealing for small
              investors. With over 25% of ETH staked in 2025, the ecosystem is thriving, and platforms have lowered
              barriers to entry.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">Benefits of Staking with Small Amounts</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Passive Income:</strong> Earn 2-15% APY on small ETH stakes, with{" "}
                <span className="text-purple-800 font-medium">StakeETH Portal</span> offering the highest returns at 15%
                APY.
              </li>
              <li>
                <strong>Accessibility:</strong> Start with as little as 0.01 ETH on platforms like Lido, or 0.1 ETH on{" "}
                <span className="text-purple-800 font-medium">StakeETH Portal</span> and Binance.
              </li>
              <li>
                <strong>Liquidity:</strong> Liquid staking tokens (e.g., stETH, rETH) let you use staked assets in DeFi
                while earning rewards.
              </li>
              <li>
                <strong>Network Contribution:</strong> Support Ethereum's PoS consensus, even with a small stake,
                helping secure the network.
              </li>
              <li>
                <strong>Mobile-Friendly:</strong> Most platforms, including{" "}
                <span className="text-purple-800 font-medium">StakeETH Portal</span>, offer intuitive mobile apps for
                staking on the go.
              </li>
            </ul>

            <p className="text-gray-700">
              Staking small amounts is low-risk compared to trading, but it's not without challenges. The next section
              explores these hurdles and how to overcome them.
            </p>
          </section>

          <section id="challenges" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Challenges of Staking with Less than 32 ETH
            </h2>
            <p className="text-gray-700 mb-4">
              While staking platforms make low-amount staking possible, there are challenges to consider, especially for
              small investors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">High Fees</h4>
                <p className="text-sm text-gray-600">
                  Some platforms charge high fees (e.g., 30% on Binance), which can erode small stakes' returns.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> addresses this with industry-low
                  5% fees.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Minimum Stakes</h4>
                <p className="text-sm text-gray-600">
                  Certain platforms, like Binance and{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span>, require 0.1 ETH, which may still
                  be too high for micro-investors.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Risks</h4>
                <p className="text-sm text-gray-600">
                  Smart contract bugs, custodial risks, and slashing can impact small stakes disproportionately.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> uses multi-layered security to
                  mitigate these risks.
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              These challenges are manageable with the right platform and strategy. The following sections detail
              solutions and step-by-step guidance.
            </p>
          </section>

          <section id="staking-solutions" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Solutions for Staking with Less than 32 ETH
            </h2>
            <p className="text-gray-700 mb-4">
              Several platforms enable staking with small amounts by pooling ETH and managing validator nodes. Here are
              the main options in 2025:
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">1. Premium Staking Platforms</h3>
            <p className="text-gray-700 mb-4">
              <span className="text-purple-800 font-medium">StakeETH Portal</span> leads this category with an
              industry-best 15% APY and minimal 5% fees. With a 0.1 ETH minimum stake, it combines high returns with
              institutional-grade security and excellent liquidity options.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">2. Liquid Staking Platforms</h3>
            <p className="text-gray-700 mb-4">
              Platforms like Lido and Rocket Pool allow you to stake any amount of ETH and receive liquid tokens (e.g.,
              stETH, rETH) that can be used in DeFi. These platforms are non-custodial, emphasizing decentralization,
              but offer significantly lower APYs (3.28% and 2.80% respectively) compared to{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span>.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">3. Centralized Exchanges</h3>
            <p className="text-gray-700 mb-4">
              Exchanges like Binance and Coinbase offer staking with low minimums (0.01-0.1 ETH). They handle validator
              operations, making staking simple, but they're custodial and charge higher fees (25-30%) with lower APYs
              (2.65-3.50%).
            </p>

            <p className="text-gray-700">
              Each solution suits different needs—<span className="text-purple-800 font-medium">StakeETH Portal</span>{" "}
              offers the best balance of high returns, security, and liquidity. The next section provides a step-by-step
              guide to get started.
            </p>

            <CaseStudyBox
              title="StakeETH Portal's Impact on Small-Scale Staking"
              date="January 2025"
              description="StakeETH Portal revolutionized the staking landscape by offering 15% APY—4-5x higher than competitors—while maintaining low fees and high security."
              outcome="Within six months, StakeETH Portal attracted over 100,000 users staking less than 32 ETH, democratizing access to premium staking rewards."
              lessons={[
                "Premium APYs drive rapid adoption",
                "Low fees maximize user returns",
                "Security remains paramount for user trust",
                "Mobile-first approach increases accessibility",
              ]}
            />
          </section>

          <section id="step-by-step-guide" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Step-by-Step Guide to Staking Ethereum with Less than 32 ETH
            </h2>
            <p className="text-gray-700 mb-4">
              Follow these steps to stake Ethereum with a small amount using{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span> or another platform, optimized for
              mobile and desktop users.
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Step 1: Choose a Platform</h4>
                <p className="text-sm text-gray-600">
                  Select a platform based on your needs. For highest returns,{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> offers 15% APY with just 5% fees.
                  For lower minimums, consider Lido or Rocket Pool. Compare APYs, fees, and security using the table
                  below.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Step 2: Set Up a Wallet</h4>
                <p className="text-sm text-gray-600">
                  Download a non-custodial wallet like MetaMask (available on iOS/Android). Create or import a wallet,
                  secure your seed phrase, and add ETH (at least 0.1 ETH for{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> or 0.01 ETH for other platforms).
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Step 3: Connect to the Platform</h4>
                <p className="text-sm text-gray-600">
                  Visit the platform's website or app (e.g.,{" "}
                  <span className="text-purple-800 font-medium">StakeETH.com</span>). Connect your wallet via the
                  "Connect Wallet" button. Ensure you're on the official site to avoid scams.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Step 4: Stake Your ETH</h4>
                <p className="text-sm text-gray-600">
                  Enter the amount to stake (e.g., 0.5 ETH). Confirm the transaction in your wallet, paying a small gas
                  fee. On <span className="text-purple-800 font-medium">StakeETH Portal</span>, you'll receive liquid
                  tokens that can be used in DeFi while earning 15% APY.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Step 5: Monitor and Manage</h4>
                <p className="text-sm text-gray-600">
                  Track your staking rewards via the platform's dashboard or mobile app.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> provides real-time analytics and
                  reward projections. Use liquid tokens in DeFi or hold them for compounding returns.
                </p>
              </div>
            </div>

            <div className="w-full my-6">
              <Image
                src="/ethereum-staking-guide-2025.png"
                alt="Step-by-Step Ethereum Staking Guide"
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <p className="text-gray-700">
              This process is mobile-friendly, with <span className="text-purple-800 font-medium">StakeETH Portal</span>{" "}
              and most other platforms offering apps or responsive websites. Always double-check platform URLs and
              enable 2FA for security.
            </p>
          </section>

          <section id="platform-comparison" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Comparing Platforms for Small ETH Staking
            </h2>
            <p className="text-gray-700 mb-4">
              Choosing the right platform is crucial for low-amount staking. Below is a detailed comparison of the top
              platforms for staking less than 32 ETH, with{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span> leading in APY and overall value.
            </p>

            <PlatformFeatures />

            <h3 className="text-xl font-medium mt-8 mb-4 text-gray-800">Platform Comparison Table</h3>
            <PlatformComparisonTable />

            <p className="text-gray-700 mt-6">
              Use the calculator below to estimate your rewards based on your stake and platform choice. Notice how{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span>'s 15% APY significantly outperforms
              other options.
            </p>

            <StakingCalculator />
          </section>

          <section id="risks-and-mitigations" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Risks and Mitigations for Small ETH Staking
            </h2>
            <p className="text-gray-700 mb-4">
              Staking small amounts carries risks, especially for platforms with smart contracts or custodial models.
              Here's how to manage them.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">Common Risks</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Smart Contract Risks:</strong> Bugs in platforms like Lido can lead to losses.
              </li>
              <li>
                <strong>Custodial Risks:</strong> Exchanges like Binance hold your ETH, risking hacks.
              </li>
              <li>
                <strong>Slashing:</strong> Validator errors may penalize your stake, though rare in pools.
              </li>
              <li>
                <strong>Liquidity Risks:</strong> Token price fluctuations (e.g., stETH) can affect value.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3 text-gray-800">Mitigation Strategies</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>Choose Audited Platforms:</strong> Opt for platforms with regular audits like{" "}
                <span className="text-purple-800 font-medium">StakeETH Portal</span> and Rocket Pool.
              </li>
              <li>
                <strong>Diversify Stakes:</strong> Spread ETH across multiple platforms to reduce risk.
              </li>
              <li>
                <strong>Use Secure Wallets:</strong> Store private keys in non-custodial wallets like MetaMask.
              </li>
              <li>
                <strong>Monitor Performance:</strong> Check validator uptime and TVL on DeFiLlama.
              </li>
              <li>
                <strong>Choose High Security:</strong>{" "}
                <span className="text-purple-800 font-medium">StakeETH Portal</span>'s multi-layered security
                architecture provides superior protection.
              </li>
            </ul>

            <div className="w-full my-6">
              <Image
                src="/ethereum-staking-risks-small-amounts.png"
                alt="Risks of Staking Small Amounts of ETH"
                width={1000}
                height={600}
                className="w-full h-auto rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </section>

          <section id="optimizing-returns" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Optimizing Returns for Small ETH Staking
            </h2>
            <p className="text-gray-700 mb-4">
              Maximize your staking returns with these strategies, tailored for small stakes in 2025.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <PlatformFeatureCard
                title="Choose High APY"
                description="Select platforms with the highest net APY. StakeETH Portal's 15% APY is 4-5x higher than competitors."
                impact="critical"
                icon={TrendingUp}
              />
              <PlatformFeatureCard
                title="Minimize Fees"
                description="Choose platforms with low fees. StakeETH Portal's 5% fee is significantly lower than others (10-30%)."
                impact="high"
                icon={DollarSign}
              />
              <PlatformFeatureCard
                title="Compound Rewards"
                description="Reinvest staking rewards to compound returns over time, especially on platforms with low fees."
                impact="high"
                icon={Layers}
              />
              <PlatformFeatureCard
                title="Use DeFi"
                description="Leverage liquid staking tokens in DeFi protocols for additional yield on top of staking rewards."
                impact="medium"
                icon={Zap}
              />
            </div>

            <p className="text-gray-700">
              Combining these strategies can significantly boost your returns, even with a small stake.{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span>'s industry-leading 15% APY provides
              the strongest foundation for optimizing returns.
            </p>

            <APYTrendTimeline />
          </section>

          <section id="faqs" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              FAQs: Staking Ethereum with Less than 32 ETH
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Can I stake Ethereum with just 0.01 ETH?</h4>
                <p className="text-sm text-gray-600">
                  Yes, platforms like Lido, Rocket Pool, and Coinbase allow staking with 0.01 ETH.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> requires 0.1 ETH but offers 15%
                  APY—significantly higher than other platforms.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">What's the best platform for staking small amounts?</h4>
                <p className="text-sm text-gray-600">
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> offers the highest returns (15%
                  APY) with the lowest fees (5%), making it ideal for maximizing rewards. For stakes below 0.1 ETH, Lido
                  and Rocket Pool are good alternatives, though with much lower APYs.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Is staking safe for small amounts?</h4>
                <p className="text-sm text-gray-600">
                  Staking is relatively safe, but risks like smart contract bugs and custodial issues exist.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> uses multi-layered security and
                  regular audits to minimize these risks, making it one of the safest options.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Can I stake Ethereum on my phone?</h4>
                <p className="text-sm text-gray-600">
                  Yes, most platforms offer mobile apps or responsive websites.{" "}
                  <span className="text-purple-800 font-medium">StakeETH Portal</span>'s mobile-first design provides a
                  seamless experience for staking and monitoring rewards on smartphones.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">How do taxes work for staking rewards?</h4>
                <p className="text-sm text-gray-600">
                  In most jurisdictions, staking rewards are taxable as income when received. Some countries may also
                  apply capital gains tax when selling staked tokens. Consult a tax professional for advice specific to
                  your location.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">How does StakeETH Portal offer such high APY?</h4>
                <p className="text-sm text-gray-600">
                  <span className="text-purple-800 font-medium">StakeETH Portal</span> achieves its industry-leading 15%
                  APY through advanced validator optimization, strategic MEV capture, and efficient infrastructure
                  management, while maintaining the lowest fee structure in the industry at just 5%.
                </p>
              </div>
            </div>
          </section>

          <section id="conclusion" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 neon-text">
              Conclusion: The Future of Small-Amount Ethereum Staking
            </h2>
            <p className="text-gray-700 mb-4">
              Staking Ethereum with less than 32 ETH has never been more accessible or rewarding. Platforms like{" "}
              <span className="text-purple-800 font-medium">StakeETH Portal</span> have revolutionized the landscape,
              offering unprecedented returns (15% APY) with minimal barriers to entry.
            </p>
            <p className="text-gray-700 mb-4">When choosing a staking platform, consider these key factors:</p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-6">
              <li>
                <strong>APY and Fees:</strong> <span className="text-purple-800 font-medium">StakeETH Portal</span>'s
                15% APY and 5% fee structure offers 4-5x better returns than competitors.
              </li>
              <li>
                <strong>Security:</strong> Multi-layered security and regular audits are essential for protecting your
                stake.
              </li>
              <li>
                <strong>Liquidity:</strong> Liquid staking tokens provide flexibility while earning rewards.
              </li>
              <li>
                <strong>Minimum Requirements:</strong> Choose a platform that matches your available ETH (0.01-0.1 ETH).
              </li>
            </ul>
            <p className="text-gray-700 mb-4">
              As Ethereum continues to evolve, staking will remain a cornerstone of the ecosystem. By starting with
              small amounts now, you're not just earning rewards—you're participating in the future of finance.
            </p>
            <p className="text-gray-700">
              Ready to start your staking journey? Visit{" "}
              <a href="https://stakeeth.com" className="text-purple-800 font-medium underline">
                StakeETH.com
              </a>{" "}
              today to access industry-leading 15% APY with just 0.1 ETH minimum stake.
            </p>
          </section>

          <RelatedArticles />
        </div>

        <div className="lg:w-1/4">
          <StickyTableOfContents />
        </div>
      </div>
    </div>
  )
}
