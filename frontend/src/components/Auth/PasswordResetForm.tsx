import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { FC, FormEvent, useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import { CheckConfirmPassword, CheckPassword } from "./AuthFunctions";
import FormButton from "./FormButton";

import RoutePaths from "../../Routes/RoutePaths";
import { useResetPasswordMutation } from "../../store/reducers/auth-reducer-api";
import { CodeTypes } from "../../types/Auth";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";


interface PasswordResetFormProps {
  code: string;
  email: string;
}

const PasswordResetForm: FC<PasswordResetFormProps> = ({ code, email }) => {
  const [ errorMsgs, setErrorMsgs ] = useState<string[]>([]);
  const [ password1, setPassword1 ] = useState("");
  const [ password2, setPassword2 ] = useState("");
  const [ resetPassword, { error }] = useResetPasswordMutation();
  const history = useHistory();
  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorStack = [];

    if (!CheckPassword(password1)) {
      errorStack.push("Invalid password, must contain:[a-z],[A-Z],[0-9] and special character");
    } else if (!CheckConfirmPassword(password1, password2)) {
      errorStack.push("The passwords must match");
    }

    setErrorMsgs(errorStack);
    if (errorStack.length !== 0) {
      return;
    }
    await resetPassword({
      email,
      code,
      type: CodeTypes.RESET_PW,
      password: password1,
    })
      .unwrap()
      .then(() => {
        history.push(RoutePaths.LOGIN);
      })
      .catch((rejected) => {
        console.error(rejected);
      });
  };

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={changePassword}
    >
      <input
        type="hidden"
        name="remember"
        defaultValue="true"
      />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <input
            id="password1"
            name="password1"
            type="password"
            required
            ref={firstInputRef}
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
            placeholder="Password"
            value={password1}
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
          />
          <input
            id="password2"
            name="password2"
            type="password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          />
        </div>
      </div>

      {errorMsgs.length !== 0 && <ErrorMsg errorMessages={errorMsgs} />}
      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[ error.data.message ]} />}
      <FormButton
        type="submit"
        title="Change Password"
        icon={
          <ClipboardDocumentListIcon
            className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default PasswordResetForm;
