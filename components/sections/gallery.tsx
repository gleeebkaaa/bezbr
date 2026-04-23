"use client"

import Image from "next/image"

const galleryImages = [
  {
    src: "/media/gallery-web/gallery-01.jpg",
    title: "Живая вовлечённость на уроке",
    description: "Дети включаются в работу через наглядные задачи и активный формат.",
  },
  {
    src: "/media/gallery-web/gallery-02.jpg",
    title: "Практика речи и письма",
    description: "На занятии сразу тренируем устную речь и фиксацию материала в тетради.",
  },
  {
    src: "/media/gallery-web/gallery-03.jpg",
    title: "Обучение через игровые задания",
    description: "Игра помогает ребёнку уверенно применять английский в коммуникации.",
  },
  {
    src: "/media/gallery-web/gallery-04.jpg",
    title: "Современные инструменты обучения",
    description: "Комбинируем классическую методику, движение и интерактивные форматы.",
  },
  {
    src: "/media/gallery-web/gallery-05.jpg",
    title: "Настольные игры в учебном процессе",
    description: "Через игру ребёнок легче запоминает лексику и грамматические конструкции.",
  },
  {
    src: "/media/gallery-web/gallery-06.jpg",
    title: "Системная работа по уровням",
    description: "Каждое занятие двигает ребёнка по понятной программе к следующему уровню.",
  },
]

export function GallerySection() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Пространство мастерской
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight text-balance">
            Как проходит учебный процесс
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Визуально показываем формат занятий: коммуникация, практика и
            работа с материалами в комфортной атмосфере.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <article
              key={image.src}
              className={`group relative overflow-hidden rounded-3xl border border-border ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={index === 0 ? "aspect-square md:h-full" : "aspect-square"}>
                <Image
                  src={image.src}
                  alt={image.title}
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent_35%,_rgba(23,26,33,0.76)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {image.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed">
                  {image.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
