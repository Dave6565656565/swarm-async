"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Crown, TrendingUp, Users } from "lucide-react"

interface Affiliate {
  id: number
  username: string
  earnings: number
  referrals: number
  dailyChange: number
}

export function TopAffiliatesTable() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isExpanded, setIsExpanded] = useState(false)

  // Generate initial affiliate data
  useEffect(() => {
    const generateAffiliates = () => {
      const newAffiliates: Affiliate[] = []

      // Generate top 10 affiliates with decreasing earnings
      for (let i = 0; i < 10; i++) {
        // Calculate base earnings - top earner gets ~$7000, and it decreases for others
        const baseEarnings = Math.round((7000 / (i + 1)) * (1 + Math.random() * 0.2 - 0.1))

        // Calculate referrals - roughly proportional to earnings
        const referrals = Math.round(baseEarnings / (70 + Math.random() * 30))

        // Random daily change (up to $200)
        const dailyChange = Math.round(Math.random() * Math.min(200, baseEarnings * 0.05))

        newAffiliates.push({
          id: i + 1,
          username: getRandomEthAddress(),
          earnings: baseEarnings,
          referrals: referrals,
          dailyChange: dailyChange,
        })
      }

      setAffiliates(newAffiliates)
      setLastUpdated(new Date())
    }

    generateAffiliates()

    // Simulate daily updates
    const interval = setInterval(() => {
      setAffiliates((prev) =>
        prev.map((affiliate) => {
          // Random daily increase (up to $200)
          const increase = Math.round(Math.random() * 200)
          return {
            ...affiliate,
            earnings: affiliate.earnings + increase,
            referrals: affiliate.referrals + Math.round(increase / 100),
            dailyChange: increase,
          }
        }),
      )
      setLastUpdated(new Date())
    }, 86400000) // 24 hours in milliseconds

    return () => clearInterval(interval)
  }, [])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Replace the getRandomUsername function with this function to generate random ETH addresses
  function getRandomEthAddress(): string {
    let address = "0x"
    const characters = "0123456789abcdef"

    // Generate 40 random hex characters
    for (let i = 0; i < 40; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return address
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // Show only top 3 affiliates when collapsed
  const displayedAffiliates = isExpanded ? affiliates : affiliates.slice(0, 3)

  return (
    <Card
      className={`glassmorphism neon-border overflow-hidden cursor-pointer transition-all duration-300 ease-in-out ${
        isExpanded ? "opacity-100 scale-100" : "opacity-60 scale-50 hover:opacity-80"
      }`}
      onClick={toggleExpand}
      style={{
        transformOrigin: "top center",
        maxWidth: isExpanded ? "100%" : "50%",
        margin: isExpanded ? "0 auto" : "0 auto",
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-yellow-400" />
          Top Affiliates Leaderboard
        </CardTitle>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <div className="text-xs text-muted-foreground">Last updated: {lastUpdated.toLocaleString()}</div>
          )}
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-black/20 hover:bg-black/30">
                <TableHead className="w-12 text-center">Rank</TableHead>
                <TableHead>Username</TableHead>
                <TableHead className="text-right">Referrals</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead className="text-right">Daily Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedAffiliates.map((affiliate, index) => (
                <TableRow
                  key={affiliate.id}
                  className={`
                    ${index === 0 ? "bg-yellow-500/10 hover:bg-yellow-500/20" : ""}
                    ${index === 1 ? "bg-gray-400/10 hover:bg-gray-400/20" : ""}
                    ${index === 2 ? "bg-amber-700/10 hover:bg-amber-700/20" : ""}
                  `}
                >
                  <TableCell className="text-center font-medium">
                    {index === 0 ? (
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">1</Badge>
                    ) : index === 1 ? (
                      <Badge className="bg-gray-400 hover:bg-gray-500">2</Badge>
                    ) : index === 2 ? (
                      <Badge className="bg-amber-700 hover:bg-amber-800">3</Badge>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {`${affiliate.username.substring(0, 6)}...${affiliate.username.substring(affiliate.username.length - 4)}`}
                    {index < 3 && <span className="ml-2">{index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}</span>}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {affiliate.referrals}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(affiliate.earnings)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-emerald-500">
                      <TrendingUp className="h-3 w-3" />
                      {formatCurrency(affiliate.dailyChange)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {!isExpanded && <div className="text-center text-sm text-muted-foreground mt-2">Click to expand</div>}
      </CardContent>
    </Card>
  )
}
