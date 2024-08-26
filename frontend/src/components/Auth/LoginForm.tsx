import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FormEvent, useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import FormButton from "./FormButton";

import { RoutePaths } from "../../Routes/RoutePaths";
import { useLoginMutation } from "../../store/reducers/auth-reducer-api";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";
import Spinner from "../UI/Spinner";


function LoginForm() {
  const history = useHistory();
  const [ loginUser, { error, isLoading, isSuccess, data }] = useLoginMutation();
  const [ enteredEmail, setEnteredEmail ] = useState("");
  const [ enteredPassword, setEnteredPassword ] = useState("");
  const SubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginUser({ password: enteredPassword, email: enteredEmail });
  };

  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data?.status === "Redirect-2FA") {
      history.push(RoutePaths.TWO_FA);
    }
  }, [ isLoading ]);

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={SubmitLogin}
    >
      <Spinner isLoading={isLoading} />
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
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
            placeholder="Email address"
            ref={firstInputRef}
            value={enteredEmail}
            onChange={(e) => {
              setEnteredEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="sr-only"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
            placeholder="Password"
            value={enteredPassword}
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
          />
        </div>
      </div>

      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[ error.data.message ]} />}

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link
            to={RoutePaths.FORGOT_PASSWORD}
            className="font-medium text-lime-500 hover:text-lime-600"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <FormButton
        type="submit"
        title="Sign in"
        disabled={isLoading}
        icon={
          <LockClosedIcon
            className="h-5 w-5 text-lime-600 group-hover:text-lime-500"
            aria-hidden="true"
          />
        }
      />
    </form>
  );
}

export default LoginForm;
