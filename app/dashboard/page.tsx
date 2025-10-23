"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  Search,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const portfolioStats = [
    {
      title: "Portfolio Value",
      value: "$125,847.32",
      change: "+12.45%",
      icon: DollarSign,
      color: "text-amber-600",
      trend: "up",
    },
    {
      title: "24h P&L",
      value: "+$3,247.89",
      change: "+2.67%",
      icon: TrendingUp,
      color: "text-green-600",
      trend: "up",
    },
    {
      title: "Total Trades",
      value: "1,247",
      change: "+23",
      icon: Activity,
      color: "text-blue-600",
      trend: "up",
    },
    {
      title: "Win Rate",
      value: "68.5%",
      change: "+1.2%",
      icon: BarChart3,
      color: "text-purple-600",
      trend: "up",
    },
  ]

  const cryptoHoldings = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "2.45",
      value: "$105,862.50",
      change: "+2.45%",
      price: "$43,250.00",
      allocation: 84,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "5.67",
      value: "$15,194.84",
      change: "+1.82%",
      price: "$2,680.50",
      allocation: 12,
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "25.3",
      value: "$2,498.78",
      change: "+5.23%",
      price: "$98.75",
      allocation: 2,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      amount: "4,567",
      value: "$2,374.84",
      change: "-0.95%",
      price: "$0.52",
      allocation: 2,
    },
  ]

  const recentTrades = [
    {
      pair: "BTC/USDT",
      type: "Buy",
      amount: "0.125",
      price: "$43,180.00",
      total: "$5,397.50",
      time: "2 min ago",
      status: "Completed",
    },
    {
      pair: "ETH/USDT",
      type: "Sell",
      amount: "1.5",
      price: "$2,675.30",
      total: "$4,012.95",
      time: "15 min ago",
      status: "Completed",
    },
    {
      pair: "SOL/USDT",
      type: "Buy",
      amount: "10",
      price: "$98.45",
      total: "$984.50",
      time: "1 hour ago",
      status: "Completed",
    },
  ]

  const marketData = [
    { name: "Bitcoin", symbol: "BTC", price: "$43,250.00", change: "+2.45%", volume: "$28.5B" },
    { name: "Ethereum", symbol: "ETH", price: "$2,680.50", change: "+1.82%", volume: "$15.2B" },
    { name: "Solana", symbol: "SOL", price: "$98.75", change: "+5.23%", volume: "$2.1B" },
    { name: "Cardano", symbol: "ADA", price: "$0.52", change: "-0.95%", volume: "$890M" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-orange-50/30">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Nex Trade Wave 🌊</span>
              </Link>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search markets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Deposit
              </Button>

              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Wallet className="mr-2 h-4 w-4" />
                    <span>Wallet</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <Link href="/signin">Sign out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
              <p className="text-gray-600 mt-1">Here's your trading overview for today.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Market Status</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-lg font-semibold text-green-600">Open</p>
              </div>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-600" />
                    )}
                    <p className={`text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} today
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Portfolio Holdings */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Portfolio Holdings
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cryptoHoldings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{holding.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{holding.name}</h3>
                          <p className="text-sm text-gray-600">
                            {holding.amount} {holding.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{holding.value}</p>
                        <div className="flex items-center space-x-2">
                          <p
                            className={`text-sm ${holding.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                          >
                            {holding.change}
                          </p>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-600 h-2 rounded-full"
                              style={{ width: `${holding.allocation}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Market Overview */}
            <div>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Market Overview</CardTitle>
                  <CardDescription>Top cryptocurrencies by market cap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketData.map((crypto, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xs">{crypto.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{crypto.symbol}</p>
                          <p className="text-xs text-gray-500">{crypto.volume}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{crypto.price}</p>
                        <p className={`text-xs ${crypto.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                          {crypto.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Trading Activity */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trades" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="trades">Recent Trades</TabsTrigger>
                  <TabsTrigger value="orders">Open Orders</TabsTrigger>
                  <TabsTrigger value="history">Trade History</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="trades" className="space-y-4 mt-6">
                  <div className="space-y-3">
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge
                            variant={trade.type === "Buy" ? "default" : "secondary"}
                            className={trade.type === "Buy" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                          >
                            {trade.type}
                          </Badge>
                          <div>
                            <p className="font-medium text-gray-900">{trade.pair}</p>
                            <p className="text-sm text-gray-600">
                              {trade.amount} @ {trade.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{trade.total}</p>
                          <p className="text-sm text-gray-500">{trade.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="orders" className="mt-6">
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Orders</h3>
                    <p className="text-gray-600">You don't have any open orders at the moment.</p>
                  </div>
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Trade History</h3>
                    <p className="text-gray-600">View your complete trading history and performance.</p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="mt-6">
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Trading Analytics</h3>
                    <p className="text-gray-600">Detailed analytics and performance metrics coming soon.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
