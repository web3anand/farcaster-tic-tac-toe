import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TicTacToe Battle - Automatching Tic-Tac-Toe',
  description: 'Play Tic-Tac-Toe against other players with automatic matching, leaderboards, and Base blockchain integration',
  manifest: '/manifest.json',
  openGraph: {
    title: 'TicTacToe Battle - Automatching Tic-Tac-Toe on Base',
    description: 'Join the ultimate Tic-Tac-Toe battle with automatic matching, leaderboards, and Base blockchain rewards',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
