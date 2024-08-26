import { useState } from "react";

import AuthWrapper from "../components/Auth/AuthWrapper";
import CodeVerificationForm from "../components/Auth/CodeVerificationForm";
import EmailVerForPassordChange from "../components/Auth/EmailVerForPassordChange";
import PasswordResetForm from "../components/Auth/PasswordResetForm";
import { useAppSelector } from "../store/hooks";
import { CodeTypes } from "../types/Auth";
import { forgotPasswordLime500 } from "../utils/logos";


export interface ContentProps {
  onConfirm: () => void;
}

export enum Stage {
  SEND_CODE = 0,
  INPUT_CODE = 1,
  INPUT_NEW_PASSWORD = 2,
}

const titles = [ "The code will be sent to your email", "Enter the code that was sent to your email", "Enter your new password" ];
function ForgotPasswordPage() {
  /* The Content card state represents the user's stage in changing the password
    0 = confirm email send
    1 = input code
    2 = input new password
   */
  const [ currentStage, setCurrentStage ] = useState(Stage.SEND_CODE);
  const [ currentCode, setCurrentCode ] = useState("");
  const email = useAppSelector((state) => state.auth.user!.email);
  const getContent = () => {
    if (currentStage === Stage.SEND_CODE) {
      return (
        <EmailVerForPassordChange
          onConfirm={() => {
            setCurrentStage(Stage.INPUT_CODE);
          }}
          email={email}
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
          email={email}
        />
      );
    }
    if (currentStage === Stage.INPUT_NEW_PASSWORD) {
      return (
        <PasswordResetForm
          code={currentCode}
          email={email}
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
