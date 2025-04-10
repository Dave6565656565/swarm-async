import { NextResponse } from "next/server"
import { handleLeadSubmission, hasIPSubmitted } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    // Get IP and location info if available
    const ip = request.headers.get("x-forwarded-for") || "Unknown IP"
    const userAgent = request.headers.get("user-agent") || "Unknown User Agent"
    const referer = request.headers.get("referer") || "Direct"

    // Check if this IP has already submitted
    if (await hasIPSubmitted(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already submitted your email",
        },
        { status: 429 },
      )
    }

    console.log("Processing presale signup:", email)

    // Use the lead handling function
    const success = await handleLeadSubmission({
      email,
      source: source || "Presale Signup",
      page: referer,
      ip,
      userAgent,
      referer,
    })

    // Return appropriate response
    if (success) {
      return NextResponse.json({ success: true, message: "Email submitted successfully" })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "You have already submitted your email",
        },
        { status: 429 },
      )
    }
  } catch (error) {
    console.error("Error in presale signup:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
