"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Clock } from "lucide-react"

type GasFee = {
  level: "low" | "medium" | "high"
  price: number
  time: string
}

export function GasFeeDisplay() {
  const [gasFees, setGasFees] = useState<GasFee[]>([
    { level: "low", price: 25, time: "5-10 min" },
    { level: "medium", price: 35, time: "2-5 min" },
    { level: "high", price: 50, time: "<2 min" },
  ])
  const [currentFee, setCurrentFee] = useState<number>(35)
  const [loading, setLoading] = useState<boolean>(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate API call to get gas prices
      setLoading(true)

      // Simulate network delay
      setTimeout(() => {
        // Generate random fluctuations in gas prices
        const newLow = Math.max(20, Math.floor(Math.random() * 10) + 20)
        const newMedium = Math.max(newLow + 5, Math.floor(Math.random() * 15) + 30)
        const newHigh = Math.max(newMedium + 5, Math.floor(Math.random() * 20) + 45)

        setGasFees([
          { level: "low", price: newLow, time: "5-10 min" },
          { level: "medium", price: newMedium, time: "2-5 min" },
          { level: "high", price: newHigh, time: "<2 min" },
        ])

        setCurrentFee(newMedium)
        setLoading(false)
      }, 500)
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  // Calculate the percentage for the progress bar (based on a max of 100 gwei)
  const progressPercentage = Math.min(100, (currentFee / 100) * 100)

  // Determine color based on gas price
  const getColorClass = (price: number) => {
    if (price < 30) return "text-green-500"
    if (price < 50) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium flex items-center">
            <Flame className="mr-2 h-4 w-4 text-orange-500" />
            Current Gas Price
          </h3>
          <span className={`text-sm font-bold ${getColorClass(currentFee)} ${loading ? "opacity-50" : ""}`}>
            {currentFee} Gwei
          </span>
        </div>

        <Progress
          value={progressPercentage}
          className={`h-2 ${loading ? "animate-pulse" : ""}`}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backgroundImage: "linear-gradient(to right, #10b981, #f59e0b, #ef4444)",
            backgroundSize: "100% 100%",
            backgroundClip: "content-box",
          }}
        />

        <div className="grid grid-cols-3 gap-2 mt-3">
          {gasFees.map((fee) => (
            <div key={fee.level} className="text-center">
              <div className={`text-xs font-medium ${getColorClass(fee.price)}`}>{fee.price} Gwei</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center mt-1">
                <Clock className="mr-1 h-3 w-3" />
                {fee.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
