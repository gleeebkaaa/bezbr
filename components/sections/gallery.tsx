"use client"

import Image from "next/image"

const galleryImages = [
  {
    src: "/media/gallery/IMG_1754.jpg",
    title: "Работа у доски",
    description: "Наглядная практика помогает быстро включаться в английскую речь.",
  },
  {
    src: "/media/gallery/IMG_1732.jpg",
    title: "Мини-презентации",
    description: "Ребёнок учится уверенно выражать мысль на английском.",
  },
  {
    src: "/media/gallery/IMG_1758_frame.jpg",
    title: "Практика слов и эмоций",
    description: "Через карточки ребёнок закрепляет лексику и коммуникативные навыки.",
  },
  {
    src: "/media/gallery/IMG_3015_frame.jpg",
    title: "Игровой формат",
    description: "Удерживаем внимание и интерес ребёнка через движение и игру.",
  },
  {
    src: "/media/gallery/IMG_3408_frame.jpg",
    title: "Работа с карточками",
    description: "Каждое задание связано с разговорной практикой.",
  },
  {
    src: "/media/gallery/IMG_3567_frame.jpg",
    title: "Индивидуальный темп",
    description: "Помогаем ребёнку говорить уверенно и без страха ошибки.",
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
            Фото с занятий и рабочего процесса
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Реальные кадры с занятий: как дети работают с материалами, говорят
            и закрепляют английский в действии.
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
