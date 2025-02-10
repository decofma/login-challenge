import { useState } from "react";
import { UserData } from "../types";
import styles from "../styles/BirthdayStep.module.css";

export default function BirthdayStep({
  userData,
  setUserData,
  onNext,
}: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(1900);
  const currentYear = new Date().getFullYear();

  const clamp = (value: number, max: number) =>
    Math.min(Math.max(value, 1), max);

  const updateDate = () => {
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    setUserData((prev) => ({ ...prev, birthday: formattedDate }));
  };

  const handleReset = () => {
    setDay(1);
    setMonth(1);
    setYear(1900);
    updateDate();
  };

  const handleIncrement = (type: "day" | "month" | "year", value: number) => {
    switch (type) {
      case "day":
        setDay((prev) => clamp(prev + value, 31));
        break;
      case "month":
        setMonth((prev) => clamp(prev + value, 12));
        break;
      case "year":
        setYear((prev) => clamp(prev + value, currentYear));
        break;
    }
    updateDate();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Set Birthday</h2>

      <div className={styles.dateDisplay}>
        {day.toString().padStart(2, "0")}/{month.toString().padStart(2, "0")}/
        {year}
      </div>

      <div className={styles.controlsGrid}>
        <div className={styles.controlGroup}>
          <span className={styles.label}>Day</span>
          <button
            className={styles.incrementButton}
            onClick={() => handleIncrement("day", 1)}
          >
            +1 Day
          </button>
          <button
            className={styles.incrementButton}
            onClick={() =>
              handleIncrement("day", Math.floor(Math.random() * 20) + 1)
            }
          >
            +Random
          </button>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.label}>Month</span>
          <button
            className={styles.incrementButton}
            onClick={() => handleIncrement("month", 1)}
          >
            +1 Month
          </button>
          <button
            className={styles.incrementButton}
            onClick={() =>
              handleIncrement("month", Math.floor(Math.random() * 20) + 1)
            }
          >
            +Random
          </button>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.label}>Year</span>
          <button
            className={styles.incrementButton}
            onClick={() => handleIncrement("year", 1)}
          >
            +1 Year
          </button>
          <button
            className={styles.incrementButton}
            onClick={() =>
              handleIncrement("year", Math.floor(Math.random() * 20) + 1)
            }
          >
            +Random
          </button>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.secondaryButton} onClick={handleReset}>
          ↻ Reset
        </button>
        <button className={styles.primaryButton} onClick={onNext}>
          Confirm 🎂
        </button>
      </div>
    </div>
  );
}
