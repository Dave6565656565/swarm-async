import { Card, CardContent } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Disclaimer</h1>

      <Card className="glassmorphism neon-border overflow-hidden max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. No Financial Advice</h2>
            <p className="text-muted-foreground">
              The information provided on StakeETH Portal is for general informational purposes only and should not be
              construed as financial, investment, or legal advice. We do not provide personalized investment advice or
              recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Risk Disclosure</h2>
            <p className="text-muted-foreground">
              Cryptocurrency staking involves significant risks, including but not limited to market volatility,
              technical vulnerabilities, regulatory changes, and potential loss of principal. The value of
              cryptocurrencies can fluctuate significantly in a short period of time.
            </p>
            <p className="text-muted-foreground mt-2">
              You should carefully consider your financial situation, risk tolerance, and investment objectives before
              engaging in cryptocurrency staking. Past performance is not indicative of future results.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. No Guarantees</h2>
            <p className="text-muted-foreground">
              StakeETH Portal does not guarantee any specific returns, APY rates, or outcomes from using our platform.
              All projected returns and APY rates are estimates based on current market conditions and are subject to
              change without notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Technical Risks</h2>
            <p className="text-muted-foreground">
              Blockchain technology and smart contracts are relatively new and untested technologies. There are inherent
              risks associated with using these technologies, including but not limited to software bugs, technical
              vulnerabilities, and network failures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Regulatory Risks</h2>
            <p className="text-muted-foreground">
              The regulatory landscape for cryptocurrencies and blockchain technology is evolving. Changes in laws,
              regulations, or policies may adversely affect the operation of StakeETH Portal or the value of staked
              assets.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Independent Research</h2>
            <p className="text-muted-foreground">
              Users are encouraged to conduct their own research and consult with financial, legal, and tax
              professionals before making any investment decisions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Accuracy of Information</h2>
            <p className="text-muted-foreground">
              While we strive to provide accurate and up-to-date information, StakeETH Portal makes no representations
              or warranties about the accuracy, completeness, or reliability of any information on our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, StakeETH Portal and its affiliates, officers, directors,
              employees, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or
              punitive damages resulting from your use of our platform or any investment decisions you make.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">9. Updates to Disclaimer</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this disclaimer at any time. We will provide notice of significant changes
              by updating the date at the top of this disclaimer and by maintaining a current version on our website.
            </p>
          </div>

          <div className="pt-4 border-t border-muted">
            <p className="text-sm text-muted-foreground">Last updated: April 7, 2023</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
