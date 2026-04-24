"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ExternalLink, MapPin, CheckCircle2 } from "lucide-react"
import { DustHeading } from "@/components/effects/dust-heading"
import { Button } from "@/components/ui/button"
import { brand, heroHighlights, socialButtons } from "@/lib/brand"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 lg:pt-20">
      <div className="absolute inset-0">
        <Image
          src="/media/branding/gradient-3.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(250,246,239,0.95)_0%,_rgba(250,246,239,0.86)_42%,_rgba(250,246,239,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,_rgba(214,91,69,0.16)_0%,_transparent_32%),radial-gradient(circle_at_84%_16%,_rgba(126,94,76,0.24)_0%,_transparent_30%),radial-gradient(circle_at_76%_78%,_rgba(207,149,116,0.16)_0%,_transparent_36%)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-16">
        <div className="z-10 flex max-w-2xl flex-col justify-center space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground/90">
              {brand.fullName}
            </p>
            <DustHeading
              text="Английский, в котором ребёнок говорит свободно и уверенно"
              preset="cinematic"
              className="font-serif text-4xl leading-[1.03] text-balance sm:text-5xl lg:text-6xl"
            />
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {brand.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-14 bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/#contact">
                Записаться на пробное занятие
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 border-primary/25 bg-background/55 px-8 text-base text-foreground hover:bg-secondary/80"
            >
              <Link href="/#materials">Посмотреть материалы</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border/70 bg-card/70 px-4 py-4 shadow-sm backdrop-blur"
              >
                <p className="text-sm font-medium text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {socialButtons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent/15"
              >
                {button.label}
                <ExternalLink className="h-3 w-3" />
              </Link>
            ))}
          </div>

          <Link
            href={brand.mapOrgUrl}
            target="_blank"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin className="h-4 w-4 text-accent" />
            {brand.address}
          </Link>
        </div>

        <div className="relative flex items-end lg:justify-end">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2.2rem] border border-border/60 bg-card/70 p-7 shadow-[0_30px_90px_rgba(48,39,33,0.16)] backdrop-blur-md">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Как строим обучение
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-foreground">
              Ребёнку интересно, родителю всё прозрачно
            </p>
            <div className="mt-7 space-y-4">
              {[
                "Уровневая программа по CEFR и Cambridge Young Learners",
                "Промежуточные срезы и понятные отчёты для родителей",
                "Форматы: очно, онлайн, индивидуально, в паре и в мини-группе",
                `Старт обучения: ${brand.minAge}`,
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                  <p className="text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border/70 bg-background/85 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Фокус на старте
              </p>
              <p className="mt-2 text-base text-foreground">
                Бесплатное пробное занятие и аккуратный подбор программы под ребёнка.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
