import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-service"

export async function GET(request: Request) {
  try {
    // Create a simple test message
    const message = `Test message from debug endpoint at ${new Date().toISOString()}`

    console.log("Sending Telegram test message")

    // Send the message
    const success = await sendTelegramNotification(message)

    // Return the result
    return NextResponse.json({
      success,
      message: success ? "Message sent successfully" : "Failed to send message",
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in debug Telegram endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        message: "Error sending test message",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = body.message

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    console.log("Sending Telegram message from API route:", message.substring(0, 50) + "...")

    // Send the message directly using the original function
    const success = await sendTelegramNotification(message)

    return NextResponse.json({
      success,
      message: success ? "Message sent successfully" : "Failed to send message",
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in debug Telegram endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        message: "Error sending test message",
      },
      { status: 500 },
    )
  }
}
