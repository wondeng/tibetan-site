'use client'
import { useEffect, useState } from 'react'
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

  useEffect(() => {
    setLoading(true)
    getLessons(level, semester).then(data => {
      setLessons(data)
      setLoading(false)
    })
  }, [level, semester])

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.badge}>{badge}</div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${semester === 'fall' ? styles.active : ''}`}
          onClick={(e) => { e.stopPropagation(); setSemester('fall') }}
        >
          Fall Semester
        </button>
        <button
          className={`${styles.tab} ${semester === 'spring' ? styles.active : ''}`}
          onClick={(e) => { e.stopPropagation(); setSemester('spring') }}
        >
          Spring Semester
        </button>
      </div>

      <div className={styles.lessonsArea} onClick={(e) => e.stopPropagation()}>
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
            No lessons added yet for this semester. Use &ldquo;Upload Content&rdquo; to add the first lesson.
          </div>
        ) : (
          lessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))
        )}
      </div>
    </div>
  )
}
