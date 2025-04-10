import { Suspense } from "react"
import { StakingDashboard } from "@/components/staking-dashboard"

// Loading skeleton for the dashboard
function DashboardSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 animate-pulse">
      <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <StakingDashboard />
    </Suspense>
  )
}
