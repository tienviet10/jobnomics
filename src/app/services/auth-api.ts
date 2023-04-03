import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type {
  UserInfoType,
} from "../../types/jobTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      if (security.getAccessTokenSilently()) {
        const access_token = await security.getAccessTokenSilently()();
        if (access_token) {
          headers.set("Authorization", `Bearer ${access_token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["auth", "user"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfoType, void>({
      query: () => "auth/user",
      providesTags: ["user"],
      transformResponse: (response: UserInfoType, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    saveUser: builder.query<{ message: string; }, void>({
      query: () => "auth",
      providesTags: ["auth"],
      transformResponse: (response: { message: string; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    emailVerification: builder.mutation({
      query: () => ({
        url: "auth/email-verification",
        method: "PATCH",
        body: {},
      }),
      transformResponse: (response: { message: string; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["user"],
    }),
    unsubscribeUser: builder.mutation({
      query: () => {
        return {
          url: "auth/unsubscribe",
          method: "PATCH",
          body: {},
        };
      },
      transformResponse: (response: any, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useSaveUserQuery,
  useGetUserInfoQuery,
  useEmailVerificationMutation,
  useUnsubscribeUserMutation,
} = authApi;
