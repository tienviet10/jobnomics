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
  // const { allActiveJobs, staleJobs } = data;
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

    const startColumn = data.allActiveJobs[sourceCategory];
    const endColumn = data.allActiveJobs[destinationCategory];

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
        allActiveJobs: { ...data.allActiveJobs, [sourceCategory]: newColumn },
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
      allActiveJobs: {
        ...data.allActiveJobs,
        [sourceCategory]: newStartColumn,
        [destinationCategory]: newEndColumn,
      },
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
    console.log(newState);

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
