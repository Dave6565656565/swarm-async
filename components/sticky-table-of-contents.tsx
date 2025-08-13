"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface StickyTableOfContentsProps {
  headings?: TOCItem[]
}

export function StickyTableOfContents({ headings = [] }: StickyTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0% -35% 0%",
      },
    )

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Show TOC after scrolling past hero section
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  if (!isVisible || headings.length === 0) {
    return null
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Table of Contents</h3>
        <nav className="space-y-1">
          {headings.map(({ id, title, level }) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={`
                flex items-center w-full text-left text-sm transition-colors duration-200
                ${level === 2 ? "pl-0" : level === 3 ? "pl-4" : "pl-8"}
                ${activeId === id ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
              `}
            >
              <ChevronRight
                className={`
                  w-3 h-3 mr-1 transition-transform duration-200
                  ${activeId === id ? "rotate-90 text-blue-600" : "text-gray-400"}
                `}
              />
              <span className="truncate">{title}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default StickyTableOfContents
