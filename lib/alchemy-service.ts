import { JsonRpcProvider, Contract, formatEther } from "ethers"

// Use the provided Alchemy RPC URL
const ALCHEMY_RPC_URL =
  process.env.ALCHEMY_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/agkBiWQgYaryegymSwFYXbzO6mJ7V26R"

// Create provider correctly for ethers v6
const getProvider = () => {
  try {
    return new JsonRpcProvider(ALCHEMY_RPC_URL)
  } catch (error) {
    console.error("Failed to create provider:", error)
    // Return a fallback provider
    return new JsonRpcProvider("https://eth.llamarpc.com")
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
    return new Contract(stakingAddress, stakingAbi, provider)
  } catch (error) {
    console.error("Failed to create contract:", error)
    throw new Error("Failed to initialize contract")
  }
}

export async function getUserStakedAmount(userAddress: string): Promise<string> {
  try {
    const contract = getContract()
    const raw = await contract.getStakingBalance(userAddress)
    return formatEther(raw)
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
    return formatEther(raw)
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
