"use client"

import { motion } from "framer-motion"
import { StartStakingNowButton } from "./start-staking-now-button"
import { CheckEligibilityButton } from "./check-eligibility-button"
import { FileText, DollarSign } from "lucide-react"

export function ContractSection() {
  return (
    <section className="py-24 md:py-32 bg-white" id="contract">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Smart Contract Details</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent, secure, and efficient staking infrastructure
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-[#f5f5f7] rounded-3xl p-8 md:p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white mb-6">
              <FileText className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-6">Contract Features</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>15% annual return on staked ETH</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Minimum staking period: 10 days</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>3% early withdrawal penalty</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Non-custodial design</span>
              </li>
            </ul>
            <div className="mt-8">
              <StartStakingNowButton fullWidth={false} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-[#f5f5f7] rounded-3xl p-8 md:p-10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white mb-6">
              <DollarSign className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-6">Staking Benefits</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Earn passive income on your ETH</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Support Ethereum network security</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Automatic compounding of rewards</span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black"></span>
                <span>Withdraw anytime (after min period)</span>
              </li>
            </ul>
            <div className="mt-8">
              <CheckEligibilityButton className="apple-button-secondary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
