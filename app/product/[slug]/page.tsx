// File: app/product/[slug]/page.tsx
import { initialProducts } from "@/lib/store"
import { createClient } from "@supabase/supabase-js"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// 👇 Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // 🔍 Try to fetch from Supabase first
  const { data: dbProducts, error } = await supabase.from("products").select("*").eq("slug", slug).single()

  // ⛔ Handle error if Supabase fails
  if (error && error.code !== "PGRST116") {
    console.error("Supabase error:", error)
  }

  // 🔄 Fallback to static product if Supabase has no match
  const product = dbProducts || initialProducts.find((p) => p.slug === slug)

  // 🚫 Not found
  if (!product) return notFound()

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-4">{product.name}</h1>
      <Image
        src={product.images?.[0] || "/placeholder.svg"}
        alt={product.name}
        width={500}
        height={500}
        className="mb-4 object-cover rounded"
      />
      <p className="text-lg mb-2">{product.description}</p>
      <p className="text-xl font-bold">{product.price}</p>
      <Link href="/collections" className="text-gold-400 mt-6 block">← Back to Collections</Link>
    </div>
  )
}