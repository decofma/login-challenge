// components/PasswordStep.tsx
import { useState, useEffect } from "react";
import styles from "../styles/PasswordStep.module.css";

const requirements = [
  {
    text: "👉 At least 3 characters",
    validate: (pwd: string) => pwd.length >= 3,
    emoji: "🔢",
  },
  {
    text: "👉 Now add a NUMBER",
    validate: (pwd: string) => /\d/.test(pwd),
    emoji: "🔣",
    unlockText: "Surprise! Now you need...",
  },
  {
    text: "👉 An UPPERCASE letter (shout your password)",
    validate: (pwd: string) => /[A-Z]/.test(pwd),
    emoji: "📢",
  },
  {
    text: "👉 Special symbol (!@#$%^&*)",
    validate: (pwd: string) => /[!@#$%^&*]/.test(pwd),
    emoji: "✨",
    unlockText: "Oops, forgot to mention...",
  },
  {
    text: "👉 Now remove the number you added",
    validate: (pwd: string) => !/\d/.test(pwd),
    emoji: "🔙",
  },
  {
    text: "👉 Include an emoji 🎲",
    validate: (pwd: string) => /\p{Emoji}/u.test(pwd),
    emoji: "🤡",
  },
  {
    text: "👉 Can't be 'password' (have you tried that one?)",
    validate: (pwd: string) => !pwd.toLowerCase().includes("password"),
    emoji: "🚫",
  },
  {
    text: "👉 Must have at least one lowercase letter",
    validate: (pwd: string) => /[a-z]/.test(pwd),
    emoji: "🔤",
  },
  {
    text: "👉 At least 8 characters total",
    validate: (pwd: string) => pwd.length >= 8,
    emoji: "📏",
  },
  {
    text: "👉 Can't contain spaces",
    validate: (pwd: string) => !/\s/.test(pwd),
    emoji: "🚫",
  },
  {
    text: "👉 Must contain the '@' symbol",
    validate: (pwd: string) => /@/.test(pwd),
    emoji: "✉️",
  },
  {
    text: "👉 Can't contain the sequence '123'",
    validate: (pwd: string) => !pwd.includes("123"),
    emoji: "🔢",
  },
  {
    text: "👉 Include the '#' character somewhere",
    validate: (pwd: string) => /#/.test(pwd),
    emoji: "💠",
  },
  {
    text: "👉 Must end with an exclamation mark '!'",
    validate: (pwd: string) => /!$/.test(pwd),
    emoji: "❗",
  },
  {
    text: "👉 Can't repeat the same character 4 times in a row",
    validate: (pwd: string) => !/(.)\1\1\1/.test(pwd),
    emoji: "🚫",
  },
];

export default function PasswordStep({ onNext }: { onNext: () => void }) {
  const [password, setPassword] = useState("");
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(requirements.length).fill(false)
  );
  const [shake, setShake] = useState(false);

  const currentStep = completedSteps.findIndex((c) => !c);
  const finished = currentStep === -1;

  const progress = Math.round(
    (completedSteps.filter(Boolean).length / requirements.length) * 100
  );

  useEffect(() => {
    if (finished) return;
    if (requirements[currentStep].validate(password)) {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) => {
          const newSteps = [...prev];
          newSteps[currentStep] = true;
          return newSteps;
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [password, currentStep, finished]);

  const handleSubmit = () => {
    if (finished) {
      onNext();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert("Nice try! The rules changed while you weren't looking 😈");
    }
  };

  const highestCompleted = completedSteps.lastIndexOf(true);
  const nextStepIndex = Math.min(highestCompleted + 1, requirements.length - 1);
  const visibleSteps = [...Array(nextStepIndex + 1).keys()].reverse();

  const emojiList = [
    "🤏",
    "🙃",
    "😅",
    "😬",
    "🤯",
    "💀",
    "🏆",
    "🔤",
    "📏",
    "🚫",
    "✉️",
    "🔢",
    "💠",
    "❗",
    "🚫",
  ];
  const currentEmoji = finished ? "🏆" : emojiList[currentStep];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Password Creation Hell 🔐</h2>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${progress}%`,
            transition: "width 0.5s ease",
          }}
        >
          <span className={styles.progressText}>{currentEmoji}</span>
        </div>
      </div>

      <div className={`${styles.inputContainer} ${shake ? styles.shake : ""}`}>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.passwordInput}
          placeholder="Try to enter a password..."
        />
        <div className={styles.requirementCounter}>
          {finished ? requirements.length : currentStep + 1}/
          {requirements.length}
        </div>
      </div>

      <div className={styles.requirementsList}>
        {visibleSteps.map((step) => (
          <div
            key={step}
            className={`${styles.requirement} ${
              completedSteps[step] ? styles.completed : ""
            }`}
          >
            <span className={styles.emoji}>{emojiList[step]}</span>
            {requirements[step].text}
            {step === currentStep &&
              !requirements[step].validate(password) &&
              requirements[step].unlockText && (
                <span className={styles.unlockText}>
                  {requirements[step].unlockText}
                </span>
              )}
          </div>
        ))}
      </div>

      <button
        className={styles.primaryButton}
        onClick={handleSubmit}
        disabled={!finished}
      >
        {finished ? "Submit (Good Luck)" : "Keep Going..."}
      </button>
    </div>
  );
}
