import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  useDeleteOneInputMutation,
  useGetUserInputQuery,
} from "../../../store/reducers/userInput-reducer-api";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
  subject: string;
  setInput: ActionCreatorWithPayload<string> | ActionCreatorWithPayload<string | number[]>;
}

const SavedInput: FC<Props> = ({ subject, setInput }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [deleteOneUserInput, { error, isLoading, isSuccess }] = useDeleteOneInputMutation();
  const { data, refetch } = useGetUserInputQuery({ userID: Number(user!.id), subject });
  const dispatch = useAppDispatch();

  const useHandler = (input: string) => {
    dispatch(setInput(input));
  };

  const deleteHandler = async (input: string) => {
    const dataForDelete = {
      userID: Number(user!.id),
      subject,
      input,
    };

    await deleteOneUserInput(dataForDelete);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="absolute border border-gray-200 shadow-2xl rounded-xl text-xl top-96 right-20 p-4 mt-20">
      <span className={"font-medium m-4"}>My last input for {subject}</span>
      <div className="w-full max-w-3xl mt-4 overflow-auto max-h-48">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                №
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Input
              </th>
              {subject === "HashTable" && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data &&
              data.map((input: any, index: number) => (
                <tr className={"hover:bg-green-400 cursor-pointer"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {input.input}
                  </td>
                  {subject === "HashTable" && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {input.size}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {input.actionDate}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:bg-gray-100 z-10"
                    onClick={() => useHandler(input.input)}
                  >
                    Use
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hover:bg-gray-100 z-10"
                    onClick={() => deleteHandler(input.input)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SavedInput;
