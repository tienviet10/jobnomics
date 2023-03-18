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
  modal: { open: false, userJobId: { userId: 1, jobId: 1, categoryId: 1 } },
  selectedJob: {
    category: {
      id: 1,
      name: "",
    },
    userId: 1,
    updatedAt: null,
    isFavorite: false,
    position: null,
    interviewDate: null,
    job: {
      id: 1,
      title: "",
      company: "",
      location: "",
      description: "",
      logo: "",
      summary: "",
      skills: [],
      interviewExamples: "",
      platform: "",
    },
    checklists: [],
  },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateColumns: (state, action) => {
      state.categories = { ...state.categories, ...action.payload };
    },
    toggleFavorite: (state, action) => {
      const [category, jobId, isFavorite] = action.payload;
      // Update job within the state.categories
      const selectedJob = state.categories[category].jobs.find(
        (job) => job?.id === jobId
      );
      if (selectedJob) {
        selectedJob.isFavorite = isFavorite;
      }
      //Update jbo within state.selectedJob
      if (
        state.selectedJob?.job.id === jobId &&
        state.selectedJob.category.name === category
      ) {
        state.selectedJob.isFavorite = isFavorite;
      }
    },
    toggleCheckbox: (state, action) => {
      const { id, isComplete } = action.payload;
      const checkbox = state.selectedJob.checklists.find(
        (checklist) => checklist.id === id
      );
      if (checkbox) {
        const index = state.selectedJob.checklists.indexOf(checkbox);
        state.selectedJob.checklists[index].isComplete = isComplete;
      }
    },
    toggleJobModal: (state, action) => {
      state.modal = { ...state.modal, open: action.payload };
    },
    setModalId: (state, action) => {
      state.modal = { ...state.modal, userJobId: action.payload };
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const {
  updateColumns,
  toggleFavorite,
  toggleJobModal,
  toggleCheckbox,
  setModalId,
  setSelectedJob,
} = jobSlice.actions;

export default jobSlice.reducer;
