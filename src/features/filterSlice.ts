import { createSlice } from "@reduxjs/toolkit";
import { Category, CheckBoxEntity, FilterStateType, Job } from "../types/jobTypes";

// import type { UserJobsType } from "../types/jobTypes";

const initialState: FilterStateType = {
  mainFilter: {
    category: [{ name: "Applied", check: false }, { name: "Bookmarked", check: false }, { name: "Interviewing", check: false }, { name: "Interviewed", check: false }, { name: "Job Offer", check: false }, { name: "Position Filled", check: false }],
    languages: [{ name: "javascript", check: false }, { name: "ruby", check: false }],
    framework: [{ name: "express", check: false }, { name: "node", check: false }, { name: "react", check: false }, { name: "rails", check: false }],
  },
  listOfCategories: {
    Bookmarked: {},
    Applied: {},
    Interviewing: {},
    Interviewed: {},
    "Job Offer": {},
    "Position Filled": {}
  },
  arrayJobs: [],
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
      let listCal: Job[] = Object.values(state.listOfCategories).reduce((acc: Job[], cate: any) => acc.concat(cate.jobs), []);
      console.log(listCal);
      if (action.payload !== "") {
        listCal = listCal.filter((job: Job) => (job.company + job.title + job.updatedAt).toLowerCase().includes(action.payload.toLowerCase()));
      }
      state["arrayJobs"] = listCal;
    },
    setList: (state, action) => {
      state["listOfCategories"] = action.payload;

      let listCal: Job[] = Object.values(action.payload).reduce((acc: Job[], cate: any) => acc.concat(cate.jobs), []);
      if (state["searchWord"] !== "") {
        listCal = listCal.filter((job: Job) => (job.company + job.title + job.updatedAt).toLowerCase().includes(state["searchWord"].toLowerCase()));
      }
      state["arrayJobs"] = listCal;

    }
  },
});

export const { toggleCheck, handleSearch, setList } = filterSlice.actions;

export default filterSlice.reducer;
