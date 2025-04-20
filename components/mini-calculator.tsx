"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Share2, Calculator } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export function MiniCalculator() {
  const [ethAmount, setEthAmount] = useState("1")
  const [days, setDays] = useState(30)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const apy = 15 // 15% APY

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
  }, [])

  // Calculate rewards
  const calculateRewards = () => {
    const eth = Number(ethAmount) || 0
    const dailyReward = (eth * (apy / 100)) / 365
    return dailyReward * days
  }

  const rewards = calculateRewards()
  const rewardPercentage = Math.min((rewards / (Number(ethAmount) || 1)) * 100, 100)

  // Social sharing function
  const handleShare = () => {
    const text = `I'm staking ${ethAmount} ETH for ${rewards.toFixed(4)} ETH rewards (${(rewards * ethPrice).toFixed(2)} USD) in ${days} days! Try the ToGo Calculator.`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, "_blank")
  }

  // Handle slider change with haptic feedback
  const handleSliderChange = (value: number[]) => {
    setDays(value[0])
    // Provide haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }

  return (
    <motion.div
      className="bg-gray-100 rounded-3xl p-6 shadow-lg w-full max-w-sm border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Quick Estimate</h3>
        <Calculator className="h-5 w-5 text-purple-400" />
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="eth-amount" className="text-sm font-medium block mb-2">
            ETH Amount
          </Label>
          <Input
            type="number"
            id="eth-amount"
            placeholder="Enter ETH amount"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="glassmorphism border-none bg-gray-500/10 w-full"
            inputMode="decimal"
            onFocus={(e) => e.target.select()}
          />

          {/* Quick Presets */}
          <div className="flex gap-2 mt-2">
            {[0.1, 1, 10].map((preset) => (
              <button
                key={preset}
                onClick={() => setEthAmount(preset.toString())}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  Number(ethAmount) === preset ? "bg-purple-600 text-white" : "bg-gray-700 hover:bg-gray-200"
                }`}
              >
                {preset} ETH
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="days" className="text-sm font-medium">
              Duration
            </Label>
            <span className="text-sm text-gray-400">{days} days</span>
          </div>
          <Slider
            id="days"
            min={1}
            max={365}
            step={1}
            value={[days]}
            onValueChange={handleSliderChange}
            className="py-1 touch-manipulation"
            aria-label="Select staking duration in days"
            aria-valuemin={1}
            aria-valuemax={365}
            aria-valuenow={days}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1d</span>
            <span>1y</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Estimated Rewards:</span>
          <motion.span
            className="font-semibold text-lg text-green-400"
            key={rewards.toString()}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            {rewards.toFixed(4)} ETH
          </motion.span>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
          <span>USD Value:</span>
          <span>${(rewards * ethPrice).toFixed(2)}</span>
        </div>

        {/* Progress Bar */}
        <Progress
          value={rewardPercentage}
          className="h-2 mb-2"
          aria-label={`${rewardPercentage.toFixed(1)}% return on investment`}
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0%</span>
          <span>{rewardPercentage.toFixed(1)}% ROI</span>
        </div>

        <p className="text-xs text-gray-500 text-right mt-3">Based on {apy}% APY</p>
      </div>

      <Button
        onClick={handleShare}
        className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share Results
      </Button>
    </motion.div>
  )
}
