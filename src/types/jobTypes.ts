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
  interviewDate?: Date;
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
