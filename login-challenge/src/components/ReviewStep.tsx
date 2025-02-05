import { useState } from 'react';
import { UserData } from '../types';
import styles from '../styles/ReviewStep.module.css';

export default function ReviewStep({ userData, onNext }: { 
  userData: UserData;
  onNext: () => void;
}) {
  const [accepted, setAccepted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Final Review</h2>
      
      <div className={styles.dataContainer}>
        <div className={styles.dataRow}>
          <span>Username:</span>
          <span>{userData.username}</span>
        </div>
        <div className={styles.dataRow}>
          <span>Email:</span>
          <span>{userData.email}</span>
        </div>
        <div className={styles.dataRow}>
          <span>PIN:</span>
          <span>••••</span>
        </div>
        <div className={styles.dataRow}>
          <span>Birthday:</span>
          <span>{userData.birthday}</span>
        </div>
      </div>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={!accepted}
          onChange={(e) => setAccepted(!e.target.checked)}
          className={styles.checkbox}
        />
        I definitely don't agree to the Terms & Conditions.
      </label>

      <button
        className={styles.primaryButton}
        onClick={() => setShowSuccess(true)}
        disabled={!accepted}
      >
        Complete Registration
      </button>

      {showSuccess && (
        <div className={styles.popupOverlay}>
          <div className={styles.successPopup}>
            <h3>🎉 Account Created!</h3>
            <div className={styles.buttonGroup}>
              <button className={styles.secondaryButton} onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button className={styles.primaryButton} onClick={onNext}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}