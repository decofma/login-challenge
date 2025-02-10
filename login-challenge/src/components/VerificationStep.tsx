import { useState } from "react";
import styles from "../styles/VerificationStep.module.css";

export default function VerificationStep({ onNext }: { onNext: () => void }) {
  const [verified, setVerified] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Human Verification</h2>

      <label className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          className={styles.checkboxInput}
          checked={verified}
          onChange={(e) => setVerified(e.target.checked)}
        />
        <span className={styles.checkboxVisual} />
        <span className={styles.checkboxLabel}>I am not a robot</span>
      </label>

      {verified && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div>
              <p className={styles.popupTitle}>🎉 Verification Successful!</p>
              <p className={styles.popupText}>
                Before you continue, please verify that you are a robot
              </p>
              <div className={styles.buttonGroup}>
                <button className={styles.secondaryButton} onClick={onNext}>
                  Disagree
                </button>
                <button
                  className={styles.primaryButton}
                  onClick={() => window.location.reload()}
                >
                  Agree
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
