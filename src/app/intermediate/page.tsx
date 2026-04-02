import SiteShell from '@/components/SiteShell'
import CoursePage from '@/components/CoursePage'

export default function IntermediatePage() {
  return (
    <SiteShell>
      <CoursePage
        level="intermediate"
        badge="Level 2"
        title="Intermediate Tibetan"
        subtitle="Expanding grammar, reading short texts, and building conversational fluency."
      />
    </SiteShell>
  )
}
