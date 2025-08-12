import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { AirdropForm } from "@/components/airdrop-form"
import { EligibilityCheck } from "@/components/eligibility-check"
import { RelatedArticles } from "@/components/related-articles"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

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

      <RelatedArticles
        articles={[
          {
            title: "What is Ethereum Staking?",
            description: "Learn the basics of Ethereum staking to maximize your airdrop eligibility",
            href: "/articles/what-is-ethereum-staking",
            readTime: "8 min read",
          },
          {
            title: "Ethereum Staking for Beginners",
            description: "Start your staking journey and become eligible for future airdrops",
            href: "/articles/ethereum-staking-for-beginners",
            readTime: "12 min read",
          },
          {
            title: "Best ETH Staking Platforms 2024",
            description: "Choose the right platform to maximize your staking rewards and airdrops",
            href: "/articles/best-eth-staking-platforms",
            readTime: "15 min read",
          },
          {
            title: "Staking with Less Than 32 ETH",
            description: "How to participate in staking and airdrops without a full validator",
            href: "/articles/staking-with-less-than-32-eth",
            readTime: "9 min read",
          },
        ]}
      />

      {/* Parlay Calculator Backlink */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Looking for sports betting tools?</p>
        <Link
          href="https://luxuryfootballelite.com/parlay-calculator/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          <span>Calculate Multi Bets Odds</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
