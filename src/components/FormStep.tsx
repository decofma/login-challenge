// components/EvilFormStep.tsx
import { useState, useEffect } from "react";
import styles from "../styles/EvilFormStep.module.css";

const bloodTypes = ["🅰️", "🅱️", "🆎", "🅾️", "❓", "💉", "👻"];

export default function EvilFormStep({ onNext }: { onNext: () => void }) {
  const [formData, setFormData] = useState({
    bloodType: "",
    childhoodPet: "",
    teacherName: "",
    secretCode: "",
  });

  const [showRealNext, setShowRealNext] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [hasResetClicked, setHasResetClicked] = useState(false);

  const validateForm = () => {
    const isBloodTypeEmpty = formData.bloodType === "";
    const isPetEmpty = formData.childhoodPet === "";
    const isTeacherNameEmpty = formData.teacherName === "";
    const isSecretCodeEmpty = formData.secretCode === "";

    return (
      isBloodTypeEmpty && isPetEmpty && isTeacherNameEmpty && isSecretCodeEmpty
    );
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onNext();
    } else {
      setShake(true);
      setErrorMessage(
        "Oops! You filled something in... Now the button is disabled! 😈"
      );
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleFakeReset = () => {
    if (!hasResetClicked) {
      setFormData({
        bloodType: "",
        childhoodPet: "",
        teacherName: "",
        secretCode: "",
      });
      setErrorMessage("");
      setHasResetClicked(true);
    }
  };

  const handleRealReset = () => {
    setFormData({
      bloodType: "",
      childhoodPet: "",
      teacherName: "",
      secretCode: "",
    });
    setErrorMessage("");
    setHasResetClicked(false);
  };

  return (
    <div className={`${styles.container} ${shake ? styles.shake : ""}`}>
      <h2 className={styles.title}>🔮 Mandatory Cosmic Survey 🔮</h2>

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Blood Type (Don&apos;t select anything!)</label>
          <div className={styles.bloodGrid}>
            {bloodTypes.map((type) => (
              <button
                type="button"
                key={type}
                className={`${styles.bloodBtn} ${
                  formData.bloodType === type ? styles.selected : ""
                }`}
                onClick={() => setFormData({ ...formData, bloodType: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={formData.childhoodPet}
            onChange={(e) =>
              setFormData({ ...formData, childhoodPet: e.target.value })
            }
            placeholder="Childhood mythical pet name (Leave blank!)"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={formData.teacherName}
            onChange={(e) =>
              setFormData({ ...formData, teacherName: e.target.value })
            }
            placeholder="First teacher&apos;s middle name (Nope!)"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            value={formData.secretCode}
            onChange={(e) =>
              setFormData({ ...formData, secretCode: e.target.value })
            }
            placeholder="TOP-SECRET CODE (Don&apos;t even try!)"
            className={styles.input}
            maxLength={7}
            style={{ width: "150px", fontSize: "0.8em" }}
          />
        </div>

        <div
          className={styles.buttonGroup}
          onMouseEnter={() => setShowRealNext(true)}
          onMouseLeave={() => setShowRealNext(false)}
        >
          <button
            type="button"
            className={styles.fakeButton}
            onClick={handleFakeReset}
            disabled={hasResetClicked}
          >
            {showRealNext
              ? hasResetClicked
                ? "{button}"
                : "Reset All"
              : "Next"}
          </button>

          {showRealNext && (
            <button
              type="submit"
              className={styles.realButton}
              // disabled={!isFormValid}
            >
              Real Next
            </button>
          )}
        </div>

        <button
          type="button"
          className={styles.hiddenReset}
          onClick={handleRealReset}
        >
          ⚠️ Emergency Reset
        </button>
      </form>
    </div>
  );
}
