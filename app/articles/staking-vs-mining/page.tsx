"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Zap,
  TrendingUp,
  Layers,
  HardDrive,
  Leaf,
  Lock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ParticlesBackground } from "@/components/particles-background"

// Mining vs Staking Comparison component
const MiningVsStakingComparison = () => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[800px]">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4"></div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <HardDrive className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Proof of Work (Mining)</span>
          </div>
          <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
            <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
              <Layers className="h-6 w-6 text-gray-600" />
            </div>
            <span className="text-gray-800">Proof of Stake (Staking)</span>
          </div>

          {/* Consensus Mechanism */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Consensus Mechanism</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Computational competition
            <br />
            <span className="text-xs text-gray-500">Miners solve cryptographic puzzles</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Economic stake
            <br />
            <span className="text-xs text-gray-500">Validators selected based on stake</span>
          </div>

          {/* Resource Requirements */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Resource Requirements</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Specialized hardware
            <br />
            <span className="text-xs text-gray-500">High electricity consumption</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Cryptocurrency stake
            <br />
            <span className="text-xs text-gray-500">Minimal electricity usage</span>
          </div>

          {/* Energy Efficiency */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Energy Efficiency</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "10%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Low</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "95%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Very High</div>
          </div>

          {/* Barrier to Entry */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Barrier to Entry</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">High (Hardware + Electricity)</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Medium (Capital Required)</div>
          </div>

          {/* Security Model */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Security Model</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            51% of hash power
            <br />
            <span className="text-xs text-gray-500">Cost of attack = hardware + energy</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            51% of staked tokens
            <br />
            <span className="text-xs text-gray-500">Cost of attack = tokens + slashing risk</span>
          </div>

          {/* Reward Distribution */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Reward Distribution</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Winner-takes-all
            <br />
            <span className="text-xs text-gray-500">First to solve gets full block reward</span>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            Proportional to stake
            <br />
            <span className="text-xs text-gray-500">Predictable returns based on stake</span>
          </div>

          {/* Centralization Tendency */}
          <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Centralization Tendency</div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Mining pools & ASIC manufacturers</div>
          </div>
          <div className="p-4 text-center bg-white border border-gray-100">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div className="bg-gray-500 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
            <div className="text-xs mt-1 text-gray-500">Wealth concentration & staking services</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Energy Consumption Calculator component
const EnergyConsumptionCalculator = () => {
  const [hashrate, setHashrate] = useState<number>(100)
  const [efficiency, setEfficiency] = useState<number>(40)
  const [electricityCost, setElectricityCost] = useState<number>(0.12)
  const [stakingNodes, setStakingNodes] = useState<number>(10000)
  const [nodePower, setNodePower] = useState<number>(100)

  const calculateMiningEnergy = () => {
    // Simplified calculation: hashrate (TH/s) * efficiency (W/TH) = power in W
    const powerConsumption = hashrate * efficiency
    const dailyEnergy = (powerConsumption * 24) / 1000 // kWh per day
    const monthlyCost = dailyEnergy * 30 * electricityCost

    return {
      powerConsumption,
      dailyEnergy,
      monthlyCost,
    }
  }

  const calculateStakingEnergy = () => {
    // Simplified calculation: number of nodes * power per node (W)
    const totalPower = stakingNodes * nodePower
    const dailyEnergy = (totalPower * 24) / 1000 // kWh per day
    const monthlyCost = dailyEnergy * 30 * electricityCost

    return {
      totalPower,
      dailyEnergy,
      monthlyCost,
    }
  }

  const miningResults = calculateMiningEnergy()
  const stakingResults = calculateStakingEnergy()

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-medium mb-6 text-gray-800">Energy Consumption Comparison</h3>

        <Tabs defaultValue="mining" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
            <TabsTrigger value="mining" className="data-[state=active]:bg-white">
              Mining (PoW)
            </TabsTrigger>
            <TabsTrigger value="staking" className="data-[state=active]:bg-white">
              Staking (PoS)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mining" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Mining Hashrate (TH/s): {hashrate}
                  </label>
                  <Slider
                    value={[hashrate]}
                    min={1}
                    max={1000}
                    step={1}
                    onValueChange={(value) => setHashrate(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 TH/s</span>
                    <span>1000 TH/s</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Energy Efficiency (W/TH): {efficiency}
                  </label>
                  <Slider
                    value={[efficiency]}
                    min={20}
                    max={100}
                    step={1}
                    onValueChange={(value) => setEfficiency(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>20 W/TH (Efficient)</span>
                    <span>100 W/TH (Inefficient)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Electricity Cost ($/kWh): ${electricityCost.toFixed(2)}
                  </label>
                  <Slider
                    value={[electricityCost]}
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    onValueChange={(value) => setElectricityCost(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0.05/kWh</span>
                    <span>$0.50/kWh</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex flex-col">
                <h4 className="text-lg font-medium mb-4 text-gray-800">Mining Energy Results</h4>

                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Power Consumption</span>
                    <span className="font-medium text-gray-800">{miningResults.powerConsumption.toFixed(2)} W</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Daily Energy Usage</span>
                    <span className="font-medium text-gray-800">{miningResults.dailyEnergy.toFixed(2)} kWh</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Electricity Cost</span>
                    <span className="font-medium text-gray-800">${miningResults.monthlyCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600">Equivalent to</span>
                    <span className="font-medium text-gray-800">
                      {(miningResults.dailyEnergy / 12).toFixed(1)} household daily usage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Number of Validator Nodes: {stakingNodes}
                  </label>
                  <Slider
                    value={[stakingNodes]}
                    min={1000}
                    max={100000}
                    step={1000}
                    onValueChange={(value) => setStakingNodes(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1,000 nodes</span>
                    <span>100,000 nodes</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Power per Node (W): {nodePower}
                  </label>
                  <Slider
                    value={[nodePower]}
                    min={10}
                    max={500}
                    step={10}
                    onValueChange={(value) => setNodePower(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>10 W (Raspberry Pi)</span>
                    <span>500 W (High-end server)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Electricity Cost ($/kWh): ${electricityCost.toFixed(2)}
                  </label>
                  <Slider
                    value={[electricityCost]}
                    min={0.05}
                    max={0.5}
                    step={0.01}
                    onValueChange={(value) => setElectricityCost(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>$0.05/kWh</span>
                    <span>$0.50/kWh</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex flex-col">
                <h4 className="text-lg font-medium mb-4 text-gray-800">Staking Energy Results</h4>

                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Power Consumption</span>
                    <span className="font-medium text-gray-800">{stakingResults.totalPower.toFixed(2)} W</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Daily Energy Usage</span>
                    <span className="font-medium text-gray-800">{stakingResults.dailyEnergy.toFixed(2)} kWh</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Monthly Electricity Cost</span>
                    <span className="font-medium text-gray-800">${stakingResults.monthlyCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600">Equivalent to</span>
                    <span className="font-medium text-gray-800">
                      {(stakingResults.dailyEnergy / 12).toFixed(1)} household daily usage
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <div className="flex items-center mb-2">
            <Info className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
            <span className="font-medium">Note:</span>
          </div>
          <p>
            This calculator provides simplified estimates for educational purposes. Actual energy consumption varies
            based on hardware specifics, network conditions, and other factors. The mining calculation is based on
            Bitcoin-like PoW systems, while the staking calculation represents Ethereum-like PoS systems.
          </p>
        </div>
      </div>
    </div>
  )
}

// Security Models Comparison component
const SecurityModelsComparison = () => {
  const [activeTab, setActiveTab] = useState("pow")

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">Security Models Compared</h3>

      <Tabs defaultValue="pow" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100">
          <TabsTrigger value="pow" className="data-[state=active]:bg-white">
            Proof of Work Security
          </TabsTrigger>
          <TabsTrigger value="pos" className="data-[state=active]:bg-white">
            Proof of Stake Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pow" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4 text-gray-800">PoW Security Model</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-gray-800">Miners Compete with Hash Power</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="mb-2 text-gray-800">Computational Work Secures Network</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="text-gray-800">51% Attack Requires Majority Hash Power</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                In Proof of Work, security is derived from the computational power (hash rate) dedicated to the network.
                Attackers would need to control more than 50% of the network&apos;s total hash power to successfully
                attack the network, which becomes increasingly expensive as the network grows.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Lock size={16} className="mr-2 text-gray-600" />
                  Security Guarantees
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Security tied to physical resources (hardware and energy)</li>
                  <li>• Attacks require significant upfront investment</li>
                  <li>• Hardware can be repurposed or sold after attack</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Info size={16} className="mr-2 text-amber-600" />
                  Attack Vectors
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 51% attacks to double-spend or censor transactions</li>
                  <li>• Selfish mining strategies</li>
                  <li>• Network partitioning attacks</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 text-gray-800">Cost of Attack</h4>
                <div className="text-sm text-gray-600">
                  The cost of a 51% attack includes acquiring sufficient mining hardware and the electricity to operate
                  it. For large networks like Bitcoin, this cost is estimated to be in the billions of dollars.
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pos" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-lg bg-gray-50 flex items-center justify-center p-6 mb-4">
                <div className="text-center">
                  <div className="text-xl mb-4 text-gray-800">PoS Security Model</div>
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-gray-800">Validators Stake Cryptocurrency</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="mb-2 text-gray-800">Economic Stake Secures Network</div>
                    <ChevronDown className="my-2 text-gray-400" />
                    <div className="text-gray-800">Malicious Behavior Results in Slashing</div>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                In Proof of Stake, security is derived from validators having economic stake in the network. Validators
                must lock up cryptocurrency as collateral, which can be reduced (slashed) if they act maliciously,
                creating a direct financial incentive for honest behavior.
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Lock size={16} className="mr-2 text-gray-600" />
                  Security Guarantees
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Security tied to economic value of staked tokens</li>
                  <li>• Attacks result in loss of stake (slashing)</li>
                  <li>• Social coordination can recover from attacks</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 flex items-center text-gray-800">
                  <Info size={16} className="mr-2 text-amber-600" />
                  Attack Vectors
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 51% attacks require majority of staked tokens</li>
                  <li>• Long-range attacks (mitigated by checkpoints)</li>
                  <li>• Nothing-at-stake problem (solved by slashing)</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <h4 className="font-medium mb-2 text-gray-800">Cost of Attack</h4>
                <div className="text-sm text-gray-600">
                  The cost of a 51% attack includes acquiring a majority of staked tokens, plus the risk of losing those
                  tokens through slashing penalties. For Ethereum, this cost is estimated to be tens of billions of
                  dollars.
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Animated diagram component for mining process
const AnimatedMiningProcess = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Mining Works</h3>

      <div className="relative h-[300px] md:h-[400px]">
        {/* Mining Hardware */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <HardDrive className="h-8 w-8 text-gray-600" />
          </div>
          <div className="font-medium text-gray-800">Mining Hardware</div>
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

        {/* Computational Work */}
        <motion.div
          className="absolute top-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Computational</div>
              <div className="text-sm text-gray-800">Work</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Solving Cryptographic Puzzles</div>
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

        {/* Block Creation */}
        <motion.div
          className="absolute top-[48%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Block</div>
              <div className="text-sm text-gray-800">Creation</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">New Block Found</div>
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
          <div className="font-medium text-gray-800">Mining Rewards</div>
        </motion.div>

        {/* Network Verification */}
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

        {/* Network Consensus */}
        <motion.div
          className="absolute bottom-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Network</div>
              <div className="text-sm text-gray-800">Consensus</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Block Added to Chain</div>
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
              <div className="w-32 h-0.5 bg-gradient-to-r from-gray-500 to-gray-400 relative">
                <motion.div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-gray-500"
                  animate={{ x: [0, 128, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                />
              </div>
              <div className="text-gray-600 ml-2">Blockchain</div>
            </div>
          </div>
        </motion.div>
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
          <div className="font-medium text-gray-800">Token Deposit</div>
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
          <div className="font-medium text-gray-800">Become a Validator</div>
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
          <div className="font-medium text-gray-800">Validate Transactions</div>
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
              <div className="text-emerald-600 ml-2">Blockchain</div>
            </div>
          </div>
        </motion.div>
      </div>
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
            href="#fundamentals"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "fundamentals" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Fundamentals of Consensus
          </a>
        </li>
        <li>
          <a
            href="#how-they-work"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "how-they-work" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            How Mining and Staking Work
          </a>
        </li>
        <li>
          <a
            href="#energy-comparison"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "energy-comparison" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Energy Consumption Comparison
          </a>
        </li>
        <li>
          <a
            href="#security-models"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "security-models" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Security Models
          </a>
        </li>
        <li>
          <a
            href="#economic-implications"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "economic-implications" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Economic Implications
          </a>
        </li>
        <li>
          <a
            href="#centralization"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "centralization" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Centralization Concerns
          </a>
        </li>
        <li>
          <a
            href="#real-world"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "real-world" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Real-World Examples
          </a>
        </li>
        <li>
          <a
            href="#future"
            className={`block py-1.5 px-3 rounded-lg transition-colors ${activeSection === "future" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
          >
            Future of Consensus Mechanisms
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
    link.href = "/api/generate-pdf?article=staking-vs-mining"
    link.download = "Staking-vs-Mining-Comparison.pdf"

    // Append to body, click, and remove
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = "Staking vs Mining: What's the Difference?"
    const text = "Learn about the key differences between Proof of Work mining and Proof of Stake staking."

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
      <h3 className="text-xl font-bold mb-4 text-gray-800">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/ethereum-staking-rewards-over-time.png"
              alt="Ethereum Staking Rewards"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">What is Ethereum Staking?</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              A comprehensive introduction to Ethereum staking and how it works
            </p>
            <Link
              href="/articles/what-is-ethereum-staking"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-risks.png" alt="Staking Risks" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Environmental Impact of Ethereum Staking</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              How Ethereum&apos;s transition to Proof of Stake affects its environmental footprint
            </p>
            <Link
              href="/articles/eth-staking-environmental-impact"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-comparison.png" alt="Best Staking Platforms" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Future of Ethereum Staking</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Exploring upcoming developments in Ethereum&apos;s staking ecosystem
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

export default function StakingVsMiningPage() {
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
                src="/ethereum-pos-flow.png"
                alt="Mining vs Staking Comparison"
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
              Staking vs Mining: What&apos;s the Difference?
            </motion.h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Comparing Blockchain Consensus Mechanisms
            </motion.div>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>By Dave Baghi</span>
              <span className="mx-2">•</span>
              <span>May 24, 2024</span>
              <span className="mx-2">•</span>
              <span>12 min read</span>
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Table of Contents</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#introduction" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Introduction
                  </a>
                </li>
                <li>
                  <a href="#fundamentals" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Fundamentals of Consensus
                  </a>
                </li>
                <li>
                  <a href="#how-they-work" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    How Mining and Staking Work
                  </a>
                </li>
                <li>
                  <a href="#energy-comparison" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Energy Consumption Comparison
                  </a>
                </li>
                <li>
                  <a href="#security-models" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Security Models
                  </a>
                </li>
                <li>
                  <a href="#economic-implications" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Economic Implications
                  </a>
                </li>
                <li>
                  <a href="#centralization" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Centralization Concerns
                  </a>
                </li>
                <li>
                  <a href="#real-world" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Real-World Examples
                  </a>
                </li>
                <li>
                  <a href="#future" className="text-gray-600 hover:text-gray-900 flex items-center">
                    <ChevronRight size={16} className="mr-1" />
                    Future of Consensus Mechanisms
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
                Introduction: The Evolution of Blockchain Consensus
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                Blockchain technology has revolutionized how we think about trust and consensus in digital systems. At
                the heart of every blockchain lies a consensus mechanism—the protocol that allows distributed network
                participants to agree on the state of the blockchain without relying on a central authority.
              </p>

              <p className="text-lg mb-4 text-gray-800">
                Two of the most prominent consensus mechanisms are Proof of Work (mining) and Proof of Stake (staking).
                These approaches represent fundamentally different philosophies for achieving consensus, with
                significant implications for energy consumption, security, economics, and participation.
              </p>

              <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <HardDrive className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Proof of Work (Mining)</h4>
                    <p className="text-sm text-gray-600">Computational competition to solve cryptographic puzzles</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center">
                      <Layers className="h-6 w-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold mb-1 text-gray-800">Proof of Stake (Staking)</h4>
                    <p className="text-sm text-gray-600">Economic stake to validate transactions and create blocks</p>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-800">
                In this comprehensive guide, we&apos;ll explore the key differences between mining and staking,
                examining how each works, their respective advantages and disadvantages, and the implications of
                choosing one consensus mechanism over the other. Whether you&apos;re a blockchain enthusiast, investor,
                or developer, understanding these differences is crucial for navigating the evolving landscape of
                blockchain technology.
              </p>

              {/* Add new image */}
              <div className="w-full rounded-xl overflow-hidden mb-6 relative">
                <Image
                  src="/ethereum-evolution.png"
                  alt="Evolution from Mining to Staking"
                  width={1200}
                  height={675}
                  className="w-full object-cover"
                />
                <div className="text-xs text-gray-500 text-center mt-2">
                  The evolution of blockchain consensus mechanisms from Proof of Work to Proof of Stake
                </div>
              </div>
            </section>

            {/* Fundamentals of Consensus */}
            <section id="fundamentals" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Fundamentals of Consensus Mechanisms
              </motion.h2>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center">
                      <div className="flex flex-col items-center text-center p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800">The Byzantine Generals Problem</h3>
                        <div className="text-gray-600 mb-4">
                          How do distributed parties reach agreement without trusting each other?
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          <div className="flex flex-col items-center">
                            <div className="text-gray-800 font-medium mb-2">The Challenge</div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600">
                              Coordinating actions without a central authority
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="text-gray-800 font-medium mb-2">The Solution</div>
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600">
                              Consensus mechanisms that create trust
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    At their core, both mining and staking are solutions to the fundamental challenge of achieving
                    consensus in a decentralized network where participants don&apos;t inherently trust each other. This
                    is often framed as the &quot;Byzantine Generals Problem&quot; in computer science.
                  </p>
                  <p className="text-lg text-gray-800">
                    While both mechanisms aim to solve this problem, they take fundamentally different approaches:
                    mining relies on computational work as proof of trustworthiness, while staking uses economic
                    investment as a guarantee of honest behavior.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Key Concepts in Consensus</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Sybil Resistance</h4>
                  <p className="text-gray-600">
                    Both mechanisms prevent Sybil attacks (where one entity creates multiple identities) but in
                    different ways. Mining makes it computationally expensive to create multiple identities, while
                    staking makes it financially costly.
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Fork Choice Rules</h4>
                  <p className="text-gray-600">
                    These are the rules that determine which chain is the &quot;correct&quot; one when the blockchain
                    splits. In PoW, it&apos;s typically the longest chain with the most cumulative work. In PoS,
                    it&apos;s often the chain with the most stake weight behind it.
                  </p>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Finality</h4>
                  <p className="text-gray-600">
                    This refers to the guarantee that once a transaction is completed, it can never be altered or
                    reversed. PoW offers probabilistic finality (becoming more certain over time), while many PoS
                    systems offer deterministic finality.
                  </p>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Historical Context</h4>
                </div>
                <p className="text-gray-600">
                  Proof of Work was introduced by Bitcoin in 2009 as the first solution to the Byzantine Generals
                  Problem in a fully decentralized digital currency. Proof of Stake was proposed in 2011 as an
                  energy-efficient alternative and has been implemented in various forms since then, with
                  Ethereum&apos;s transition in 2022 being one of the most significant adoptions.
                </p>
              </div>
            </section>

            {/* How Mining and Staking Work */}
            <section id="how-they-work" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                How Mining and Staking Work
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                To understand the differences between mining and staking, it&apos;s essential to grasp how each process
                works at a fundamental level. Let&apos;s explore the mechanics of both consensus mechanisms:
              </p>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Proof of Work (Mining)</h3>

              <AnimatedMiningProcess />

              <div className="mt-8 mb-8 bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">The Mining Process Explained</h4>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      1
                    </div>
                    <div>
                      <strong className="text-gray-800">Transaction collection:</strong>{" "}
                      <span className="text-gray-600">
                        Miners gather pending transactions from the network&apos;s mempool into a candidate block.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      2
                    </div>
                    <div>
                      <strong className="text-gray-800">Cryptographic puzzle:</strong>{" "}
                      <span className="text-gray-600">
                        Miners compete to find a value (nonce) that, when combined with the block data and hashed,
                        produces a result below a specific target (the difficulty).
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      3
                    </div>
                    <div>
                      <strong className="text-gray-800">Solution broadcasting:</strong>{" "}
                      <span className="text-gray-600">
                        When a miner finds a valid solution, they broadcast the block to the network for verification.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      4
                    </div>
                    <div>
                      <strong className="text-gray-800">Verification and consensus:</strong>{" "}
                      <span className="text-gray-600">
                        Other nodes verify the solution and add the block to their copy of the blockchain if valid.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      5
                    </div>
                    <div>
                      <strong className="text-gray-800">Reward distribution:</strong>{" "}
                      <span className="text-gray-600">
                        The successful miner receives newly minted cryptocurrency and transaction fees as a reward.
                      </span>
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Proof of Stake (Staking)</h3>

              <AnimatedStakingProcess />

              <div className="mt-8 mb-8 bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">The Staking Process Explained</h4>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      1
                    </div>
                    <div>
                      <strong className="text-gray-800">Stake deposit:</strong>{" "}
                      <span className="text-gray-600">
                        Participants lock up a certain amount of cryptocurrency as stake to become validators.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      2
                    </div>
                    <div>
                      <strong className="text-gray-800">Validator selection:</strong>{" "}
                      <span className="text-gray-600">
                        The protocol selects validators to create new blocks, with selection probability proportional to
                        their stake.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      3
                    </div>
                    <div>
                      <strong className="text-gray-800">Block proposal:</strong>{" "}
                      <span className="text-gray-600">
                        Selected validators create and propose new blocks containing transactions.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      4
                    </div>
                    <div>
                      <strong className="text-gray-800">Attestation and validation:</strong>{" "}
                      <span className="text-gray-600">
                        Other validators attest to the validity of proposed blocks, forming consensus.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-gray-100 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 text-gray-800">
                      5
                    </div>
                    <div>
                      <strong className="text-gray-800">Reward distribution:</strong>{" "}
                      <span className="text-gray-600">
                        Validators earn rewards for successful block proposals and attestations, proportional to their
                        stake.
                      </span>
                    </div>
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Key Operational Differences</h3>

              <div className="mb-8">
                <MiningVsStakingComparison />
              </div>
            </section>

            {/* Energy Consumption Comparison */}
            <section id="energy-comparison" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Energy Consumption Comparison
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                One of the most significant differences between mining and staking is their energy consumption. This
                aspect has become increasingly important as concerns about the environmental impact of blockchain
                technology have grown.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/ethereum-staking-environmental-impact.png"
                      alt="Energy Consumption Comparison"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">The Energy Gap</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Proof of Work:</strong> Bitcoin&apos;s PoW network consumes approximately 110-170 TWh
                        per year, comparable to the energy usage of countries like Argentina or Norway.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Proof of Stake:</strong> Ethereum&apos;s PoS network consumes approximately 0.01 TWh per
                        year—a reduction of over 99.95% compared to its previous PoW implementation.
                      </div>
                    </li>
                  </ul>
                  <p className="text-lg mt-4 text-gray-800">
                    This dramatic difference in energy consumption is one of the primary reasons many blockchain
                    projects are moving toward Proof of Stake or other energy-efficient consensus mechanisms.
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <EnergyConsumptionCalculator />
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Leaf className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Environmental Implications</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  The environmental impact of consensus mechanisms extends beyond just energy consumption:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Carbon footprint:</strong> PoW networks can have significant carbon footprints, depending
                      on the energy sources used for mining.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>E-waste:</strong> Mining hardware becomes obsolete quickly, contributing to electronic
                      waste.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Renewable energy usage:</strong> Some mining operations are increasingly powered by
                      renewable energy, which can mitigate environmental concerns.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Security Models */}
            <section id="security-models" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Security Models: How Mining and Staking Protect Networks
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Both mining and staking provide security for blockchain networks, but they do so through fundamentally
                different mechanisms. Understanding these security models is crucial for evaluating the robustness of
                different blockchain networks.
              </p>

              <SecurityModelsComparison />

              <h3 className="text-xl font-bold mb-4 mt-8 text-gray-800">Attack Costs and Game Theory</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Proof of Work Attack Economics</h4>
                  <p className="text-gray-600 mb-4">
                    In PoW, the cost of attacking the network is tied to the hardware and energy required to control 51%
                    of the network&apos;s hash power:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>High upfront capital expenditure for mining equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Ongoing operational costs (electricity, cooling, maintenance)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Hardware can be repurposed or sold after an attack</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Proof of Stake Attack Economics</h4>
                  <p className="text-gray-600 mb-4">
                    In PoS, the cost of attacking the network is tied to the value of the cryptocurrency itself:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Need to acquire a large amount of the cryptocurrency (often 51% or more)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Risk of slashing (losing stake) if malicious behavior is detected</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>
                        Attack would likely devalue the cryptocurrency, reducing the value of the attacker&apos;s stake
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Lock className="h-6 w-6 text-gray-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Security Trade-offs</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Neither security model is objectively superior—each has strengths and weaknesses:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">PoW Strengths</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Proven security model with over a decade of success (Bitcoin)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Physical resource requirements create a tangible security barrier</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>No reliance on the value of the cryptocurrency itself for security</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">PoS Strengths</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Direct economic penalties for malicious behavior (slashing)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Self-reinforcing security as network value increases</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Potential for stronger social recovery mechanisms after attacks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Economic Implications */}
            <section id="economic-implications" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Economic Implications of Mining vs Staking
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                The choice between mining and staking has profound economic implications for both individual
                participants and the broader cryptocurrency ecosystem. These economic differences influence everything
                from token distribution to market dynamics.
              </p>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Issuance and Inflation</h3>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/ethereum-staking-rewards-chart.png"
                      alt="Token Issuance Models"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <p className="text-lg mb-4 text-gray-800">
                    Mining and staking typically employ different approaches to token issuance and inflation:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Proof of Work:</strong> Often features high initial issuance that decreases over time
                        (e.g., Bitcoin&apos;s halving events), creating a disinflationary or deflationary model.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Proof of Stake:</strong> Typically has lower, more consistent issuance rates tied to the
                        percentage of tokens staked, often resulting in lower inflation.
                      </div>
                    </li>
                  </ul>
                  <p className="text-lg mt-4 text-gray-800">
                    For example, Ethereum&apos;s transition from PoW to PoS reduced its issuance rate from approximately
                    4.5% to 0.5-1% annually.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Reward Distribution and Participation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Mining Economics</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Winner-takes-all rewards:</strong> Only the miner who solves the block receives rewards,
                        creating a competitive environment.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Mining pools:</strong> Smaller miners often join pools to receive more consistent but
                        smaller rewards, reducing individual variance.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Geographic concentration:</strong> Mining tends to concentrate in regions with cheap
                        electricity and favorable regulations.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Capital depreciation:</strong> Mining equipment becomes obsolete over time, requiring
                        ongoing reinvestment.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Staking Economics</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Proportional rewards:</strong> Validators receive rewards proportional to their stake,
                        creating a more predictable return on investment.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Staking pools and delegation:</strong> Smaller holders can participate through pools or
                        delegation, democratizing access to rewards.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Capital preservation:</strong> Staked assets maintain their value and can be withdrawn,
                        unlike depreciating mining hardware.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Opportunity cost:</strong> Staked assets are often locked up and cannot be used for
                        other purposes (though liquid staking solutions are changing this).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Market Dynamics</h3>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-gray-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Impact on Token Value and Liquidity</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">Mining Effects</h5>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>
                          Miners often need to sell a portion of rewards to cover operational costs, creating consistent
                          selling pressure
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Mining difficulty adjustments can create market cycles as profitability changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>No direct mechanism for reducing circulating supply</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">Staking Effects</h5>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>
                          Staking locks up tokens, reducing circulating supply and potentially increasing scarcity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>
                          Lower operational costs mean less need to sell rewards, potentially reducing selling pressure
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>
                          Staking yields can compete with DeFi and traditional finance yields, affecting capital flows
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Centralization Concerns */}
            <section id="centralization" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Centralization Concerns in Mining and Staking
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Both mining and staking face centralization pressures, though they manifest in different ways. These
                centralization tendencies can potentially undermine the decentralized nature of blockchain networks.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/ethereum-validator-network.png"
                      alt="Centralization Concerns"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Mining Centralization</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>ASIC dominance:</strong> Specialized mining hardware (ASICs) has led to centralization
                        in hardware manufacturing, with a few companies controlling the market.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Mining pools:</strong> Hash power often concentrates in a few large mining pools,
                        potentially giving them outsized influence over the network.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Geographic concentration:</strong> Mining operations tend to cluster in regions with
                        cheap electricity, creating geographic centralization.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Staking Centralization</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Wealth concentration:</strong> Those with more tokens can stake more and earn more
                        rewards, potentially leading to a "rich get richer" dynamic.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Staking services:</strong> Many users delegate their stake to third-party services,
                        which can lead to concentration of validation power.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Exchange staking:</strong> Cryptocurrency exchanges often offer staking services,
                        potentially controlling large portions of staked tokens.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/ethereum-client-diversity.png"
                      alt="Staking Centralization"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Mitigating Centralization</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Various approaches are being developed to address centralization concerns in both systems:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">For Mining</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>ASIC-resistant algorithms to enable more democratic participation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Decentralized mining pools with more transparent governance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Renewable energy mining to reduce geographic concentration</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">For Staking</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Distributed validator technology to split validation responsibilities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Client diversity to prevent concentration in software implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Decentralized staking pools with governance rights for participants</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Real-World Examples */}
            <section id="real-world" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Real-World Examples: Mining and Staking in Practice
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                Examining how mining and staking operate in major blockchain networks provides valuable insights into
                their practical differences and real-world performance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Prominent PoW Networks</h3>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="font-semibold mb-2 text-gray-800">Bitcoin</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>The original and largest PoW blockchain</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Uses SHA-256 hashing algorithm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Mining is dominated by ASIC hardware and large mining pools</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Block rewards halve approximately every four years</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="font-semibold mb-2 text-gray-800">Litecoin</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>
                          Uses Scrypt algorithm, initially designed to be more accessible to consumer hardware
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Faster block times (2.5 minutes vs. Bitcoin&apos;s 10 minutes)</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Monero</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Uses RandomX algorithm designed to be ASIC-resistant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Focuses on CPU mining to promote decentralization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Regular algorithm changes to prevent ASIC development</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Prominent PoS Networks</h3>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="font-semibold mb-2 text-gray-800">Ethereum (post-Merge)</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Transitioned from PoW to PoS in September 2022 (&quot;The Merge&quot;)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Requires 32 ETH to run a validator</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Implements slashing penalties for malicious behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Has a growing ecosystem of liquid staking providers</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h4 className="font-semibold mb-2 text-gray-800">Cardano</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Uses Ouroboros PoS protocol</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Delegation-based system with no minimum staking requirement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>No slashing; instead uses reputation systems</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-gray-800">Solana</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Combines PoS with Proof of History for high throughput</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Higher hardware requirements for validators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Delegation model with approximately 1,000 active validators</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Case Study: Ethereum&apos;s Transition</h3>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">The Merge: From PoW to PoS</h4>
                <p className="text-gray-600 mb-4">
                  Ethereum&apos;s transition from Proof of Work to Proof of Stake in September 2022 provides a unique
                  case study of both consensus mechanisms operating on the same blockchain at different times.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">Pre-Merge (PoW)</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Energy consumption: ~112 TWh/year</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Issuance rate: ~4.5% annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Block time: Variable (~13 seconds average)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Finality: Probabilistic (several minutes)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-gray-800">Post-Merge (PoS)</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Energy consumption: ~0.01 TWh/year (99.95% reduction)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Issuance rate: ~0.5-1% annually</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Block time: Consistent (12 seconds)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Finality: Deterministic (~15 minutes)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-gray-600">
                  This transition demonstrated both the technical feasibility of switching consensus mechanisms and the
                  significant improvements in energy efficiency and economic parameters that can result from such a
                  change.
                </p>
              </div>
            </section>

            {/* Future of Consensus Mechanisms */}
            <section id="future" className="mb-12 sm:mb-16">
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-6 text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Future of Consensus Mechanisms
              </motion.h2>

              <p className="text-lg mb-6 text-gray-800">
                The debate between mining and staking continues to evolve, with innovations emerging in both approaches
                and new hybrid models being developed. Understanding these trends is essential for anticipating the
                future direction of blockchain technology.
              </p>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="md:w-1/2 bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src="/ethereum-future-roadmap.png"
                      alt="Future of Consensus Mechanisms"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Evolving Trends</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Sustainability focus:</strong> Growing environmental concerns are driving interest in
                        energy-efficient consensus mechanisms, favoring PoS and other alternatives to PoW.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Scalability solutions:</strong> Both PoW and PoS are exploring layer-2 scaling solutions
                        to address throughput limitations.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <div>
                        <strong>Regulatory scrutiny:</strong> Increasing regulatory attention to cryptocurrency energy
                        usage may influence the adoption of different consensus mechanisms.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800">Innovations and Hybrid Approaches</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">PoW Innovations</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Green mining initiatives using renewable energy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Mining algorithms that serve useful computational purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>More efficient ASIC designs with lower energy requirements</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">PoS Innovations</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Liquid staking derivatives for capital efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Distributed validator technology for improved decentralization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Single-slot finality for faster transaction confirmation</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white shadow-md border border-gray-200 p-5 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2 text-gray-800">Hybrid and Alternative Models</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Proof of Authority for permissioned networks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Delegated Proof of Stake for higher throughput</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Proof of History for time synchronization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-500 font-bold">•</span>
                      <span>Proof of Space and Time using storage resources</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">The Coexistence Question</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  A key question for the future is whether PoW and PoS will continue to coexist or if one will
                  eventually dominate:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Specialization scenario:</strong> PoW and PoS could specialize for different use cases,
                      with PoW focusing on high-value store of value applications and PoS on smart contract platforms
                      and applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Convergence scenario:</strong> Hybrid models might emerge that combine elements of both
                      approaches to leverage their respective strengths.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <strong>Replacement scenario:</strong> Environmental and economic pressures could lead to a
                      broader shift away from PoW toward PoS and other energy-efficient alternatives.
                    </span>
                  </li>
                </ul>
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
                Conclusion: The Significance of Consensus Mechanisms
              </motion.h2>

              <p className="text-lg mb-4 text-gray-800">
                The choice between mining and staking represents more than just a technical decision—it reflects
                fundamental values and priorities within blockchain ecosystems. Each approach offers distinct advantages
                and trade-offs that make them suitable for different use cases and contexts.
              </p>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Key Takeaways</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-800">Proof of Work</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Proven security model with over a decade of successful implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>High energy consumption but potential for renewable energy integration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Hardware-based security that doesn&apos;t depend on token value</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Higher barriers to entry but potentially more decentralized validation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-800">Proof of Stake</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Energy-efficient with minimal environmental impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Economic security model with direct penalties for malicious behavior</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>More accessible participation through pooling and delegation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gray-500 font-bold">•</span>
                        <span>Evolving ecosystem with innovations like liquid staking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-lg mb-6 text-gray-800">
                As blockchain technology continues to mature, the debate between mining and staking will likely evolve
                as well. What remains clear is that both approaches have contributed significantly to the advancement of
                decentralized systems, and both will continue to play important roles in the blockchain ecosystem.
              </p>

              <p className="text-lg mb-6 text-gray-800">
                Whether you&apos;re a developer choosing a consensus mechanism for a new project, an investor evaluating
                different blockchain networks, or simply a blockchain enthusiast seeking to understand the technology
                better, appreciating the nuances of mining and staking is essential for navigating the complex and
                rapidly evolving world of blockchain technology.
              </p>

              <div className="bg-white shadow-md border border-gray-200 p-6 rounded-lg mb-8">
                <div className="flex items-center mb-4">
                  <Info className="h-6 w-6 text-amber-600 mr-3 flex-shrink-0" />
                  <h4 className="text-lg font-semibold text-gray-800">Further Learning</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  To deepen your understanding of consensus mechanisms and their implications, consider exploring these
                  related topics:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <Link href="/articles/what-is-ethereum-staking" className="text-gray-600 hover:text-gray-900">
                        What is Ethereum Staking?
                      </Link>{" "}
                      - A comprehensive guide to staking on the Ethereum network
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <Link
                        href="/articles/eth-staking-environmental-impact"
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Environmental Impact of Ethereum Staking
                      </Link>{" "}
                      - An in-depth look at the environmental benefits of Proof of Stake
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span>
                      <Link href="/articles/future-of-ethereum-staking" className="text-gray-600 hover:text-gray-900">
                        Future of Ethereum Staking
                      </Link>{" "}
                      - Exploring upcoming developments in the Ethereum staking ecosystem
                    </span>
                  </li>
                </ul>
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
