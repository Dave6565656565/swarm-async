import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"
import { PresaleNotifyForm } from "@/components/presale-notify-form"

export default function PresalePage() {
  // Calculate presale date (2 months from now)
  const currentDate = new Date()
  const presaleDate = new Date(currentDate)
  presaleDate.setMonth(currentDate.getMonth() + 2)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate days until presale
  const daysUntilPresale = Math.ceil((presaleDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Presale</h1>

      <div className="max-w-3xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>StakeETH Token Presale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Presale Starts On</div>
                  <div className="text-2xl font-bold">{formatDate(presaleDate)}</div>
                </div>

                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Countdown</div>
                  <div className="text-2xl font-bold">{daysUntilPresale} days</div>
                  <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500" style={{ width: "0%" }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Token Price</div>
                  <div className="text-2xl font-bold">0.0001 ETH</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-lg font-medium mb-4">Get Notified</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign up to be notified when our presale goes live. Be among the first to participate and get the
                    best bonuses.
                  </p>

                  <PresaleNotifyForm />
                </div>

                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Total Supply</div>
                  <div className="text-2xl font-bold">1,000,000,000 $SEP Tokens</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg glassmorphism">
              <h3 className="text-lg font-medium mb-2">Presale Information</h3>
              <ul className="space-y-2 text-sm">
                <li>• Presale starts on {formatDate(presaleDate)}</li>
                <li>• Minimum purchase: 0.1 ETH</li>
                <li>• Maximum purchase: 10 ETH</li>
                <li>• Tokens will be distributed after the presale ends</li>
                <li>• Unsold tokens will be burned</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
