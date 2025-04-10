import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PartnersSection } from "@/components/partners-section"
import { AirdropSection } from "@/components/airdrop-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ContractSection } from "@/components/contract-section"

export default function HomePage() {
  return (
    <div className="relative bg-white">
      <HeroSection />
      <FeaturesSection />
      <ContractSection />
      <AirdropSection />
      <PartnersSection />
      <NewsletterSection />
    </div>
  )
}
