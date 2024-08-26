import { createApi, EndpointBuilder, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from "../config";
import { AddUserInput, GetUserInput } from "../../types/UserInput";

export const userInputReducerApi = createApi({
  reducerPath: "userInput",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      const token = localStorage.getItem("accessToken");
      if (token && endpoint !== "login") {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserInput: builder.query<any, any>({
      query: (payload: GetUserInput) => ({
        url: `/input/get-input/${payload.userID}/${payload.subject}`,
      }),
    }),
    addUserInput: builder.mutation<{ status: "OK" }, AddUserInput>({
      query: (payload) => ({
        url: "/input/add-input",
        method: "POST",
        body: payload,
      }),
    }),
    deleteOneInput: builder.mutation<{ status: "OK" }, AddUserInput>({
      query: (payload) => ({
        url: "/input/delete-one",
        method: "DELETE",
        body: payload,
      }),
    }),
    deleteAllInput: builder.mutation<{ status: "OK" }, AddUserInput>({
      query: (payload) => ({
        url: "/input/delete-all",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUserInputQuery,
  useAddUserInputMutation,
  useDeleteAllInputMutation,
  useDeleteOneInputMutation,
} = userInputReducerApi;
