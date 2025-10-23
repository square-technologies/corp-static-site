import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Momentum Financial Services Group | Alternative Financial Solutions',
  description: 'Momentum Financial Services Group is one of the largest providers of alternative financial solutions in North America. Our vision is to close the gap between people and their financial goals.',
  keywords: 'financial services, alternative lending, non-prime lender, financial solutions, MFSG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
