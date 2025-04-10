"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { trackPageView } from "@/lib/telegram-service"

// Separate component that uses useSearchParams
function SearchParamsTracker() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    // Only run if searchParams exists and has values
    if (searchParams && searchParams.toString()) {
      try {
        // Check if this is an affiliate link
        const ref = searchParams.get("ref")
        const isAffiliate = !!ref

        // Log affiliate data locally
        console.log("Affiliate data:", {
          isAffiliate,
          ref,
          pathname,
        })

        // Store referrer in localStorage for later use
        if (ref) {
          localStorage.setItem("referrer", `Affiliate: ${ref}`)
        }
      } catch (error) {
        console.error("Failed to track search params:", error)
      }
    }
  }, [searchParams, pathname])

  return null
}

export function Analytics() {
  const pathname = usePathname()
  const [sessionStart] = useState(Date.now())
  const [visitCount, setVisitCount] = useState(0)
  const [country, setCountry] = useState<string | undefined>()
  const [city, setCity] = useState<string | undefined>()
  const [referrer, setReferrer] = useState<string | undefined>()
  const [userIP, setUserIP] = useState<string | undefined>()
  const [browser, setBrowser] = useState<string | undefined>()
  const [os, setOS] = useState<string | undefined>()
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [screenSize, setScreenSize] = useState<string | undefined>()
  const [pageViewSent, setPageViewSent] = useState(false)

  // Get visit count from localStorage and IP address
  useEffect(() => {
    try {
      const storedCount = localStorage.getItem("visitCount")
      const newCount = storedCount ? Number.parseInt(storedCount, 10) + 1 : 1
      setVisitCount(newCount)
      localStorage.setItem("visitCount", newCount.toString())

      // Get referrer if available
      const storedReferrer = localStorage.getItem("referrer")
      if (document.referrer) {
        setReferrer(document.referrer)
      } else if (storedReferrer) {
        setReferrer(storedReferrer)
      }

      // Get device info
      setScreenSize(`${window.screen.width}x${window.screen.height}`)
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
      setBrowser(getBrowser())
      setOS(getOS())

      // First try to get IP from ipify
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => {
          if (data.ip) {
            setUserIP(data.ip)

            // Now get location data using the IP
            return fetch(`https://ipapi.co/${data.ip}/json/`)
          }
          return fetch("https://ipapi.co/json/")
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.country_name) setCountry(data.country_name)
          if (data.city) setCity(data.city)
          if (data.ip && !userIP) setUserIP(data.ip)

          // Send page view with country data
          sendPageView(data.ip, data.country_name, data.city, newCount)
        })
        .catch((err) => {
          console.log("Could not fetch location data:", err)
          // Try direct location API as fallback
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => {
              if (data.country_name) setCountry(data.country_name)
              if (data.city) setCity(data.city)
              if (data.ip) setUserIP(data.ip)

              // Send page view with country data
              sendPageView(data.ip, data.country_name, data.city, newCount)
            })
            .catch((err) => {
              console.log("Could not fetch fallback location data:", err)
              // Still send page view without country data
              sendPageView(undefined, undefined, undefined, newCount)
            })
        })
    } catch (e) {
      console.error("Error accessing localStorage:", e)
    }
  }, [])

  // Function to send page view data
  const sendPageView = async (ip?: string, country?: string, city?: string, visits?: number) => {
    try {
      // Avoid sending duplicate page view notifications
      if (pageViewSent) return
      setPageViewSent(true)

      // Get device info
      const screenSize = typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "Unknown"
      const isMobile = typeof navigator !== "undefined" ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false
      const browser = getBrowser()
      const os = getOS()

      // Send page view data to our tracking function
      await trackPageView({
        path: pathname,
        referer: referrer,
        visitCount: visits || 1,
        ip: ip || userIP || "Unknown",
        country: country || "Unknown",
        city: city || "Unknown",
        userAgent: navigator.userAgent,
        screenSize,
        isMobile,
        browser,
        os,
      }).catch((err) => {
        // Log but don't break the app if tracking fails
        console.log("Analytics tracking error:", err)
      })
    } catch (error) {
      console.log("Analytics tracking skipped:", error)
    }
  }

  // Track when user is about to leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000) // in seconds
        const formattedDuration = formatDuration(sessionDuration)

        // Use navigator.sendBeacon for reliable exit tracking
        if (navigator.sendBeacon) {
          const data = {
            path: pathname,
            sessionDuration,
            formattedDuration,
            ip: userIP,
            country,
            city,
            referer: referrer,
            visitCount,
            browser,
            os,
            action: "Page Exit",
          }

          const blob = new Blob([JSON.stringify(data)], { type: "application/json" })

          navigator.sendBeacon("/api/track-exit", blob)
        }
      } catch (e) {
        console.log("Exit tracking skipped:", e)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [pathname, country, city, referrer, visitCount, sessionStart, userIP, browser, os])

  // Helper function to format duration
  function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds} seconds`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours} hours ${minutes} minutes`
  }

  // Helper functions to detect browser and OS
  function getBrowser() {
    if (typeof navigator === "undefined") return "Unknown"

    const userAgent = navigator.userAgent

    if (userAgent.indexOf("Chrome") > -1) return "Chrome"
    if (userAgent.indexOf("Safari") > -1) return "Safari"
    if (userAgent.indexOf("Firefox") > -1) return "Firefox"
    if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) return "Internet Explorer"
    if (userAgent.indexOf("Edge") > -1) return "Edge"
    if (userAgent.indexOf("Opera") > -1) return "Opera"

    return "Unknown"
  }

  function getOS() {
    if (typeof navigator === "undefined") return "Unknown"

    const userAgent = navigator.userAgent

    if (userAgent.indexOf("Win") > -1) return "Windows"
    if (userAgent.indexOf("Mac") > -1) return "MacOS"
    if (userAgent.indexOf("Linux") > -1) return "Linux"
    if (userAgent.indexOf("Android") > -1) return "Android"
    if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPod") > -1)
      return "iOS"

    return "Unknown"
  }

  return (
    <Suspense fallback={null}>
      <SearchParamsTracker />
    </Suspense>
  )
}
