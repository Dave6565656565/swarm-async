"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

export const AnimatedStakingProcess = () => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 p-4 sm:p-6">
      <h3 className="text-xl font-medium mb-6 text-gray-800">How Ethereum Staking Works</h3>

      <div className="relative h-[400px] md:h-[500px]">
        {/* ETH Deposit */}
        <motion.div
          className="absolute top-[10%] left-[5%] w-[20%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <span className="text-3xl text-gray-800">Ξ</span>
          </div>
          <div className="font-medium text-gray-800">32 ETH Deposit</div>
        </motion.div>

        {/* Arrow 1 */}
        <motion.div
          className="absolute top-[15%] left-[26%] w-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
          <div className="absolute right-0 top-[-4px] text-gray-500">
            <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* Validator Activation */}
        <motion.div
          className="absolute top-[10%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Validator</div>
              <div className="text-sm text-gray-800">Activation</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Enters Activation Queue</div>
        </motion.div>

        {/* Arrow 2 Down */}
        <motion.div
          className="absolute top-[32%] left-[52%] h-[15%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} />
          </div>
        </motion.div>

        {/* Active Validation */}
        <motion.div
          className="absolute top-[48%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Active</div>
              <div className="text-sm text-gray-800">Validation</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Proposing & Attesting Blocks</div>
        </motion.div>

        {/* Arrow 3 Right */}
        <motion.div
          className="absolute top-[55%] left-[68%] w-[10%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <div className="h-0.5 w-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
          <div className="absolute right-0 top-[-4px] text-gray-500">
            <ArrowRight size={20} />
          </div>
        </motion.div>

        {/* Rewards */}
        <motion.div
          className="absolute top-[48%] left-[80%] w-[15%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
        >
          <div className="w-16 h-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="font-medium text-gray-800">Staking Rewards</div>
        </motion.div>

        {/* Optional Exit Path */}
        <motion.div
          className="absolute top-[70%] left-[52%] h-[10%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0 }}
        >
          <div className="w-0.5 h-full bg-gradient-to-b from-gray-400 to-gray-500 mx-auto"></div>
          <div className="absolute bottom-0 left-[-4px] text-gray-500">
            <ChevronDown size={20} />
          </div>
        </motion.div>

        {/* Exit & Withdrawal */}
        <motion.div
          className="absolute top-[82%] left-[42%] w-[25%] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
        >
          <div className="w-20 h-20 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-2">
            <div className="text-center">
              <div className="text-sm text-gray-800">Exit &</div>
              <div className="text-sm text-gray-800">Withdrawal</div>
            </div>
          </div>
          <div className="font-medium text-gray-800">Optional</div>
        </motion.div>

        {/* Network Security - Moved to the left side */}
        <motion.div
          className="absolute top-[82%] left-[5%] w-[30%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8 }}
        >
          <div className="w-full h-16 mx-auto rounded-lg bg-gray-50 flex items-center justify-center">
            <div className="flex items-center">
              <div className="text-gray-800 mr-2">Network Security</div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-500 to-gray-400 relative">
                <motion.div
                  className="absolute -top-1.5 w-3 h-3 rounded-full bg-emerald-500"
                  animate={{ x: [0, 96, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                />
              </div>
              <div className="text-emerald-600 ml-2">Ethereum Blockchain</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnimatedStakingProcess
