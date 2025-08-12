import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Shield, Wrench, Zap } from "lucide-react"

export default function ArticlePage() {
  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Solo Staking Complete Guide</h1>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-blue-500" />
                Solo Staking Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Solo staking involves running your own Ethereum validator with 32 ETH. This comprehensive guide covers
                everything you need to know about setting up and maintaining your own validator.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-green-500" />
                Hardware Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Minimum 16GB RAM (32GB recommended)</li>
                <li>2TB+ SSD storage space</li>
                <li>Reliable internet connection (10+ Mbps)</li>
                <li>Dedicated hardware or VPS</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Security Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Secure key generation and storage</li>
                <li>Regular security updates</li>
                <li>Firewall configuration</li>
                <li>Backup and recovery procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Setup Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Choose and install client software</li>
                <li>Generate validator keys</li>
                <li>Make the 32 ETH deposit</li>
                <li>Configure and start your validator</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <RelatedArticles
          articles={[
            {
              title: "Validator Performance Optimization",
              description: "Advanced techniques to maximize your validator's performance",
              href: "/articles/eth2-validator-performance-optimization",
              readTime: "14 min read",
            },
            {
              title: "Staking Security Best Practices",
              description: "Essential security measures for solo stakers",
              href: "/articles/staking-security-best-practices",
              readTime: "10 min read",
            },
            {
              title: "Multi-Client Diversity",
              description: "Why client diversity matters for the network",
              href: "/articles/multi-client-diversity-importance",
              readTime: "13 min read",
            },
            {
              title: "Staking vs Pooled Options",
              description: "Comparing solo staking with other staking methods",
              href: "/articles/staking-with-less-than-32-eth",
              readTime: "9 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
