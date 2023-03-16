import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

import type { UserJobsType } from "../../types/jobTypes";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    getAllJobs: builder.query<UserJobsType, null>({
      query: () => "/",
    }),
    getJobById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { getAllJobs, getJobById } = jobApi;
