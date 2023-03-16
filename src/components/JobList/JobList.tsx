import React, { useEffect } from "react";
import type { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { updateColumns } from "../../features/jobSlice";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
  useGetAllJobsQuery,
  useGetJobByIdQuery,
} from "../../app/services/job-api";

import "./JobList.css";
import JobCategory from "./JobCategory";
import { JobPreviewType } from "../../types/jobTypes";

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();

  const jobCategories = useSelector(
    (state: RootState) => state.job.categoryOrder
  );

  const jobState = useSelector((state: RootState) => state.job.categories);
  // const { Bookmarked } = jobState;
  console.log(jobState);

  const { data, error, isLoading } = useGetAllJobsQuery();

  useEffect(() => {
    if (data) {
      const newState = data;

      dispatch(updateColumns(newState));
    }
  }, [data]);

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

    const startColumn = jobState[sourceCategory];
    const endColumn = jobState[destinationCategory];

    if (startColumn === endColumn) {
      // Moving within the same column
      const newJobs = [...startColumn.jobs];
      let [removedJob] = newJobs.splice(source.index, 1);
      removedJob = { ...removedJob, position: destination.index };
      newJobs.splice(destination.index, 0, removedJob);

      const newColumn = {
        ...startColumn,
        todos: newJobs,
      };

      const newState = {
        ...jobState,
        [newColumn.id]: newColumn,
      };

      dispatch(updateColumns(newState));
      return;
    }

    // Moving to a different column
    const startJobs = [...startColumn.jobs];
    let [removedJob] = startJobs.splice(source.index, 1);
    removedJob = { ...removedJob, position: destination.index };

    // Get rid of this once we start setting position when adding a new job
    // At the moment, the jobs don't have a position
    startColumn.jobs?.forEach((job, index) => {
      return { ...job, position: index };
    });
    endColumn.jobs?.forEach((job, index) => {
      return { ...job, position: index };
    });
    // remove to here

    const startColumnUpdatedJobs = startJobs
      ?.filter((job) => job.position >= source.index)
      .map((job) => {
        return {
          ...job,
          position: job.position - 1,
        };
      });
    const endColumnUpdatedJobs = endColumn.jobs
      ?.filter(
        (job) => job.position === null || job.position >= destination.index
      )
      .map((job) => {
        return {
          ...job,
          position: job.position === null ? 0 : job.position + 1,
        };
      });

    const newStartColumn = {
      ...startColumn,
      jobs: startColumnUpdatedJobs,
    };

    const endTodos = [...endColumnUpdatedJobs];
    endTodos.splice(destination.index, 0, removedJob);
    const newEndColumn = {
      ...endColumn,
      jobs: endTodos,
    };

    const newState = {
      ...jobState,
      [sourceCategory]: newStartColumn,
      [destinationCategory]: newEndColumn,
    };

    dispatch(updateColumns(newState));

    const jobUpdates = { userId: 1 };

    // Example: { "jobUpdates":[
    //   {"userId": 1, "jobId": 1, "categoryId": 1, "newCategoryId": 1, "position": 0},
    //   {"userId": 1, "jobId": 2, "categoryId": 1, "newCategoryId": 2, "position": 0}
    //   {"userId": 1, "jobId": 2, "categoryId": 2, "newCategoryId": 3, "position": 1}
    //   ],
    //   "type": "update"
    // }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="todo_container">
        {jobCategories?.map((category: string, index) => (
          <JobCategory key={index} category={category} />
        ))}
      </div>
    </DragDropContext>
  );
};

export default JobList;
