"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const oneTimePrices = [
  { format: "Индивидуальное занятие", price: "3 000 ₽" },
  { format: "Парное занятие", price: "2 500 ₽" },
  { format: "Групповое занятие", price: "2 000 ₽" },
]

const monthlyPrices = [
  { format: "Индивидуальные занятия", price: "15 200 ₽" },
  { format: "Парные занятия", price: "13 680 ₽" },
  { format: "Групповые занятия", price: "11 400 ₽" },
]

export function PricesSection() {
  return (
    <section id="prices" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Стоимость занятий
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Открытые цены на старте
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Варианты оплаты сразу показаны на главной: разово за занятие или
            по абонементу на календарный месяц.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Разово
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">
              Оплата за каждое занятие
            </h3>
            <ul className="mt-6 space-y-4">
              {oneTimePrices.map((item) => (
                <li
                  key={item.format}
                  className="flex items-center justify-between border-b border-border pb-3 text-foreground"
                >
                  <span>{item.format}</span>
                  <span className="font-serif text-2xl font-semibold text-primary">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Оплата производится разово за каждое занятие путём предоплаты.
              Количество занятий меняется в зависимости от календарного месяца.
            </p>
          </article>

          <article className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Абонемент
            </p>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-foreground">
              Фиксированный платёж в месяц
            </h3>
            <ul className="mt-6 space-y-4">
              {monthlyPrices.map((item) => (
                <li
                  key={item.format}
                  className="flex items-center justify-between border-b border-border pb-3 text-foreground"
                >
                  <span>{item.format}</span>
                  <span className="font-serif text-2xl font-semibold text-primary">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Оплата фиксирована за календарный месяц и не меняется в
              зависимости от количества занятий в этом месяце.
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-secondary/50 p-6 text-center text-sm leading-relaxed text-foreground">
          Длительность одного занятия: <span className="font-semibold">55 минут</span>.
          Пробное занятие: <span className="font-semibold">бесплатно</span>.
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/#contact">
              Записаться на пробное занятие
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
