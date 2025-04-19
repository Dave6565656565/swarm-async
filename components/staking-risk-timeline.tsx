"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Clock, Shield, Server, Cpu, TrendingUp } from "lucide-react"

export function StakingRiskTimeline() {
  const [activeTab, setActiveTab] = useState("short")

  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">Ethereum Staking Risk Timeline</h3>

      <Tabs defaultValue="short" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100">
          <TabsTrigger value="short" className="data-[state=active]:bg-white">
            Short-term (0-6 months)
          </TabsTrigger>
          <TabsTrigger value="medium" className="data-[state=active]:bg-white">
            Medium-term (6-18 months)
          </TabsTrigger>
          <TabsTrigger value="long" className="data-[state=active]:bg-white">
            Long-term (18+ months)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="short" className="space-y-4">
          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-red-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Initial Setup Risks</div>
            <p className="text-gray-600 text-sm">
              The highest risk period is during initial setup. Validator key mismanagement, client misconfiguration, and
              hardware issues can lead to immediate penalties or slashing events.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <Server className="w-3 h-3 text-amber-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Operational Learning Curve</div>
            <p className="text-gray-600 text-sm">
              During the first few months, validators face a learning curve in maintaining uptime, monitoring
              performance, and responding to network changes or client updates.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="w-3 h-3 text-blue-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Reward Variability</div>
            <p className="text-gray-600 text-sm">
              Short-term stakers may experience higher reward variability due to luck in block proposals and network
              participation rates, potentially not matching expected APR calculations.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="medium" className="space-y-4">
          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <Cpu className="w-3 h-3 text-amber-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Protocol Upgrade Risks</div>
            <p className="text-gray-600 text-sm">
              Medium-term stakers will likely experience multiple protocol upgrades. Failing to update validator clients
              in time can lead to penalties or being unable to participate in consensus.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-purple-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Market Volatility Impact</div>
            <p className="text-gray-600 text-sm">
              Over 6-18 months, ETH price volatility becomes a more significant factor in overall returns. Stakers must
              consider opportunity costs against other potential investments.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="w-3 h-3 text-green-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Infrastructure Maintenance</div>
            <p className="text-gray-600 text-sm">
              Hardware degradation, internet reliability issues, and power supply problems become more likely over
              medium timeframes, requiring maintenance and potential hardware upgrades.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="long" className="space-y-4">
          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="w-3 h-3 text-blue-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Regulatory Uncertainty</div>
            <p className="text-gray-600 text-sm">
              Long-term stakers face increasing regulatory risks as governments develop frameworks for cryptocurrency
              staking. Tax implications, reporting requirements, and legal status may change.
            </p>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-gray-200">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-3 h-3 text-red-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Protocol Evolution Risk</div>
            <p className="text-gray-600 text-sm">
              Major protocol changes like sharding, further staking modifications, or even a transition away from
              current PoS mechanisms could impact long-term stakers significantly.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-amber-600" />
            </div>
            <div className="mb-1 text-lg font-medium text-gray-800">Competitive Yield Pressure</div>
            <p className="text-gray-600 text-sm">
              As more validators join the network over time, staking rewards tend to decrease. Long-term stakers must
              evaluate if diminishing returns still justify the operational costs and capital lockup.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
