# Сайт «Английский Без Барьера»

## Локальный запуск

```bash
pnpm install
pnpm dev --port 3000
```

Сайт будет доступен по адресу: `http://localhost:3000`

## Интеграция LeadPay

1. Скопируйте `.env.example` в `.env.local`.
2. Заполните переменные:

- `LEADPAY_TOKEN` — токен интеграции LeadPay;
- `LEADPAY_CLIENT_ID` — client id (если используется в вашей схеме);
- `LEADPAY_PAYMENT_PAGE_URL` — fallback-ссылка на страницу оплаты (опционально).

Маршрут генерации ссылки оплаты:

- `POST /api/payments/leadpay/link`

Страница успешной оплаты:

- `/payment/success`
