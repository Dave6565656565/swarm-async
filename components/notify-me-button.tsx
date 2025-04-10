"use client"

import { useState } from "react"
import { sendTelegramNotification } from "@/lib/telegram-service"

interface NotifyMeButtonProps {
  isSubmitting?: boolean
  onClick?: () => void
  type?: "button" | "submit"
  className?: string
}

export function NotifyMeButton({
  isSubmitting = false,
  onClick,
  type = "submit",
  className = "",
}: NotifyMeButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = async () => {
    if (onClick) onClick()

    // Track button click
    try {
      await sendTelegramNotification(`
🔔 <b>Notify Me Button Clicked</b>
⏰ <b>Time:</b> ${new Date().toISOString()}
      `)
    } catch (error) {
      console.error("Failed to send notification:", error)
    }
  }

  return (
    <button
      type={type}
      className={`relative px-6 py-2 rounded-md font-medium text-white bg-purple-600 transition-all duration-200 ${
        isHovered ? "bg-purple-700 shadow-lg" : ""
      } ${isSubmitting ? "opacity-80 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      disabled={isSubmitting}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
      }}
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
