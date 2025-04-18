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
  Share2,
  Calculator,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import ProtocolComparisonMobile from "@/components/protocol-comparison-mobile"
import CalculatorCTAButton from "@/components/calculator-cta-button"

// Interactive LSD Calculator component
const LSDCalculator = () => {
  const [amount, setAmount] = useState<number>(10)
  const [period, setPeriod] = useState<number>(12) // months
  const [selectedProtocol, setSelectedProtocol] = useState<string>("lido")

  // In the LSDCalculator component, update the protocols object to include logo URLs
  const protocols = {
    lido: {
      name: "Lido",
      apy: 3.5,
      fee: 10,
      logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png",
    },
    rocketpool: {
      name: "Rocket Pool",
      apy: 3.8,
      fee: 15,
      logo: "https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true",
    },
    coinbase: {
      name: "Coinbase",
      apy: 3.2,
      fee: 25,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s",
    },
    frax: {
      name: "Frax",
      apy: 3.6,
      fee: 10,
      logo: "https://pbs.twimg.com/profile_images/1345677460747108352/JjqQ9ROz_400x400.jpg",
    },
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
              {/* Update the protocol selection buttons to include logos */}
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
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                        <Image src={protocol.logo || "/placeholder.svg"} alt={protocol.name} width={20} height={20} />
                      </div>
                    </div>
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

                {/* Also update the protocol display in the results section to include the logo */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Protocol</span>
                  <span className="font-medium text-gray-800 flex items-center">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden mr-2">
                      <Image
                        src={protocols[selectedProtocol as keyof typeof protocols].logo || "/placeholder.svg"}
                        alt={protocols[selectedProtocol as keyof typeof protocols].name}
                        width={12}
                        height={12}
                      />
                    </div>
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
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-3">Want more detailed calculations and comparisons?</p>
        <Link href="/calculator">
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
            <Calculator className="mr-2 h-4 w-4" />
            Use Our Advanced Staking Calculator
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Protocol Comparison component
const ProtocolComparison = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="w-full overflow-x-auto pb-4">
      {isMobile ? (
        // Mobile view with protocol selector and details
        <ProtocolComparisonMobile />
      ) : (
        // Original desktop table - unchanged
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 gap-4">
            <div className="p-4"></div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png"
                  alt="Lido"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Lido</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true"
                  alt="Rocket Pool"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Rocket Pool</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s"
                  alt="Coinbase"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Coinbase</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://pbs.twimg.com/profile_images/1345677460747108352/JjqQ9ROz_400x400.jpg"
                  alt="Frax"
                  width={24}
                  height={24}
                />
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
      )}
    </div>
  )
}

// Completely rewritten Animated diagram component with fixed layout
const AnimatedDiagram = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Liquid Staking Works</h3>

      {isMobile ? (
        // Mobile-optimized diagram
        <div className="h-[300px] flex flex-col justify-around">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                <span className="text-3xl text-gray-800">Ξ</span>
              </div>
              <div className="text-sm font-medium text-gray-800">ETH Deposit</div>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                <div className="text-center">
                  <div className="text-xs text-gray-800">Staking</div>
                  <div className="text-xs text-gray-800">Protocol</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-800">Lido, etc.</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-0.5 bg-gray-300"></div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                <div className="text-center">
                  <div className="text-xs text-gray-800">Ethereum</div>
                  <div className="text-xs text-gray-800">Validators</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-800">Network Security</div>
            </div>
            <div className="text-gray-400">→</div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
                <span className="text-xl text-gray-800">stETH</span>
              </div>
              <div className="text-sm font-medium text-gray-800">LSD Token</div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="h-10 w-0.5 bg-gray-300"></div>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
              <div className="text-center">
                <div className="text-xs text-gray-800">DeFi</div>
                <div className="text-xs text-gray-800">Applications</div>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-800">Lending, Trading, Yield</div>
          </div>
        </div>
      ) : (
        // Fixed desktop diagram with proper positioning and static elements
        <div className="relative h-[400px] w-full">
          {/* Static diagram for desktop */}
          <div className="absolute top-[20px] left-[50px]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-3xl text-gray-800">Ξ</span>
              </div>
              <div className="mt-2 font-medium text-gray-800">ETH Deposit</div>
            </div>
          </div>

          {/* Arrow from ETH to Protocol */}
          <div className="absolute top-[60px] left-[120px] w-[150px] h-[2px] bg-gray-400"></div>
          <div className="absolute top-[56px] left-[270px] text-gray-500">
            <ArrowRight size={16} />
          </div>

          {/* Staking Protocol */}
          <div className="absolute top-[20px] left-[300px]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-800">Staking</div>
                  <div className="text-sm text-gray-800">Protocol</div>
                </div>
              </div>
              <div className="mt-2 font-medium text-gray-800">Lido, Rocket Pool, etc.</div>
            </div>
          </div>

          {/* Arrow down to Validators */}
          <div className="absolute top-[100px] left-[360px] h-[80px] w-[2px] bg-gray-400"></div>
          <div className="absolute top-[180px] left-[356px] text-gray-500">
            <ChevronDown size={16} />
          </div>

          {/* Ethereum Validators */}
          <div className="absolute top-[200px] left-[300px]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-800">Ethereum</div>
                  <div className="text-sm text-gray-800">Validators</div>
                </div>
              </div>
              <div className="mt-2 font-medium text-gray-800">Securing the Network</div>
            </div>
          </div>

          {/* Arrow up to LSD Token */}
          <div className="absolute top-[100px] left-[460px] h-[80px] w-[2px] bg-gray-400"></div>
          <div className="absolute top-[100px] left-[456px] text-gray-500">
            <ChevronDown size={16} style={{ transform: "rotate(180deg)" }} />
          </div>

          {/* LSD Token */}
          <div className="absolute top-[20px] left-[550px]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xl text-gray-800">stETH</span>
              </div>
              <div className="mt-2 font-medium text-gray-800">LSD Token</div>
            </div>
          </div>

          {/* Arrow down to DeFi */}
          <div className="absolute top-[100px] left-[610px] h-[80px] w-[2px] bg-gray-400"></div>
          <div className="absolute top-[180px] left-[606px] text-gray-500">
            <ChevronDown size={16} />
          </div>

          {/* DeFi Applications */}
          <div className="absolute top-[200px] left-[550px]">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-800">DeFi</div>
                  <div className="text-sm text-gray-800">Applications</div>
                </div>
              </div>
              <div className="mt-2 font-medium text-gray-800">Lending, Trading, Yield</div>
            </div>
          </div>

          {/* Rewards Flow */}
          <div className="absolute bottom-[20px] left-[150px] w-[400px]">
            <div className="w-full h-16 rounded-lg bg-gray-50 flex items-center justify-center">
              <div className="flex items-center">
                <div className="text-emerald-600 mr-2">Staking Rewards</div>
                <div className="w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-gray-400 relative">
                  <div className="absolute -top-1.5 w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="text-gray-700 ml-2">Token Value Increase</div>
              </div>
            </div>
          </div>
        </div>
      )}
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
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png"
                      alt="Lido"
                      width={16}
                      height={16}
                    />
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
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://pbs.twimg.com/profile_images/1345677460747108352/JjqQ9ROz_400x400.jpg"
                        alt="Frax"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="text-gray-800">Frax's frxETH/sfrxETH</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true"
                        alt="Rocket Pool"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="text-gray-800">Rocket Pool's rETH</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s"
                        alt="Coinbase"
                        width={16}
                        height={16}
                      />
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const generatePDF = async () => {
    try {
      setIsGeneratingPDF(true)

      // Create a link element
      const link = document.createElement("a")

      // Set link properties for PDF download
      link.href = "/api/generate-pdf?article=liquid-staking-derivatives-explained"
      link.download = "Liquid-Staking-Derivatives-Explained.pdf"

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Add a delay to show loading state
      setTimeout(() => {
        setIsGeneratingPDF(false)
      }, 3000)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setIsGeneratingPDF(false)
      alert("There was an error generating the PDF. Please try again.")
    }
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
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("pdf")}
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <>
            <span className="animate-spin mr-2">⏳</span>
            Generating...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </>
        )}
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("twitter")}
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("linkedin")}
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-gray-300 bg-white hover:bg-gray-50"
        onClick={() => handleShare("general")}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Related Articles component with backlinks
const RelatedArticles = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/images/ethereum-staking-ecosystem.png" alt="Ethereum Staking" fill className="object-cover" />
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
            <Image
              src="/images/defi-integration-diagram.png"
              alt="DeFi Yield Comparison"
              fill
              className="object-cover"
            />
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
            <Image src="/images/validator-network.png" alt="Future of Ethereum Staking" fill className="object-cover" />
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
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-6 relative">
              <Image
                src="/ethereal-ethereum-flow.png"
                alt="Liquid Staking Derivatives"
                fill
                className="object-cover"
                priority
              />
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Liquid Staking Derivatives Explained
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4"
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

            {/* Introduction Section */}
            <section id="introduction" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Introduction</h2>
              <p className="text-gray-700 mb-4">
                Ethereum's transition to Proof of Stake has created new opportunities for ETH holders to earn passive
                income through staking. However, traditional staking comes with a significant drawback: your ETH is
                locked up and illiquid. This is where Liquid Staking Derivatives (LSDs) come in, revolutionizing how
                users can participate in securing the Ethereum network while maintaining liquidity.
              </p>
              <p className="text-gray-700 mb-4">
                In this comprehensive guide, we'll explore what LSDs are, how they work, their benefits and risks, and
                how they're reshaping the Ethereum ecosystem.
              </p>

              {/* Calculator CTA */}
              <div className="my-8">
                <CalculatorCTAButton />
              </div>
            </section>

            {/* What Are LSDs Section */}
            <section id="what-are-lsds" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                What Are Liquid Staking Derivatives?
              </h2>
              <p className="text-gray-700 mb-4">
                Liquid Staking Derivatives (LSDs) are tokens that represent staked ETH on the Ethereum network. When you
                stake through an LSD protocol, you receive a token that represents your staked ETH plus accruing
                rewards. These tokens can be freely traded, used in DeFi applications, or held to accumulate staking
                rewards.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike traditional staking where your ETH is locked until withdrawals are enabled, LSDs provide
                immediate liquidity while still allowing you to earn staking rewards. This innovation has dramatically
                increased the appeal of staking for many Ethereum holders.
              </p>

              {/* Token Type Comparison Component */}
              <TokenTypeComparison />
            </section>

            {/* How They Work Section */}
            <section id="how-they-work" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">How Liquid Staking Works</h2>
              <p className="text-gray-700 mb-4">
                The process of liquid staking is designed to be straightforward for users while handling complex
                operations behind the scenes. Here's how it typically works:
              </p>

              {/* Animated Diagram Component */}
              <AnimatedDiagram />

              <p className="text-gray-700 mt-6 mb-4">
                When you deposit ETH with a liquid staking protocol, the protocol stakes your ETH with validators on
                your behalf. In return, you receive LSD tokens that represent your staked ETH plus accruing rewards.
                These tokens can be used throughout the DeFi ecosystem while your original ETH continues earning staking
                rewards.
              </p>
              <p className="text-gray-700 mb-4">
                Rewards are distributed either through rebasing (automatically increasing your token balance) or through
                value accrual (each token becoming worth more ETH over time), depending on the protocol.
              </p>
            </section>

            {/* Major Protocols Section */}
            <section id="major-protocols" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Major Liquid Staking Protocols</h2>
              <p className="text-gray-700 mb-6">
                Several protocols have emerged as leaders in the liquid staking space, each with unique approaches and
                trade-offs. Let's compare the most prominent options:
              </p>

              {/* Protocol Comparison Component */}
              <ProtocolComparison />

              <p className="text-gray-700 mt-6 mb-4">
                Each protocol has its own approach to validator selection, fee structure, and token mechanics. Your
                choice may depend on factors like decentralization preferences, yield optimization, or integration with
                other DeFi protocols you use.
              </p>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Benefits of Liquid Staking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-medium mb-4 text-gray-800">Liquidity While Staking</h3>
                  <p className="text-gray-700">
                    The primary advantage of LSDs is maintaining liquidity while earning staking rewards. You can sell
                    your position, use it as collateral, or participate in DeFi without unstaking your ETH.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-medium mb-4 text-gray-800">Lower Barriers to Entry</h3>
                  <p className="text-gray-700">
                    No need for 32 ETH or technical knowledge to run a validator. You can stake any amount of ETH
                    through liquid staking protocols, making staking accessible to everyone.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-medium mb-4 text-gray-800">DeFi Integration</h3>
                  <p className="text-gray-700">
                    LSDs can be used throughout the DeFi ecosystem for lending, borrowing, providing liquidity, and
                    more, potentially allowing you to earn additional yield on top of staking rewards.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h3 className="text-xl font-medium mb-4 text-gray-800">Risk Distribution</h3>
                  <p className="text-gray-700">
                    Many protocols distribute your stake across multiple validators, reducing the impact of any single
                    validator's poor performance or slashing events.
                  </p>
                </div>
              </div>
            </section>

            {/* Risks Section */}
            <section id="risks" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Risks and Challenges</h2>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Smart Contract Risks</h3>
                <p className="text-gray-700 mb-2">
                  Liquid staking protocols rely on complex smart contracts that could potentially contain bugs or
                  vulnerabilities. While major protocols undergo rigorous auditing, the risk can never be completely
                  eliminated.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Centralization Concerns</h3>
                <p className="text-gray-700 mb-2">
                  Some protocols control a large percentage of staked ETH, raising concerns about centralization of the
                  Ethereum network. This concentration could potentially impact Ethereum's security and censorship
                  resistance.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Slashing and Validator Risks</h3>
                <p className="text-gray-700 mb-2">
                  If validators managed by the protocol are slashed for misbehavior, users holding the corresponding
                  LSDs could lose a portion of their funds. Different protocols handle this risk in different ways.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Regulatory Uncertainty</h3>
                <p className="text-gray-700 mb-2">
                  The regulatory status of LSDs remains unclear in many jurisdictions. Future regulatory actions could
                  impact how these tokens operate or are traded.
                </p>
              </div>
            </section>

            {/* Impact on Ethereum Section */}
            <section id="impact" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Impact on the Ethereum Ecosystem</h2>
              <p className="text-gray-700 mb-4">Liquid staking has had a profound impact on Ethereum's ecosystem:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Increased staking participation, with over 30% of all ETH now staked</li>
                <li>Enhanced network security through greater validator diversity</li>
                <li>Expanded DeFi opportunities through LSD integration</li>
                <li>Created new yield strategies combining staking with other DeFi activities</li>
              </ul>
              <p className="text-gray-700 mb-4">
                As liquid staking continues to grow, it's becoming an increasingly important part of Ethereum's economic
                layer, influencing everything from network security to DeFi innovation.
              </p>

              {/* Calculator CTA */}
              <div className="my-8">
                <CalculatorCTAButton />
              </div>
            </section>

            {/* Choosing the Right Solution Section */}
            <section id="choosing" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                Choosing the Right Liquid Staking Solution
              </h2>
              <p className="text-gray-700 mb-6">When selecting a liquid staking protocol, consider these factors:</p>

              {/* Interactive Calculator Component */}
              <LSDCalculator />

              <p className="text-gray-700 mt-6 mb-4">
                Beyond the numbers, also consider factors like the protocol's track record, security measures,
                decentralization level, and integration with your preferred DeFi platforms.
              </p>
            </section>

            {/* Future of LSDs Section */}
            <section id="future" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
                The Future of Liquid Staking Derivatives
              </h2>
              <p className="text-gray-700 mb-4">
                The liquid staking space continues to evolve rapidly. Here are some developments to watch:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Increased competition among protocols, potentially leading to better yields and features</li>
                <li>More sophisticated risk management and insurance mechanisms</li>
                <li>Greater integration with Layer 2 solutions and other blockchains</li>
                <li>New governance models that give LSD holders more say in protocol decisions</li>
                <li>Regulatory clarity that could shape how these protocols operate</li>
              </ul>
              <p className="text-gray-700 mb-4">
                As Ethereum continues to mature, liquid staking is likely to become an even more integral part of the
                ecosystem, potentially becoming the default way most users stake their ETH.
              </p>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion" className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Conclusion</h2>
              <p className="text-gray-700 mb-4">
                Liquid staking derivatives represent one of the most significant innovations in the Ethereum ecosystem
                since DeFi itself. By solving the liquidity problem inherent in traditional staking, LSDs have made
                staking more accessible and attractive to a wider audience.
              </p>
              <p className="text-gray-700 mb-4">
                While there are important risks and trade-offs to consider, the benefits of liquid staking have clearly
                resonated with the market. As the technology matures and protocols continue to innovate, we can expect
                liquid staking to play an increasingly central role in Ethereum's we can expect liquid staking to play
                an increasingly central role in Ethereum's economic layer.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you're a long-term ETH holder looking to earn yield, a DeFi enthusiast seeking new
                opportunities, or simply curious about the future of Ethereum, understanding liquid staking derivatives
                is becoming essential knowledge in the evolving crypto landscape.
              </p>

              {/* Final Calculator CTA */}
              <div className="my-8 text-center">
                <p className="text-lg text-gray-700 mb-4">Ready to calculate your potential staking returns?</p>
                <CalculatorCTAButton />
              </div>
            </section>

            {/* Related Articles with backlinks */}
            <RelatedArticles />
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
