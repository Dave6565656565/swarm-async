import { PortfolioTracker } from "@/components/portfolio-tracker"
import { RelatedArticles } from "@/components/related-articles"
import { ParticlesBackground } from "@/components/particles-background"

export default function PortfolioPage() {
  return (
    <div className="min-h-screen relative">
      <ParticlesBackground />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 neon-text">Portfolio Tracker</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your cryptocurrency portfolio and staking rewards in real-time
          </p>
        </div>

        <PortfolioTracker />

        <RelatedArticles
          articles={[
            {
              title: "Portfolio Diversification Strategies",
              description: "Learn how to build a balanced crypto and staking portfolio",
              href: "/articles/crypto-portfolio-diversification",
              readTime: "14 min read",
            },
            {
              title: "Tax Optimization for Crypto",
              description: "Strategies to minimize taxes on your cryptocurrency gains",
              href: "/articles/ethereum-staking-tax-optimization",
              readTime: "16 min read",
            },
            {
              title: "Risk Management in Staking",
              description: "How to manage risks while maximizing staking rewards",
              href: "/articles/staking-risk-management",
              readTime: "12 min read",
            },
            {
              title: "DeFi vs Staking Returns",
              description: "Compare different yield strategies for your portfolio",
              href: "/articles/staking-vs-defi-yields",
              readTime: "11 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
