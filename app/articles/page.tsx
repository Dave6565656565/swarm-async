import { ParticlesBackground } from "@/components/particles-background"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ArticlesPage() {
  const articles = [
    {
      slug: "what-is-ethereum-staking",
      title: "What is Ethereum Staking?",
      excerpt: "Learn about Ethereum staking, how it works, and why it's important for the Ethereum network.",
      date: "2023-05-15",
      readTime: "5 min read",
    },
    {
      slug: "staking-vs-mining",
      title: "Staking vs Mining: What's the Difference?",
      excerpt: "Understand the key differences between Proof of Stake and Proof of Work consensus mechanisms.",
      date: "2023-06-02",
      readTime: "7 min read",
    },
    {
      slug: "eth-staking-rewards",
      title: "How Ethereum Staking Rewards Work",
      excerpt: "Dive deep into how Ethereum staking rewards are calculated and distributed to validators.",
      date: "2023-06-18",
      readTime: "8 min read",
    },
    {
      slug: "staking-risks",
      title: "Understanding the Risks of Ethereum Staking",
      excerpt: "Explore the potential risks and challenges associated with staking Ethereum.",
      date: "2023-07-05",
      readTime: "6 min read",
    },
    {
      slug: "best-eth-staking-platforms",
      title: "Best Ethereum Staking Platforms in 2023",
      excerpt: "Compare the top Ethereum staking platforms and find the best option for your needs.",
      date: "2023-09-05",
      readTime: "10 min read",
    },
    {
      slug: "staking-with-less-than-32-eth",
      title: "How to Stake Ethereum with Less than 32 ETH",
      excerpt: "Discover various ways to participate in Ethereum staking without the full 32 ETH requirement.",
      date: "2024-02-01",
      readTime: "6 min read",
    },
    {
      slug: "staking-rewards-calculator",
      title: "How to Calculate Your Ethereum Staking Rewards",
      excerpt: "Learn how to accurately estimate your potential returns from Ethereum staking.",
      date: "2024-02-15",
      readTime: "7 min read",
    },
    {
      slug: "staking-vs-defi-yields",
      title: "Ethereum Staking vs DeFi Yields",
      excerpt: "Compare the benefits and risks of Ethereum staking versus DeFi yield strategies.",
      date: "2023-12-08",
      readTime: "8 min read",
    },
    {
      slug: "future-of-ethereum-staking",
      title: "The Future of Ethereum Staking",
      excerpt: "Explore upcoming developments and trends in the Ethereum staking ecosystem.",
      date: "2024-04-10",
      readTime: "10 min read",
    },
    // New articles
    {
      slug: "tax-implications-of-eth-staking",
      title: "Tax Implications of Ethereum Staking: A Complete Guide",
      excerpt: "Navigate the complex tax landscape of staking rewards and understand your obligations as a staker.",
      date: "2024-04-15",
      readTime: "12 min read",
    },
    {
      slug: "liquid-staking-derivatives-explained",
      title: "Liquid Staking Derivatives Explained: LSDs and Their Impact",
      excerpt:
        "Understand how liquid staking derivatives work and why they're revolutionizing the Ethereum staking ecosystem.",
      date: "2024-04-18",
      readTime: "11 min read",
    },
    {
      slug: "solo-staking-complete-guide",
      title: "Solo Staking Ethereum: The Complete Technical Guide",
      excerpt: "A step-by-step technical guide to setting up and maintaining your own Ethereum validator node.",
      date: "2024-04-22",
      readTime: "15 min read",
    },
    {
      slug: "staking-security-best-practices",
      title: "Ethereum Staking Security: Best Practices to Protect Your Investment",
      excerpt: "Learn essential security measures to safeguard your staked ETH and validator keys from threats.",
      date: "2024-04-25",
      readTime: "9 min read",
    },
    {
      slug: "eth-staking-for-institutions",
      title: "Institutional Ethereum Staking: Strategies for Organizations",
      excerpt:
        "Discover how institutions can implement Ethereum staking as part of their treasury or investment strategy.",
      date: "2024-04-28",
      readTime: "13 min read",
    },
    {
      slug: "eth2-validator-performance-optimization",
      title: "Optimizing Ethereum Validator Performance: Advanced Techniques",
      excerpt: "Learn advanced strategies to maximize your validator's performance and rewards while minimizing risks.",
      date: "2024-05-01",
      readTime: "14 min read",
    },
    {
      slug: "staking-pools-comparison",
      title: "Ethereum Staking Pools: Comprehensive Comparison and Analysis",
      excerpt: "An in-depth analysis of different staking pool models, their pros, cons, and performance metrics.",
      date: "2024-05-05",
      readTime: "12 min read",
    },
    {
      slug: "eth-staking-regulatory-landscape",
      title: "The Regulatory Landscape of Ethereum Staking Worldwide",
      excerpt: "Navigate the evolving regulatory environment for staking across different jurisdictions globally.",
      date: "2024-05-08",
      readTime: "11 min read",
    },
    {
      slug: "multi-client-diversity-importance",
      title: "Client Diversity in Ethereum Staking: Why It Matters",
      excerpt:
        "Understand why running different Ethereum clients is crucial for network health and your staking security.",
      date: "2024-05-12",
      readTime: "10 min read",
    },
    {
      slug: "eth-staking-environmental-impact",
      title: "Environmental Impact of Ethereum Staking vs Traditional Finance",
      excerpt:
        "Analyze how Ethereum's Proof of Stake compares to traditional financial systems in terms of sustainability.",
      date: "2024-05-15",
      readTime: "9 min read",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 neon-text">Articles & Resources</h1>
        <p className="text-muted-foreground mb-8">Learn about Ethereum staking, strategies, and best practices</p>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
              <Card className="glassmorphism border-none hover:bg-white/5 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
