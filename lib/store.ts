import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  price: number
  color: string
  quantity: number
  image: string
}

export type Product = {
  id: string
  name: string
  price: number
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
  id: string
  name: string
  specialty: string
  image: string
  bio: string
  skills: string[]
  products: { name: string; image: string; slug: string }[]
  active: boolean
}

// Initial data - defined before store creation
type State = {
  cart: CartItem[]
  products: Product[]
  artisans: Artisan[]
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  searchQuery: string
  addToCart: (product: Product, color: string, quantity: number) => void
  removeFromCart: (id: string) => void
  updateCartItemQuantity: (id: string, quantity: number) => void
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
      products: [],
      artisans: [],
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
      products: [],
      artisans: [],
    })
  }
}
