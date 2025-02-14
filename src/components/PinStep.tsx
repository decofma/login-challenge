import { useState } from "react";
import { UserData } from "../types";
import styles from "../styles/PinStep.module.css";

export default function PinStep({
  setUserData,
  onNext,
}: {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  onNext: () => void;
}) {
  const [password, setPassword] = useState("");

  const handleNumberClick = (num: string) => {
    if (num === "<") {
      const newPass = password.slice(0, -1);
      setPassword(newPass);
      setUserData((prev) => ({ ...prev, password: newPass }));
    } else if (num === "ok") {
      onNext();
    } else if (password.length < 4) {
      const newPass = password + num;
      setPassword(newPass);
      setUserData((prev) => ({ ...prev, password: newPass }));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create PIN</h2>

      <div className={styles.preview}>
        {password
          .split("")
          .map(() => "•")
          .join(" ")}
      </div>

      <div className={styles.numberGrid}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "<", 0, "ok"].map((num) => (
          <button
            key={num}
            className={`${styles.numberButton} ${
              num === "ok" ? styles.confirmButton : ""
            }`}
            onClick={() => handleNumberClick(num.toString())}
            disabled={
              (num === "ok" && password.length !== 4) ||
              (num === "<" && password.length === 0)
            }
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
