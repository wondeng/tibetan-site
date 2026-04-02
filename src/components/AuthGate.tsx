'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import styles from './AuthGate.module.css'

export default function AuthGate() {
  const { login, loginWithCode } = useAuth()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [emailError, setEmailError] = useState('')
  const [codeError, setCodeError] = useState('')

  const handleEmail = () => {
    const ok = login(email)
    if (!ok) setEmailError('Please use a valid .edu email address.')
    else setEmailError('')
  }

  const handleCode = () => {
    const ok = loginWithCode(code)
    if (!ok) setCodeError('Incorrect access code. Contact Professor Sonam.')
    else setCodeError('')
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <div className={styles.emblem}>བོད</div>
        <h1 className={styles.title}>Tibetan Language Program</h1>
        <p className={styles.sub}>Columbia University · MESAAS<br />Restricted to enrolled students and faculty</p>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            placeholder="your.uni@columbia.edu"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEmail()}
          />
          {emailError && <p className={styles.error}>{emailError}</p>}
          <button className={styles.btn} onClick={handleEmail}>
            Continue with .edu email
          </button>
        </div>

        <div className={styles.divider}><span>or</span></div>

        <div className={styles.field}>
          <input
            className={styles.input}
            type="password"
            placeholder="Access code (if provided)"
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCode()}
          />
          {codeError && <p className={styles.error}>{codeError}</p>}
          <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleCode}>
            Enter with access code
          </button>
        </div>

        <p className={styles.note}>Contact Prof. Sonam for an access code if you do not have a .edu email.</p>
      </div>
    </div>
  )
}
