import { useState, useEffect, useCallback } from 'react';
import { UserData } from '../types';
import styles from '../styles/PasswordConfirmationStep.module.css';

export default function PasswordConfirmationStep({ userData, setUserData, onNext }: { 
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [input, setInput] = useState('');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showResult, setShowResult] = useState<'success' | 'error' | null>(null);

  const shuffleNumbers = useCallback(() => {
    setIsShuffling(true);
    const newNumbers = Array.from({ length: 10 }, (_, i) => i).sort(() => Math.random() - 0.5);
    setNumbers(newNumbers);
    
    setTimeout(() => {
      setIsShuffling(false);
      setIsRevealed(true);
      setTimeout(() => {
        setIsRevealed(false);
        shuffleNumbers();
      }, 2000);
    }, 1000);
  }, []);

  useEffect(() => {
    shuffleNumbers();
  }, [shuffleNumbers]);

  const handleCardClick = (num: number) => {
    if (isRevealed && !isShuffling && input.length < 4) {
      setInput(prev => prev + num.toString());
    }
  };

  useEffect(() => {
    if (input.length === 4) {
      if (input === userData.password) {
        setShowResult('success');
      } else {
        setShowResult('error');
        setTimeout(() => {
          setInput('');
          shuffleNumbers();
          setShowResult(null);
        }, 2000);
      }
    }
  }, [input]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Confirm PIN</h2>
      
      <div className={styles.preview}>
        {input.split('').map(() => '•').join(' ')}
      </div>

      <div className={styles.cardGrid}>
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`${styles.card} ${!isRevealed ? styles.cardHidden : ''} ${
              isShuffling ? styles.shuffling : ''
            }`}
            onClick={() => handleCardClick(num)}
          >
            {num}
          </div>
        ))}
      </div>

      {showResult && (
        <div className={styles.popupOverlay}>
          <div className={styles.resultPopup}>
            <p className={styles.resultText}>
              {showResult === 'success' ? '🎉 YEY! Passwords match!' : '😱 O-OH! Wrong PIN!'}
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.primaryButton}
                onClick={showResult === 'success' ? onNext : shuffleNumbers}
              >
                {showResult === 'success' ? 'Continue' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}