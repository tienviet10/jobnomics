import { createSlice } from "@reduxjs/toolkit";
import { CheckBoxEntity, FilterStateType, Job } from "../types/jobTypes";

const initialState: FilterStateType = {
  mainFilter: {
    category: [
      { name: "Applied", check: false },
      { name: "Bookmarked", check: false },
      { name: "Interviewing", check: false },
      { name: "Interviewed", check: false },
      { name: "Job Offer", check: false },
      { name: "Position Filled", check: false },
    ],
    languages: [
      { name: "javascript", check: false },
      { name: "ruby", check: false },
    ],
    framework: [
      { name: "express", check: false },
      { name: "node", check: false },
      { name: "react", check: false },
      { name: "rails", check: false },
    ],
  },
  columnFilter: ["createdAt", "desc"],
  firstFetch: true,
  arrayJobs: [],
  displayArrayJobs: [],
  searchWord: "",
  selectedJob: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleCheck: (state, action) => {
      state["mainFilter"][action.payload.cate] = state["mainFilter"][
        action.payload.cate
      ].map((obj: CheckBoxEntity) =>
        obj.name === action.payload.name ? { ...obj, check: !obj.check } : obj
      );
    },
    handleSearch: (state, action) => {
      state["searchWord"] = action.payload;
      let listJobs: Job[] = state.arrayJobs;
      if (action.payload !== "") {
        listJobs = listJobs.filter((job: Job) =>
          (job?.company + job?.title + job?.updatedByUserAt + job?.description)
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        );
      }
      state["displayArrayJobs"] = listJobs;
    },
    setList: (state, action) => {
      let listJobs: Job[] = [];
      if (state["searchWord"] !== "") {
        listJobs = action.payload.filter((job: Job) =>
          (job?.company + job?.title + job?.updatedByUserAt + job?.description)
            .toLowerCase()
            .includes(state["searchWord"].toLowerCase())
        );
      }
      state["arrayJobs"] = action.payload;
      state["displayArrayJobs"] =
        listJobs.length > 0 ? listJobs : action.payload;
    },
    toggleFirstFetch: (state, action) => {
      state["firstFetch"] = action.payload;
    },
    setFilterSelectedJob: (state, action) => {
      state["selectedJob"] = action.payload;
    },
    setColumnFilterJob: (state, action) => {
      state["columnFilter"] = action.payload;
    },
  },
});

export const {
  toggleCheck,
  handleSearch,
  setList,
  toggleFirstFetch,
  setFilterSelectedJob,
  setColumnFilterJob,
} = filterSlice.actions;

export default filterSlice.reducer;
