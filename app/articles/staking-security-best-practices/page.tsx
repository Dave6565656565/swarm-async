import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Key, AlertTriangle } from "lucide-react"

export default function ArticlePage() {
  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Staking Security Best Practices</h1>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                Essential Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Securing your staked ETH is crucial for protecting your investment. Follow these best practices to
                ensure your assets remain safe while earning staking rewards.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                Wallet Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Use hardware wallets for maximum security</li>
                <li>Enable two-factor authentication</li>
                <li>Keep your seed phrase offline and secure</li>
                <li>Regularly update your wallet software</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-500" />
                Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Never share your private keys</li>
                <li>Use secure key generation methods</li>
                <li>Backup your keys in multiple secure locations</li>
                <li>Consider multi-signature setups for large amounts</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Common Risks to Avoid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Phishing attacks and fake websites</li>
                <li>Malicious smart contracts</li>
                <li>Social engineering attempts</li>
                <li>Unsecured network connections</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <RelatedArticles
          articles={[
            {
              title: "Understanding Staking Risks",
              description: "Learn about potential risks and how to mitigate them.",
              href: "/articles/staking-risks",
              readTime: "11 min read",
            },
            {
              title: "Ethereum Staking for Beginners",
              description: "Complete guide to getting started with ETH staking safely.",
              href: "/articles/ethereum-staking-for-beginners",
              readTime: "12 min read",
            },
            {
              title: "Solo Staking Guide",
              description: "Advanced security considerations for solo stakers.",
              href: "/articles/solo-staking-complete-guide",
              readTime: "20 min read",
            },
            {
              title: "Validator Performance",
              description: "Optimize your validator's security and performance.",
              href: "/articles/eth2-validator-performance-optimization",
              readTime: "14 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
