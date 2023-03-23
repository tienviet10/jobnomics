import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setInterviewedModalId,
  setModalId,
  toggleInterviewedModal,
} from "../../features/jobSlice";
import {
  useGetAllJobsQuery,
  useAddChecklistsMutation,
  useUpdateJobsMutation,
  useAddInterviewQuestionsMutation,
  useGetInterviewDateQuery,
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
  const [jobInterview, setJobInterview] = useState(-1);
  const [repositionWithinColumn, setRepositionWithinColumn] = useState(false);
  const [updateJobs] = useUpdateJobsMutation();
  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions, { isError, isSuccess }] =
    useAddInterviewQuestionsMutation();
    const {
      data: interviewDate
    } = useGetInterviewDateQuery({jobId: jobInterview});

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  useEffect(()=>{
    if (!interviewDate?.interviewDate && !repositionWithinColumn && jobInterview !== -1) {
      dispatch(toggleInterviewedModal(true));
    }
  },[interviewDate])

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      setRepositionWithinColumn(true);
    } else {
      setRepositionWithinColumn(false);
    }

    const sourceCategory = categoryArray[Number(source.droppableId) - 1];
    const destinationCategory =
      categoryArray[Number(destination.droppableId) - 1];
    const startColumn = data?.allActiveJobs[sourceCategory];

    // Moving to a different column
    const startJobs = JSON.parse(JSON.stringify(startColumn.jobs));
    let [removedJob] = startJobs.splice(source.index, 1);

    const body = processColumns(
      source,
      destination,
      data?.allActiveJobs,
      categoryArray,
      data
    );
    updateJobs(body);
    
    dispatch(
      setModalId({
        jobId: removedJob?.id,
        categoryId:  Number(destination?.droppableId),
      })
    );

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
      setJobInterview(removedJob?.id);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isLoading && <PageLoader />}
      {data?.allActiveJobs && (
        <Paper elevation={1} className={styles.JobBoard}>
          {Object.keys(data?.allActiveJobs).map(
            (category: string, index: number) => (
              <JobCategory key={index} category={category} />
            )
          )}
        </Paper>
      )}
    </DragDropContext>
  );
};

export default JobList;
