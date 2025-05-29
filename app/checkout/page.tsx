"use client"

import { useState } from "react"
import { useStore,CartItem } from "@/lib/store"
import { useRouter } from "next/navigation"
import emailjs from '@emailjs/browser';
export default function CheckoutPage() {
  const { cart, clearCart } = useStore()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const router = useRouter()
const [phone, setPhone] = useState("");
  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)
  const shipping = 100
  const tax = 120
  const total = subtotal + shipping + tax

  const handlePlaceOrder = () => {
  if (!name || !email || !address) {
    alert("Please fill out all fields before placing the order.");
    return;
  }

  const itemsList = cart
    .map((item) => `${item.name} (${item.color}) x ${item.quantity}`)
    .join(", ");

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  ) + 100 + 120; // example shipping + tax

  const templateParams = {
    name,
    email,
    address,
    itemsList,
    total,
    phone,

  };

  emailjs
    .send(
      'service_6cixol3',      // Replace with your EmailJS service ID
      'template_oyga48p',     // Replace with your saved Template ID
      templateParams,
      'rxhttctXczODOm80E'       // Replace with your EmailJS public key
    )
    .then((response) => {
      alert('Order email sent!');
      clearCart();             // Optional: clear cart
      router.push('/thank-you'); // Redirect to thank-you page
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      alert('Something went wrong. Please try again.');
    });
};

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
    
    {/* ✅ Fixed: Checkout Title Centered */}
    <h1 className="text-center text-4xl font-bold text-gold-500 mb-10">
      Checkout
    </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Order Summary */}
      <div>
        <h2 className="text-2xl mb-4">Order Summary</h2>
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between py-2 border-b border-white/10">
              <span>{item.name}</span>
              <span>{parseFloat(item.price) * item.quantity} MAD</span>
            </div>
          ))}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal} MAD</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping} MAD</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{tax} MAD</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gold-500 pt-2">
              <span>Total</span>
              <span>{total} MAD</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-2xl font-serif border-b border-gold-500 pb-2 mb-4">Your Info</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-black border border-gold-500/30 rounded-md text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-black border border-gold-500/30 rounded-md text-white"
          />
          <input
            type="text"
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 mb-4 bg-black border border-gold-500/30 rounded-md text-white"
          />
          <input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full p-3 bg-black border border-gold-500/30 rounded-md text-white"
/>
          <button
            onClick={handlePlaceOrder}
            className="w-full p-3 bg-gold-500 text-black hover:bg-gold-600 rounded-md mt-2"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}