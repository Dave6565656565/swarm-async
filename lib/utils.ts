import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export function truncateAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address) return ""
  if (address.length <= startLength + endLength) return address
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`
}

export function getEtherscanLink(address: string, type: "address" | "tx" = "address"): string {
  if (!address) return ""

  // Use mainnet by default
  const baseUrl = "https://etherscan.io"

  if (type === "address") {
    return `${baseUrl}/address/${address}`
  } else if (type === "tx") {
    return `${baseUrl}/tx/${address}`
  }

  return ""
}

export function formatEther(wei: bigint | string | number): string {
  const weiValue = typeof wei === "bigint" ? wei : BigInt(String(wei))
  const etherValue = Number(weiValue) / 1e18
  return etherValue.toFixed(6)
}

export function parseEther(ether: string | number): bigint {
  const etherValue = typeof ether === "string" ? Number.parseFloat(ether) : ether
  const weiValue = BigInt(Math.floor(etherValue * 1e18))
  return weiValue
}
