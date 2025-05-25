// This is a mock service that would be replaced with actual API calls in a real application
import type { WebsiteImage } from "@/lib/server/image-storage"

// Example function to fetch via API (optional if using SSR)
export function getCacheVersion(): number {
  return Math.floor(Date.now() / 1000) // simple cache buster
}
export type WebsiteImage = {
  id: number
  name: string
  category: string
  url: string
  description: string
  dimensions: string
  uploadedAt: string
}

// In a real app, this would be fetched from an API
const websiteImages: Record<string, WebsiteImage> = {
  "hero-image": {
    id: 1,
    name: "Hero Image",
    category: "hero",
    url: "/images/hero-image.png",
    description: "Main hero image on the homepage",
    dimensions: "1920x1080",
    uploadedAt: "2025-05-01",
  },
  "collections-header": {
    id: 2,
    name: "Collection Header",
    category: "header",
    url: "/images/collections-header.png",
    description: "Header image for collections page",
    dimensions: "1920x600",
    uploadedAt: "2025-05-01",
  },
  "about-header": {
    id: 3,
    name: "About Header",
    category: "header",
    url: "/images/about-header.png",
    description: "Header image for about page",
    dimensions: "1920x600",
    uploadedAt: "2025-05-01",
  },
  "contact-header": {
    id: 4,
    name: "Contact Header",
    category: "header",
    url: "/images/contact-header.png",
    description: "Header image for contact page",
    dimensions: "1920x600",
    uploadedAt: "2025-05-01",
  },
  "artisans-header": {
    id: 5,
    name: "Artisans Header",
    category: "header",
    url: "/images/artisans-header.png",
    description: "Header image for artisans page",
    dimensions: "1920x600",
    uploadedAt: "2025-05-01",
  },
  craftsmanship: {
    id: 6,
    name: "Craftsmanship Image",
    category: "content",
    url: "/images/craftsmanship.png",
    description: "Image for craftsmanship section",
    dimensions: "800x800",
    uploadedAt: "2025-05-01",
  },
  founder: {
    id: 7,
    name: "Founder Image",
    category: "content",
    url: "/images/founder.png",
    description: "Image of the founder",
    dimensions: "800x1000",
    uploadedAt: "2025-05-01",
  },
  "product-1": {
    id: 8,
    name: "Product 1",
    category: "product",
    url: "/images/product-1.png",
    description: "Handcrafted Leather Tote",
    dimensions: "800x800",
    uploadedAt: "2025-05-01",
  },
  "product-2": {
    id: 9,
    name: "Product 2",
    category: "product",
    url: "/images/product-2.png",
    description: "Embroidered Clutch",
    dimensions: "800x800",
    uploadedAt: "2025-05-01",
  },
  "product-3": {
    id: 10,
    name: "Product 3",
    category: "product",
    url: "/images/product-3.png",
    description: "Moroccan Leather Pouf",
    dimensions: "800x800",
    uploadedAt: "2025-05-01",
  },
  "instagram-1": {
    id: 11,
    name: "Instagram 1",
    category: "social",
    url: "/images/instagram-1.png",
    description: "Instagram post 1",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "instagram-2": {
    id: 12,
    name: "Instagram 2",
    category: "social",
    url: "/images/instagram-2.png",
    description: "Instagram post 2",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "instagram-3": {
    id: 13,
    name: "Instagram 3",
    category: "social",
    url: "/images/instagram-3.png",
    description: "Instagram post 3",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "instagram-4": {
    id: 14,
    name: "Instagram 4",
    category: "social",
    url: "/images/instagram-4.png",
    description: "Instagram post 4",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "instagram-5": {
    id: 15,
    name: "Instagram 5",
    category: "social",
    url: "/images/instagram-5.png",
    description: "Instagram post 5",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "instagram-6": {
    id: 16,
    name: "Instagram 6",
    category: "social",
    url: "/images/instagram-6.png",
    description: "Instagram post 6",
    dimensions: "600x600",
    uploadedAt: "2025-05-01",
  },
  "category-leather": {
    id: 17,
    name: "Leather-Goods",
    category: "product",
    url: "/images/category-leather.png",
    description: "Leather-Goods",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },
    "category-home": {
    id: 18,
    name: "category-home",
    category: "product",
    url: "/images/category-home.png",
    description: "category-home",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },
    "category-accessories": {
    id: 19,
    name: "category-accessories",
    category: "product",
    url: "/images/category-accessories.png",
    description: "category-accessories",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },
    "product-4": {
    id: 20,
    name: "product-4",
    category: "product",
    url: "/images/product-4.png",
    description: "product-4",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  }, "product-5": {
    id: 21,
    name: "product-5",
    category: "product",
    url: "/images/product-5.png",
    description: "product-5",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  }, "product-7": {
    id: 22,
    name: "product-7",
    category: "product",
    url: "/images/product-7.png",
    description: "product-7",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  }, "product-8": {
    id: 23,
    name: "product-8",
    category: "product",
    url: "/images/product-8.png",
    description: "product-8",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },"product-6": {
    id: 24,
    name: "product-6",
    category: "product",
    url: "/images/product-6.png",
    description: "product-6",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },
  "artisan-1": {
    id: 25,
    name: "artisan-1",
    category: "artisan",
    url: "/images/artisan-1.png",
    description: "artisan-1",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },"artisan-2": {
    id: 26,
    name: "artisan-2",
    category: "artisan",
    url: "/images/artisan-2.png",
    description: "artisan-2",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },"artisan-3": {
    id: 27,
    name: "artisan-3",
    category: "artisan",
    url: "/images/artisan-3.png",
    description: "artisan-3",
    dimensions: "600x600",
    uploadedAt: "2025-05-19",
  },
}

// Create a cache invalidation mechanism
let cacheVersion = 1

// Safe getter that won't throw errors
export function getImage(key: string): WebsiteImage | null {
  try {
    return websiteImages[key] || null
  } catch (error) {
    console.error(`Error getting image with key ${key}:`, error)
    return null
  }
}

export function getAllImages(): WebsiteImage[] {
  try {
    return Object.values(websiteImages)
  } catch (error) {
    console.error("Error getting all images:", error)
    return []
  }
}

export function getImagesByCategory(category: string): WebsiteImage[] {
  try {
    return Object.values(websiteImages).filter((img) => img.category === category)
  } catch (error) {
    console.error(`Error getting images by category ${category}:`, error)
    return []
  }
}

export function getImageKey(id: number): string | null {
  try {
    for (const [key, image] of Object.entries(websiteImages)) {
      if (image.id === id) {
        return key
      }
    }
    return null
  } catch (error) {
    console.error(`Error getting image key for id ${id}:`, error)
    return null
  }
}

// In a real app, these functions would make API calls
export async function updateImage(key: string, newImage: Partial<WebsiteImage>): Promise<WebsiteImage> {
  try {
    if (!websiteImages[key]) {
      throw new Error(`Image with key ${key} not found`)
    }

    websiteImages[key] = {
      ...websiteImages[key],
      ...newImage,
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    // Increment cache version to force re-fetching
    cacheVersion++

    return websiteImages[key]
  } catch (error) {
    console.error(`Error updating image with key ${key}:`, error)
    throw error
  }
}

export async function replaceImage(id: number, newImageUrl: string): Promise<WebsiteImage | null> {
  try {
    const key = getImageKey(id)
    if (!key || !websiteImages[key]) {
      throw new Error(`Image with id ${id} not found`)
    }

    websiteImages[key] = {
      ...websiteImages[key],
      url: newImageUrl,
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    // Increment cache version to force re-fetching
    cacheVersion++

    return websiteImages[key]
  } catch (error) {
    console.error(`Error replacing image with id ${id}:`, error)
    throw error
  }
}

export async function uploadImage(key: string, image: Omit<WebsiteImage, "id" | "uploadedAt">): Promise<WebsiteImage> {
  try {
    const newId = Math.max(...Object.values(websiteImages).map((img) => img.id)) + 1

    websiteImages[key] = {
      ...image,
      id: newId,
      uploadedAt: new Date().toISOString().split("T")[0],
    }

    // Increment cache version to force re-fetching
    cacheVersion++

    return websiteImages[key]
  } catch (error) {
    console.error(`Error uploading image with key ${key}:`, error)
    throw error
  }
}

export async function deleteImage(key: string): Promise<void> {
  try {
    if (!websiteImages[key]) {
      throw new Error(`Image with key ${key} not found`)
    }

    delete websiteImages[key]

    // Increment cache version to force re-fetching
    cacheVersion++
  } catch (error) {
    console.error(`Error deleting image with key ${key}:`, error)
    throw error
  }
}



