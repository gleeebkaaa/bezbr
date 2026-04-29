import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MaterialsCatalog } from "@/components/materials/catalog"
import { brand } from "@/lib/brand"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: `Материалы для домашнего обучения — ${brand.name}`,
  description:
    "Карточки, игры, тетради и PDF-наборы для английского с детьми. Материалы созданы преподавателями Английского Без Барьера и доступны на e-mail после оплаты.",
  keywords:
    "английский для детей материалы, карточки английский, игры английский для детей, рабочие тетради английский",
  alternates: {
    canonical: "/materials",
  },
  openGraph: {
    title: `Материалы для домашнего обучения — ${brand.name}`,
    description:
      "Карточки, игры, тетради и печатные задания для домашних занятий английским с детьми.",
    url: `${site.url}/materials`,
    type: "website",
    images: [
      {
        url: "/media/branding/material-placeholder.webp",
        alt: `Каталог материалов — ${brand.name}`,
      },
    ],
  },
}

export default function MaterialsPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <MaterialsCatalog />
      </main>
      <Footer />
    </>
  )
}
