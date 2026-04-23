export const brand = {
  name: "Без Барьера",
  fullName: "Английский Без Барьера",
  workshop: "Детская языковая мастерская",
  subtitle:
    "Пространство, где дети по-настоящему любят английский язык и свободно говорят на нём без барьеров и страха ошибиться.",
  address: "Москва, проезд Дежнёва, 30",
  phone: "+7 991 986-31-32",
  phoneHref: "tel:+79919863132",
  mapUrl: "https://vk.cc/cTna4v",
  mapOrgUrl:
    "https://yandex.com/maps/org/bez_baryera/7685958898/?ll=37.633069%2C55.871461&z=16",
  maxUrl: "https://max.ru/id632119739260_biz",
  vkUrl: "https://vk.ru/bezbaryera",
  supportEmail: "support@bezbaryera.ru",
  lessonDuration: "55 минут",
  minAge: "от 3,5 лет",
}

export const heroHighlights = [
  "Пробное занятие бесплатно",
  "Очно и онлайн",
  "Индивидуально, в паре и в мини-группе",
]

export const socialButtons = [
  {
    label: "💌Мы на Яндекс.Картах",
    href: brand.mapUrl,
  },
  {
    label: "💙Мы в Max",
    href: brand.maxUrl,
  },
  {
    label: "⭐️Мы в ВК",
    href: brand.vkUrl,
  },
] as const
