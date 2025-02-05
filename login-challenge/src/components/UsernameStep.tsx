import { useState, useEffect } from 'react';
import { UserData } from '../types';
import styles from '../styles/UsernameStep.module.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function UsernameStep({ userData, setUserData, onNext }: { 
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [chars, setChars] = useState<Array<{ char: string; x: number; y: number }>>([]);
  const [showBotWarning, setShowBotWarning] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [nextlastChar, setNextLastChar] = useState('');
  const [disabler, setDisabler] = useState(false);
  useEffect(() => {
    const newChars = Array.from({ length: 50 }, () => ({
      char: letters[Math.floor(Math.random() * letters.length)],
      x: Math.random() * 90,
      y: Math.random() * 90
    }));
    setChars(newChars);

    const interval = setInterval(() => {
      setChars(prev => prev.map(c => ({
        ...c,
        x: (c.x + Math.random() * 4 - 2) % 100,
        y: (c.y + Math.random() * 4 - 2) % 100
      })));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCharClick = (char: string) => {
    if (userData.username.length >= 10) return;
    
    if (char === lastChar) {
      setShowBotWarning(true);
      setDisabler(true);
      return;
    }

    setLastChar(char);
    setUserData(prev => ({ 
      ...prev, 
      username: prev.username + char 
    }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Username</h2>
      
      <div className={styles.lettersContainer}>
        {chars.map((c, i) => (
          <div
            key={i}
            className={styles.letter}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            onClick={() => handleCharClick(c.char)}
          >
            {c.char}
          </div>
        ))}
      </div>

      <div className={styles.preview}>
        {userData.username.padEnd(6, '_').slice(0, 6)}
      </div>

      <div className="action-buttons">
        <button
          className={`primary-button ${userData.username.length < 4 ? 'disabled' : ''}`}
          onClick={onNext}
          disabled={userData.username.length < 4 || disabler}
        >
          Next {userData.username.length}/10
        </button>
      </div>
      {showBotWarning && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p className="text-2xl text-#493D9E font-bold mb-4">🤖 Robot Detected!</p>
            <p className="text-#493D9E mb-6">Humans don't repeat the same character!</p>
            <div className="action-buttons">
              <button 
                className="secondary-button"
                onClick={() => window.location.reload()}
              >
                Start Over
              </button>
              <button 
                className="primary-button"
                onClick={() => setShowBotWarning(false)}
              >
                I'm Human!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}