import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

interface CalculatorCTAButtonProps {
  text?: string
  className?: string
}

export default function CalculatorCTAButton({
  text = "Try Our Staking Calculator",
  className = "",
}: CalculatorCTAButtonProps) {
  return (
    <Link href="/calculator">
      <Button
        size="lg"
        className={`bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white ${className}`}
      >
        <Calculator className="mr-2 h-5 w-5" />
        {text}
      </Button>
    </Link>
  )
}
