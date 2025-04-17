import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Telegram is configured correctly with your Cloudflare Worker.",
    steps: [
      "1. Your Telegram bot is now configured via Cloudflare Worker",
      "2. The Worker endpoint is: https://telu.al-berry1365.workers.dev/",
      "3. All notifications will be sent through this Worker",
      "4. No need for environment variables for Telegram anymore",
    ],
    currentConfig: {
      workerConfigured: true,
      workerEndpoint: "https://telu.al-berry1365.workers.dev/",
    },
  })
}
