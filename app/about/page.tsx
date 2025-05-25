import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Page Header */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
 <Image
  src="/images/LOGO1.png"
  alt="Logo top-left"
  width={120}
  height={60}
  className="absolute top-4 left-4 opacity-90 z-10"
/>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-4xl font-light tracking-wider text-white sm:text-5xl">Our Story</h1>
          <div className="mt-4 flex items-center text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>About</span>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide text-stone-800 md:text-4xl">
              The ARTIZANA MARRAKECH Journey
            </h2>
            <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>
            <p className="mt-8 text-stone-600 leading-relaxed">
              ARTIZANA MARRAKECH was founded with a vision to preserve and celebrate the rich artisanal heritage of
              Morocco. Our journey began in the heart of Marrakech's medina, where we were captivated by the skill and
              dedication of local artisans whose craft had been passed down through generations.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Inspired by their stories and techniques, we set out to create a brand that would honor these traditions
              while bringing them into the contemporary world. Each ARTIZANA MARRAKECH piece embodies this philosophy,
              blending time-honored craftsmanship with modern design sensibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-stone-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src="/images/founder.png" alt="Founder of ARTIZANA MARRAKECH" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-stone-800">Our Founder</h2>
              <div className="mt-2 h-0.5 w-24 bg-gold-500"></div>
              <p className="mt-6 text-stone-600 leading-relaxed">
                After years of traveling throughout Morocco and developing deep relationships with local artisans, our
                founder established ARTIZANA MARRAKECH with a commitment to ethical craftsmanship and cultural
                preservation.
              </p>
              <p className="mt-4 text-stone-600 leading-relaxed">
                "My vision for ARTIZANA MARRAKECH is to create a bridge between the rich artisanal traditions of Morocco
                and the contemporary global market. By celebrating these time-honored techniques and the skilled hands
                behind them, we not only preserve cultural heritage but also ensure its relevance for future
                generations."
              </p>
              <p className="mt-4 italic text-stone-500">— Founder, ARTIZANA MARRAKECH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-stone-800">Our Values</h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.id} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/10">
                  <value.icon className="h-8 w-8 text-gold-500" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium text-stone-800">{value.title}</h3>
                <p className="mt-4 text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="bg-black py-20 text-white border-y border-gold-500/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide md:text-4xl text-white">Our Artisans</h2>
            <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>
            <p className="mt-8 text-stone-300 leading-relaxed">
              Behind every ARTIZANA MARRAKECH creation is a skilled artisan with years of experience and a deep
              connection to Moroccan craft traditions. We work directly with these talented individuals, ensuring fair
              compensation and sustainable working conditions.
            </p>
            <p className="mt-4 text-stone-300 leading-relaxed">
              By choosing ARTIZANA MARRAKECH, you're not just acquiring a beautiful object – you're supporting the
              livelihoods of these artisans and helping to preserve their invaluable cultural knowledge.
            </p>
            <Button className="mt-8 bg-gold-500 text-black hover:bg-gold-600" size="lg">
              Meet Our Artisans
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Leaf, Heart, Sparkles } from "lucide-react"

const values = [
  {
    id: 1,
    title: "Artisanal Excellence",
    description:
      "We uphold the highest standards of craftsmanship, honoring traditional techniques while embracing innovation.",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Cultural Heritage",
    description:
      "We are committed to preserving and celebrating Morocco's rich artistic traditions and sharing them with the world.",
    icon: Heart,
  },
  {
    id: 3,
    title: "Sustainability",
    description:
      "We prioritize ethical practices, from sourcing materials responsibly to ensuring fair compensation for our artisans.",
    icon: Leaf,
  },
]
