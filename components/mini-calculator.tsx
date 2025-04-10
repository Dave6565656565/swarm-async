"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function MiniCalculator() {
  const [ethAmount, setEthAmount] = useState("1")
  const [days, setDays] = useState(30)
  const apy = 15 // 15% APY

  // Calculate rewards
  const calculateRewards = () => {
    const eth = Number(ethAmount) || 0
    const dailyReward = (eth * (apy / 100)) / 365
    return dailyReward * days
  }

  const rewards = calculateRewards()

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full max-w-sm">
      <h3 className="text-lg font-semibold mb-4">Estimate Your Rewards</h3>
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
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="days" className="text-sm font-medium">
              Duration
            </Label>
            <span className="text-sm text-gray-600">{days} days</span>
          </div>
          <Slider
            id="days"
            min={1}
            max={365}
            step={1}
            value={[days]}
            onValueChange={(value) => setDays(value[0])}
            className="py-1"
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Estimated Rewards:</span>
          <span className="font-semibold text-lg">{rewards.toFixed(4)} ETH</span>
        </div>
        <p className="text-xs text-gray-600 text-right mt-1">Based on 15% APY</p>
      </div>
    </div>
  )
}
