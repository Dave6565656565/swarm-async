"use client"

import Link from "next/link"
import { Github, Slack } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-12 px-6 md:px-8 bg-[#f5f5f7] border-t border-gray-200">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">StakeETH</h3>
            <p className="text-xs text-gray-600">
              The most trusted Ethereum staking platform with high APY and flexible terms.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://x.com/Stakeethportal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://github.com/ethereum/solidity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://eth-eng-group.slack.com/join/shared_invite/zt-48ggg3kk-bUT3PWRn16hCpFclbcZrvQ#/shared-invite/email"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Slack className="h-4 w-4" />
                <span className="sr-only">Slack</span>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/presale" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Presale
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/articles/what-is-ethereum-staking"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  What is Ethereum Staking
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/staking-vs-mining"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Staking vs Mining
                </Link>
              </li>
              <li>
                <Link
                  href="/articles/eth-staking-rewards"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ETH Staking Rewards
                </Link>
              </li>
              <li>
                <Link href="/articles/staking-risks" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Staking Risks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-600">&copy; {currentYear} StakeETH. All rights reserved.</p>
          <p className="text-xs text-gray-600 mt-4 md:mt-0">Made for the Ethereum community</p>
        </div>
      </div>
    </footer>
  )
}
