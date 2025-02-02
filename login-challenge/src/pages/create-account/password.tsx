import { useRouter } from 'next/router';
import { useAccount } from '../../contexts/AccountContext';
import PasswordInput from '../../components/PasswordInput';
import styles from '../../styles/components/StepIndicator.module.css';
import buttonStyles from '../../styles/components/Button.module.css';
import { useState } from 'react';

export default function PasswordPage() {
  const router = useRouter();
  const { setAccountData } = useAccount();
  const [password, setPassword] = useState('');

  return (
    <div className="container">
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`${styles.stepDot} ${step === 3 ? styles.active : ''}`} />
        ))}
      </div>

      <h1>Secure Your Account</h1>
      <PasswordInput 
        onChange={(pass: any) => {
          setPassword(pass);
          setAccountData({ password: pass });
        }}
      />
      
      <button
        className={`${buttonStyles.button} ${password.length === 6 ? '' : buttonStyles.disabled}`}
        onClick={() => router.push('/create-account/confirm')}
        disabled={password.length !== 4}
      >
        Confirm Password
      </button>
    </div>
  );
}