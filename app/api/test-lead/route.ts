import { NextResponse } from "next/server"
import { handleLeadSubmission } from "@/lib/telegram-service"

export async function GET(request: Request) {
  try {
    // Create a test lead
    const testEmail = "test@example.com"

    console.log("Sending test lead with email:", testEmail)

    // Use the lead handling function
    const success = await handleLeadSubmission({
      email: testEmail,
      name: "Test User",
      source: "Test API",
      page: "/api/test-lead",
      additionalInfo: "This is a test lead submission",
    })

    console.log("Test lead submission result:", success)

    return NextResponse.json({
      success,
      message: success ? "Test lead submitted successfully" : "Failed to submit test lead",
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in test lead endpoint:", error)
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
