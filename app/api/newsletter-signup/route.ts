import { NextResponse } from "next/server"
import { handleLeadSubmission, hasIPSubmitted } from "@/lib/telegram-service"

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json()

    // Validate email format
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 },
      )
    }

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

    console.log("Processing newsletter signup:", email)

    // Use the lead handling function
    const success = await handleLeadSubmission({
      email,
      source: source || "Newsletter Signup",
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
    console.error("Error in newsletter signup:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
