// app/product/[slug]/page.tsx
import { notFound } from "next/navigation"
import { Product, useStore } from "@/lib/store"
import ProductClient from "./ProductClient"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { products } = useStore.getState()

  // Find product by slug
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductClient product={product as Product} />
}