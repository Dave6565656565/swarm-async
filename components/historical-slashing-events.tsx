"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "2020 Q4",
    "Slashing Events": 12,
    "ETH Slashed": 120,
  },
  {
    name: "2021 Q1",
    "Slashing Events": 8,
    "ETH Slashed": 75,
  },
  {
    name: "2021 Q2",
    "Slashing Events": 15,
    "ETH Slashed": 210,
  },
  {
    name: "2021 Q3",
    "Slashing Events": 6,
    "ETH Slashed": 45,
  },
  {
    name: "2021 Q4",
    "Slashing Events": 18,
    "ETH Slashed": 320,
  },
  {
    name: "2022 Q1",
    "Slashing Events": 22,
    "ETH Slashed": 380,
  },
  {
    name: "2022 Q2",
    "Slashing Events": 14,
    "ETH Slashed": 190,
  },
  {
    name: "2022 Q3",
    "Slashing Events": 9,
    "ETH Slashed": 110,
  },
  {
    name: "2022 Q4",
    "Slashing Events": 11,
    "ETH Slashed": 150,
  },
  {
    name: "2023 Q1",
    "Slashing Events": 7,
    "ETH Slashed": 85,
  },
  {
    name: "2023 Q2",
    "Slashing Events": 5,
    "ETH Slashed": 60,
  },
  {
    name: "2023 Q3",
    "Slashing Events": 4,
    "ETH Slashed": 40,
  },
  {
    name: "2023 Q4",
    "Slashing Events": 3,
    "ETH Slashed": 35,
  },
]

export function HistoricalSlashingEvents() {
  return (
    <div className="w-full h-[400px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="Slashing Events" fill="#8884d8" />
          <Bar yAxisId="right" dataKey="ETH Slashed" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
