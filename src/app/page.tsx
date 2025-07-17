import Image from "next/image";
import styles from "./page.module.css";
import StepSurvey from "./components/StepSurvey/StepSurvey";

export default function Home() {
  return (
    <main>
      <div className={styles.page}>
        <div className={styles.imageContainer}>
          <Image
            alt="logo"
            src="/logo.png"
            height={400}
            width={800}
            layout="responsive"
            className={styles.image}
          />
        </div>
        <div className={styles.pageContent}>
          <StepSurvey />
        </div>
      </div>
    </main>
  );
}
