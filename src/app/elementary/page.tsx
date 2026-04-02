import SiteShell from '@/components/SiteShell'
import CoursePage from '@/components/CoursePage'

export default function ElementaryPage() {
  return (
    <SiteShell>
      <CoursePage
        level="elementary"
        badge="Level 1"
        title="Elementary Tibetan"
        subtitle="Script, phonology, basic grammar, and everyday vocabulary. No prior knowledge required."
      />
    </SiteShell>
  )
}
