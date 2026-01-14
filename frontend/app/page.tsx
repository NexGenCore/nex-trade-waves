"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, Globe, BarChart3, Wallet } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { BasecoinWalletModal } from "@/components/wallet/basecoin-wallet-modal"
import { useState } from "react"
import { Providers } from "@/components/providers"

export default function HomePage() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  
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
            <Link href="/about" className="text-gray-600 hover:text-amber-600 font-medium">About</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-amber-600 font-medium">Dashboard</Link>
          </nav>

          <div className="flex items-center space-x-4">
           
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4 bg-amber-100 text-amber-800">
            Built on Base Network
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Trade Crypto with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Lightning Speed</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Experience the future of decentralized trading on Base network. Low fees, high security, and instant transactions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 text-lg"
              onClick={() => setIsWalletModalOpen(true)}
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Base Wallet
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg"
              asChild
            >
              <Link href="/dashboard">
                View Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Trade on Base Network?</h2>
          <p className="text-gray-600">
            Our platform leverages the power of Base for fast, secure, and low-cost cryptocurrency trading.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>Execute trades in seconds with Base network's high-speed transactions.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600" />
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
      </section>

      {/* Market Data */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Market Overview</h2>
          <p className="text-gray-600">
            Real-time prices for top cryptocurrencies on Base network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cryptoData.map((crypto, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{crypto.name}</span>
                  <span className="text-sm font-normal text-gray-500">{crypto.symbol}</span>
                </CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{crypto.price}</span>
                  <span className={`text-sm ${crypto.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {crypto.change}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
          <p className="text-amber-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust Nex Trade Wave for their crypto transactions on Base network.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg"
              onClick={() => setIsWalletModalOpen(true)}
            >
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              asChild
            >
              <Link href="/signup">
                Create Account <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Nex Trade Wave 🌊</span>
              </div>
              <p className="text-gray-600 mb-4">
                The next generation of decentralized cryptocurrency trading on Base network.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-amber-600">Features</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Pricing</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Security</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-amber-600">Documentation</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Tutorials</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Blog</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-amber-600">About</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Careers</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Contact</Link></li>
                <li><Link href="#" className="hover:text-amber-600">Partners</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Nex Trade Wave. All rights reserved. Built on Base network.</p>
          </div>
        </div>
      </footer>

      {/* Basecoin Wallet Modal */}
      <BasecoinWalletModal open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
    </div>
  )
}