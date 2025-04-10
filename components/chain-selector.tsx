"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

type Chain = {
  id: number
  name: string
  icon: string
  color: string
}

const chains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    color: "#627EEA",
  },
  {
    id: 56,
    name: "BNB Chain",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    color: "#F3BA2F",
  },
  {
    id: 137,
    name: "Polygon",
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    color: "#8247E5",
  },
  {
    id: 42161,
    name: "Arbitrum",
    icon: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    color: "#28A0F0",
  },
  {
    id: 10,
    name: "Optimism",
    icon: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    color: "#FF0420",
  },
]

export function ChainSelector() {
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0])
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setDialogOpen(true)}
        className="flex items-center gap-2 glassmorphism border-none hover:bg-white/10"
      >
        <img
          src={selectedChain.icon || "/placeholder.svg"}
          alt={selectedChain.name}
          className="w-5 h-5 rounded-full"
          crossOrigin="anonymous"
        />
        <span>{selectedChain.name}</span>
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glassmorphism border-none">
          <DialogHeader>
            <DialogTitle>Select Network</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <AnimatePresence>
              {chains.map((chain) => (
                <motion.div
                  key={chain.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="outline"
                    className={`w-full justify-start ${selectedChain.id === chain.id ? "neon-border neon-glow" : ""}`}
                    style={{
                      borderColor: selectedChain.id === chain.id ? chain.color : "transparent",
                    }}
                    onClick={() => {
                      setSelectedChain(chain)
                      setDialogOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={chain.icon || "/placeholder.svg"}
                        alt={chain.name}
                        className="w-6 h-6 rounded-full"
                        crossOrigin="anonymous"
                      />
                      <span>{chain.name}</span>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
