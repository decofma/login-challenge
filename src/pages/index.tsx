import { useState } from "react";
import HomePage from "../components/HomePage";
import VerificationStep from "../components/VerificationStep";
import UsernameStep from "../components/UsernameStep";
import EmailStep from "../components/EmailStep";
import PinStep from "../components/PinStep";
import PinConfirmationStep from "../components/PinConfirmationStep";
import BirthdayStep from "../components/BirthdayStep";
import ReviewStep from "../components/ReviewStep";
import { UserData } from "../types";
import TermsStep from "@/components/TermsStep";
import PasswordStep from "@/components/PasswordStep";
import FormStep from "@/components/FormStep";
import FinalStep from "@/components/FinalStep";

export default function Home() {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    birthday: "01/01/1900",
  });

  const steps = [
    <HomePage key={0} onNext={() => setStep(7)} />,
    <VerificationStep key={1} onNext={() => setStep(2)} />,
    <UsernameStep key={2} userData={userData} setUserData={setUserData} onNext={() => setStep(3)}/>,
    <EmailStep key={3} userData={userData} setUserData={setUserData} onNext={() => setStep(4)}/>,
    <PinStep key={4} userData={userData} setUserData={setUserData} onNext={() => setStep(5)}/>,
    <PinConfirmationStep key={5} userData={userData} setUserData={setUserData} onNext={() => setStep(6)}/>,
    <BirthdayStep key={6} userData={userData} setUserData={setUserData} onNext={() => setStep(7)}/>,
    <PasswordStep key={7} onNext={() => setStep(8)} />,
    <FormStep key={8} onNext={() => setStep(9)} />,
    <ReviewStep key={9} userData={userData} onNext={() => setStep(10)} />,
    <TermsStep key={10} onNext={() => setStep(11)} />,
    <FinalStep key={11} />,
  ];
  return <main>{steps[step]}</main>;
}
