import { NextResponse } from "next/server"
import { hasIPSubmitted } from "@/lib/telegram-service"

export async function POST(request: Request) {
  try {
    const { ip } = await request.json()

    if (!ip) {
      return NextResponse.json(
        {
          success: false,
          message: "IP address is required",
        },
        { status: 400 },
      )
    }

    const hasSubmitted = await hasIPSubmitted(ip)

    if (hasSubmitted) {
      return NextResponse.json(
        {
          success: false,
          error: "duplicate",
          message: "This IP has already submitted",
        },
        { status: 429 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "IP has not submitted yet",
    })
  } catch (error) {
    console.error("Error checking IP:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}
