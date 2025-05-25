import { NextResponse } from "next/server" 
import { supabase } from "@/database/supbase"
 import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) 
{ 
  const formData = await req.formData()
const bucket = process.env.SUPABASE_BUCKET || "product-images";
const name = formData.get("name") as string 
const description = formData.get("description") as string
 const price = parseFloat(formData.get("price") as string) 
 const colors = JSON.parse(formData.get("colors") as string || "[]")
  const features = JSON.parse(formData.get("features") as string || "[]")
   const images = formData.getAll("images") as File[]
    const category = formData.get("category") as string
    const artisan = formData.get("artisan") as string 
    const in_stock = formData.get("in_stock") === "true"
     const featured = formData.get("featured") === "true"
      const published = formData.get("published") === "true" 
      const stock_quantity = parseInt(formData.get("stock_quantity") as string || "0") 
      const width = parseFloat(formData.get("width") as string || "0") 
      const height = parseFloat(formData.get("height") as string || "0") 
      const depth = parseFloat(formData.get("depth") as string || "0") 
      const weight = parseFloat(formData.get("weight") as string || "0")
       const meta_title = formData.get("meta_title") as string 
       const meta_description = formData.get("meta_description") as string 
       const sku = formData.get("sku") as string 
       const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + uuidv4().slice(0, 6)

const imagePaths: string[] = []

for (const file of images) { 
 const { data: uploadedImage, error: uploadError } = await supabase.storage
  .from(bucket)
  .upload(`products/${Date.now()}-${file.name}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

if (uploadError) {
  console.error("Upload failed:", uploadError);
  return NextResponse.json({ success: false, error: uploadError.message }, { status: 500 });
}

const publicUrl = supabase.storage.from(bucket).getPublicUrl(uploadedImage.path).data.publicUrl;

imagePaths.push(publicUrl);
const { data, error } = await supabase .from("products") .insert([ { name, description, price, colors, features, image_paths: imagePaths, category, artisan, in_stock, featured, published, stock_quantity, width, height, depth, weight, meta_title, meta_description, slug, sku } ])

if (error) { console.error("Supabase insert error:", error) 
  return NextResponse.json({ success: false }, { status: 500 }) }

return NextResponse.json({ success: true }) 
}
}