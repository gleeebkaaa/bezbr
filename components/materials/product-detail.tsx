"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, FileText, Users, Download, Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  type Material,
  categories,
  getMaterialsByCategory,
  getMaterialCover,
} from "@/lib/materials-data"
import { MaterialCard } from "./material-card"
import { CheckoutModal } from "./checkout-modal"

type ProductDetailProps = {
  material: Material
}

export function ProductDetail({ material }: ProductDetailProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const category = categories.find(c => c.id === material.category)
  const cover = getMaterialCover(material)
  const relatedMaterials = getMaterialsByCategory(material.category)
    .filter(m => m.id !== material.id)
    .slice(0, 4)

  return (
    <>
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              href="/materials" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к каталогу
            </Link>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="aspect-square rounded-3xl relative overflow-hidden border border-border">
                <Image
                  src={cover}
                  alt={material.title}
                  width={1400}
                  height={1400}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_45%,_rgba(12,15,22,0.5)_100%)]" />

                <div className="absolute top-4 left-4 flex gap-2">
                  {material.bestseller && (
                    <Badge className="bg-accent text-foreground border-0 text-sm px-3 py-1">
                      Хит продаж
                    </Badge>
                  )}
                  {material.featured && !material.bestseller && (
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      Рекомендуем
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                {category?.label}
              </span>
              
              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-tight">
                {material.title}
              </h1>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {material.longDescription}
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border">
                <div className="flex items-center gap-2 text-foreground">
                  <Users className="w-5 h-5 text-accent" />
                  <span>{material.age}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <FileText className="w-5 h-5 text-accent" />
                  <span>{material.format}</span>
                </div>
                {material.pages && (
                  <div className="flex items-center gap-2 text-foreground">
                    <Download className="w-5 h-5 text-accent" />
                    <span>{material.pages} стр.</span>
                  </div>
                )}
              </div>
              
              {/* What's included */}
              {material.includes && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">
                    Что входит в набор:
                  </h3>
                  <ul className="space-y-3">
                    {material.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Price and CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                <div>
                  <span className="font-serif text-4xl font-semibold text-primary">
                    {material.price} ₽
                  </span>
                  {material.originalPrice && (
                    <span className="ml-3 text-lg text-muted-foreground line-through">
                      {material.originalPrice} ₽
                    </span>
                  )}
                </div>
                <Button 
                  size="lg"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Купить
                </Button>
              </div>
              
              {/* Delivery note */}
              <div className="bg-secondary/50 rounded-2xl p-6">
                <h4 className="font-semibold text-foreground mb-2">
                  Получение материала
                </h4>
                <p className="text-sm text-muted-foreground">
                  После оплаты вы получите PDF и чек на e-mail. Если нужен
                  печатный комплект, доступен самовывоз из студии по
                  согласованию с администратором.
                </p>
              </div>
            </div>
          </div>
          
          {/* Related products */}
          {relatedMaterials.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">
                Похожие материалы
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedMaterials.map((relatedMaterial) => (
                  <MaterialCard key={relatedMaterial.id} material={relatedMaterial} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      
      <CheckoutModal 
        material={material}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  )
}
