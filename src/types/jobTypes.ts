export type UserJobsType = {
  categories: {
    [key: string]: {
      category: string;
      id: number;
      jobs: JobPreviewType[] | [];
    };
  };
  categoryOrder: string[];
};

export type JobPreviewType = {
  id: number;
  title: string;
  company: string;
  logo: string;
  isFavorite: boolean;
  position: number | null;
};

export type JobType = {
  category: {
    id: number;
    name: string;
  };
  userId: number;
  updatedAt: Date;
  isFavorite: boolean;
  position: number | null;
  interviewDate?: Date;
  job: {
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
