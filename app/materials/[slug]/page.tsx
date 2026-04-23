import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/materials/product-detail"
import { JsonLd } from "@/components/seo/json-ld"
import {
  categories,
  getMaterialBySlug,
  getMaterialCover,
  materials,
} from "@/lib/materials-data"
import { brand } from "@/lib/brand"
import { getMaterialStructuredData } from "@/lib/structured-data"
import { site } from "@/lib/site"

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

  const category = categories.find((item) => item.id === material.category)
  const materialPath = `/materials/${material.slug}`
  
  return {
    title: `${material.title} — ${brand.name}`,
    description: material.description,
    keywords: `${material.title}, ${category?.label ?? "материалы"}, английский для детей, pdf материалы`,
    alternates: {
      canonical: materialPath,
    },
    openGraph: {
      title: `${material.title} — ${brand.name}`,
      description: material.description,
      url: `${site.url}${materialPath}`,
      type: "website",
      images: [
        {
          url: getMaterialCover(material),
          alt: material.title,
        },
      ],
    },
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

  const materialStructuredData = getMaterialStructuredData(material)
  
  return (
    <>
      <Header />
      <main className="pt-24">
        <JsonLd data={materialStructuredData} />
        <ProductDetail material={material} />
      </main>
      <Footer />
    </>
  )
}
