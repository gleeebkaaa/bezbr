import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MaterialsCatalog } from "@/components/materials/catalog"
import { brand } from "@/lib/brand"

export const metadata: Metadata = {
  title: `Материалы для домашнего обучения — ${brand.name}`,
  description:
    "Карточки, игры, ворклисты и PDF-наборы для английского дома. После оплаты материалы и чек приходят на e-mail, для печатных комплектов доступен самовывоз из студии.",
  keywords:
    "английский для детей материалы, карточки английский, игры английский для детей, рабочие тетради английский",
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
