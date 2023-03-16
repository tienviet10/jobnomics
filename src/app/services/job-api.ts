import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type { UserJobsType, JobType } from "../../types/jobTypes";

export const jobApi = createApi({
  reducerPath: "jobApi",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: async (headers) => {
      const access_token = await security.getAccessTokenSilently()();
      if (access_token) {
        headers.set("Authorization", `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  // tagTypes: ["UserJobsType", "JobType"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => "job",
      transformResponse: (response: { data: UserJobsType }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      // providesTags: [{ type: "UserJobsType" }],
    }),
    getJobById: builder.query({
      query: (id) => `job/${id}`,
      transformResponse: (response: { data: JobType }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      // providesTags: [{ type: "JobType" }],
    }),
    addJob: builder.mutation({
      query(body) {
        return {
          url: "auto/",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: JobType }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updateJobs: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job",
        method: "PATCH",
        body: patch,
      }),
      transformResponse: (response: { data: JobType }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: ["JobType"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
    }),
    updateJob: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: "job/user-job",
        method: "PATCH",
        body: patch,
      }),
      transformResponse: (response: { data: JobType }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: ["JobType"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useUpdateJobsMutation,
  useUpdateJobMutation,
} = jobApi;
