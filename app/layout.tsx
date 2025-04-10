import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Web3Provider } from "@/components/web3-provider"
import { StructuredData } from "@/components/structured-data"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

export const metadata = {
  title: "StakeETH | Ethereum Staking Simplified",
  description:
    "Stake your ETH and earn rewards with our secure staking platform. The most trusted Ethereum staking service with flexible terms and low fees.",
  keywords:
    "ethereum staking, eth staking, staking rewards, eth 2.0, passive income, crypto staking, staking platform, high apy staking",
  authors: [{ name: "StakeETH Team" }],
  creator: "StakeETH",
  publisher: "StakeETH",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stakeeth.com",
    title: "StakeETH | Ethereum Staking Simplified",
    description:
      "Stake your ETH and earn rewards with our secure staking platform. The most trusted Ethereum staking service with flexible terms and low fees.",
    siteName: "StakeETH",
    images: [
      {
        url: "/images/favcoin.png",
        width: 512,
        height: 512,
        alt: "StakeETH Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StakeETH | Ethereum Staking Simplified",
    description:
      "Stake your ETH and earn rewards with our secure staking platform. The most trusted Ethereum staking service with flexible terms and low fees.",
    creator: "@stakeeth",
    images: ["/images/favcoin.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/images/favcoin.png" },
    ],
    apple: { url: "/images/favcoin.png" },
    shortcut: { url: "/favicon.ico" },
  },
  metadataBase: new URL("https://stakeeth.com"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favcoin.png" type="image/png" />

        {/* Google-specific favicons */}
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" type="image/png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/images/favcoin.png" />

        {/* Web App Manifest - Google uses this for search results */}
        <link rel="manifest" href="/manifest.json" />

        <StructuredData />
      </head>
      <body className="bg-white min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Web3Provider>
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen relative bg-white">
                <Navbar />
                <main className="flex-1 w-full mx-auto bg-white">{children}</main>
                <Footer />
              </div>
            </ErrorBoundary>
          </Web3Provider>
        </ThemeProvider>
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}


import './globals.css'