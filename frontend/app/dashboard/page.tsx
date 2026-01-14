"use client"

import { useState, useEffect } from "react"
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
import { WalletConnect } from "@/components/wallet/wallet-connect"
import { BasecoinWalletHeader } from "@/components/wallet/basecoin-wallet-header"
import { apiService } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  walletAddress?: string;
  simulationBalance: number;
  realBalance: number;
  emailVerified: boolean;
  profileImage?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  value: number;
  change: number;
}

interface Order {
  id: string;
  pair: string;
  type: string;
  amount: string;
  value: string;
  time: string;
  status: string;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/signin")
      return
    }

    fetchUserData(token)
    fetchPortfolioData(token)
    fetchOrdersData(token)
  }, [])

  const fetchUserData = async (token: string) => {
    try {
      const userData = await apiService.getProfile(token)
      setUser(userData)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch user data",
        variant: "destructive",
      })
      // If token is invalid, redirect to signin
      if (error.message === "Invalid token") {
        localStorage.removeItem("token")
        router.push("/signin")
      }
    }
  }

  const fetchPortfolioData = async (token: string) => {
    try {
      const portfolioData = await apiService.getPortfolio(token)
      // Mock data for now, replace with actual API response
      setPortfolio([
        {
          id: "1",
          symbol: "ETH",
          name: "Ethereum",
          amount: 2.5,
          value: 5420.00,
          change: 2.45,
        },
        {
          id: "2",
          symbol: "BTC",
          name: "Bitcoin",
          amount: 0.1,
          value: 4320.50,
          change: 1.82,
        },
        {
          id: "3",
          symbol: "SOL",
          name: "Solana",
          amount: 15,
          value: 1475.25,
          change: 5.23,
        },
      ])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch portfolio data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchOrdersData = async (token: string) => {
    try {
      const ordersData = await apiService.getOrders(token)
      // Mock data for now, replace with actual API response
      setOrders([
        {
          id: "1",
          pair: "ETH/USDC",
          type: "Buy",
          amount: "2.5 ETH",
          value: "$5,420.00",
          time: "2 min ago",
          status: "Completed",
        },
        {
          id: "2",
          pair: "BTC/USDC",
          type: "Sell",
          amount: "0.1 BTC",
          value: "$4,320.50",
          time: "15 min ago",
          status: "Completed",
        },
        {
          id: "3",
          pair: "SOL/USDC",
          type: "Buy",
          amount: "15 SOL",
          value: "$1,475.25",
          time: "1 hour ago",
          status: "Completed",
        },
        {
          id: "4",
          pair: "AVAX/USDC",
          type: "Sell",
          amount: "8 AVAX",
          value: "$86.40",
          time: "2 hours ago",
          status: "Completed",
        },
      ])
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch orders data",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/signin")
  }

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

  const watchlist = [
    { name: "Ethereum", symbol: "ETH", price: "$2,168.00", change: "+2.45%", icon: "🔷" },
    { name: "Bitcoin", symbol: "BTC", price: "$43,250.00", change: "+1.82%", icon: "🔶" },
    { name: "Solana", symbol: "SOL", price: "$98.75", change: "+5.23%", icon: "🟢" },
    { name: "Avalanche", symbol: "AVAX", price: "$10.80", change: "-0.95%", icon: "🔺" },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

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

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search markets, tokens..."
                className="pl-10 pr-4 py-2 bg-white/50 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Basecoin Wallet Header */}
            <BasecoinWalletHeader />
            
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <Bell className="w-5 h-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || "Trader"}!</h1>
          <p className="text-gray-600">Monitor your portfolio and execute trades on Base network.</p>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Portfolio and Trading Tabs */}
        <Tabs defaultValue="portfolio" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Portfolio Holdings</CardTitle>
                <CardDescription>Your cryptocurrency assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-100 hover:bg-amber-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-amber-800">{item.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.amount} {item.symbol}</p>
                        <p className="text-sm text-gray-500">${item.value.toLocaleString()}</p>
                      </div>
                      <div className={`text-right ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {item.change >= 0 ? (
                          <ArrowUpRight className="w-4 h-4 inline mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 inline mr-1" />
                        )}
                        <span>{Math.abs(item.change)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trading">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Trade</CardTitle>
                <CardDescription>Execute trades quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">From</label>
                      <div className="relative">
                        <Input placeholder="0.00" className="pr-20" />
                        <select className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-700 border-0 focus:ring-0">
                          <option>USDC</option>
                          <option>ETH</option>
                          <option>BTC</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">To</label>
                      <div className="relative">
                        <Input placeholder="0.00" className="pr-20" />
                        <select className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-700 border-0 focus:ring-0">
                          <option>ETH</option>
                          <option>BTC</option>
                          <option>SOL</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3">
                      <Plus className="w-4 h-4 mr-2" />
                      Execute Trade
                    </Button>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-6">
                    <h3 className="font-medium text-gray-900 mb-4">Market Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price</span>
                        <span className="font-medium">$2,168.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">24h Change</span>
                        <span className="text-green-600">+2.45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">24h Volume</span>
                        <span className="font-medium">$1.2B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Liquidity</span>
                        <span className="font-medium">$500M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Your recent trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-100">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{order.pair}</h3>
                          <Badge variant={order.type === "Buy" ? "default" : "destructive"} className="text-xs">
                            {order.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.amount}</p>
                        <p className="text-sm text-gray-500">{order.value}</p>
                      </div>
                      <div>
                        <Badge variant="secondary" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="watchlist">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Watchlist</CardTitle>
                <CardDescription>Track your favorite assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlist.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-100 hover:bg-amber-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.symbol}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.price}</p>
                        <p className={`text-sm ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                          {item.change}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                        Trade
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}