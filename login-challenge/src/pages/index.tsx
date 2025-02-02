// pages/index.tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>LoginChallenge</h1>
      <button 
        className={styles.ctaButton}
        onClick={() => setShowPopup(true)}
      >
        Create Account
      </button>

      {showPopup && (
        <div className={styles.confirmationPopup}>
          <p>Are you sure you do not want to create an account?</p>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.primaryButton}
              onClick={() => setShowPopup(false)}
            >
              Yes
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => router.push('/captcha')}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}