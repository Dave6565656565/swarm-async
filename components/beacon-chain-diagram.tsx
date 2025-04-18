export const BeaconChainDiagram = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="flex flex-col items-center">
        {/* Reduced size of the ethereum logo */}
        <div className="w-20 h-20 mb-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#E2F0FF" />
            <path d="M50 10L29.29 45.5L50 35.5L70.71 45.5L50 10Z" fill="#64B5F6" />
            <path d="M50 35.5L29.29 45.5L50 60L70.71 45.5L50 35.5Z" fill="#2196F3" />
            <path d="M50 60L29.29 45.5L50 90L70.71 45.5L50 60Z" fill="#0D47A1" />
          </svg>
        </div>

        {/* Reduced margin below title */}
        <h3 className="text-xl font-bold mb-3 text-center">The Beacon Chain</h3>

        {/* Main grid - pulled up significantly */}
        <div className="grid grid-cols-2 gap-4 w-full mb-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium">Validator Registry</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium">Consensus Rules</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium">Finality Gadget</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm font-medium">Rewards & Penalties</div>
          </div>
        </div>

        {/* Removed the bottom section with Execution Layer and Consensus Layer 
             since it was taking up too much space and causing the text to be cut off */}
      </div>
    </div>
  )
}
