import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { brand } from '@/lib/brand'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
});

const manrope = Manrope({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: `${brand.fullName} — детская языковая мастерская в Москве`,
  description:
    "Очно и онлайн: английский для детей от 3,5 лет в формате, где есть система, бережная атмосфера и прозрачный результат для родителей.",
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
    locale: 'ru_RU',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
