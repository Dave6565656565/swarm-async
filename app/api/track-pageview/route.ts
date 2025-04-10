import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Get user's IP if not provided
    const userIP = data.ip || request.headers.get("x-forwarded-for") || "Unknown"

    // Format time in user's timezone (Dubai/UAE)
    const now = new Date()
    const formattedTime = now.toLocaleString("en-US", {
      timeZone: "Asia/Dubai", // UAE timezone
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    // Format message for Telegram with emojis
    const message = `
🔍 PAGE VIEW
📄 Page: ${data.path || "/"}
🌐 IP: ${userIP}
🌍 Country: ${data.country || "Unknown"}
🏙️ City: ${data.city || "Unknown"}
🔢 Visit Count: ${data.visitCount || "First visit"}
🌐 Browser: ${data.browser || "Unknown"}
💻 OS: ${data.os || "Unknown"}
📱 Device: ${data.isMobile ? "Mobile" : "Desktop"}
📐 Screen: ${data.screenSize || "Unknown"}
🔗 Referer: ${data.referer || "Direct"}
⏰ Time: ${formattedTime}
`

    // Log the message
    console.log("PAGE_VIEW:", message)

    // Store the data locally
    console.log("PAGE_VIEW_DATA:", data)

    // Always try to send Telegram notification
    try {
      // Use a non-blocking approach to send the notification
      const sendResult = await sendTelegramNotification(message)
      console.log("Telegram notification result:", sendResult)
    } catch (notificationError) {
      console.error("Failed to send Telegram notification, but tracking continues:", notificationError)
      // Continue execution even if notification fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking page view:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
