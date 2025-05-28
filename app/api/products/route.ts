// app/api/products/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { initialProducts } from "@/lib/store"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
)

export async function GET() {
  const { data: dbProducts, error } = await supabase.from("products").select("*")
  const allProducts = [...initialProducts, ...(dbProducts || [])]
  return NextResponse.json(allProducts)
}