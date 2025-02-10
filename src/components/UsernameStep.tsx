import { useState, useEffect } from "react";
import { UserData } from "../types";
import styles from "../styles/UsernameStep.module.css";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function UsernameStep({
  userData,
  setUserData,
  onNext,
}: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [chars, setChars] = useState<
    Array<{ char: string; x: number; y: number }>
  >([]);
  const [showBotWarning, setShowBotWarning] = useState(false);
  const [lastChar, setLastChar] = useState("");
  const [repeatCount, setRepeatCount] = useState(0);
  const [disabler, setDisabler] = useState(false);

  useEffect(() => {
    const newChars = Array.from({ length: 50 }, () => ({
      char: letters[Math.floor(Math.random() * letters.length)],
      x: Math.random() * 90,
      y: Math.random() * 90,
    }));
    setChars(newChars);

    const interval = setInterval(() => {
      setChars((prev) =>
        prev.map((c) => ({
          ...c,
          x: (c.x + Math.random() * 6 - 3) % 100,
          y: (c.y + Math.random() * 6 - 3) % 100,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const shuffleLetters = () => {
    setChars(prev => prev.map(() => ({
      char: letters[Math.floor(Math.random() * letters.length)],
      x: Math.random() * 90,
      y: Math.random() * 90
    })));
  };

  const handleCharClick = (char: string) => {
    if (userData.username.length >= 10) return;

    if (char === lastChar) {
      setRepeatCount((prev) => prev + 1);
    } else {
      setRepeatCount(1);
    }

    if (repeatCount >= 2) {
      setShowBotWarning(true);
      setDisabler(true);
      return;
    }

    setLastChar(char);
    setUserData((prev) => ({
      ...prev,
      username: prev.username + char,
    }));

    shuffleLetters();
    setTimeout(() => {
      setChars((prev) =>
        prev.map((c) => ({
          ...c,
          x: (c.x + Math.random() * 40 - 20) % 100,
          y: (c.y + Math.random() * 40 - 20) % 100,
        }))
      );
    }, 50);
  };

  const handleDelete = () => {
    if (userData.username.length === 0) return;

    setChars((prev) =>
      prev.map((c) => ({
        ...c,
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: letters[Math.floor(Math.random() * letters.length)],
      }))
    );

    setUserData((prev) => ({ ...prev, username: "" }));
    setLastChar("");
    setRepeatCount(0);
    setDisabler(false);

    const messages = [
      "POOF! All gone!",
      "Whoosh! Vanished!",
      "Et tu, Brute?",
      "Ctrl+Z me if you can!",
      "Delete level: Ninja",
      "O-oh.. too late :/",
      "Brrr! It's gone!",
      "Poof! It's gone!",
      "Where is my username?!",
    ];
    alert(messages[Math.floor(Math.random() * messages.length)]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Create Username {userData.username.length}/10
      </h2>

      <div className={styles.lettersContainer}>
        {chars.map((c, i) => (
          <div
            key={i}
            className={styles.letter}
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            onClick={() => handleCharClick(c.char)}
          >
            {c.char}
          </div>
        ))}
      </div>

      <div className={styles.previewWrapper}>
        <div className={styles.preview}>
          {userData.username.padEnd(10, "_").slice(0, 10)}
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={styles.secondaryButton}
          onClick={handleDelete}
          disabled={userData.username.length === 0}
        >
          Erase
        </button>
        <button
          className={`${styles.primaryButton} ${
            userData.username.length < 4 ? "disabled" : ""
          }`}
          onClick={onNext}
          disabled={userData.username.length < 4 || disabler}
        >
          Next
        </button>
      </div>

      {showBotWarning && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <p className={styles.popupTitle}>🤖 Robot Detected!</p>
            <p className={styles.popupText}>
              Humans don`&apos;`t repeat the same character 3 times!
            </p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.secondaryButton}
                onClick={() => {
                  setShowBotWarning(false);
                  setRepeatCount(1);
                  setDisabler(false);
                }}
              >
                I`&apos;`m human
              </button>
              <button
                className={styles.primaryButton}
                onClick={() => window.location.reload()}
              >
                I`&apos;`m sorry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
