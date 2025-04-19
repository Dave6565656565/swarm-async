import type { LucideIcon } from "lucide-react"

interface RiskFactorCardProps {
  title: string
  description: string
  severity: "low" | "medium" | "high" | "critical"
  icon: LucideIcon
}

export function RiskFactorCard({ title, description, severity, icon: Icon }: RiskFactorCardProps) {
  const severityColors = {
    low: "bg-green-50 border-green-200 text-green-800",
    medium: "bg-amber-50 border-amber-200 text-amber-800",
    high: "bg-orange-50 border-orange-200 text-orange-800",
    critical: "bg-red-50 border-red-200 text-red-800",
  }

  const iconColors = {
    low: "text-green-600",
    medium: "text-amber-600",
    high: "text-orange-600",
    critical: "text-red-600",
  }

  return (
    <div className={`rounded-lg border p-4 ${severityColors[severity]}`}>
      <div className="flex items-center mb-3">
        <Icon className={`h-5 w-5 mr-2 ${iconColors[severity]}`} />
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  )
}
