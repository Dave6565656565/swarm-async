"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  ChevronDown,
  ArrowRight,
  Download,
  Twitter,
  Linkedin,
  Info,
  Check,
  ExternalLink,
  ChevronRight,
  Share2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

// Interactive LSD Calculator component
const LSDCalculator = () => {
  const [amount, setAmount] = useState<number>(10)
  const [period, setPeriod] = useState<number>(12) // months
  const [selectedProtocol, setSelectedProtocol] = useState<string>("lido")

  const protocols = {
    lido: { name: "Lido", apy: 3.5, fee: 10 },
    rocketpool: { name: "Rocket Pool", apy: 3.8, fee: 15 },
    coinbase: { name: "Coinbase", apy: 3.2, fee: 25 },
    frax: { name: "Frax", apy: 3.6, fee: 10 },
  }

  const calculateReturns = () => {
    const protocol = protocols[selectedProtocol as keyof typeof protocols]
    const apy = protocol.apy / 100
    const years = period / 12

    // Simple compound interest formula: P(1 + r)^t
    const totalValue = amount * Math.pow(1 + apy, years)
    const totalRewards = totalValue - amount

    return {
      totalValue: totalValue.toFixed(4),
      totalRewards: totalRewards.toFixed(4),
      apy: protocol.apy.toFixed(1),
      fee: protocol.fee,
    }
  }

  const results = calculateReturns()

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-800">LSD Staking Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Select Protocol</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(protocols).map(([id, protocol]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedProtocol(id)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedProtocol === id
                        ? "bg-gray-100 border border-gray-300"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-gray-800">{protocol.name}</div>
                    <div className="text-sm text-emerald-600">{protocol.apy}% APY</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Amount to Stake (ETH): {amount}</label>
              <Slider
                value={[amount]}
                min={0.1}
                max={100}
                step={0.1}
                onValueChange={(value) => setAmount(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.1 ETH</span>
                <span>100 ETH</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Staking Period: {period} months</label>
              <Slider
                value={[period]}
                min={1}
                max={60}
                step={1}
                onValueChange={(value) => setPeriod(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 month</span>
                <span>5 years</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex-grow">
              <h4 className="text-lg font-medium mb-4 text-gray-800">Estimated Returns</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Initial Investment</span>
                  <span className="font-medium text-gray-800">{amount.toFixed(2)} ETH</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Staking Period</span>
                  <span className="font-medium text-gray-800">{period} months</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Protocol</span>
                  <span className="font-medium text-gray-800">
                    {protocols[selectedProtocol as keyof typeof protocols].name}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">APY</span>
                  <span className="font-medium text-emerald-600">{results.apy}%</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Protocol Fee</span>
                  <span className="font-medium text-gray-800">{results.fee}%</span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Rewards</span>
                    <span className="font-medium text-emerald-600">+{results.totalRewards} ETH</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Final Balance</span>
                    <span className="text-xl font-bold text-gray-800">{results.totalValue} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              This calculator provides estimates based on current APY rates. Actual returns may vary.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Protocol Comparison component
const ProtocolComparison = () => {
  return (
    <div className="w-full overflow-x-auto pb-4 -mx-4 sm:mx-0">
      <div className="min-w-[800px] px-4 sm:px-0">
        <div className="grid grid-cols-5 gap-4">
          <div className="p-4"></div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Image src="/placeholder.svg?height=24&width=24&text=Lido" alt="Lido" width={24} height={24} />
            </div>
            <span className="text-gray-800">Lido</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Image src="/placeholder.svg?height=24&width=24&text=RP" alt="Rocket Pool" width={24} height={24} />
            </div>
            <span className="text-gray-800">Rocket Pool</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Image src="/placeholder.svg?height=24&width=24&text=CB" alt="Coinbase" width={24} height={24} />
            </div>
            <span className="text-gray-800">Coinbase</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Image src="/placeholder.svg?height=24&width=24&text=Frax" alt="Frax" width={24} height={24} />
            </div>
            <span className="text-gray-800">Frax</span>
          </div>

          {/* Token Type */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Token Type</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            stETH
            <br />
            <span className="text-xs text-gray-500">Rebasing</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            rETH
            <br />
            <span className="text-xs text-gray-500">Value-accruing</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            cbETH
            <br />
            <span className="text-xs text-gray-500">Value-accruing</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            frxETH/sfrxETH
            <br />
            <span className="text-xs text-gray-500">Two-token system</span>
          </div>

          {/* APY */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Current APY</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.5%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.8%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.2%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.6%</div>

          {/* Min Stake */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Min Stake</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>

          {/* Decentralization */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Decentralization</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Low</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium-High</div>
          </div>

          {/* Market Share */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Market Share</div>
          <div className="p-4 text-center bg-white border border-gray-100 font-medium text-gray-800">~30%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~8%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~7%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~5%</div>
        </div>
      </div>
    </div>
  )
}

// Animated diagram component
const AnimatedDiagram = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Liquid Staking Works</h3>

      <div className="relative h-[250px] sm:h-[300px] md:h-[400px]">
        {/* ETH Deposit */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <span className="text-3xl text-gray-800">Ξ</span>
          </div>
          <div className="font-medium text-gray-800">ETH Deposit</div>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          className="absolute top-[15%] left-[26%] w-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
          <div className="absolute right-0 top-[-4px] text-gray-500">
            <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* Staking Protocol */}
        <motion.div
          className="absolute top-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Staking</div>
              <div className="text-sm text-gray-800">Protocol</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Lido, Rocket Pool, etc.</div>
        </motion.div>

        {/* Arrow 2 Down */}
        <motion.div
          className="absolute top-[32%] left-[52%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} />
          </div>
        </motion.div>

        {/* Validator */}
        <motion.div
          className="absolute top-[48%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Ethereum</div>
              <div className="text-sm text-gray-800">Validators</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Securing the Network</div>
        </motion.div>

        {/* Arrow 3 Up */}
        <motion.div
          className="absolute top-[32%] left-[67%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-t from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute top-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} style={{ transform: "rotate(180deg)" }} />
          </div>
        </motion.div>

        {/* LSD Token */}
        <motion.div
          className="absolute top-[10%] left-[75%] w-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <span className="text-xl text-gray-800">stETH</span>
          </div>
          <div className="font-medium text-gray-800">LSD Token</div>
        </motion.div>

        {/* Arrow 4 Down to DeFi */}
        <motion.div
          className="absolute top-[32%] left-[80%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} />
          </div>
        </motion.div>

        {/* DeFi */}
        <motion.div
          className="absolute top-[48%] left-[70%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">DeFi</div>
              <div className="text-sm text-gray-800">Applications</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Lending, Trading, Yield</div>
        </motion.div>

        {/* Rewards Flow */}
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[60%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
        >
          <div className="w-full h-16 mx-auto rounded-lg bg-gray-50 flex items-center justify-center">
            <div className="flex items-center">
              <div className="text-emerald-600 mr-2">Staking Rewards</div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-gray-400 relative">
                <motion.div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-emerald-500"
                  animate={{ x: [0, 128, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                />
              </div>
              <div className="text-gray-700 ml-2">Token Value Increase</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Token Type Comparison
const TokenTypeComparison = () => {
  const [activeTab, setActiveTab] = useState("rebasing")

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">LSD Token Types Compared</h3>

      <Tabs defaultValue="rebasing" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
          <TabsTrigger value="rebasing" className="data-[state=active]:bg-white">
            Rebasing Tokens
          </TabsTrigger>
          <TabsTrigger value="value-accruing" className="data-[state=active]:bg-white">
            Value-Accruing Tokens
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rebasing" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4 text-gray-800">Rebasing Mechanism</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-gray-800">Day 1: 10 stETH</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="mb-2 text-gray-800">Day 30: 10.05 stETH</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="text-gray-800">Day 365: 10.60 stETH</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                With rebasing tokens like Lido's stETH, the number of tokens in your wallet automatically increases as
                rewards accrue. The exchange rate between the LSD and ETH remains roughly 1:1.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Check size={16} className="mr-2 text-emerald-600" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Simple to understand - 1 stETH ≈ 1 ETH</li>
                  <li>• Rewards are visible as your token balance increases</li>
                  <li>• No need to calculate exchange rates</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Info size={16} className="mr-2 text-amber-600" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rebasing can create tax complications in some jurisdictions</li>
                  <li>• Some DeFi protocols don't handle rebasing tokens well</li>
                  <li>• Can be more gas-intensive due to frequent rebases</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 text-gray-800">Examples</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image src="/placeholder.svg?height=16&width=16&text=L" alt="Lido" width={16} height={16} />
                  </div>
                  <div className="text-gray-800">Lido's stETH</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="value-accruing" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4 text-gray-800">Value-Accruing Mechanism</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-gray-800">Day 1: 10 rETH = 10 ETH</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="mb-2 text-gray-800">Day 30: 10 rETH = 10.05 ETH</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="text-gray-800">Day 365: 10 rETH = 10.60 ETH</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                With value-accruing tokens like Rocket Pool's rETH, the number of tokens remains constant, but each
                token becomes worth more ETH over time. The exchange rate between the LSD and ETH increases as rewards
                accrue.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Check size={16} className="mr-2 text-emerald-600" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• May have simpler tax treatment in some jurisdictions</li>
                  <li>• Better compatibility with DeFi protocols</li>
                  <li>• No gas costs for rebasing</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Info size={16} className="mr-2 text-amber-600" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rewards are less visible as token balance doesn't change</li>
                  <li>• Need to track exchange rate to know your actual ETH value</li>
                  <li>• Can be confusing for new users</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 text-gray-800">Examples</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=16&width=16&text=R"
                        alt="Rocket Pool"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="text-gray-800">Rocket Pool's rETH</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image src="/placeholder.svg?height=16&width=16&text=C" alt="Coinbase" width={16} height={16} />
                    </div>
                    <div className="text-gray-800">Coinbase's cbETH</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Sticky Table of Contents component
const StickyTableOfContents = () => {
  const [activeSection, setActiveSection] = useState("introduction")
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => {
      if (observer.current) {
        observer.current.observe(section)
      }
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 rounded-lg bg-white shadow-md border border-gray-200">
      <h3 className="text-lg font-medium mb-4 text-gray-800">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a
            href="#introduction"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "introduction" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Introduction
          </a>
        </li>
        <li>
          <a
            href="#what-are-lsds"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "what-are-lsds" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            What Are Liquid Staking Derivatives?
          </a>
        </li>
        <li>
          <a
            href="#how-they-work"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "how-they-work" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            How They Work
          </a>
        </li>
        <li>
          <a
            href="#major-protocols"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "major-protocols" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Major Protocols
          </a>
        </li>
        <li>
          <a
            href="#benefits"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "benefits" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Benefits
          </a>
        </li>
        <li>
          <a
            href="#risks"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "risks" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Risks and Challenges
          </a>
        </li>
        <li>
          <a
            href="#impact"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "impact" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Impact on Ethereum
          </a>
        </li>
        <li>
          <a
            href="#choosing"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "choosing" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Choosing the Right Solution
          </a>
        </li>
        <li>
          <a
            href="#future"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "future" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            The Future of LSDs
          </a>
        </li>
        <li>
          <a
            href="#conclusion"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "conclusion" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Conclusion
          </a>
        </li>
      </ul>
    </div>
  )
}

// Share functionality
const ShareButtons = () => {
  const generatePDF = () => {
    // Create a link element
    const link = document.createElement("a")

    // Set link properties for PDF download
    link.href = "/api/generate-pdf?article=liquid-staking-derivatives"
    link.download = "Liquid-Staking-Derivatives-Explained.pdf"

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = "Liquid Staking Derivatives Explained"
    const text = "Learn about Liquid Staking Derivatives and how they're revolutionizing Ethereum staking."

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "pdf":
        // Generate and download PDF
        generatePDF()
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({ title, text, url })
          } catch (err) {
            console.error("Error sharing:", err)
          }
        } else {
          await navigator.clipboard.writeText(url)
          alert("Link copied to clipboard!")
        }
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50 h-10 sm:h-9 px-3 sm:px-4"
        onClick={() => handleShare("pdf")}
      >
        <Download className="mr-2 h-4 w-4" />
        PDF
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50 h-10 sm:h-9 px-3 sm:px-4"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50 h-10 sm:h-9 px-3 sm:px-4"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50 h-10 sm:h-9 px-3 sm:px-4"
        onClick={() => handleShare("general")}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Related Articles component
const RelatedArticles = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-network.png" alt="Ethereum Staking" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Ethereum Staking for Beginners</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">A complete guide to getting started with ETH staking</p>
            <Link
              href="/articles/ethereum-staking-for-beginners"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/defi-yield-comparison.png" alt="DeFi Yield Comparison" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Staking vs DeFi Yields</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Comparing returns across different Ethereum yield strategies
            </p>
            <Link
              href="/articles/staking-vs-defi-yields"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/ethereum-staking-evolution.png"
              alt="Future of Ethereum Staking"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Future of Ethereum Staking</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Upcoming developments in the Ethereum staking ecosystem
            </p>
            <Link
              href="/articles/future-of-ethereum-staking"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LiquidStakingDerivativesArticle() {
  return (
    <div className="min-h-screen relative bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" asChild className="border-gray-300 bg-white hover:bg-gray-50">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <ShareButtons />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            {/* Hero Image */}
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-4 sm:mb-6 relative">
              <Image
                src="/ethereal-ethereum-flow.png"
                alt="Liquid Staking Derivatives"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 800px"
              />
            </div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Liquid Staking Derivatives Explained
            </motion.h1>

            <motion.div
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Unlocking the Power of Staked ETH
            </motion.div>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>By Dave Baghi</span>
              <span className="mx-2">•</span>
              <span>April 16, 2025</span>
              <span className="mx-2">•</span>
              <span>11 min read</span>
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden bg-white shadow-md border border-gray-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
              <h2 className="text-lg font-bold mb-3 text-gray-800">Table of Contents</h2>
              <ul className="space-y-1.5">
                <li>
                  <a href="#introduction" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Introduction to Liquid Staking Derivatives
                  </a>
                </li>
                <li>
                  <a href="#what-are-lsds" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    What Are Liquid Staking Derivatives?
                  </a>
                </li>
                <li>
                  <a href="#how-they-work" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    How Liquid Staking Derivatives Work
                  </a>
                </li>
                <li>
                  <a href="#major-protocols" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Major Liquid Staking Protocols
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Benefits of Liquid Staking Derivatives
                  </a>
                </li>
                <li>
                  <a href="#risks" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Risks and Challenges
                  </a>
                </li>
                <li>
                  <a href="#impact" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Impact on the Ethereum Ecosystem
                  </a>
                </li>
                <li>
                  <a href="#choosing" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Choosing the Right Solution
                  </a>
                </li>
                <li>
                  <a href="#future" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    The Future of LSDs
                  </a>
                </li>
                <li>
                  <a href="#conclusion" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Conclusion
                  </a>
                </li>
              </ul>
            </div>

            {/* Introduction */}
            <section id="introduction" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Introduction to Liquid Staking Derivatives
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                Ethereum's transition to Proof of Stake (PoS) created new opportunities for ETH holders to earn rewards
                by staking their assets. However, traditional staking comes with a significant drawback:{" "}
                <strong>illiquidity</strong>. When you stake your ETH directly with the network, those assets are locked
                up and unavailable for other uses.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                This is where Liquid Staking Derivatives (LSDs) come in. These innovative financial instruments have
                revolutionized the Ethereum staking ecosystem by solving the illiquidity problem while still allowing
                users to participate in network validation and earn staking rewards.
              </p>

              <p className="text-lg mb-6 text-gray-800">
                In this comprehensive guide, we'll explore what LSDs are, how they work, their benefits and risks, and
                their profound impact on the broader Ethereum ecosystem.
              </p>

              <AnimatedDiagram />
            </section>

            {/* What Are LSDs */}
            <section id="what-are-lsds" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                What Are Liquid Staking Derivatives?
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Liquid Staking Derivatives are tokenized representations of staked ETH that allow users to maintain
                liquidity while still earning staking rewards. When you use a liquid staking service, you receive a
                token that represents your staked ETH plus accrued rewards.
              </p>

              <p className="text-lg mb-8 text-gray-800">
                These tokens can be freely transferred, traded, or used in DeFi applications while your original ETH
                remains staked on the Ethereum network, generating rewards that are reflected in the value of your LSD
                tokens.
              </p>

              <TokenTypeComparison />
            </section>

            {/* How They Work */}
            <section id="how-they-work" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How Liquid Staking Derivatives Work
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                To understand LSDs, it's helpful to walk through the typical process of using a liquid staking service:
              </p>

              <ol className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    1
                  </div>
                  <div>
                    <strong className="text-gray-800">Deposit ETH:</strong>{" "}
                    <span className="text-gray-600">Users deposit their ETH into a liquid staking protocol</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    2
                  </div>
                  <div>
                    <strong className="text-gray-800">Receive LSD Tokens:</strong>{" "}
                    <span className="text-gray-600">
                      In return, users receive LSD tokens (like stETH, rETH, or cbETH) that represent their staked
                      position
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    3
                  </div>
                  <div>
                    <strong className="text-gray-800">Protocol Stakes ETH:</strong>{" "}
                    <span className="text-gray-600">
                      The protocol uses the deposited ETH to create validators or stake with existing validators
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    4
                  </div>
                  <div>
                    <strong className="text-gray-800">Rewards Accrue:</strong>{" "}
                    <span className="text-gray-600">
                      As staking rewards are earned, they're reflected in the value of the LSD tokens
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    5
                  </div>
                  <div>
                    <strong className="text-gray-800">Use LSD Tokens:</strong>{" "}
                    <span className="text-gray-600">
                      Users can hold their LSD tokens to continue earning rewards, or use them in DeFi applications
                    </span>
                  </div>
                </li>
              </ol>
            </section>

            {/* Major Protocols */}
            <section id="major-protocols" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Major Liquid Staking Protocols
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Several protocols have emerged as leaders in the liquid staking space, each with its own approach and
                characteristics:
              </p>

              <ProtocolComparison />
            </section>

            {/* Benefits */}
            <section id="benefits" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Benefits of Liquid Staking Derivatives
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Key Benefits</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0 mt-1">
                      <Check size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Maintain Liquidity</h4>
                      <p className="text-gray-600">
                        Unlike traditional staking where your ETH is locked, LSDs allow you to maintain liquidity while
                        still earning staking rewards. You can trade, transfer, or use your tokens at any time.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0 mt-1">
                      <Check size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Lower Barriers to Entry</h4>
                      <p className="text-gray-600">
                        Most liquid staking protocols allow you to stake any amount of ETH, removing the 32 ETH minimum
                        required for solo staking. This makes staking accessible to smaller holders.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0 mt-1">
                      <Check size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">DeFi Composability</h4>
                      <p className="text-gray-600">
                        LSD tokens can be used across the DeFi ecosystem. You can lend them, use them as collateral,
                        provide liquidity, or participate in yield farming strategies while still earning staking
                        rewards.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0 mt-1">
                      <Check size={16} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">No Technical Expertise Required</h4>
                      <p className="text-gray-600">
                        Liquid staking protocols handle all the technical aspects of running validators, including
                        hardware maintenance, software updates, and slashing protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <LSDCalculator />
            </section>

            {/* Risks */}
            <section id="risks" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Risks and Challenges
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                While LSDs offer significant benefits, they also come with their own set of risks and challenges that
                users should understand:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-red-100 rounded-full p-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 9V13"
                          stroke="#DC2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 17H12.01"
                          stroke="#DC2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 2L22 20H2L12 2Z"
                          stroke="#DC2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Smart Contract Risk</h3>
                  </div>
                  <p className="text-gray-600">
                    LSDs rely on smart contracts that could contain bugs or vulnerabilities. While most protocols have
                    been audited, smart contract risk can never be completely eliminated.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-amber-100 rounded-full p-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                          stroke="#D97706"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Slashing Risk</h3>
                  </div>
                  <p className="text-gray-600">
                    If validators operated by the protocol misbehave or go offline, they can be slashed (penalized),
                    which would reduce the value of LSD tokens.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V16"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="#2563EB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Liquidity Risk</h3>
                  </div>
                  <p className="text-gray-600">
                    While LSD tokens are generally liquid, they can trade at a discount to their underlying value during
                    market stress or if there are concerns about the protocol.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 rounded-full p-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H8"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                          stroke="#7C3AED"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Centralization Concerns</h3>
                  </div>
                  <p className="text-gray-600">
                    Some liquid staking protocols are more centralized than others, which could pose risks to Ethereum's
                    decentralization if they become too dominant.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 rounded-full p-1 flex-shrink-0 mt-1">
                    <Info size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Risk Mitigation</h4>
                    <p className="text-amber-700">
                      To minimize risks, consider diversifying across multiple liquid staking protocols, researching
                      their security practices and governance models, and only investing what you can afford to lose.
                      Always do your own research before participating in any DeFi protocol.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Impact on the Ethereum Ecosystem
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Liquid staking derivatives have had a profound impact on the Ethereum ecosystem, influencing everything
                from network security to DeFi innovation:
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Increased Staking Participation</h3>
                  <p className="text-gray-600 mb-4">
                    LSDs have significantly lowered the barriers to staking, leading to increased participation in
                    Ethereum's consensus mechanism. This has helped secure the network while making staking rewards
                    accessible to a broader range of users.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Total ETH Staked</span>
                      <span className="font-bold text-gray-800">~30M ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Liquid Staking Share</span>
                      <span className="font-bold text-gray-800">~40%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">DeFi Innovation</h3>
                  <p className="text-gray-600">
                    LSD tokens have become fundamental building blocks in DeFi, enabling new yield strategies,
                    collateral types, and financial products. They've created a new category of "productive assets" that
                    earn yield while remaining liquid and composable.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Capital Efficiency</h3>
                  <p className="text-gray-600">
                    By allowing staked ETH to remain productive in DeFi, LSDs have dramatically improved capital
                    efficiency across the Ethereum ecosystem. Users can now earn staking rewards while simultaneously
                    participating in lending, trading, and other DeFi activities.
                  </p>
                </div>
              </div>
            </section>

            {/* Choosing */}
            <section id="choosing" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Choosing the Right Liquid Staking Solution
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                With multiple liquid staking protocols available, choosing the right one depends on your priorities and
                risk tolerance. Here are key factors to consider:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">Decentralization</h3>
                  <p className="text-gray-600 mb-4">
                    Consider how decentralized the protocol is in terms of governance, validator selection, and
                    operations.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rocket Pool</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500">High</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lido</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 h-2 rounded-full">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500">Medium</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Coinbase</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 h-2 rounded-full">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <span className="text-xs text-gray-500">Low</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-gray-800">Fees</h3>
                  <p className="text-gray-600 mb-4">
                    Compare the fees charged by different protocols, as they directly impact your returns.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Lido</span>
                      <span className="text-sm font-medium text-gray-800">10%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Frax</span>
                      <span className="text-sm font-medium text-gray-800">10%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Rocket Pool</span>
                      <span className="text-sm font-medium text-gray-800">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Coinbase</span>
                      <span className="text-sm font-medium text-gray-800">25%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-1 flex-shrink-0 mt-1">
                    <Info size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Diversification Strategy</h4>
                    <p className="text-blue-700">
                      Consider diversifying across multiple liquid staking protocols to reduce concentration risk and
                      support Ethereum's decentralization. Many experienced users split their holdings between 2-3
                      different protocols.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Future */}
            <section id="future" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Future of Liquid Staking Derivatives
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                The liquid staking ecosystem continues to evolve rapidly, with several exciting developments on the
                horizon:
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Withdrawal Functionality</h3>
                  <p className="text-gray-600">
                    With Ethereum's Shanghai upgrade enabling validator withdrawals, liquid staking protocols are
                    implementing direct redemption mechanisms, allowing users to exchange their LSD tokens directly for
                    ETH without relying on secondary markets.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Improved Decentralization</h3>
                  <p className="text-gray-600">
                    New protocols are focusing on further decentralizing validator operations, with innovations like
                    distributed validator technology (DVT) that allows multiple parties to jointly operate a single
                    validator, reducing single points of failure.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">Cross-Chain Expansion</h3>
                  <p className="text-gray-600">
                    Liquid staking is expanding beyond Ethereum to other proof-of-stake networks, with protocols
                    developing multi-chain solutions that allow users to stake assets across different blockchains
                    through a single interface.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Conclusion
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <p className="text-lg mb-4 text-gray-800">
                  Liquid Staking Derivatives have fundamentally transformed the Ethereum staking landscape by solving
                  the liquidity problem that previously limited staking adoption. They've made staking accessible to
                  users of all sizes while enabling new forms of capital efficiency and DeFi innovation.
                </p>

                <p className="text-lg mb-4 text-gray-800">
                  However, as with any financial innovation, LSDs come with their own set of risks and trade-offs. Users
                  must carefully consider factors like smart contract risk, centralization concerns, and protocol fees
                  when choosing how to participate in liquid staking.
                </p>

                <p className="text-lg mb-6 text-gray-800">
                  As the ecosystem continues to mature, we can expect to see further innovations that address current
                  limitations while opening up new possibilities for yield generation and capital efficiency. The future
                  of Ethereum staking is likely to be increasingly liquid, composable, and integrated with the broader
                  DeFi ecosystem.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-gray-800">Key Takeaways</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• LSDs solve the liquidity problem of traditional staking</li>
                    <li>• They enable capital efficiency and DeFi composability</li>
                    <li>• Different protocols offer varying levels of decentralization and fees</li>
                    <li>• Risks include smart contract vulnerabilities and centralization concerns</li>
                    <li>• The ecosystem continues to evolve with new innovations and improvements</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to start your liquid staking journey? Explore the different protocols and find the one that best
                  fits your needs.
                </p>
                <Button asChild className="bg-gray-800 hover:bg-gray-900 text-white">
                  <Link href="/dashboard">Start Staking</Link>
                </Button>
              </div>
            </section>

            <RelatedArticles />
          </div>

          <div className="lg:w-1/4">
            <StickyTableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}
