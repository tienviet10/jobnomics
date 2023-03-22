import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { useGetAJob } from "../../hooks/get-a-job";
import JobCategory from "./JobCategory";
import PageLoader from "../PageLoader";
import { processColumns } from "../../helper/react-dnd-logic";

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();

  const { categoryArray, refetch } = useGetAJob();
  const { data, isLoading } = useGetAllJobsQuery();
  const [updateJobs] = useUpdateJobsMutation();
  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions, { isError, isSuccess }] =
    useAddInterviewQuestionsMutation();

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCategory = categoryArray[Number(source.droppableId) - 1];
    const destinationCategory =
      categoryArray[Number(destination.droppableId) - 1];
    const startColumn = data[sourceCategory];
  
    // Moving to a different column
    const startJobs = JSON.parse(JSON.stringify(startColumn.jobs));
    let [removedJob] = startJobs.splice(source.index, 1);

    const body = processColumns(source, destination, data, categoryArray);
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
      {isLoading && <PageLoader />}
      {data && (
        <Paper elevation={1} className={styles.JobBoard}>
          {Object.keys(data).map((category: string, index: number) => (
            <JobCategory key={index} category={category} />
          ))}
        </Paper>
      )}
    </DragDropContext>
  );
};

export default JobList;
