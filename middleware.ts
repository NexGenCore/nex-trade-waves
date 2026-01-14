import { NextRequest, NextFetchEvent } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  
  // Paths that require authentication
  const protectedPaths = ["/dashboard", "/profile", "/settings"]
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
  
  // Paths that should redirect authenticated users
  const authPaths = ["/signin", "/signup"]
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))
  
  // If accessing a protected path without a token, redirect to signin
  if (isProtectedPath && !token) {
    const url = request.nextUrl.clone()
    url.pathname = "/signin"
    return NextResponse.redirect(url)
  }
  
  // If accessing auth paths with a token, redirect to dashboard
  if (isAuthPath && token) {
    const url = request.nextUrl.clone()
    url.pathname = "/dashboard"
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*", "/signin", "/signup"],
}