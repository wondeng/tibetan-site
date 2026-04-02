import type { Metadata } from 'next'
import '../styles/globals.css'
import { AuthProvider } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Tibetan Language Program — Columbia University',
  description: 'Tibetan language courses taught by Professor Sonam at Columbia University. Elementary, Intermediate, and Advanced levels.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
