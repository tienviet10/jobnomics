import { createSlice } from "@reduxjs/toolkit";

import type { UserJobsType } from "../types/jobTypes";

const initialState: UserJobsType = {
  categories: {
    Bookmarked: {
      category: "Bookmarked",
      id: 1,
      jobs: [],
    },
    Applied: {
      category: "Applied",
      id: 2,
      jobs: [],
    },
    Interviewing: {
      category: "Interviewing",
      id: 3,
      jobs: [],
    },
    Interviewed: {
      category: "Interviewed",
      id: 4,
      jobs: [],
    },
    "Job Offer": {
      category: "Job Offer",
      id: 5,
      jobs: [],
    },
    "Position Filled": {
      category: "Position Filled",
      id: 6,
      jobs: [],
    },
  },
  categoryOrder: [
    "Bookmarked",
    "Applied",
    "Interviewing",
    "Interviewed",
    "Job Offer",
    "Position Filled",
  ],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateColumns: (state, action) => {
      state.categories = { ...action.payload };
    },
  },
});

export const { updateColumns } = jobSlice.actions;

export default jobSlice.reducer;
