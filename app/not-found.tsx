import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/particles-background"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 relative">
      <ParticlesBackground />

      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold neon-text">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>

        <div className="pt-6">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
