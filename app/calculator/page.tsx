"use client"

import { StakingCalculator } from "@/components/staking-calculator"
import { ParticlesBackground } from "@/components/particles-background"
import { MiniCalculator } from "@/components/mini-calculator"
// import { Button } from "@/components/ui/button"
// import { Download } from 'lucide-react'

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 neon-text">ETH Staking Calculator</h1>
        <p className="text-lg text-muted-foreground">Stake smart, anywhere. Calculate your ETH rewards on the go!</p>
        {/* <Button
          className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={() => window.location.reload()}
        >
          <Download className="mr-2 h-4 w-4" /> Install as App
        </Button> */}
      </div>

      <div className="max-w-md mx-auto mb-12 hidden md:block">
        <MiniCalculator />
      </div>

      <div className="max-w-5xl mx-auto">
        <StakingCalculator />
      </div>
    </div>
  )
}
