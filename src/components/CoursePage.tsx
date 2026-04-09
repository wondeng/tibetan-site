'use client'
import { useEffect, useState, useCallback } from 'react'
import { getLessons, Lesson } from '@/lib/supabase'
import LessonCard from './LessonCard'
import styles from './CoursePage.module.css'

type Props = {
  level: 'elementary' | 'intermediate' | 'advanced'
  badge: string
  title: string
  subtitle: string
}

export default function CoursePage({ level, badge, title, subtitle }: Props) {
  const [semester, setSemester] = useState<'fall' | 'spring'>('fall')
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLessons = useCallback((sem: 'fall' | 'spring') => {
    setLoading(true)
    setLessons([])
    getLessons(level, sem).then(data => {
      setLessons(data)
      setLoading(false)
    })
  }, [level])

  useEffect(() => {
    fetchLessons(semester)
  }, [semester, fetchLessons])

  function handleSemester(sem: 'fall' | 'spring') {
    setSemester(sem)
  }

  return (
    <div style={{ isolation: 'isolate' }}>
      <div className={styles.header}>
        <div className={styles.badge}>{badge}</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${semester === 'fall' ? styles.active : ''}`}
          onClick={() => handleSemester('fall')}
        >
          Fall Semester
        </button>
        <button
          type="button"
          className={`${styles.tab} ${semester === 'spring' ? styles.active : ''}`}
          onClick={() => handleSemester('spring')}
        >
          Spring Semester
        </button>
      </div>

      <div className={styles.lessonsArea}>
        <div className={styles.lessonsHeader}>
          <h3 className={styles.lessonsTitle}>
            {semester === 'fall' ? 'Fall' : 'Spring'} Semester — {title}
          </h3>
          {!loading && (
            <span className={styles.count}>
              {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
            </span>
          )}
        </div>

        {loading ? (
          <div className={styles.loading}>Loading lessons…</div>
        ) : lessons.length === 0 ? (
          <div className={styles.empty}>
            No lessons added yet. Use &ldquo;Upload Content&rdquo; to add the first lesson.
          </div>
        ) : (
          <div>
            {lessons.map((lesson, i) => (
              <LessonCard key={lesson.id} lesson={lesson} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}