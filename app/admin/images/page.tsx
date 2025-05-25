"use client"

import type React from "react"
 // Make sure this exists!
import { useState, useEffect } from "react"
import Image from "next/image"
import { Upload, Trash2, Search, RefreshCw, Edit, Eye, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAllImages, deleteImage, replaceImage, getImageKey } from "@/lib/image-service"
import type { WebsiteImage } from "@/lib/image-service"


export default function ImagesPage() {
  
  const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null);
  const [images, setImages] = useState<WebsiteImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [replaceDialogOpen, setReplaceDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<WebsiteImage | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState<File | null>(null)
  const [newImageData, setNewImageData] = useState({
    name: "",
    category: "content",
    description: "",
  })

  const { toast } = useToast()

  useEffect(() => {
    // Load images
    loadImages()
  }, [])

  const loadImages = () => {
    setLoading(true)
    // In a real app, this would be an API call
    const fetchedImages = getAllImages()
    setImages(fetchedImages)
    setLoading(false)
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadingImage(file)
      setPreviewImage(URL.createObjectURL(file))
      setNewImageData({
        ...newImageData,
        name: file.name.split(".")[0],
      })
    }
  }

  const handleReplaceImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUploadingImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSubmitImage = async () => {
  if (!uploadingImage) {
    toast({
      title: "Error",
      description: "Please select an image to upload",
      variant: "destructive",
    });
    return;
  }

  const formData = new FormData();
  formData.append("file", uploadingImage);

  try {
    const res = await fetch("/api/upload", {
  method: "POST",
  body: formData,

    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to upload");
    }

    const { filename } = await res.json();
    const imageUrl = `public/images/${filename}` ; // Corrected line

    const newImage = {
      id: images.length + 1,
      name: newImageData.name,
      category: newImageData.category,
      url: imageUrl,
      description: newImageData.description,
      dimensions: "800x600",
      uploadedAt: new Date().toISOString().split("T")[0],
    };

    setImages([...images, newImage]);
    setUploadDialogOpen(false);
    setPreviewImage(null);
    setUploadingImage(null);
    setNewImageData({ name: "", category: "content", description: "" });

    toast({
      title: "Success",
      description: "Image uploaded successfully",
    });
  } catch (error: any) {
    toast({
      title: "Upload Error",
      description: error.message,
      variant: "destructive",
    });
  }
};
  const handleReplaceImage = (image: WebsiteImage) => {
    setSelectedImage(image)
    setReplaceDialogOpen(true)
  }

  const handleSubmitReplaceImage = async () => {
    if (!uploadingImage || !selectedImageKey || !selectedImage) {
    alert("Missing image or key");
    return;
  }

  const formData = new FormData();
  formData.append("file", uploadingImage);
  formData.append("key", selectedImageKey);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });



  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const { filename } = await res.json()
    const imageUrl = `/images/${filename}`

    await replaceImage(selectedImage.id, imageUrl)

    toast({
      title: "Success",
      description: "Image replaced successfully.",
      variant: "default",
    })

    setReplaceDialogOpen(false)
  } catch (error) {
    console.error(error)
    toast({
      title: "Upload failed",
      description: "An error occurred while uploading the image.",
      variant: "destructive",
    })
  }
}
  const handleDeleteImage = async (id: number) => {
    try {
      const key = getImageKey(id)
      if (key) {
        await deleteImage(key)
        setImages(images.filter((image) => image.id !== id))

        toast({
          title: "Success",
          description: "Image deleted successfully",
        })
      } else {
        throw new Error("Image key not found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  const handleRefresh = () => {
    loadImages()
    toast({
      title: "Refreshed",
      description: "Image list has been refreshed",
    })
  }

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Website Images</h1>
          <p className="mt-2 text-white/70">Manage images across your website</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold-500 text-black hover:bg-gold-600">
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black border-gold-500/30 text-white">
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
              <DialogDescription className="text-white/70">Upload a new image to use on your website</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="image-upload">Image</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-md border border-gold-500/30 bg-black/50">
                    {previewImage ? (
                      <Image src={previewImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="border-gold-500/30 bg-black/50 text-white"
                    />
                    <p className="mt-2 text-xs text-white/50">Recommended formats: JPG, PNG. Max size: 5MB</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-name">Name</Label>
                <Input
                  id="image-name"
                  value={newImageData.name}
                  onChange={(e) => setNewImageData({ ...newImageData, name: e.target.value })}
                  className="border-gold-500/30 bg-black/50 text-white"
                  placeholder="Enter image name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-category">Category</Label>
                <Select
                  value={newImageData.category}
                  onValueChange={(value) => setNewImageData({ ...newImageData, category: value })}
                >
                  <SelectTrigger className="border-gold-500/30 bg-black/50 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-gold-500/30 text-white">
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="header">Header</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="background">Background</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image-description">Description</Label>
                <Textarea
                  id="image-description"
                  value={newImageData.description}
                  onChange={(e) => setNewImageData({ ...newImageData, description: e.target.value })}
                  className="border-gold-500/30 bg-black/50 text-white"
                  placeholder="Enter image description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setUploadDialogOpen(false)}
                className="border-gold-500/30 text-white hover:bg-gold-500/10"
              >
                Cancel
              </Button>
              <Button onClick={handleSubmitImage} className="bg-gold-500 text-black hover:bg-gold-600">
                Upload
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Replace Image Dialog */}
        <Dialog open={replaceDialogOpen} onOpenChange={setReplaceDialogOpen}>
          <DialogContent className="bg-black border-gold-500/30 text-white">
            <DialogHeader>
              <DialogTitle>Replace Image</DialogTitle>
              <DialogDescription className="text-white/70">
                Upload a new image to replace {selectedImage?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Current Image</Label>
                <div className="relative h-40 w-full overflow-hidden rounded-md border border-gold-500/30 bg-black/50">
                  {selectedImage && (
                    <Image
                      src={selectedImage.url || "/placeholder.svg"}
                      alt={selectedImage.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="replace-image-upload">New Image</Label>
                <div className="flex items-center gap-4">
                  <div className="relative h-40 w-40 overflow-hidden rounded-md border border-gold-500/30 bg-black/50">
                    {previewImage ? (
                      <Image src={previewImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-10 w-10 text-white/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="replace-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleReplaceImageUpload}
                      className="border-gold-500/30 bg-black/50 text-white"
                    />
                    <p className="mt-2 text-xs text-white/50">
                      Recommended formats: JPG, PNG. Max size: 5MB. Try to use the same dimensions as the original
                      image.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setReplaceDialogOpen(false)
                  setSelectedImage(null)
                  setPreviewImage(null)
                  setUploadingImage(null)
                }}
                className="border-gold-500/30 text-white hover:bg-gold-500/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReplaceImage}
                className="bg-gold-500 text-black hover:bg-gold-600"
                disabled={!previewImage}
              >
                Replace Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Search images..."
            className="pl-10 border-gold-500/30 bg-black/50 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] border-gold-500/30 bg-black/50 text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-black border-gold-500/30 text-white">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="header">Header</SelectItem>
              <SelectItem value="content">Content</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="background">Background</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="border-gold-500/30 text-white hover:bg-gold-500/10"
            onClick={handleRefresh}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList className="bg-black border border-gold-500/20 p-1">
          <TabsTrigger value="grid" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            Grid View
          </TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-gold-500 data-[state=active]:text-black">
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="bg-black/30 border-gold-500/20 shadow-lg animate-pulse">
                  <div className="aspect-square w-full bg-gold-500/10"></div>
                  <CardContent className="p-4">
                    <div className="h-4 w-3/4 bg-gold-500/10 rounded"></div>
                    <div className="mt-2 h-3 w-1/2 bg-gold-500/10 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => {
  const imageKey = getImageKey(image.id) // Make sure this is imported

  return (
    <Card
      key={image.id}
      onClick={() => {
        setSelectedImage(image)
        setSelectedImageKey(imageKey)
      }}
      className="bg-black/30 border-gold-500/20 shadow-lg hover:shadow-gold-500/5 transition-all duration-300 hover:translate-y-[-2px] overflow-hidden group"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image.url || "/placeholder.svg"}
          alt={image.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => handleReplaceImage(image)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => handleDeleteImage(image.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-white truncate">{image.name}</h3>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-white/70">{image.dimensions}</span>
          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gold-500/10 text-gold-400">
            {image.category}
          </span>
        </div>
      </CardContent>
    </Card>
  )
})}
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          <Card className="bg-black/30 border-gold-500/20 shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold-500/20">
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Image</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Dimensions</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Uploaded</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-white/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index} className="border-b border-gold-500/10">
                          <td className="px-4 py-4">
                            <div className="h-10 w-10 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 w-24 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 w-16 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 w-20 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-4 w-24 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="h-8 w-20 bg-gold-500/10 rounded animate-pulse"></div>
                          </td>
                        </tr>
                      ))
                    : filteredImages.map((image) => (
                        <tr key={image.id} className="border-b border-gold-500/10 hover:bg-gold-500/5">
                          <td className="px-4 py-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-md border border-gold-500/30">
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={image.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-white">{image.name}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gold-500/10 text-gold-400">
                              {image.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-white">{image.dimensions}</td>
                          <td className="px-4 py-4 text-white/70">{image.uploadedAt}</td>
                          <td className="px-4 py-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-gold-500/30 text-white hover:bg-gold-500/10"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-gold-500/30 text-white hover:bg-gold-500/10"
                                onClick={() => handleReplaceImage(image)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-gold-500/30 text-white hover:bg-gold-500/10"
                                onClick={() => handleDeleteImage(image.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
