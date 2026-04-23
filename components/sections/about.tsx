"use client"

import { Heart, MessageCircle, Sparkles, Shield, BarChart3, Brain } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Психологическая безопасность",
    description: "Мы не давим и не сравниваем детей. В группе спокойная среда, где можно ошибаться и пробовать снова."
  },
  {
    icon: MessageCircle,
    title: "Язык как коммуникация",
    description: "Английский используется как способ общения и познания мира, а не как набор отдельных правил."
  },
  {
    icon: Sparkles,
    title: "Наглядность, игра и движение",
    description: "Ребёнок учит слова и структуры через активные задания, визуальные материалы и практику в действии."
  },
  {
    icon: BarChart3,
    title: "Прозрачный результат",
    description: "Проводим тесты и промежуточные контрольные, показываем родителям статистику прогресса."
  },
  {
    icon: Shield,
    title: "Комплексный подход",
    description: "В работе одновременно аудирование, говорение, чтение, письмо, грамматика и лексика."
  },
  {
    icon: Brain,
    title: "Развитие soft-skills",
    description: "Через английский развиваем память, логику, креативность, командность и умение формулировать своё мнение."
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
                Полное погружение в язык с понятной системой для родителей
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">«Без Барьера»</span>{" "}
                — языковая мастерская для детей от 3,5 лет, где английский
                становится естественной частью общения, игры и познания мира.
              </p>
              <p>
                Мы работаем по уровневой системе CEFR и программам Cambridge
                Young Learners (Starters, Movers, Flyers). Для ребёнка это
                живой и интересный процесс, для родителей — чёткая система с
                понятной динамикой результата.
              </p>
              <p>
                На занятиях ребёнок не только учит английский, но и тренирует
                мышление, гибкость и навыки взаимодействия с другими детьми.
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
