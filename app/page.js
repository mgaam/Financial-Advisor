import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1>Say Hello to Your Personal Investment Advisor</h1>
      </div>

      <div className={`${styles.center} ${styles.description}`}>
        <a href="/chat">
          <p>Let's Chat</p>
        </a>
      </div>
        
    </main>
  );
}
