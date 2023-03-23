import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type {
  UserJobsType,
  JobType,
  ResponseData,
  UserRequest,
  InactiveJobsType,
  CategoryType,
  AllActiveJobsDataType,
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
      // Pess:
      // FE display info -> User update the info, FE send request to BE -> FE invalidate cache to get the new update -> FE displays to user

      // Optimistic Update:
      //  FE display info -> User update the info, display the new INFO to user through MANIPULATING CURRENT CACHE -> FE send request to BE -> FE Get the response -> RTK will compare between these 2 cache to see if they are the same, override with the new response if they are different
      providesTags: ["allJobs"],
      transformResponse: (
        response: { data: AllActiveJobsDataType; },
        meta,
        arg
      ) => response,
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
      transformResponse: (response: JobType, meta, arg) => response,
      // transformErrorResponse: (
      //   response: { status: string | number; },
      //   meta,
      //   arg
      // ) => response.status,
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
      // invalidatesTags: ["allJobs", "aJob"],
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
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        // const patchResult = dispatch(
        //   jobApi.util.updateQueryData('getAllJobs', id, (draft) => {
        //     Object.assign(draft, patch)
        //   })
        // )
        // console.log(patch.newState);

        const patchResult = dispatch(
          jobApi.util.updateQueryData(
            "getAllJobs",
            undefined,
            (allJobsDraft) => {
              allJobsDraft = patch.newState;
              return allJobsDraft;
            }
          )
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
      //TODO: Favorite needs allJobs to refresh to make it live -> maybe can get rid of it somehow
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
    getInterviewDate: builder.query({
      query: ({ jobId }) => ({
        url: `job/interviewDate/${jobId}`,
      }),
      transformResponse: (response: JobType, meta, arg) => response,
    }),
    getAllInterviewDates: builder.query<any, void>({
      query: () => ({
        url: `job/interviewDates`,
      }),
      transformResponse: (response: JobType, meta, arg) => response,
    }),
  }),
});

export const {
  useFilterJobsQuery,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetInterviewDateQuery,
  useGetAllInterviewDatesQuery,
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
