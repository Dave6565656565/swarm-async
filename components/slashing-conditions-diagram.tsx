"use client"

import { ArrowDown, AlertTriangle, X } from "lucide-react"

export function SlashingConditionsDiagram() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <div className="w-48 p-3 bg-amber-100 text-amber-800 rounded-lg mb-3 text-center font-medium flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Validator Misbehavior
        </div>
        <ArrowDown className="w-5 h-5 text-gray-400 my-2" />
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm">Double Signing</div>
          <div className="p-3 bg-red-100 text-red-800 rounded-lg text-center text-sm">Surround Voting</div>
        </div>
        <ArrowDown className="w-5 h-5 text-gray-400 my-2" />
        <div className="w-48 p-3 bg-red-100 text-red-800 rounded-lg text-center font-medium flex items-center justify-center">
          <X className="w-4 h-4 mr-2" />
          Slashing Event
        </div>
        <ArrowDown className="w-5 h-5 text-gray-400 my-2" />
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-100 text-gray-800 rounded-lg text-center text-sm">ETH Penalty</div>
          <div className="p-3 bg-gray-100 text-gray-800 rounded-lg text-center text-sm">Validator Ejection</div>
        </div>
      </div>
    </div>
  )
}
