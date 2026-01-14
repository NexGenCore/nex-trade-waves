import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Home, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Nex Trade Wave 🌊
            </span>
          </Link>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-12 pb-8">
            {/* 404 Illustration */}
            <div className="mb-8">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="404 Error"
                width={400}
                height={300}
                className="mx-auto rounded-lg"
              />
            </div>

            {/* Error Message */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Not Found</h2>
              <p className="text-lg text-gray-600 mb-6">
                Oops! The trading pair you're looking for seems to have delisted. Don't worry, there are plenty of other
                opportunities in the market.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="border-amber-300 hover:bg-amber-50 bg-transparent">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Markets
                </Button>
              </Link>
            </div>

            {/* Popular Markets */}
            <div className="border-t border-amber-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Trading Pairs</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { pair: "BTC/USDT", price: "$43,250", change: "+2.45%" },
                  { pair: "ETH/USDT", price: "$2,680", change: "+1.82%" },
                  { pair: "SOL/USDT", price: "$98.75", change: "+5.23%" },
                  { pair: "ADA/USDT", price: "$0.52", change: "-0.95%" },
                ].map((market, index) => (
                  <Link key={index} href="/dashboard" className="block">
                    <div className="p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                      <p className="font-semibold text-gray-900 text-sm">{market.pair}</p>
                      <p className="text-gray-700 text-sm">{market.price}</p>
                      <p className={`text-xs ${market.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                        {market.change}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-amber-100 rounded-lg border border-amber-200">
          <div className="flex items-center justify-center space-x-2 text-amber-800">
            <Search className="w-4 h-4" />
            <span className="text-sm font-medium">
              Need help? Contact our{" "}
              <Link href="#" className="underline hover:text-amber-900">
                24/7 support team
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
