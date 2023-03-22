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
import type { JobPreviewType } from "../../types/jobTypes";
import PageLoader from "../PageLoader";
import { processColumns } from "../../helper/job";

// import { io } from "socket.io-client";
// const socket = io("http://localhost:8080", {
//   withCredentials: true,
// });

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();
  // const jobCategories = useSelector(
  //   (state: RootState) => state.job.categoryOrder
  // );
  // const { refetch: refetchAJob, isSuccess: isSuccessFromAJob, categoryArray } = useGetAJob();
  // const { data, error, isLoading, refetch } = useGetAllJobsQuery();

  const { categoryArray, refetch } = useGetAJob();
  const { data, isLoading } = useGetAllJobsQuery();
  const [updateJobs] = useUpdateJobsMutation();
  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions, { isError, isSuccess }] =
    useAddInterviewQuestionsMutation();

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  // const [addInterviewQuestions, { isLoading: isAdding, isSuccess, isError }] =
  //   useAddInterviewQuestionsMutation();
  // const onConnect = () => {
  //   console.log("Connected!");
  // };
  // const onAddJob = () => {
  //   console.log("onAddJOb");
  //   refetch();
  // };
  // const onAddInterviewQuestions = (payload:any) => {
  //   console.log(payload);
  //   console.log("first")
  //   refetchAJob();
  //   // refetch()
  // };

  // useEffect(() => {
  //   socket.on("connect", onConnect);
  //   socket.emit("add-job");
  //   socket.on("add-job", onAddJob);
  //   return () => {
  //     socket.off("connect");
  //     socket.off("add-job");
  //   };
  // }, [isSuccess, isSuccessFromAJob]);

  const handleOnDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    console.log("source", source)
    console.log("destination", destination)
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
    removedJob = { ...removedJob, position: destination.index };

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
