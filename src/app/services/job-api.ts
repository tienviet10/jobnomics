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
  tagTypes: ["aJob", "allJobs", "filterJob", "allNotes"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<AllJobsDataType, void>({
      query: () => "job",
      // Pess:
      // FE display info -> User update the info, FE send request to BE -> FE invalidate cache to get the new update -> FE displays to user

      // Optimistic Update:
      //  FE display info -> User update the info, display the new INFO to user through MANIPULATING CURRENT CACHE -> FE send request to BE -> FE Get the response -> RTK will compare between these 2 cache to see if they are the same, override with the new response if they are different
      providesTags: ["allJobs"],
      transformResponse: (response: AllJobsDataType, meta, arg) =>
        response,
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
    addInterviewQuestions: builder.mutation<{ message: string; }, { jobId: number; }>({
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
      invalidatesTags: ["aJob", "allNotes"],
    }),
    // filterJob: builder.mutation<any, UserRequest>({
    //   query(body) {
    //     return {
    //       url: "job/filter/",
    //       method: "PUT",
    //       body,
    //     };
    //   },
    //   transformResponse: (response: { data: ResponseData; }, meta, arg) =>
    //     response,
    //   transformErrorResponse: (
    //     response: { status: string | number; },
    //     meta,
    //     arg
    //   ) => response.status,
    // }),
    filterJobs: builder.query<Job[], UserRequest>({
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
      transformResponse: (response: { interviewDate?: string, error?: string; }, meta, arg) => response,
    }),
    getAllInterviewDates: builder.query<AllInterviewDatesResponse[], void>({
      query: () => ({
        url: `job/interviewDates`,
      }),
      transformResponse: (response: AllInterviewDatesResponse[], meta, arg) => response,
    }),
  }),
});



export const {
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
