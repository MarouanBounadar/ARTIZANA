import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define paths that are protected (require authentication)
  const isAdminPath = path.startsWith("/admin") && !path.startsWith("/admin/login")

  // Get authentication status from cookies - more flexible checking
  const adminCookie = request.cookies.get("adminAuth")
  const isAuthenticated = adminCookie?.value === "true"

  // If it's an admin path and the user is not authenticated, redirect to login
  if (isAdminPath && !isAuthenticated) {
    // Console output won't show in production but helps during development
    console.log(`Redirecting unauthenticated request from ${path} to /admin/login`)
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  // If the user is already authenticated and trying to access login page, redirect to admin dashboard
  if (path === "/admin/login" && isAuthenticated) {
    console.log(`Redirecting authenticated request from ${path} to /admin`)
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should be matched by this middleware
export const config = {
  matcher: ["/admin/:path*"],
}
