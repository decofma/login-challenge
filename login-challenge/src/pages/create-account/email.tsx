import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from './../../contexts/AccountContext';
import EmailDomainSelector from '../../components/EmailDomainSelector';
import styles from '../../styles/components/StepIndicator.module.css';
import buttonStyles from '../../styles/components/Button.module.css';

export default function EmailPage() {
  const router = useRouter();
  const { setAccountData } = useAccount();
  const [localPart, setLocalPart] = useState('');

  return (
    <div className="container">
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`${styles.stepDot} ${step === 2 ? styles.active : ''}`} />
        ))}
      </div>

      <h1>Build Your Email</h1>
      <EmailDomainSelector
        onLocalPartChange={setLocalPart}
        onDomainChange={(domain) => setAccountData({ email: `${localPart}@${domain}` })}
      />
      
      <button
        className={`${buttonStyles.button} ${localPart ? '' : buttonStyles.disabled}`}
        onClick={() => router.push('/create-account/password')}
        disabled={!localPart}
      >
        Continue to Password
      </button>
    </div>
  );
}