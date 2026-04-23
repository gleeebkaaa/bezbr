"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import {
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Send,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { brand, socialButtons } from "@/lib/brand"

export function ContactSection() {
  const [formState, setFormState] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-8">
            <div>
              <span className="text-sm font-medium text-accent uppercase tracking-wider">
                Запись и контакты
              </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
                Основная цель на старте — заявки на пробное занятие
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                Оставьте данные родителя и ребёнка. Мы свяжемся с вами, уточним
                формат и предложим ближайшее удобное время.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Адрес</p>
                  <Link
                    href={brand.mapOrgUrl}
                    target="_blank"
                    className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                  >
                    {brand.address}
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Рабочий телефон</p>
                  <a
                    href={brand.phoneHref}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {brand.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">График</p>
                  <p className="text-primary-foreground/80">
                    Очно и онлайн, по записи в удобное время семьи
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-semibold">Быстрые ссылки</p>
              <div className="flex flex-wrap gap-3">
                {socialButtons.map((button) => (
                  <Link
                    key={button.href}
                    href={button.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors text-sm"
                  >
                    {button.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-primary-foreground/10 bg-primary-foreground/10 p-6">
              <p className="text-sm uppercase tracking-[0.18em] text-primary-foreground/60">
                По покупкам материалов
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-primary-foreground">
                Поддержка после оплаты
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                По вопросам получения PDF-материалов и чеков:{" "}
                <a href={`mailto:${brand.supportEmail}`} className="underline">
                  {brand.supportEmail}
                </a>
              </p>
            </div>
          </div>

          <div className="bg-card text-card-foreground p-8 lg:p-10 rounded-3xl">
            <h3 className="font-serif text-2xl font-semibold mb-2">
              Заявка на пробное занятие
            </h3>
            <p className="text-muted-foreground mb-8">
              Достаточно заполнить данные ниже, и мы свяжемся с вами.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-serif text-xl font-semibold text-foreground mb-2">
                  Заявка отправлена
                </h4>
                <p className="text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время и согласуем пробное занятие.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="parentName" className="text-sm font-medium text-foreground">
                    ФИО родителя
                  </label>
                  <Input
                    id="parentName"
                    type="text"
                    placeholder="Имя и фамилия"
                    value={formState.parentName}
                    onChange={(e) => setFormState({ ...formState, parentName: e.target.value })}
                    required
                    className="h-12 bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="childName" className="text-sm font-medium text-foreground">
                    ФИО ученика
                  </label>
                  <Input
                    id="childName"
                    type="text"
                    placeholder="Имя и фамилия ребёнка"
                    value={formState.childName}
                    onChange={(e) => setFormState({ ...formState, childName: e.target.value })}
                    required
                    className="h-12 bg-background border-border"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="childAge" className="text-sm font-medium text-foreground">
                      Возраст ученика
                    </label>
                    <Input
                      id="childAge"
                      type="text"
                      placeholder="Например, 7"
                      value={formState.childAge}
                      onChange={(e) => setFormState({ ...formState, childAge: e.target.value })}
                      required
                      className="h-12 bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Номер для связи
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      required
                      className="h-12 bg-background border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email <span className="text-muted-foreground">(необязательно)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="h-12 bg-background border-border pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Комментарий <span className="text-muted-foreground">(необязательно)</span>
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Например: удобные дни, формат онлайн/очно, цель занятий"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="min-h-24 bg-background border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
                >
                  {isSubmitting ? "Отправляем..." : "Записаться на пробное занятие"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <Link href="/privacy" className="underline hover:text-foreground">
                    политикой конфиденциальности
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
