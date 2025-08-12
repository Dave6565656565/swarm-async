"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, TrendingUp, Zap, Shield, Calculator } from "lucide-react"
import Link from "next/link"

export function EthBettingSection() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Sports Betting with Ethereum</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take your ETH beyond staking and into the exciting world of sports betting. Use your staked ETH rewards to
            place strategic bets with live odds and maximize your returns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Use ETH for Sports Betting?</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant Transactions</h4>
                  <p className="text-gray-600">
                    Place bets and receive payouts instantly with Ethereum's fast transaction speeds. No waiting for
                    bank transfers or payment processing delays.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Transparent & Secure</h4>
                  <p className="text-gray-600">
                    All transactions are recorded on the blockchain, ensuring complete transparency and security for
                    your betting activities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Better Odds</h4>
                  <p className="text-gray-600">
                    Decentralized betting platforms often offer better odds than traditional sportsbooks, maximizing
                    your potential returns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">Live Betting Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">$2.4B</div>
                    <div className="text-sm text-gray-600">Daily Volume</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">15,000+</div>
                    <div className="text-sm text-gray-600">Live Markets</div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-3">Popular Markets</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">NFL</span>
                      <span className="font-semibold text-gray-900">2.45x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">NBA</span>
                      <span className="font-semibold text-gray-900">1.85x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Premier League</span>
                      <span className="font-semibold text-gray-900">3.20x</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-center text-white mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Calculator className="w-12 h-12 mr-4" />
              <h3 className="text-3xl font-bold">Maximize Your Betting Strategy</h3>
            </div>

            <p className="text-xl mb-8 opacity-90">
              Don't leave money on the table. Use our advanced parlay calculator to find the best odds across multiple
              sportsbooks and maximize your potential returns with live, real-time data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">Live Odds</div>
                <p className="text-sm opacity-80">Real-time odds from 50+ sportsbooks</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">Smart Analysis</div>
                <p className="text-sm opacity-80">AI-powered betting recommendations</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">Best Returns</div>
                <p className="text-sm opacity-80">Optimize payouts with parlay combinations</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://luxuryfootballelite.com/parlay-calculator/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Use Parlay Calculator
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
              <div className="text-sm opacity-80">Free tool • Live odds • No registration required</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                Connect Your Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use your existing ETH wallet to connect to decentralized betting platforms. Your staking rewards can be
                used directly for betting.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                Calculate Best Odds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Use the{" "}
                <Link
                  href="https://luxuryfootballelite.com/parlay-calculator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  parlay calculator
                </Link>{" "}
                to compare odds across platforms and find the most profitable betting combinations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                Place Smart Bets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Execute your betting strategy with confidence, knowing you're getting the best possible odds and
                maximizing your ETH returns.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            <strong>Responsible Betting:</strong> Sports betting involves risk. Only bet what you can afford to lose and
            always gamble responsibly. Use your staking rewards wisely and consider betting as entertainment, not
            investment.
          </p>
        </div>
      </div>
    </section>
  )
}
