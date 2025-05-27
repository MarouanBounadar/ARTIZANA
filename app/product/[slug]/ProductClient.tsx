"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Heart, Share2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Product, useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"




export default function ProductClient({ product }: { product: Product }) {
  const products = useStore.getState().products
  const { addToCart } = useStore()
  const { toast } = useToast()

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4); // ← STEP 3: Filter related products

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-medium text-white">Product not found</h1>
        <p className="mt-4 text-white/70">The product you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-8 bg-gold-500 text-black hover:bg-gold-600">
          <Link href="/collections">Back to Collections</Link>
        </Button>
      </div>
    )
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity)
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} (${selectedColor}) added to your cart`,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err)
        })
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-gold-500/20 bg-black py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gold-300/70">
            <Link href="/" className="hover:text-gold-400">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href="/collections" className="hover:text-gold-400">
              Collections
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-gold-400">
              {product.category}
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span className="text-gold-400">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-500/20">
                <Image
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                 <button
  key={index}
  className={`relative aspect-square overflow-hidden rounded-lg border ${
    activeImage === index ? "border-gold-500" : "border-gold-500/20"
  }`}
  onClick={() => setActiveImage(index)}
  aria-label={`Thumbnail ${index + 1}`} // <-- Fixes the warning
>
  <Image
    src={image || "/placeholder.svg"}
    alt={`${product.name} view ${index + 1}`}
    fill
    className="object-cover"
  />
</button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="font-serif text-3xl font-light text-white md:text-4xl">{product.name}</h1>
              <p className="mt-4 text-2xl font-medium text-white">{product.price}</p>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white">Description</h3>
                <div className="mt-2 h-0.5 w-12 bg-gold-500"></div>
                <p className="mt-4 text-white/80 leading-relaxed">{product.description}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white">Features</h3>
                <div className="mt-2 h-0.5 w-12 bg-gold-500"></div>
                <ul className="mt-4 space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start text-white/80">
                      <span className="mr-2 text-gold-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white">Color</h3>
                <div className="mt-2 h-0.5 w-12 bg-gold-500"></div>
                <div className="mt-4 flex space-x-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`rounded-full border px-4 py-2 text-sm text-white transition-colors ${
                        selectedColor === color
                          ? "border-gold-500 bg-gold-500/10"
                          : "border-gold-500/30 hover:border-gold-500"
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white">Quantity</h3>
                <div className="mt-2 h-0.5 w-12 bg-gold-500"></div>
                <div className="mt-4 flex items-center">
                  <button
  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 hover:border-gold-500"
  onClick={decrementQuantity}
  disabled={quantity <= 1}
  aria-label="Decrease quantity"
>
  <Minus className="h-4 w-4" />
</button>
                  <span className="mx-4 w-8 text-center text-white">{quantity}</span>
                  <button
  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 hover:border-gold-500"
  onClick={incrementQuantity}
  aria-label="Increase quantity"
>
  <Plus className="h-4 w-4" />
</button>
                </div>
              </div>

              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  className="flex-1 bg-gold-500 text-black hover:bg-gold-600"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  className="flex-1 border border-gold-500/50 bg-transparent text-white hover:bg-gold-500/10"
                  size="lg"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              <div className="mt-6 flex space-x-4">
                <button className="flex items-center text-white/70 hover:text-gold-400" onClick={handleAddToWishlist}>
                  <Heart className="mr-2 h-5 w-5" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center text-gold-300/70 hover:text-gold-400" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="mt-8 rounded-lg border border-gold-500/20 bg-black/30 p-4">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="h-12 w-12 rounded-full bg-gold-500/10 p-3">
                      <Image src="/images/artisan-icon.png" alt="Artisan" width={24} height={24} className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Crafted by {product.artisan}</h4>
                    <p className="mt-1 text-sm text-white/70">
                      This product was handcrafted by our master artisan with over 20 years of experience in traditional
                      Moroccan leatherwork.
                    </p>
                    <Link href="/artisans" className="mt-2 inline-block text-sm text-gold-500 hover:text-gold-400">
                      Learn more about our artisans
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="border-t border-gold-500/20 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-white">You May Also Like</h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
  .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct: Product) => (
                <div key={relatedProduct.id} className="group">
                  <Link href={`/product/${relatedProduct.slug}`}>
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-500/20">
                      <Image
                        src={relatedProduct.images[0] || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                      <Button
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gold-500 text-black opacity-0 transition-opacity duration-300 hover:bg-gold-600 group-hover:opacity-100"
                        size="sm"
                      >
                        Quick View
                      </Button>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-medium text-white">{relatedProduct.name}</h3>
                      <p className="mt-1 text-white/70">{relatedProduct.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
