import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, ExternalLink } from "lucide-react"
import { brand, socialButtons } from "@/lib/brand"

const footerLinks = {
  main: [
    { href: "/#about", label: "О мастерской" },
    { href: "/#programs", label: "Программы" },
    { href: "/#materials", label: "Материалы" },
    { href: "/#prices", label: "Цены" },
  ],
  support: [
    { href: "/#reviews", label: "Отзывы" },
    { href: "/#faq", label: "Частые вопросы" },
    { href: "/#contact", label: "Контакты" },
    { href: "/privacy", label: "Политика конфиденциальности" },
  ]
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/media/branding/logo-main-transparent-180.webp"
                alt={brand.fullName}
                width={180}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {brand.fullName}. Очно и онлайн: занятия, материалы и понятный
              маршрут для родителей.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Навигация</h4>
            <ul className="space-y-3">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Информация</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href={brand.mapOrgUrl}
                  target="_blank"
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{brand.address}</span>
                </Link>
              </li>
              <li>
                <Link 
                  href={brand.phoneHref}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>{brand.phone}</span>
                </Link>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              {socialButtons.map((button) => (
                <Link
                  key={button.href}
                  href={button.href}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/20"
                >
                  {button.label}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {brand.name}. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground">
            Работаем для родителей и детей в Москве
          </p>
        </div>
      </div>
    </footer>
  )
}
