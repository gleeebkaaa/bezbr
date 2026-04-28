"use client"

import { Check, MapPin, Award, Users, TrendingUp, Heart } from "lucide-react"

const advantages = [
  {
    icon: Heart,
    title: "Без давления и сравнения",
    description: "Спокойная атмосфера без крика и стыда за ошибки. Ребёнок учится с внутренней уверенностью."
  },
  {
    icon: TrendingUp,
    title: "Английский как язык общения",
    description: "На занятии английский используется в живой речи, а не остаётся только в упражнениях."
  },
  {
    icon: Award,
    title: "Понятный и измеримый результат",
    description: "Промежуточные и итоговые срезы показывают реальный прогресс ребёнка по шагам."
  },
  {
    icon: Users,
    title: "Формат под темперамент ребёнка",
    description: "Индивидуально, в паре или в мини-группе — подбираем формат, в котором ребёнку легче включиться в речь."
  },
  {
    icon: MapPin,
    title: "Авторские материалы",
    description: "Карточки, игры и ворклисты созданы под формат занятий и помогают быстрее включаться в речь."
  },
  {
    icon: Check,
    title: "Развитие мышления и soft-skills",
    description: "Через язык развиваем логику, креативность, гибкость, командную работу и навыки выступления."
  }
]

export function TrustSection() {
  return (
    <section className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Почему выбирают нас
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Почему родители выбирают «Без Барьера»
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Ребёнку интересно заниматься, а родитель видит систему: уровень,
            задачи, динамику и следующий шаг в обучении.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="flex gap-4 p-6 bg-card rounded-2xl border border-border hover:border-accent/50 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <advantage.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-4">
          {[
            {
              title: "Пробное занятие",
              text: "Бесплатный старт, чтобы спокойно познакомиться с форматом и преподавателем.",
            },
            {
              title: "Система уровней",
              text: "Последовательное движение по CEFR: Starters, Movers и Flyers без разрывов в программе.",
            },
            {
              title: "Статистика для родителей",
              text: "Регулярно показываем, что у ребёнка уже получается и на чём сфокусироваться дальше.",
            },
            {
              title: "Цифровые материалы",
              text: "Материалы доступны в цифровом формате, а печатные комплекты можно забрать самовывозом из студии.",
            },
          ].map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border bg-background/80 p-5 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {point.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
