"use client"

import Image from "next/image"
import { Heart, MessageCircle, Sparkles, Shield, BarChart3, Brain, Quote } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Психологическая безопасность",
    description: "Ребёнок может пробовать, ошибаться и говорить в своём темпе: без давления, сравнения и стыда."
  },
  {
    icon: MessageCircle,
    title: "Язык как коммуникация",
    description: "Английский звучит на занятии в диалогах, вопросах, просьбах и ситуациях, близких ребёнку."
  },
  {
    icon: Sparkles,
    title: "Наглядность, игра и движение",
    description: "Новые слова и конструкции закрепляются через карточки, движение, игру и понятные визуальные опоры."
  },
  {
    icon: BarChart3,
    title: "Прозрачный результат",
    description: "Контрольные срезы показывают динамику, а родители видят, что уже получается и куда двигаемся дальше."
  },
  {
    icon: Shield,
    title: "Комплексный подход",
    description: "В программе вместе развиваются речь, аудирование, чтение, письмо, лексика и грамматика."
  },
  {
    icon: Brain,
    title: "Развитие soft-skills",
    description: "Через английский ребёнок тренирует память, логику, гибкость, командную работу и самопрезентацию."
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.04fr_0.96fr] gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                О мастерской
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Английский, который ребёнок проживает, а не просто учит
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">«Без Барьера»</span>{" "}
                — детская языковая мастерская в Москве, где английский входит
                в жизнь ребёнка через разговор, движение, игру и спокойную поддержку.
              </p>
              <p>
                Мы работаем по уровням CEFR и программам Cambridge Young
                Learners: Starters, Movers, Flyers. Для ребёнка это живые
                занятия, где можно пробовать и говорить без страха, для
                родителей — понятный маршрут, регулярная обратная связь и
                видимая динамика.
              </p>
              <p>
                На занятиях мы не отделяем язык от развития личности: ребёнок
                учится думать, задавать вопросы, договариваться, выступать,
                делать небольшие проекты и выражать своё мнение на английском.
              </p>
            </div>
          </div>
          
          <div className="grid gap-6">
            <div className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_24px_80px_rgba(48,39,33,0.12)]">
              <Image
                src="/placeholder-user.jpg"
                alt="Основатель мастерской"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover opacity-75 grayscale-[12%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(28,25,22,0.02)_0%,_rgba(28,25,22,0.18)_100%)]" />
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background p-7 shadow-sm sm:p-8">
              <div className="absolute inset-0 opacity-70">
                <Image
                  src="/media/branding/gradient-2.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-background/80 text-primary shadow-sm">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Миссия мастерской
                </p>
                <p className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                  Дать ребёнку опыт, в котором английский становится способом
                  говорить, узнавать мир и чувствовать себя свободнее.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-2xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
