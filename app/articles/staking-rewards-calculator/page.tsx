import { StakingCalculator } from "@/components/staking-calculator"
import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"

export default function ArticlePage() {
  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">ETH Staking Rewards Calculator</h1>
        <StakingCalculator />

        <RelatedArticles
          articles={[
            {
              title: "Maximize Your Staking Rewards",
              description: "Discover strategies to optimize your ETH staking returns.",
              href: "/articles/eth-staking-rewards",
              readTime: "13 min read",
            },
            {
              title: "Understand the Risks",
              description: "Learn about the potential risks and challenges associated with staking Ethereum.",
              href: "/articles/staking-risks",
              readTime: "11 min read",
            },
            {
              title: "Explore Staking Platforms",
              description: "Compare the top Ethereum staking platforms.",
              href: "/articles/best-eth-staking-platforms",
              readTime: "15 min read",
            },
            {
              title: "Tax Implications",
              description: "Understanding tax considerations for staking rewards.",
              href: "/articles/tax-implications-of-eth-staking",
              readTime: "12 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
