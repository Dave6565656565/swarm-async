"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const ProtocolComparison = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeProtocol, setActiveProtocol] = useState("lido")

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const protocols = [
    {
      id: "lido",
      name: "Lido",
      logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png",
      tokenType: "stETH",
      tokenMechanism: "Rebasing",
      apy: "3.5%",
      minStake: "0.01 ETH",
      decentralization: 60,
      decentralizationText: "Medium",
      marketShare: "~30%",
    },
    {
      id: "rocketpool",
      name: "Rocket Pool",
      logo: "https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true",
      tokenType: "rETH",
      tokenMechanism: "Value-accruing",
      apy: "3.8%",
      minStake: "0.01 ETH",
      decentralization: 90,
      decentralizationText: "High",
      marketShare: "~8%",
    },
    {
      id: "coinbase",
      name: "Coinbase",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s",
      tokenType: "cbETH",
      tokenMechanism: "Value-accruing",
      apy: "3.2%",
      minStake: "0.01 ETH",
      decentralization: 20,
      decentralizationText: "Low",
      marketShare: "~7%",
    },
    {
      id: "frax",
      name: "Frax",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75b9jMdiuMz-QCpDyQa2Q5jWEfN8jSYJtsQ&s",
      tokenType: "frxETH/sfrxETH",
      tokenMechanism: "Two-token system",
      apy: "3.6%",
      minStake: "0.01 ETH",
      decentralization: 70,
      decentralizationText: "Medium-High",
      marketShare: "~5%",
    },
  ]

  return (
    <div className="w-full overflow-x-auto pb-4">
      {isMobile ? (
        // Mobile view with protocol selector and details
        <div className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Select Protocol</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {protocols.map((protocol) => (
                <button
                  key={protocol.id}
                  onClick={() => setActiveProtocol(protocol.id)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    activeProtocol === protocol.id
                      ? "bg-gray-100 border border-gray-300"
                      : "bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={protocol.logo || "/placeholder.svg"}
                      alt={protocol.name}
                      className="w-5 h-5"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                  <div className="text-xs font-medium text-gray-800">{protocol.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Protocol details */}
          {protocols
            .filter((p) => p.id === activeProtocol)
            .map((protocol) => (
              <div key={protocol.id} className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                <div className="p-4 flex items-center gap-3 border-b border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={protocol.logo || "/placeholder.svg"}
                      alt={protocol.name}
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'%3E%3C/path%3E%3Cline x1='12' y1='17' x2='12.01' y2='17'%3E%3C/line%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{protocol.name}</h3>
                    <p className="text-sm text-gray-600">Ethereum Staking</p>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-600">Token Type</span>
                    <div className="text-right">
                      <div className="font-medium text-gray-800">{protocol.tokenType}</div>
                      <div className="text-xs text-gray-500">{protocol.tokenMechanism}</div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-600">Current APY</span>
                    <span className="font-medium text-emerald-600">{protocol.apy}</span>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-600">Min Stake</span>
                    <span className="font-medium text-gray-800">{protocol.minStake}</span>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Decentralization</span>
                      <span className="font-medium text-gray-800">{protocol.decentralizationText}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-gray-500 h-2 rounded-full"
                        style={{ width: `${protocol.decentralization}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-600">Market Share</span>
                    <span className="font-medium text-gray-800">{protocol.marketShare}</span>
                  </div>
                </div>
              </div>
            ))}

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Swipe between protocols or use the selector above to compare different staking platforms.</p>
          </div>
        </div>
      ) : (
        // Original desktop table - unchanged
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 gap-4">
            <div className="p-4"></div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://s2.coinmarketcap.com/static/img/coins/200x200/8085.png"
                  alt="Lido"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Lido</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://raw.githubusercontent.com/rocket-pool/rocketpool/master/images/logo.png?raw=true"
                  alt="Rocket Pool"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Rocket Pool</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF6hcTTU1A8Ymi2VldXqCsPkBu_ltAhIKiRg&s"
                  alt="Coinbase"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Coinbase</span>
            </div>
            <div className="p-4 text-center font-medium bg-gray-50 rounded-t-lg">
              <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-2 flex items-center justify-center overflow-hidden">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ75b9jMdiuMz-QCpDyQa2Q5jWEfN8jSYJtsQ&s"
                  alt="Frax"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-gray-800">Frax</span>
            </div>

            {/* Token Type */}
            <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Token Type</div>
            <div className="p-4 text-center bg-white border border-gray-100">
              stETH
              <br />
              <span className="text-xs text-gray-500">Rebasing</span>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              rETH
              <br />
              <span className="text-xs text-gray-500">Value-accruing</span>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              cbETH
              <br />
              <span className="text-xs text-gray-500">Value-accruing</span>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              frxETH/sfrxETH
              <br />
              <span className="text-xs text-gray-500">Two-token system</span>
            </div>

            {/* APY */}
            <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Current APY</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.5%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.8%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.2%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-emerald-600 font-medium">3.6%</div>

            {/* Min Stake */}
            <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Min Stake</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">0.01 ETH</div>

            {/* Decentralization */}
            <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Decentralization</div>
            <div className="p-4 text-center bg-white border border-gray-100">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="text-xs mt-1 text-gray-500">Medium</div>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
              <div className="text-xs mt-1 text-gray-500">High</div>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: "20%" }}></div>
              </div>
              <div className="text-xs mt-1 text-gray-500">Low</div>
            </div>
            <div className="p-4 text-center bg-white border border-gray-100">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-gray-500 h-2 rounded-full" style={{ width: "70%" }}></div>
              </div>
              <div className="text-xs mt-1 text-gray-500">Medium-High</div>
            </div>

            {/* Market Share */}
            <div className="p-4 font-medium bg-gray-100 flex items-center text-gray-800">Market Share</div>
            <div className="p-4 text-center bg-white border border-gray-100 font-medium text-gray-800">~30%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~8%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~7%</div>
            <div className="p-4 text-center bg-white border border-gray-100 text-gray-800">~5%</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProtocolComparison
