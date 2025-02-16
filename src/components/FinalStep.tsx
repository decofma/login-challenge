// components/FinalStep.tsx
import { useEffect, useState } from "react";
import styles from "../styles/FinalStep.module.css";

export default function FinalStep() {
  const [achievements, setAchievements] = useState<string[]>([]);

  useEffect(() => {
    const fakeAchievements = [
      'Earned "Masochist of the Year" Award',
      "Verified as 0.3% Human",
      "Created a weird username",
      "Solvend the pin puzzle",
      "Managed to type your birthdate",
      "Memorized 10 New Passwords",
      "Completed 0% of the Form",
      "Survived the Terms of Service",
    ];

    const timeout = setTimeout(() => {
      setAchievements(fakeAchievements);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎉 CONGRATULATIONS! 🎉</h1>
      <p className={styles.subtitle}>You survived the Login Challenge!</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.number}>42</span>
          <span className={styles.label}>Useless Data Points Collected</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.number}>∞</span>
          <span className={styles.label}>Seconds of Life Wasted</span>
        </div>
      </div>

      <div className={styles.achievements}>
        <h3>Questionable Achievements:</h3>
        {achievements.map((a, i) => (
          <div key={i} className={styles.achievement}>
            ✔️ {a}
          </div>
        ))}
      </div>

      <div className={styles.buttonGroup}>
        <button
          className={styles.restartButton}
          onClick={() => window.location.reload()}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(${
              Math.random() * 10 - 5
            }deg)`;
          }}
        >
          ⚡ Try Again (Why?)
        </button>
      </div>
    </div>
  );
}
