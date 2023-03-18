import { createSlice } from "@reduxjs/toolkit";
import { CheckBoxEntity, FilterStateType, Job } from "../types/jobTypes";

const initialState: FilterStateType = {
  mainFilter: {
    category: [{ name: "Applied", check: false }, { name: "Bookmarked", check: false }, { name: "Interviewing", check: false }, { name: "Interviewed", check: false }, { name: "Job Offer", check: false }, { name: "Position Filled", check: false }],
    languages: [{ name: "javascript", check: false }, { name: "ruby", check: false }],
    framework: [{ name: "express", check: false }, { name: "node", check: false }, { name: "react", check: false }, { name: "rails", check: false }],
  },
  firstFetch: true,
  listOfCategories: {
    Bookmarked: {},
    Applied: {},
    Interviewing: {},
    Interviewed: {},
    "Job Offer": {},
    "Position Filled": {}
  },
  arrayJobs: [],
  displayArrayJobs: [],
  searchWord: ""
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleCheck: (state, action) => {
      state["mainFilter"][action.payload.cate] = state["mainFilter"][action.payload.cate].map((obj: CheckBoxEntity) => (obj.name === action.payload.name ? { ...obj, check: !obj.check } : obj));
    },
    handleSearch: (state, action) => {
      state["searchWord"] = action.payload;
      let listJobs: Job[] = state.arrayJobs;
      if (action.payload !== "") {
        listJobs = listJobs.filter((job: Job) => (job?.company + job?.title + job?.updatedAt + job?.description).toLowerCase().includes(action.payload.toLowerCase()));
      }
      state["displayArrayJobs"] = listJobs;
    },
    setList: (state, action) => {
      state["listOfCategories"] = action.payload;

      const listCategoryKeys: string[] = Object.keys(action.payload);
      let listJobs: Job[] = [];
      for (let key of listCategoryKeys) {
        listJobs.push(...action.payload[key].jobs.map((job: Job) => ({ ...job, categoryId: action.payload[key].id })));
      }
      if (state["searchWord"] !== "") {
        listJobs = listJobs.filter((job: Job) => (job?.company + job?.title + job?.updatedAt + job?.description).toLowerCase().includes(state["searchWord"].toLowerCase()));
      }
      state["arrayJobs"] = listJobs;
      state["displayArrayJobs"] = listJobs;
    },
    toggleFirstFetch: (state, action) => {
      state["firstFetch"] = action.payload;

    }
  },
});

export const { toggleCheck, handleSearch, setList, toggleFirstFetch } = filterSlice.actions;

export default filterSlice.reducer;
