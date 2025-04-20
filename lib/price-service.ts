// Cache mechanism for cryptocurrency prices and logos
type PriceCache = {
  prices: Record<string, number>
  logos: Record<string, string>
  timestamp: number
}

// Initialize cache
const priceCache: PriceCache = {
  prices: {},
  logos: {},
  timestamp: 0,
}

// Map of cryptocurrency symbols to CoinGecko IDs
const symbolToId: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  USDC: "usd-coin",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  ADA: "cardano",
  AVAX: "avalanche-2",
  DOGE: "dogecoin",
  DOT: "polkadot",
  LINK: "chainlink",
  MATIC: "matic-network",
  UNI: "uniswap",
  LTC: "litecoin",
  SHIB: "shiba-inu",
  ATOM: "cosmos",
  XLM: "stellar",
  FIL: "filecoin",
  TRX: "tron",
}

// Fallback prices if API fails
export const FALLBACK_PRICES: Record<string, number> = {
  BTC: 66789.42,
  ETH: 3245.18,
  USDT: 1.0,
  USDC: 1.0,
  BNB: 591.53,
  SOL: 138.97,
  XRP: 0.51,
  ADA: 0.45,
  AVAX: 35.27,
  DOGE: 0.15763,
  DOT: 6.82,
  LINK: 15.23,
  MATIC: 0.72,
  UNI: 8.45,
  LTC: 82.31,
  SHIB: 0.00002345,
  ATOM: 8.76,
  XLM: 0.11,
  FIL: 5.32,
  TRX: 0.12,
}

/**
 * Fetches cryptocurrency data (prices and logos) from CoinGecko API with caching
 * @param symbols Array of cryptocurrency symbols to fetch data for
 * @returns Object containing prices and logos for the requested symbols
 */
export async function fetchCryptoData(symbols: string[]): Promise<{
  prices: Record<string, number>
  logos: Record<string, string>
}> {
  const now = Date.now()
  const cacheDuration = 5 * 60 * 1000 // 5 minutes cache duration

  // Check if we have valid cached data for all requested symbols
  if (priceCache.timestamp > now - cacheDuration) {
    const cachedPrices: Record<string, number> = {}
    const cachedLogos: Record<string, string> = {}
    let allCached = true

    symbols.forEach((symbol) => {
      const upperSymbol = symbol.toUpperCase()
      if (priceCache.prices[upperSymbol] !== undefined) {
        cachedPrices[upperSymbol] = priceCache.prices[upperSymbol]
        cachedLogos[upperSymbol] = priceCache.logos[upperSymbol] || ""
      } else {
        allCached = false
      }
    })

    if (allCached) {
      return { prices: cachedPrices, logos: cachedLogos }
    }
  }

  try {
    // Convert symbols to CoinGecko IDs
    const ids = symbols
      .map((symbol) => {
        const upperSymbol = symbol.toUpperCase()
        return symbolToId[upperSymbol] || symbol.toLowerCase()
      })
      .filter(Boolean)
      .join(",")

    if (!ids) {
      throw new Error("No valid cryptocurrency IDs to fetch")
    }

    // Fetch data from CoinGecko
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Map CoinGecko response back to our symbols
    const prices: Record<string, number> = {}
    const logos: Record<string, string> = {}

    // First, create a reverse mapping from ID to symbol
    const idToSymbol: Record<string, string> = {}
    Object.entries(symbolToId).forEach(([symbol, id]) => {
      idToSymbol[id] = symbol
    })

    // Then map the prices and logos
    data.forEach((coin: any) => {
      const symbol = idToSymbol[coin.id] || coin.symbol.toUpperCase()
      prices[symbol] = coin.current_price || 0
      logos[symbol] = coin.image || ""
    })

    // Update cache with new data
    priceCache.prices = { ...priceCache.prices, ...prices }
    priceCache.logos = { ...priceCache.logos, ...logos }
    priceCache.timestamp = now

    return { prices, logos }
  } catch (error) {
    console.error("Failed to fetch cryptocurrency data:", error)

    // Fallback to cached or static prices and empty logos
    return {
      prices: symbols.reduce(
        (acc, symbol) => {
          const upperSymbol = symbol.toUpperCase()
          acc[upperSymbol] = priceCache.prices[upperSymbol] || FALLBACK_PRICES[upperSymbol] || 0
          return acc
        },
        {} as Record<string, number>,
      ),
      logos: symbols.reduce(
        (acc, symbol) => {
          const upperSymbol = symbol.toUpperCase()
          acc[upperSymbol] = priceCache.logos[upperSymbol] || ""
          return acc
        },
        {} as Record<string, string>,
      ),
    }
  }
}

/**
 * Gets the local logo URL for a cryptocurrency
 * @param symbol Cryptocurrency symbol
 * @returns URL to the cryptocurrency logo
 */
export function getLocalLogoUrl(symbol: string): string {
  const lowerSymbol = symbol.toLowerCase()
  // Return direct path to the image in public folder
  return `/images/crypto/${lowerSymbol}.png`
}

// Map of symbols to local image availability
export const LOCAL_LOGOS: Record<string, boolean> = {
  btc: true,
  eth: true,
  bnb: true,
  sol: true,
  xrp: true,
  ada: true,
  doge: true,
  dot: true,
  usdt: true,
}
