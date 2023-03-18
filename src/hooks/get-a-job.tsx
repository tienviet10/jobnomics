import React from "react";
import { useSelector } from "react-redux";
import { useGetJobByIdQuery } from "../app/services/job-api";
import { RootState } from "../app/store";
import { Skill } from "../types/jobTypes";


export function useGetAJob(): any {
  const state = useSelector((state: RootState) => state.job);
  const modalState = state.modal;
  const selectedJob = state.selectedJob;

  const { userId, jobId, categoryId } = modalState.userJobId;
  const { data: aJob, refetch, error, isLoading } = useGetJobByIdQuery({
    userId,
    jobId,
    categoryId,
  });

  const skills = selectedJob?.job?.skills?.map((skill: Skill) => skill.name).join(", ");

  return {
    selectedJob,
    aJob,
    refetch,
    modalState,
    error,
    isLoading,
    skills
  };
}
