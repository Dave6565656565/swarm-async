import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, FileText, AlertTriangle, TrendingUp } from "lucide-react"

export default function ArticlePage() {
  return (
    <div>
      <ParticlesBackground />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Tax Implications of ETH Staking</h1>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Understanding Staking Taxes
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Ethereum staking rewards are generally considered taxable income in most jurisdictions. Understanding
                the tax implications is crucial for proper compliance and financial planning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-green-500" />
                Tax Treatment of Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Staking rewards are typically taxed as ordinary income</li>
                <li>Fair market value at time of receipt determines taxable amount</li>
                <li>Additional capital gains tax may apply when selling rewards</li>
                <li>Record keeping is essential for accurate reporting</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                Tax Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Consider timing of reward claims</li>
                <li>Utilize tax-advantaged accounts where possible</li>
                <li>Implement tax-loss harvesting strategies</li>
                <li>Plan for estimated tax payments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Important Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Tax laws vary by jurisdiction</li>
                <li>Regulations are still evolving</li>
                <li>Professional tax advice is recommended</li>
                <li>Keep detailed records of all transactions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <RelatedArticles
          articles={[
            {
              title: "Ethereum Staking Tax Optimization",
              description: "Advanced strategies for minimizing your staking tax burden",
              href: "/articles/ethereum-staking-tax-optimization",
              readTime: "16 min read",
            },
            {
              title: "Staking Rewards Calculator",
              description: "Calculate your potential rewards and tax implications",
              href: "/articles/staking-rewards-calculator",
              readTime: "5 min read",
            },
            {
              title: "Record Keeping for Stakers",
              description: "Essential documentation for tax compliance",
              href: "/articles/staking-record-keeping",
              readTime: "9 min read",
            },
            {
              title: "Institutional Tax Strategies",
              description: "Tax considerations for institutional staking operations",
              href: "/articles/ethereum-staking-for-institutions",
              readTime: "14 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
