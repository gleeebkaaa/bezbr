import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { ProgramsSection } from "@/components/sections/programs"
import { TrustSection } from "@/components/sections/trust"
import { MaterialsPreviewSection } from "@/components/sections/materials-preview"
import { PricesSection } from "@/components/sections/prices"
import { ReviewsSection } from "@/components/sections/reviews"
import { GallerySection } from "@/components/sections/gallery"
import { FAQSection } from "@/components/sections/faq"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <TrustSection />
        <MaterialsPreviewSection />
        <PricesSection />
        <ReviewsSection />
        <GallerySection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
