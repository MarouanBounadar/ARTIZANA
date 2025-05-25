"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DynamicImage } from "@/components/dynamic-image"
import { useStore, useHydrateStore } from "@/lib/store"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { products } = useStore()

  // Hydrate the store on the client side
  useHydrateStore()

  // Get featured products safely
  const featuredProducts = mounted ? products.filter((product) => product.inStock).slice(0, 3) : Array(3).fill(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center" data-depth="0.2">
      

          
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-4xl font-light tracking-wider text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
             <DynamicImage
  imageKey="LOGO"
  alt="ARTIZANIA MARRAKECH luxury craftsmanship"
  width={800}
  height={700}
  className="rounded-lg"
/>
          </h1>
          
          <Button
            className="mt-8 bg-gold-500 text-black hover:bg-gold-600 hover-lift animate-fade-in-up animate-delay-300"
            size="lg"
            asChild
          >
            <Link href="/collections">Discover Collection</Link>
          </Button>
        </div>
      </section>

      {/* Story Section with Scroll Animation */}
      <section className="bg-stone-50 py-24 reveal-on-scroll">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide text-stone-800 md:text-4xl">Our Story</h2>
            <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto animate-shine"></div>
            <p className="mt-8 text-stone-600 leading-relaxed">
              ARTIZANA MARRAKECH was born from a passion for preserving the rich artisanal heritage of Morocco. Our
              creations blend traditional craftsmanship with contemporary design, bringing the soul of Marrakech to the
              modern world. Each piece tells a story of skilled hands and ancient techniques passed down through
              generations.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-amber-700 hover:text-amber-800 transition-colors duration-300"
            >
              Learn more about our heritage <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection with Hover Effects */}
      <section className="py-24 reveal-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-stone-800 md:text-4xl">
            Featured Collection
          </h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto animate-shine"></div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div
                key={product?.id || index}
                className="group hover-lift reveal-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {mounted && product ? (
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-[3/4] overflow-hidden img-zoom">
                      <DynamicImage
                        imageKey={`product-${product.id}`}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <Button
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-stone-800 opacity-0 transition-opacity duration-300 hover:bg-stone-100 group-hover:opacity-100"
                        size="sm"
                      >
                        View Product
                      </Button>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-medium text-stone-800">{product.name}</h3>
                      <p className="mt-1 text-stone-600">{product.price}</p>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 animate-pulse"></div>
                    <div className="mt-4 text-center">
                      <div className="h-5 w-32 mx-auto bg-stone-200 animate-pulse rounded"></div>
                      <div className="mt-1 h-4 w-20 mx-auto bg-stone-200 animate-pulse rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button className="bg-stone-800 text-white hover:bg-stone-900 hover-lift" size="lg" asChild>
              <Link href="/collections">Shop All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section with Parallax */}
      <section className="bg-stone-100 py-24 reveal-on-scroll">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <div data-depth="0.1">
                <DynamicImage imageKey="craftsmanship" alt="Artisan craftsmanship" fill className="object-cover" />
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-stone-800 md:text-4xl">
                Artisanal Excellence
              </h2>
              <div className="mt-2 h-0.5 w-24 bg-amber-700 animate-shine"></div>
              <p className="mt-6 text-stone-600 leading-relaxed">
                Each ARTIZANA MARRAKECH piece is meticulously handcrafted by skilled artisans in our Marrakech atelier.
                We honor traditional techniques while embracing innovative approaches, ensuring that every creation is
                both authentic and relevant.
              </p>
              <p className="mt-4 text-stone-600 leading-relaxed">
                Our commitment to quality means selecting only the finest materials, paying attention to every detail,
                and maintaining the highest standards throughout our creative process.
              </p>
              <Button className="mt-8 bg-amber-700 text-white hover:bg-amber-800 hover-lift" asChild>
                <Link href="/artisans">Discover Our Process</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Animation */}
      <section className="bg-black py-24 text-white border-y border-gold-500/30 reveal-on-scroll">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl">Join Our Journey</h2>
            <p className="mt-4 text-stone-300">
              Subscribe to receive updates on new collections, artisan stories, and exclusive offers.
            </p>
            <form className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border border-stone-600 bg-stone-700 px-4 py-2 text-white placeholder-stone-400 focus:border-amber-500 focus:outline-none sm:w-72 transition-all duration-300 focus:ring-2 focus:ring-gold-500/50"
              />
              <Button className="w-full bg-gold-500 text-black hover:bg-gold-600 hover-lift sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Instagram Feed with Hover Effects */}
      <section className="py-24 reveal-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-stone-800 md:text-4xl">
            Follow Our Journey
          </h2>
          <div className="mt-2 h-0.5 w-24 bg-amber-700 mx-auto animate-shine"></div>
          <p className="mt-4 text-center text-stone-600">@artizana_marrakech</p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {instagramPosts.map((post, index) => (
              <div
                key={post.id}
                className="group relative aspect-square overflow-hidden hover-glow"
                style={{ animationDelay: `${(index % 6) * 100}ms` }}
              >
                <DynamicImage
                  imageKey={`instagram-${post.id}`}
                  alt="Instagram post"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                  <Instagram className="h-8 w-8 text-transparent transition-colors duration-300 group-hover:text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Animation */}
      <footer className="bg-black py-16 text-gold-300/70 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="reveal-on-scroll">
              <h3 className="font-serif text-xl font-light text-white">ARTIZANA MARRAKECH</h3>
              <p className="mt-4 text-sm leading-relaxed">
                Luxury artisanal goods inspired by Moroccan heritage and crafted with passion in the heart of Marrakech.
              </p>
            </div>

            <div className="reveal-on-scroll" style={{ animationDelay: "100ms" }}>
              <h4 className="text-sm font-medium uppercase tracking-wider text-white">Shop</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/collections" className="hover:text-gold-400 transition-colors duration-200">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/collections/bags" className="hover:text-gold-400 transition-colors duration-200">
                    Bags
                  </Link>
                </li>
                <li>
                  <Link href="/collections/accessories" className="hover:text-gold-400 transition-colors duration-200">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="/collections/home" className="hover:text-gold-400 transition-colors duration-200">
                    Home
                  </Link>
                </li>
              </ul>
            </div>

            <div className="reveal-on-scroll" style={{ animationDelay: "200ms" }}>
              <h4 className="text-sm font-medium uppercase tracking-wider text-white">Company</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-gold-400 transition-colors duration-200">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/artisans" className="hover:text-gold-400 transition-colors duration-200">
                    Our Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-gold-400 transition-colors duration-200">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gold-400 transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="reveal-on-scroll" style={{ animationDelay: "300ms" }}>
              <h4 className="text-sm font-medium uppercase tracking-wider text-white">Connect</h4>
              <div className="mt-4 flex space-x-4">
                <Link
                  href="https://www.instagram.com/otmane_ezz"
                  className="text-stone-400 hover:text-gold-400 transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://facebook.com"
                  className="text-stone-400 hover:text-gold-400 transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
  href="https://wa.me/212630537553"
  className="text-stone-400 hover:text-gold-400 transition-colors duration-200"
>
  <span className="sr-only">WhatsApp</span>
  <svg
    className="h-5 w-5"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M20.52 3.48a11.87 11.87 0 00-16.8 0 11.87 11.87 0 000 16.8l-.88 3.19a1 1 0 001.24 1.24l3.19-.88a11.87 11.87 0 0016.8-16.8zM12 21a9 9 0 01-5.23-1.66l-.37-.25-1.9.52.52-1.9-.25-.37A9 9 0 1121 12a9 9 0 01-9 9zm4.2-6.8c-.23-.12-1.35-.67-1.56-.75s-.36-.12-.51.12-.59.75-.72.9-.27.18-.51.06a7.34 7.34 0 01-2.16-1.32 8.24 8.24 0 01-1.53-1.9c-.15-.27 0-.42.12-.54s.27-.3.39-.45a1.78 1.78 0 00.27-.45.48.48 0 000-.48c-.06-.12-.51-1.23-.69-1.68s-.36-.42-.51-.42-.3 0-.45 0a.87.87 0 00-.63.3 2.64 2.64 0 00-.84 1.98c0 1.17.84 2.28.96 2.43s1.65 2.52 4.05 3.54a13.66 13.66 0 001.32.48 3.18 3.18 0 001.44.09 2.52 2.52 0 001.65-1.17 2.1 2.1 0 00.15-1.17c-.06-.12-.21-.18-.45-.3z" />
  </svg>
</Link>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium uppercase tracking-wider text-white">Visit Us</h4>
                <address className="mt-2 not-italic text-sm leading-relaxed">
                  123 Rue des Artisans
                  <br />
                  Medina, Marrakech
                  <br />
                  Morocco
                </address>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs">
            <p>&copy; {new Date().getFullYear()} ARTIZANA MARRAKECH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const instagramPosts = [
  { id: 1, image: "/images/instagram-1.png" },
  { id: 2, image: "/images/instagram-2.png" },
  { id: 3, image: "/images/instagram-3.png" },
  { id: 4, image: "/images/instagram-4.png" },
  { id: 5, image: "/images/instagram-5.png" },
  { id: 6, image: "/images/instagram-6.png" },
]
