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
  modal: { open: false, jobCategoryId: { jobId: 1, categoryId: 1 } },
  interviewModal: { open: false, jobCategoryId: { jobId: 1, categoryId: 1 } },
  selectedJob: {
    category: {
      id: 1,
      name: "",
    },
    updatedAt: null,
    isFavorite: false,
    position: null,
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
    toggleDeleteModal: (state, action) => {
      state.modal = { ...state.modal, open: action.payload };
    },
    setModalId: (state, action) => {
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
  setNewNote
} = jobSlice.actions;

export default jobSlice.reducer;
