"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Search, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { cart, isAuthenticated, logout } = useStore()
  const pathname = usePathname()

  // Calculate cart items count safely
  const cartItemsCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0

  const isAdminPage = pathname.startsWith("/admin")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isAdminPage) return null

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6 text-white" />
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0">
            <Link href="/" className="flex items-center">
             
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium uppercase tracking-wider text-white hover:text-amber-200",
                      pathname === item.href && "text-gold-400",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-white hover:text-amber-200" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href={isAuthenticated ? "/account" : "/account"}
              className="text-white hover:text-amber-200"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative text-white hover:text-amber-200" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-medium text-black">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-black text-white p-6 transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-light tracking-wider text-white">
            ARTIZANA MARRAKECH
          </Link>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <nav className="mt-12">
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-lg font-medium text-white hover:text-amber-200",
                    pathname === item.href && "text-gold-400",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li>
                <button
                  className="text-lg font-medium text-white hover:text-amber-200"
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="flex space-x-4">
            <Link href="https://www.instagram.com/otmane_ezz" className="text-white hover:text-amber-200">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="text-white hover:text-amber-200">
              Facebook
            </Link>
            <Link href="https://wa.me/212630537553" target="_blank" rel="noopener noreferrer">
  WhatsApp
</Link>
          </div>
          <div className="mt-6">
            <p className="text-sm text-stone-400">123 Rue des Artisans, Medina, Marrakech, Morocco</p>
          </div>
        </div>
      </div>
    </header>
  )
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/collections" },
  { label: "Our Story", href: "/about" },
  { label: "Artisans", href: "/artisans" },
  { label: "Contact", href: "/contact" },
]
