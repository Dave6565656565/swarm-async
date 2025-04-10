import { NextResponse } from "next/server"
import { sendTelegramNotification } from "@/lib/telegram-service"

export async function GET(request: Request) {
  try {
    // Create a test message with an email
    const testEmail = "test@example.com"
    const message = `
🧪 <b>TELEGRAM TEST MESSAGE</b>
📧 <b>Test Email:</b> ${testEmail}
⏰ <b>Time:</b> ${new Date().toISOString()}
`

    console.log("Sending test Telegram notification")

    // Send the test message
    const success = await sendTelegramNotification(message)

    console.log("Test notification result:", success)

    return NextResponse.json({
      success,
      message: success ? "Test message sent successfully" : "Failed to send test message",
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in test Telegram endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error sending test message",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
