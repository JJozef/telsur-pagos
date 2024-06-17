import '@/styles/globals.css'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Providers } from './providers'

import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'Telsur | Pago de Cuentas',
  metadataBase: new URL('https://telsur-pagos.vercel.app'),
  description: 'Paga tus cuentas de Telsur de forma rápida y segura.',
  keywords: ['Telsur', 'Pago de Cuentas', 'Pago de Servicios'],
  alternates: {
    canonical: new URL('https://telsur-pagos.vercel.app')
  },
  authors: [
    {
      name: 'Jose Ignacio',
      url: 'https://joseignacio.dev'
    }
  ],
  creator: 'Jose Ignacio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://telsur-pagos.vercel.app',
    title: 'Telsur | Pago de Cuentas',
    description: 'Paga tus cuentas de Telsur de forma rápida y segura.',
    siteName: 'Telsur | Pago de Cuentas',
    images: [
      {
        url: 'https://telsur-pagos.vercel.app/og.png',
        width: 1200,
        height: 630,
        alt: 'Telsur | Pago de Cuentas'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telsur | Pago de Cuentas',
    description: 'Paga tus cuentas de Telsur de forma rápida y segura.',
    images: ['https://telsur-pagos.vercel.app/og.png'],
    creator: '@jozefzin'
  },
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang='es-CL' suppressHydrationWarning>
        <body
          className={cn(
            'selection:bg-primary selection:text-secondary flex flex-col gap-4',
            fontSans.variable
          )}
        >
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
