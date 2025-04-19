"use client"

import { useEffect, useRef } from "react"

export function PlatformComparisonChart({ platform = "lido" }: { platform?: string }) {
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

    // Platform-specific data
    const platformData: Record<string, { color: string; apy: number; security: number; liquidity: number }> = {
      lido: { color: "#00A3FF", apy: 3.28, security: 80, liquidity: 90 },
      rocketpool: { color: "#FF5C00", apy: 2.8, security: 90, liquidity: 80 },
      binance: { color: "#F0B90B", apy: 3.5, security: 70, liquidity: 50 },
      coinbase: { color: "#0052FF", apy: 2.65, security: 80, liquidity: 50 },
      mexc: { color: "#05C19E", apy: 4.8, security: 70, liquidity: 90 },
    }

    const data = platformData[platform] || platformData.lido

    // Draw background
    ctx.fillStyle = "#f8f9fa"
    ctx.fillRect(0, 0, width, height)

    // Draw chart
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    // Draw radar chart
    const metrics = [
      { name: "APY", value: data.apy / 5 }, // Normalize to 0-1 range (max APY is ~5%)
      { name: "Security", value: data.security / 100 },
      { name: "Liquidity", value: data.liquidity / 100 },
    ]

    const angles = metrics.map((_, i) => (i * 2 * Math.PI) / metrics.length)

    // Draw axes
    ctx.strokeStyle = "#ddd"
    ctx.lineWidth = 1
    for (let i = 0; i < metrics.length; i++) {
      const angle = angles[i]
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
      ctx.stroke()
    }

    // Draw radar
    ctx.beginPath()
    for (let i = 0; i < metrics.length; i++) {
      const angle = angles[i]
      const value = metrics[i].value
      const x = centerX + radius * value * Math.cos(angle)
      const y = centerY + radius * value * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fillStyle = `${data.color}33` // Add transparency
    ctx.fill()
    ctx.strokeStyle = data.color
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw labels
    ctx.fillStyle = "#333"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    for (let i = 0; i < metrics.length; i++) {
      const angle = angles[i]
      const x = centerX + (radius + 20) * Math.cos(angle)
      const y = centerY + (radius + 20) * Math.sin(angle)
      ctx.fillText(metrics[i].name, x, y)
    }

    // Draw platform name
    ctx.fillStyle = "#333"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(platform.charAt(0).toUpperCase() + platform.slice(1), centerX, centerY - radius - 30)

    // Draw metrics values
    ctx.font = "12px Arial"
    ctx.fillText(`APY: ${data.apy}%`, centerX, centerY - radius - 10)
    ctx.fillText(`Security: ${data.security}/100`, centerX, centerY + radius + 20)
    ctx.fillText(`Liquidity: ${data.liquidity}/100`, centerX, centerY + radius + 40)
  }, [platform])

  return <canvas ref={canvasRef} width={400} height={300} className="w-full h-full" />
}
