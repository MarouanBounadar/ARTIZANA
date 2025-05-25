import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ArtisansPage() {
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
          <h1 className="font-serif text-4xl font-light tracking-wider text-white sm:text-5xl">Our Artisans</h1>
          <div className="mt-4 flex items-center text-sm text-white/80">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="mx-2 h-4 w-4" />
            <span>Artisans</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide text-white md:text-4xl">
              The Masters Behind Our Creations
            </h2>
            <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>
            <p className="mt-8 text-white/80 leading-relaxed">
              At ARTIZANA MARRAKECH, we believe that the true value of our products lies in the hands that create them.
              Our artisans are the heart and soul of our brand, each bringing generations of knowledge, skill, and
              passion to their craft. We are proud to introduce you to these remarkable individuals who transform raw
              materials into works of art.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      {artisans.map((artisan, index) => (
        <section
          key={artisan.id}
          className={`py-20 ${index % 2 === 0 ? "bg-black" : "bg-black/90"} border-t border-gold-500/20`}
        >
          <div className="container mx-auto px-4">
            <div
              className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2 ${index % 2 !== 0 ? "md:grid-flow-dense" : ""}`}
            >
              <div className={`${index % 2 !== 0 ? "md:col-start-2" : ""}`}>
                <div className="relative aspect-square overflow-hidden rounded-lg border border-gold-500/30">
                  <Image src={artisan.image || "/placeholder.svg"} alt={artisan.name} fill className="object-cover" />
                </div>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-light tracking-wide text-white">{artisan.name}</h2>
                <p className="mt-2 text-gold-400 font-light">{artisan.specialty}</p>
                <div className="mt-4 h-0.5 w-16 bg-gold-500"></div>
                <p className="mt-6 text-white/80 leading-relaxed">{artisan.bio}</p>
                <div className="mt-8 space-y-4">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-white">Specialties</h3>
                  <ul className="space-y-2">
                    {artisan.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start text-white/80">
                        <span className="mr-2 text-gold-500">•</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-white">Featured Products</h3>
                  <div className="mt-4 flex space-x-4">
                    {artisan.products.map((product, idx) => (
                      <Link
                        key={idx}
                        href={`/product/${product.slug}`}
                        className="group relative h-24 w-24 overflow-hidden rounded-md border border-gold-500/30"
                      >
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40"></div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Craftsmanship Process */}
      <section className="py-20 bg-black border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-3xl font-light tracking-wide text-white md:text-4xl">
            Our Craftsmanship Process
          </h2>
          <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>
          <p className="mt-8 mx-auto max-w-3xl text-center text-white/80 leading-relaxed">
            Each ARTIZANA MARRAKECH piece undergoes a meticulous creation process, combining ancient techniques with
            modern sensibilities. Discover the journey from raw material to finished masterpiece.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {craftProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mx-auto h-20 w-20 rounded-full bg-gold-500/10 flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-gold-500" />
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-black font-medium">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium text-white">{step.title}</h3>
                <p className="mt-4 text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-black/90 border-t border-gold-500/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-light tracking-wide text-white md:text-4xl">
              Join Our Artisan Community
            </h2>
            <div className="mt-2 h-0.5 w-24 bg-gold-500 mx-auto"></div>
            <p className="mt-8 text-white/80 leading-relaxed">
              ARTIZANA MARRAKECH is always looking to collaborate with talented artisans who share our passion for
              Moroccan craftsmanship and our commitment to quality. If you are a skilled craftsperson interested in
              joining our community, we would love to hear from you.
            </p>
            <Button className="mt-8 bg-gold-500 text-black hover:bg-gold-600" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Scissors, Ruler, Palette, Sparkles } from "lucide-react"

const artisans = [
  {
    id: 1,
    name: "Mohammed Khalid",
    specialty: "Master Leather Artisan",
    image: "/images/artisan-1.png",
    bio: "With over 30 years of experience, Mohammed Khalid is a third-generation leather craftsman from Fez. His family has been working with leather since the early 1900s, and Mohammed learned the trade from his father at the age of 12. His exceptional skill in traditional Moroccan leather techniques combined with his innovative approach to design makes his creations truly unique. Mohammed specializes in vegetable-tanned leather goods, using natural dyes and traditional embossing methods.",
    skills: [
      "Traditional Moroccan leather tanning",
      "Hand embossing and tooling",
      "Natural dyeing techniques",
      "Custom leather pattern design",
    ],
    products: [
      { name: "Leather Tote", image: "/images/product-1.png", slug: "leather-tote" },
      { name: "Embroidered Clutch", image: "/images/product-2.png", slug: "embroidered-clutch" },
    ],
  },
  {
    id: 2,
    name: "Fatima Zahra",
    specialty: "Textile Weaver & Embroidery Artist",
    image: "/images/artisan-2.png",
    bio: "Fatima Zahra comes from a long line of women weavers from the Atlas Mountains. She learned the art of weaving and embroidery from her mother and grandmother, preserving techniques that date back centuries. Fatima's work is characterized by intricate patterns and vibrant colors that tell stories of Berber culture and tradition. She works primarily with wool, cotton, and silk, sourcing her materials locally and using natural dyes whenever possible.",
    skills: [
      "Traditional Berber weaving techniques",
      "Hand embroidery and beadwork",
      "Natural fiber processing",
      "Pattern design and color theory",
    ],
    products: [
      { name: "Handwoven Wool Throw", image: "/images/product-7.png", slug: "wool-throw" },
      { name: "Embroidered Pillow", image: "/images/product-6.png", slug: "embroidered-pillow" },
    ],
  },
  {
    id: 3,
    name: "Hassan Benjelloun",
    specialty: "Metalwork & Brass Artisan",
    image: "/images/artisan-3.png",
    bio: "Hassan Benjelloun is a master metalworker from Marrakech who specializes in brass and copper work. His workshop in the medina has been producing exceptional pieces for over two decades. Hassan's craftsmanship combines traditional Moroccan motifs with contemporary design elements, creating pieces that are both functional and artistic. His meticulous attention to detail and commitment to quality have earned him recognition both in Morocco and internationally.",
    skills: [
      "Traditional brass and copper work",
      "Hand engraving and chasing",
      "Metal forming and shaping",
      "Filigree and openwork techniques",
    ],
    products: [
      { name: "Brass Lantern", image: "/images/product-8.png", slug: "brass-lantern" },
      { name: "Engraved Tray", image: "/images/product-5.png", slug: "engraved-tray" },
    ],
  },
]

const craftProcess = [
  {
    title: "Material Selection",
    description:
      "We carefully source the finest raw materials, prioritizing quality, sustainability, and local origin.",
    icon: Palette,
  },
  {
    title: "Design & Planning",
    description:
      "Our artisans develop designs that honor traditional Moroccan aesthetics while incorporating contemporary elements.",
    icon: Ruler,
  },
  {
    title: "Crafting",
    description:
      "Using time-honored techniques passed down through generations, our artisans transform raw materials into beautiful pieces.",
    icon: Scissors,
  },
  {
    title: "Finishing Touches",
    description:
      "Each piece receives meticulous attention to detail in the finishing process, ensuring exceptional quality and beauty.",
    icon: Sparkles,
  },
]
