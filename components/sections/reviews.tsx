"use client"

import { MessageCircle } from "lucide-react"

const reviews = [
  {
    title: "Есть система, а не хаотичные уроки",
    text: "Родители отмечают, что ребёнок двигается по понятным этапам, а не просто «посещает занятия».",
  },
  {
    title: "Ребёнку спокойно и интересно",
    text: "Тёплая атмосфера и бережная подача помогают детям включаться в английский без страха ошибки.",
  },
  {
    title: "Появляется живая речь",
    text: "Через коммуникацию, игру и практику дети начинают говорить фразами и увереннее реагировать на речь.",
  },
  {
    title: "Прогресс можно проверить",
    text: "Регулярные тесты и статистика дают прозрачную картину результата для семьи.",
  }
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 lg:py-32 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Что отмечают родители
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Что важно родителям после старта
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Родители чаще всего отмечают спокойную атмосферу, понятную систему
            обучения и заметный прогресс ребёнка в речи.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-3xl border border-border hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6">
                <MessageCircle className="w-10 h-10 text-accent/60" />
              </div>
              
              <h3 className="font-semibold text-xl text-foreground mb-3">
                {review.title}
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
