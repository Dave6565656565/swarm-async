export const EthereumFutureDiagram = () => {
  return (
    <div className="w-full h-full bg-white p-6 rounded-lg">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-6 text-center">Ethereum Roadmap</h3>

        <div className="relative">
          {/* Timeline */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"></div>

          {/* Completed Milestones */}
          <div className="relative mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">The Merge (2022)</h4>
                <p className="text-sm text-gray-600">Transition to Proof of Stake</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 13L9 17L19 7"
                    stroke="#059669"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Shanghai (2023)</h4>
                <p className="text-sm text-gray-600">Enabled staking withdrawals</p>
              </div>
            </div>
          </div>

          {/* Current & Future Upgrades */}
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Sharding</h4>
                <p className="text-sm text-gray-600">Horizontal scaling solution</p>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Single Slot Finality</h4>
                <p className="text-sm text-gray-600">Faster transaction finality</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 8V16M8 12H16"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">Proposer-Builder Separation</h4>
                <p className="text-sm text-gray-600">Improved MEV distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
