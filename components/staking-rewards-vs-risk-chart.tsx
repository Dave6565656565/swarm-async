"use client"

import {
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Solo Staking", reward: 4.8, risk: 75, size: 1800 },
  { name: "Staking Service", reward: 4.2, risk: 55, size: 1600 },
  { name: "Pooled Staking", reward: 4.0, risk: 45, size: 2200 },
  { name: "Exchange Staking", reward: 3.5, risk: 30, size: 2800 },
  { name: "Liquid Staking", reward: 4.3, risk: 50, size: 2400 },
  { name: "Staking-as-a-Service", reward: 4.0, risk: 40, size: 1400 },
  { name: "Custodial Staking", reward: 3.2, risk: 25, size: 1200 },
]

export function StakingRewardsVsRiskChart() {
  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="risk" name="Risk Score" unit="/100" />
          <YAxis type="number" dataKey="reward" name="Annual Reward" unit="%" />
          <ZAxis type="number" dataKey="size" range={[100, 500]} name="Market Share" />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value, name) => {
              if (name === "Risk Score") return [`${value}/100`, name]
              if (name === "Annual Reward") return [`${value}%`, name]
              return [value, name]
            }}
          />
          <Legend />
          <Scatter name="Staking Methods" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
