"use client"

import React from "react"

interface LogoTextProps {
  className?: string
  size?: "small" | "medium" | "large"
}

export function LogoText({ className = "", size = "medium" }: LogoTextProps) {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl"
  }

  return (
    <h1 className={`font-serif ${sizeClasses[size]} font-light tracking-wider text-gold-500 ${className}`}>
      ARTIZANIA MARRAKECH
    </h1>
  )
} 