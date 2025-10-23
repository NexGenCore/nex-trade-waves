import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,250.00", change: "+2.45%" },
    { name: "Ethereum", symbol: "ETH", price: "$2,680.50", change: "+1.82%" },
    { name: "Solana", symbol: "SOL", price: "$98.75", change: "+5.23%" },
    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "-0.95%" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Nex Trade Wave 🌊</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#markets" className="text-gray-600 hover:text-gray-900 transition-colors">
              Markets
            </Link>
            <Link href="#trading" className="text-gray-600 hover:text-gray-900 transition-colors">
              Trading
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200" variant="secondary">
            🚀 New: Advanced DeFi Trading Features
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trade Crypto with
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {" "}
              Confidence
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the future of decentralized trading. Access 500+ cryptocurrencies with institutional-grade
            security and lightning-fast execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                Start Trading
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-amber-300 hover:bg-amber-50"
            >
              View Markets
            </Button>
          </div>

          {/* Crypto Ticker */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-12 border border-amber-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {cryptoData.map((crypto, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                    <span className="font-semibold text-gray-900">{crypto.symbol}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{crypto.price}</p>
                  <p className={`text-sm ${crypto.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {crypto.change}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Trading Dashboard Preview"
              width={800}
              height={600}
              className="rounded-xl shadow-2xl border"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Nex Trade Wave 🌊?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for traders, by traders. Experience the most advanced crypto trading platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Execute trades in milliseconds with our high-performance matching engine.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Bank-Grade Security</CardTitle>
                <CardDescription>Your funds are protected by multi-signature wallets and cold storage.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Global Access</CardTitle>
                <CardDescription>
                  Trade 24/7 from anywhere in the world with our decentralized platform.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h3 className="text-3xl font-bold mb-2">$2.5B+</h3>
              <p className="text-amber-100">24h Trading Volume</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">500+</h3>
              <p className="text-amber-100">Cryptocurrencies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">2M+</h3>
              <p className="text-amber-100">Active Traders</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">99.9%</h3>
              <p className="text-amber-100">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join millions of traders worldwide and experience the future of cryptocurrency trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent border-amber-300 hover:bg-amber-100"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Nex Trade Wave 🌊</span>
              </div>
              <p className="text-gray-400">The future of decentralized cryptocurrency trading.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Trading</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Spot Trading
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Futures
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Options
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Nex Trade Wave 🌊. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
