import { brand } from "./brand"
import { categories, getMaterialCover, type Material } from "./materials-data"
import { site } from "./site"

const faqItems = [
  {
    question: "С какого возраста можно начинать занятия?",
    answer:
      "Мы работаем с детьми от 3,5 лет. На старте подбираем комфортный формат: индивидуально, в паре или в мини-группе.",
  },
  {
    question: "Есть ли пробное занятие?",
    answer:
      "Да, пробное занятие бесплатное. После него мы вместе с родителем выбираем программу и удобный график.",
  },
  {
    question: "Как вы отслеживаете прогресс ребёнка?",
    answer:
      "Проводим регулярные срезы, тесты и уровневую оценку. Родители получают понятную статистику и рекомендации по следующему шагу.",
  },
  {
    question: "Можно ли заниматься онлайн?",
    answer:
      "Да, занятия проходят очно и онлайн. Формат выбираем под задачу и темперамент ребёнка.",
  },
] as const

export function getHomeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${site.url}/#organization`,
        name: brand.fullName,
        description: brand.subtitle,
        url: site.url,
        telephone: brand.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "проезд Дежнёва, 30",
          addressLocality: "Москва",
          addressCountry: "RU",
        },
        areaServed: "Москва",
        sameAs: [brand.mapOrgUrl, brand.mapUrl, brand.maxUrl, brand.vkUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: brand.fullName,
        inLanguage: "ru-RU",
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  } as Record<string, unknown>
}

export function getMaterialStructuredData(material: Material) {
  const category = categories.find((item) => item.id === material.category)

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.title,
    description: material.description,
    image: `${site.url}${getMaterialCover(material)}`,
    category: category?.label ?? "Материалы для занятий",
    brand: {
      "@type": "Brand",
      name: brand.name,
    },
    offers: {
      "@type": "Offer",
      url: `${site.url}/materials/${material.slug}`,
      priceCurrency: "RUB",
      price: material.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  } as Record<string, unknown>
}
