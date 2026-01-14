"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Wallet, Shield, Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import { BasecoinWalletModal } from "@/components/wallet/basecoin-wallet-modal"
import { apiService, RegisterDto } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; password?: string }>({})
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    setFormErrors(prev => ({ ...prev, [id]: undefined }))
  }

  const validateForm = () => {
    const errors: { name?: string; email?: string; password?: string } = {}
    if (!formData.name || formData.name.trim().length === 0) {
      errors.name = "Please enter your full name"
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!formData.password || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    // client-side validation
    if (!validateForm()) return
    setIsLoading(true)

    try {
      const registerData: RegisterDto = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }

      const response = await apiService.register(registerData)
      
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", response.token.access_token)
      
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      })
      
  // Redirect to dashboard
  router.replace("/dashboard")
    } catch (error: any) {
      // If backend returns a Conflict (409) because email exists, show a helpful message
      if (error?.status === 409) {
        toast({
          title: "Account exists",
          description: "An account with that email already exists. Try signing in.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to create account",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Join the future of cryptocurrency trading on Base network</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center font-bold text-gray-900">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-600">
              Join the future of cryptocurrency trading
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wallet Connect Options */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full bg-white/50 border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Base Wallet
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white/50 border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all"
                onClick={() => setIsWalletModalOpen(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Coinbase
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="bg-amber-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-gray-500 font-medium">Or create with email</span>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Zero trading fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Instant settlements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Advanced security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">24/7 support</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-white/50 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
                  required
                />
                {formErrors.name && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/50 border-amber-200 focus:border-amber-300 focus:ring-amber-300"
                  required
                />
                {formErrors.email && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Create a password"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/50 border-amber-200 focus:border-amber-300 focus:ring-amber-300 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
                {formErrors.password && (
                  <p className="text-sm text-red-600 mt-1">{formErrors.password}</p>
                )}
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create Trading Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600">
              {"Already have an account? "}
              <Link href="/signin" className="text-amber-600 hover:text-amber-700 hover:underline font-medium">
                Sign in to your account
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-amber-100 rounded-lg border border-amber-200">
          <div className="flex items-center space-x-2 text-amber-800">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Your funds are secured by Base network technology</span>
          </div>
        </div>
      </div>

      {/* Basecoin Wallet Modal */}
      <BasecoinWalletModal open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen} />
    </div>
  )
}