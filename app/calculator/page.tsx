import { StakingCalculator } from "@/components/staking-calculator"
import { ParticlesBackground } from "@/components/particles-background"

export default function CalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Crypto Yield & Staking Calculator</h1>

      <div className="max-w-5xl mx-auto">
        <StakingCalculator />
      </div>
    </div>
  )
}
