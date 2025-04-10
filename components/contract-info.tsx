"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function ContractInfo() {
  const { isConnected, address } = useWeb3()
  const [contractBalance, setContractBalance] = useState<string>("0")
  const [userStake, setUserStake] = useState<string>("0")
  const [userReward, setUserReward] = useState<string>("0")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dataFetched, setDataFetched] = useState<boolean>(false)
  const [retryCount, setRetryCount] = useState<number>(0)

  const CONTRACT_ADDRESS = "0xcA8d23D51eDD65Fe70ee20dcd97B816424ec49A8"

  // Load ethers.js from CDN
  useEffect(() => {
    if (typeof window !== "undefined" && !window.ethers) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  // Fetch contract data using our API endpoint - but only once
  useEffect(() => {
    async function fetchData() {
      // Skip if we already have data
      if (dataFetched && userStake !== "0.000000" && userStake !== "0") {
        console.log("Using existing data, skipping fetch")
        return
      }

      setIsLoading(true)

      try {
        // Construct the API URL
        const apiUrl =
          isConnected && address
            ? `/api/get-staking-data?address=${address}`
            : `/api/get-staking-data?address=0x0000000000000000000000000000000000000000`

        // Call our API endpoint to get staking data
        const response = await fetch(apiUrl)

        if (!response.ok) {
          console.error(`API request failed with status ${response.status}`)
          setIsLoading(false)
          return
        }

        const data = await response.json()
        console.log("Staking data from API:", data)

        // Only update state if we got non-zero values or don't have data yet
        if (
          !dataFetched ||
          (data.userStake && data.userStake !== "0" && data.userStake !== "0.000000") ||
          (data.contractBalance && data.contractBalance !== "0" && data.contractBalance !== "0.00")
        ) {
          setUserStake(data.userStake || userStake)
          setUserReward(data.userRewards || userReward)
          setContractBalance(data.contractBalance || contractBalance)
          setDataFetched(true)
        }
      } catch (error) {
        console.log("Error fetching data, using existing values")
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch if connected and we don't have data yet
    if (isConnected && address && (!dataFetched || userStake === "0" || userStake === "0.000000")) {
      fetchData()
    }

    // No interval for automatic refreshing
  }, [isConnected, address, dataFetched, userStake, userReward, contractBalance])

  // Try to get staking balance directly from contract using MetaMask - but only once
  useEffect(() => {
    async function getStakingBalanceDirectly() {
      // Skip if we already have data
      if (dataFetched && userStake !== "0.000000" && userStake !== "0") {
        return
      }

      if (!isConnected || !address || typeof window === "undefined" || !window.ethers || !window.ethereum) {
        return
      }

      try {
        const abi = [
          {
            inputs: [{ internalType: "address", name: "_user", type: "address" }],
            name: "getStakingBalance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
          },
        ]

        // Use MetaMask provider with "any" network
        const provider = new window.ethers.providers.Web3Provider(window.ethereum, "any")
        await provider.ready // Make sure provider is ready

        const contract = new window.ethers.Contract(CONTRACT_ADDRESS, abi, provider)

        try {
          const balance = await contract.getStakingBalance(address)
          const balanceEth = window.ethers.utils.formatEther(balance)
          console.log(`Direct contract call result: ${balanceEth} ETH`)

          // Update state if we got a valid balance
          if (Number.parseFloat(balanceEth) > 0) {
            setUserStake(Number.parseFloat(balanceEth).toFixed(6))

            // Calculate rewards
            const annualReward = Number.parseFloat(balanceEth) * 0.15
            const dailyReward = annualReward / 365
            const monthlyReward = dailyReward * 30
            setUserReward(monthlyReward.toFixed(6))
            setDataFetched(true)
          }
        } catch (error) {
          console.error("Error calling contract directly:", error)

          // Try fallback to public RPC if MetaMask fails
          try {
            const fallbackProvider = new window.ethers.providers.JsonRpcProvider("https://eth.llamarpc.com")
            const fallbackContract = new window.ethers.Contract(CONTRACT_ADDRESS, abi, fallbackProvider)
            const fallbackBalance = await fallbackContract.getStakingBalance(address)
            const fallbackBalanceEth = window.ethers.utils.formatEther(fallbackBalance)
            console.log(`User stake from fallback: ${fallbackBalanceEth} ETH`)

            if (Number.parseFloat(fallbackBalanceEth) > 0) {
              setUserStake(Number.parseFloat(fallbackBalanceEth).toFixed(6))

              // Calculate rewards
              const annualReward = Number.parseFloat(fallbackBalanceEth) * 0.15
              const dailyReward = annualReward / 365
              const monthlyReward = dailyReward * 30
              setUserReward(monthlyReward.toFixed(6))
              setDataFetched(true)
            }
          } catch (fallbackError) {
            console.error("Error with fallback provider:", fallbackError)
          }
        }
      } catch (error) {
        console.error("Error in direct contract call:", error)
      }
    }

    // Only try direct contract call if connected and we don't have data yet
    if (isConnected && address && (!dataFetched || userStake === "0" || userStake === "0.000000")) {
      getStakingBalanceDirectly()
    }
  }, [isConnected, address, dataFetched, userStake])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="glassmorphism neon-border overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>StakeETH Contract</span>
            <a
              href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center"
            >
              View on Etherscan <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && !dataFetched ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Contract Address</div>
                  <div className="text-sm font-mono truncate">{CONTRACT_ADDRESS}</div>
                </div>

                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Total ETH Staked</div>
                  <div className="text-xl font-bold">{contractBalance} ETH</div>
                </div>

                <div className="p-4 rounded-lg glassmorphism">
                  <div className="text-sm text-muted-foreground">Annual ROI</div>
                  <div className="text-xl font-bold text-green-500">15%</div>
                </div>
              </div>

              {isConnected && (
                <div className="p-4 rounded-lg glassmorphism">
                  <h3 className="text-lg font-medium mb-4">Your Staking Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Your Stake</div>
                      <div className="text-xl font-bold">{userStake} ETH</div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground">Current Rewards</div>
                      <div className="text-xl font-bold text-green-500">{userReward} ETH</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Stake More
                    </Button>
                    <Button variant="outline" className="w-full glassmorphism border-none">
                      Withdraw
                    </Button>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-lg glassmorphism text-sm text-muted-foreground">
                <h3 className="font-medium mb-2">Contract Details</h3>
                <ul className="space-y-1">
                  <li>• 15% annual return on staked ETH</li>
                  <li>• Minimum staking period: 10 days</li>
                  <li>• 3% early withdrawal penalty (if withdrawn before 1 year)</li>
                  <li>• Secure, audited smart contract</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
