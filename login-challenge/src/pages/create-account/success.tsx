import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAccount } from '../../contexts/AccountContext';
import buttonStyles from '../../../styles/components/Button.module.css';

export default function SuccessPage() {
  const router = useRouter();
  const { resetAccount } = useAccount();

  useEffect(() => {
    const timer = setTimeout(() => resetAccount(), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <div className={buttonStyles.successPopup}>
        <h2>🎉 Account Created Successfully!</h2>
        <p>Welcome to the best login experience ever</p>
        <button
          className={buttonStyles.button}
          onClick={() => {
            resetAccount();
            router.push('/');
          }}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}