"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brand } from "@/lib/brand"

const navLinks = [
  { href: "/#about", label: "О мастерской" },
  { href: "/#programs", label: "Программы" },
  { href: "/#materials", label: "Материалы" },
  { href: "/#prices", label: "Цены" },
  { href: "/#reviews", label: "Отзывы" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#contact", label: "Контакты" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/media/branding/logo-main-transparent-180.webp"
              alt={brand.fullName}
              width={180}
              height={45}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{brand.address}</span>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/#contact">Записаться</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <Menu className="w-6 h-6" />
            <span className="sr-only">Открыть меню</span>
          </Button>
        </div>

        {isOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-border bg-background py-5"
          >
            <div className="flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{brand.address}</span>
                  </div>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/#contact" onClick={() => setIsOpen(false)}>
                      Записаться на занятие
                    </Link>
                  </Button>
                </div>
              </div>
          </div>
        )}
      </div>
    </header>
  )
}
