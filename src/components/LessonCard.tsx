'use client'
import { useState } from 'react'
import { Lesson } from '@/lib/supabase'
import styles from './LessonCard.module.css'

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return m ? m[1] : null
}

export default function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const [open, setOpen] = useState(false)

  const hasVideo = !!lesson.youtube_url
  const hasAudio = lesson.lesson_files?.some(f => f.file_type === 'audio')
  const hasPdf = lesson.lesson_files?.some(f => f.file_type === 'pdf')
  const hasArticle = !!lesson.article_url
  const ytId = lesson.youtube_url ? getYouTubeId(lesson.youtube_url) : null

  return (
    <div className={styles.card}>
      <button className={styles.head} onClick={() => setOpen(!open)}>
        <div className={styles.num}>{index + 1}</div>
        <h4 className={styles.headTitle}>{lesson.title}</h4>
        <div className={styles.tags}>
          {hasVideo && <span className={`${styles.tag} ${styles.video}`}>▶ Video</span>}
          {hasAudio && <span className={`${styles.tag} ${styles.audio}`}>♪ Audio</span>}
          {hasPdf && <span className={styles.tag}>PDF</span>}
          {hasArticle && <span className={`${styles.tag} ${styles.article}`}>📄 Article</span>}
        </div>
        <span className={styles.chevron} style={{ transform: open ? 'rotate(180deg)' : '' }}>▾</span>
      </button>

      {open && (
        <div className={styles.body}>
          {lesson.description && <p className={styles.desc}>{lesson.description}</p>}

          {ytId && (
            <div className={styles.videoWrap}>
              <iframe
                src={`https://www.youtube.com/embed/${ytId}`}
                title={lesson.title}
                allowFullScreen
                frameBorder="0"
                className={styles.video}
              />
            </div>
          )}

          {(lesson.lesson_files?.length || hasArticle) ? (
            <div className={styles.resources}>
              {lesson.lesson_files?.map(f => (
                <a key={f.id} className={styles.resource} href={f.public_url || '#'} target="_blank" rel="noopener noreferrer">
                  <span>{f.file_type === 'audio' ? '♪' : '📄'}</span>
                  <span className={styles.resourceName}>{f.file_name}</span>
                  <span className={styles.resourceMeta}>{f.file_type.toUpperCase()}</span>
                </a>
              ))}
              {hasArticle && (
                <a className={styles.resource} href={lesson.article_url!} target="_blank" rel="noopener noreferrer">
                  <span>📖</span>
                  <span className={styles.resourceName}>Read Tibetan article</span>
                  <span className={styles.resourceMeta}>External</span>
                </a>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
