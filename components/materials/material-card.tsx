import Link from "next/link"
import Image from "next/image"
import { Users, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Material, categories, getMaterialCover } from "@/lib/materials-data"

type MaterialCardProps = {
  material: Material
}

export function MaterialCard({ material }: MaterialCardProps) {
  const category = categories.find(c => c.id === material.category)
  const cover = getMaterialCover(material)
  
  return (
    <Link 
      href={`/materials/${material.slug}`}
      className="group block bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-accent/50 transition-all duration-300"
    >
      <div className="aspect-[4/3] relative">
        <Image
          src={cover}
          alt={material.title}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_45%,_rgba(12,15,22,0.5)_100%)]" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {material.bestseller && (
            <Badge className="bg-accent text-foreground border-0">
              Хит продаж
            </Badge>
          )}
          {material.featured && !material.bestseller && (
            <Badge variant="secondary">
              Рекомендуем
            </Badge>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Category */}
        <span className="text-xs font-medium text-accent uppercase tracking-wider">
          {category?.label}
        </span>
        
        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {material.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {material.description}
        </p>
        
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {material.age}
          </span>
          <span>{material.format}</span>
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <span className="font-serif text-2xl font-semibold text-primary">
              {material.price} ₽
            </span>
            {material.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {material.originalPrice} ₽
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant="ghost"
            className="text-primary hover:text-primary hover:bg-accent/20"
          >
            Купить и получить PDF
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </Link>
  )
}
