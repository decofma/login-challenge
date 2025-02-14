import { useState, useEffect, useCallback, useRef } from "react";
import { UserData } from "../types";
import styles from "../styles/PinConfirmationStep.module.css";

interface Props {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}

export default function PinConfirmationStep({ userData, onNext }: Props) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [selectedDigits, setSelectedDigits] = useState<string[]>([]);
  const [showNumbers, setShowNumbers] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);
  const positionsRef = useRef<DOMRect[]>([]);

  const difficultyConfig = [
    { shuffles: 3, speed: 500, visibleTime: 1500 },
    { shuffles: 9, speed: 300, visibleTime: 1000 },
    { shuffles: 21, speed: 100, visibleTime: 500 },
  ];

  useEffect(() => {
    setNumbers(Array.from({ length: 10 }, (_, i) => i));
    return () => timeoutRef.current.forEach(clearTimeout);
  }, []);

  const validateDigit = (digit: number) =>
    digit === Number(userData.password[currentStep]);

  const animateWave = useCallback(async () => {
    const cards = Array.from(document.querySelectorAll(`.${styles.card}`));

    cards.forEach((card, index) => {
      timeoutRef.current.push(
        setTimeout(() => {
          card.classList.add(styles.wave);
          setTimeout(() => card.classList.remove(styles.wave), 500);
        }, index * 100)
      );
    });

    await new Promise((r) => setTimeout(r, cards.length * 100 + 500));
  }, []);

  const animateFLIP = useCallback(async (speed: number) => {
    const cards = Array.from(document.querySelectorAll(`.${styles.card}`));

    await new Promise((r) => setTimeout(r, 50));
    const finalPositions = cards.map((card) => card.getBoundingClientRect());

    cards.forEach((card, index) => {
      const initial = positionsRef.current[index];
      const final = finalPositions[index];

      if (!initial || !final) return;

      const deltaX = initial.left - final.left;
      const deltaY = initial.top - final.top;

      (
        card as HTMLElement
      ).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      (card as HTMLElement).style.transition = "transform 0s";

      requestAnimationFrame(() => {
        (card as HTMLElement).style.transform = "";
        (
          card as HTMLElement
        ).style.transition = `transform ${speed}ms ease-in-out`;
      });
    });
  }, []);

  const shuffleCards = useCallback(
    async (shuffles: number, speed: number) => {
      await animateWave();

      for (let i = 0; i < shuffles; i++) {
        positionsRef.current = Array.from(
          document.querySelectorAll(`.${styles.card}`)
        ).map((card) => card.getBoundingClientRect());

        setNumbers((prev) => [...prev].sort(() => Math.random() - 0.5));
        await animateFLIP(speed);
        await new Promise((r) => setTimeout(r, speed));
      }
    },
    [animateFLIP, animateWave]
  );

  const handleCardClick = async (num: number) => {
    if (isAnimating) return;

    if (!validateDigit(num)) {
      setShowError(true);
      return;
    }

    const newSelected = [...selectedDigits, num.toString()];
    setSelectedDigits(newSelected);

    if (newSelected.length === userData.password.length) {
      setShowSuccess(true);
      return;
    }

    if (currentStep < difficultyConfig.length) {
      setIsAnimating(true);
      setShowNumbers(true);

      const config = difficultyConfig[currentStep];
      await shuffleCards(config.shuffles, config.speed);

      timeoutRef.current.push(
        setTimeout(() => {
          setShowNumbers(false);
          setIsAnimating(false);
          setCurrentStep((prev) => prev + 1);
        }, config.visibleTime)
      );
    } else {
      setIsAnimating(true);
      timeoutRef.current.push(
        setTimeout(() => {
          setShowNumbers(false);
          setIsAnimating(false);
          setCurrentStep((prev) => prev + 1);
        }, 1000)
      );
    }
  };

  const resetProcess = () => {
    setShowError(false);
    setSelectedDigits([]);
    setCurrentStep(0);
    setShowNumbers(true);
    setNumbers(Array.from({ length: 10 }, (_, i) => i));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirm Pin</h1>

      <div className={styles.passwordPreview}>
        {userData.password.split("").map((_, i) => (
          <span key={i} className={styles.previewDigit}>
            {i < selectedDigits.length ? selectedDigits[i] : "•"}
          </span>
        ))}
      </div>

      <div className={styles.cardGrid}>
        {numbers.map((num, i) => (
          <div
            key={i}
            className={`${styles.card} ${showNumbers ? "" : styles.hidden}`}
            onClick={() => handleCardClick(num)}
          >
            <div className={styles.cardFront}>{num}</div>
            <div className={styles.cardBack}>?</div>
          </div>
        ))}
      </div>

      {showError && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>Incorrect Pin!</h2>
            <button className={styles.button} onClick={resetProcess}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupTitle}>🎉 Pin Correct!</h2>
            <button
              className={styles.button}
              onClick={() => {
                setShowSuccess(false);
                onNext();
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
