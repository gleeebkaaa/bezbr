import { brand } from "./brand"

const fallbackSiteUrl = "https://bezbaryera.ru"

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl).replace(
  /\/+$/,
  ""
)

export const site = {
  url: siteUrl,
  name: brand.fullName,
  description:
    "Очно и онлайн: английский для детей от 3,5 лет в формате, где есть система, бережная атмосфера и прозрачный результат для родителей.",
  locale: "ru_RU",
} as const
