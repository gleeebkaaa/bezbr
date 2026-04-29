import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Политика конфиденциальности — ${brand.fullName}`,
  description:
    `Как мы обрабатываем обращения, заявки на пробное занятие и заказы материалов на сайте «${brand.fullName}».`,
}

const sections = [
  {
    title: "Какие данные мы получаем",
    text: "В «Английском Без Барьера» мы собираем только ту информацию, которая нужна для качественных занятий: имя, телефон и email для связи, а при покупке материалов — данные заказа.",
  },
  {
    title: "Зачем мы их используем",
    text: "Это помогает нам быстро записать ребёнка на пробное занятие, отвечать на ваши вопросы об обучении и отправлять учебные материалы.",
  },
  {
    title: "Как храним данные",
    text: "Мы храним ваши данные конфиденциально и передаём их третьим лицам только когда это необходимо для выполнения вашего запроса — например, службе доставки.",
  },
  {
    title: "Как связаться",
    text: "Есть вопросы о защите данных или хотите записать ребёнка на пробное занятие? Напишите на support@bezbaryera.ru или позвоните +7 991 986-31-32.",
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                Политика конфиденциальности
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight text-balance text-foreground">
                Ваши данные защищены — вы можете сосредоточиться на прогрессе ребёнка в английском
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Мы берём только необходимые данные для связи, записи на пробное
                занятие и отправки материалов после оплаты.
              </p>
            </div>

            <div className="mt-12 grid gap-6">
              {sections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm"
                >
                  <h2 className="font-semibold text-xl text-foreground">
                    {section.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {section.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Вернуться на главную
              </Link>
              <Link
                href={brand.mapOrgUrl}
                target="_blank"
                className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Посмотреть на карте
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
