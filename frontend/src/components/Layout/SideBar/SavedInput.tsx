import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  useDeleteAllInputMutation,
  useDeleteOneInputMutation,
  useGetUserInputQuery,
} from "../../../store/reducers/userInput-reducer-api";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { setSizeForHash } from "../../../store/reducers/alghoritms/hashTable-reducer";

interface Props {
  subject: string;
  setInput: ActionCreatorWithPayload<string> | ActionCreatorWithPayload<string | number[]>;
  setFrom?: ActionCreatorWithPayload<{ input: string; index: number }>;
  setTo?: ActionCreatorWithPayload<{ input: string; index: number }>;
  setWeight?: ActionCreatorWithPayload<{ input: string; index: number }>;
  setCountRow?: ActionCreatorWithPayload<number>;
  setInputData?: ActionCreatorWithPayload<{ source: number; target: number; weight: number }>;
  clearInputArray?: ActionCreatorWithoutPayload;
}

const SavedInput: FC<Props> = ({
  subject,
  setInput,
  setFrom,
  setTo,
  setWeight,
  setCountRow,
  setInputData,
  clearInputArray,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  const [deleteOneUserInput, { error, isLoading, isSuccess }] = useDeleteOneInputMutation();
  const [deleteAllUserInput] = useDeleteAllInputMutation();
  const { data, refetch } = useGetUserInputQuery({ userID: Number(user!.id), subject });
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(true);

  const closeHandler = () => {
    setShow(false);
  };

  const openHandler = () => {
    setShow(true);
  };

  const useHandler = (
    input: string,
    from?: string,
    to?: string,
    weight?: string,
    size?: string
  ) => {
    if (subject === ("HashTable" as string)) {
      dispatch(setInput(input));
      dispatch(setSizeForHash(size!));
    } else if (subject !== "BellmanFord" && subject !== "Prim") dispatch(setInput(input));
    else {
      dispatch(clearInputArray!());
      const fromArr = from!.split(",");
      const toArr = to!.split(",");
      const weightArr = weight!.split(",");
      for (let i = 0; i < fromArr.length; ++i) {
        dispatch(setFrom!({ input: fromArr[i], index: i }));
        dispatch(setTo!({ input: toArr[i], index: i }));
        dispatch(setWeight!({ input: weightArr[i], index: i }));
        dispatch(setCountRow!(1));
        dispatch(
          setInputData!({
            source: Number(fromArr[i]),
            target: Number(toArr[i]),
            weight: Number(weightArr[i]),
          })
        );
      }
    }
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

  const deleteAllHandler = async () => {
    const dataForDelete = {
      userID: Number(user!.id),
      subject,
      input: "",
    };

    await deleteAllUserInput(dataForDelete);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="absolute flex flex-col border border-gray-200 shadow-2xl rounded-xl text-xl top-96 right-20 p-4 mt-20">
      {show && (
        <>
          <span
            className={"self-end mr-2 cursor-pointer hover:text-green-400"}
            onClick={closeHandler}
          >
            X
          </span>
          <span className={"font-medium m-4"}>My input history for {subject}</span>
          {data && data.length > 0 && (
            <>
              <div className="w-full max-w-3xl mt-4 overflow-auto max-h-48">
                <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        №
                      </th>
                      {subject !== "BellmanFord" && subject !== ("Prim" as string) && (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Input
                        </th>
                      )}
                      {(subject === "BellmanFord" || subject === ("Prim" as string)) && (
                        <>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            From
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            To
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Weight
                          </th>
                        </>
                      )}

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

                          {subject !== "BellmanFord" && subject !== ("Prim" as string) && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {input.input}
                            </td>
                          )}

                          {(subject === "BellmanFord" || subject === ("Prim" as string)) && (
                            <>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {input.from.toString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {input.to.toString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {input.weight.toString()}
                              </td>
                            </>
                          )}

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
                            onClick={() =>
                              useHandler(
                                input.input,
                                input.from.toString(),
                                input.to.toString(),
                                input.weight.toString(),
                                input.size.toString()
                              )
                            }
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

              <button
                className={`bg-white hover:bg-lime-100 text-lime-800 text-sm font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed mt-2`}
                onClick={deleteAllHandler}
              >
                Clear
              </button>
            </>
          )}
          {data && data.length < 1 && <span className={"font-medium m-4"}>No history yet.</span>}
        </>
      )}
      {!show && (
        <span
          className={"hover:text-green-400 hover:cursor-pointer"}
          onClick={openHandler}
        >
          Show My history for {subject}
        </span>
      )}
    </div>
  );
};

export default SavedInput;
