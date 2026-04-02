'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import UploadModal from './UploadModal'
import styles from './Nav.module.css'

const LINKS = [
  { href: '/', label: 'About' },
  { href: '/elementary', label: 'Elementary' },
  { href: '/intermediate', label: 'Intermediate' },
  { href: '/advanced', label: 'Advanced' },
  { href: '/assessment', label: 'Assessment' },
]

export default function Nav() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [uploadOpen, setUploadOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <span className={styles.tibetan}>བོད</span>
          <span>Tibetan · Columbia</span>
        </Link>

        <div className={styles.links}>
          {LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.right}>
          <button className={styles.uploadBtn} onClick={() => setUploadOpen(true)}>
            + Upload Content
          </button>
          <button className={styles.logoutBtn} onClick={logout}>
            Sign out
          </button>
        </div>
      </nav>

      {uploadOpen && <UploadModal onClose={() => setUploadOpen(false)} />}
    </>
  )
}
