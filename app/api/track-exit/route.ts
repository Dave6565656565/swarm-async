import { NextResponse } from "next/server"
import { trackPageExit } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Track the exit event
    await trackPageExit({
      path: data.path || "/",
      sessionDuration: data.sessionDuration || 0,
      formattedDuration: data.formattedDuration || "Unknown",
      ip: data.ip || "Unknown",
      country: data.country || "Unknown",
      city: data.city || "Unknown",
      visitCount: data.visitCount || "First visit",
      browser: data.browser || "Unknown",
      os: data.os || "Unknown",
      referer: data.referer || "Direct",
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking exit:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
