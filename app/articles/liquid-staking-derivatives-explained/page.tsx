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
      <div className="p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-800">LSD Staking Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="bg-gray-50 rounded-lg p-6 flex-grow">
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
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-5 gap-4">
          <div className="p-4"></div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <Image src="/lido-abstract-logo.png" alt="Lido" width={24} height={24} />
            </div>
            <span className="text-gray-800">Lido</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl text-gray-800">R</span>
            </div>
            <span className="text-gray-800">Rocket Pool</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl text-gray-800">C</span>
            </div>
            <span className="text-gray-800">Coinbase</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl text-gray-800">F</span>
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
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Liquid Staking Works</h3>

      <div className="relative h-[300px] md:h-[400px]">
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
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-6">
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
          <div className="flex flex-col md:flex-row gap-6">
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
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Image src="/lido-abstract-logo.png" alt="Lido" width={16} height={16} />
                  </div>
                  <div className="text-gray-800">Lido's stETH</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="value-accruing" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
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
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">R</div>
                    <div className="text-gray-800">Rocket Pool's rETH</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">C</div>
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

export default function LiquidStakingDerivativesArticle() {
  return (
    <div className="min-h-screen relative bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" asChild className="border-gray-300 bg-white hover:bg-gray-50">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-gray-300 bg-white hover:bg-gray-50">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Liquid Staking Derivatives Explained
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Unlocking the Power of Staked ETH
            </motion.div>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>April 18, 2024</span>
              <span className="mx-2">•</span>
              <span>11 min read</span>
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
              <ul className="space-y-2">
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
            <section id="introduction" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Introduction to Liquid Staking Derivatives
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden mb-8">
                <div className="aspect-video relative">
                  <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                    <Image
                      src="/liquid-staking-flow.png"
                      alt="Liquid Staking Flow Diagram"
                      width={600}
                      height={300}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="p-4 text-gray-600 text-sm">
                  Liquid Staking Derivatives unlock the full potential of staked ETH, enabling both network security and
                  DeFi participation
                </div>
              </div>

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

              <p className="text-lg mb-4 text-gray-800">
                In this comprehensive guide, we'll explore what LSDs are, how they work, their benefits and risks, and
                their profound impact on the broader Ethereum ecosystem.
              </p>

              <AnimatedDiagram />
            </section>

            {/* What Are LSDs */}
            <section id="what-are-lsds" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                What Are Liquid Staking Derivatives?
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <div className="bg-gray-200 rounded-lg p-4 flex items-center gap-2">
                          <Image src="/lido-abstract-logo.png" alt="Lido" width={20} height={20} />
                          <span className="text-gray-800">stETH</span>
                        </div>
                        <div className="bg-gray-200 rounded-lg p-4 text-gray-800">rETH</div>
                        <div className="bg-gray-200 rounded-lg p-4 text-gray-800">cbETH</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    Liquid Staking Derivatives are tokenized representations of staked ETH that allow users to maintain
                    liquidity while still earning staking rewards. When you use a liquid staking service, you receive a
                    token that represents your staked ETH plus accrued rewards.
                  </p>
                  <p className="text-lg text-gray-800">
                    These tokens can be freely transferred, traded, or used in DeFi applications while your original ETH
                    remains staked on the Ethereum network, generating rewards that are reflected in the value of your
                    LSD tokens.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Key Characteristics of LSDs</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Representation</h4>
                  <p className="text-gray-600">
                    Each LSD token represents a claim on an underlying staked ETH position plus accumulated rewards
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Rebasing or Value Accrual</h4>
                  <p className="text-gray-600">
                    LSDs capture staking rewards either through rebasing (increasing the number of tokens you hold) or
                    value accrual (increasing the value of each token)
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Transferability</h4>
                  <p className="text-gray-600">
                    Unlike directly staked ETH, LSD tokens can be freely transferred between wallets and used in various
                    applications
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Market Price</h4>
                  <p className="text-gray-600">
                    LSD tokens trade on the open market, sometimes at a premium or discount to their underlying value
                  </p>
                </div>
              </div>

              <TokenTypeComparison />
            </section>

            {/* How They Work */}
            <section id="how-they-work" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                How Liquid Staking Derivatives Work
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                To understand LSDs, it's helpful to walk through the typical process of using a liquid staking service:
              </p>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-2xl text-gray-800">
                        1
                      </div>
                      <div className="text-gray-800">Deposit ETH</div>
                    </div>
                    <div className="hidden md:block text-2xl text-gray-400">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-2xl text-gray-800">
                        2
                      </div>
                      <div className="text-gray-800">Receive LSD Tokens</div>
                    </div>
                    <div className="hidden md:block text-2xl text-gray-400">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-2xl text-gray-800">
                        3
                      </div>
                      <div className="text-gray-800">Protocol Stakes ETH</div>
                    </div>
                    <div className="hidden md:block text-2xl text-gray-400">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 text-2xl text-gray-800">
                        4
                      </div>
                      <div className="text-gray-800">Use LSD in DeFi</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-gray-500 text-sm text-center">
                  The liquid staking process flow: from ETH deposit to DeFi utilization
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">The Liquid Staking Process</h3>

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
                <li className="flex items-start gap-3">
                  <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                    6
                  </div>
                  <div>
                    <strong className="text-gray-800">Redemption (Optional):</strong>{" "}
                    <span className="text-gray-600">
                      When desired and available, users can redeem their LSD tokens for the underlying ETH plus accrued
                      rewards
                    </span>
                  </div>
                </li>
              </ol>
            </section>

            {/* Major Protocols */}
            <section id="major-protocols" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Major Liquid Staking Protocols
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Several protocols have emerged as leaders in the liquid staking space, each with its own approach and
                characteristics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Image src="/lido-abstract-logo.png" alt="Lido" width={32} height={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Lido Finance</h3>
                  </div>
                  <div className="space-y-2 flex-grow text-gray-800">
                    <p>
                      <strong>Token:</strong> stETH (staked ETH)
                    </p>
                    <p>
                      <strong>Mechanism:</strong> Rebasing token
                    </p>
                    <p>
                      <strong>Market Position:</strong> Largest liquid staking protocol by total value locked (TVL)
                    </p>
                    <p>
                      <strong>Governance:</strong> DAO-governed through the LDO token
                    </p>
                    <p>
                      <strong>Validator Selection:</strong> Curated set of professional node operators
                    </p>
                    <p>
                      <strong>Fee Structure:</strong> 10% fee on staking rewards
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-bold text-gray-800">~30%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-800">
                      RP
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Rocket Pool</h3>
                  </div>
                  <div className="space-y-2 flex-grow text-gray-800">
                    <p>
                      <strong>Token:</strong> rETH (Rocket Pool ETH)
                    </p>
                    <p>
                      <strong>Mechanism:</strong> Value-accruing token
                    </p>
                    <p>
                      <strong>Market Position:</strong> Known for its decentralized approach
                    </p>
                    <p>
                      <strong>Governance:</strong> DAO-governed through the RPL token
                    </p>
                    <p>
                      <strong>Validator Selection:</strong> Permissionless node operators who must stake RPL as
                      collateral
                    </p>
                    <p>
                      <strong>Fee Structure:</strong> Variable commission rate set by node operators
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-bold text-gray-800">~8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-800">
                      CB
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Coinbase</h3>
                  </div>
                  <div className="space-y-2 flex-grow text-gray-800">
                    <p>
                      <strong>Token:</strong> cbETH (Coinbase ETH)
                    </p>
                    <p>
                      <strong>Mechanism:</strong> Value-accruing token
                    </p>
                    <p>
                      <strong>Market Position:</strong> Backed by a major centralized exchange
                    </p>
                    <p>
                      <strong>Governance:</strong> Centralized (controlled by Coinbase)
                    </p>
                    <p>
                      <strong>Validator Selection:</strong> Operated by Coinbase
                    </p>
                    <p>
                      <strong>Fee Structure:</strong> 25% fee on staking rewards
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-bold text-gray-800">~7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-800">
                      FX
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Frax Finance</h3>
                  </div>
                  <div className="space-y-2 flex-grow text-gray-800">
                    <p>
                      <strong>Tokens:</strong> frxETH (Frax ETH) and sfrxETH (Staked Frax ETH)
                    </p>
                    <p>
                      <strong>Mechanism:</strong> Two-token system; frxETH is a 1:1 ETH wrapper, sfrxETH is a
                      value-accruing staked version
                    </p>
                    <p>
                      <strong>Market Position:</strong> Integrated with the broader Frax stablecoin ecosystem
                    </p>
                    <p>
                      <strong>Governance:</strong> DAO-governed through the FXS token
                    </p>
                    <p>
                      <strong>Fee Structure:</strong> Variable, determined by governance
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Market Share</span>
                      <span className="font-bold text-gray-800">~5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <ProtocolComparison />
            </section>

            {/* Benefits */}
            <section id="benefits" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Benefits of Liquid Staking Derivatives
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V16"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Maintained Liquidity</h4>
                    <p className="text-sm text-gray-600">Use your staked ETH in DeFi</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 3V21"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 8H19"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 16H21"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Lower Barriers</h4>
                    <p className="text-sm text-gray-600">No 32 ETH minimum</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Immediate Rewards</h4>
                    <p className="text-sm text-gray-600">No waiting period</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">For Individual Stakers</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Maintained Liquidity</h4>
                  <p className="text-gray-600">Access to capital while still earning staking rewards</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Lower Barriers to Entry</h4>
                  <p className="text-gray-600">No minimum 32 ETH requirement and no technical expertise needed</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Immediate Rewards</h4>
                  <p className="text-gray-600">
                    Start earning rewards right away without waiting for validator activation
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Diversification</h4>
                  <p className="text-gray-600">
                    Spread risk across many validators rather than relying on a single validator's performance
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">DeFi Opportunities</h4>
                  <p className="text-gray-600">
                    Use LSD tokens in lending, borrowing, yield farming, and other DeFi applications
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">For the Ethereum Ecosystem</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Increased Staking Participation</h4>
                  <p className="text-gray-600">More ETH staked means better network security</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Capital Efficiency</h4>
                  <p className="text-gray-600">
                    The same ETH can simultaneously secure the network and be used in DeFi
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Liquidity for ETH</h4>
                  <p className="text-gray-600">Creates liquid markets for staked ETH positions</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">DeFi Innovation</h4>
                  <p className="text-gray-600">Enables new financial products and services built around staked ETH</p>
                </div>
              </div>

              <LSDCalculator />
            </section>

            {/* Risks */}
            <section id="risks" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Risks and Challenges of Liquid Staking Derivatives
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 9V13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Smart Contract Risk</h4>
                    <p className="text-sm text-gray-600">Vulnerabilities in protocol code</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 17H12.01M12 3V13M19 10C20.6569 10 22 11.3431 22 13V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V13C2 11.3431 3.34315 10 5 10M15 10V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V10H15Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Slashing Risk</h4>
                    <p className="text-sm text-gray-600">Validator penalties affect holders</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-800">
                Despite their benefits, LSDs come with several important risks that users should understand:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Smart Contract Risks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Vulnerabilities in the protocol's code could lead to loss of funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>The complexity of some LSD protocols increases the attack surface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Even audited contracts can have undiscovered bugs</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Counterparty Risks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Reliance on the protocol's operators to manage validators properly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Potential for mismanagement or malicious behavior by node operators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Governance risks if the protocol is controlled by a small number of token holders</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Slashing Risks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>If validators are slashed for misbehavior, LSD holders may suffer losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Different protocols handle slashing events differently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Some protocols have insurance funds or other protections against slashing</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Liquidity and Market Risks</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>LSD tokens may trade at a discount to their underlying value during market stress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Liquidity can vary significantly between different LSD tokens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Redemption mechanisms may be delayed or limited in certain circumstances</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Impact of LSDs on the Ethereum Ecosystem
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Liquid staking derivatives have had a profound impact on Ethereum's financial ecosystem:
              </p>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-8">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Ecosystem Integration</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-800">DeFi Lending</div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-800">AMM Liquidity</div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-800">Yield Farming</div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-800">Derivatives</div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg text-gray-800">Collateral</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Growth of Staked ETH</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold mb-2 text-gray-800">30%+</div>
                      <div className="text-gray-600 text-center">of all circulating ETH is now staked</div>
                      <div className="w-full bg-gray-200 h-2 mt-4 rounded-full">
                        <div className="bg-gray-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        Over half of staked ETH uses liquid staking protocols
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    LSDs have significantly increased the total amount of ETH staked on the network. As of early 2024,
                    over 30% of all circulating ETH is staked, with liquid staking protocols accounting for more than
                    half of that amount.
                  </p>
                  <p className="text-gray-600">
                    This growth has been exponential since the Merge, with liquid staking solutions making it easier
                    than ever for users to participate in network security while maintaining liquidity.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">DeFi Integration</h3>

              <p className="mb-4 text-gray-800">LSD tokens have become fundamental building blocks in DeFi:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Lending/Borrowing</h4>
                  <p className="text-gray-600">Used as collateral on platforms like Aave and Compound</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">AMM Liquidity</h4>
                  <p className="text-gray-600">Major trading pairs on decentralized exchanges</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Yield Strategies</h4>
                  <p className="text-gray-600">Core components in yield aggregators and vaults</p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Derivatives</h4>
                  <p className="text-gray-600">Underlying assets for options, futures, and other derivatives</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Centralization Debates</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4 text-center">
                      <div className="text-lg font-bold mb-2 text-gray-800">Market Share by Protocol</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-800">Lido</span>
                          <span className="text-gray-800">~30%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-800">Rocket Pool</span>
                          <span className="text-gray-800">~8%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-gray-800">Coinbase</span>
                          <span className="text-gray-800">~7%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Concerns about Lido's dominant market share (over 30% of all staked ETH)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Debates about limiting protocol growth to prevent centralization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Development of more decentralized alternatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Choosing */}
            <section id="choosing" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Choosing the Right Liquid Staking Solution
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                With multiple options available, how should users choose the right liquid staking solution? Consider
                these factors:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Decentralization vs. Efficiency</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-8 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1 text-gray-800">Decentralized</div>
                          <div className="text-sm text-gray-600">Rocket Pool</div>
                        </div>
                        <div className="text-xl text-gray-400">⟷</div>
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1 text-gray-800">Centralized</div>
                          <div className="text-sm text-gray-600">Coinbase</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>
                        More decentralized protocols (like Rocket Pool) may offer better alignment with Ethereum's
                        values
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>More centralized solutions might offer better yields or user experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Consider your personal values and risk tolerance</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Yield Considerations</h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-2 text-gray-800">Net Yield After Fees</div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-800">3-5%</div>
                          <div className="text-sm text-gray-600">Annual</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Compare net yields after protocol fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Consider the consistency and reliability of rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Evaluate additional yield opportunities in the DeFi ecosystem</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Liquidity and Market Depth</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Assess trading volumes and liquidity across different exchanges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Consider the availability of trading pairs with other assets you use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Evaluate the stability of the token's price relative to ETH</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Security and Track Record</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Research the protocol's security history and audits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Evaluate the team's experience and reputation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Consider how long the protocol has been operating successfully</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Future */}
            <section id="future" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Future of Liquid Staking Derivatives
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Emerging Trends</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M4 4V9H9M20 4V9H15M4 20V15H9M15 20H20V15"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Restaking</h4>
                    <p className="text-sm text-gray-600">Multi-network security</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22 12H18L15 21L9 3L6 12H2"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Layer 2 Integration</h4>
                    <p className="text-sm text-gray-600">Lower gas fees</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 22L12 2L21 22H3Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Regulatory Clarity</h4>
                    <p className="text-sm text-gray-600">Institutional adoption</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-800">
                The liquid staking landscape continues to evolve rapidly. Here are some trends and developments to
                watch:
              </p>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Protocol Innovations</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg h-full">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Restaking and EigenLayer</h4>
                  <p className="text-gray-600">
                    Using staked ETH to secure multiple networks simultaneously, creating a new paradigm for blockchain
                    security
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg h-full">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">DVT (Distributed Validator Technology)</h4>
                  <p className="text-gray-600">
                    Improving validator security and decentralization through multi-operator validation
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg h-full">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Layer 2 Integration</h4>
                  <p className="text-gray-600">
                    Native liquid staking solutions on L2 networks, reducing gas costs and improving user experience
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Market Evolution</h3>

              <ul className="space-y-2 mb-6 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>Increased competition among liquid staking providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>More institutional participation in liquid staking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>Development of standardized LSD indices and baskets</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Regulatory Adaptation</h3>

              <ul className="space-y-2 mb-6 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>Protocols developing more regulatory-compliant offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>Clearer regulatory frameworks for staking derivatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500 font-bold">•</span>
                  <span>Potential bifurcation between permissioned and permissionless solutions</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Conclusion: The Transformative Power of Liquid Staking
              </motion.h2>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Unlocking Capital Efficiency</h3>
                  <p className="text-gray-600 mb-4">
                    Liquid staking derivatives represent one of the most significant innovations in the Ethereum
                    ecosystem since DeFi itself
                  </p>
                  <div className="inline-block bg-gray-50 px-4 py-2 rounded-lg text-gray-800">
                    Staking + Liquidity = Capital Efficiency
                  </div>
                </div>
              </div>

              <p className="text-lg mb-4 text-gray-800">
                Liquid staking derivatives represent one of the most significant innovations in the Ethereum ecosystem
                since DeFi itself. By solving the illiquidity problem of traditional staking, LSDs have unlocked
                billions of dollars of capital efficiency and created new opportunities for users to participate in
                network security while maintaining financial flexibility.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                As the ecosystem matures, we can expect to see continued innovation, increased adoption, and greater
                integration with the broader financial system. Whether you're a casual ETH holder looking to earn yield
                or a sophisticated DeFi user seeking new strategies, understanding liquid staking derivatives is
                essential for navigating the evolving Ethereum landscape.
              </p>

              <p className="text-lg mb-6 text-gray-800">
                The rise of LSDs demonstrates how financial innovation can solve practical problems while creating new
                possibilities. As Ethereum continues to grow and evolve, liquid staking will likely remain a cornerstone
                of its economic infrastructure.
              </p>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <p className="text-lg font-semibold mb-2 text-gray-800">Key Takeaways:</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      LSDs solve the illiquidity problem of traditional staking while maintaining network security
                      benefits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      Different protocols offer varying approaches to decentralization, yield distribution, and security
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>Understanding the risks and benefits is crucial for making informed staking decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      The future of LSDs will likely include more innovation, integration, and regulatory clarity
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <p className="text-gray-800">
                  <strong>Disclaimer:</strong> This article is for informational purposes only and should not be
                  construed as financial advice. Always do your own research before making investment decisions.
                </p>
              </div>
            </section>

            {/* Download and Share */}
            <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Share This Article</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gray-800 hover:bg-gray-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-700">
                  <Twitter className="mr-2 h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button className="bg-gray-800 hover:bg-gray-700">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Share on LinkedIn
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                    <Image
                      src="/ethereum-nodes.png"
                      alt="Ethereum Staking"
                      width={384}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 text-gray-800">Ethereum Staking for Beginners</h4>
                    <p className="text-sm text-gray-600 mb-4">A complete guide to getting started with ETH staking</p>
                    <Link
                      href="/articles/ethereum-staking-for-beginners"
                      className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
                    >
                      Read More <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                    <Image
                      src="/defi-yield-landscape.png"
                      alt="DeFi Yield Comparison"
                      width={384}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 text-gray-800">Staking vs DeFi Yields</h4>
                    <p className="text-sm text-gray-600 mb-4">
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
                <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                    <Image
                      src="/ethereum-staking-evolution.png"
                      alt="Future of Ethereum Staking"
                      width={384}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2 text-gray-800">Future of Ethereum Staking</h4>
                    <p className="text-sm text-gray-600 mb-4">
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
          </div>

          {/* Sticky Table of Contents - Desktop Only */}
          <div className="lg:w-1/4">
            <StickyTableOfContents />
          </div>
        </div>
      </div>
    </div>
  )
}
