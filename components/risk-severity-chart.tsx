"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Offline",
    value: 20,
    color: "#84cc16",
  },
  {
    name: "Missed Attestation",
    value: 35,
    color: "#facc15",
  },
  {
    name: "Double Signing",
    value: 75,
    color: "#f97316",
  },
  {
    name: "Surround Vote",
    value: 85,
    color: "#ef4444",
  },
]

export function RiskSeverityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="currentColor" className="fill-primary">
          {data.map((entry, index) => (
            <rect key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
