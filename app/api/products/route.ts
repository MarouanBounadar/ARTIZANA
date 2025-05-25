// app/api/products/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
const { data: rawProducts, error } = await supabase
  .from("products")
    .select("*")
    .eq("published", true)
    .eq("in_stock", true)
const products = rawProducts?.map((p) => ({
  ...p,
  imagePaths: p.image_paths, // alias it
}));

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(products)
}