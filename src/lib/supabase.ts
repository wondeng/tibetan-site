import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lesson = {
  id: string
  created_at: string
  level: 'elementary' | 'intermediate' | 'advanced'
  semester: 'fall' | 'spring'
  lesson_number: number
  title: string
  description: string | null
  youtube_url: string | null
  article_url: string | null
  published: boolean
  lesson_files?: LessonFile[]
}

export type LessonFile = {
  id: string
  lesson_id: string
  file_name: string
  file_path: string
  file_type: 'pdf' | 'audio' | 'other'
  public_url: string | null
}

export async function getLessons(level: string, semester: string): Promise<Lesson[]> {
  const { data, error } = await supabase
    .from('lessons')
    .select(`*, lesson_files(*)`)
    .eq('level', level)
    .eq('semester', semester)
    .eq('published', true)
    .order('lesson_number', { ascending: true })

  if (error) {
    console.error('Error fetching lessons:', error)
    return []
  }
  return data || []
}

export async function addLesson(lesson: {
  level: string
  semester: string
  title: string
  description: string
  youtube_url: string
  article_url: string
}): Promise<{ id: string } | null> {
  // Get next lesson number
  const { data: existing } = await supabase
    .from('lessons')
    .select('lesson_number')
    .eq('level', lesson.level)
    .eq('semester', lesson.semester)
    .order('lesson_number', { ascending: false })
    .limit(1)

  const nextNum = existing && existing.length > 0 ? existing[0].lesson_number + 1 : 1

  const { data, error } = await supabase
    .from('lessons')
    .insert({
      ...lesson,
      lesson_number: nextNum,
      youtube_url: lesson.youtube_url || null,
      article_url: lesson.article_url || null,
    })
    .select('id')
    .single()

  if (error) {
    console.error('Error adding lesson:', error)
    return null
  }
  return data
}

export async function uploadLessonFile(
  lessonId: string,
  file: File
): Promise<string | null> {
  const ext = file.name.split('.').pop()?.toLowerCase()
  const fileType = ['mp3', 'wav', 'm4a', 'ogg'].includes(ext || '') ? 'audio' : ext === 'pdf' ? 'pdf' : 'other'
  const filePath = `${lessonId}/${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from('lesson-files')
    .upload(filePath, file)

  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return null
  }

  const { data: urlData } = supabase.storage
    .from('lesson-files')
    .getPublicUrl(filePath)

  const publicUrl = urlData.publicUrl

  await supabase.from('lesson_files').insert({
    lesson_id: lessonId,
    file_name: file.name,
    file_path: filePath,
    file_type: fileType,
    public_url: publicUrl,
  })

  return publicUrl
}
