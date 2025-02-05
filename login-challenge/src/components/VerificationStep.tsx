import { useState } from 'react';
import styles from '../styles/VerificationStep.module.css';

export default function VerificationStep({ onNext }: { onNext: () => void }) {
  const [verified, setVerified] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Human Verification</h2>
      
      {!verified ? (
        <div className={styles.checkboxContainer}>
          <input 
            type="checkbox" 
            className={styles.checkbox}
            onChange={(e) => setVerified(e.target.checked)}
          />
          <span className="text-#493D9E text-xl">I am not a robot</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl text-#493D9E mb-4">Verification Complete! 🎉</p>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.primaryButton}
              onClick={() => window.location.reload()}
            >
              I'm a Robot
            </button>
            <button 
              className={styles.primaryButton}
              onClick={onNext}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}