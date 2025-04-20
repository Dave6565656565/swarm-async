import PortfolioTracker from "@/components/portfolio-tracker"

export const metadata = {
  title: "Crypto Portfolio Tracker | StakeETH",
  description: "Track your cryptocurrency portfolio and monitor your assets in real-time",
}

export default function PortfolioTrackerPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Crypto Portfolio Tracker</h1>
        <PortfolioTracker />
      </div>
    </div>
  )
}
