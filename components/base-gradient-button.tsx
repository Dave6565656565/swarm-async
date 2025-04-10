"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { sendTelegramNotification } from "@/lib/telegram-service"

interface BaseGradientButtonProps {
  children: React.ReactNode
  onClick?: () => void | Promise<void>
  className?: string
  disabled?: boolean
  isLoading?: boolean
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  trackingName?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export function BaseGradientButton({
  children,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
  type = "button",
  fullWidth = true,
  trackingName,
  icon,
  iconPosition = "left",
}: BaseGradientButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = async () => {
    if (disabled || isLoading) return

    // Track button click if trackingName is provided
    if (trackingName) {
      try {
        await sendTelegramNotification(`
🔘 <b>Button Clicked</b>
🏷️ <b>Button:</b> ${trackingName}
⏰ <b>Time:</b> ${new Date().toISOString()}
        `)
      } catch (error) {
        console.error("Failed to send tracking notification:", error)
      }
    }

    // Call the provided onClick handler
    if (onClick) {
      onClick()
    }
  }

  return (
    <button
      type={type}
      className={cn(
        // Base styles
        "relative rounded-lg font-medium text-white transition-all duration-200 overflow-hidden",
        // Width control
        fullWidth ? "w-full" : "inline-flex",
        // Padding
        "py-3 px-4",
        // Gradient background
        isHovered ? "bg-gradient-to-r from-purple-700 to-blue-700" : "bg-gradient-to-r from-purple-600 to-blue-600",
        // Disabled state
        (disabled || isLoading) && "opacity-70 cursor-not-allowed",
        // Custom classes
        className,
      )}
      disabled={disabled || isLoading}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
      }}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && icon}
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span className="ml-2">Loading...</span>
          </div>
        ) : (
          children
        )}
        {icon && iconPosition === "right" && icon}
      </div>
    </button>
  )
}
