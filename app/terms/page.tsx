import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text text-center">Terms of Service</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden mb-8">
          <CardHeader>
            <CardTitle>Terms and Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-invert max-w-none">
            <div>
              <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using StakeETH platform, you accept and agree to be bound by the terms and provision of
                this agreement.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">2. Use License</h3>
              <p className="text-muted-foreground">
                Permission is granted to temporarily use StakeETH platform for personal, non-commercial transitory
                viewing only.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">3. Disclaimer</h3>
              <p className="text-muted-foreground">
                The materials on StakeETH platform are provided on an 'as is' basis. StakeETH makes no warranties,
                expressed or implied.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">4. Limitations</h3>
              <p className="text-muted-foreground">
                In no event shall StakeETH or its suppliers be liable for any damages arising out of the use or
                inability to use the platform.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">5. Accuracy of Materials</h3>
              <p className="text-muted-foreground">
                The materials appearing on StakeETH platform could include technical, typographical, or photographic
                errors.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">6. Links</h3>
              <p className="text-muted-foreground">
                StakeETH has not reviewed all of the sites linked to our platform and is not responsible for the
                contents of any such linked site.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">7. Modifications</h3>
              <p className="text-muted-foreground">
                StakeETH may revise these terms of service at any time without notice. By using this platform, you are
                agreeing to be bound by the current version.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">8. Governing Law</h3>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
                submit to the exclusive jurisdiction.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedArticles
          articles={[
            {
              title: "Staking Security Best Practices",
              description: "Essential security measures to protect your staked assets",
              href: "/articles/staking-security-best-practices",
              readTime: "10 min read",
            },
            {
              title: "Understanding Staking Risks",
              description: "Learn about the risks involved in Ethereum staking",
              href: "/articles/staking-risks",
              readTime: "8 min read",
            },
            {
              title: "Legal Considerations for Staking",
              description: "Important legal aspects of cryptocurrency staking",
              href: "/articles/legal-considerations-staking",
              readTime: "12 min read",
            },
            {
              title: "Regulatory Landscape",
              description: "Current regulatory environment for Ethereum staking",
              href: "/articles/eth-staking-regulatory-landscape",
              readTime: "14 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
