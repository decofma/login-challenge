import { useRouter } from 'next/router';
import { useAccount } from '../../contexts/AccountContext';
import PasswordConfirm from '../../components/PasswordConfirm';
import styles from '../../styles/components/StepIndicator.module.css';
import buttonStyles from '../../styles/components/Button.module.css';
import { useState } from 'react';

export default function ConfirmPage() {
  const router = useRouter();
  const { accountData } = useAccount();
  const [error, setError] = useState('');

  const handleConfirm = (isMatch: boolean) => {
    if (isMatch) {
      router.push('/create-account/terms');
    } else {
      setError('O-OH! You got it wrong :(');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="container">
      {/* Alterar array de 6 para 4 pontos */}
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4].map((step) => ( // Alterado para 4 passos
          <div key={step} className={`${styles.stepDot} ${step === 3 ? styles.active : ''}`} /> // Ajustado para step 3
        ))}
      </div>

      <h1>Confirm Your Secret Code</h1>
      {error && <div className={buttonStyles.errorMessage}>{error}</div>}
      <PasswordConfirm password={accountData.password} onConfirm={handleConfirm} />
    </div>
  );
}