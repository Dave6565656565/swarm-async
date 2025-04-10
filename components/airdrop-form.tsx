"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RegisterAirdropButton } from "./register-airdrop-button"

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
// Ethereum address validation regex
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

export function AirdropForm() {
  const [email, setEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [telegramUsername, setTelegramUsername] = useState("")
  const [twitterUsername, setTwitterUsername] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Client-side validation
    if (!email) {
      setError("Email address is required")
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (!walletAddress) {
      setError("Wallet address is required")
      return
    }

    if (!ETH_ADDRESS_REGEX.test(walletAddress)) {
      setError("Please enter a valid Ethereum wallet address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      console.log("Submitting airdrop registration:", {
        email,
        walletAddress,
        telegramUsername,
        twitterUsername,
      })

      // Use the API endpoint
      const response = await fetch("/api/airdrop-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          walletAddress,
          telegramUsername,
          twitterUsername,
        }),
      })

      const data = await response.json()
      console.log("Airdrop registration response:", data)

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit registration")
      }

      setIsSuccess(true)
      setEmail("")
      setWalletAddress("")
      setTelegramUsername("")
      setTwitterUsername("")
    } catch (err) {
      console.error("Airdrop registration error:", err)
      setError("Failed to submit. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg glassmorphism text-center"
        >
          <div className="inline-block p-3 rounded-full bg-green-500/20 mb-4">
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
          <p className="text-muted-foreground">
            Thank you for registering for our airdrop. We'll notify you when the airdrop goes live.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glassmorphism border-none bg-gray-500/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wallet-address">Ethereum Wallet Address *</Label>
            <Input
              id="wallet-address"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="glassmorphism border-none bg-gray-500/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegram">Telegram Username (Optional)</Label>
            <Input
              id="telegram"
              placeholder="@username"
              value={telegramUsername}
              onChange={(e) => setTelegramUsername(e.target.value)}
              className="glassmorphism border-none bg-gray-500/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter">Twitter Username (Optional)</Label>
            <Input
              id="twitter"
              placeholder="@username"
              value={twitterUsername}
              onChange={(e) => setTwitterUsername(e.target.value)}
              className="glassmorphism border-none bg-gray-500/10"
            />
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox id="terms" required />
            <Label htmlFor="terms" className="text-sm leading-tight">
              I agree to the terms and conditions and understand that my information will be used as described in the
              privacy policy.
            </Label>
          </div>

          {error && (
            <Alert className="bg-red-500/20 border-red-500/50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-500 text-sm">{error}</AlertDescription>
            </Alert>
          )}

          <RegisterAirdropButton isRegistering={isSubmitting} />
        </form>
      )}
    </>
  )
}
