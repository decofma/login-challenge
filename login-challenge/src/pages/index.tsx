import { useState } from "react";
import HomePage from "../components/HomePage";
import VerificationStep from "../components/VerificationStep";
import UsernameStep from "../components/UsernameStep";
import EmailStep from "../components/EmailStep";
import PasswordStep from "../components/PasswordStep";
import PasswordConfirmationStep from "../components/PasswordConfirmationStep";
import BirthdayStep from "../components/BirthdayStep";
import ReviewStep from "../components/ReviewStep";
import { UserData } from "../types";

export default function Home() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    birthday: "01/01/1900",
  });

  const steps = [
    <HomePage key={0} onNext={() => setStep(1)} />,
    <VerificationStep key={1} onNext={() => setStep(2)} />,
    <UsernameStep
      key={2}
      userData={userData}
      setUserData={setUserData}
      onNext={() => setStep(3)}
    />,
    <EmailStep
      key={3}
      userData={userData}
      setUserData={setUserData}
      onNext={() => setStep(4)}
    />,
    <PasswordStep
      key={4}
      userData={userData}
      setUserData={setUserData}
      onNext={() => setStep(5)}
    />,
    <PasswordConfirmationStep
      key={5}
      userData={userData}
      setUserData={setUserData}
      onNext={() => setStep(6)}
    />,
    <BirthdayStep
      key={6}
      userData={userData}
      setUserData={setUserData}
      onNext={() => setStep(7)}
    />,
    <ReviewStep key={7} userData={userData} onNext={() => setStep(8)} />,
  ];

  return <main>{steps[step]}</main>;
}
