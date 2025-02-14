// components/FinalStep.tsx
import { useEffect, useState } from "react";
import styles from "../styles/FinalStep.module.css";

export default function FinalStep() {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    // Simular carregamento de conquistas
    const fakeAchievements = [
      "Survived the Terms of Service",
      "Passed the CAPTCHA Gauntlet",
      "Memorized 10 New Passwords",
      "Verified as 0.3% Human",
      'Earned "Masochist of the Year" Award',
    ];

    const timeout = setTimeout(() => {
      setAchievements(fakeAchievements);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleConfetti = () => {
    const colors = ["#ff69b4", "#7b68ee", "#55ff55"];
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement("div");
      confetti.style.position = "fixed";
      confetti.style.width = "10px";
      confetti.style.height = "10px";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = "-10px";
      confetti.style.borderRadius = "50%";
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }
  };

  useEffect(() => {
    handleConfetti();
    const audio = new Audio("/sounds/victory.mp3"); // Adicione um som de vitória
    audio.play();

    const secretTimeout = setTimeout(() => {
      setShowSecret(true);
    }, 10000);

    return () => clearTimeout(secretTimeout);
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
