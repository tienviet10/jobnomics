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
    // prepareHeaders: async (headers) => {
    //   const access_token = await security.getAccessTokenSilently()();
    //   if (access_token) {
    //     headers.set("Authorization", `Bearer ${access_token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["aJob", "allJobs", "filterJob", "allNotes", "auth"],
  endpoints: (builder) => ({
    getAllJobs: builder.query<AllJobsDataType, { token: string; }>({
      query: ({ token }) => ({
        url: "job",
        headers: { "Authorization": `Bearer ${token}` }
      }),
      providesTags: ["allJobs"],
      transformResponse: (response: AllJobsDataType, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    getJobById: builder.query({
      query: ({ jobId, categoryId, token }) => ({
        url: `job/${jobId}/${categoryId}`,
        headers: { "Authorization": `Bearer ${token}` }
      }),
      transformResponse: (response: JobType, meta, arg) => response,
      providesTags: ["aJob"],
    }),
    getAllNotes: builder.query({
      query: ({ column, order, t }) => ({
        url: `job/notes/${column}/${order}`,
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
      }),
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
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
            { token: "" },
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
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
      }),
      transformResponse: (response: { data: JobType; }, meta, arg) =>
        response.data,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      // invalidatesTags: ["aJob"],
    }),
    updateNote: builder.mutation({
      query: ({ ...patch }) => ({
        url: "job/note",
        method: "PATCH",
        body: patch,
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
      }),
      transformResponse: (response: Job[], meta, arg) => response,
      providesTags: ["filterJob"],
    }),
    rejectedReason: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: "job/rejected-reason",
        method: "PATCH",
        body: patch,
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
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
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
      }),
      transformResponse: (response: AllInterviewDatesResponse[], meta, arg) =>
        response,
    }),
    saveUser: builder.query<{ message: string; }, void>({
      query: () => ({ url: "auth", headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` } }),
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
        headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
      }),
      transformResponse: (response: { message: string; }, meta, arg) => response,
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
    }),
    recoverJob: builder.mutation({
      query: ({ ...patch }) => {
        console.log(patch);
        return {
          url: "job/recover",
          method: "PATCH",
          body: patch,
          headers: { "Authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZaTnUxZnNUcUQ4LV9UYU9xRXBEWCJ9.eyJodHRwczovL2V4YW1wbGUuY29tL2VtYWlsIjoidmlldHRyYW4xMDEyOTRAZ21haWwuY29tIiwiaXNzIjoiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDU1OTg1MDg4OTczODUxMDg4MDYiLCJhdWQiOlsiR3Vlc3Mgd2hhdCBpcyB0aGlzIHVuaXF1ZSBJREVOVElGSUVSIiwiaHR0cHM6Ly9kZXYtc2pyeHcwaTN6cjU4NTR5cS51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc5OTUzNTI2LCJleHAiOjE2ODAwMzk5MjYsImF6cCI6Ikl5RjRyUFFCdUQ3N0FBVnM3YVZXdjF5NUdPcHhHZmhhIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.piIWWq8WPPyFGs-DfrNie-hgIKsKSidusxat7bJBcKkswL-mCiCMxeGvkCFqS7iDHxstxSmvBEqSeISa9Tq6lnEysw6XdGIS6lkT66fabm9GEA1Z3MGpBr-eFf_ZNfG5SAr9OIhrNM1Q-9z3WCH_0g3p8nn4JJzxP4mC0xOWwZs1TNQIZv9c_nKpUzw30cbII6IKjsFQRNbi2N1hjrCw9QsUM8LcDAY-aCuft5bdcPdSBQWebIqxmLTP1cRNZM1EsgYaJ1Z-No1qjjylpmpj4puLeD7qb_ZfZ60WLxSgGdPXmQ5lO0bf1-sPGN-A2NH0IlVjYC1uryZd41oRf7RdAQ` }
        };
      },
      transformResponse: (response: { data: JobType; }, meta, arg) => {
        console.log(response);
        return response;
      },
      transformErrorResponse: (
        response: { status: string | number; },
        meta,
        arg
      ) => response.status,
      invalidatesTags: ["filterJob", "allJobs"],
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
  useEmailVerificationMutation,
  useRecoverJobMutation
} = jobApi;
