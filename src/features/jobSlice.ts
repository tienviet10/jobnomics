import { createSlice } from "@reduxjs/toolkit";

import type { UserJobsType } from "../types/jobTypes";

const initialState: UserJobsType = {
  categoryOrder: [
    "Bookmarked",
    "Applied",
    "Interviewing",
    "Interviewed",
    "Job Offer",
    "Position Filled",
  ],
  modal: { open: false, jobCategoryId: { jobId: -1, categoryId: -1 } },
  interviewModal: { open: false, jobCategoryId: { jobId: 1, categoryId: 1 } },
  selectedJob: {
    category: {
      id: 1,
      name: "",
    },
    updatedByUserAt: null,
    isFavorite: false,
    position: -1,
    interviewDate: null,
    note: "",
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
  previousJob: { jobId: 1, categoryId: 1 },
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const [category, jobId, isFavorite] = action.payload;
      if (
        state.selectedJob?.job?.id === jobId &&
        state.selectedJob?.category?.name === category
      ) {
        state.selectedJob.isFavorite = isFavorite;
        state.selectedJob.updatedByUserAt = new Date();
      }
    },
    toggleCheckbox: (state, action) => {
      state.previousJob = state.modal.jobCategoryId;
    },
    toggleJobModal: (state, action) => {
      state.modal = { ...state.modal, open: action.payload };
    },
    toggleDeleteModal: (state, action) => {
      state.modal = { ...state.modal, open: action.payload };
    },
    setModalId: (state, action) => {
      state.previousJob = state.modal.jobCategoryId;
      state.modal = { ...state.modal, jobCategoryId: action.payload };
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
    toggleInterviewedModal: (state, action) => {
      state.interviewModal = { ...state.interviewModal, open: action.payload };
    },
    setInterviewedModalId: (state, action) => {
      state.interviewModal = {
        ...state.interviewModal,
        jobCategoryId: action.payload,
      };
    },
    setNewNote: (state, action) => {
      state.previousJob = state.modal.jobCategoryId;
      state.selectedJob.note = action.payload;
    },
  },
});

export const {
  toggleFavorite,
  toggleJobModal,
  toggleCheckbox,
  setModalId,
  setSelectedJob,
  toggleInterviewedModal,
  setInterviewedModalId,
  setNewNote,
} = jobSlice.actions;

export default jobSlice.reducer;
