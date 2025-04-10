import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReferralSystem } from "@/components/referral-system"
import { TopAffiliatesTable } from "@/components/top-affiliates-table"

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
      </div>
    </div>
  )
}
