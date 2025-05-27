import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type CartItem = {
  id: number
  name: string
  price: string
  color: string
  quantity: number
  image: string
}

export type Product = {
  id: number
  name: string
  price: string
  description?: string
  features?: string[]
  images: string[]
  colors: string[]
  inStock: boolean
  artisan?: string
  category: string
  slug: string
}

export type Artisan = {
  id: number
  name: string
  specialty: string
  image: string
  bio: string
  skills: string[]
  products: { name: string; image: string; slug: string }[]
  active: boolean
}

// Initial data - defined before store creation
export const initialProducts: Product[] = [

  {
    id: 1,
    name: "Handcrafted Leather Tote",
    price: "1,200 MAD",
    description:
      "This exquisite handcrafted leather tote exemplifies the finest Moroccan craftsmanship. Made from premium locally-sourced leather, each bag is meticulously created by our skilled artisans using traditional techniques passed down through generations. The intricate embossed patterns are inspired by the geometric motifs found in Moroccan architecture, while the spacious interior offers practical functionality for everyday use.",
    features: [
      "100% genuine Moroccan leather",
      "Hand-embossed traditional patterns",
      "Vegetable-tanned using natural dyes",
      "Interior pocket and cotton lining",
      "Brass hardware with antique finish",
      "Dimensions: 40cm x 30cm x 12cm",
    ],
    images: [
      "/images/product-1.png",
      "/images/product-detail-2.png",
      "/images/product-detail-3.png",
      "/images/product-detail-4.png",
    ],
    colors: ["Brown", "Tan", "Black"],
    inStock: true,
    artisan: "Mohammed Khalid",
    category: "Bags",
    slug: "handcrafted-leather-tote",
  },
  {
    id: 2,
    name: "Embroidered Clutch",
    price: "850 MAD",
    description:
      "This elegant embroidered clutch combines traditional Moroccan embroidery techniques with contemporary design. Each piece is handcrafted by skilled artisans who have perfected their craft over generations.",
    features: [
      "Hand-embroidered with silk thread",
      "Genuine leather backing",
      "Brass clasp closure",
      "Interior pocket",
      "Dimensions: 25cm x 15cm x 5cm",
    ],
    images: ["/images/product-2.png", "/images/product-detail-5.png", "/images/product-detail-6.png"],
    colors: ["Black", "Red", "Blue"],
    inStock: true,
    artisan: "Fatima Zahra",
    category: "Accessories",
    slug: "embroidered-clutch",
  },
  {
    id: 3,
    name: "Moroccan Leather Pouf",
    price: "1,500 MAD",
    description:
      "This authentic Moroccan leather pouf is a versatile piece that adds exotic charm to any space. Handcrafted by master artisans in Marrakech, each pouf features intricate embroidery and is made from high-quality, naturally tanned leather.",
    features: [
      "100% genuine Moroccan leather",
      "Hand-embroidered designs",
      "Stuffed with sustainable materials",
      "Doubles as seating or footrest",
      "Dimensions: 50cm diameter x 30cm height",
    ],
    images: ["/images/product-3.png", "/images/product-detail-7.png", "/images/product-detail-8.png"],
    colors: ["Tan", "Brown", "White"],
    inStock: true,
    artisan: "Mohammed Khalid",
    category: "Home Decor",
    slug: "moroccan-leather-pouf",
  },
  {
    id: 4,
    name: "Handwoven Basket Bag",
    price: "950 MAD",
    description:
      "This charming handwoven basket bag combines traditional Moroccan weaving techniques with modern style. Perfect for summer outings or as a unique accent piece for your home.",
    features: [
      "Handwoven from sustainable palm leaves",
      "Leather handles and trim",
      "Cotton lining with interior pocket",
      "Dimensions: 35cm x 25cm x 15cm",
    ],
    images: ["/images/product-4.png", "/images/product-detail-9.png", "/images/product-detail-10.png"],
    colors: ["Natural", "Black Trim", "Brown Trim"],
    inStock: true,
    artisan: "Fatima Zahra",
    category: "Bags",
    slug: "handwoven-basket-bag",
  },
  {
    id: 5,
    name: "Embellished Leather Slippers",
    price: "780 MAD",
    description:
      "These traditional Moroccan slippers, known as babouches, are handcrafted from soft leather and embellished with intricate embroidery. Comfortable and elegant, they bring a touch of Moroccan luxury to your everyday life.",
    features: [
      "Soft leather upper and lining",
      "Hand-embroidered designs",
      "Cushioned insole",
      "Durable leather sole",
      "Available in multiple sizes",
    ],
    images: ["/images/product-5.png", "/images/product-detail-11.png", "/images/product-detail-12.png"],
    colors: ["Gold", "Red", "Blue"],
    inStock: true,
    artisan: "Hassan Benjelloun",
    category: "Accessories",
    slug: "embellished-leather-slippers",
  },
  {
    id: 6,
    name: "Ceramic Decorative Plate",
    price: "650 MAD",
    description:
      "This hand-painted ceramic plate showcases the intricate geometric patterns that are characteristic of traditional Moroccan design. Each piece is individually crafted and painted by skilled artisans in Fez.",
    features: [
      "Hand-thrown ceramic",
      "Hand-painted with natural pigments",
      "Food safe glaze",
      "Suitable for display or serving",
      "Diameter: 30cm",
    ],
    images: ["/images/product-6.png", "/images/product-detail-13.png", "/images/product-detail-14.png"],
    colors: ["Blue", "Green", "Multicolor"],
    inStock: false,
    artisan: "Amina Tazi",
    category: "Home Decor",
    slug: "ceramic-decorative-plate",
  },
  {
    id: 7,
    name: "Handwoven Wool Throw",
    price: "1,100 MAD",
    description:
      "This luxurious handwoven wool throw is crafted by skilled weavers in the Atlas Mountains. Made from 100% natural wool, it features traditional Berber patterns and provides both warmth and striking visual appeal.",
    features: [
      "100% natural wool",
      "Handwoven on traditional looms",
      "Natural dyes",
      "Fringed edges",
      "Dimensions: 200cm x 150cm",
    ],
    images: ["/images/product-7.png", "/images/product-detail-15.png", "/images/product-detail-16.png"],
    colors: ["Natural", "Black/White", "Red/Black"],
    inStock: true,
    artisan: "Fatima Zahra",
    category: "Home Decor",
    slug: "handwoven-wool-throw",
  },
  {
    id: 8,
    name: "Brass Lantern",
    price: "890 MAD",
    description:
      "This intricately pierced brass lantern casts enchanting patterns of light and shadow. Handcrafted by master metalworkers in Marrakech, it brings the magic of Moroccan nights into your home.",
    features: [
      "Hand-pierced brass",
      "Antiqued finish",
      "Glass panels",
      "Suitable for candles or electric lights",
      "Dimensions: 25cm x 25cm x 40cm",
    ],
    images: ["/images/product-8.png", "/images/product-detail-17.png", "/images/product-detail-18.png"],
    colors: ["Brass", "Silver", "Copper"],
    inStock: true,
    artisan: "Hassan Benjelloun",
    category: "Home Decor",
    slug: "brass-lantern",
  },
]

export const initialArtisans: Artisan[] = [

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
      { name: "Leather Tote", image: "/images/product-1.png", slug: "handcrafted-leather-tote" },
      { name: "Moroccan Leather Pouf", image: "/images/product-3.png", slug: "moroccan-leather-pouf" },
    ],
    active: true,
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
      { name: "Handwoven Wool Throw", image: "/images/product-7.png", slug: "handwoven-wool-throw" },
      { name: "Embroidered Clutch", image: "/images/product-2.png", slug: "embroidered-clutch" },
    ],
    active: true,
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
      { name: "Embellished Leather Slippers", image: "/images/product-5.png", slug: "embellished-leather-slippers" },
    ],
    active: true,
  },
]

type State = {
  cart: CartItem[]
  products: Product[]
  artisans: Artisan[]
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  searchQuery: string
  addToCart: (product: Product, color: string, quantity: number) => void
  removeFromCart: (id: number) => void
  updateCartItemQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setSearchQuery: (query: string) => void
}

// Create store with improved persistence configuration
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      products: initialProducts,
      artisans: initialArtisans,
      isAuthenticated: false,
      user: null,
      searchQuery: "",

      addToCart: (product, color, quantity) => {
        const cart = get().cart
        const existingItem = cart.find((item) => item.id === product.id && item.color === color)

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id && item.color === color ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          })
        } else {
          set({
            cart: [
              ...cart,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                color,
                quantity,
                image: product.images[0],
              },
            ],
          })
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        })
      },

      updateCartItemQuantity: (id, quantity) => {
        set({
          cart: get().cart.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ cart: [] })
      },

      login: async (email, password) => {
        // Mock authentication - in a real app, this would call an API
        if (email === "admin@artizanamarrakech.com" && password === "admin123") {
          set({
            isAuthenticated: true,
            user: { name: "Admin User", email },
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        })
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query })
      },
    }),
    {
      name: "artizana-storage",
      storage: createJSONStorage(() => {
        // Only use localStorage on the client side
        if (typeof window !== "undefined") {
          return localStorage
        }
        // Provide a dummy storage for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      }),
      partialize: (state) => ({
        cart: state.cart,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      // Skip hydration on server
      skipHydration: true,
    },
  ),
)

// Create a hook to hydrate the store on the client side
export function useHydrateStore() {
  const { products, artisans } = useStore.getState()

  // Only hydrate if needed (products or artisans are empty)
  if (products.length === 0 || artisans.length === 0) {
    useStore.setState({
      products: initialProducts,
      artisans: initialArtisans,
    })
  }
}
