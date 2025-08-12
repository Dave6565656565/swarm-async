import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReferralSystem } from "@/components/referral-system"
import { TopAffiliatesTable } from "@/components/top-affiliates-table"
import { RelatedArticles } from "@/components/related-articles"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AffiliatePage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Affiliate Program</h1>

      <div className="max-w-4xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden mb-8">
          <CardHeader>
            <CardTitle>Earn Rewards by Referring Others</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Share your unique referral link and earn 3% of the ETH staked by your referrals. There's no limit to how
              much you can earn!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glassmorphism border-none">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Referrals</div>
                  <div className="text-2xl font-bold">0</div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-none">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total ETH Staked</div>
                  <div className="text-2xl font-bold">0 ETH</div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-none">
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">Total Rewards</div>
                  <div className="text-2xl font-bold">0 ETH</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <TopAffiliatesTable />

        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>Affiliate Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="referrals">
              <TabsList className="glassmorphism border-none mb-6">
                <TabsTrigger value="referrals">Referrals</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="referrals">
                <ReferralSystem />
              </TabsContent>

              <TabsContent value="rewards">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">You haven't earned any rewards yet.</p>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <ReferralSystem />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <RelatedArticles
          articles={[
            {
              title: "Best ETH Staking Platforms 2024",
              description: "Learn about the platforms you'll be promoting to your referrals",
              href: "/articles/best-eth-staking-platforms",
              readTime: "15 min read",
            },
            {
              title: "Ethereum Staking for Beginners",
              description: "Help your referrals understand the basics of Ethereum staking",
              href: "/articles/ethereum-staking-for-beginners",
              readTime: "12 min read",
            },
            {
              title: "Staking Security Best Practices",
              description: "Share essential security tips with your referred users",
              href: "/articles/staking-security-best-practices",
              readTime: "10 min read",
            },
            {
              title: "ETH Staking Rewards Calculator",
              description: "Show potential earnings to attract more referrals",
              href: "/articles/staking-rewards-calculator",
              readTime: "5 min read",
            },
          ]}
        />

        {/* Parlay Calculator Backlink */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for sports betting tools?</p>
          <Link
            href="https://luxuryfootballelite.com/parlay-calculator/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Use the best Parlay Betting Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
