import Image from "next/image"

interface FallbackImageProps {
  width?: number
  height?: number
  className?: string
}

export function FallbackImage({ width = 400, height = 300, className }: FallbackImageProps) {
  return (
    <div className={`relative flex items-center justify-center bg-gold-500/10 ${className}`} style={{ width, height }}>
      <Image src="/placeholder.svg" alt="Placeholder" width={width / 2} height={height / 2} className="opacity-50" />
    </div>
  )
}
