"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart } = useStore()
  const { toast } = useToast()

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
    return total + price * item.quantity
  }, 0)

  // Fixed shipping and tax rates
  const shipping = cart.length > 0 ? 100 : 0
  const taxRate = 0.1 // 10%
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartItemQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const formatPrice = (price: number) => {
    return `${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} MAD`
  }

  return (
    <div className="container mx-auto min-h-screen px-4 pt-32">
      <h1 className="mb-8 text-center font-serif text-3xl font-light tracking-wide text-white">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gold-500/20 pb-6">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gold-500/30">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      <button className="text-white/70 hover:text-white" onClick={() => handleRemoveItem(item.id)}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-sm text-white/70">{item.color}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gold-500/30 rounded-md">
                        <button
                          className="flex h-8 w-8 items-center justify-center text-white hover:bg-gold-500/10"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-white">{item.quantity}</span>
                        <button
                          className="flex h-8 w-8 items-center justify-center text-white hover:bg-gold-500/10"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-medium text-white">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-lg border border-gold-500/30 bg-black/30 p-6">
              <h2 className="text-lg font-medium text-white">Order Summary</h2>
              <Separator className="my-4 bg-gold-500/20" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-white/70">Subtotal</p>
                  <p className="font-medium text-white">{formatPrice(subtotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white/70">Shipping</p>
                  <p className="font-medium text-white">{formatPrice(shipping)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-white/70">Tax</p>
                  <p className="font-medium text-white">{formatPrice(tax)}</p>
                </div>

                <Separator className="bg-gold-500/20" />

                <div className="flex justify-between">
                  <p className="font-medium text-white">Total</p>
                  <p className="font-medium text-white">{formatPrice(total)}</p>
                </div>
              </div>

              <Button className="mt-6 w-full bg-gold-500 text-black hover:bg-gold-600">Proceed to Checkout</Button>

              <div className="mt-4 text-center">
                <Link href="/collections" className="text-sm text-gold-400 hover:text-gold-300">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-md text-center">
          <p className="mb-6 text-white/70">Your cart is currently empty.</p>
          <Button asChild className="bg-gold-500 text-black hover:bg-gold-600">
            <Link href="/collections">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
