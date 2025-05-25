import type React from "react"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollAnimations } from "@/components/scroll-animations"
import { Toaster } from "@/components/ui/toaster"
import { StoreInitializer } from "@/components/store-initializer"

export const metadata = {
  title: "ARTIZANIA MARRAKECH | Luxury Moroccan Craftsmanship",
  description:
    "Discover ARTIZANIA MARRAKECH's luxury handcrafted goods inspired by Moroccan heritage and crafted with passion in the heart of Marrakech.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <StoreInitializer />
          <Navbar />
          <main>{children}</main>
          <ScrollAnimations />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
