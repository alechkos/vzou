import { Popover, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import RoutePaths from "../../../../Routes/RoutePaths";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { logout } from "../../../../store/reducers/auth-reducer";
import { RotatesLogo } from "../../../UI/RotatesLogo";

// handle it later
function NavBarElemetsMobile() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userFirstName = useAppSelector((state) => state.auth.user?.firstName);
  const userRole = useAppSelector((state) => state.auth.user?.role);
  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    dispatch(logout());
  };

  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Popover.Panel
        focus
        className="absolute z-50 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
      >
        {({ close }) => (
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div className="h-16 w-auto">
                  <RotatesLogo />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lime-500">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="space-y-6 py-6 px-32 sm:px-36">
              {!isLoggedIn && (
                <>
                  <Link
                    to={RoutePaths.REGISTER}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600"
                    onClick={() => {
                      close();
                    }}
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing user?{" "}
                    <Link
                      to={RoutePaths.LOGIN}
                      className="text-lime-600 hover:text-lime-500"
                      onClick={() => {
                        close();
                      }}
                    >
                      Sign in
                    </Link>
                  </p>
                </>
              )}
              {isLoggedIn && (
                <>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Welcome, {userFirstName}
                  </p>
                  {userRole === "Lecturer" && (
                    <Link
                      to={RoutePaths.REGISTER_LECTURER}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600"
                      onClick={() => {
                        close();
                      }}
                    >
                      Register Lecturer
                    </Link>
                  )}
                  <div
                    onClick={() => {
                      close();
                      logOutHandler();
                    }}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-lime-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-600"
                  >
                    Log Out
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Popover.Panel>
    </Transition>
  );
}

export default NavBarElemetsMobile;
