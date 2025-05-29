"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const { cart, clearCart } = useStore()

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const shipping = 100
  const tax = 120
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
    clearCart()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-serif text-center mb-12">Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-white/70">Your cart is empty.</p>
            <Button asChild className="mt-6 bg-gold-500 text-black hover:bg-gold-600">
              <Link href="/collections">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif border-b border-gold-500 pb-2">Order Summary</h2>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-white">{item.name}</h3>
                    <p className="text-sm text-white/70">{item.color} × {item.quantity}</p>
                  </div>
                  <p>{parseFloat(item.price) * item.quantity} MAD</p>
                </div>
              ))}
              <div className="pt-6 space-y-2 border-t border-gold-500/20">
                <p className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subtotal} MAD</span>
                </p>
                <p className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping} MAD</span>
                </p>
                <p className="flex justify-between">
                  <span>Tax</span>
                  <span>{tax} MAD</span>
                </p>
                <p className="flex justify-between text-lg font-medium pt-2 border-t border-gold-500/40">
                  <span>Total</span>
                  <span>{total} MAD</span>
                </p>
              </div>
            </div>

            {/* Contact / Fake Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif border-b border-gold-500 pb-2">Your Info</h2>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 bg-black border border-gold-500/30 rounded-md text-white"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-black border border-gold-500/30 rounded-md text-white"
              />
              <input
                type="text"
                placeholder="Shipping Address"
                className="w-full p-3 bg-black border border-gold-500/30 rounded-md text-white"
              />

              <Button
                className="w-full bg-gold-500 text-black hover:bg-gold-600 mt-6"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}