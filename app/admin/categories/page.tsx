import { PlusCircle, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Categories</h1>
          <p className="mt-2 text-white/70">Manage your product categories</p>
        </div>
        <Button className="bg-gold-500 text-black hover:bg-gold-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-lg border border-gold-500/20 bg-black/30 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">{category.name}</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/70">{category.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-white/70">{category.productCount} products</span>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  category.active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                }`}
              >
                {category.active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const categories = [
  {
    id: 1,
    name: "Bags",
    description: "Handcrafted leather bags and accessories",
    productCount: 12,
    active: true,
  },
  {
    id: 2,
    name: "Home Decor",
    description: "Decorative items for your home",
    productCount: 18,
    active: true,
  },
  {
    id: 3,
    name: "Accessories",
    description: "Fashion accessories and jewelry",
    productCount: 9,
    active: true,
  },
  {
    id: 4,
    name: "Textiles",
    description: "Handwoven textiles and fabrics",
    productCount: 7,
    active: true,
  },
  {
    id: 5,
    name: "Pottery",
    description: "Traditional Moroccan pottery",
    productCount: 5,
    active: true,
  },
  {
    id: 6,
    name: "Seasonal",
    description: "Seasonal and limited edition items",
    productCount: 3,
    active: false,
  },
]
