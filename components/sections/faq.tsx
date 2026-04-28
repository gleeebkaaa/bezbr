"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "С какого возраста можно начинать занятия?",
    answer: "Мы работаем с детьми от 3,5 лет. На пробном занятии смотрим, как ребёнок реагирует на английскую речь, игру и задания, а затем подбираем формат: индивидуально, в паре или в мини-группе."
  },
  {
    question: "Ребёнок занимается давно, но почти не говорит. Почему так бывает?",
    answer: "Частая причина — упор на заучивание слов и правил без живой коммуникации. В мастерской мы строим урок так, чтобы ребёнок применял язык сразу: через диалог, игру, реакцию на речь и наглядные задания."
  },
  {
    question: "Ребёнок знает буквы, но не читает. Это нормально?",
    answer: "Да. Знание букв — только первый шаг. Чтобы читать, ребёнку нужно научиться соединять звуки, узнавать структуру слова и регулярно тренироваться на понятных примерах."
  },
  {
    question: "Ребёнок боится говорить по-английски. Что делать?",
    answer: "Сначала снимаем страх ошибки. Ребёнок начинает говорить быстрее, когда понимает: его не будут сравнивать, перебивать или стыдить. Мы ведём к состоянию «я могу сказать» через короткие фразы, игру и повторение."
  },
  {
    question: "Ребёнок будет отвлекаться и баловаться в группе?",
    answer: "Группы небольшие, а структура урока динамичная: смена активности, наглядность и движение. Это удерживает внимание и помогает направлять энергию ребёнка в задачу."
  },
  {
    question: "Как вы отслеживаете результат?",
    answer: "Мы проводим тесты, контрольные и уровневые срезы, ориентируясь на CEFR и Cambridge Young Learners. Родители получают статистику и понимают, что уже получается у ребёнка и какой следующий шаг."
  },
  {
    question: "Есть ли деление по уровням?",
    answer: "Да. Программы строятся по уровням Starters (Pre-A1/A1), Movers (A1/A2), Flyers (A2/A2+) на базе Family and Friends. Это даёт понятный маршрут движения и для ребёнка, и для родителя."
  },
  {
    question: "Как проходит пробное занятие?",
    answer: "Пробное занятие бесплатное. После урока обсуждаем с родителем формат (очно/онлайн, индивидуально/пара/мини-группа), подходящую программу и удобный график."
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Частые вопросы
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Ответы на ваши вопросы
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Собрали самые частые вопросы от родителей.
            Если не нашли нужный ответ, свяжитесь с нами, и мы всё подробно
            подскажем.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
