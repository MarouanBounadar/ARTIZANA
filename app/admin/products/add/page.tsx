"use client"
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, ImageIcon } from "lucide-react"

export default function AddProductPage() {
  const [features, setFeatures] = useState<string[]>([""])
  const [images, setImages] = useState<{ preview: string; file?: File }[]>([])
  const [colors, setColors] = useState<string[]>([""])

  const addFeature = () => {
    setFeatures([...features, ""])
      return (
    <div className="container mx-auto">
      <form method="POST" action="/api/products/add" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Product name" />
        <textarea name="description" placeholder="Description"></textarea>
        <input type="number" name="price" placeholder="Price" />
        <input type="file" name="images" multiple />

        {/* Hidden + checkbox for booleans */}
        <input type="hidden" name="in_stock" value="false" />
        <input type="checkbox" name="in_stock" value="true" defaultChecked />

        <input type="hidden" name="published" value="false" />
        <input type="checkbox" name="published" value="true" defaultChecked />

        {/* Submit Button */}
        <button type="submit">Publish Product</button>
      </form>
    </div>
  );

  }

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...features]
    updatedFeatures[index] = value
    setFeatures(updatedFeatures)
  }

  const removeFeature = (index: number) => {
    const updatedFeatures = [...features]
    updatedFeatures.splice(index, 1)
    setFeatures(updatedFeatures)
  }

  const addColor = () => {
    setColors([...colors, ""])
  }

  const updateColor = (index: number, value: string) => {
    const updatedColors = [...colors]
    updatedColors[index] = value
    setColors(updatedColors)
  }

  const removeColor = (index: number) => {
    const updatedColors = [...colors]
    updatedColors.splice(index, 1)
    setColors(updatedColors)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }))
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    const updatedImages = [...images]
    if (updatedImages[index].preview) {
      URL.revokeObjectURL(updatedImages[index].preview)
    }
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const form = new FormData()

  // Read values from inputs
  const name = (document.getElementById("name") as HTMLInputElement)?.value
  const price = (document.getElementById("price") as HTMLInputElement)?.value
  const sku = (document.getElementById("sku") as HTMLInputElement)?.value
  const description = (document.getElementById("description") as HTMLTextAreaElement)?.value

  const width = (document.getElementById("width") as HTMLInputElement)?.value
  const height = (document.getElementById("height") as HTMLInputElement)?.value
  const depth = (document.getElementById("depth") as HTMLInputElement)?.value
  const weight = (document.getElementById("weight") as HTMLInputElement)?.value
  const stock = (document.getElementById("stock") as HTMLInputElement)?.value

  // Append fields
  form.append("name", name || "")
  form.append("price", price || "")
  form.append("sku", sku || "")
  form.append("description", description || "")
  form.append("width", width || "")
  form.append("height", height || "")
  form.append("depth", depth || "")
  form.append("weight", weight || "")
  form.append("stock", stock || "")

  // Add colors and features
  form.append("colors", JSON.stringify(colors))
  form.append("features", JSON.stringify(features))

  // Add images
  for (const img of images) {
    if (img.file) {
      form.append("images", img.file)
    }
  }

  const res = await fetch("/api/products/add", {
    method: "POST",
    body: form,
  })

  if (res.ok) {
    alert("Product submitted successfully!")
  } else {
    alert("Failed to submit product.")
  }
}
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Add New Product</h1>
        <p className="mt-2 text-white/70">Create a new product to add to your store</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Product Name
              </Label>
              <Input
                id="name"
                placeholder="Enter product name"
                className="border-gold-500/30 bg-black/50 text-white"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Price (MAD)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="border-gold-500/30 bg-black/50 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-white">
                  SKU
                </Label>
                <Input
                  id="sku"
                  placeholder="SKU-12345"
                  className="border-gold-500/30 bg-black/50 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <Select>
                <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="bags">Bags</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="home-decor">Home Decor</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="artisan" className="text-white">
                Artisan
              </Label>
              <Select>
                <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                  <SelectValue placeholder="Select artisan" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  <SelectItem value="mohammed-khalid">Mohammed Khalid</SelectItem>
                  <SelectItem value="fatima-zahra">Fatima Zahra</SelectItem>
                  <SelectItem value="hassan-benjelloun">Hassan Benjelloun</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter product description"
                className="min-h-32 border-gold-500/30 bg-black/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Colors</Label>
              <div className="space-y-3">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      placeholder="Enter color name"
                      className="border-gold-500/30 bg-black/50 text-white"
                    />
                    {colors.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeColor(index)}
                        className="h-10 w-10 border-gold-500/30 text-white hover:bg-gold-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addColor}
                  className="mt-2 border-gold-500/30 text-white hover:bg-gold-500/10"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Color
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Features</Label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Enter product feature"
                      className="border-gold-500/30 bg-black/50 text-white"
                    />
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="h-10 w-10 border-gold-500/30 text-white hover:bg-gold-500/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="mt-2 border-gold-500/30 text-white hover:bg-gold-500/10"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Feature
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Product Images</Label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-md border border-gold-500/30 bg-black/30 overflow-hidden"
                  >
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gold-500/30 bg-black/30 transition-colors hover:border-gold-500/50 hover:bg-gold-500/5">
                  <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                    <ImageIcon className="h-8 w-8 text-white/70" />
                    <span className="text-xs text-white/70">Upload Image</span>
                  </div>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} multiple />
                </label>
              </div>
              <p className="text-xs text-white/70">
                Upload up to 6 images. First image will be the main product image.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions" className="text-white">
                Dimensions (cm)
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input id="width" placeholder="Width" className="border-gold-500/30 bg-black/50 text-white" />
                </div>
                <div>
                  <Input id="height" placeholder="Height" className="border-gold-500/30 bg-black/50 text-white" />
                </div>
                <div>
                  <Input id="depth" placeholder="Depth" className="border-gold-500/30 bg-black/50 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight" className="text-white">
                Weight (g)
              </Label>
              <Input id="weight" type="number" placeholder="0" className="border-gold-500/30 bg-black/50 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-white">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                className="border-gold-500/30 bg-black/50 text-white"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white">Product Status</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                 <input type="hidden" name="in_stock" value="false" />
<input type="hidden" name="in_stock" value="false" />
<input
  type="checkbox"
  id="in-stock"
  name="in_stock"
  value="true"
  defaultChecked
/>
<label htmlFor="in-stock">In Stock</label>

                </div>
                <div className="flex items-center space-x-2">
                 <input type="hidden" name="featured" value="false" />
<input
  type="checkbox"
  id="featured"
  name="featured"
  value="true"
/>
<label htmlFor="featured">Featured Product</label>





                </div>
                <div className="flex items-center space-x-2">
                 <input type="hidden" name="published" value="false" />
<input
  type="checkbox"
  id="published"
  name="published"
  value="true"
  defaultChecked
/>
<label htmlFor="published">Published</label>

                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-title" className="text-white">
                Meta Title (SEO)
              </Label>
              <Input
                id="meta-title"
                placeholder="Meta title for SEO"
                className="border-gold-500/30 bg-black/50 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta-description" className="text-white">
                Meta Description (SEO)
              </Label>
              <Textarea
                id="meta-description"
                placeholder="Meta description for SEO"
                className="border-gold-500/30 bg-black/50 text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" className="border-gold-500/30 text-white hover:bg-gold-500/10">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-gold-500 text-black hover:bg-gold-600">
            Publish Product
          </Button>
        </div>
      </form>
    </div>
  )
}
