

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

type Product = {
  id: string
  name: string
  description: string
  price: number
  colors: string[]
  features: string[]
  imagePaths: string[]
  inStock: boolean
  slug: string // <-- Add this line

}

  export default async function CollectionsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  })
  
  const products: Product[] = await res.json()

  const featuredProducts = products.filter((product) => product.inStock).slice(0, 8)

 


  // Get featured products
  

  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <Image
  src="/images/LOGO1.png"
  alt="Logo top-left"
  width={200}
  height={80}
  className="absolute top-4 left-4 opacity-100 z-10 "
/>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-4xl font-light tracking-wider text-white sm:text-5xl">Our Collections</h1>
          <div className="mt-4 flex items-center text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>Collections</span>
          </div>
        </div>
      </section>

      {/* Collection Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.id} className="group relative overflow-hidden">
                <Link href={`/collections/${category.slug}`}>
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                      <h2 className="font-serif text-2xl font-light tracking-wide">{category.name}</h2>
                      <p className="mt-2 max-w-xs text-sm text-white/80">{category.description}</p>
                      <Button className="mt-4 border border-white bg-transparent text-white hover:bg-white hover:text-stone-900">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-black py-16 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-white">Featured Products</h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
  src={product.imagePaths[0] || "/placeholder.svg"}
  alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                    <Button
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-stone-800 opacity-0 transition-opacity duration-300 hover:bg-stone-100 group-hover:opacity-100"
                      size="sm"
                    >
                      Quick View
                    </Button>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-medium text-white">{product.name}</h3>
                    <p className="mt-1 text-white/70">{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-stone-800 text-white hover:bg-stone-900" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  {
    id: 1,
    name: "Leather Goods",
    description: "Handcrafted leather bags, wallets, and accessories made with traditional Moroccan techniques.",
    image: "/images/category-leather.png",
    slug: "leather-goods",
  },
  {
    id: 2,
    name: "Home Decor",
    description: "Elevate your space with our collection of artisanal home decor pieces inspired by Moroccan design.",
    image: "/images/category-home.png",
    slug: "home-decor",
  },
  {
    id: 3,
    name: "Accessories",
    description: "Discover our range of handcrafted accessories that add a touch of Moroccan elegance to any outfit.",
    image: "/images/category-accessories.png",
    slug: "accessories",
  },
]
