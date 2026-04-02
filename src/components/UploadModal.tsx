'use client'
import { useState } from 'react'
import { addLesson, uploadLessonFile } from '@/lib/supabase'
import styles from './UploadModal.module.css'

type Props = { onClose: () => void }

export default function UploadModal({ onClose }: Props) {
  const [level, setLevel] = useState('elementary')
  const [semester, setSemester] = useState('fall')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [articleUrl, setArticleUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!title.trim()) { setError('Please enter a lesson title.'); return }
    setLoading(true)
    setError('')

    const lesson = await addLesson({ level, semester, title, description, youtube_url: youtubeUrl, article_url: articleUrl })

    if (!lesson) {
      setError('Failed to save lesson. Check your Supabase connection.')
      setLoading(false)
      return
    }

    if (file) {
      await uploadLessonFile(lesson.id, file)
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => { onClose(); window.location.reload() }, 1800)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Upload lesson content</h2>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Level</label>
            <select className={styles.select} value={level} onChange={e => setLevel(e.target.value)}>
              <option value="elementary">Elementary</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Semester</label>
            <select className={styles.select} value={semester} onChange={e => setSemester(e.target.value)}>
              <option value="fall">Fall</option>
              <option value="spring">Spring</option>
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Lesson title</label>
          <input className={styles.input} type="text" placeholder="e.g. Lesson 7: Verb conjugation" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea className={styles.textarea} placeholder="Brief description of what this lesson covers..." value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>YouTube video URL (optional)</label>
          <input className={styles.input} type="url" placeholder="https://youtube.com/watch?v=..." value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Upload PDF or audio recording</label>
          <div className={styles.dropzone} onClick={() => document.getElementById('file-upload')?.click()}>
            <input id="file-upload" type="file" accept=".mp3,.wav,.m4a,.pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0] || null)} />
            {file ? (
              <p className={styles.fileName}>📎 {file.name}</p>
            ) : (
              <>
                <p>Click to upload file</p>
                <span className={styles.fileTypes}>MP3 · WAV · PDF · DOCX</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>External article URL (for advanced texts)</label>
          <input className={styles.input} type="url" placeholder="e.g. link to Tibetan article..." value={articleUrl} onChange={e => setArticleUrl(e.target.value)} />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {success ? (
          <div className={styles.success}>✓ Lesson added successfully!</div>
        ) : (
          <button className={styles.submit} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Add lesson to curriculum'}
          </button>
        )}
      </div>
    </div>
  )
}
