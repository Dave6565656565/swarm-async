import { ParticlesBackground } from "@/components/particles-background"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ArticlePage() {
  const article = {
    title: "How Ethereum Staking Rewards Work",
    date: "2023-06-18",
    readTime: "8 min read",
    content: `
      <h2>Understanding Ethereum Staking Rewards</h2>
      <p>Ethereum staking rewards are the incentives given to validators for participating in the network's consensus mechanism. These rewards are designed to compensate validators for their services in securing the network and processing transactions.</p>
      
      <h2>How Rewards Are Calculated</h2>
      <p>Ethereum staking rewards are calculated based on several factors:</p>
      
      <ul>
        <li><strong>Base Reward Rate:</strong> The fundamental reward rate determined by the Ethereum protocol.</li>
        <li><strong>Total ETH Staked:</strong> As more ETH is staked, the reward rate decreases to maintain economic equilibrium.</li>
        <li><strong>Validator Performance:</strong> Validators earn rewards for proposing and attesting to blocks correctly.</li>
        <li><strong>Network Participation:</strong> The overall level of participation in the network affects reward distribution.</li>
      </ul>
      
      <p>The base formula for calculating annual rewards is:</p>
      <p>Annual Reward = Base Reward × (1 / √Total ETH Staked)</p>
      
      <h2>Types of Rewards</h2>
      <p>Ethereum validators can earn rewards through several mechanisms:</p>
      
      <ol>
        <li><strong>Attestation Rewards:</strong> Earned for voting on the validity of blocks.</li>
        <li><strong>Block Proposal Rewards:</strong> Earned when selected to propose a new block.</li>
        <li><strong>Sync Committee Rewards:</strong> Earned for participating in sync committees.</li>
        <li><strong>MEV (Maximal Extractable Value):</strong> Additional rewards from transaction ordering.</li>
      </ol>
      
      <h2>Reward Distribution</h2>
      <p>Rewards are distributed to validators on a regular basis, with the exact timing depending on the staking method:</p>
      
      <ul>
        <li><strong>Solo Staking:</strong> Rewards accrue directly to the validator's balance.</li>
        <li><strong>Pooled Staking:</strong> Rewards are distributed according to the pool's rules, typically proportional to each participant's contribution.</li>
        <li><strong>Liquid Staking:</strong> Rewards are reflected in the increasing value of liquid staking tokens or distributed as additional tokens.</li>
      </ul>
      
      <h2>Factors Affecting Reward Rates</h2>
      <p>Several factors can influence the actual rewards earned by validators:</p>
      
      <ul>
        <li><strong>Network Conditions:</strong> Congestion and transaction volume affect fees and MEV opportunities.</li>
        <li><strong>Validator Uptime:</strong> Validators must maintain high uptime to maximize rewards.</li>
        <li><strong>Protocol Changes:</strong> Ethereum upgrades can modify reward mechanisms.</li>
        <li><strong>Market Conditions:</strong> While not directly affecting ETH rewards, market price affects the fiat value of rewards.</li>
      </ul>
      
      <h2>Current Reward Rates</h2>
      <p>As of 2023, Ethereum staking rewards typically range from 3% to 5% annually for most stakers. However, this can vary based on the factors mentioned above. Some specialized staking services or pools may offer higher rates through additional incentives or optimizations.</p>
      
      <h2>Risks and Considerations</h2>
      <p>While staking rewards are attractive, they come with certain risks:</p>
      
      <ul>
        <li><strong>Slashing Risk:</strong> Validators can lose a portion of their stake for misbehavior.</li>
        <li><strong>Opportunity Cost:</strong> Staked ETH is locked up and cannot be used for other purposes.</li>
        <li><strong>Variable Returns:</strong> Actual rewards may differ from expected rates due to network conditions.</li>
        <li><strong>Technical Complexity:</strong> Solo staking requires technical knowledge and reliable infrastructure.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Ethereum staking rewards provide a way for ETH holders to earn passive income while contributing to network security. Understanding how these rewards work can help stakeholders make informed decisions about their participation in the Ethereum ecosystem.</p>
    `,
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
