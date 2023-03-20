import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { security } from "../../components/auth/GlobalAuth";
import type {
  UserJobsType,
  JobType,
  ResponseData,
  UserRequest,
  Category,
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
      transformResponse: (response: { data: UserJobsType; }, meta, arg) => {
        console.log(response);
        return response;
      },
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
        console.log(patch.newState);
        // console.log(Object.values(patch.newState));
        // const newCache: any = {};
        // for (const val of Object.values(patch.newState)) {
        //   if ((val as Category).jobs?.length > 0) {
        //     newCache[(val as Category).category] = val;
        //   }
        // }
        // console.log("newCache", newCache);
        const patchResult = dispatch(
          jobApi.util.updateQueryData('getAllJobs', undefined, (draft) => {
            // for (const key in newCache) {
            //   draft[key as string].jobs = newCache[key].jobs;
            // }
            // const keys = Object.keys(draft);
            // console.log("keys", keys);
            draft = patch.newState;
            return draft;
            // patch?.newState.map(())
            // draft = patch?.newState;
            // const categories = Object.keys(patch)

            // Object.assign(draft, { "hello": "world" });


            // console.log(JSON.stringify(draft));
            // Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
          // const createdProject = await queryFulfilled;
          // console.log("createdProject", createdProject);
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
      invalidatesTags: ["aJob", "allJobs", "filterJob"],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) { },
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
