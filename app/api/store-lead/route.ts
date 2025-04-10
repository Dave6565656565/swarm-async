import { NextResponse } from "next/server"

// In a real application, you would use a database
// This is a simple file-based storage for demonstration purposes

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Add timestamp
    const leadData = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // In a serverless environment, we can't reliably write to the filesystem
    // This is just for demonstration - in production use a database
    console.log("LEAD_DATA_TO_STORE:", leadData)

    // Simulate storing to database
    const success = true

    if (!success) {
      return NextResponse.json({ success: false, message: "Failed to store lead data" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Lead data stored successfully" })
  } catch (error) {
    console.error("Error storing lead:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
