import React from "react";
import { useSelector } from "react-redux";
import { useGetJobByIdQuery } from "../app/services/job-api";
import { RootState } from "../app/store";
import { GetAJobType, Skill } from "../types/jobTypes";



export function useGetAJob(): GetAJobType {
  const state = useSelector((state: RootState) => state.job);
  const categoryArray = state.categoryOrder;
  const modalState = state.modal;
  const previousJob = state.previousJob;
  const selectedJob = state.selectedJob;
  const { jobId, categoryId } = modalState.jobCategoryId;
  const {
    data: aJob,
    refetch,
    error,
    isLoading
  } = useGetJobByIdQuery({
    jobId,
    categoryId,
  });

  const skills = selectedJob?.job?.skills
    ?.map((skill: Skill) => skill.name)
    .join(", ");

  return {
    selectedJob,
    aJob,
    modalState,
    error,
    skills,
    categoryArray,
    refetch,
    jobId,
    categoryId,
    isLoading,
    previousJob
  };
}
