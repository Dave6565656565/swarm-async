import { NextResponse } from "next/server"
import { handleLeadSubmission, hasIPSubmitted } from "@/lib/telegram-service"

// Ethereum address validation regex
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

export async function POST(request: Request) {
  try {
    const { email, walletAddress, telegramUsername, twitterUsername } = await request.json()

    // Validate wallet address format
    if (!walletAddress || !ETH_ADDRESS_REGEX.test(walletAddress)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid Ethereum wallet address",
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

    console.log("Processing airdrop signup:", email)

    // Use the lead handling function
    const success = await handleLeadSubmission({
      email,
      additionalInfo: `Wallet: ${walletAddress}${telegramUsername ? `, Telegram: ${telegramUsername}` : ""}${twitterUsername ? `, Twitter: ${twitterUsername}` : ""}`,
      source: "Airdrop Registration",
      page: referer,
      ip,
      userAgent,
      referer,
    })

    // Return appropriate response
    if (success) {
      return NextResponse.json({ success: true, message: "Registration submitted successfully" })
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
    console.error("Error in airdrop signup:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
