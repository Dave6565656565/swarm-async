import { Suspense } from "react"
import { StakingDashboard } from "@/components/staking-dashboard"
import { RelatedArticles } from "@/components/related-articles"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Loading skeleton for the dashboard
function DashboardSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-pulse">
      <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<DashboardSkeleton />}>
        <StakingDashboard />
      </Suspense>

      <RelatedArticles
        articles={[
          {
            title: "ETH Staking Rewards Calculator",
            description: "Calculate your potential Ethereum staking rewards and APY",
            href: "/articles/staking-rewards-calculator",
            readTime: "5 min read",
          },
          {
            title: "Staking Security Best Practices",
            description: "Essential security measures for safe Ethereum staking",
            href: "/articles/staking-security-best-practices",
            readTime: "10 min read",
          },
          {
            title: "Tax Implications of ETH Staking",
            description: "Understanding the tax considerations for Ethereum staking rewards",
            href: "/articles/tax-implications-of-eth-staking",
            readTime: "12 min read",
          },
          {
            title: "Validator Performance Optimization",
            description: "Tips to maximize your validator's performance and rewards",
            href: "/articles/eth2-validator-performance-optimization",
            readTime: "14 min read",
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
          <span>Calculate Multi Bets</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
