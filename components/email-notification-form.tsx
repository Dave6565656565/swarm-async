"use client"

import type React from "react"

import { useState } from "react"
import { sendTelegramNotification } from "@/lib/telegram-service"

export function EmailNotificationForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      // Send notification to Telegram
      await sendTelegramNotification(`
📧 <b>Email Notification Signup</b>
📧 <b>Email:</b> ${email}
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus({
        type: "success",
        message: "Thank you! We'll notify you about our presale and token launch.",
      })
      setEmail("")
    } catch (error) {
      console.error("Failed to submit email:", error)
      setStatus({
        type: "error",
        message: "Failed to submit. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-white font-medium">
            Email Address
          </label>
          <div className="flex">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-500/10"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-purple-600 text-white font-medium rounded-r-lg transition-all ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Notify Me"}
            </button>
          </div>
        </div>

        {status && (
          <div
            className={`p-3 rounded-md ${
              status.type === "success" ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"
            }`}
          >
            {status.message}
          </div>
        )}

        <p className="text-sm text-gray-400">
          By signing up, you agree to receive updates about our presale and token launch. We'll never spam you or share
          your email.
        </p>
      </form>
    </div>
  )
}
