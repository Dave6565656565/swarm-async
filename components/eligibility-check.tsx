"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"
import { CheckEligibilityButton } from "./check-eligibility-button"

export function EligibilityCheck() {
  const [stakeAmount, setStakeAmount] = useState("")
  const [stakeDuration, setStakeDuration] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [result, setResult] = useState<{
    eligible: boolean
    message: string
  } | null>(null)

  const handleCheck = () => {
    setIsChecking(true)

    // Simulate processing
    setTimeout(() => {
      const amount = Number.parseFloat(stakeAmount)
      const duration = Number.parseInt(stakeDuration)

      if (isNaN(amount) || isNaN(duration)) {
        setResult({
          eligible: false,
          message: "Please enter valid numbers for both fields.",
        })
      } else if (amount < 0.1) {
        setResult({
          eligible: false,
          message: "You need to stake at least 0.1 ETH to be eligible.",
        })
      } else if (duration < 10) {
        setResult({
          eligible: false,
          message: "You need to hold your stake for at least 10 days to be eligible.",
        })
      } else {
        setResult({
          eligible: true,
          message: "Congratulations! You are eligible for the airdrop.",
        })
      }

      setIsChecking(false)
    }, 1500)
  }

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader>
        <CardTitle>Check Your Eligibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stake-amount">ETH Amount to Stake</Label>
          <Input
            id="stake-amount"
            type="number"
            placeholder="0.1"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="glassmorphism border-none bg-gray-500/10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stake-duration">Staking Duration (days)</Label>
          <Input
            id="stake-duration"
            type="number"
            placeholder="10"
            value={stakeDuration}
            onChange={(e) => setStakeDuration(e.target.value)}
            className="glassmorphism border-none bg-gray-500/10"
          />
        </div>

        <CheckEligibilityButton onCheck={handleCheck} isChecking={isChecking} inlineCheck={true} className="w-full" />

        {result && (
          <div className={`p-4 rounded-lg ${result.eligible ? "bg-green-500/20" : "bg-red-500/20"} mt-4`}>
            <div className="flex items-center gap-2">
              {result.eligible ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <p className={result.eligible ? "text-green-500" : "text-red-500"}>{result.message}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
