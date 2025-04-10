"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

type TimeRange = "1W" | "1M" | "3M" | "1Y" | "ALL"

export function StakingChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M")
  const [chartData, setChartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    // Simulate API call to get chart data
    setTimeout(() => {
      // Generate data based on selected time range
      const labels = generateLabels(timeRange)
      const stakingData = generateStakingData(timeRange)
      const rewardsData = generateRewardsData(timeRange)

      setChartData({
        labels,
        datasets: [
          {
            label: "Total Staked (ETH)",
            data: stakingData,
            borderColor: "rgba(124, 58, 237, 1)",
            backgroundColor: "rgba(124, 58, 237, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
          {
            label: "Rewards Earned (ETH)",
            data: rewardsData,
            borderColor: "rgba(59, 130, 246, 1)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      })

      setIsLoading(false)
    }, 500)
  }, [timeRange])

  // Helper function to generate labels based on time range
  const generateLabels = (range: TimeRange) => {
    const now = new Date()
    const labels = []

    switch (range) {
      case "1W":
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        }
        break
      case "1M":
        for (let i = 30; i >= 0; i -= 3) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        }
        break
      case "3M":
        for (let i = 90; i >= 0; i -= 10) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          labels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        }
        break
      case "1Y":
        for (let i = 0; i < 12; i++) {
          const date = new Date(now)
          date.setMonth(date.getMonth() - i)
          labels.unshift(date.toLocaleDateString("en-US", { month: "short" }))
        }
        break
      case "ALL":
        for (let i = 0; i < 24; i += 3) {
          const date = new Date(now)
          date.setMonth(date.getMonth() - i)
          labels.unshift(date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }))
        }
        break
    }

    return labels
  }

  // Helper function to generate staking data
  const generateStakingData = (range: TimeRange) => {
    const dataPoints = []
    let baseValue = 10 // Starting value
    const pointCount = range === "1W" ? 7 : range === "1M" ? 11 : range === "3M" ? 10 : range === "1Y" ? 12 : 8

    for (let i = 0; i < pointCount; i++) {
      // Add some randomness but with an upward trend
      const randomFactor = Math.random() * 0.2 - 0.05 // Between -0.05 and 0.15
      const growthFactor = 0.05 // Steady growth

      baseValue = baseValue * (1 + randomFactor + growthFactor)
      dataPoints.push(baseValue)
    }

    return dataPoints
  }

  // Helper function to generate rewards data
  const generateRewardsData = (range: TimeRange) => {
    const dataPoints = []
    let baseValue = 0.5 // Starting value
    const pointCount = range === "1W" ? 7 : range === "1M" ? 11 : range === "3M" ? 10 : range === "1Y" ? 12 : 8

    for (let i = 0; i < pointCount; i++) {
      // Add some randomness but with an upward trend
      const randomFactor = Math.random() * 0.1 - 0.02 // Between -0.02 and 0.08
      const growthFactor = 0.03 // Steady growth

      baseValue = baseValue * (1 + randomFactor + growthFactor)
      dataPoints.push(baseValue)
    }

    return dataPoints
  }

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(124, 58, 237, 0.5)",
        borderWidth: 1,
        padding: 10,
        titleColor: "rgba(255, 255, 255, 0.9)",
        bodyColor: "rgba(255, 255, 255, 0.7)",
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  }

  return (
    <Card className="glassmorphism neon-border overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Staking Performance</CardTitle>
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
            <TabsList className="bg-background/50">
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
              <TabsTrigger value="3M">3M</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
              <TabsTrigger value="ALL">ALL</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-[300px]"
          >
            <Line data={chartData} options={chartOptions} />
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
