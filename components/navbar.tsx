"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectWallet } from "@/components/connect-wallet"
import { Menu, X, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useWeb3 } from "@/components/web3-provider"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isConnected, address, balance } = useWeb3()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    { href: "/", label: "StakeETH" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/presale", label: "Presale" },
    { href: "/affiliate", label: "Affiliate" },
    { href: "/calculator", label: "Calculator" },
    { href: "/airdrop", label: "Airdrop" },
    { href: "/articles", label: "Articles" },
  ]

  // Format ETH balance if connected
  const formattedBalance = isConnected && balance ? `${Number(balance).toFixed(4)} ETH` : null

  return (
    <header
      className={`sticky top-0 z-50 w-full apple-nav transition-all duration-300 ${
        isScrolled ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="max-w-[1024px] mx-auto flex h-12 md:h-14 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/favcoin.png"
              alt="StakeETH Logo"
              width={20}
              height={20}
              className="rounded-full"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`apple-nav-link ${pathname === route.href ? "text-black font-medium" : "text-gray-600"}`}
                >
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <Search className="h-4 w-4 text-gray-600 cursor-pointer hover:text-black transition-colors" />
          {isConnected && formattedBalance && (
            <span className="text-sm font-medium text-gray-700 mr-1">{formattedBalance}</span>
          )}
          <ConnectWallet />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden px-4 py-5 apple-nav border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col gap-5">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-base ${pathname === route.href ? "text-black font-medium" : "text-gray-600"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
              {isConnected && formattedBalance && (
                <div className="text-sm font-medium text-gray-700 pt-2">{formattedBalance}</div>
              )}
              <div className="pt-4 mt-2 border-t border-gray-200">
                <ConnectWallet />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
