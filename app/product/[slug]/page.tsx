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
        <h1>Product not found</h1>
      </div>
    )
  }

  return <ProductClient product={product as Product} />
}

// This ensures static paths are generated for each product
export async function generateStaticParams() {
  const { data: products } = await supabase.from("products").select("slug")

  return (products || []).map((product) => ({
    slug: product.slug,
  }))
}