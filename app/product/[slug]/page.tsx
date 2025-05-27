// app/product/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js"
import ProductClient from "./ProductClient"
import { Product } from "@/lib/store"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!product || error) {
    return (
      <div className="text-white text-center py-20">
        Product not found
      </div>
    )
  }

  return <ProductClient product={product as Product} />
}

// This makes sure Next.js knows what slugs to build
export const dynamic = "force-dynamic"