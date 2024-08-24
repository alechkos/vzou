import { Switch } from "@headlessui/react";
import { ClipboardDocumentListIcon, UserIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import AuthCard from "../components/Auth/AuthCard";
import FormButton from "../components/Auth/FormButton";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import RadioButton from "../components/UI/RadioButton";
import RoutePaths from "../Routes/RoutePaths";
import { useAppSelector } from "../store/hooks";
import { useEditProfileMutation } from "../store/reducers/auth-reducer-api";
import { mainColor, mainHoverColor } from "../styles/tColors";


const GENDER = [ "Male", "Female" ];
export interface EditUser {
  firstName: string;
  lastName: string;
  birthYear?: number;
  gender?: "Male" | "Female";
  isEnabled2FA: boolean;
}
function EditProfilePage() {
  const [ editProfile ] = useEditProfileMutation();
  const user = useAppSelector((state) => state.auth.user!);
  const history = useHistory();
  const [ editUser, setEditUser ] = useState<EditUser>({
    firstName: user.firstName,
    lastName: user.lastName,
    birthYear: user.birthYear,
    gender: user.gender,
    isEnabled2FA: user.is2FA,
  });
  const [ genderIndex, setGenderIndex ] = useState(GENDER.indexOf(user.gender || "Male"));
  let lastNameClass = `col-span-2 relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`;
  if (user.role === "Lecturer") lastNameClass += " rounded-b-md";
  const onChangeHandler = (event: any) => {
    setEditUser((prevstate) => ({ ...prevstate, [event.target.name]: event.target.value }));
  };

  const onChangeGender = (index: number) => {
    setEditUser((prevstate) => ({ ...prevstate, gender: GENDER[index] as "Male" | "Female" }));
    setGenderIndex(index);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await editProfile(editUser)
      .unwrap()
      .catch((e) => {
        console.log(e);
      });
    history.push(RoutePaths.PROFILE);
  };

  return (
    <FloatUpContainer>
      <AuthCard title="Edit Profile">
        <form
          className="mt-8 space-y-6"
          onSubmit={onSubmitHandler}
        >
          <div className="p-3 -space-y-px rounded-md shadow-sm grid grid-cols-3">
            {/* first name */}
            <label htmlFor="First-Name">First Name:</label>
            <input
              id="First-Name"
              name="firstName"
              type="text"
              autoComplete="first-name"
              required
              className={`col-span-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
              value={editUser.firstName}
              onChange={onChangeHandler}
            />

            {/* last name */}
            <label htmlFor="Last-Name">Last Name:</label>
            <input
              id="Last-Name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className={lastNameClass}
              value={editUser.lastName}
              onChange={onChangeHandler}
            />

            {user.role !== "Lecturer" && (
              <>
                <label htmlFor="birthYear">Birth Year:</label>
                <input
                  id="birthYear"
                  name="birthYear"
                  type="number"
                  max={new Date().getFullYear() - 16}
                  min={new Date().getFullYear() - 120}
                  required
                  className={`col-span-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-${mainColor} focus:outline-none focus:ring-${mainColor} sm:text-sm`}
                  value={editUser.birthYear?.toString()}
                  onChange={onChangeHandler}
                />
                <label
                  htmlFor=""
                  className="py-4"
                >
                  Gender:
                </label>
                <div className="py-2 col-span-2">
                  <RadioButton
                    value={genderIndex}
                    labelText=""
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
                </div>
                <label htmlFor="2-factor-auth">2FA:</label>
                <Switch
                  checked={!!editUser.isEnabled2FA}
                  onChange={(checked: boolean) => {
                    setEditUser((prevstate) => ({ ...prevstate, isEnabled2FA: checked }));
                  }}
                  className={`${
                    editUser.isEnabled2FA ? "bg-lime-500" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      editUser.isEnabled2FA ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </>
            )}
          </div>
          <FormButton
            type="submit"
            title="Submit"
            icon={
              <ClipboardDocumentListIcon
                className={`h-5 w-5 text-${mainHoverColor} group-hover:text-${mainColor}`}
                aria-hidden="true"
              />
            }
          />
        </form>
      </AuthCard>
    </FloatUpContainer>
  );
}

export default EditProfilePage;
