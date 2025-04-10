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
              We collect minimal information that you provide directly to us, such as your wallet address and any other
              information you choose to provide when using our platform or communicating with us.
            </p>
            <p className="text-muted-foreground mt-2">
              We also automatically collect certain technical information when you use our platform, including your IP
              address, browser type, and operating system for security and service improvement purposes only.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Provide, maintain, and improve our platform</li>
              <li>Process transactions</li>
              <li>Send technical notices and security alerts</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Personalize and improve your experience on our platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">4. Data Protection and Privacy</h2>
            <p className="text-muted-foreground">
              <strong>We do not share any customer data with third parties.</strong> Your information is kept strictly
              confidential and is only used internally to provide and improve our services.
            </p>
            <p className="text-muted-foreground mt-2">
              We do not sell, rent, or lease your personal information to any third party. We do not share your
              information with advertisers or marketing companies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">5. Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, disclosure, alteration, and destruction. All data is stored securely and
              accessed only by authorized personnel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">6. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, delete, or restrict processing of your personal information. You
              can request a copy of your data or ask us to delete your information at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">7. Cookies</h2>
            <p className="text-muted-foreground">
              We use minimal cookies that are necessary for the functioning of our platform. These cookies do not track
              your browsing activity on other websites.
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
            <p className="text-sm text-muted-foreground">Last updated: April 11, 2023</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
