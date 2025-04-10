import { NextResponse } from "next/server"
import { getContractBalance, getUserStakedAmount, calculateUserRewards } from "@/lib/alchemy-service"

export async function GET(request: Request) {
  try {
    // Get the user address from the query parameters
    const { searchParams } = new URL(request.url)
    const userAddress = searchParams.get("address") || "0x0000000000000000000000000000000000000000"

    console.log(`Fetching staking data for user ${userAddress}`)

    // Get data with proper error handling - these functions now return default values on error
    const contractBalance = await getContractBalance()
    const userStake = await getUserStakedAmount(userAddress)
    const userRewards = calculateUserRewards(userStake)

    console.log(
      `API response: Contract balance: ${contractBalance}, User stake: ${userStake}, User rewards: ${userRewards}`,
    )

    // Return the data
    return NextResponse.json({
      userStake,
      contractBalance,
      userRewards,
      apiError: false,
    })
  } catch (error) {
    console.error("Error in get-staking-data API:", error)

    // Return fallback data instead of an error
    return NextResponse.json({
      userStake: "0.000000",
      contractBalance: "0.00",
      userRewards: "0.000000",
      apiError: true,
    })
  }
}
