import { NextResponse } from "next/server"
import { debugTokenGeneration } from "@/lib/telegram-service"

export async function GET() {
  try {
    const debugInfo = await debugTokenGeneration()

    return NextResponse.json({
      success: true,
      token: debugInfo.token,
      timestamp: debugInfo.timestamp,
      currentTime: Date.now(),
      message: "Debug token generated successfully",
    })
  } catch (error) {
    console.error("Error generating debug token:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Error generating debug token",
      },
      { status: 500 },
    )
  }
}
