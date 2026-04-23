import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/materials/product-detail"
import { materials, getMaterialBySlug } from "@/lib/materials-data"
import { brand } from "@/lib/brand"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const material = getMaterialBySlug(slug)
  
  if (!material) {
    return {
      title: `Материал не найден — ${brand.name}`,
    }
  }
  
  return {
    title: `${material.title} — ${brand.name}`,
    description: material.description,
  }
}

export function generateStaticParams() {
  return materials.map((material) => ({
    slug: material.slug,
  }))
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params
  const material = getMaterialBySlug(slug)
  
  if (!material) {
    notFound()
  }
  
  return (
    <>
      <Header />
      <main className="pt-24">
        <ProductDetail material={material} />
      </main>
      <Footer />
    </>
  )
}
