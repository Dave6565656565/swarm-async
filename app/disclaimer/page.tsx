import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { AlertTriangle } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text text-center">Disclaimer</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-invert max-w-none">
            <div>
              <h3 className="text-lg font-semibold mb-3">Investment Risk</h3>
              <p className="text-muted-foreground">
                Cryptocurrency staking involves significant risk. The value of cryptocurrencies can be extremely
                volatile and may result in substantial losses. Past performance is not indicative of future results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">No Financial Advice</h3>
              <p className="text-muted-foreground">
                The information provided on this platform is for educational purposes only and should not be considered
                as financial, investment, or legal advice. Always consult with qualified professionals before making
                investment decisions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Platform Risks</h3>
              <p className="text-muted-foreground">
                Staking platforms may experience technical issues, security breaches, or other operational problems that
                could result in loss of funds. We cannot guarantee the security or availability of our services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Regulatory Risk</h3>
              <p className="text-muted-foreground">
                Cryptocurrency regulations are evolving and may change in ways that could affect the legality or
                profitability of staking activities in your jurisdiction.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Technical Risks</h3>
              <p className="text-muted-foreground">
                Ethereum network upgrades, protocol changes, or technical issues could affect staking rewards or the
                ability to unstake your tokens.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">No Guarantees</h3>
              <p className="text-muted-foreground">
                We make no guarantees about staking rewards, platform uptime, or the security of your funds. Use our
                services at your own risk.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
              <p className="text-muted-foreground">
                To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, or
                consequential damages arising from your use of our platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Due Diligence</h3>
              <p className="text-muted-foreground">
                You are responsible for conducting your own research and due diligence before participating in any
                staking activities. Understand the risks involved and only stake what you can afford to lose.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedArticles
          articles={[
            {
              title: "Understanding Staking Risks",
              description: "Comprehensive guide to the risks involved in Ethereum staking",
              href: "/articles/staking-risks",
              readTime: "15 min read",
            },
            {
              title: "Risk Management Strategies",
              description: "How to minimize risks while maximizing staking rewards",
              href: "/articles/staking-risk-management",
              readTime: "12 min read",
            },
            {
              title: "Tax Implications of Staking",
              description: "Understanding the tax consequences of staking rewards",
              href: "/articles/tax-implications-of-eth-staking",
              readTime: "14 min read",
            },
            {
              title: "Regulatory Landscape",
              description: "Current and future regulatory considerations for staking",
              href: "/articles/eth-staking-regulatory-landscape",
              readTime: "11 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
