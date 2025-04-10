import { NextResponse } from "next/server"
import { handleLeadSubmission } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    // Get the form data
    const formData = await request.json()

    // Get IP and location info if available
    const ip = request.headers.get("x-forwarded-for") || "Unknown IP"
    const userAgent = request.headers.get("user-agent") || "Unknown User Agent"
    const referer = request.headers.get("referer") || "Direct"

    // Add request metadata to the form data
    const enrichedData = {
      ...formData,
      ip,
      userAgent,
      referer,
      timestamp: new Date().toISOString(),
    }

    console.log("Processing lead submission:", enrichedData)

    // Handle the lead submission
    const success = await handleLeadSubmission(enrichedData)

    if (success) {
      return NextResponse.json({ success: true, message: "Lead submitted successfully" })
    } else {
      // Even if Telegram notification failed, we've stored the lead in the database
      return NextResponse.json({
        success: true,
        message: "Lead submitted successfully but notification may have failed",
      })
    }
  } catch (error) {
    console.error("Error in submit-lead API:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
