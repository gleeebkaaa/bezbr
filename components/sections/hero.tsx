"use client"

import type { CSSProperties } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, MapPin, CheckCircle2 } from "lucide-react"
import { DustHeading } from "@/components/effects/dust-heading"
import { Button } from "@/components/ui/button"
import { brand, heroHighlights, socialButtons } from "@/lib/brand"

const floatingLetters = [
  { letter: "A", x: "8%", y: "18%", size: "clamp(3.8rem, 8vw, 8rem)", dx: "22px", dy: "-34px", rotate: "-9deg", duration: "16s", delay: "-2s" },
  { letter: "B", x: "73%", y: "10%", size: "clamp(3rem, 6vw, 6rem)", dx: "-28px", dy: "26px", rotate: "12deg", duration: "18s", delay: "-8s" },
  { letter: "C", x: "88%", y: "42%", size: "clamp(4rem, 9vw, 9rem)", dx: "-44px", dy: "-18px", rotate: "-16deg", duration: "20s", delay: "-4s" },
  { letter: "D", x: "50%", y: "78%", size: "clamp(3rem, 7vw, 7rem)", dx: "38px", dy: "-30px", rotate: "8deg", duration: "17s", delay: "-11s" },
  { letter: "E", x: "16%", y: "68%", size: "clamp(3.4rem, 7vw, 7rem)", dx: "30px", dy: "24px", rotate: "15deg", duration: "19s", delay: "-6s" },
  { letter: "F", x: "58%", y: "30%", size: "clamp(2.8rem, 6vw, 5.8rem)", dx: "-30px", dy: "-24px", rotate: "-4deg", duration: "15s", delay: "-1s" },
  { letter: "G", x: "32%", y: "8%", size: "clamp(2.8rem, 6vw, 5.6rem)", dx: "18px", dy: "34px", rotate: "18deg", duration: "21s", delay: "-9s" },
  { letter: "H", x: "82%", y: "76%", size: "clamp(3rem, 7vw, 6.8rem)", dx: "-24px", dy: "-40px", rotate: "6deg", duration: "18s", delay: "-13s" },
  { letter: "I", x: "42%", y: "18%", size: "clamp(2.2rem, 5vw, 5rem)", dx: "34px", dy: "18px", rotate: "-14deg", duration: "13s", delay: "-5s" },
  { letter: "J", x: "92%", y: "16%", size: "clamp(2.6rem, 5.5vw, 5.4rem)", dx: "-36px", dy: "30px", rotate: "20deg", duration: "14s", delay: "-10s" },
  { letter: "K", x: "6%", y: "46%", size: "clamp(2.8rem, 6vw, 6rem)", dx: "42px", dy: "-16px", rotate: "9deg", duration: "15s", delay: "-7s" },
  { letter: "L", x: "28%", y: "52%", size: "clamp(2.4rem, 5vw, 5.2rem)", dx: "-20px", dy: "34px", rotate: "-18deg", duration: "12s", delay: "-3s" },
  { letter: "M", x: "64%", y: "58%", size: "clamp(3.2rem, 7vw, 7.2rem)", dx: "28px", dy: "-38px", rotate: "7deg", duration: "16s", delay: "-12s" },
  { letter: "N", x: "38%", y: "88%", size: "clamp(2.5rem, 5vw, 5.4rem)", dx: "20px", dy: "-32px", rotate: "16deg", duration: "13s", delay: "-9s" },
  { letter: "O", x: "94%", y: "66%", size: "clamp(2.8rem, 6vw, 6.2rem)", dx: "-46px", dy: "-22px", rotate: "-10deg", duration: "15s", delay: "-1s" },
  { letter: "P", x: "21%", y: "28%", size: "clamp(2.4rem, 5vw, 5.2rem)", dx: "24px", dy: "28px", rotate: "11deg", duration: "12s", delay: "-6s" },
  { letter: "Q", x: "71%", y: "88%", size: "clamp(2.5rem, 5vw, 5.6rem)", dx: "-34px", dy: "-28px", rotate: "-6deg", duration: "14s", delay: "-4s" },
  { letter: "R", x: "47%", y: "44%", size: "clamp(2.2rem, 5vw, 5rem)", dx: "36px", dy: "-24px", rotate: "22deg", duration: "13s", delay: "-8s" },
] as const

export function HeroSection() {
  return (
    <section className="hero-brand-field relative overflow-hidden pt-16 lg:pt-20">
      <div className="hero-grain absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,248,251,0.84)_0%,_rgba(255,248,251,0.64)_45%,_rgba(255,248,251,0.28)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {floatingLetters.map((item) => (
          <span
            key={`${item.letter}-${item.x}`}
            className="floating-letter"
            style={
              {
                "--letter-x": item.x,
                "--letter-y": item.y,
                "--letter-size": item.size,
                "--letter-dx": item.dx,
                "--letter-dy": item.dy,
                "--letter-rotate": item.rotate,
                "--letter-duration": item.duration,
                "--letter-delay": item.delay,
              } as CSSProperties
            }
          >
            {item.letter}
          </span>
        ))}
      </div>

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
              className="h-14 bg-primary px-8 text-base text-primary-foreground shadow-[0_18px_45px_rgba(237,127,172,0.28)] hover:bg-primary/90"
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
              className="h-14 border-primary/15 bg-card/55 px-8 text-base text-foreground backdrop-blur hover:bg-secondary/80"
            >
              <Link href="/#materials">Посмотреть материалы</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/70 bg-card/58 px-4 py-4 shadow-[0_18px_48px_rgba(126,92,132,0.09)] backdrop-blur-md"
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
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-card/55 px-4 py-2 text-sm text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary/80"
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
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2.2rem] border border-white/70 bg-card/62 p-7 shadow-[0_30px_90px_rgba(126,92,132,0.18)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[var(--brand-pink)] via-[var(--brand-sky)] to-[var(--brand-lemon)]" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Как строим обучение
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight text-foreground">
              Ребёнку интересно говорить, родителю понятно, как растёт результат
            </p>
            <div className="mt-7 space-y-4">
              {[
                "Уровневая программа по CEFR и Cambridge Young Learners",
                "Регулярные тесты и отчёты по конкретным навыкам",
                "Форматы: очно, онлайн, индивидуально, в паре и в мини-группе",
                `Старт обучения: ${brand.minAge}`,
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-accent" />
                  <p className="text-sm leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/70 bg-background/76 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Фокус на старте
              </p>
              <p className="mt-2 text-base text-foreground">
                После заявки согласуем дату, проведём пробную встречу, обсудим
                уровень ребёнка и предложим следующий шаг.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
