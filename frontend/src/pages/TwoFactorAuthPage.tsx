import AuthWrapper from "../components/Auth/AuthWrapper";
import CodeVerificationForm from "../components/Auth/CodeVerificationForm";
import { CodeTypes } from "../types/Auth";
import { Login2FALime500 } from "../utils/logos";


function TwoFactorAuthPage() {
  /* The Content card state represents the user's stage in changing the password
    0 = input email
    1 = input code
    2 = input new password
   */

  return (
    <AuthWrapper
      cardTitle="Enter the code that was sent to your email"
      cardContent={<CodeVerificationForm type={CodeTypes.TWO_FA} />}
      imgContent={
        <div className="flex items-center justify-center px-2 sm:px-4 lg:px-8 ">
          <img
            className="h-64"
            src={Login2FALime500}
            alt="Vzou"
          />
        </div>
      }
    />
  );
}

export default TwoFactorAuthPage;
