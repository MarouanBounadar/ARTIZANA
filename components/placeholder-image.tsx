"use client"

import React from "react"

interface PlaceholderImageProps {
  className?: string
  text?: string
}

export function PlaceholderImage({ className = "", text = "A" }: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center bg-black/50 border border-gold-500/30 text-gold-500 font-serif h-full w-full ${className}`}
    >
      <span className="text-center text-base font-medium">{text}</span>
    </div>
  )
} 