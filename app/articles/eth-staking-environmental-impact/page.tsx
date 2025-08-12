import { StakingCalculator } from "@/components/staking-calculator"
import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const RelatedArticles = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Explore More</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/ethereum-staking-rewards-over-time.png"
              alt="Ethereum Staking Rewards"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">How Ethereum Staking Rewards Work</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Dive into the mechanics of Ethereum staking rewards and strategies to maximize returns
            </p>
            <Link
              href="/articles/eth-staking-rewards"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ArrowLeft className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image src="/ethereum-staking-risks.png" alt="Ethereum Staking Risks" fill className="object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">The Comprehensive Guide to Ethereum Staking Risks</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Understand the potential risks and mitigation strategies for Ethereum staking
            </p>
            <Link
              href="/articles/eth-staking-risks"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ArrowLeft className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden flex flex-col">
          <div className="h-40 relative">
            <Image
              src="/ethereum-staking-evolution.png"
              alt="Future of Ethereum Staking"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h4 className="font-semibold mb-2 text-gray-800">Future of Ethereum Staking</h4>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              Exploring upcoming developments in the Ethereum staking ecosystem
            </p>
            <Link
              href="/articles/future-of-ethereum-staking"
              className="text-gray-600 text-sm hover:text-gray-900 flex items-center"
            >
              Read More <ArrowLeft className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArticlePage() {
  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <Button className="mb-8">
          <Link href="/articles" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">The Environmental Impact of ETH Staking</h1>
        <StakingCalculator />
        <RelatedArticles />
      </div>
    </div>
  )
}
