import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Mail } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Оплата прошла успешно — ${brand.fullName}`,
  description:
    "Подтверждение оплаты материалов и информация о получении файлов на e-mail.",
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center shadow-sm">
              <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
              <h1 className="mt-6 font-serif text-4xl font-semibold text-foreground">
                Оплата прошла успешно
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Материал и чек отправлены на e-mail, указанный при оплате.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-secondary/50 p-5 text-left">
                <p className="text-sm font-medium text-foreground">
                  Если письмо не пришло:
                </p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>1. Проверьте папки «Спам» и «Промоакции».</li>
                  <li>2. Убедитесь, что e-mail в заказе был указан без ошибок.</li>
                  <li>
                    3. Напишите в поддержку:{" "}
                    <a href={`mailto:${brand.supportEmail}`} className="underline">
                      {brand.supportEmail}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/materials"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Вернуться в каталог
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Связаться с мастерской
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
