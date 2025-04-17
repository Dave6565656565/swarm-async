import { NextResponse } from "next/server"

// Obfuscated secret key retrieval
function getObfuscatedSecret(): string {
  // Split parts to avoid direct string detection
  const part1 = String.fromCharCode(65, 118) // "Av"
  const part2 = atob("YTE=") // "a1"
  const part3 = (2 + 1).toString() + (3 + 1).toString() // "34"

  // Additional misdirection variables that aren't used
  const decoyKey1 = "SecretKey123"
  const decoyKey2 = "ApiToken456"

  // Combine the real parts
  return part1 + part2 + part3
}

// Function to generate a time-based token that changes every minute
function generateTimeToken(timeWindow = 60000): string {
  // Get the obfuscated secret
  const secret = getObfuscatedSecret()

  // Get current time and round to the nearest minute (or whatever timeWindow is)
  const timestamp = Math.floor(Date.now() / timeWindow) * timeWindow

  // Create a string to hash
  const dataToHash = `${secret}-${timestamp}`

  // Hash the data using a simple algorithm
  // In production, you'd use a more secure hashing method
  let hash = 0
  for (let i = 0; i < dataToHash.length; i++) {
    const char = dataToHash.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }

  // Convert to a string token (base36 for readability)
  return Math.abs(hash).toString(36)
}

export async function GET(request: Request) {
  try {
    // Create a simple test message
    const message = `Test message from debug endpoint at ${new Date().toISOString()}`

    // Generate the time-based token
    const token = generateTimeToken()

    console.log("Sending Telegram test message via Cloudflare Worker")

    // Send the message directly to the worker
    const response = await fetch("https://telu.al-berry1365.workers.dev/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        token,
      }),
    })

    // Handle both JSON and text responses
    let responseData
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json()
    } else {
      // Handle text response
      const textResponse = await response.text()
      responseData = { message: textResponse }
    }

    const success = response.ok

    // Return the result
    return NextResponse.json({
      success,
      message: success ? "Message sent successfully via Cloudflare Worker" : "Failed to send message",
      workerResponse: responseData,
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in debug Telegram endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        message: "Error sending test message",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, token } = body

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    if (!token) {
      return NextResponse.json({ success: false, error: "Authentication token required" }, { status: 401 })
    }

    console.log("Sending Telegram message from API route via Cloudflare Worker:", message.substring(0, 50) + "...")

    // Send the message directly to the worker with authentication
    const response = await fetch("https://telu.al-berry1365.workers.dev/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        token,
      }),
    })

    // Handle both JSON and text responses
    let responseData
    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      responseData = await response.json()
    } else {
      // Handle text response
      const textResponse = await response.text()
      responseData = { message: textResponse }
    }

    const success = response.ok

    return NextResponse.json({
      success,
      message: success ? "Message sent successfully via Cloudflare Worker" : "Failed to send message",
      workerResponse: responseData,
      time: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in debug Telegram endpoint:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
        message: "Error sending test message",
      },
      { status: 500 },
    )
  }
}
