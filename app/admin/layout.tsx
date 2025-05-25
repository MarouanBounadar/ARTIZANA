"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AdminAuthProvider } from "@/components/admin/auth-provider"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Store auth check on client-side
  useEffect(() => {
    // Check if admin cookie exists
    const hasAdminCookie = document.cookie.split(';').some(item => item.trim().startsWith('adminAuth='));
    
    // If no cookie but should be authenticated according to local storage, set the cookie
    if (!hasAdminCookie) {
      try {
        const authData = localStorage.getItem("artizana-storage");
        if (authData) {
          const parsedData = JSON.parse(authData);
          if (parsedData.state && parsedData.state.isAuthenticated) {
            document.cookie = "adminAuth=true; path=/; max-age=604800; SameSite=Lax";
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <AdminAuthProvider>
        {loading ? (
          <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-gold-500"></div>
              <p className="mt-4 text-gold-500">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen animate-in fade-in duration-500">
            <AdminSidebar />
            <main className="flex-1 bg-black overflow-auto">{children}</main>
          </div>
        )}
        <Toaster />
      </AdminAuthProvider>
    </ThemeProvider>
  )
}
