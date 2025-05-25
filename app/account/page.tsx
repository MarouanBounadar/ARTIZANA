"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const { isAuthenticated, user, login, logout } = useStore()
  const { toast } = useToast()
  const router = useRouter()

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)

      if (success) {
        toast({
          title: "Login successful",
          description: "You have been logged in successfully",
        })
        router.push("/")
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Registration failed",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to register the user
    toast({
      title: "Registration successful",
      description: "Your account has been created. You can now log in.",
    })

    // Reset form and switch to login tab
    setRegisterData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  if (isAuthenticated && user) {
    return (
      <div className="container mx-auto min-h-screen px-4 pt-32">
        <div className="mx-auto max-w-md">
          <h1 className="mb-8 text-center font-serif text-3xl font-light tracking-wide text-white">My Account</h1>

          <div className="rounded-lg border border-gold-500/30 bg-black/30 p-6">
            <h2 className="text-xl font-medium text-white">Welcome, {user.name}</h2>
            <p className="mt-2 text-white/70">{user.email}</p>

            <div className="mt-6 space-y-4">
              <Button asChild className="w-full bg-gold-500/10 text-white hover:bg-gold-500/20">
                <Link href="/orders">My Orders</Link>
              </Button>

              <Button asChild className="w-full bg-gold-500/10 text-white hover:bg-gold-500/20">
                <Link href="/wishlist">My Wishlist</Link>
              </Button>

              <Button asChild className="w-full bg-gold-500/10 text-white hover:bg-gold-500/20">
                <Link href="/account/settings">Account Settings</Link>
              </Button>

              <Button
                className="w-full border border-gold-500/30 bg-transparent text-white hover:bg-gold-500/10"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto min-h-screen px-4 pt-32">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center font-serif text-3xl font-light tracking-wide text-white">My Account</h1>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black">
            <TabsTrigger value="login" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6 space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-white">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  className="border-gold-500/30 bg-black/50 text-white"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-white">
                    Password
                  </label>
                  <Link href="/account/forgot-password" className="text-xs text-gold-400 hover:text-gold-300">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="border-gold-500/30 bg-black/50 text-white"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gold-500 text-black hover:bg-gold-600" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center text-sm text-white/70">
                For demo purposes, use: admin@artizanamarrakech.com / password
              </p>
            </form>
          </TabsContent>

          <TabsContent value="register" className="mt-6 space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="register-name" className="block text-sm font-medium text-white">
                  Full Name
                </label>
                <Input
                  id="register-name"
                  className="border-gold-500/30 bg-black/50 text-white"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="register-email" className="block text-sm font-medium text-white">
                  Email Address
                </label>
                <Input
                  id="register-email"
                  type="email"
                  className="border-gold-500/30 bg-black/50 text-white"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="register-password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <Input
                  id="register-password"
                  type="password"
                  className="border-gold-500/30 bg-black/50 text-white"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="register-confirm-password" className="block text-sm font-medium text-white">
                  Confirm Password
                </label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  className="border-gold-500/30 bg-black/50 text-white"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gold-500 text-black hover:bg-gold-600">
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
