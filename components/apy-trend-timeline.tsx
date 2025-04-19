"use client"

import { useEffect, useRef } from "react"

export function APYTrendTimeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Data points - [year, lido, rocketpool, binance, coinbase]
    const data = [
      { year: 2020, lido: 20, rocketpool: 0, binance: 0, coinbase: 0 },
      { year: 2021, lido: 9.5, rocketpool: 8.2, binance: 7.8, coinbase: 0 },
      { year: 2022, lido: 5.4, rocketpool: 4.9, binance: 5.1, coinbase: 4.5 },
      { year: 2023, lido: 4.2, rocketpool: 3.8, binance: 4.3, coinbase: 3.5 },
      { year: 2024, lido: 3.6, rocketpool: 3.2, binance: 3.8, coinbase: 3.0 },
      { year: 2025, lido: 3.28, rocketpool: 2.8, binance: 3.5, coinbase: 2.65 },
    ]

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, width, height)

    // Calculate scales
    const xScale = (width - padding * 2) / (data.length - 1)
    const maxAPY = 22
    const yScale = (height - padding * 2) / maxAPY

    // Draw axes
    ctx.strokeStyle = "#ddd"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw Y-axis labels
    ctx.fillStyle = "#666"
    ctx.font = "12px Arial"
    ctx.textAlign = "right"
    for (let i = 0; i <= maxAPY; i += 5) {
      const y = height - padding - i * yScale
      ctx.fillText(`${i}%`, padding - 10, y + 4)
      ctx.beginPath()
      ctx.moveTo(padding - 5, y)
      ctx.lineTo(padding, y)
      ctx.stroke()
    }

    // Draw X-axis labels
    ctx.textAlign = "center"
    data.forEach((point, i) => {
      const x = padding + i * xScale
      ctx.fillText(point.year.toString(), x, height - padding + 20)
    })

    // Draw lines
    const drawLine = (dataKey: string, color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      data.forEach((point, i) => {
        const x = padding + i * xScale
        const y = height - padding - (point[dataKey as keyof typeof point] as number) * yScale
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw points
      ctx.fillStyle = color
      data.forEach((point, i) => {
        const x = padding + i * xScale
        const y = height - padding - (point[dataKey as keyof typeof point] as number) * yScale
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw lines for each platform
    drawLine("lido", "#00A3FF")
    drawLine("rocketpool", "#FF5C00")
    drawLine("binance", "#F0B90B")
    drawLine("coinbase", "#0052FF")

    // Draw legend
    const legendX = width - padding - 150
    const legendY = padding + 20
    const legendSpacing = 25

    const drawLegendItem = (label: string, color: string, index: number) => {
      const y = legendY + index * legendSpacing
      ctx.fillStyle = color
      ctx.fillRect(legendX, y - 8, 16, 4)
      ctx.fillStyle = "#333"
      ctx.textAlign = "left"
      ctx.fillText(label, legendX + 24, y)
    }

    drawLegendItem("Lido", "#00A3FF", 0)
    drawLegendItem("Rocket Pool", "#FF5C00", 1)
    drawLegendItem("Binance", "#F0B90B", 2)
    drawLegendItem("Coinbase", "#0052FF", 3)

    // Draw title
    ctx.fillStyle = "#333"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Ethereum Staking APY Trends (2020-2025)", width / 2, 20)
  }, [])

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md border border-gray-200 my-6">
      <canvas ref={canvasRef} width={800} height={400} className="w-full h-auto" />
      <div className="text-xs text-gray-500 mt-2 text-center">
        Data sources: Ethereum Foundation, StakingRewards.com, platform documentation
      </div>
    </div>
  )
}
