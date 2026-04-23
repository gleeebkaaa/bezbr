import { NextResponse } from "next/server"
import { z } from "zod"

const requestSchema = z.object({
  productName: z.string().min(2).max(200),
  amount: z.number().int().positive(),
  quantity: z.number().int().positive().default(1),
  customer: z.object({
    fio: z.string().min(3).max(120),
    email: z.string().email(),
    phone: z.string().min(7).max(24),
  }),
})

function createOrderId() {
  return `order-${Date.now()}-${Math.floor(Math.random() * 100_000)}`
}

function sanitizeProductName(value: string) {
  return value
    .trim()
    .replaceAll("#", "")
    .replaceAll("=", "")
    .replaceAll(":", "")
    .replace(/\s+/g, "_")
}

function createFallbackLink(baseUrl: string, productName: string, amount: number) {
  const product = sanitizeProductName(productName)
  return `${baseUrl.replace(/#.*$/, "")}#order:${product}=${amount}`
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Некорректный JSON в запросе." },
      { status: 400 }
    )
  }

  const parsed = requestSchema.safeParse(payload)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Проверьте корректность полей формы оплаты." },
      { status: 400 }
    )
  }

  const { productName, amount, quantity, customer } = parsed.data
  const orderId = createOrderId()

  const leadPayToken = process.env.LEADPAY_TOKEN?.trim()
  const leadPayClientId = process.env.LEADPAY_CLIENT_ID?.trim()
  const fallbackPage = process.env.LEADPAY_PAYMENT_PAGE_URL?.trim()

  if (!leadPayToken) {
    if (fallbackPage) {
      return NextResponse.json({
        checkoutUrl: createFallbackLink(fallbackPage, productName, amount),
        orderId,
        mode: "fallback",
      })
    }

    return NextResponse.json(
      {
        error:
          "Интеграция LeadPay не настроена. Добавьте LEADPAY_TOKEN или fallback-ссылку.",
      },
      { status: 503 }
    )
  }

  const endpoint = new URL("https://app.leadpay.ru/rest/v3/bothelp/link")

  if (leadPayClientId) {
    endpoint.searchParams.set("client_id", leadPayClientId)
  }

  try {
    const leadPayResponse = await fetch(endpoint.toString(), {
      method: "POST",
      headers: {
        "Authorization-Token": leadPayToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: orderId,
        product_name: productName,
        product_price: amount,
        count: quantity,
        email: customer.email,
        phone: customer.phone,
        fio: customer.fio,
      }),
      cache: "no-store",
    })

    const responseText = await leadPayResponse.text()
    let responseData: any = {}

    try {
      responseData = JSON.parse(responseText)
    } catch {
      responseData = {}
    }

    const checkoutUrl =
      responseData?.result?.url ||
      responseData?.result?.payment_url ||
      responseData?.url ||
      null

    if (!leadPayResponse.ok || !checkoutUrl) {
      if (fallbackPage) {
        return NextResponse.json({
          checkoutUrl: createFallbackLink(fallbackPage, productName, amount),
          orderId,
          mode: "fallback",
        })
      }

      return NextResponse.json(
        {
          error:
            "LeadPay вернул ошибку при создании ссылки на оплату. Проверьте токен и настройки интеграции.",
        },
        { status: 502 }
      )
    }

    return NextResponse.json({
      checkoutUrl,
      orderId,
      mode: "api",
    })
  } catch {
    if (fallbackPage) {
      return NextResponse.json({
        checkoutUrl: createFallbackLink(fallbackPage, productName, amount),
        orderId,
        mode: "fallback",
      })
    }

    return NextResponse.json(
      { error: "Ошибка сети при обращении к LeadPay." },
      { status: 502 }
    )
  }
}
