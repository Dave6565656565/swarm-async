import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ParticlesBackground } from "@/components/particles-background"
import { RelatedArticles } from "@/components/related-articles"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text text-center">Contact Us</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="glassmorphism neon-border overflow-hidden">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" className="glassmorphism border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="glassmorphism border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="glassmorphism border-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    className="glassmorphism border-none min-h-[120px]"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="glassmorphism neon-border overflow-hidden">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@stakeeth.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">123 Crypto Street, Blockchain City</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism neon-border overflow-hidden">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">How do I start staking?</h4>
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet and follow our step-by-step guide.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">What are the minimum requirements?</h4>
                  <p className="text-sm text-muted-foreground">You can start staking with as little as 0.01 ETH.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Is my ETH safe?</h4>
                  <p className="text-sm text-muted-foreground">Yes, we use industry-leading security measures.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <RelatedArticles
          articles={[
            {
              title: "Ethereum Staking for Beginners",
              description: "New to staking? Start here with our comprehensive beginner's guide",
              href: "/articles/ethereum-staking-for-beginners",
              readTime: "12 min read",
            },
            {
              title: "Staking Security Best Practices",
              description: "Learn how to keep your staked ETH safe and secure",
              href: "/articles/staking-security-best-practices",
              readTime: "10 min read",
            },
            {
              title: "Common Staking Questions",
              description: "Find answers to frequently asked questions about ETH staking",
              href: "/articles/ethereum-staking-faq",
              readTime: "8 min read",
            },
            {
              title: "Getting Started Guide",
              description: "Step-by-step instructions to begin your staking journey",
              href: "/articles/getting-started-with-staking",
              readTime: "15 min read",
            },
          ]}
        />
      </div>
    </div>
  )
}
