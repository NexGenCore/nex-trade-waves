"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Wallet, Shield, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { BasecoinWalletModal } from "@/components/wallet/basecoin-wallet-modal"
import { apiService, LoginDto, ApiError } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({})
  const [isForgotOpen, setIsForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [isForgotLoading, setIsForgotLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    // clear field-level error on change
    setFormErrors(prev => ({ ...prev, [id]: undefined }))
  }

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {}
    // simple email regex
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
      const loginData: LoginDto = {
        email: formData.email,
        password: formData.password,
      }

      const response = await apiService.login(loginData)
      
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", response.token.access_token)
      
      toast({
        title: "Success",
        description: "You have been successfully signed in!",
      })
      
  // Redirect to dashboard
  router.replace("/dashboard")
    } catch (error: any) {
      if (error?.status === 401) {
        toast({
          title: "Invalid credentials",
          description: "Email or password is incorrect. Please try again.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to sign in",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function onForgotSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsForgotLoading(true)
    try {
      await apiService.forgotPassword(forgotEmail)
      toast({
        title: "Password reset requested",
        description:
          "If an account with that email exists, you'll receive password reset instructions.",
      })
      setIsForgotOpen(false)
      setForgotEmail("")
    } catch (error: any) {
      if (error?.status === 404) {
        // Backend might not implement this endpoint — still show friendly message
        toast({
          title: "Not available",
          description:
            "Password reset is not available right now. Please contact support.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error?.message || "Failed to request password reset",
          variant: "destructive",
        })
      }
    } finally {
      setIsForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Nex Trade Wave account</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center font-bold text-gray-900">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-600">Access your crypto trading account</CardDescription>
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
                <span className="bg-white px-3 text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={onSubmit} className="space-y-4">
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
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    autoCapitalize="none"
                    autoComplete="current-password"
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
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotOpen(true)}
                    className="text-sm text-amber-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In to Trade"
                )}
              </Button>
            </form>

            {/* Forgot password dialog */}
            <Dialog open={isForgotOpen} onOpenChange={setIsForgotOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reset your password</DialogTitle>
                  <DialogDescription>
                    Enter your email and we'll send instructions to reset your password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={onForgotSubmit} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="forgotEmail" className="text-gray-700">Email</Label>
                    <Input
                      id="forgotEmail"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isForgotLoading}>
                      {isForgotLoading ? "Sending..." : "Send reset link"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link href="/signup" className="text-amber-600 hover:text-amber-700 hover:underline font-medium">
                Create trading account
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
      {/* Full-screen loader while signing in */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}