'use client'
import { useAuth } from '@/lib/auth'
import AuthGate from '@/components/AuthGate'
import Nav from '@/components/Nav'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const { isAuthed } = useAuth()

  if (!isAuthed) return <AuthGate />

  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  )
}
