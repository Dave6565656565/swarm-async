"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ParticlesBackground } from "@/components/particles-background"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, Info } from "lucide-react"

export default function TestTelegramPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("test@example.com")
  const [setupInfo, setSetupInfo] = useState<any>(null)
  const [setupLoading, setSetupLoading] = useState(true)

  // Fetch setup info on page load
  useEffect(() => {
    async function fetchSetupInfo() {
      try {
        const response = await fetch("/api/setup-telegram")
        const data = await response.json()
        setSetupInfo(data)
      } catch (error) {
        console.error("Error fetching setup info:", error)
      } finally {
        setSetupLoading(false)
      }
    }

    fetchSetupInfo()
  }, [])

  const testDirectTelegram = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-telegram")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testNewsletterSignup = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testLeadSubmission = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-lead-submission")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <ParticlesBackground />

      <h1 className="text-3xl font-bold mb-8 neon-text">Test Telegram Integration</h1>

      {setupInfo && (
        <Card className="glassmorphism neon-border overflow-hidden max-w-4xl mx-auto mb-6">
          <CardHeader>
            <CardTitle>Telegram Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-500/20 border-green-500/50">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-500">Telegram Configured</AlertTitle>
              <AlertDescription className="text-green-500">
                Your Telegram integration is configured with a secure chat ID (masked for security)
              </AlertDescription>
            </Alert>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Testing Options</AlertTitle>
              <AlertDescription>Use the options below to test your Telegram integration.</AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>Direct Telegram Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This will send a direct message to Telegram using the API.</p>
            <Button
              onClick={testDirectTelegram}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? "Testing..." : "Test Direct Telegram"}
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>Newsletter Signup Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Test Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glassmorphism border-none"
              />
            </div>
            <Button
              onClick={testNewsletterSignup}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? "Testing..." : "Test Newsletter Signup"}
            </Button>
          </CardContent>
        </Card>

        <Card className="glassmorphism neon-border overflow-hidden">
          <CardHeader>
            <CardTitle>Lead Submission Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">This will test the lead submission functionality directly.</p>
            <Button
              onClick={testLeadSubmission}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {loading ? "Testing..." : "Test Lead Submission"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {result && (
        <Card className="glassmorphism neon-border overflow-hidden max-w-4xl mx-auto mt-6">
          <CardHeader>
            <CardTitle>Test Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto max-h-96">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
