// app/api/products/route.ts

import { createClient } from "@supabase/supabase-js"
import { initialProducts } from "@/lib/store"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  const { data: dbProducts, error } = await supabase.from("products").select("*")

  const allProducts = [
    ...initialProducts,
    ...(dbProducts ?? []) // ✅ FIXED: if dbProducts is null, use []
  ].map((p) => ({
    ...p,
    images: p.images ?? [],
    features: p.features ?? [],
    colors: p.colors ?? [],
    category: p.category ?? "Uncategorized",
    artisan: p.artisan ?? "Unknown",
    inStock: p.inStock ?? true,
  }))

  return new Response(JSON.stringify(allProducts), {
    headers: { "Content-Type": "application/json" },
  })
}