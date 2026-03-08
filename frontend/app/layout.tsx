import type { Metadata } from 'next'
import { DM_Serif_Display, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'NOESIS — Philosophical Self-Inquiry',
  description: 'A private intellectual space for philosophical reflection and self-knowledge.',
  generator: 'v0.app',
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSerifDisplay.variable} ${ibmPlexMono.variable}`}>
      <body className="font-mono antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="radial-glow" aria-hidden="true" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
