"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export default function SearchPage() {
  const { products } = useStore()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = (query: string) => {
    setIsSearching(true)

    // Simple search implementation - in a real app, this would be more sophisticated
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setIsSearching(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    // Update URL with search query
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    performSearch(searchQuery)
  }

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
    performSearch(term)
  }

  return (
    <div className="container mx-auto min-h-screen px-4 pt-32">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center font-serif text-3xl font-light tracking-wide text-white">Search Products</h1>

        <form onSubmit={handleSearch} className="relative mb-12">
          <Input
            type="search"
            placeholder="Search for products..."
            className="border-gold-500/30 bg-black/50 py-6 pl-4 pr-12 text-white placeholder:text-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            type="submit"
            className="absolute right-1 top-1 bg-gold-500 hover:bg-gold-600"
            size="icon"
            disabled={isSearching}
          >
            <Search className="h-4 w-4 text-black" />
          </Button>
        </form>

        {initialQuery ? (
          <>
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-xl font-light text-white">
                {searchResults.length > 0
                  ? `Search results for "${initialQuery}" (${searchResults.length})`
                  : `No results found for "${initialQuery}"`}
              </h2>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {searchResults.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="group">
                      <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-500/20">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      </div>
                      <div className="mt-4">
                        <h3 className="font-medium text-white">{product.name}</h3>
                        <p className="mt-1 text-white/70">{product.price}</p>
                        <p className="mt-1 text-xs text-gold-400">{product.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-gold-500/20 bg-black/30 p-8 text-center">
                  <p className="text-white/70">
                    No products match your search criteria. Try different keywords or browse our collections.
                  </p>
                  <Button asChild className="mt-4 bg-gold-500 text-black hover:bg-gold-600">
                    <Link href="/collections">Browse Collections</Link>
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-xl font-light text-white">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["Leather bags", "Poufs", "Lanterns", "Accessories", "Home decor"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    className="border-gold-500/30 text-white hover:bg-gold-500/10"
                    onClick={() => handlePopularSearch(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-serif text-xl font-light text-white">Categories</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {["Bags", "Accessories", "Home Decor", "Textiles", "Jewelry", "Gifts"].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="border-gold-500/30 py-6 text-white hover:bg-gold-500/10"
                    onClick={() => handlePopularSearch(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
