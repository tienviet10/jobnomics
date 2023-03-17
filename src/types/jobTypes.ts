import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { LogoutOptions } from "@auth0/auth0-react";

export type UserJobsType = {
  categories: {
    [key: string]: {
      category: string;
      id: number;
      jobs: JobPreviewType[] | [];
    };
  };
  categoryOrder: string[];
  modal: {
    open: boolean;
    userJobId: { userId: number; jobId: number; categoryId: number };
  };
  selectedJob: JobType;
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
  userId: number;
  updatedAt: Date | null;
  isFavorite: boolean;
  position: number | null;
  interviewDate: Date | null;
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    logo: string;
    summary: string;
    skills: string[];
    interviewExamples?: string;
    platform: string;
  };
};

export interface Job {
  company: string;
  id: number;
  logo: string | null;
  position: number;
  title: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  category: string;
  jobs: Job[];
}

export type CategoryType = {
  [key: string]: Category;
};

export type Filter = {
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

export type JobListProps = {
  listCal: Job[];
};

export interface RemindersListType {
  filter: Filter;
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
}

export type SetSearchKeywordType = {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
};

export type DrawComponentType = {
  filter: Filter;
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
  state: boolean;
  sentFilterRequest: (currentState: Filter) => Promise<void>;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ManageSearchPageType = {
  filter: Filter;
  updateCategoryFilter: (item: UpdateFilterType) => () => Promise<void>;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  sentFilterRequest: (currentState: Filter) => Promise<void>;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  listCal: Job[];
  logout: (options?: LogoutOptions | undefined) => void;
};

export type CreateJobModalPropType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryProps = {
  category: string;
};
