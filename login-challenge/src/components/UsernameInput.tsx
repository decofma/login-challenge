import React, { useEffect, useState } from 'react';
import styles from '../styles/components/UsernameInput.module.css';
const [isAnimating, setIsAnimating] = useState(false);

interface Props {
  onChange: (username: string) => void;
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function UsernameInput({ onChange }: Props) {
  const [username, setUsername] = useState('');
  const [positions, setPositions] = useState<{ [key: string]: { top: number; left: number } }>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setPositions(prev => {
        const newPositions = { ...prev };
        Object.keys(newPositions).forEach((key) => {
          newPositions[key] = {
            top: Math.random() * 80 + 10,
            left: Math.random() * 80 + 10
          };
        });
        return newPositions;
      });
      setTimeout(() => setIsAnimating(false), 3000); // Duração da animação
    }, 5000); // Intervalo entre movimentos
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.usernameBox}>
        <div className={styles.usernameDisplay}>{username || 'Click letters to build username'}</div>
      </div>
      
      <div className={styles.letterContainer}>
        {letters.map((letter) => (
          <button
            key={letter}
            className={styles.letter}
            style={{
              top: `${positions[letter]?.top}%`,
              left: `${positions[letter]?.left}%`,
            }}
            onClick={() => {
              if (username.length < 12) {
                const newUsername = username + letter;
                setUsername(newUsername);
                onChange(newUsername);
              }
            }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}