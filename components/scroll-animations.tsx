"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Function to handle scroll animations
    const handleScrollAnimations = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll")

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("active")
        } else {
          element.classList.remove("active")
        }
      })
    }

    // Initial check for elements in view
    setTimeout(handleScrollAnimations, 100)

    // Add scroll event listener
    window.addEventListener("scroll", handleScrollAnimations)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScrollAnimations)
    }
  }, [])

  return null
}
