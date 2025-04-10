import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function shortenAddress(address: string | null | undefined, chars = 4): string {
  if (!address) return ""
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
