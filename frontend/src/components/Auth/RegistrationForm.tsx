import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { Alert } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";

import { CheckConfirmPassword, CheckEmail, CheckName, CheckPassword } from "./AuthFunctions";
import FormButton from "./FormButton";

import { useRegisterMutation } from "../../store/reducers/auth-reducer-api";
import { mainColor, mainHoverColor } from "../../styles/tColors";
import { RegisterPayload } from "../../types/Auth";
import { isErrorWithDataAndMessage } from "../../utils/helper-functions";
import ErrorMsg from "../UI/ErrorMsg";
import RadioButton from "../UI/RadioButton";
import Spinner from "../UI/Spinner";

import { useHistory } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  birthYear: 1970,
  email: "",
  password: "",
  confirmPassword: "",
  gender: "Male" as "Male" | "Female",
};
const GENDER = ["Male", "Female"];

function RegistrationForm() {
  const [registerUser, { error, isLoading, isSuccess }] = useRegisterMutation();
  const [dataEntered, setDataEntered] = useState<RegisterPayload>(initialState);
  const [errorMsgs, setErrorMsg] = useState<string[]>([]);

  const history = useHistory();
  const onChangeGender = (index: number) => {
    setDataEntered((prevstate) => ({ ...prevstate, gender: GENDER[index] as "Male" | "Female" }));
  };
  const onChangeHandler = (event: any) => {
    setDataEntered((prevstate) => ({ ...prevstate, [event.target.name]: event.target.value }));
  };

  const checkData = () => {
    const errorStack = [];

    // check passwords
    if (!CheckPassword(dataEntered.password)) {
      errorStack.push(
        "Invalid password, must contain at least 8 characters: [a-z], [A-Z], [0-9] and a special character"
      );
    } else if (!CheckConfirmPassword(dataEntered.password, dataEntered.confirmPassword!)) {
      errorStack.push("The passwords must match");
    }

    // check names
    if (!CheckName(dataEntered.firstName) || !CheckName(dataEntered.lastName)) {
      errorStack.push("Invalid name, must contain: [a-z], [A-Z]");
    }

    // check email
    if (!CheckEmail(dataEntered.email)) {
      errorStack.push("Invalid email");
    }

    return errorStack;
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check entered data
    const errors = checkData();
    setErrorMsg(errors);
    if (errors.length) {
      return;
    }
    await registerUser(dataEntered);
  };

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        history.push("/");
      }
    }, 5000);
  }, [isSuccess]);

  return (
    <form
      className="mt-8 space-y-6"
      onSubmit={onSubmitHandler}
    >
      {isSuccess && (
        <Alert
          severity="success"
          color="success"
        >
          User created successfully! Please check your email to confirm your account.
        </Alert>
      )}
      <Spinner isLoading={isLoading} />
      <input
        type="hidden"
        name="remember"
        defaultValue="true"
      />
      <div className="-space-y-px rounded-md shadow-sm">
        {/* first name */}
        <div>
          <label
            htmlFor="First-Name"
            className="sr-only"
          >
            First Name
          </label>
          <input
            onChange={onChangeHandler}
            id="First-Name"
            name="firstName"
            type="text"
            autoComplete="first-name"
            required
            className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="First name"
          />
        </div>

        {/* last name */}
        <div>
          <label
            htmlFor="Last-Name"
            className="sr-only"
          >
            Last Name
          </label>
          <input
            onChange={onChangeHandler}
            id="Last-Name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Last name"
          />
        </div>

        {/* Birth Year */}
        <div>
          <label
            htmlFor="birthYear"
            className="sr-only"
          >
            Birth Year
          </label>
          <input
            onChange={onChangeHandler}
            id="birthYear"
            name="birthYear"
            type="number"
            max={new Date().getFullYear() - 16}
            min={new Date().getFullYear() - 90}
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Birth year"
          />
        </div>

        {/* email */}
        <div>
          <label
            htmlFor="email-address"
            className="sr-only"
          >
            Email address
          </label>
          <input
            onChange={onChangeHandler}
            id="email-address"
            name="email"
            type="text"
            autoComplete="email"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Email address"
          />
        </div>

        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="sr-only"
          >
            Password
          </label>
          <input
            onChange={onChangeHandler}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={`relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="sr-only"
          >
            Confirm password
          </label>
          <input
            onChange={onChangeHandler}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <RadioButton
        labelText="Gender"
        onChange={onChangeGender}
        options={[
          <div
            key={GENDER[0]}
            className="flex flex-1 justify-around"
          >
            <span>{GENDER[0]}</span>
            <UserIcon className="w-4" />
          </div>,
          <div
            key={GENDER[1]}
            className="flex  flex-1 justify-around"
          >
            <span>{GENDER[1]}</span>
            <UserIcon className="w-4" />
          </div>,
        ]}
      />

      {errorMsgs.length !== 0 && <ErrorMsg errorMessages={errorMsgs} />}
      {isErrorWithDataAndMessage(error) && <ErrorMsg errorMessages={[error.data.message]} />}

      <FormButton
        type="submit"
        title="Sign up"
        disabled={isLoading}
        icon={
          <ClipboardDocumentListIcon
            className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
            aria-hidden="true"
          />
        }
      />
    </form>
  );
}

export default RegistrationForm;
