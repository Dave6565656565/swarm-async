"use client"

import { useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProtocolComparisonMobile() {
  const [selectedProtocol, setSelectedProtocol] = useState("lido")

  const protocols = {
    lido: {
      name: "Lido",
      logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png",
      tokenType: "stETH (Rebasing)",
      apy: "3.5%",
      minStake: "0.01 ETH",
      decentralization: "Medium (60%)",
      marketShare: "~30%",
    },
    rocketpool: {
      name: "Rocket Pool",
      logo: "https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true",
      tokenType: "rETH (Value-accruing)",
      apy: "3.8%",
      minStake: "0.01 ETH",
      decentralization: "High (90%)",
      marketShare: "~8%",
    },
    coinbase: {
      name: "Coinbase",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s",
      tokenType: "cbETH (Value-accruing)",
      apy: "3.2%",
      minStake: "0.01 ETH",
      decentralization: "Low (20%)",
      marketShare: "~7%",
    },
    frax: {
      name: "Frax",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75b9jMdiuMz-QCpDyQa2Q5jWEfN8jSYJtsQ&s",
      tokenType: "frxETH/sfrxETH (Two-token system)",
      apy: "3.6%",
      minStake: "0.01 ETH",
      decentralization: "Medium-High (70%)",
      marketShare: "~5%",
    },
  }

  const protocol = protocols[selectedProtocol as keyof typeof protocols]

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-700">Select Protocol to Compare</label>
        <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a protocol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lido">Lido</SelectItem>
            <SelectItem value="rocketpool">Rocket Pool</SelectItem>
            <SelectItem value="coinbase">Coinbase</SelectItem>
            <SelectItem value="frax">Frax</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 text-center bg-gray-50 border-b border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
            <Image src={protocol.logo || "/placeholder.svg"} alt={protocol.name} width={32} height={32} />
          </div>
          <h3 className="font-bold text-lg text-gray-800">{protocol.name}</h3>
        </div>

        <div className="divide-y divide-gray-200">
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Token Type</span>
            <span className="font-medium text-gray-800">{protocol.tokenType}</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Current APY</span>
            <span className="font-medium text-emerald-600">{protocol.apy}</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Min Stake</span>
            <span className="font-medium text-gray-800">{protocol.minStake}</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Decentralization</span>
            <span className="font-medium text-gray-800">{protocol.decentralization}</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className="text-gray-600">Market Share</span>
            <span className="font-medium text-gray-800">{protocol.marketShare}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
