"use client"

import { useState, type FormEvent } from "react"
import { Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { HomePresaleNotifyButton } from "./home-presale-notify-button"

export function NewsletterSection() {
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
      // Submit to API
      const response = await fetch("/api/presale-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source: "Home Presale" }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setSubmitStatus({
            type: "error",
            message: "You've already signed up with this email.",
          })
        } else {
          throw new Error(data.message || "Failed to submit email")
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

  const handleButtonSubmit = () => {
    // This function is called by the button component
    // The form's onSubmit will handle the actual submission
    if (!isSubmitting) {
      const form = document.getElementById("presale-form") as HTMLFormElement
      if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))
    }
  }

  return (
    <section className="py-24 md:py-32 bg-black text-white">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-4 rounded-full bg-white/10 mb-6">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Presale Coming Soon</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our token presale starts on June 26, 2025. Sign up now to be notified when it goes live.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <form id="presale-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white text-lg font-medium">
                Email Address
              </label>
              <div className="flex gap-3">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  disabled={isSubmitting}
                  required
                />
                <HomePresaleNotifyButton email={email} isSubmitting={isSubmitting} onSubmit={handleButtonSubmit} />
              </div>
            </div>

            {submitStatus && (
              <div
                className={`text-sm ${submitStatus.type === "success" ? "text-green-400" : "text-red-400"}`}
                role="alert"
              >
                {submitStatus.message}
              </div>
            )}

            <p className="text-sm text-gray-400">
              By signing up, you agree to receive updates about our presale and token launch. We'll never spam you or
              share your email.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
