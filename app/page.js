import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1>Say Hello to Your Personal Investment Advisor</h1>
      </div>

      <div className={styles.center}>
        <a href="/chat" className={styles.description}>
          <p>Let's Chat</p>
        </a>
      </div>
        
    </main>
  );
}
