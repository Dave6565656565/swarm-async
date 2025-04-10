"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWeb3 } from "@/hooks/use-web3"

export function WalletConnectAnimation() {
  const { isConnected } = useWeb3()
  const [showAnimation, setShowAnimation] = useState(false)
  const [previousConnectionState, setPreviousConnectionState] = useState(false)

  useEffect(() => {
    // Only show animation when connection state changes from false to true
    if (isConnected && !previousConnectionState) {
      setShowAnimation(true)

      // Hide animation after 3 seconds
      const timer = setTimeout(() => {
        setShowAnimation(false)
      }, 3000)

      return () => clearTimeout(timer)
    }

    setPreviousConnectionState(isConnected)
  }, [isConnected, previousConnectionState])

  if (!showAnimation) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => setShowAnimation(false)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse-glow flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              >
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2L18 6V18L12 22L6 18V6L12 2Z"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7C3AED" />
                      <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center w-64"
          >
            <h3 className="text-xl font-bold neon-text mb-1">Wallet Connected!</h3>
            <p className="text-sm text-muted-foreground">You can now stake your ETH</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
