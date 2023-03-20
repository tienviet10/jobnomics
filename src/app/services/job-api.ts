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
      transformResponse: (response: { data: UserJobsType; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    getJobById: builder.query({
      query: ({ jobId, categoryId }) => ({
        url: `job/${jobId}/${categoryId}`,
      }),
      transformResponse: (response: { data: JobType; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
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
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["allJobs"],
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
    addInterviewQuestions: builder.mutation<any, any>({
      query(body) {
        return {
          url: "job/interview-questions",
          method: "POST",
          body,
        };
      },
    }),
    updateJobs: builder.mutation({
      query: ({ ...patch }) => {
        patch["newState"] = {};
        return {
          url: "job",
          method: "PATCH",
          body: patch,
        };
      },
      // invalidatesTags: ["allJobs"],
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // const patchResult = dispatch(
        //   jobApi.util.updateQueryData('getAllJobs', id, (draft) => {
        //     Object.assign(draft, patch)
        //   })
        // )
        // console.log(patch.newState);

        const patchResult = dispatch(
          jobApi.util.updateQueryData('getAllJobs', undefined, (draft) => {
            draft = patch.newState;
            return draft;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
    }),
    updateJob: builder.mutation({
      query: ({ id, ...patch }) => {
        return {
          url: "job/user-job",
          method: "PATCH",
          body: patch,
        };
      },
      transformResponse: (response: { data: JobType; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["allJobs", "filterJob"],
    }),
    updateChecklist: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job/checklist",
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
      invalidatesTags: ["aJob"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) { },
    }),
    updateNote: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job/note",
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
      invalidatesTags: ["aJob"],
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
      transformResponse: (response: { message: string; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
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
  useAddInterviewQuestionsMutation,
  useUpdateJobsMutation,
  useUpdateJobMutation,
  useFilterJobMutation,
  useUpdateChecklistMutation,
  useUpdateNoteMutation,
  useRejectedReasonMutation,
} = jobApi;
