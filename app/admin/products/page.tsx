import Link from "next/link"
import Image from "next/image"
import { PlusCircle, Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlaceholderImage } from "@/components/placeholder-image"

export default function ProductsPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Products</h1>
          <p className="mt-2 text-white/70">Manage your product inventory</p>
        </div>
        <Button className="bg-gold-500 text-black hover:bg-gold-600">
          <Link href="/admin/products/add" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input placeholder="Search products..." className="pl-10 border-gold-500/30 bg-black/50 text-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-gold-500/20 bg-black/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold-500/20">
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Product</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gold-500/10 hover:bg-gold-500/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gold-500/30">
                        <PlaceholderImage text={product.name.substring(0, 1)} />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-white/70">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white">{product.category}</td>
                  <td className="px-4 py-4 text-white">{product.price}</td>
                  <td className="px-4 py-4 text-white">{product.stock}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-500/20 text-green-400"
                          : product.status === "Low Stock"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gold-500/20 px-4 py-4">
          <p className="text-sm text-white/70">Showing 1-8 of 24 products</p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="border-gold-500/30 text-white hover:bg-gold-500/10" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-gold-500/30 text-white hover:bg-gold-500/10">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: "Handcrafted Leather Tote",
    sku: "LT-001",
    category: "Bags",
    price: "1,200 MAD",
    stock: 15,
    status: "In Stock",
    image: "/images/product-1.png",
  },
  {
    id: 2,
    name: "Embroidered Clutch",
    sku: "EC-002",
    category: "Accessories",
    price: "850 MAD",
    stock: 8,
    status: "In Stock",
    image: "/images/product-2.png",
  },
  {
    id: 3,
    name: "Moroccan Leather Pouf",
    sku: "LP-003",
    category: "Home Decor",
    price: "1,500 MAD",
    stock: 12,
    status: "In Stock",
    image: "/images/product-3.png",
  },
  {
    id: 4,
    name: "Handwoven Basket Bag",
    sku: "BB-004",
    category: "Bags",
    price: "950 MAD",
    stock: 5,
    status: "Low Stock",
    image: "/images/product-4.png",
  },
  {
    id: 5,
    name: "Embellished Leather Slippers",
    sku: "LS-005",
    category: "Accessories",
    price: "780 MAD",
    stock: 20,
    status: "In Stock",
    image: "/images/product-5.png",
  },
  {
    id: 6,
    name: "Ceramic Decorative Plate",
    sku: "DP-006",
    category: "Home Decor",
    price: "650 MAD",
    stock: 0,
    status: "Out of Stock",
    image: "/images/product-6.png",
  },
  {
    id: 7,
    name: "Handwoven Wool Throw",
    sku: "WT-007",
    category: "Home Decor",
    price: "1,100 MAD",
    stock: 7,
    status: "In Stock",
    image: "/images/product-7.png",
  },
  {
    id: 8,
    name: "Brass Lantern",
    sku: "BL-008",
    category: "Home Decor",
    price: "890 MAD",
    stock: 3,
    status: "Low Stock",
    image: "/images/product-8.png",
  },
]
