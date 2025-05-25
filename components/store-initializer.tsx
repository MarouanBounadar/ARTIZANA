"use client"

import { useEffect, useState, useLayoutEffect } from "react"
import { useStore } from "@/lib/store"

// Use a safe version of useLayoutEffect that falls back to useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function StoreInitializer() {
  const [isInitialized, setIsInitialized] = useState(false)
  const { products, artisans } = useStore()

  // Use isomorphic layout effect to ensure consistent behavior between server and client
  useIsomorphicLayoutEffect(() => {
    // Check if store is properly initialized
    if (products.length > 0 && artisans.length > 0) {
      setIsInitialized(true)
    }

    // This is just to ensure the store is properly hydrated
    const unsubscribe = useStore.subscribe(
      (state) => [state.products, state.artisans],
      () => {
        setIsInitialized(true)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [products, artisans])

  return null
}
