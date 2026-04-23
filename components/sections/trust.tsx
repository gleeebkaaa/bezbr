"use client"

import { Check, MapPin, Award, Users, TrendingUp, Heart } from "lucide-react"

const advantages = [
  {
    icon: Heart,
    title: "Без давления и сравнения",
    description: "В мастерской нет крика и обесценивания. Ребёнок учится в безопасной атмосфере."
  },
  {
    icon: TrendingUp,
    title: "Полное погружение в язык",
    description: "На занятии английский звучит как рабочий язык общения, а не отдельный предмет."
  },
  {
    icon: Award,
    title: "Результат с доказательной базой",
    description: "Тесты, контрольные и итоговые срезы показывают динамику, а не субъективные ощущения."
  },
  {
    icon: Users,
    title: "Формат под ребёнка",
    description: "Индивидуально, в паре или в мини-группе. Подбираем темп без перегруза."
  },
  {
    icon: MapPin,
    title: "Авторские материалы",
    description: "В работе карточки, настольные игры и ворклисты, созданные под формат мастерской."
  },
  {
    icon: Check,
    title: "Развитие мышления и soft-skills",
    description: "Через английский развиваем гибкость, логику, креативность, работу в команде и публичность."
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
            Что отличает мастерскую от обычных школ
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Для родителей это не просто «весело и красиво», а системная работа
            с понятными этапами и прозрачным результатом.
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
              text: "Бесплатный старт, чтобы ребёнок и родитель поняли, что формат подходит.",
            },
            {
              title: "Система уровней",
              text: "Движение по CEFR и Young Learners: от Starters к Movers и Flyers.",
            },
            {
              title: "Статистика для родителей",
              text: "Показываем динамику в понятном формате: что уже получается и что усиливаем дальше.",
            },
            {
              title: "Цифровые материалы",
              text: "PDF-наборы с оплатой и автоматической отправкой на e-mail, печатные комплекты доступны для самовывоза.",
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
