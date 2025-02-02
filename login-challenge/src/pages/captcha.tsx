import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/components/Captcha.module.css';

export default function CaptchaPage() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.captchaBox}>
        <h2>Human Verification</h2>
        {!verified ? (
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              onChange={() => setVerified(true)}
              className={styles.checkbox}
            />
            <span>I am not a robot</span>
          </label>
        ) : (
          <div className={styles.confirmationSection}>
            <p className={styles.successText}>Verification Successful! 🎉</p>
            <p className={styles.subText}>Confirm you're a robot</p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                onClick={() => router.push('/')}
              >
                Yes
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => router.push('/create-account/username')}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}