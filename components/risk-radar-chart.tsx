"use client"

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"

const data = [
  {
    subject: "Slashing Risk",
    solo: 80,
    pooled: 40,
    exchange: 20,
    fullMark: 100,
  },
  {
    subject: "Smart Contract Risk",
    solo: 10,
    pooled: 70,
    exchange: 90,
    fullMark: 100,
  },
  {
    subject: "Liquidity Risk",
    solo: 70,
    pooled: 40,
    exchange: 20,
    fullMark: 100,
  },
  {
    subject: "Centralization Risk",
    solo: 10,
    pooled: 60,
    exchange: 90,
    fullMark: 100,
  },
  {
    subject: "Regulatory Risk",
    solo: 30,
    pooled: 50,
    exchange: 70,
    fullMark: 100,
  },
  {
    subject: "Technical Complexity",
    solo: 90,
    pooled: 50,
    exchange: 20,
    fullMark: 100,
  },
]

export function RiskRadarChart() {
  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Solo Staking" dataKey="solo" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
          <Radar name="Pooled Staking" dataKey="pooled" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
          <Radar name="Exchange Staking" dataKey="exchange" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
