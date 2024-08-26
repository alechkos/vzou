import { useState } from "react";

import AuthWrapper from "../components/Auth/AuthWrapper";
import CodeVerificationForm from "../components/Auth/CodeVerificationForm";
import EmailFormVarification from "../components/Auth/EmailForVarification";
import PasswordResetForm from "../components/Auth/PasswordResetForm";
import { CodeTypes } from "../types/Auth";
import { forgotPasswordLime500 } from "../utils/logos";


export interface ContentProps {
  onConfirm: () => void;
}

export enum Stage {
  INPUT_EMAIL = 0,
  INPUT_CODE = 1,
  INPUT_NEW_PASSWORD = 2,
}

const titles = [ "Forgot your password?", "Enter the code that was sent to your email", "Enter your new password" ];
function ForgotPasswordPage() {
  /* The Content card state represents the user's stage in changing the password
    0 = input email
    1 = input code
    2 = input new password
   */
  const [ currentStage, setCurrentStage ] = useState(Stage.INPUT_EMAIL);
  const [ currentCode, setCurrentCode ] = useState("");
  const [ currentEmail, setCurrentEmail ] = useState("");
  const getContent = () => {
    if (currentStage === Stage.INPUT_EMAIL) {
      return (
        <EmailFormVarification
          onConfirm={() => {
            setCurrentStage(Stage.INPUT_CODE);
          }}
          setEmail={(email: string) => {
            setCurrentEmail(email);
          }}
        />
      );
    }
    if (currentStage === Stage.INPUT_CODE) {
      return (
        <CodeVerificationForm
          type={CodeTypes.RESET_PW}
          onConfirm={() => {
            setCurrentStage(Stage.INPUT_NEW_PASSWORD);
          }}
          setCode={(code: string) => {
            setCurrentCode(code);
          }}
          email={currentEmail}
        />
      );
    }
    if (currentStage === Stage.INPUT_NEW_PASSWORD) {
      return (
        <PasswordResetForm
          code={currentCode}
          email={currentEmail}
        />
      );
    }
  };

  // const FPstr: string = `font-medium text-${mainColor} hover:text-${mainHoverColor}`;
  return (
    <AuthWrapper
      cardTitle={titles[currentStage]}
      cardContent={getContent()}
      imgContent={
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={forgotPasswordLime500}
            alt="Vzou"
          />
        </div>
      }
    />
  );
}

export default ForgotPasswordPage;
