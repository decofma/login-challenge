import { useRouter } from 'next/router';
import { useAccount } from '../../contexts/AccountContext';
import UsernameInput from '../../components/UsernameInput';
import styles from '../../styles/components/StepIndicator.module.css';
import buttonStyles from '../../styles/components/Button.module.css';

export default function UsernamePage() {
  const router = useRouter();
  const { accountData, setAccountData } = useAccount();

  return (
    <div className="container">
      <div className={styles.stepIndicator}>
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`${styles.stepDot} ${step === 1 ? styles.active : ''}`} />
        ))}
      </div>
      
      <h1>Create Your Identity</h1>
      <UsernameInput onChange={(username) => setAccountData({ username })} />
      
      <button
        className={`${buttonStyles.button} ${accountData.username.length >= 6 ? '' : buttonStyles.disabled}`}
        onClick={() => router.push('/create-account/email')}
        disabled={accountData.username.length < 6}
      >
        Continue to Email
      </button>
    </div>
  );
}