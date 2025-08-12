import { StakingCalculator } from "@/components/staking-calculator"
import { RelatedArticles } from "@/components/related-articles"
import { ParticlesBackground } from "@/components/particles-background"

export default function CalculatorPage() {
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 neon-text">ETH Staking Calculator</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your potential Ethereum staking rewards and see how much you could earn
          </p>
        </div>

        <StakingCalculator />

        <RelatedArticles
          articles={[
            {
              title: "ETH Staking Rewards Explained",
              description: "Understanding how Ethereum staking rewards are calculated and distributed",
              href: "/articles/eth-staking-rewards",
              readTime: "10 min read",
            },
            {
              title: "Best ETH Staking Platforms",
              description: "Compare platforms to find the best staking yields and features",
              href: "/articles/best-eth-staking-platforms",
              readTime: "15 min read",
            },
            {
              title: "Staking vs DeFi Yields",
              description: "Compare Ethereum staking returns with DeFi yield opportunities",
              href: "/articles/staking-vs-defi-yields",
              readTime: "11 min read",
            },
            {
              title: "Tax Implications of Staking",
              description: "Understand the tax considerations for your staking rewards",
              href: "/articles/tax-implications-of-eth-staking",
              readTime: "12 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
