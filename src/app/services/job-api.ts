import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type {
  JobType,
  UserRequest,
  AllInterviewDatesResponse,
  AllJobsDataType,
  Job,
  AddANewJobResponse,
  AddANewJobType,
  NotesType,
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
  tagTypes: ["aJob", "allJobs", "filterJob", "allNotes", "auth"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<AllJobsDataType, void>({
      query: () => "job",
      providesTags: ["allJobs"],
      transformResponse: (response: AllJobsDataType, meta, arg) => response,
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
      providesTags: ["aJob"],
    }),
    getAllNotes: builder.query({
      query: ({ column, order }) => ({ url: `job/notes/${column}/${order}` }),
      providesTags: ["allNotes"],
      transformResponse: (response: NotesType[], meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    addJob: builder.mutation<AddANewJobResponse, AddANewJobType>({
      query(body) {
        return {
          url: "auto/",
          method: "POST",
          body,
        };
      },
      transformResponse: (response: AddANewJobResponse, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["allJobs"],
    }),
    addChecklists: builder.mutation<{ message: string; }, { jobId: number; }>({
      query(body) {
        return {
          url: "job/",
          method: "POST",
          body,
        };
      },
    }),
    addInterviewQuestions: builder.mutation<
      { message: string; },
      { jobId: number; }
    >({
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
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          jobApi.util.updateQueryData(
            "getAllJobs",
            undefined,
            (allJobsDraft: AllJobsDataType) => {
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
      invalidatesTags: ["allNotes"],
    }),
    filterJobs: builder.query<Job[], UserRequest>({
      query: (params) => ({
        url: "job/filter",
        params,
      }),
      transformResponse: (response: Job[], meta, arg) => response,
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
      transformResponse: (
        response: { interviewDate?: string; error?: string; },
        meta,
        arg
      ) => response,
    }),
    getAllInterviewDates: builder.query<AllInterviewDatesResponse[], void>({
      query: () => ({
        url: `job/interviewDates`,
      }),
      transformResponse: (response: AllInterviewDatesResponse[], meta, arg) =>
        response,
    }),
    saveUser: builder.query<any, void>({
      query: () => "auth",
      providesTags: ["auth"],
      transformResponse: (response: AllJobsDataType, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
  }),
});

export const {
  useSaveUserQuery,
  useFilterJobsQuery,
  useGetAllJobsQuery,
  useGetJobByIdQuery,
  useGetInterviewDateQuery,
  useGetAllInterviewDatesQuery,
  useGetAllNotesQuery,
  useAddJobMutation,
  useAddChecklistsMutation,
  useAddInterviewQuestionsMutation,
  useUpdateJobsMutation,
  useUpdateJobMutation,
  // useFilterJobMutation,
  useUpdateChecklistMutation,
  useUpdateNoteMutation,
  useRejectedReasonMutation,
} = jobApi;
