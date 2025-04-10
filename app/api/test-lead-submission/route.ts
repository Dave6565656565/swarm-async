import { NextResponse } from "next/server"
import { handleLeadSubmission } from "@/lib/telegram-service"

export async function GET(request: Request) {
  try {
    // Create a test lead
    const testEmail = "test@example.com"
    const timestamp = new Date().toISOString()

    console.log("Testing lead submission with email:", testEmail)

    // Use the lead handling function
    const success = await handleLeadSubmission({
      email: testEmail,
      name: "Test User",
      source: "Test Lead API",
      page: "/api/test-lead-submission",
      additionalInfo: `This is a test lead submission at ${timestamp}`,
    })

    return NextResponse.json({
      success,
      message: success ? "Test lead submitted successfully" : "Failed to submit test lead",
      time: timestamp,
    })
  } catch (error) {
    console.error("Error in test lead submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error submitting test lead",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
