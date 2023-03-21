import React from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setInterviewedModalId,
  toggleInterviewedModal,
} from "../../features/jobSlice";
import {
  useGetAllJobsQuery,
  useAddChecklistsMutation,
  useUpdateJobsMutation,
  useAddInterviewQuestionsMutation,
} from "../../app/services/job-api";

import styles from "./JobList.module.css";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Paper } from "@mui/material";

import JobCategory from "./JobCategory";
import type { JobPreviewType } from "../../types/jobTypes";
import PageLoader from "../PageLoader";

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();
  const jobCategories = useSelector(
    (state: RootState) => state.job.categoryOrder
  );

  const { data, error, isLoading } = useGetAllJobsQuery();
  const [updateJobs] = useUpdateJobsMutation();

  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions] = useAddInterviewQuestionsMutation();

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCategory = jobCategories[Number(source.droppableId) - 1];
    const destinationCategory =
      jobCategories[Number(destination.droppableId) - 1];

    const startColumn = data[sourceCategory];
    const endColumn = data[destinationCategory];

    if (startColumn === endColumn) {
      // Moving within the same column
      const newJobs = JSON.parse(JSON.stringify(startColumn.jobs));
      let [removedJob] = newJobs.splice(source.index, 1);
      removedJob = { ...removedJob, position: destination.index };

      newJobs.forEach((job: { position: number }, index: number) => {
        if (
          source.index < destination.index &&
          index >= source.index &&
          index < destination.index
        ) {
          job.position = index;
        }
        if (
          source.index > destination.index &&
          index < source.index &&
          index >= destination.index
        ) {
          job.position = index + 1;
        }
      });

      newJobs.push(removedJob);
      newJobs.sort(
        (a: JobPreviewType, b: JobPreviewType) => a.position - b.position
      );

      const newColumn = {
        ...startColumn,
        jobs: newJobs,
      };

      const newState = {
        ...data,
        [sourceCategory]: newColumn,
      };

      const updatedJobs = newJobs.map(
        (job: { id: number; position: number }, index: number) => {
          return {
            jobId: job?.id,
            categoryId: Number(source.droppableId),
            newCategoryId: Number(destination.droppableId),
            position: job.position,
          };
        }
      );

      const body = {
        jobUpdates: updatedJobs,
        newState,
        type: "update",
      };

      updateJobs(body);

      return;
    }

    // Moving to a different column
    const startJobs = JSON.parse(JSON.stringify(startColumn.jobs));
    const endJobs = JSON.parse(JSON.stringify(endColumn.jobs));
    let [removedJob] = startJobs.splice(source.index, 1);
    removedJob = { ...removedJob, position: destination.index };

    const startColumnUpdatedJobs = startJobs
      ?.splice(source.index)
      .map((job: { position: number }) => {
        return {
          ...job,
          position: job.position - 1,
        };
      });

    const endColumnUpdatedJobs = endJobs
      ?.splice(destination.index)
      .map((job: { position: number }) => {
        return {
          ...job,
          position: job.position + 1,
        };
      });

    const newStartColumn = {
      ...startColumn,
      jobs: [...startJobs, ...startColumnUpdatedJobs],
    };

    endColumnUpdatedJobs.push(removedJob);
    endColumnUpdatedJobs.sort(
      (a: JobPreviewType, b: JobPreviewType) => a.position - b.position
    );

    const newEndColumn = {
      ...endColumn,
      jobs: [...endJobs, ...endColumnUpdatedJobs],
    };

    const newState = {
      ...data,
      [sourceCategory]: newStartColumn,
      [destinationCategory]: newEndColumn,
    };

    const updatedJobsInSource = startColumnUpdatedJobs.map(
      (job: { id: number; position: number }, index: number) => {
        return {
          jobId: job?.id,
          categoryId: Number(source.droppableId),
          newCategoryId: Number(source.droppableId),
          position: job?.position,
        };
      }
    );

    const updatedJobsInDestination = endColumnUpdatedJobs.map(
      (job: { id: number; position: number }, index: number) => {
        if (job.position === destination.index) {
          return {
            jobId: job?.id,
            categoryId: Number(source.droppableId),
            newCategoryId: Number(destination.droppableId),
            position: job.position,
          };
        }
        return {
          jobId: job?.id,
          categoryId: Number(destination.droppableId),
          newCategoryId: Number(destination.droppableId),
          position: job?.position,
        };
      }
    );

    const body = {
      jobUpdates: [...updatedJobsInSource, ...updatedJobsInDestination],
      newState,
      type: "update",
    };

    updateJobs(body);

    if (destinationCategory === "Interviewed") {
      addChecklists({ jobId: removedJob?.id });
    }

    if (destinationCategory === "Interviewing") {
      dispatch(
        setInterviewedModalId({
          jobId: removedJob?.id,
          categoryId: Number(destination?.droppableId),
        })
      );
      addInterviewQuestions({ jobId: removedJob?.id });
      dispatch(toggleInterviewedModal(true));
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Paper elevation={1} className={styles.JobBoard}>
        {isLoading && <PageLoader />}
        {data &&
          Object.keys(data).map((category: string, index: number) => (
            <JobCategory key={index} category={category} />
          ))}
      </Paper>
    </DragDropContext>
  );
};

export default JobList;
