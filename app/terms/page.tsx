import { Card, CardContent } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Terms of Service</h1>

      <Card className="glassmorphism neon-border overflow-hidden max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using StakeETH Portal, you agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Description of Service</h2>
            <p className="text-muted-foreground">
              StakeETH Portal provides Ethereum staking services that allow users to stake their ETH and earn rewards.
              The platform facilitates the staking process through smart contracts deployed on the Ethereum blockchain.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. Eligibility</h2>
            <p className="text-muted-foreground">
              You must be at least 18 years old to use StakeETH Portal. By using our platform, you represent and warrant
              that you have the legal capacity to enter into a binding agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. User Accounts</h2>
            <p className="text-muted-foreground">
              You are responsible for maintaining the confidentiality of your wallet credentials and for all activities
              that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Staking Risks</h2>
            <p className="text-muted-foreground">
              Staking cryptocurrencies involves risks, including but not limited to market volatility, smart contract
              vulnerabilities, and regulatory changes. You acknowledge and accept these risks when using our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Fees and Rewards</h2>
            <p className="text-muted-foreground">
              StakeETH Portal charges fees for its staking services as outlined on our platform. Staking rewards are
              distributed according to the terms specified in our smart contracts. We reserve the right to modify our
              fee structure with appropriate notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content on StakeETH Portal, including but not limited to text, graphics, logos, and software, is the
              property of StakeETH Portal and is protected by intellectual property laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              StakeETH Portal shall not be liable for any direct, indirect, incidental, special, consequential, or
              punitive damages resulting from your use or inability to use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">9. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms of Service shall be governed by and construed in accordance with the laws of the United
              States, without regard to its conflict of law principles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms of Service at any time. We will provide notice of significant
              changes by updating the date at the top of these terms and by maintaining a current version on our
              website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">11. Contact Information</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at support@stakeethportal.com.
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
