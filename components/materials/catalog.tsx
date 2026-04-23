"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, BookOpen, Puzzle, FileText, Download, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { materials, categories, type MaterialCategory } from "@/lib/materials-data"
import { MaterialCard } from "./material-card"

const categoryIcons: Record<MaterialCategory, typeof BookOpen> = {
  flashcards: BookOpen,
  games: Puzzle,
  workbooks: FileText,
  printables: Download,
}

export function MaterialsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | "all">("all")
  
  const filteredMaterials = selectedCategory === "all" 
    ? materials 
    : materials.filter(m => m.category === selectedCategory)

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Магазин материалов
          </span>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Каталог материалов
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Карточки, игры, рабочие тетради и ворклисты в PDF. После оплаты
            материал и чек автоматически приходят покупателю на e-mail.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Для печатных комплектов доступен самовывоз из студии по
            предварительному согласованию.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" 
              ? "bg-primary text-primary-foreground" 
              : "border-border hover:bg-secondary"
            }
          >
            <Filter className="w-4 h-4 mr-2" />
            Все материалы
          </Button>
          {categories.map((category) => {
            const Icon = categoryIcons[category.id]
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-primary text-primary-foreground" 
                  : "border-border hover:bg-secondary"
                }
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            )
          })}
        </div>
        
        <p className="text-muted-foreground mb-8">
          Найдено материалов: {filteredMaterials.length}
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMaterials.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
        
        {filteredMaterials.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              В этой категории пока нет материалов
            </p>
          </div>
        )}
        
        <div className="mt-16 rounded-3xl bg-secondary/50 p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Как это работает?
            </h2>
            <div className="grid sm:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">1. Выберите</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите материалы, подходящие возрасту вашего ребёнка
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">2. Оплатите</h3>
                <p className="text-sm text-muted-foreground">
                  Оплата проходит через LeadPay. Подтверждение и чек формируются автоматически.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">3. Получите материал</h3>
                <p className="text-sm text-muted-foreground">
                  PDF приходит на e-mail сразу после оплаты, а печатные наборы доступны для самовывоза.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
