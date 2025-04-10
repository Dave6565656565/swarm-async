import { ethers } from "ethers"

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ""
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL || `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

// ABI for ERC20 token balance
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
]

// Common tokens to check (addresses)
const COMMON_TOKENS = {
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  DAI: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
}

// Use the provided Alchemy RPC URL
// const ALCHEMY_RPC_URL =
//   process.env.ALCHEMY_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/agkBiWQgYaryegymSwFYXbzO6mJ7V26R"

// Create provider correctly for ethers v6
const getProvider = () => {
  try {
    return new ethers.JsonRpcProvider(ALCHEMY_RPC_URL)
  } catch (error) {
    console.error("Failed to create provider:", error)
    // Return a fallback provider
    return new ethers.JsonRpcProvider("https://eth.llamarpc.com")
  }
}

// Staking contract info
const stakingAddress = "0xcA8d23D51eDD65Fe70ee20dcd97B816424ec49A8"

const stakingAbi = [
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getStakingBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
]

// Get contract with error handling
const getContract = () => {
  try {
    const provider = getProvider()
    return new ethers.Contract(stakingAddress, stakingAbi, provider)
  } catch (error) {
    console.error("Failed to create contract:", error)
    throw new Error("Failed to initialize contract")
  }
}

export async function getUserStakedAmount(userAddress: string): Promise<string> {
  try {
    const contract = getContract()
    const raw = await contract.getStakingBalance(userAddress)
    return ethers.formatEther(raw)
  } catch (err) {
    console.error("Error in getUserStakedAmount:", err)
    // Return a default value instead of throwing
    return "0.000000"
  }
}

export async function getContractBalance(): Promise<string> {
  try {
    const contract = getContract()
    const raw = await contract.getContractBalance()
    return ethers.formatEther(raw)
  } catch (err) {
    console.error("Error in getContractBalance:", err)
    // Return a default value instead of throwing
    return "0.00"
  }
}

// Calculate user rewards
export function calculateUserRewards(stakeAmount: string): string {
  try {
    // Calculate rewards (15% APY)
    const stake = Number.parseFloat(stakeAmount)
    const annualReward = stake * 0.15
    const dailyReward = annualReward / 365
    const monthlyReward = dailyReward * 30 // 30 days of rewards

    console.log(`Calculated rewards: ${monthlyReward.toFixed(6)} ETH (from stake: ${stakeAmount})`)
    return monthlyReward.toFixed(6)
  } catch (error) {
    console.error("Error calculating rewards:", error)
    return "0.000000"
  }
}

// Function to get ETH balance
export async function getEthBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URL)
    const balance = await provider.getBalance(address)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error("Error fetching ETH balance:", error)
    return "0"
  }
}

// Function to get token balance
async function getTokenBalance(
  tokenAddress: string,
  walletAddress: string,
  provider: ethers.JsonRpcProvider,
): Promise<{ symbol: string; balance: string }> {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider)
    const balance = await tokenContract.balanceOf(walletAddress)
    const decimals = await tokenContract.decimals()
    const symbol = await tokenContract.symbol()

    const formattedBalance = ethers.formatUnits(balance, decimals)
    return { symbol, balance: formattedBalance }
  } catch (error) {
    console.error(`Error fetching token balance for ${tokenAddress}:`, error)
    return { symbol: "UNKNOWN", balance: "0" }
  }
}

// Function to fetch all token balances
export async function fetchTokenBalances(address: string): Promise<Record<string, string>> {
  try {
    const provider = new ethers.JsonRpcProvider(ALCHEMY_RPC_URL)
    const ethBalance = await getEthBalance(address)

    const balances: Record<string, string> = { ETH: ethBalance }

    // Fetch token balances in parallel
    const tokenPromises = Object.entries(COMMON_TOKENS).map(([symbol, tokenAddress]) =>
      getTokenBalance(tokenAddress, address, provider),
    )

    const tokenResults = await Promise.all(tokenPromises)

    // Add non-zero balances to the result
    for (const { symbol, balance } of tokenResults) {
      if (Number.parseFloat(balance) > 0) {
        balances[symbol] = balance
      }
    }

    return balances
  } catch (error) {
    console.error("Error fetching token balances:", error)
    return { ETH: "0" }
  }
}

// Get token balances for a user
export async function getTokenBalances(userAddress: string): Promise<Record<string, string>> {
  return fetchTokenBalances(userAddress)
}
