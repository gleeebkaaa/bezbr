"use client"

import { useState } from "react"
import { X, CreditCard, Download, Loader2, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { type Material } from "@/lib/materials-data"

type CheckoutModalProps = {
  material: Material
  isOpen: boolean
  onClose: () => void
}

type CheckoutStep = "info" | "confirm"

type CreateLeadPayLinkResponse = {
  checkoutUrl?: string
  error?: string
}

export function CheckoutModal({ material, isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>("info")
  const [isProcessing, setIsProcessing] = useState(false)
  const [apiError, setApiError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  })

  if (!isOpen) return null

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiError("")
    setStep("confirm")
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setApiError("")

    try {
      const response = await fetch("/api/payments/leadpay/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: material.title,
          amount: material.price,
          quantity: 1,
          customer: {
            fio: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      })

      const data: CreateLeadPayLinkResponse = await response.json()

      if (!response.ok || !data.checkoutUrl) {
        setApiError(
          data.error ||
            "Не удалось сформировать ссылку на оплату. Попробуйте ещё раз или свяжитесь с нами."
        )
        setIsProcessing(false)
        return
      }

      window.location.href = data.checkoutUrl
    } catch {
      setApiError("Ошибка сети при создании ссылки оплаты. Повторите попытку.")
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setStep("info")
    setApiError("")
    setFormData({ fullName: "", email: "", phone: "" })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-card rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors z-10"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>

        {step === "info" && (
          <div className="p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Оформление покупки
            </h2>
            <p className="text-muted-foreground mb-8">
              Заполните данные, на которые придут материал и чек
            </p>

            <div className="bg-secondary/50 rounded-2xl p-4 mb-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{material.title}</p>
                <p className="text-sm text-muted-foreground">
                  {material.format} • {material.pages} стр.
                </p>
              </div>
              <div className="font-serif text-xl font-semibold text-primary">
                {material.price} ₽
              </div>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="checkout-fullName" className="text-sm font-medium text-foreground">
                  ФИО покупателя
                </label>
                <Input
                  id="checkout-fullName"
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  className="h-12 bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="checkout-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="checkout-email"
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="checkout-phone" className="text-sm font-medium text-foreground">
                  Телефон
                </label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-12 bg-background border-border"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base mt-4"
              >
                Продолжить
              </Button>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Цифровой материал отправляется на e-mail автоматически после
                оплаты. Печатные комплекты выдаются самовывозом из студии по
                согласованию.
              </p>
            </form>
          </div>
        )}

        {step === "confirm" && (
          <div className="p-8">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
              Подтверждение и переход к оплате
            </h2>
            <p className="text-muted-foreground mb-8">
              Вы перейдёте на защищённую страницу LeadPay.
            </p>

            <div className="bg-secondary/50 rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-foreground">{material.title}</span>
                <span className="font-semibold text-foreground">{material.price} ₽</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-semibold text-foreground">Итого к оплате</span>
                <span className="font-serif text-xl font-semibold text-primary">
                  {material.price} ₽
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5 mb-6">
              <p className="text-sm font-medium text-foreground">Покупатель</p>
              <p className="mt-2 text-sm text-muted-foreground">{formData.fullName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{formData.email}</p>
              <p className="mt-1 text-sm text-muted-foreground">{formData.phone}</p>
            </div>

            {apiError && (
              <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
                <div className="flex items-start gap-2">
                  <TriangleAlert className="h-4 w-4 mt-0.5 text-destructive" />
                  <p>{apiError}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep("info")}
                className="flex-1 h-14 border-border"
              >
                Назад
              </Button>
              <Button
                size="lg"
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-base"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Формируем ссылку...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Перейти к оплате
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
