"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getImage, getCacheVersion } from "@/lib/image-service"

interface DynamicImageProps {
  imageKey: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export function DynamicImage({
  imageKey,
  alt,
  className,
  fill = false,
  width,
  height,
  priority = false,
}: DynamicImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(`/images/${imageKey}.png`)
  const [loading, setLoading] = useState(true)
  const [cacheVersion, setCacheVersion] = useState(getCacheVersion())
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check if cache version has changed
    const currentCacheVersion = getCacheVersion()
    if (currentCacheVersion !== cacheVersion) {
      setCacheVersion(currentCacheVersion)
    }

    try {
      // In a real app, this would be an API call
      const img = getImage(imageKey)
      if (img) {
        // Add cache-busting parameter to force reload when image is updated
        setImageSrc(`${img.url}?v=${currentCacheVersion}`)
      } else {
        // Fallback to the original image path if not found in the service
        setImageSrc(`/images/${imageKey}.png?v=${currentCacheVersion}`)
      }
    } catch (err) {
      console.error("Error loading image:", err)
      setError(true)
      // Fallback to the original image path
      setImageSrc(`/images/${imageKey}.png?v=${currentCacheVersion}`)
    } finally {
      setLoading(false)
    }
  }, [imageKey, cacheVersion])

  if (loading) {
    return (
      <div
        className={`bg-gold-500/10 animate-pulse ${className}`}
        style={{ width: width || "100%", height: height || "100%" }}
      />
    )
  }

  if (error) {
    return (
      <div
        className={`bg-gold-500/10 flex items-center justify-center text-white/50 ${className}`}
        style={{ width: width || "100%", height: height || "100%" }}
      >
        Image not found
      </div>
    )
  }

  return fill ? (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={() => {
        setError(true)
        setImageSrc("/placeholder.svg")
      }}
    />
  ) : (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width || 100}
      height={height || 100}
      className={className}
      priority={priority}
      onError={() => {
        setError(true)
        setImageSrc("/placeholder.svg")
      }}
    />
  )
}
