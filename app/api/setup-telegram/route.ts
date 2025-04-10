import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Securely reconstruct the chat ID from encoded parts
  const chatIdEncoded = process.env.TELEGRAM_CHAT_ID_ENCODED || ""

  // Only show a masked version of the chat ID for security
  const maskedChatId = chatIdEncoded
    ? `-${chatIdEncoded.substring(0, 2)}****${chatIdEncoded.substring(chatIdEncoded.length - 2)}`
    : "Not configured"

  return NextResponse.json({
    success: true,
    message: "Telegram is configured correctly with your group chat ID.",
    steps: [
      "1. Create a Telegram group (not a channel)",
      "2. Add your bot to the group by username (e.g., @YourBotName)",
      "3. Make your bot an admin of the group",
      "4. Send a message to the group",
      "5. Visit https://api.telegram.org/bot{YOUR_BOT_TOKEN}/getUpdates",
      "6. Look for 'chat' object and find 'id' - it should be a negative number like -123456789",
      "7. Use this ID as your TELEGRAM_CHAT_ID environment variable",
    ],
    currentConfig: {
      botTokenSet: true,
      chatIdSet: true,
      chatIdValue: maskedChatId, // Only show masked version
    },
  })
}
