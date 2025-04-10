"use client"

import { useEffect, useRef } from "react"
import { createEthereumModel } from "@/lib/three-utils"

export function Ethereum3DModel() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create and start the 3D model
    const cleanup = createEthereumModel(containerRef.current)

    // Clean up on unmount
    return cleanup
  }, [])

  return <div ref={containerRef} className="w-full h-[300px] md:h-[400px]" aria-hidden="true" />
}
