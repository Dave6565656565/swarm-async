import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { AirdropForm } from "@/components/airdrop-form"
import { EligibilityCheck } from "@/components/eligibility-check"

export default function AirdropPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">StakeETH Token Airdrop</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>Register for Airdrop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg glassmorphism">
              <h3 className="text-lg font-medium mb-2">Airdrop Details</h3>
              <ul className="space-y-2 text-sm">
                <li>• Airdrop starts on JUNE 26</li>
                <li>• 100,000,000 SEP tokens will be distributed</li>
                <li>• Allocation based on staking activity and community participation</li>
                <li>• Pre-registration gives you bonus tokens</li>
              </ul>
            </div>

            <AirdropForm />
          </CardContent>
        </Card>

        <div>
          <EligibilityCheck />
        </div>
      </div>
    </div>
  )
}
