import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { RelatedArticles } from "@/components/related-articles"
import { ParticlesBackground } from "@/components/particles-background"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PartnersSection } from "@/components/partners-section"
import { AirdropSection } from "@/components/airdrop-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContractSection } from "@/components/contract-section"
import { EthBettingSection } from "@/components/eth-betting-section"

export default function HomePage() {
  return (
    <div className="relative bg-white">
      <ParticlesBackground />
      <HeroSection />
      <FeaturesSection />
      <ContractSection />
      <EthBettingSection />
      <AirdropSection />
      <PartnersSection />
      <NewsletterSection />
      <RelatedArticles
        articles={[
          {
            title: "What is Ethereum Staking?",
            description: "Learn the fundamentals of Ethereum staking and how it works",
            href: "/articles/what-is-ethereum-staking",
            readTime: "8 min read",
          },
          {
            title: "Ethereum Staking for Beginners",
            description: "A complete beginner's guide to getting started with ETH staking",
            href: "/articles/ethereum-staking-for-beginners",
            readTime: "12 min read",
          },
          {
            title: "Best ETH Staking Platforms 2024",
            description: "Compare the top Ethereum staking platforms and their features",
            href: "/articles/best-eth-staking-platforms",
            readTime: "15 min read",
          },
          {
            title: "Liquid Staking Derivatives Explained",
            description: "Understanding LSDs and how they're revolutionizing Ethereum staking",
            href: "/articles/liquid-staking-derivatives-explained",
            readTime: "18 min read",
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
          <span>Calculate Parlay Bets</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
