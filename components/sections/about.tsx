"use client"

import { Heart, MessageCircle, Sparkles, Shield, BarChart3, Brain } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Психологическая безопасность",
    description: "Спокойная и уважительная атмосфера: без давления, сравнения и стыда за ошибку."
  },
  {
    icon: MessageCircle,
    title: "Язык как коммуникация",
    description: "Английский сразу работает как язык общения: в диалоге, вопросах и живых ситуациях."
  },
  {
    icon: Sparkles,
    title: "Наглядность, игра и движение",
    description: "Слова и конструкции закрепляются через активные задания, визуальные материалы и игру."
  },
  {
    icon: BarChart3,
    title: "Прозрачный результат",
    description: "Тесты и контрольные срезы показывают динамику, а родители получают понятную статистику."
  },
  {
    icon: Shield,
    title: "Комплексный подход",
    description: "Развиваем все ключевые навыки: аудирование, речь, чтение, письмо, лексику и грамматику."
  },
  {
    icon: Brain,
    title: "Развитие soft-skills",
    description: "Через английский тренируем память, логику, креативность, командную работу и самопрезентацию."
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                О мастерской
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
                Английский как живая речь, а не набор правил
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">«Без Барьера»</span>{" "}
                — детская языковая мастерская в Москве, где ребёнку спокойно
                говорить, пробовать, ошибаться и постепенно выходить в уверенную речь.
              </p>
              <p>
                Мы работаем по уровням CEFR и программам Cambridge Young
                Learners (Starters, Movers, Flyers). Для ребёнка это
                живые занятия с играми, движением и разговорной практикой, для
                родителей — понятный маршрут и видимый прогресс.
              </p>
              <p>
                На занятиях ребёнок осваивает язык и одновременно развивает
                мышление, внимание, гибкость, умение договариваться и уверенно
                выражать свои мысли.
              </p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
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
      </div>
    </section>
  )
}
