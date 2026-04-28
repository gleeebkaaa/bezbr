import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { brand } from '@/lib/brand'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${brand.fullName} — детская языковая мастерская в Москве`,
    template: `%s | ${brand.fullName}`,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  keywords:
    "английский для детей москва, курсы английского для детей, языковая мастерская, пробное занятие английский, английский от 3.5 лет",
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: `${brand.fullName} — английский для детей в Москве`,
    description:
      "Английский через коммуникацию, игру и движение. Система уровней CEFR и регулярная статистика прогресса для родителей.",
    url: site.url,
    siteName: brand.fullName,
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/media/branding/logo-main.jpg',
        width: 1264,
        height: 647,
        alt: brand.fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.fullName} — английский для детей в Москве`,
    description:
      "Английский через коммуникацию, игру и движение. Система уровней CEFR и регулярная статистика прогресса для родителей.",
    images: ['/media/branding/logo-main.jpg'],
  },
  other: {
    'geo.region': 'RU-MOW',
    'geo.placename': 'Москва',
    'geo.position': '55.871461;37.633069',
    ICBM: '55.871461, 37.633069',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
