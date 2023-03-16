export type UserJobsType = {
  categories: {
    [key: string]: {
      category: string;
      id: number;
      jobs: JobPreviewType[] | null;
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
  position?: number;
};

export type JobType = {
  updatedAt: Date;
  isFavorite: boolean;
  position?: number;
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
