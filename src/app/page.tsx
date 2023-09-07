import styles from './page.module.css'
import DOIToAbstract from "@/app/DOIToAbstract";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>Welcome to Phillip&apos;s Summations Assessment!</h1>
        <h4>Phillip also just updated his website, check it out at <a className={styles.link} href="https://www.phillip.tel">www.phillip.tel</a></h4>
      </div>
      <DOIToAbstract />
    </main>
  )
}
