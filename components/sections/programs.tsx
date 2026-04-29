"use client"

import Link from "next/link"
import { ArrowRight, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { brand } from "@/lib/brand"

const programs = [
  {
    age: "Pre A1 / A1",
    title: "Starters",
    description: "Первый устойчивый шаг: ребёнок понимает простую речь, отвечает короткими фразами и привыкает говорить без напряжения.",
    features: [
      "Family and Friends Starter, 1, 2",
      "База лексики и простых конструкций",
      "Подготовка к экзамену Starters",
      "Фундамент для чтения и говорения",
    ],
    duration: brand.lessonDuration,
    groupSize: "Мини-группа / пара / индивидуально",
    color: "bg-accent/20"
  },
  {
    age: "A1 / A2",
    title: "Movers",
    description: "Укрепляем базу: ребёнок строит более длинные фразы, увереннее читает и лучше понимает задания на слух.",
    features: [
      "Family and Friends Starter, 3, 4",
      "Системная практика чтения и аудирования",
      "Подготовка к экзамену Movers",
      "Регулярная проверка прогресса",
    ],
    duration: brand.lessonDuration,
    groupSize: "Мини-группа / пара / индивидуально",
    color: "bg-primary/10"
  },
  {
    age: "A2 / A2+",
    title: "Flyers",
    description: "Выводим язык на устойчивый уровень: больше самостоятельной речи, письменных заданий, проектов и подготовки к A2+.",
    features: [
      "Family and Friends 5, 6",
      "Подготовка к экзамену Flyers и уровню A2+",
      "Проектная работа и публичные мини-выступления",
      "Плавный переход к программам B1+",
    ],
    duration: brand.lessonDuration,
    groupSize: "Мини-группа / пара / индивидуально",
    color: "bg-secondary"
  }
]

export function ProgramsSection() {
  return (
    <section id="programs" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Программы обучения
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Уровневые программы: Starters, Movers и Flyers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Уровневые программы по международным стандартам CEFR: Starters
            (Pre-A1/A1) — первые фразы и понимание простой речи; Movers
            (A1/A2) — уверенное чтение и аудирование; Flyers (A2/A2+) —
            самостоятельная речь и проекты. Регулярные тесты и отчёты для
            родителей: видите динамику по конкретным навыкам, а не общие
            впечатления.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {["Очно", "Онлайн", "Индивидуально", "В паре", "Мини-группа"].map((format) => (
            <span
              key={format}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground"
            >
              {format}
            </span>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="relative bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`${program.color} p-6 pb-8`}>
                <span className="inline-block px-3 py-1 bg-card/80 rounded-full text-sm font-medium text-foreground mb-4">
                  {program.age}
                </span>
                <h3 className="font-serif text-2xl font-semibold text-foreground">
                  {program.title}
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {program.description}
                </p>
                
                <ul className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{program.groupSize}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="#contact">
              Записаться на пробное занятие
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
