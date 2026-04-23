"use client"

import Image from "next/image"

const galleryImages = [
  {
    src: "/media/gallery-optimized/board-practice.webp",
    title: "Работа у доски",
    description: "Наглядная практика помогает быстро включаться в английскую речь.",
  },
  {
    src: "/media/gallery-optimized/mini-presentation.webp",
    title: "Мини-презентации",
    description: "Ребёнок учится уверенно выражать мысль на английском.",
  },
  {
    src: "/media/gallery-optimized/words-emotions.webp",
    title: "Практика слов и эмоций",
    description: "Через карточки ребёнок закрепляет лексику и коммуникативные навыки.",
  },
  {
    src: "/media/gallery-optimized/game-format.webp",
    title: "Игровой формат",
    description: "Удерживаем внимание и интерес ребёнка через движение и игру.",
  },
  {
    src: "/media/gallery-optimized/cards-work.webp",
    title: "Работа с карточками",
    description: "Каждое задание связано с разговорной практикой.",
  },
  {
    src: "/media/gallery-optimized/individual-pace.webp",
    title: "Индивидуальный темп",
    description: "Помогаем ребёнку говорить уверенно и без страха ошибки.",
  },
]

const lessonVideos = [
  {
    src: "/media/video/presentation-lesson.mp4",
    poster: "/media/video/presentation-lesson-poster.webp",
    title: "Видео: мини-презентация на английском",
    description: "Фрагмент занятия, где ребёнок выступает и отвечает на вопросы.",
  },
  {
    src: "/media/video/game-lesson.mp4",
    poster: "/media/video/game-lesson-poster.webp",
    title: "Видео: игровой формат",
    description: "Практика словаря через игровой сценарий и живую коммуникацию.",
  },
  {
    src: "/media/video/materials-lesson.mp4",
    poster: "/media/video/materials-lesson-poster.webp",
    title: "Видео: работа с материалами",
    description: "Рабочие листы и карточки в формате, который удерживает внимание ребёнка.",
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
                  height={1600}
                  sizes={index === 0 ? "(max-width: 768px) 50vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
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

        <div className="mt-14 lg:mt-16">
          <div className="mb-8 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
              Видео с занятий
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              Короткие фрагменты реальных уроков. Видео оптимизированы для быстрой загрузки.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {lessonVideos.map((video) => (
              <article
                key={video.src}
                className="overflow-hidden rounded-3xl border border-border bg-background"
              >
                <video
                  controls
                  preload="none"
                  playsInline
                  poster={video.poster}
                  className="aspect-[9/16] w-full object-cover bg-black"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-foreground">{video.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
