"use client"

import { motion } from "framer-motion"
import { Gift, Clock, Users } from "lucide-react"
import { ReminderForm } from "@/components/reminder-form"
import { RegisterNowButton } from "./register-now-button"
import { CheckEligibilityButton } from "./check-eligibility-button"

export function AirdropSection() {
  // Set specific date - June 26
  const airdropDate = new Date(new Date().getFullYear(), 5, 26) // Month is 0-indexed, so 5 = June

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="w-full py-24 md:py-32 bg-[#f5f5f7] relative overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block p-4 rounded-full bg-white mb-6">
            <Gift className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">StakeETH Token Airdrop</h2>
          <p className="text-xl text-gray-600">
            Participate in our upcoming airdrop and receive StakeETH tokens for free. Airdrop starts on{" "}
            {formatDate(airdropDate)}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="mb-6 p-4 rounded-full bg-[#f5f5f7] inline-block">
              <Clock className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Countdown to Airdrop</h3>
            <p className="text-gray-600 mb-6">
              Airdrop starts on JUNE 26. Mark your calendar for {formatDate(airdropDate)}.
            </p>
            <div className="mt-auto pt-4">
              <ReminderForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-sm"
          >
            <div className="mb-6 p-4 rounded-full bg-[#f5f5f7] inline-block">
              <Users className="h-6 w-6 text-black" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Eligibility Criteria</h3>
            <ul className="text-gray-600 space-y-3 mb-6">
              <li className="flex items-start">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black mt-2"></span>
                <span>Have at least 0.1 ETH staked on our platform</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black mt-2"></span>
                <span>Hold your stake for at least 30 days</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black mt-2"></span>
                <span>Join our Twitter community</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 h-1.5 w-1.5 rounded-full bg-black mt-2"></span>
                <span>Refer at least one friend to the platform</span>
              </li>
            </ul>
            <div className="mt-auto pt-4">
              <CheckEligibilityButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-black text-white rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Register for Airdrop</h3>
            <p className="text-gray-300 mb-8">
              Pre-register now to secure your spot in our upcoming airdrop and receive bonus tokens.
            </p>
            <RegisterNowButton href="/airdrop" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
