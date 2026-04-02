import SiteShell from '@/components/SiteShell'
import styles from './page.module.css'

const items = [
  {
    icon: '📝',
    title: 'Lesson quizzes',
    desc: 'Short vocabulary and grammar quizzes following each lesson module.',
    status: 'Coming soon',
  },
  {
    icon: '🎙',
    title: 'Oral evaluation',
    desc: 'Mid-semester pronunciation and conversation assessment with Professor Sonam.',
    status: 'By appointment',
  },
  {
    icon: '📖',
    title: 'Reading comprehension',
    desc: 'End-of-semester reading tests using level-appropriate Tibetan texts.',
    status: 'Coming soon',
  },
  {
    icon: '🎯',
    title: 'Placement test',
    desc: 'For students with prior Tibetan study seeking to enter at an appropriate level.',
    status: 'Contact instructor',
  },
]

export default function AssessmentPage() {
  return (
    <SiteShell>
      <div className={styles.header}>
        <div className={styles.badge}>Assessments</div>
        <h1 className={styles.title}>Assessments &amp; Evaluations</h1>
        <p className={styles.subtitle}>Quizzes, oral evaluations, and placement tests for all levels.</p>
      </div>

      <div className="container-sm">
        <h3 className={styles.sectionTitle}>Evaluation structure</h3>
        <p className={styles.intro}>
          Each level includes formative quizzes after key lessons, mid-semester oral evaluations,
          and a final written exam. Placement testing is available for students with prior Tibetan study.
        </p>

        <div className={styles.grid}>
          {items.map(item => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h4 className={styles.cardTitle}>{item.title}</h4>
              <p className={styles.cardDesc}>{item.desc}</p>
              <span className={styles.status}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
