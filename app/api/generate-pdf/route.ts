import { type NextRequest, NextResponse } from "next/server"
import puppeteer from "puppeteer"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const article = searchParams.get("article")

    if (!article) {
      return NextResponse.json({ error: "Article parameter is required" }, { status: 400 })
    }

    // Get the base URL from environment variable with fallback
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (request.headers.get("host") ? `https://${request.headers.get("host")}` : "http://localhost:3000")

    // URL to render
    const url = `${baseUrl}/articles/${article}`

    console.log(`Generating PDF for: ${url}`)

    // Launch browser with more robust options
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    })

    try {
      const page = await browser.newPage()

      // Set a reasonable timeout
      page.setDefaultNavigationTimeout(30000)

      // Set viewport for a good PDF size
      await page.setViewport({ width: 1200, height: 800 })

      // Navigate to the article with more robust wait conditions
      await page.goto(url, {
        waitUntil: ["networkidle0", "domcontentloaded"],
        timeout: 30000,
      })

      // Wait a bit to ensure all content is fully loaded
      await page.waitForTimeout(2000)

      // Optional: Remove elements you don't want in the PDF
      await page.evaluate(() => {
        const elementsToRemove = document.querySelectorAll("nav, footer, button, .share-buttons, .mobile-only")
        elementsToRemove.forEach((el) => el.remove())
      })

      // Generate PDF with more specific options
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
        preferCSSPageSize: true,
      })

      return new NextResponse(pdf, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${article}.pdf"`,
        },
      })
    } finally {
      // Ensure browser is closed even if there's an error
      await browser.close()
    }
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF", details: String(error) }, { status: 500 })
  }
}
