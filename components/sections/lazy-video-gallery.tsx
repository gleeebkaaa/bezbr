"use client"

import { useEffect, useRef, useState } from "react"

const lessonVideos = [
  {
    src: "/media/video/lesson-intro.mp4",
    poster: "/media/video/lesson-intro-poster.jpg",
    title: "Видео: знакомство с темой урока",
    description: "Спокойный вход в урок и включение ребёнка в английскую речь.",
  },
  {
    src: "/media/video/lesson-dialogue.mp4",
    poster: "/media/video/lesson-dialogue-poster.jpg",
    title: "Видео: диалоговая практика",
    description: "Ребёнок отвечает на вопросы и учится поддерживать разговор.",
  },
  {
    src: "/media/video/lesson-activity.mp4",
    poster: "/media/video/lesson-activity-poster.jpg",
    title: "Видео: активная работа в классе",
    description: "Наглядные задания, движение и живая отработка новых слов.",
  },
  {
    src: "/media/video/lesson-engagement.mp4",
    poster: "/media/video/lesson-engagement-poster.jpg",
    title: "Видео: вовлечение в коммуникацию",
    description: "Практика речи в формате, где ребёнок не боится ошибиться.",
  },
  {
    src: "/media/video/lesson-cards.mp4",
    poster: "/media/video/lesson-cards-poster.jpg",
    title: "Видео: работа с карточками",
    description: "Карточки помогают быстро закреплять лексику и фразы.",
  },
  {
    src: "/media/video/lesson-presentation.mp4",
    poster: "/media/video/lesson-presentation-poster.jpg",
    title: "Видео: мини-выступление",
    description: "Ребёнок формулирует мысль на английском и говорит увереннее.",
  },
  {
    src: "/media/video/lesson-practice.mp4",
    poster: "/media/video/lesson-practice-poster.jpg",
    title: "Видео: речевая практика",
    description: "Отработка темы урока в живом взаимодействии с преподавателем.",
  },
  {
    src: "/media/video/lesson-project.mp4",
    poster: "/media/video/lesson-project-poster.jpg",
    title: "Видео: проектный формат",
    description: "Развиваем речь, самостоятельность и навык самопрезентации.",
  },
  {
    src: "/media/video/lesson-teamwork.mp4",
    poster: "/media/video/lesson-teamwork-poster.jpg",
    title: "Видео: командная работа",
    description: "Дети взаимодействуют на английском и учатся договариваться.",
  },
  {
    src: "/media/video/lesson-reading.mp4",
    poster: "/media/video/lesson-reading-poster.jpg",
    title: "Видео: чтение и понимание",
    description: "Закрепляем чтение и понимание текста в поддерживающем темпе.",
  },
  {
    src: "/media/video/lesson-structure.mp4",
    poster: "/media/video/lesson-structure-poster.jpg",
    title: "Видео: системная отработка",
    description: "Пошаговая практика по теме урока с акцентом на речь.",
  },
  {
    src: "/media/video/lesson-focus.mp4",
    poster: "/media/video/lesson-focus-poster.jpg",
    title: "Видео: концентрация в уроке",
    description: "Задания меняются по ритму, поэтому ребёнку легче удерживать внимание.",
  },
  {
    src: "/media/video/lesson-warmup.mp4",
    poster: "/media/video/lesson-warmup-poster.jpg",
    title: "Видео: разогрев перед темой",
    description: "Короткая вводная активность для плавного старта занятия.",
  },
  {
    src: "/media/video/lesson-quick-task.mp4",
    poster: "/media/video/lesson-quick-task-poster.jpg",
    title: "Видео: короткая практическая задача",
    description: "Быстрая отработка лексики в формате мини-упражнения.",
  },
]

export function LazyVideoGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [shouldRenderVideos, setShouldRenderVideos] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || shouldRenderVideos) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRenderVideos(true)
          observer.disconnect()
        }
      },
      { rootMargin: "420px 0px" },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [shouldRenderVideos])

  return (
    <div ref={sectionRef} className="mt-14 lg:mt-16">
      <div className="mb-8 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
          Видео с занятий
        </h3>
        <p className="mt-3 text-base text-muted-foreground">
          Короткие фрагменты реальных уроков, чтобы передать атмосферу
          занятий и формат работы с детьми.
        </p>
      </div>

      {shouldRenderVideos ? (
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
                <track
                  kind="captions"
                  src="/media/video/captions-ru.vtt"
                  srcLang="ru"
                  label="Русские субтитры"
                />
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
      ) : (
        <div className="rounded-3xl border border-border bg-background/72 p-6 text-center text-sm text-muted-foreground">
          Видео загрузятся автоматически, когда вы дойдёте до этого раздела.
        </div>
      )}
    </div>
  )
}
