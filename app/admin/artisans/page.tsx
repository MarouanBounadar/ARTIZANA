import Image from "next/image"
import { PlusCircle, Search, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ArtisansPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Artisans</h1>
          <p className="mt-2 text-white/70">Manage your artisan profiles</p>
        </div>
        <Button className="bg-gold-500 text-black hover:bg-gold-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Artisan
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input placeholder="Search artisans..." className="pl-10 border-gold-500/30 bg-black/50 text-white" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artisans.map((artisan) => (
          <div key={artisan.id} className="rounded-lg border border-gold-500/20 bg-black/30 overflow-hidden">
            <div className="relative h-48 w-full">
              <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{artisan.name}</h2>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gold-400">{artisan.specialty}</p>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{artisan.bio}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-white/70">{artisan.products} products</span>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                    artisan.active ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {artisan.active ? "Active" : "On Leave"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const artisans = [
  {
    id: 1,
    name: "Mohammed Khalid",
    specialty: "Master Leather Artisan",
    bio: "With over 30 years of experience, Mohammed Khalid is a third-generation leather craftsman from Fez. His family has been working with leather since the early 1900s.",
    products: 12,
    active: true,
    image: "/images/artisan-1.png",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    specialty: "Textile Weaver & Embroidery Artist",
    bio: "Fatima Zahra comes from a long line of women weavers from the Atlas Mountains. She learned the art of weaving and embroidery from her mother and grandmother.",
    products: 8,
    active: true,
    image: "/images/artisan-2.png",
  },
  {
    id: 3,
    name: "Hassan Benjelloun",
    specialty: "Metalwork & Brass Artisan",
    bio: "Hassan Benjelloun is a master metalworker from Marrakech who specializes in brass and copper work. His workshop in the medina has been producing exceptional pieces for over two decades.",
    products: 10,
    active: true,
    image: "/images/artisan-3.png",
  },
  {
    id: 4,
    name: "Amina Tazi",
    specialty: "Ceramic Artist",
    bio: "Amina Tazi creates beautiful ceramic pieces inspired by traditional Moroccan patterns and designs. Her work combines ancient techniques with contemporary aesthetics.",
    products: 7,
    active: true,
    image: "/images/artisan-4.png",
  },
  {
    id: 5,
    name: "Youssef El Mansouri",
    specialty: "Wood Carver",
    bio: "Youssef El Mansouri is known for his intricate wood carvings that showcase the rich tradition of Moroccan craftsmanship. He specializes in cedar wood and walnut.",
    products: 5,
    active: false,
    image: "/images/artisan-5.png",
  },
  {
    id: 6,
    name: "Laila Bennani",
    specialty: "Jewelry Designer",
    bio: "Laila Bennani creates stunning jewelry pieces that blend traditional Moroccan motifs with modern design sensibilities. She works primarily with silver and semi-precious stones.",
    products: 9,
    active: true,
    image: "/images/artisan-6.png",
  },
]
