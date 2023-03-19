import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type {
  UserJobsType,
  JobType,
  ResponseData,
  UserRequest,
} from "../../types/jobTypes";

export const jobApi = createApi({
  reducerPath: "jobApi",
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
  tagTypes: ["aJob", "allJobs", "filterJob"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<any, void>({
      query: () => "job",
      providesTags: ["allJobs"],
      transformResponse: (response: { data: UserJobsType }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
    getJobById: builder.query({
      query: ({ jobId, categoryId }) => ({
        url: `job/${jobId}/${categoryId}`,
      }),
      transformResponse: (response: { data: JobType }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
      providesTags: ["aJob"],
    }),
    addJob: builder.mutation<any, any>({
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
    addChecklists: builder.mutation<any, any>({
      query(body) {
        return {
          url: "job/",
          method: "POST",
          body,
        };
      },
    }),
    updateJobs: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job",
        method: "PATCH",
        body: patch,
      }),
      // invalidatesTags: ["allJobs"],
      transformResponse: (response: { data: JobType }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
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
      invalidatesTags: ["aJob", "allJobs", "filterJob"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
    }),
    updateChecklist: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job/checklist",
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
      invalidatesTags: ["aJob"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
    }),
    updateNote: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job/note",
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
      invalidatesTags: ["aJob"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
    }),
    filterJob: builder.mutation<any, UserRequest>({
      query(body) {
        return {
          url: "job/filter/",
          method: "PUT",
          body,
        };
      },
      transformResponse: (response: { data: ResponseData }, meta, arg) =>
        response,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
    filterJobs: builder.query<any, any>({
      query: (params) => ({
        url: "job/filter",
        params,
      }),
      providesTags: ["filterJob"],
    }),
    rejectedReason: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: "job/rejected-reason",
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["aJob"],
      transformResponse: (response: { message: string }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg
      ) => response.status,
    }),
  }),
});

export const {
  useFilterJobsQuery,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useAddJobMutation,
  useAddChecklistsMutation,
  useUpdateJobsMutation,
  useUpdateJobMutation,
  useFilterJobMutation,
  useUpdateChecklistMutation,
  useUpdateNoteMutation,
  useRejectedReasonMutation,
} = jobApi;
