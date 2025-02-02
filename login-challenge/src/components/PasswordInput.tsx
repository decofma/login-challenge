import React, { useState } from 'react';
import styles from '../styles/components/PasswordInput.module.css';

interface Props {
  onChange: (password: string) => void;
}

export default function PasswordInput({ onChange }: Props) {
  const [password, setPassword] = useState('');
  const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

  const handleClick = (num: string) => {
    if (password.length < 4) {
      const newPass = password + num;
      setPassword(newPass);
      onChange(newPass);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.passwordDisplay}>
        {Array(4).fill(0).map((_, i) => (
          <span key={i} className={styles.dot}>
            {i < password.length ? '•' : '○'}
          </span>
        ))}
      </div>
      
      <div className={styles.numpad}>
        {numbers.map((num) => (
          <button
            key={num}
            className={styles.numberButton}
            onClick={() => handleClick(num)}
            disabled={password.length >= 4}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}