"use client"

import { useState } from "react"
import { sendTelegramNotification } from "@/lib/telegram-service"

interface HomePresaleNotifyButtonProps {
  email: string
  isSubmitting: boolean
  onSubmit: () => void
}

export function HomePresaleNotifyButton({ email, isSubmitting, onSubmit }: HomePresaleNotifyButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = async () => {
    if (!email || isSubmitting) return

    try {
      // Send notification to Telegram about button click
      await sendTelegramNotification(`
🏠 <b>Home Presale Notify Button Clicked</b>
📧 <b>Email:</b> ${email}
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)

      // Call the parent's onSubmit handler
      onSubmit()
    } catch (error) {
      console.error("Failed to send notification:", error)
      // Still call onSubmit even if notification fails
      onSubmit()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSubmitting}
      className={`
        relative px-6 py-2 rounded-md font-medium text-white
        transition-all duration-200 transform
        ${isHovered ? "shadow-lg" : ""}
        ${isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? "linear-gradient(to right, #9333ea, #7e22ce)"
          : "linear-gradient(to right, #8b5cf6, #9333ea)",
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      }}
      aria-label="Notify me about presale"
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
          <span>Submitting...</span>
        </div>
      ) : (
        "Notify Me"
      )}
    </button>
  )
}
