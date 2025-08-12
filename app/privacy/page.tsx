import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text text-center">Privacy Policy</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden mb-8">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 prose prose-invert max-w-none">
            <div>
              <h3 className="text-lg font-semibold mb-3">Information We Collect</h3>
              <p className="text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, use our services,
                or contact us for support.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">How We Use Your Information</h3>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, process transactions,
                and communicate with you.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Information Sharing</h3>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Data Security</h3>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Cookies and Tracking</h3>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our platform and analyze
                usage patterns.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information. You may also opt out of
                certain communications from us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Changes to This Policy</h3>
              <p className="text-muted-foreground">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the
                new policy on this page.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy, please contact us at privacy@stakeeth.com.
              </p>
            </div>
          </CardContent>
        </Card>

        <RelatedArticles
          articles={[
            {
              title: "Staking Security Best Practices",
              description: "Learn how to keep your staking activities private and secure",
              href: "/articles/staking-security-best-practices",
              readTime: "10 min read",
            },
            {
              title: "Anonymous Staking Methods",
              description: "Explore privacy-focused approaches to Ethereum staking",
              href: "/articles/anonymous-staking-methods",
              readTime: "12 min read",
            },
            {
              title: "Data Protection in DeFi",
              description: "Understanding privacy considerations in decentralized finance",
              href: "/articles/data-protection-defi",
              readTime: "9 min read",
            },
            {
              title: "Wallet Security Guide",
              description: "Protect your cryptocurrency wallet and personal information",
              href: "/articles/wallet-security-guide",
              readTime: "11 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
