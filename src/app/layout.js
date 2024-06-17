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
  description: 'Telsur Pagos'
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
