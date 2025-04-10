"use client"

import Link from "next/link"
import { MiniCalculator } from "@/components/mini-calculator"
import { Ethereum3DModel } from "@/components/ethereum-3d-model"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 bg-white overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-4"
          >
            Stake with confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8"
          >
            Earn 15% APY on your ETH. Secure, transparent, and rewarding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link href="/dashboard" className="apple-button">
              Start Staking
            </Link>
            <Link href="#features" className="apple-button-secondary">
              Learn More
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="aspect-[16/9] w-full relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Ethereum3DModel />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          <div className="max-w-sm w-full">
            <MiniCalculator />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
