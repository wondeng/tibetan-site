import SiteShell from '@/components/SiteShell'
import CoursePage from '@/components/CoursePage'

export default function AdvancedPage() {
  return (
    <SiteShell>
      <CoursePage
        level="advanced"
        badge="Level 3"
        title="Advanced Tibetan"
        subtitle="Classical and modern literary texts, philosophical vocabulary, and independent reading."
      />
    </SiteShell>
  )
}
