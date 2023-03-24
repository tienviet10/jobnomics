import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { LogoutOptions } from "@auth0/auth0-react";

export type GetAllJobsReturnType = {
  allActiveJobs: { [key: string]: CategoryType };
  staleJobs: JobType[];
};
export type UserJobsType = {
  categoryOrder: string[];
  modal: ModalType;
  interviewModal: ModalType;
  selectedJob: JobType;
  previousJob: { jobId: number; categoryId: number };
};

export type InactiveJobsType = {
  staleJobs: JobType[];
};

type ModalType = {
  open: boolean;
  jobCategoryId: { jobId: number; categoryId: number };
};

export type categoriesType = {
  category: string;
  id: number;
  jobs: JobPreviewType[] | [];
};
export type JobPreviewType = {
  id: number;
  title: string;
  company: string;
  logo: string;
  isFavorite: boolean;
  position: number;
};

export type JobType = {
  category: {
    id: number;
    name: string;
  };
  updatedByUserAt: Date | null;
  isFavorite: boolean;
  position: number;
  interviewDate: Date | null;
  note: string;
  rejectReason?: string | null;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    logo: string;
    summary: string;
    skills: Skill[];
    interviewExamples?: string;
    platform: string;
  };
  checklists: Checklist[];
  interviewExamples?: string;
};

export type Checklist = {
  id: number;
  description: string;
  isComplete: boolean;
};

export type Skill = {
  createdAt: string;
  id: number;
  name: string;
  updatedByUserAt: string;
};
export interface Job {
  isFavorite: boolean;
  interviewDate: Date | null;
  company: string;
  id: number;
  logo: string;
  position: number;
  title: string;
  updatedByUserAt: Date;
  categoryId: number;
  description?: string;
}

export interface Category {
  id: number;
  category: string;
  jobs: Job[];
}

export type CategoryType = {
  [key: string]: Category;
};

export type FilterStateType = {
  mainFilter: Filter;
  // listOfCategories: ListOfCategoriesType;
  arrayJobs: Job[];
  searchWord: string;
  displayArrayJobs: Job[];
  firstFetch: boolean;
  selectedJob: Job | null;
  columnFilter: string[];
};

type ListOfCategoriesType = {
  Bookmarked: Category | {};
  Applied: Category | {};
  Interviewing: Category | {};
  Interviewed: Category | {};
  "Job Offer": Category | {};
  "Position Filled": Category | {};
};

type Filter = {
  [key: string]: CheckBoxEntity[];
};

export type CheckBoxEntity = {
  name: string;
  check: boolean;
};

export type UpdateFilterType = {
  auto: boolean;
  cate: string;
  check: boolean;
  name: string;
};

export type ResponseData = {
  data?: CategoryType;
  error?: FetchBaseQueryError | SerializedError;
};

export interface RemindersListType {
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
}

export type DrawComponentType = {
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
  sentFilterRequest: () => Promise<void>;
};

export type ManageSearchPageType = {
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
  logout: (options?: LogoutOptions | undefined) => void;
  sentFilterRequest: () => Promise<void>;
  prefetchData?: () => Promise<void>;
};

export type CreateJobModalPropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryProps = {
  category: string;
};

export type InterviewDateModalType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserRequest = {
  category: string[];
  skills: string[];
  columnFilter: string[];
};

export type FilterListType = {
  sentFilterRequest: () => Promise<void>;
};

export type GetAJobType = {
  selectedJob: JobType;
  aJob: JobType | undefined;
  modalState: ModalType;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
  skills: string;
  categoryArray: string[];
  refetch: any;
  jobId: number;
  categoryId: number;
  isFetching: boolean;
  previousJob: { jobId: number; categoryId: number };
  isSuccess: boolean;
};

export type AllActiveJobsType = {
  id: number;
  title: string;
  company: string;
  logo: string;
  position: number;
  isFavorite: boolean;
  interviewDate: Date | null;
  updatedByUserAt: Date;
};

export type AllActiveJobsDataType = {
  [key: string]: { category: string; id: number; jobs: AllActiveJobsType[] };
};

export type CalendarEventsType = {
  events: EventType[];
};

type EventType = {
  start: Date;
  end: Date;
  title: string;
};

export type InterviewResponseType = {
  company: string;
  interviewDate: Date;
  title: string;
};

export type AllInterviewDatesResponse = {
  company: string;
  interviewDate: Date;
  title: string;
};

