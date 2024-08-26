import { ArrowPathIcon } from "@heroicons/react/20/solid";
import {FC, FormEvent, useState, useRef, useEffect} from "react";

import FormButton from "./FormButton";

import { useAppSelector } from "../../store/hooks";
import { useVerify2faMutation } from "../../store/reducers/auth-reducer-api";
import { CodeTypes } from "../../types/Auth";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";

/** Page used to verify 2FA codes.
 *
 */
interface CodeVerificationFormProps {
  type: CodeTypes;
  onConfirm?: () => void;
  setCode?: (code: string) => void;
  email?: string;
}

const CodeVerificationForm: FC<CodeVerificationFormProps> = ({
  type,
  onConfirm,
  setCode,
  email,
}) => {
  const [ verifyCode, { error }] = useVerify2faMutation(); // RTKQuery
  const [ enteredCode, setEnteredCode ] = useState("");
  const userEmail = useAppSelector((state) => state.auth.emailFor2Factor);
  const SubmitCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailForSend = userEmail || email!;
    await verifyCode({ email: emailForSend, code: enteredCode, type })
      .unwrap()
      .then(() => {
        if (onConfirm) {
          onConfirm();
        }
        if (setCode) {
          setCode(enteredCode);
        }
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
      onSubmit={SubmitCode}
    >
      <input
        type="hidden"
        name="remember"
        defaultValue="true"
      />
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label
            htmlFor="email-address"
            className="sr-only"
          >
            Email address
          </label>
          <input
            id="code"
            name="code"
            type="text"
            autoComplete="email"
            required
            ref={firstInputRef}
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
            placeholder="Enter code"
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
            }}
          />
        </div>
      </div>

      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[ error.data.message ]} />}
      <FormButton
        type="submit"
        title="Submit code"
        icon={
          <ArrowPathIcon
            className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
            aria-hidden="true"
          />
        }
      />
    </form>
  );
};

export default CodeVerificationForm;
