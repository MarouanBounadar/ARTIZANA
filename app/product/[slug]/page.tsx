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
    .limit(1).maybeSingle();

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
export const dynamicParams = true; // optional: allows dynamic routes

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data: products } = await supabase.from("products").select("slug")
  if (!products) return [];

return products.map((product) => ({
  slug: product.slug,
}))

}
function single() {
  throw new Error("Function not implemented.");
}

