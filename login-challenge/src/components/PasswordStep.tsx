import { useState } from 'react';
import { UserData } from '../types';
import styles from '../styles/PasswordStep.module.css';

export default function PasswordStep({ userData, setUserData, onNext }: { 
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [password, setPassword] = useState('');

  const handleNumberClick = (num: string) => {
    if (password.length < 4) {
      const newPass = password + num;
      setPassword(newPass);
      setUserData(prev => ({ ...prev, password: newPass }));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create PIN</h2>
      
      <div className={styles.preview}>
        {password.split('').map(() => '•').join(' ')}
      </div>

      <div className={styles.numberGrid}>
        {[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].map((num) => (
          <button
            key={num}
            className={`${styles.numberButton} ${num === '✓' ? styles.confirmButton : ''}`}
            onClick={() => num === '✓' ? onNext() : handleNumberClick(num.toString())}
            disabled={
              (num === '✓' && password.length !== 4) ||
              (num === '⌫' && password.length === 0)
            }
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}