export type Product = {
  id: string
  name: string
  description: string
  price: number
  colors: string[]
  features: string[]
  imagePaths: string[]
  images: string[]   // Add this if used
  inStock: boolean
  slug: string
  category?: string  // if needed
  artisan?: string   // if needed
}