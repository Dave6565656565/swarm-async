"use client"

import { useState, useEffect, useRef } from "react"
import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronDown, ArrowRight, Download, Twitter, Linkedin, Info, Check } from "lucide-react"
import Link from "next/link"
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
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900/10 to-purple-900/10 backdrop-blur-sm border border-white/10">
      <div className="p-6">
        <h3 className="text-xl font-medium mb-6">LSD Staking Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">Select Protocol</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(protocols).map(([id, protocol]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedProtocol(id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedProtocol === id
                        ? "bg-blue-600/30 border-2 border-blue-500"
                        : "bg-blue-900/20 border border-blue-800/30 hover:bg-blue-800/30"
                    }`}
                  >
                    <div className="font-medium">{protocol.name}</div>
                    <div className="text-sm text-blue-300">{protocol.apy}% APY</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">Amount to Stake (ETH): {amount}</label>
              <Slider
                value={[amount]}
                min={0.1}
                max={100}
                step={0.1}
                onValueChange={(value) => setAmount(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.1 ETH</span>
                <span>100 ETH</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-blue-300">Staking Period: {period} months</label>
              <Slider
                value={[period]}
                min={1}
                max={60}
                step={1}
                onValueChange={(value) => setPeriod(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 month</span>
                <span>5 years</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 flex-grow">
              <h4 className="text-lg font-medium mb-4">Estimated Returns</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-blue-800/30">
                  <span className="text-muted-foreground">Initial Investment</span>
                  <span className="font-medium">{amount.toFixed(2)} ETH</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-blue-800/30">
                  <span className="text-muted-foreground">Staking Period</span>
                  <span className="font-medium">{period} months</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-blue-800/30">
                  <span className="text-muted-foreground">Protocol</span>
                  <span className="font-medium">{protocols[selectedProtocol as keyof typeof protocols].name}</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-blue-800/30">
                  <span className="text-muted-foreground">APY</span>
                  <span className="font-medium text-green-400">{results.apy}%</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-blue-800/30">
                  <span className="text-muted-foreground">Protocol Fee</span>
                  <span className="font-medium">{results.fee}%</span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Total Rewards</span>
                    <span className="font-medium text-green-400">+{results.totalRewards} ETH</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Final Balance</span>
                    <span className="text-xl font-bold">{results.totalValue} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center">
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
          <div className="p-4 text-center font-medium bg-blue-900/20 rounded-t-xl">
            <div className="w-12 h-12 rounded-full bg-blue-800/40 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl">L</span>
            </div>
            Lido
          </div>
          <div className="p-4 text-center font-medium bg-green-900/20 rounded-t-xl">
            <div className="w-12 h-12 rounded-full bg-green-800/40 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl">R</span>
            </div>
            Rocket Pool
          </div>
          <div className="p-4 text-center font-medium bg-purple-900/20 rounded-t-xl">
            <div className="w-12 h-12 rounded-full bg-purple-800/40 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl">C</span>
            </div>
            Coinbase
          </div>
          <div className="p-4 text-center font-medium bg-orange-900/20 rounded-t-xl">
            <div className="w-12 h-12 rounded-full bg-orange-800/40 mx-auto mb-2 flex items-center justify-center">
              <span className="text-xl">F</span>
            </div>
            Frax
          </div>

          {/* Token Type */}
          <div className="p-4 font-medium bg-blue-950/30 flex items-center">Token Type</div>
          <div className="p-4 text-center bg-blue-900/10">
            stETH
            <br />
            <span className="text-xs text-muted-foreground">Rebasing</span>
          </div>
          <div className="p-4 text-center bg-green-900/10">
            rETH
            <br />
            <span className="text-xs text-muted-foreground">Value-accruing</span>
          </div>
          <div className="p-4 text-center bg-purple-900/10">
            cbETH
            <br />
            <span className="text-xs text-muted-foreground">Value-accruing</span>
          </div>
          <div className="p-4 text-center bg-orange-900/10">
            frxETH/sfrxETH
            <br />
            <span className="text-xs text-muted-foreground">Two-token system</span>
          </div>

          {/* APY */}
          <div className="p-4 font-medium bg-blue-950/30 flex items-center">Current APY</div>
          <div className="p-4 text-center bg-blue-900/10 text-green-400 font-medium">3.5%</div>
          <div className="p-4 text-center bg-green-900/10 text-green-400 font-medium">3.8%</div>
          <div className="p-4 text-center bg-purple-900/10 text-green-400 font-medium">3.2%</div>
          <div className="p-4 text-center bg-orange-900/10 text-green-400 font-medium">3.6%</div>

          {/* Min Stake */}
          <div className="p-4 font-medium bg-blue-950/30 flex items-center">Min Stake</div>
          <div className="p-4 text-center bg-blue-900/10">0.01 ETH</div>
          <div className="p-4 text-center bg-green-900/10">0.01 ETH</div>
          <div className="p-4 text-center bg-purple-900/10">0.01 ETH</div>
          <div className="p-4 text-center bg-orange-900/10">0.01 ETH</div>

          {/* Decentralization */}
          <div className="p-4 font-medium bg-blue-950/30 flex items-center">Decentralization</div>
          <div className="p-4 text-center bg-blue-900/10">
            <div className="w-full bg-blue-800/30 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <div className="text-xs mt-1 text-muted-foreground">Medium</div>
          </div>
          <div className="p-4 text-center bg-green-900/10">
            <div className="w-full bg-green-800/30 h-2 rounded-full">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-muted-foreground">High</div>
          </div>
          <div className="p-4 text-center bg-purple-900/10">
            <div className="w-full bg-purple-800/30 h-2 rounded-full">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-muted-foreground">Low</div>
          </div>
          <div className="p-4 text-center bg-orange-900/10">
            <div className="w-full bg-orange-800/30 h-2 rounded-full">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-muted-foreground">Medium-High</div>
          </div>

          {/* Market Share */}
          <div className="p-4 font-medium bg-blue-950/30 flex items-center">Market Share</div>
          <div className="p-4 text-center bg-blue-900/10 font-medium">~30%</div>
          <div className="p-4 text-center bg-green-900/10">~8%</div>
          <div className="p-4 text-center bg-purple-900/10">~7%</div>
          <div className="p-4 text-center bg-orange-900/10">~5%</div>
        </div>
      </div>
    </div>
  )
}

// Animated diagram component
const AnimatedDiagram = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900/10 to-purple-900/10 backdrop-blur-sm border border-white/10 p-6">
      <h3 className="text-xl font-medium mb-6">How Liquid Staking Works</h3>

      <div className="relative h-[300px] md:h-[400px]">
        {/* ETH Deposit */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-900/40 flex items-center justify-center mb-2">
            <span className="text-3xl">Ξ</span>
          </div>
          <div className="font-medium">ETH Deposit</div>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          className="absolute top-[15%] left-[26%] w-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="absolute right-0 top-[-4px] text-purple-500">
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
          <div className="w-20 h-20 mx-auto rounded-xl bg-purple-900/40 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm">Staking</div>
              <div className="text-sm">Protocol</div>
            </div>
          </div>
          <div className="font-medium">Lido, Rocket Pool, etc.</div>
        </motion.div>

        {/* Arrow 2 Down */}
        <motion.div
          className="absolute top-[32%] left-[52%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-purple-500 to-green-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-green-500">
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
          <div className="w-20 h-20 mx-auto rounded-xl bg-green-900/40 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm">Ethereum</div>
              <div className="text-sm">Validators</div>
            </div>
          </div>
          <div className="font-medium">Securing the Network</div>
        </motion.div>

        {/* Arrow 3 Up */}
        <motion.div
          className="absolute top-[32%] left-[67%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-t from-green-500 to-orange-500 mx-auto"></div>
          <div className="absolute top-0 left-[-4px] text-orange-500">
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
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-900/40 flex items-center justify-center mb-2">
            <span className="text-xl">stETH</span>
          </div>
          <div className="font-medium">LSD Token</div>
        </motion.div>

        {/* Arrow 4 Down to DeFi */}
        <motion.div
          className="absolute top-[32%] left-[80%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-pink-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-pink-500">
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
          <div className="w-20 h-20 mx-auto rounded-xl bg-pink-900/40 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm">DeFi</div>
              <div className="text-sm">Applications</div>
            </div>
          </div>
          <div className="font-medium">Lending, Trading, Yield</div>
        </motion.div>

        {/* Rewards Flow */}
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[60%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
        >
          <div className="w-full h-16 mx-auto rounded-xl bg-blue-900/20 flex items-center justify-center">
            <div className="flex items-center">
              <div className="text-green-400 mr-2">Staking Rewards</div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 relative">
                <motion.div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-green-500"
                  animate={{ x: [0, 128, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                />
              </div>
              <div className="text-blue-400 ml-2">Token Value Increase</div>
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
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900/10 to-purple-900/10 backdrop-blur-sm border border-white/10 p-6">
      <h3 className="text-xl font-medium mb-6">LSD Token Types Compared</h3>

      <Tabs defaultValue="rebasing" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="rebasing">Rebasing Tokens</TabsTrigger>
          <TabsTrigger value="value-accruing">Value-Accruing Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="rebasing" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-xl bg-blue-900/20 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4">Rebasing Mechanism</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2">Day 1: 10 stETH</div>
                    <ChevronDown className="my-2 text-blue-400" />
                    <div className="mb-2">Day 30: 10.05 stETH</div>
                    <ChevronDown className="my-2 text-blue-400" />
                    <div>Day 365: 10.60 stETH</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                With rebasing tokens like Lido's stETH, the number of tokens in your wallet automatically increases as
                rewards accrue. The exchange rate between the LSD and ETH remains roughly 1:1.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-xl bg-blue-900/20">
                <h4 className="font-medium mb-2 flex items-center">
                  <Check size={16} className="mr-2 text-green-400" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Simple to understand - 1 stETH ≈ 1 ETH</li>
                  <li>• Rewards are visible as your token balance increases</li>
                  <li>• No need to calculate exchange rates</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-900/20">
                <h4 className="font-medium mb-2 flex items-center">
                  <Info size={16} className="mr-2 text-red-400" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rebasing can create tax complications in some jurisdictions</li>
                  <li>• Some DeFi protocols don't handle rebasing tokens well</li>
                  <li>• Can be more gas-intensive due to frequent rebases</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/20">
                <h4 className="font-medium mb-2">Examples</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-800/40 flex items-center justify-center">L</div>
                  <div>Lido's stETH</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="value-accruing" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-xl bg-green-900/20 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4">Value-Accruing Mechanism</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2">Day 1: 10 rETH = 10 ETH</div>
                    <ChevronDown className="my-2 text-green-400" />
                    <div className="mb-2">Day 30: 10 rETH = 10.05 ETH</div>
                    <ChevronDown className="my-2 text-green-400" />
                    <div>Day 365: 10 rETH = 10.60 ETH</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                With value-accruing tokens like Rocket Pool's rETH, the number of tokens remains constant, but each
                token becomes worth more ETH over time. The exchange rate between the LSD and ETH increases as rewards
                accrue.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-xl bg-green-900/20">
                <h4 className="font-medium mb-2 flex items-center">
                  <Check size={16} className="mr-2 text-green-400" />
                  Advantages
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• May have simpler tax treatment in some jurisdictions</li>
                  <li>• Better compatibility with DeFi protocols</li>
                  <li>• No gas costs for rebasing</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-red-900/20">
                <h4 className="font-medium mb-2 flex items-center">
                  <Info size={16} className="mr-2 text-red-400" />
                  Disadvantages
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rewards are less visible as token balance doesn't change</li>
                  <li>• Need to track exchange rate to know your actual ETH value</li>
                  <li>• Can be confusing for new users</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/20">
                <h4 className="font-medium mb-2">Examples</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-800/40 flex items-center justify-center">R</div>
                    <div>Rocket Pool's rETH</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-800/40 flex items-center justify-center">C</div>
                    <div>Coinbase's cbETH</div>
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
    <div className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 rounded-xl bg-gradient-to-b from-blue-900/10 to-purple-900/10 backdrop-blur-sm border border-white/10">
      <h3 className="text-lg font-medium mb-4">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <a
            href="#introduction"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "introduction" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Introduction
          </a>
        </li>
        <li>
          <a
            href="#what-are-lsds"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "what-are-lsds" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            What Are Liquid Staking Derivatives?
          </a>
        </li>
        <li>
          <a
            href="#how-they-work"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "how-they-work" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            How They Work
          </a>
        </li>
        <li>
          <a
            href="#major-protocols"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "major-protocols" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Major Protocols
          </a>
        </li>
        <li>
          <a
            href="#benefits"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "benefits" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Benefits
          </a>
        </li>
        <li>
          <a
            href="#risks"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "risks" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Risks and Challenges
          </a>
        </li>
        <li>
          <a
            href="#impact"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "impact" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Impact on Ethereum
          </a>
        </li>
        <li>
          <a
            href="#choosing"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "choosing" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            Choosing the Right Solution
          </a>
        </li>
        <li>
          <a
            href="#future"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "future" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
          >
            The Future of LSDs
          </a>
        </li>
        <li>
          <a
            href="#conclusion"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "conclusion" ? "bg-blue-800/30 text-blue-300" : "hover:bg-blue-900/20"}`}
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
    <div className="min-h-screen relative">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" asChild className="glassmorphism border-none">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="glassmorphism border-none">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button size="sm" variant="outline" className="glassmorphism border-none">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="glassmorphism border-none">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 neon-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Liquid Staking Derivatives Explained
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl text-blue-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Unlocking the Power of Staked ETH
            </motion.div>

            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <span>April 18, 2024</span>
              <span className="mx-2">•</span>
              <span>11 min read</span>
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden glassmorphism rounded-lg p-6 mb-10">
              <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#introduction" className="text-blue-400 hover:text-blue-300">
                    Introduction to Liquid Staking Derivatives
                  </a>
                </li>
                <li>
                  <a href="#what-are-lsds" className="text-blue-400 hover:text-blue-300">
                    What Are Liquid Staking Derivatives?
                  </a>
                </li>
                <li>
                  <a href="#how-they-work" className="text-blue-400 hover:text-blue-300">
                    How Liquid Staking Derivatives Work
                  </a>
                </li>
                <li>
                  <a href="#major-protocols" className="text-blue-400 hover:text-blue-300">
                    Major Liquid Staking Protocols
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="text-blue-400 hover:text-blue-300">
                    Benefits of Liquid Staking Derivatives
                  </a>
                </li>
                <li>
                  <a href="#risks" className="text-blue-400 hover:text-blue-300">
                    Risks and Challenges
                  </a>
                </li>
                <li>
                  <a href="#impact" className="text-blue-400 hover:text-blue-300">
                    Impact on the Ethereum Ecosystem
                  </a>
                </li>
                <li>
                  <a href="#choosing" className="text-blue-400 hover:text-blue-300">
                    Choosing the Right Solution
                  </a>
                </li>
                <li>
                  <a href="#future" className="text-blue-400 hover:text-blue-300">
                    The Future of LSDs
                  </a>
                </li>
                <li>
                  <a href="#conclusion" className="text-blue-400 hover:text-blue-300">
                    Conclusion
                  </a>
                </li>
              </ul>
            </div>

            {/* Introduction */}
            <section id="introduction" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Introduction to Liquid Staking Derivatives
              </motion.h2>

              <div className="glassmorphism rounded-2xl overflow-hidden mb-8">
                <div className="aspect-video relative">
                  <div className="w-full h-full bg-gradient-to-r from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-5xl mb-4">💧 + 🔒 = 💰</div>
                      <div className="text-xl text-blue-300">Liquid Staking Derivatives</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-muted-foreground text-sm">
                  Liquid Staking Derivatives unlock the full potential of staked ETH, enabling both network security and
                  DeFi participation
                </div>
              </div>

              <p className="text-lg mb-4">
                Ethereum's transition to Proof of Stake (PoS) created new opportunities for ETH holders to earn rewards
                by staking their assets. However, traditional staking comes with a significant drawback:{" "}
                <strong>illiquidity</strong>. When you stake your ETH directly with the network, those assets are locked
                up and unavailable for other uses.
              </p>

              <p className="text-lg mb-4">
                This is where Liquid Staking Derivatives (LSDs) come in. These innovative financial instruments have
                revolutionized the Ethereum staking ecosystem by solving the illiquidity problem while still allowing
                users to participate in network validation and earn staking rewards.
              </p>

              <p className="text-lg mb-4">
                In this comprehensive guide, we'll explore what LSDs are, how they work, their benefits and risks, and
                their profound impact on the broader Ethereum ecosystem.
              </p>

              <AnimatedDiagram />
            </section>

            {/* What Are LSDs */}
            <section id="what-are-lsds" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                What Are Liquid Staking Derivatives?
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 glassmorphism rounded-2xl overflow-hidden">
                  <div className="aspect-video relative">
                    <div className="w-full h-full bg-gradient-to-r from-blue-800/30 to-indigo-800/30 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <div className="bg-blue-700/50 rounded-full p-4">stETH</div>
                        <div className="bg-green-700/50 rounded-full p-4">rETH</div>
                        <div className="bg-purple-700/50 rounded-full p-4">cbETH</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4">
                    Liquid Staking Derivatives are tokenized representations of staked ETH that allow users to maintain
                    liquidity while still earning staking rewards. When you use a liquid staking service, you receive a
                    token that represents your staked ETH plus accrued rewards.
                  </p>
                  <p className="text-lg">
                    These tokens can be freely transferred, traded, or used in DeFi applications while your original ETH
                    remains staked on the Ethereum network, generating rewards that are reflected in the value of your
                    LSD tokens.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Key Characteristics of LSDs</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Representation</h4>
                  <p className="text-muted-foreground">
                    Each LSD token represents a claim on an underlying staked ETH position plus accumulated rewards
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Rebasing or Value Accrual</h4>
                  <p className="text-muted-foreground">
                    LSDs capture staking rewards either through rebasing (increasing the number of tokens you hold) or
                    value accrual (increasing the value of each token)
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Transferability</h4>
                  <p className="text-muted-foreground">
                    Unlike directly staked ETH, LSD tokens can be freely transferred between wallets and used in various
                    applications
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Market Price</h4>
                  <p className="text-muted-foreground">
                    LSD tokens trade on the open market, sometimes at a premium or discount to their underlying value
                  </p>
                </div>
              </div>

              <TokenTypeComparison />
            </section>

            {/* How They Work */}
            <section id="how-they-work" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                How Liquid Staking Derivatives Work
              </motion.h2>

              <p className="text-lg mb-6">
                To understand LSDs, it's helpful to walk through the typical process of using a liquid staking service:
              </p>

              <div className="glassmorphism rounded-xl overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-700/50 flex items-center justify-center mb-2 text-2xl">
                        1
                      </div>
                      <div>Deposit ETH</div>
                    </div>
                    <div className="hidden md:block text-2xl">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-700/50 flex items-center justify-center mb-2 text-2xl">
                        2
                      </div>
                      <div>Receive LSD Tokens</div>
                    </div>
                    <div className="hidden md:block text-2xl">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-700/50 flex items-center justify-center mb-2 text-2xl">
                        3
                      </div>
                      <div>Protocol Stakes ETH</div>
                    </div>
                    <div className="hidden md:block text-2xl">→</div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-700/50 flex items-center justify-center mb-2 text-2xl">
                        4
                      </div>
                      <div>Use LSD in DeFi</div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-muted-foreground text-sm text-center">
                  The liquid staking process flow: from ETH deposit to DeFi utilization
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">The Liquid Staking Process</h3>

              <ol className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <strong>Deposit ETH:</strong>{" "}
                    <span className="text-muted-foreground">
                      Users deposit their ETH into a liquid staking protocol
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <strong>Receive LSD Tokens:</strong>{" "}
                    <span className="text-muted-foreground">
                      In return, users receive LSD tokens (like stETH, rETH, or cbETH) that represent their staked
                      position
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <strong>Protocol Stakes ETH:</strong>{" "}
                    <span className="text-muted-foreground">
                      The protocol uses the deposited ETH to create validators or stake with existing validators
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <strong>Rewards Accrue:</strong>{" "}
                    <span className="text-muted-foreground">
                      As staking rewards are earned, they're reflected in the value of the LSD tokens
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    5
                  </div>
                  <div>
                    <strong>Use LSD Tokens:</strong>{" "}
                    <span className="text-muted-foreground">
                      Users can hold their LSD tokens to continue earning rewards, or use them in DeFi applications
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-700/50 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                    6
                  </div>
                  <div>
                    <strong>Redemption (Optional):</strong>{" "}
                    <span className="text-muted-foreground">
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
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Major Liquid Staking Protocols
              </motion.h2>

              <p className="text-lg mb-6">
                Several protocols have emerged as leaders in the liquid staking space, each with its own approach and
                characteristics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glassmorphism p-6 rounded-xl border border-blue-800/30 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-800/30 flex items-center justify-center text-2xl font-bold">
                      L
                    </div>
                    <h3 className="text-2xl font-bold">Lido Finance</h3>
                  </div>
                  <div className="space-y-2 flex-grow">
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
                  <div className="mt-4 pt-4 border-t border-blue-800/30">
                    <div className="flex items-center justify-between">
                      <span>Market Share</span>
                      <span className="font-bold">~30%</span>
                    </div>
                    <div className="w-full bg-blue-800/30 rounded-full h-2 mt-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-green-800/30 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-green-800/30 flex items-center justify-center text-2xl font-bold">
                      RP
                    </div>
                    <h3 className="text-2xl font-bold">Rocket Pool</h3>
                  </div>
                  <div className="space-y-2 flex-grow">
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
                  <div className="mt-4 pt-4 border-t border-green-800/30">
                    <div className="flex items-center justify-between">
                      <span>Market Share</span>
                      <span className="font-bold">~8%</span>
                    </div>
                    <div className="w-full bg-green-800/30 rounded-full h-2 mt-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-purple-800/30 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-purple-800/30 flex items-center justify-center text-2xl font-bold">
                      CB
                    </div>
                    <h3 className="text-2xl font-bold">Coinbase</h3>
                  </div>
                  <div className="space-y-2 flex-grow">
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
                  <div className="mt-4 pt-4 border-t border-purple-800/30">
                    <div className="flex items-center justify-between">
                      <span>Market Share</span>
                      <span className="font-bold">~7%</span>
                    </div>
                    <div className="w-full bg-purple-800/30 rounded-full h-2 mt-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: "7%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-orange-800/30 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-orange-800/30 flex items-center justify-center text-2xl font-bold">
                      FX
                    </div>
                    <h3 className="text-2xl font-bold">Frax Finance</h3>
                  </div>
                  <div className="space-y-2 flex-grow">
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
                  <div className="mt-4 pt-4 border-t border-orange-800/30">
                    <div className="flex items-center justify-between">
                      <span>Market Share</span>
                      <span className="font-bold">~5%</span>
                    </div>
                    <div className="w-full bg-orange-800/30 rounded-full h-2 mt-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{ width: "5%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <ProtocolComparison />
            </section>

            {/* Benefits */}
            <section id="benefits" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Benefits of Liquid Staking Derivatives
              </motion.h2>

              <div className="glassmorphism rounded-xl p-6 mb-8 border border-blue-800/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">💧</div>
                    <h4 className="font-semibold mb-1">Maintained Liquidity</h4>
                    <p className="text-sm text-muted-foreground">Use your staked ETH in DeFi</p>
                  </div>
                  <div className="bg-blue-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔓</div>
                    <h4 className="font-semibold mb-1">Lower Barriers</h4>
                    <p className="text-sm text-muted-foreground">No 32 ETH minimum</p>
                  </div>
                  <div className="bg-blue-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">⚡</div>
                    <h4 className="font-semibold mb-1">Immediate Rewards</h4>
                    <p className="text-sm text-muted-foreground">No waiting period</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">For Individual Stakers</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Maintained Liquidity</h4>
                  <p className="text-muted-foreground">Access to capital while still earning staking rewards</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Lower Barriers to Entry</h4>
                  <p className="text-muted-foreground">
                    No minimum 32 ETH requirement and no technical expertise needed
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Immediate Rewards</h4>
                  <p className="text-muted-foreground">
                    Start earning rewards right away without waiting for validator activation
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Diversification</h4>
                  <p className="text-muted-foreground">
                    Spread risk across many validators rather than relying on a single validator's performance
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">DeFi Opportunities</h4>
                  <p className="text-muted-foreground">
                    Use LSD tokens in lending, borrowing, yield farming, and other DeFi applications
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">For the Ethereum Ecosystem</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Increased Staking Participation</h4>
                  <p className="text-muted-foreground">More ETH staked means better network security</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Capital Efficiency</h4>
                  <p className="text-muted-foreground">
                    The same ETH can simultaneously secure the network and be used in DeFi
                  </p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Liquidity for ETH</h4>
                  <p className="text-muted-foreground">Creates liquid markets for staked ETH positions</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">DeFi Innovation</h4>
                  <p className="text-muted-foreground">
                    Enables new financial products and services built around staked ETH
                  </p>
                </div>
              </div>

              <LSDCalculator />
            </section>

            {/* Risks */}
            <section id="risks" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Risks and Challenges of Liquid Staking Derivatives
              </motion.h2>

              <div className="glassmorphism rounded-xl p-6 mb-8 border border-red-800/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">⚠️</div>
                    <h4 className="font-semibold mb-1">Smart Contract Risk</h4>
                    <p className="text-sm text-muted-foreground">Vulnerabilities in protocol code</p>
                  </div>
                  <div className="bg-red-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <h4 className="font-semibold mb-1">Slashing Risk</h4>
                    <p className="text-sm text-muted-foreground">Validator penalties affect holders</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6">
                Despite their benefits, LSDs come with several important risks that users should understand:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glassmorphism p-6 rounded-xl border border-red-800/30">
                  <h3 className="text-xl font-bold mb-4">Smart Contract Risks</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>Vulnerabilities in the protocol's code could lead to loss of funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>The complexity of some LSD protocols increases the attack surface</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span>Even audited contracts can have undiscovered bugs</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-orange-800/30">
                  <h3 className="text-xl font-bold mb-4">Counterparty Risks</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Reliance on the protocol's operators to manage validators properly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Potential for mismanagement or malicious behavior by node operators</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Governance risks if the protocol is controlled by a small number of token holders</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-yellow-800/30">
                  <h3 className="text-xl font-bold mb-4">Slashing Risks</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>If validators are slashed for misbehavior, LSD holders may suffer losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Different protocols handle slashing events differently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Some protocols have insurance funds or other protections against slashing</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-purple-800/30">
                  <h3 className="text-xl font-bold mb-4">Liquidity and Market Risks</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>LSD tokens may trade at a discount to their underlying value during market stress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>Liquidity can vary significantly between different LSD tokens</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>Redemption mechanisms may be delayed or limited in certain circumstances</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section id="impact" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Impact of LSDs on the Ethereum Ecosystem
              </motion.h2>

              <p className="text-lg mb-6">
                Liquid staking derivatives have had a profound impact on Ethereum's financial ecosystem:
              </p>

              <div className="glassmorphism rounded-xl p-6 mb-8 border border-blue-800/30">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold">Ecosystem Integration</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-blue-800/20 px-4 py-2 rounded-lg">DeFi Lending</div>
                  <div className="bg-blue-800/20 px-4 py-2 rounded-lg">AMM Liquidity</div>
                  <div className="bg-blue-800/20 px-4 py-2 rounded-lg">Yield Farming</div>
                  <div className="bg-blue-800/20 px-4 py-2 rounded-lg">Derivatives</div>
                  <div className="bg-blue-800/20 px-4 py-2 rounded-lg">Collateral</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Growth of Staked ETH</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                <div className="md:w-1/2 glassmorphism rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold mb-2">30%+</div>
                      <div className="text-muted-foreground text-center">of all circulating ETH is now staked</div>
                      <div className="w-full bg-blue-800/20 h-2 mt-4 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Over half of staked ETH uses liquid staking protocols
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4">
                    LSDs have significantly increased the total amount of ETH staked on the network. As of early 2024,
                    over 30% of all circulating ETH is staked, with liquid staking protocols accounting for more than
                    half of that amount.
                  </p>
                  <p className="text-muted-foreground">
                    This growth has been exponential since the Merge, with liquid staking solutions making it easier
                    than ever for users to participate in network security while maintaining liquidity.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">DeFi Integration</h3>

              <p className="mb-4">LSD tokens have become fundamental building blocks in DeFi:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Lending/Borrowing</h4>
                  <p className="text-muted-foreground">Used as collateral on platforms like Aave and Compound</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">AMM Liquidity</h4>
                  <p className="text-muted-foreground">Major trading pairs on decentralized exchanges</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Yield Strategies</h4>
                  <p className="text-muted-foreground">Core components in yield aggregators and vaults</p>
                </div>
                <div className="glassmorphism p-5 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2">Derivatives</h4>
                  <p className="text-muted-foreground">Underlying assets for options, futures, and other derivatives</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Centralization Debates</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
                <div className="md:w-1/2 glassmorphism rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="mb-4 text-center">
                      <div className="text-lg font-bold mb-2">Market Share by Protocol</div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Lido</span>
                          <span>~30%</span>
                        </div>
                        <div className="w-full bg-blue-800/20 h-2 rounded-full">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Rocket Pool</span>
                          <span>~8%</span>
                        </div>
                        <div className="w-full bg-blue-800/20 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "8%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Coinbase</span>
                          <span>~7%</span>
                        </div>
                        <div className="w-full bg-blue-800/20 h-2 rounded-full">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "7%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Concerns about Lido's dominant market share (over 30% of all staked ETH)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Debates about limiting protocol growth to prevent centralization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Development of more decentralized alternatives</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Choosing */}
            <section id="choosing" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Choosing the Right Liquid Staking Solution
              </motion.h2>

              <p className="text-lg mb-6">
                With multiple options available, how should users choose the right liquid staking solution? Consider
                these factors:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glassmorphism p-6 rounded-xl border border-blue-800/30">
                  <h3 className="text-xl font-bold mb-4">Decentralization vs. Efficiency</h3>
                  <div className="bg-blue-800/20 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-8 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">Decentralized</div>
                          <div className="text-sm text-muted-foreground">Rocket Pool</div>
                        </div>
                        <div className="text-xl">⟷</div>
                        <div className="text-center">
                          <div className="text-lg font-bold mb-1">Centralized</div>
                          <div className="text-sm text-muted-foreground">Coinbase</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>
                        More decentralized protocols (like Rocket Pool) may offer better alignment with Ethereum's
                        values
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>More centralized solutions might offer better yields or user experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>Consider your personal values and risk tolerance</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-green-800/30">
                  <h3 className="text-xl font-bold mb-4">Yield Considerations</h3>
                  <div className="bg-green-800/20 rounded-lg p-4 mb-4 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-2">Net Yield After Fees</div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold">3-5%</div>
                          <div className="text-sm text-muted-foreground">Annual</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">•</span>
                      <span>Compare net yields after protocol fees</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">•</span>
                      <span>Consider the consistency and reliability of rewards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 font-bold">•</span>
                      <span>Evaluate additional yield opportunities in the DeFi ecosystem</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-purple-800/30">
                  <h3 className="text-xl font-bold mb-4">Liquidity and Market Depth</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>Assess trading volumes and liquidity across different exchanges</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>Consider the availability of trading pairs with other assets you use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>Evaluate the stability of the token's price relative to ETH</span>
                    </li>
                  </ul>
                </div>

                <div className="glassmorphism p-6 rounded-xl border border-orange-800/30">
                  <h3 className="text-xl font-bold mb-4">Security and Track Record</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Research the protocol's security history and audits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Evaluate the team's experience and reputation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Consider how long the protocol has been operating successfully</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Future */}
            <section id="future" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                The Future of Liquid Staking Derivatives
              </motion.h2>

              <div className="glassmorphism rounded-xl p-6 mb-8 border border-indigo-800/30">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">Emerging Trends</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔄</div>
                    <h4 className="font-semibold mb-1">Restaking</h4>
                    <p className="text-sm text-muted-foreground">Multi-network security</p>
                  </div>
                  <div className="bg-indigo-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🔗</div>
                    <h4 className="font-semibold mb-1">Layer 2 Integration</h4>
                    <p className="text-sm text-muted-foreground">Lower gas fees</p>
                  </div>
                  <div className="bg-indigo-800/20 p-4 rounded-lg text-center">
                    <div className="text-3xl mb-2">🏛️</div>
                    <h4 className="font-semibold mb-1">Regulatory Clarity</h4>
                    <p className="text-sm text-muted-foreground">Institutional adoption</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6">
                The liquid staking landscape continues to evolve rapidly. Here are some trends and developments to
                watch:
              </p>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Protocol Innovations</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glassmorphism p-6 rounded-xl border border-blue-800/30 h-full">
                  <h4 className="text-lg font-semibold mb-2">Restaking and EigenLayer</h4>
                  <p className="text-muted-foreground">
                    Using staked ETH to secure multiple networks simultaneously, creating a new paradigm for blockchain
                    security
                  </p>
                </div>
                <div className="glassmorphism p-6 rounded-xl border border-green-800/30 h-full">
                  <h4 className="text-lg font-semibold mb-2">DVT (Distributed Validator Technology)</h4>
                  <p className="text-muted-foreground">
                    Improving validator security and decentralization through multi-operator validation
                  </p>
                </div>
                <div className="glassmorphism p-6 rounded-xl border border-purple-800/30 h-full">
                  <h4 className="text-lg font-semibold mb-2">Layer 2 Integration</h4>
                  <p className="text-muted-foreground">
                    Native liquid staking solutions on L2 networks, reducing gas costs and improving user experience
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Market Evolution</h3>

              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Increased competition among liquid staking providers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>More institutional participation in liquid staking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold">•</span>
                  <span>Development of standardized LSD indices and baskets</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-4 text-blue-300">Regulatory Adaptation</h3>

              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span>Protocols developing more regulatory-compliant offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span>Clearer regulatory frameworks for staking derivatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">•</span>
                  <span>Potential bifurcation between permissioned and permissionless solutions</span>
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Conclusion: The Transformative Power of Liquid Staking
              </motion.h2>

              <div className="glassmorphism rounded-xl p-6 mb-8 border border-blue-800/30">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-4">Unlocking Capital Efficiency</h3>
                  <p className="text-muted-foreground mb-4">
                    Liquid staking derivatives represent one of the most significant innovations in the Ethereum
                    ecosystem since DeFi itself
                  </p>
                  <div className="inline-block bg-blue-800/20 px-4 py-2 rounded-lg">
                    Staking + Liquidity = Capital Efficiency
                  </div>
                </div>
              </div>

              <p className="text-lg mb-4">
                Liquid staking derivatives represent one of the most significant innovations in the Ethereum ecosystem
                since DeFi itself. By solving the illiquidity problem of traditional staking, LSDs have unlocked
                billions of dollars of capital efficiency and created new opportunities for users to participate in
                network security while maintaining financial flexibility.
              </p>

              <p className="text-lg mb-4">
                As the ecosystem matures, we can expect to see continued innovation, increased adoption, and greater
                integration with the broader financial system. Whether you're a casual ETH holder looking to earn yield
                or a sophisticated DeFi user seeking new strategies, understanding liquid staking derivatives is
                essential for navigating the evolving Ethereum landscape.
              </p>

              <p className="text-lg mb-6">
                The rise of LSDs demonstrates how financial innovation can solve practical problems while creating new
                possibilities. As Ethereum continues to grow and evolve, liquid staking will likely remain a cornerstone
                of its economic infrastructure.
              </p>

              <div className="glassmorphism p-6 rounded-xl mb-8">
                <p className="text-lg font-semibold mb-2">Key Takeaways:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>
                      LSDs solve the illiquidity problem of traditional staking while maintaining network security
                      benefits
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>
                      Different protocols offer varying approaches to decentralization, yield distribution, and security
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Understanding the risks and benefits is crucial for making informed staking decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>
                      The future of LSDs will likely include more innovation, integration, and regulatory clarity
                    </span>
                  </li>
                </ul>
              </div>

              <div className="glassmorphism p-6 rounded-xl border border-red-800/30 mb-8">
                <p>
                  <strong>Disclaimer:</strong> This article is for informational purposes only and should not be
                  construed as financial advice. Always do your own research before making investment decisions.
                </p>
              </div>
            </section>

            {/* Download and Share */}
            <div className="glassmorphism p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-4">Share This Article</h3>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-600 hover:bg-blue-700">Download PDF</Button>
                <Button className="bg-green-600 hover:bg-green-700">Share on Twitter</Button>
                <Button className="bg-blue-800 hover:bg-blue-900">Share on LinkedIn</Button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glassmorphism rounded-xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-blue-900/40 to-indigo-900/40"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Ethereum Staking for Beginners</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      A complete guide to getting started with ETH staking
                    </p>
                    <Link
                      href="/articles/ethereum-staking-for-beginners"
                      className="text-blue-400 text-sm hover:text-blue-300"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
                <div className="glassmorphism rounded-xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-green-900/40 to-teal-900/40"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Staking vs DeFi Yields</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comparing returns across different Ethereum yield strategies
                    </p>
                    <Link href="/articles/staking-vs-defi-yields" className="text-blue-400 text-sm hover:text-blue-300">
                      Read More →
                    </Link>
                  </div>
                </div>
                <div className="glassmorphism rounded-xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-r from-purple-900/40 to-pink-900/40"></div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Future of Ethereum Staking</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upcoming developments in the Ethereum staking ecosystem
                    </p>
                    <Link
                      href="/articles/future-of-ethereum-staking"
                      className="text-blue-400 text-sm hover:text-blue-300"
                    >
                      Read More →
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
