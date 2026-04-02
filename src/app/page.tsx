import SiteShell from '@/components/SiteShell'
import styles from './page.module.css'

export default function AboutPage() {
  return (
    <SiteShell>
      <div className={styles.hero}>
        <div className={styles.heroTag}>Columbia University · MESAAS</div>
        <h1 className={styles.heroTitle}>Tibetan Language Program</h1>
        <div className={styles.heroTibetan}>བོད་སྐད་སློབ་གྲྭ།</div>
        <p className={styles.heroSub}>
          A structured curriculum for learning classical and colloquial Tibetan,
          from foundational script to advanced literary texts.
        </p>
      </div>

      <div className="container">
        <div className={styles.profCard}>
          <div className={styles.avatar}>S</div>
          <div>
            <h2 className={styles.profName}>Professor Sonam</h2>
            <p className={styles.profRole}>Lecturer in Tibetan Language · Columbia University</p>
            <p className={styles.profBio}>
              Professor Sonam teaches Tibetan language at Columbia University, guiding students
              through written and spoken Tibetan from the Tibetan script and basic vocabulary
              through advanced literary and philosophical texts. His courses emphasize both
              conversational fluency and engagement with classical Tibetan literature.
            </p>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Course overview</h3>
        <div className={styles.infoGrid}>
          {[
            { label: 'Levels offered', value: 'Elementary · Intermediate · Advanced' },
            { label: 'Semesters', value: 'Fall & Spring' },
            { label: 'Script', value: 'Uchen (དབུ་ཅན་)' },
            { label: 'Department', value: 'MESAAS · Columbia GSAS' },
          ].map(item => (
            <div key={item.label} className={styles.infoCard}>
              <div className={styles.infoLabel}>{item.label}</div>
              <div className={styles.infoValue}>{item.value}</div>
            </div>
          ))}
        </div>

        <h3 className={styles.sectionTitle}>Program structure</h3>
        <p className={styles.body}>
          Students begin in Elementary Tibetan with the Tibetan script (Uchen), basic phonology,
          and foundational grammar. Intermediate courses build vocabulary and reading fluency.
          Advanced students engage with authentic texts — newspaper articles, classical literature,
          and philosophical writings — developing the skills to read Tibetan independently.
        </p>
      </div>
    </SiteShell>
  )
}
