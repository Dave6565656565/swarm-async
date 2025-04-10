import { Card, CardContent } from "@/components/ui/card"
import { ParticlesBackground } from "@/components/particles-background"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Privacy Policy</h1>

      <Card className="glassmorphism neon-border overflow-hidden max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">1. Introduction</h2>
            <p className="text-muted-foreground">
              At StakeETH Portal, we respect your privacy and are committed to protecting your personal data. This
              Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">2. Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us, such as your email address, wallet address, and
              any other information you choose to provide when using our platform or communicating with us.
            </p>
            <p className="text-muted-foreground mt-2">
              We also automatically collect certain information when you use our platform, including your IP address,
              browser type, operating system, and information about your usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Provide, maintain, and improve our platform</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience on our platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Sharing of Information</h2>
            <p className="text-muted-foreground">We may share your information with:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Professional advisors, such as lawyers, auditors, and insurers</li>
              <li>Government authorities if required by law or in response to legal process</li>
              <li>Third parties in connection with a merger, sale, or acquisition</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, disclosure, alteration, and destruction.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Your Rights</h2>
            <p className="text-muted-foreground">
              Depending on your location, you may have certain rights regarding your personal information, including the
              right to access, correct, delete, or restrict processing of your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar technologies to collect information about your browsing activities and to
              distinguish you from other users of our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">8. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at support@stakeethportal.com.
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
