"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ImageIcon,
  UserCircle,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { LogoText } from "@/components/logo-text"

export function AdminSidebar() {
  const pathname = usePathname()
  const { logout } = useStore()
  const { toast } = useToast()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
    router.push("/admin/login")
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-gold-500/20 bg-black">
      <div className="flex h-16 items-center border-b border-gold-500/20 px-6">
        <Link href="/admin">
          <LogoText size="small" />
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-2">
          <Link
            href="/admin"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </Link>

          <Link
            href="/admin/analytics"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin/analytics"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <BarChart3 className="mr-3 h-5 w-5" />
            Analytics
          </Link>

          <Collapsible defaultOpen={pathname.includes("/admin/products")} className="space-y-1 pt-1">
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white/70 hover:bg-gold-500/5 hover:text-white">
              <div className="flex items-center">
                <ShoppingBag className="mr-3 h-5 w-5" />
                Products
              </div>
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-10">
              <Link
                href="/admin/products"
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  pathname === "/admin/products"
                    ? "bg-gold-500/10 text-gold-500"
                    : "text-white/70 hover:bg-gold-500/5 hover:text-white",
                )}
              >
                All Products
              </Link>
              <Link
                href="/admin/products/add"
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  pathname === "/admin/products/add"
                    ? "bg-gold-500/10 text-gold-500"
                    : "text-white/70 hover:bg-gold-500/5 hover:text-white",
                )}
              >
                Add Product
              </Link>
              <Link
                href="/admin/categories"
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium",
                  pathname === "/admin/categories"
                    ? "bg-gold-500/10 text-gold-500"
                    : "text-white/70 hover:bg-gold-500/5 hover:text-white",
                )}
              >
                Categories
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link
            href="/admin/customers"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin/customers"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <Users className="mr-3 h-5 w-5" />
            Customers
          </Link>

          <Link
            href="/admin/artisans"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin/artisans"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <UserCircle className="mr-3 h-5 w-5" />
            Artisans
          </Link>

          <Link
            href="/admin/images"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin/images"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <ImageIcon className="mr-3 h-5 w-5" />
            Images
          </Link>

          <Link
            href="/admin/settings"
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/admin/settings"
                ? "bg-gold-500/10 text-gold-500"
                : "text-white/70 hover:bg-gold-500/5 hover:text-white",
            )}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="border-t border-gold-500/20 p-4">
        <Button
          variant="outline"
          className="w-full justify-start border-gold-500/30 text-white hover:bg-gold-500/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
