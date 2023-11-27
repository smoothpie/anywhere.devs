import Image from 'next/image'
import Link from 'next/link'
import styles from './Page.module.scss'

export default function HomePage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Coding School</h1>
        <p>Searchable collection of some random coding courses. Created during a Next.js, MongoDB, Prisma and Clerk tutorial</p>
        <Link href="/courses">
          <button>Browse courses</button>
        </Link>
      </header>
    </main>
  )
}
