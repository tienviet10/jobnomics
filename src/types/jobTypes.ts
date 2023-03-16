export type UserJobsType = {
  categories: {
    [key: string]: {
      category: string;
      id: number;
      jobs: JobPreviewType | null;
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
}[];

export type JobType = {};
