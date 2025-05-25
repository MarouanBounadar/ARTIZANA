"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useStore } from "@/lib/store"

interface AdminUser {
  email: string
  name: string
}

interface AdminAuthContextType {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useStore()

  useEffect(() => {
    // Check if user is authenticated on component mount
    const checkAuth = () => {
      try {
        // If the store already has authentication info, ensure cookie is set
        if (isAuthenticated && user) {
          // Set a cookie for server-side auth check with explicit settings
          document.cookie = `adminAuth=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [isAuthenticated, user])

  const login = async (email: string, password: string): Promise<boolean> => {
    const success = await storeLogin(email, password);
    
    if (success) {
      // Set a cookie for server-side auth check with explicit settings
      document.cookie = `adminAuth=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      return true;
    }
    
    return false;
  }

  const logout = () => {
    // Remove the auth cookie before store logout
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    
    storeLogout();
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    router.push("/admin/login");
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
