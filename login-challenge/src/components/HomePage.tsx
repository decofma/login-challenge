import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function HomePage({ onNext }: { onNext: () => void }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login Challenge</h1>
      
      <div className={styles.buttonGroup}>
        <button 
          className={styles.primaryButton}
          onClick={() => setShowPopup(true)}
        >
          Create Account
        </button>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <p className="text-2xl text-#493D9E font-bold mb-4">
              Are you sure you don't want to create an account?
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                className={styles.primaryButton}
                onClick={onNext}
              >
                No
              </button>
              <button 
                className={styles.primaryButton}
                onClick={() => setShowPopup(false)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}