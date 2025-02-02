import React, { useState, useEffect } from 'react';
import { emailDomains } from '../utils/emailDomains';
import styles from '../styles/components/EmailDomainSelector.module.css';

interface Props {
  onLocalPartChange: (value: string) => void;
  onDomainChange: (domain: string) => void;
}

export default function EmailDomainSelector({ onLocalPartChange, onDomainChange }: Props) {
  const [domain, setDomain] = useState(emailDomains[0]);
  const [localPart, setLocalPart] = useState('');

  useEffect(() => {
    onLocalPartChange(localPart);
    onDomainChange(domain);
  }, [localPart, domain]);

  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * emailDomains.length);
    setDomain(emailDomains[randomIndex]);
  };

  return (
    <div className={styles.domainSelector}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="yourname"
          value={localPart}
          onChange={(e) => setLocalPart(e.target.value)}
          className={styles.input}
        />
        <span className={styles.atSymbol}>@</span>
        <div className={styles.domainWrapper}>
          <input
            type="text"
            value={domain}
            readOnly
            className={styles.domainInput}
          />
          <button
            className={styles.domainButton}
            onClick={handleSpin}
          >
            🎰 Spin
          </button>
        </div>
      </div>
    </div>
  );
}