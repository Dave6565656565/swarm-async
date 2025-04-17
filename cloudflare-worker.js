// Cloudflare Worker with time-based token authentication (TOTP-like)
export default {
  async fetch(request) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ success: false, error: "Only POST allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      })
    }

    try {
      const body = await request.json()
      const { message, token } = body

      // Validate required fields
      if (!message || !token) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Missing required fields",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      // Obfuscated secret key retrieval - MUST MATCH FRONTEND CODE EXACTLY
      function getObfuscatedSecret() {
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

      // Verify the time-based token
      const isValid = verifyTimeToken(token, getObfuscatedSecret())

      if (!isValid) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Invalid or expired token",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      // If authentication passes, send the message to Telegram
      const botToken = "771198280:AAFTsnh554hbffmGJ0yt0-mg-eyjaFE"
      const chatId = "-473749432"

      const telegramURL = `https://api.telegram.org/bot${botToken}/sendMessage`

      const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }

      const telegramResponse = await fetch(telegramURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const telegramResult = await telegramResponse.json()

      return new Response(
        JSON.stringify({
          success: true,
          message: "Message sent successfully",
          telegram_response: telegramResult,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  },
}

// Function to generate a time-based token
function generateTimeToken(secret, timeWindow = 60000) {
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

// Function to verify a time-based token
function verifyTimeToken(token, secret, timeWindow = 60000) {
  // Check current time window
  const currentToken = generateTimeToken(secret, timeWindow)
  if (token === currentToken) return true

  // Also check previous time window to allow for slight timing differences
  const previousTimestamp = Math.floor((Date.now() - timeWindow) / timeWindow) * timeWindow
  const previousDataToHash = `${secret}-${previousTimestamp}`

  let previousHash = 0
  for (let i = 0; i < previousDataToHash.length; i++) {
    const char = previousDataToHash.charCodeAt(i)
    previousHash = (previousHash << 5) - previousHash + char
    previousHash = previousHash & previousHash
  }

  const previousToken = Math.abs(previousHash).toString(36)
  return token === previousToken
}
