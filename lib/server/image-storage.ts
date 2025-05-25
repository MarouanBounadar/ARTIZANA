import fs from "fs"
import path from "path"
import type { WebsiteImage } from "../image-service"

const jsonPath = path.join(process.cwd(), "app/data/images.json")

export function readImagesFromFile(): Record<string, WebsiteImage> {
  try {
    const file = fs.readFileSync(jsonPath, "utf-8")
    return JSON.parse(file)
  } catch (err) {
    console.error("Failed to read image data:", err)
    return {}
  }
}

export function writeImagesToFile(images: Record<string, WebsiteImage>) {
  fs.writeFileSync(jsonPath, JSON.stringify(images, null, 2))
}