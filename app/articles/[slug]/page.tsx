import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const articles = {
  "what-is-ethereum-staking": {
    title: "What is Ethereum Staking?",
    date: "2023-05-15",
    readTime: "5 min read",
    content: `
      <h2>Introduction to Ethereum Staking</h2>
      <p>Ethereum staking is the process of actively participating in transaction validation on the Ethereum blockchain, similar to mining but with a different consensus mechanism. When you stake your ETH, you're essentially depositing it as collateral for the chance to validate blocks and earn rewards.</p>
      
      <h2>How Ethereum Staking Works</h2>
      <p>Staking on Ethereum works through a consensus mechanism called Proof of Stake (PoS). In this system, validators are selected to create new blocks based on the amount of ETH they have staked and the length of time they've staked it.</p>
      
      <p>When a validator is chosen to create a new block, they verify the transactions within it and add it to the blockchain. For their service, they receive rewards in the form of additional ETH.</p>
      
      <h2>Why Stake Ethereum?</h2>
      <p>There are several reasons why someone might choose to stake their Ethereum:</p>
      
      <ul>
        <li>Earn passive income through staking rewards</li>
        <li>Support the Ethereum network and help secure it</li>
        <li>Participate in network governance</li>
        <li>Potentially benefit from ETH price appreciation</li>
      </ul>
      
      <h2>Types of Ethereum Staking</h2>
      <p>There are several ways to stake Ethereum:</p>
      
      <ol>
        <li><strong>Solo Staking:</strong> Running your own validator node with 32 ETH</li>
        <li><strong>Pooled Staking:</strong> Joining a staking pool with less than 32 ETH</li>
        <li><strong>Liquid Staking:</strong> Using a service that provides a token representing your staked ETH</li>
        <li><strong>Centralized Exchange Staking:</strong> Staking through an exchange like Coinbase or Binance</li>
      </ol>
      
      <h2>Risks of Ethereum Staking</h2>
      <p>While staking can be profitable, it's not without risks:</p>
      
      <ul>
        <li>Validator penalties for being offline or misbehaving</li>
        <li>Smart contract risks with pooled or liquid staking</li>
        <li>Potential for slashing in case of validator misbehavior</li>
        <li>Market volatility affecting the value of staked ETH</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Ethereum staking represents a significant shift in how the network operates and offers ETH holders a way to earn passive income while supporting the network. As Ethereum continues to evolve, staking will play an increasingly important role in its ecosystem.</p>
    `,
  },
  "staking-vs-mining": {
    title: "Staking vs Mining: What's the Difference?",
    date: "2023-06-02",
    readTime: "7 min read",
    content: `
      <h2>Introduction</h2>
      <p>In the world of cryptocurrencies, two primary methods are used to validate transactions and secure networks: mining and staking. Both approaches serve the same fundamental purpose but operate in vastly different ways.</p>
      
      <h2>What is Mining?</h2>
      <p>Mining is the process used in Proof of Work (PoW) blockchains like Bitcoin. Miners use computational power to solve complex mathematical puzzles, competing to validate blocks of transactions. The first miner to solve the puzzle gets to add the block to the blockchain and receives a reward.</p>
      
      <h2>What is Staking?</h2>
      <p>Staking is the process used in Proof of Stake (PoS) blockchains like Ethereum 2.0. Instead of using computational power, validators lock up (stake) a certain amount of cryptocurrency as collateral. Validators are then selected to create new blocks based on factors like the size of their stake and how long they've been staking.</p>
      
      <h2>Key Differences</h2>
      
      <h3>Energy Consumption</h3>
      <p>Mining requires significant computational power and electricity, making it energy-intensive and environmentally controversial. Staking, on the other hand, requires minimal energy as it doesn't involve solving complex puzzles.</p>
      
      <h3>Hardware Requirements</h3>
      <p>Mining often requires specialized hardware like ASICs or high-end GPUs, which can be expensive. Staking can be done with a standard computer or even through a third-party service, making it more accessible.</p>
      
      <h3>Entry Barriers</h3>
      <p>Mining has high entry barriers due to hardware costs and electricity requirements. Staking often has lower entry barriers, although some networks (like Ethereum) require a minimum stake amount.</p>
      
      <h3>Rewards and Risks</h3>
      <p>Mining rewards are competitive and can vary widely based on network difficulty. Staking rewards are more predictable but come with risks like slashing (losing part of your stake) if you violate network rules.</p>
      
      <h2>Which is Better?</h2>
      <p>There's no definitive answer to which method is better. It depends on various factors including your resources, technical knowledge, and risk tolerance. Mining might be suitable for those with access to cheap electricity and technical expertise, while staking might be better for those looking for a more passive approach with lower energy costs.</p>
      
      <h2>Conclusion</h2>
      <p>Both mining and staking play crucial roles in the cryptocurrency ecosystem. As the industry evolves, we're seeing a trend toward PoS mechanisms due to their energy efficiency and scalability. However, PoW networks like Bitcoin continue to thrive, demonstrating that both approaches have their place in the blockchain world.</p>
    `,
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Button asChild>
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <div className="max-w-3xl mx-auto">
        <Button variant="outline" asChild className="mb-6 glassmorphism border-none">
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-text">{article.title}</h1>

        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>{article.date}</span>
          <span className="mx-2">•</span>
          <span>{article.readTime}</span>
        </div>

        <div
          className="prose prose-invert max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2 prose-li:ml-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  )
}
