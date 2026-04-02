'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AuthContextType = {
  isAuthed: boolean
  userEmail: string | null
  login: (email: string) => boolean
  loginWithCode: (code: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_ACCESS_CODE || 'TIBET2025'
const SESSION_KEY = 'tibetan_site_auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthed, setIsAuthed] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Restore session from sessionStorage (clears when tab closes)
    const saved = sessionStorage.getItem(SESSION_KEY)
    if (saved) {
      const { email } = JSON.parse(saved)
      setIsAuthed(true)
      setUserEmail(email)
    }
  }, [])

  const login = (email: string): boolean => {
    if (!email.toLowerCase().endsWith('.edu')) return false
    setIsAuthed(true)
    setUserEmail(email)
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email }))
    return true
  }

  const loginWithCode = (code: string): boolean => {
    if (code !== ADMIN_CODE) return false
    setIsAuthed(true)
    setUserEmail('access-code-user')
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email: 'access-code-user' }))
    return true
  }

  const logout = () => {
    setIsAuthed(false)
    setUserEmail(null)
    sessionStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthed, userEmail, login, loginWithCode, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
