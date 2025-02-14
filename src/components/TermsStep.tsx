// components/TermsStep.tsx
import { useState, useEffect, useRef } from "react";
import styles from "../styles/TermsStep.module.css";

export default function TermsStep({ onNext }: { onNext: () => void }) {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (termsRef.current) {
        termsRef.current.scrollTop += scrollSpeed;

        if (Math.random() > 0.7) {
          setScrollSpeed(Math.random() * 10 + 1);
        }

        setProgress((prev) => {
          const newProgress = prev + Math.random() * 0.1;
          return newProgress >= 99.8 ? Math.random() * 10 : newProgress;
        });
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [scrollSpeed]);

  useEffect(() => {
    const checkScroll = () => {
      if (checkboxRef.current && termsRef.current) {
        const checkboxPosition = checkboxRef.current.offsetTop;
        const scrollPosition =
          termsRef.current.scrollTop + termsRef.current.clientHeight;

        if (scrollPosition > checkboxPosition + 100) {
          setButtonVisible(true);
        }
      }
    };

    termsRef.current?.addEventListener("scroll", checkScroll);
    return () => termsRef.current?.removeEventListener("scroll", checkScroll);
  }, []);

  const handleAgree = () => {
    if (!accepted) {
      alert("Psych! You need to find the hidden checkbox first!");
      return;
    }

    if (Math.random() > 0.5) {
      alert("Just kidding! Scoll 2.3x faster to activate the real button!");
      setButtonVisible(false);
      return;
    }

    onNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Terms of (ab)Use</h2>

      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }}>
          {progress.toFixed(3)}% Read
        </div>
      </div>

      <div
        ref={termsRef}
        className={styles.termsContainer}
        onScroll={() => setProgress((p) => Math.min(p + 0.001, 99.9))}
      >
        {Array.from({ length: 500 }).map((_, i) => {
          if (i === 247) {
            return (
              <p key={i} className={styles.termText}>
                <label className={styles.evilCheckbox}>
                  <input
                    ref={checkboxRef}
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => {
                      setAccepted(e.target.checked);
                      setScrollSpeed((prev) => prev * 0.8);
                    }}
                  />
                  I agree to sell my soul and firstborn child to improve UX
                </label>
              </p>
            );
          }
          else {
            const randomLength = Math.floor(Math.random() * 200 + 50);
            const text = lorem.repeat(3).substring(0, randomLength);
            return (
              <p key={i} className={styles.termText}>
                {text}
              </p>
            );
          }
        })}
      </div>

      <div className={styles.buttonWrapper}>
        {buttonVisible && (
          <button
            className={`${styles.agreeButton} ${
              accepted ? "" : styles.disabled
            }`}
            onClick={handleAgree}
            onMouseEnter={(e) => {
              if (accepted) {
                e.currentTarget.style.transform = `translate(
                  ${Math.random() * 100 - 50}px, 
                  ${Math.random() * 100 - 50}px
                )`;
              }
            }}
          >
            {accepted ? "Agree (hehe)" : "Agree (not really)"}
          </button>
        )}
      </div>
    </div>
  );
}
