"use client"

import { useState, type FormEvent } from "react"
import { NotifyMeButton } from "./notify-me-button"
import { sendTelegramNotification } from "@/lib/telegram-service"

export function PresaleNotifyForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Send notification to Telegram
      await sendTelegramNotification(`
📧 <b>New Presale Notification Signup</b>
📩 <b>Email:</b> ${email}
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      // Submit to API
      const response = await fetch("/api/presale-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit email")
      }

      const data = await response.json()

      if (data.error) {
        if (data.error.includes("already subscribed")) {
          setSubmitStatus({
            type: "success",
            message: "You're already subscribed! We'll notify you when the presale starts.",
          })
        } else {
          throw new Error(data.error)
        }
      } else {
        setSubmitStatus({
          type: "success",
          message: "Thanks! We'll notify you when the presale starts.",
        })
        setEmail("")
      }
    } catch (error) {
      console.error("Error submitting email:", error)
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to submit. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-white font-medium">
            Email Address
          </label>
          <div className="flex gap-2">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-500/10"
              disabled={isSubmitting}
              required
            />
            <NotifyMeButton isSubmitting={isSubmitting} />
          </div>
        </div>

        {submitStatus && (
          <div className={`text-sm ${submitStatus.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {submitStatus.message}
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
