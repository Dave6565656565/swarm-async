import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    let data
    try {
      data = await request.json()
    } catch (parseError) {
      console.log("Error parsing request body:", parseError)
      // Try to handle beacon API requests which might not be proper JSON
      const text = await request.text()
      try {
        data = JSON.parse(text)
      } catch (secondParseError) {
        console.log("Could not parse request as text either:", secondParseError)
        data = { message: text }
      }
    }

    const { event, message } = data

    // If we have a direct message, just send it
    if (message) {
      try {
        await sendTelegramNotification(message)
      } catch (error) {
        console.log("Failed to send direct message:", error)
      }
      return NextResponse.json({ success: true })
    }

    // Otherwise process as an event
    if (!event) {
      return NextResponse.json({ success: false, message: "Event is required" }, { status: 400 })
    }

    // Get IP and location info if available
    const ip = request.headers.get("x-forwarded-for") || "Unknown IP"
    const userAgent = request.headers.get("user-agent") || "Unknown User Agent"
    const referer = request.headers.get("referer") || "Direct"

    // Format message based on event type
    let notificationMessage = `
📊 <b>${event}</b>
`

    // Add event-specific data
    if (data.data) {
      Object.entries(data.data).forEach(([key, value]) => {
        notificationMessage += `${key}: ${value}
`
      })
    }

    // Add common data
    notificationMessage += `
🌐 <b>IP:</b> ${ip}
🔗 <b>Referer:</b> ${referer}
📱 <b>User Agent:</b> ${userAgent}
⏰ <b>Time:</b> ${new Date().toISOString()}
`

    // Send to Telegram
    try {
      await sendTelegramNotification(notificationMessage)
    } catch (error) {
      console.log("Failed to send Telegram notification:", error)
      // Continue execution even if Telegram notification fails
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log("Error tracking event:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
