"use client"

import type * as React from "react"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-black transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarTrigger() {
  const { setIsOpen } = useSidebar()

  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-gold-500/10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  )
}

export function SidebarHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>
}

export function SidebarFooter({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>
}

export function SidebarContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex-1 overflow-y-auto", className)}>{children}</div>
}

export function SidebarMenu({ className, children }: { className?: string; children: React.ReactNode }) {
  return <ul className={cn("space-y-1", className)}>{children}</ul>
}

export function SidebarMenuItem({ className, children }: { className?: string; children: React.ReactNode }) {
  return <li className={cn(className)}>{children}</li>
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  asChild,
  ...props
}: {
  className?: string
  children: React.ReactNode
  isActive?: boolean
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  if (asChild) {
    // When asChild is true, we just return children without wrapping them
    return <>{children}</>
  }

  // Otherwise, render a normal button with the className
  return (
    <button
      className={cn(
        "flex w-full items-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gold-500/10",
        isActive && "bg-gold-500/10 text-gold-400",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
