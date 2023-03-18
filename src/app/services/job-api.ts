import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type { UserJobsType, JobType, ResponseData } from "../../types/jobTypes";

type UserRequest = {
  userId: number;
  category: string[];
  skills: string[];
};

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
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => "job",
      transformResponse: (response: { data: UserJobsType; }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    getJobById: builder.query({
      query: ({ userId, jobId, categoryId }) => ({
        url: `job/${jobId}/${categoryId}`,
      }),
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      // providesTags: [{ type: "JobType" }],
    }),
    addJob: builder.mutation<any, any>({
      query(body) {
        return {
          url: "auto/",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
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
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: ["JobType"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) { },
    }),
    updateJob: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: "job/user-job",
        method: "PATCH",
        body: patch,
      }),
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: ["JobType"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) { },
    }),
    filterJob: builder.mutation<any, UserRequest>({
      query(body) {
        return {
          url: "job/filter/",
          method: "PUT",
          body,
        };
      },
      transformResponse: (response: { data: ResponseData; }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useUpdateJobsMutation,
  useUpdateJobMutation,
  useFilterJobMutation,
} = jobApi;
