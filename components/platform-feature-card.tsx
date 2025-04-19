import type { LucideIcon } from "lucide-react"

interface PlatformFeatureCardProps {
  title: string
  description: string
  impact: "low" | "medium" | "high" | "critical"
  icon: LucideIcon
}

export function PlatformFeatureCard({ title, description, impact, icon: Icon }: PlatformFeatureCardProps) {
  const impactColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3 flex-grow">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xs font-medium mr-2">Impact:</span>
          <span className={`text-xs px-2 py-1 rounded-full ${impactColors[impact]}`}>
            {impact.charAt(0).toUpperCase() + impact.slice(1)}
          </span>
        </div>
      </div>
    </div>
  )
}
