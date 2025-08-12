import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

export default function ArticlesPage() {
  const featuredArticles = [
    {
      title: "What is Ethereum Staking?",
      description: "Learn the fundamentals of Ethereum staking and how it works",
      href: "/articles/what-is-ethereum-staking",
      readTime: "8 min read",
      category: "Basics",
    },
    {
      title: "Ethereum Staking for Beginners",
      description: "Complete beginner's guide to getting started with ETH staking",
      href: "/articles/ethereum-staking-for-beginners",
      readTime: "12 min read",
      category: "Beginner",
    },
    {
      title: "Best ETH Staking Platforms 2024",
      description: "Compare the top Ethereum staking platforms and their features",
      href: "/articles/best-eth-staking-platforms",
      readTime: "15 min read",
      category: "Platforms",
    },
    {
      title: "Liquid Staking Derivatives Explained",
      description: "Understanding LSDs and how they're revolutionizing Ethereum staking",
      href: "/articles/liquid-staking-derivatives-explained",
      readTime: "18 min read",
      category: "Advanced",
    },
    {
      title: "Staking Security Best Practices",
      description: "Essential security measures for safe Ethereum staking",
      href: "/articles/staking-security-best-practices",
      readTime: "10 min read",
      category: "Security",
    },
    {
      title: "ETH Staking Rewards Calculator",
      description: "Calculate your potential Ethereum staking rewards and APY",
      href: "/articles/staking-rewards-calculator",
      readTime: "5 min read",
      category: "Tools",
    },
  ]

  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Ethereum Staking Articles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive guides and resources to help you master Ethereum staking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredArticles.map((article, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <Link
                  href={article.href}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <RelatedArticles
          articles={[
            {
              title: "Future of Ethereum Staking",
              description: "Exploring upcoming developments in the Ethereum staking ecosystem",
              href: "/articles/future-of-ethereum-staking",
              readTime: "16 min read",
            },
            {
              title: "Tax Implications of ETH Staking",
              description: "Understanding tax considerations for Ethereum staking rewards",
              href: "/articles/tax-implications-of-eth-staking",
              readTime: "12 min read",
            },
            {
              title: "Solo Staking Complete Guide",
              description: "Advanced guide for running your own Ethereum validator",
              href: "/articles/solo-staking-complete-guide",
              readTime: "20 min read",
            },
            {
              title: "Staking vs DeFi Yields",
              description: "Comparing Ethereum staking returns with DeFi opportunities",
              href: "/articles/staking-vs-defi-yields",
              readTime: "11 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
