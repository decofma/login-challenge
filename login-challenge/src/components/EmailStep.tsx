import { useState, useEffect } from 'react';
import { UserData } from '../types';
import { emailDomains } from '../utils/emailDomains';
import styles from '../styles/EmailStep.module.css';

export default function EmailStep({ userData, setUserData, onNext }: { 
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [localPart, setLocalPart] = useState('');
  const [domain, setDomain] = useState('');
  const [spinning, setSpinning] = useState(false);

  const spinDomain = () => {
    setSpinning(true);
    setTimeout(() => {
      setDomain(emailDomains[Math.floor(Math.random() * emailDomains.length)]);
      setSpinning(false);
    }, 1500);
  };

  useEffect(() => {
    if (localPart && domain) {
      setUserData(prev => ({ ...prev, email: `${localPart}@${domain}` }));
    }
  }, [localPart, domain]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Email</h2>
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={localPart}
          onChange={(e) => setLocalPart(e.target.value)}
          className={styles.emailInput}
          placeholder="username"
        />
        <span className={styles.atSymbol}>@</span>
        <button
          onClick={spinDomain}
          className={`${styles.domainButton} ${spinning ? styles.spinning : ''}`}
          disabled={spinning}
        >
          {domain || 'Choose Domain'}
        </button>
      </div>

      <button
        className={styles.primaryButton}
        onClick={onNext}
        disabled={!localPart || !domain}
      >
        Next Step ✉️
      </button>
    </div>
  );
}