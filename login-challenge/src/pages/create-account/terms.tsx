import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from '../../contexts/AccountContext';
import styles from '../../styles/components/StepIndicator.module.css';
import buttonStyles from '../../styles/components/Button.module.css';

export default function TermsPage() {
  const router = useRouter();
  const { accountData, resetAccount } = useAccount();
  const [accepted, setAccepted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (accepted) {
      router.push('/create-account/success');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <div className="container">
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`${styles.stepDot} ${step === 5 ? styles.active : ''}`} />
        ))}
      </div>

      <div className={buttonStyles.infoBox}>
        <p>Username: {accountData.username}</p>
        <p>Email: {accountData.email}</p>
        <p>Password: {'•'.repeat(6)}</p>
      </div>

      <label className={buttonStyles.checkboxContainer}>
        <input 
          type="checkbox" 
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>I accept the Terms & Conditions</span>
      </label>

      {showError && <div className={buttonStyles.errorMessage}>Please accept our terms to continue</div>}

      <div className={buttonStyles.buttonGroup}>
        <button className={buttonStyles.secondary} onClick={resetAccount}>
          Cancel
        </button>
        <button className={buttonStyles.button} onClick={handleSubmit}>
          Create Account
        </button>
      </div>
    </div>
  );
}