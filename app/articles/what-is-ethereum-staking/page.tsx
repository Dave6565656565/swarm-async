"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  ChevronDown,
  Download,
  Twitter,
  Linkedin,
  Info,
  ExternalLink,
  ChevronRight,
  Share2,
  Shield,
  Server,
  Cpu,
  Zap,
  TrendingUp,
  Layers,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/particles-background"

// Interactive Staking Calculator component
const StakingCalculator = () => {
  const [amount, setAmount] = useState<number>(32)
  const [period, setPeriod] = useState<number>(12) // months
  const [selectedMethod, setSelectedMethod] = useState<string>("solo")

  const methods = {
    solo: { name: "Solo Staking", apy: 4.0, fee: 0 },
    service: { name: "Staking as a Service", apy: 3.8, fee: 10 },
    pooled: { name: "Pooled Staking", apy: 3.5, fee: 15 },
    exchange: { name: "Exchange Staking", apy: 3.0, fee: 25 },
  }

  const calculateReturns = () => {
    const method = methods[selectedMethod as keyof typeof methods]
    const apy = method.apy / 100
    const years = period / 12
    const fee = method.fee / 100

    // Simple compound interest formula: P(1 + r)^t
    const grossReturns = amount * Math.pow(1 + apy, years) - amount
    const feeAmount = grossReturns * fee
    const netReturns = grossReturns - feeAmount
    const totalValue = amount + netReturns

    return {
      totalValue: totalValue.toFixed(4),
      grossReturns: grossReturns.toFixed(4),
      netReturns: netReturns.toFixed(4),
      feeAmount: feeAmount.toFixed(4),
      apy: method.apy.toFixed(1),
      fee: method.fee,
    }
  }

  const results = calculateReturns()

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-800">Ethereum Staking Calculator</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Select Staking Method</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(methods).map(([id, method]) => (
                  <button
                    key={id}
                    onClick={() => setSelectedMethod(id)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedMethod === id
                        ? "bg-gray-100 border border-gray-300"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-gray-800">{method.name}</div>
                    <div className="text-sm text-emerald-600">{method.apy}% APY</div>
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
                  <span className="text-gray-600">Staking Method</span>
                  <span className="font-medium text-gray-800">
                    {methods[selectedMethod as keyof typeof methods].name}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">APY</span>
                  <span className="font-medium text-emerald-600">{results.apy}%</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Fee</span>
                  <span className="font-medium text-gray-800">{results.fee}%</span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Gross Returns</span>
                    <span className="font-medium text-emerald-600">+{results.grossReturns} ETH</span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Fee Amount</span>
                    <span className="font-medium text-amber-600">-{results.feeAmount} ETH</span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Net Returns</span>
                    <span className="font-medium text-emerald-600">+{results.netReturns} ETH</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                    <span className="text-gray-600">Final Balance</span>
                    <span className="text-xl font-bold text-gray-800">{results.totalValue} ETH</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              This calculator provides estimates based on current APY rates. Actual returns may vary based on network
              conditions and validator performance.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Staking Methods Comparison component
const StakingMethodsComparison = () => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-5 gap-4">
          <div className="p-4"></div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Server className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Solo Staking</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Cpu className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Staking as a Service</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Layers className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Pooled Staking</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <TrendingUp className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Exchange Staking</span>
          </div>

          {/* Minimum Requirement */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Minimum Requirement</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            32 ETH
            <br />
            <span className="text-xs text-gray-500">+ Hardware & Technical Skills</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            32 ETH
            <br />
            <span className="text-xs text-gray-500">No Hardware Needed</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Any Amount
            <br />
            <span className="text-xs text-gray-500">No Minimum</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Any Amount
            <br />
            <span className="text-xs text-gray-500">Varies by Exchange</span>
          </div>

          {/* APY */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Current APY</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">~4.0%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">~3.8%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">~3.5%</div>
          <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">~3.0%</div>

          {/* Control */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Control Level</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Complete</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Low</div>
          </div>

          {/* Technical Complexity */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Technical Complexity</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "90%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Low</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Very Low</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Very Low</div>
          </div>

          {/* Decentralization Impact */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Decentralization Impact</div>
          <div className="p-4 text-center bg-white border border-gray-100 font-medium text-gray-800">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Highest</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "70%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Low</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Animated diagram component for staking process
const AnimatedStakingProcess = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Staking Works</h3>

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
            <ChevronRight size={20} />
          </div>
        </motion.div>

        {/* Validator Activation */}
        <motion.div
          className="absolute top-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Validator</div>
              <div className="text-sm text-gray-800">Activation</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Enters Activation Queue</div>
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

        {/* Active Validation */}
        <motion.div
          className="absolute top-[48%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Active</div>
              <div className="text-sm text-gray-800">Validation</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Proposing & Attesting Blocks</div>
        </motion.div>

        {/* Arrow 3 Right */}
        <motion.div
          className="absolute top-[55%] left-[68%] w-[10%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
          <div className="absolute right-0 top-[-4px] text-gray-500">
            <ChevronRight size={20} />
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          className="absolute top-[48%] left-[80%] w-[15%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <Zap className="h-6 w-6 text-gray-600" />
          </div>
          <div className="font-medium text-gray-800">Staking Rewards</div>
        </motion.div>

        {/* Optional Exit Path */}
        <motion.div
          className="absolute bottom-[25%] left-[52%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} />
          </div>
        </motion.div>

        {/* Exit & Withdrawal */}
        <motion.div
          className="absolute bottom-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Exit &</div>
              <div className="text-sm text-gray-800">Withdrawal</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Optional</div>
        </motion.div>

        {/* Network Security */}
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-[60%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
        >
          <div className="w-full h-16 mx-auto rounded-lg bg-gray-50 flex items-center justify-center">
            <div className="flex items-center">
              <div className="text-gray-800 mr-2">Network Security</div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-emerald-500 to-gray-400 relative">
                <motion.div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-emerald-500"
                  animate={{ x: [0, 128, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                />
              </div>
              <div className="text-emerald-600 ml-2">Ethereum Blockchain</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Share functionality
const ShareButtons = () => {
  const generatePDF = () => {
    // Create a link element
    const link = document.createElement("a")

    // Set link properties for PDF download
    link.href = "/api/generate-pdf?article=what-is-ethereum-staking"
    link.download = "What-is-Ethereum-Staking.pdf"

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = "What is Ethereum Staking? A Comprehensive Introduction"
    const text = "Learn about Ethereum staking, how it works, and how you can participate."

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
      >
        <Download className="mr-2 h-4 w-4" />
        PDF
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

// Related Articles component
const RelatedArticles = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Further Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/placeholder.svg?height=160&width=300&text=Ethereum+Staking+Rewards"
              alt="Ethereum Staking Rewards"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Explore Staking Rewards</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              A detailed breakdown of staking rewards and how they're calculated
            </p>
            <Link
              href="/articles/eth-staking-rewards"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/placeholder.svg?height=160&width=300&text=Staking+Risks"
              alt="Staking Risks"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Understand Staking Risks</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              In-depth analysis of risk factors and mitigation strategies
            </p>
            <Link
              href="/articles/staking-risks"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/placeholder.svg?height=160&width=300&text=Best+Staking+Platforms"
              alt="Best Staking Platforms"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Discover Staking Platforms</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">Comparing the top platforms for staking your ETH</p>
            <Link
              href="/articles/best-eth-staking-platforms"
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

// Simple Table of Contents component
const StickyTableOfContents = () => {
  return (
    <div className="sticky top-8">
      <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
        <ul className="space-y-2">
          <li>
            <a href="#introduction" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Introduction to Ethereum Staking
            </a>
          </li>
          <li>
            <a href="#fundamentals" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              The Fundamentals of Proof of Stake
            </a>
          </li>
          <li>
            <a href="#how-staking-works" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              How Ethereum Staking Works
            </a>
          </li>
          <li>
            <a href="#staking-rewards" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Staking Rewards
            </a>
          </li>
          <li>
            <a href="#participation-methods" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Ways to Participate
            </a>
          </li>
          <li>
            <a href="#risks" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Risks and Considerations
            </a>
          </li>
          <li>
            <a href="#technical-architecture" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Technical Architecture
            </a>
          </li>
          <li>
            <a href="#future" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              The Future of Ethereum Staking
            </a>
          </li>
          <li>
            <a href="#getting-started" className="text-gray-600 hover:text-gray-900 flex items-center">
              <ChevronRight size={16} className="mr-1" />
              Getting Started
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
    </div>
  )
}

export default function WhatIsEthereumStakingPage() {
  return (
    <div className="min-h-screen relative bg-gray-50">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-8 sm:py-12 relative">
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
                src="/placeholder.svg?height=400&width=800&text=Ethereum+Staking+Network"
                alt="Ethereum Staking Network"
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
              What is Ethereum Staking?
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              A Comprehensive Introduction
            </motion.div>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>By Dave Baghi</span>
              <span className="mx-2">•</span>
              <span>May 26, 2024</span>
              <span className="mx-2">•</span>
              <span>15 min read</span>
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#introduction" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Introduction to Ethereum Staking
                  </a>
                </li>
                <li>
                  <a href="#fundamentals" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    The Fundamentals of Proof of Stake
                  </a>
                </li>
                <li>
                  <a href="#how-staking-works" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    How Ethereum Staking Works
                  </a>
                </li>
                <li>
                  <a href="#staking-rewards" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Staking Rewards
                  </a>
                </li>
                <li>
                  <a href="#participation-methods" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Ways to Participate
                  </a>
                </li>
                <li>
                  <a href="#risks" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Risks and Considerations
                  </a>
                </li>
                <li>
                  <a href="#technical-architecture" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Technical Architecture
                  </a>
                </li>
                <li>
                  <a href="#future" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    The Future of Ethereum Staking
                  </a>
                </li>
                <li>
                  <a href="#getting-started" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Getting Started
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
                Introduction to Ethereum Staking
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                Ethereum staking is a process that allows ETH holders to actively participate in securing the Ethereum
                network while earning rewards. Since Ethereum's transition to Proof of Stake in September 2022 (an event
                known as "The Merge"), staking has become the fundamental mechanism that secures the blockchain,
                validates transactions, and creates new blocks.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                At its core, staking involves depositing ETH to activate validator software, which processes
                transactions, stores data, and adds new blocks to the blockchain. This replaces the energy-intensive
                mining process that Ethereum previously used, resulting in a more sustainable and accessible system.
              </p>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Network Security</h4>
                    <p className="text-sm text-gray-600">Validators secure the blockchain</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Earn Rewards</h4>
                    <p className="text-sm text-gray-600">~3-5% annual yield</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <Layers className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Multiple Options</h4>
                    <p className="text-sm text-gray-600">Various ways to participate</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-800">
                In this comprehensive guide, we'll explore the fundamentals of Ethereum staking, how it works, the
                rewards you can earn, different ways to participate, and important considerations for anyone interested
                in staking their ETH.
              </p>

              {/* Add new image */}
              <div className="w-full rounded-xl overflow-hidden mb-6 relative">
                <Image
                  src="/placeholder.svg?height=400&width=800&text=Ethereum+Evolution"
                  alt="Ethereum's Transition to Proof of Stake"
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                  loading="eager"
                />
                <div className="text-xs text-gray-500 text-center mt-2">
                  Ethereum's transition from Proof of Work to Proof of Stake
                </div>
              </div>
            </section>

            {/* The Fundamentals of Proof of Stake */}
            <section id="fundamentals" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Fundamentals of Proof of Stake
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                      <div className="flex flex-col items-center text-center p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Proof of Work vs. Proof of Stake</h3>
                        <div className="grid grid-cols-2 gap-8 w-full">
                          <div className="flex flex-col items-center">
                            <div className="text-gray-800 font-medium mb-2">Proof of Work</div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 mb-2">
                              Miners compete with computing power
                            </div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 mb-2">
                              High energy consumption
                            </div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600">
                              Hardware investment required
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-gray-800 font-medium mb-2">Proof of Stake</div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 mb-2">
                              Validators selected by stake
                            </div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 mb-2">
                              Energy efficient
                            </div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600">
                              Capital investment required
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    To understand Ethereum staking, it's important to grasp the basics of the Proof of Stake consensus
                    mechanism that underlies it. Unlike the previous Proof of Work system, where miners competed through
                    computational work, Proof of Stake selects validators based on the amount of ETH they have staked.
                  </p>
                  <p className="text-lg text-gray-800">
                    This fundamental shift has transformed how Ethereum achieves consensus, processes transactions, and
                    maintains security, while dramatically reducing its environmental impact.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Key Elements of Proof of Stake</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Validators Instead of Miners</h4>
                  <p className="text-gray-600">
                    In Proof of Stake, validators replace miners as the participants who maintain the network. While
                    miners competed through computational work, validators are selected based on the amount of ETH they
                    have staked and other factors.
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Economic Security</h4>
                  <p className="text-gray-600">
                    The security of the network comes from validators having an economic stake in its proper operation.
                    Validators must deposit 32 ETH as collateral, which can be reduced (slashed) if they act maliciously
                    or fail to perform their duties properly.
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Energy Efficiency</h4>
                  <p className="text-gray-600">
                    Unlike Proof of Work, which requires enormous amounts of energy for computational puzzles, Proof of
                    Stake requires minimal computational resources. This has reduced Ethereum's energy consumption by
                    approximately 99.95%.
                  </p>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Did You Know?</h4>
                </div>
                <p className="text-gray-600">
                  Ethereum's transition to Proof of Stake reduced its energy consumption by approximately 99.95%, making
                  it one of the most environmentally friendly blockchain networks. A single Ethereum transaction now
                  uses about the same amount of electricity as a few minutes of watching YouTube.
                </p>
              </div>
            </section>

            {/* How Ethereum Staking Works */}
            <section id="how-staking-works" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How Ethereum Staking Works
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                The staking process involves several key components and activities that work together to secure the
                Ethereum network while rewarding participants:
              </p>

              <AnimatedStakingProcess />

              <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">The Validator Lifecycle</h3>

              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 my-6">
                <h4 className="font-semibold text-gray-800 mb-2">Key Stages</h4>
                <ol className="list-decimal pl-5 text-gray-600">
                  <li>
                    <strong>Deposit and Activation:</strong> Validators deposit 32 ETH and enter an activation queue.
                  </li>
                  <li>
                    <strong>Active Validation:</strong> Validators propose and attest to blocks.
                  </li>
                  <li>
                    <strong>Rewards Accumulation:</strong> Validators earn ETH rewards for their service.
                  </li>
                  <li>
                    <strong>Exit (Optional):</strong> Validators can exit and withdraw their stake.
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Validator Responsibilities</h3>
              <p className="text-gray-700 mb-4">
                Active validators have two primary responsibilities: attesting to blocks and proposing new blocks.
              </p>

              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 my-6">
                <h4 className="font-semibold text-gray-800 mb-2">Attesting to Blocks</h4>
                <p className="text-gray-600">
                  Validators vote on the validity of blocks proposed by other validators. These votes, called
                  attestations, help the network come to a consensus on the state of the blockchain.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 my-6">
                <h4 className="font-semibold text-gray-800 mb-2">Proposing New Blocks</h4>
                <p className="text-gray-600">
                  Validators are randomly selected to propose new blocks, which involves bundling transactions,
                  executing smart contracts, and computing the new state of the blockchain.
                </p>
              </div>
            </section>

            {/* Staking Rewards */}
            <section id="staking-rewards" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Staking Rewards: How and Why They're Earned
              </motion.h2>

              <p className="text-gray-700 mb-4">
                Validators earn rewards for their participation in the network's consensus process. These rewards serve
                as an incentive for validators to act honestly and maintain the security of the network.
              </p>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 8V16M8 12H16"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Base Rewards</h4>
                    <p className="text-sm text-gray-600">For attestations and proposals</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 17V17.01M12 13.5C12 11 15 11 15 8.5C15 6.01 13.21 4 11 4C8.79 4 7 6.01 7 8.5M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Priority Fees</h4>
                    <p className="text-sm text-gray-600">From transaction fees</p>
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
                    <h4 className="font-semibold mb-1 text-gray-800">MEV</h4>
                    <p className="text-sm text-gray-600">Maximal Extractable Value</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Sources of Rewards</h3>

              <div className="space-y-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Base Rewards</h4>
                  <p className="text-gray-600">
                    These are the primary rewards issued by the protocol for successful attestations and block
                    proposals. Base rewards are calculated based on the validator's effective balance and the total
                    number of active validators in the network.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Priority Fees</h4>
                  <p className="text-gray-600">
                    Users can include priority fees (tips) with their transactions to incentivize validators to include
                    them in blocks. When a validator proposes a block, they receive all the priority fees from the
                    transactions included in that block.
                  </p>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">MEV (Maximal Extractable Value)</h4>
                  <p className="text-gray-600">
                    MEV refers to the value that can be extracted by reordering, including, or excluding transactions
                    within a block. Validators can capture MEV through various strategies or by using MEV-boost relays
                    that connect them to block builders who optimize for MEV extraction.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Reward Rates and Factors</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/placeholder.svg?height=300&width=500&text=Staking+Rewards+Chart"
                      alt="Staking Rewards Chart"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    The annual percentage rate (APR) for staking varies based on several factors:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>
                        <strong>Total ETH staked:</strong> As more ETH is staked, the reward rate decreases (to prevent
                        over-issuance)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>
                        <strong>Validator performance:</strong> Validators that maintain high uptime and correctly
                        perform their duties earn optimal rewards
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>
                        <strong>Network activity:</strong> Higher transaction volumes generally lead to higher priority
                        fees
                      </span>
                    </li>
                  </ul>
                  <p className="text-lg mt-4 text-gray-800">
                    Current staking APRs typically range from 3% to 5%, though this can vary based on the factors above.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Calculate Your Potential Rewards</h3>
                <StakingCalculator />
              </div>
            </section>

            {/* Ways to Participate */}
            <section id="participation-methods" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Different Ways to Participate in Ethereum Staking
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                There are several approaches to staking ETH, each with different requirements, risks, and rewards. The
                right option for you depends on your resources, technical expertise, and investment goals.
              </p>

              <div className="mb-8">
                <StakingMethodsComparison />
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Solo Staking (32 ETH)</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/3 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Solo+Staking+Setup"
                      alt="Solo Staking Setup"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-gray-800">
                    Running your own validator node with 32 ETH is the most direct form of participation in Ethereum
                    staking. This option gives you complete control over your validator setup and operations, but also
                    requires technical knowledge and dedicated hardware.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Requirements</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 32 ETH</li>
                        <li>• Dedicated computer</li>
                        <li>• Stable internet connection</li>
                        <li>• Technical knowledge</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Benefits</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Maximum rewards (no third-party fees)</li>
                        <li>• Complete control over validator</li>
                        <li>• Direct contribution to decentralization</li>
                        <li>• Privacy and security</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Solo staking is ideal for those who want to maximize their rewards and have the technical skills to
                    set up and maintain a validator node. For a detailed guide on setting up your own validator, see our{" "}
                    <Link href="/articles/solo-staking-complete-guide" className="text-gray-800 hover:underline">
                      solo staking complete guide
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Staking as a Service (32 ETH)</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-gray-800">
                    This option allows you to delegate the technical operation of your validator while maintaining
                    ownership of your 32 ETH. Staking-as-a-Service providers handle the setup, maintenance, and
                    monitoring of validator nodes on your behalf.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Requirements</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 32 ETH</li>
                        <li>• No technical expertise needed</li>
                        <li>• No hardware required</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Considerations</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Service fees (typically 5-15%)</li>
                        <li>• Reliance on third-party infrastructure</li>
                        <li>• You still own the validator keys</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Staking as a Service is a good middle ground for those who have 32 ETH but lack the technical
                    expertise or desire to run their own validator node. Popular providers include Kiln, Staked.us, and
                    Allnodes.
                  </p>
                </div>
                <div className="md:w-1/3 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Staking+as+a+Service"
                      alt="Staking as a Service"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Pooled Staking (Any Amount)</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/3 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Pooled+Staking"
                      alt="Pooled Staking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-gray-800">
                    Pooled staking allows participation with less than 32 ETH by combining funds with other stakers.
                    This approach makes staking accessible to a wider range of ETH holders and is ideal for those with
                    smaller amounts of ETH.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Requirements</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Any amount of ETH</li>
                        <li>• No technical expertise needed</li>
                        <li>• No hardware required</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Popular Options</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Rocket Pool (minimum 0.01 ETH)</li>
                        <li>• Stakefish (minimum 0.1 ETH)</li>
                        <li>• StakeWise (no minimum)</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Pooled staking typically involves lower rewards due to pool fees, but offers greater accessibility
                    and convenience. For more information on staking with smaller amounts, see our guide on{" "}
                    <Link href="/articles/staking-with-less-than-32-eth" className="text-gray-800 hover:underline">
                      staking with less than 32 ETH
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Liquid Staking (Any Amount)</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-gray-800">
                    Liquid staking protocols issue tokens representing staked ETH, allowing for liquidity while staking.
                    This innovative approach enables users to stake their ETH while still maintaining the ability to use
                    their assets in other DeFi applications.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">How It Works</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Deposit ETH to the protocol</li>
                        <li>• Receive liquid staking tokens (e.g., stETH)</li>
                        <li>• Use tokens in DeFi integration</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Popular Protocols</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Lido (stETH)</li>
                        <li>• Rocket Pool (rETH)</li>
                        <li>• Frax (frxETH)</li>
                        <li>• Coinbase (cbETH)</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Liquid staking has become one of the most popular ways to stake ETH due to its flexibility and
                    capital efficiency. To learn more about liquid staking options, check out our article on{" "}
                    <Link
                      href="/articles/liquid-staking-derivatives-explained"
                      className="text-gray-800 hover:underline"
                    >
                      liquid staking derivatives explained
                    </Link>
                    .
                  </p>
                </div>
                <div className="md:w-1/3 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Liquid+Staking"
                      alt="Liquid Staking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Exchange Staking (Any Amount)</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/3 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Exchange+Staking"
                      alt="Exchange Staking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-lg mb-4 text-gray-800">
                    Many cryptocurrency exchanges offer staking services, allowing users to stake their ETH directly
                    through the exchange platform. This is often the simplest option for beginners or those who already
                    keep their ETH on exchanges.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Advantages</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Extremely simple user experience</li>
                        <li>• No minimum in many cases</li>
                        <li>• Integrated with existing exchange accounts</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-gray-800">Considerations</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Higher fees (often 25%+ of rewards)</li>
                        <li>• Exchange maintains custody of your ETH</li>
                        <li>• Centralization concerns</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Exchange staking is ideal for those who prioritize simplicity and already use exchanges for their
                    crypto holdings. Popular exchanges offering ETH staking include Coinbase, Binance, and Kraken.
                  </p>
                </div>
              </div>
            </section>

            {/* Risks and Considerations */}
            <section id="risks" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Risks and Considerations in Ethereum Staking
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                While staking offers attractive rewards, it's important to understand the associated risks before
                committing your ETH. Different staking methods come with different risk profiles, and being aware of
                these risks can help you make informed decisions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Validator Risks</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Slashing:</strong> Validators can lose a portion of their stake for malicious behavior
                        or serious technical failures
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Penalties:</strong> Minor penalties for being offline or failing to attest properly
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Technical failures:</strong> Hardware or software issues can impact validator
                        performance
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Market Risks</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Price volatility:</strong> The value of ETH can fluctuate significantly
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Opportunity cost:</strong> Staked ETH cannot be used for other purposes (unless using
                        liquid staking)
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Liquidity risk:</strong> There may be delays when withdrawing staked ETH
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Protocol Risks</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Smart contract vulnerabilities:</strong> Particularly relevant for pooled and liquid
                        staking
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Protocol changes:</strong> Future Ethereum upgrades could affect staking mechanics
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Centralization risks:</strong> Concentration of stake in a few entities could affect
                        network security
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Risk Mitigation Strategies</h4>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Platform Diversification:</strong> Distribute your ETH across multiple staking platforms
                      to reduce single-point failure risks.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Security Audit Verification:</strong> Choose platforms with multiple independent security
                      audits from reputable firms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Non-Custodial Preference:</strong> When possible, opt for non-custodial staking solutions
                      that allow you to maintain control of your private keys.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Performance Monitoring:</strong> Regularly track validator performance, platform TVL
                      trends, and derivative token prices to identify potential issues early.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Insurance Coverage:</strong> Consider platforms offering insurance against slashing or
                      smart contract failures, or explore third-party DeFi insurance protocols like Nexus Mutual.
                    </span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-600">
                For a more comprehensive analysis of these risks, see our article on{" "}
                <Link href="/articles/staking-risks" className="text-gray-800 hover:underline">
                  understanding the risks of Ethereum staking
                </Link>
                .
              </p>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Conclusion: Getting Started with Ethereum Staking
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                Ethereum staking represents a fundamental shift in how blockchain networks achieve consensus and
                security. By transitioning from energy-intensive mining to stake-based validation, Ethereum has become
                more sustainable while offering ETH holders the opportunity to earn rewards by participating in network
                security.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                Whether you choose solo staking for maximum control and rewards, liquid staking for flexibility, or
                exchange staking for simplicity, there's an option that can fit your needs, technical expertise, and
                risk tolerance. The key is understanding the trade-offs between different approaches and choosing the
                method that aligns with your goals.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                As the Ethereum ecosystem continues to evolve, staking will remain a cornerstone of the network's
                security and decentralization. By participating in staking, you're not only earning rewards but also
                contributing to the health and security of one of the world's most important blockchain networks.
              </p>

              <div className="mt-6 p-4 rounded-md bg-gray-50 border border-gray-200">
                <h4 className="font-medium mb-2 text-gray-800">Key Takeaways</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Ethereum staking secures the network through Proof of Stake consensus</li>
                  <li>Multiple participation options exist, from solo staking to liquid staking</li>
                  <li>Rewards typically range from 3-5% APR depending on network conditions</li>
                  <li>Each staking method has different requirements, risks, and rewards</li>
                  <li>Understanding the risks is crucial before committing your ETH</li>
                </ul>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Last updated: <time dateTime="2024-05-26">May 26, 2024</time>
              </div>
            </section>

            {/* Related Articles */}
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
