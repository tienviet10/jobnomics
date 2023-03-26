import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
import { Box, Paper, Typography, Button } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

import { useGetAJob } from "../../hooks/get-a-job";
import { processColumns } from "../../helper/react-dnd-logic";
import JobCategory from "./JobCategory";

import CalendarModal from "../../components/Calendar";

import { AllActiveJobsDataType } from "../../types/jobTypes";

const JobList = (): JSX.Element => {
  const dispatch = useDispatch();

  const { user } = useAuth0();
  const { categoryArray, refetch } = useGetAJob();
  const { data } = useGetAllJobsQuery();
  const [updateJobs] = useUpdateJobsMutation();
  const [addChecklists] = useAddChecklistsMutation();
  const [addInterviewQuestions, { isSuccess }] =
    useAddInterviewQuestionsMutation();
  const [jobInterview, setJobInterview] = useState(-1);
  const { data: interviewDate } = useGetInterviewDateQuery({
    jobId: jobInterview,
  });

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [repositionWithinColumn, setRepositionWithinColumn] = useState(false);

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  useEffect(() => {
    if (
      interviewDate &&
      !interviewDate?.interviewDate &&
      !repositionWithinColumn &&
      jobInterview !== -1
    ) {
      dispatch(toggleInterviewedModal(true));
    }
  }, [interviewDate]);

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
    const startJobs = JSON.parse(JSON.stringify(startColumn?.jobs));
    let [removedJob] = startJobs.splice(source.index, 1);

    const body = processColumns(
      source,
      destination,
      data?.allActiveJobs as AllActiveJobsDataType,
      sourceCategory,
      destinationCategory,
      data
    );

    // TODO: Check to see if it should be dispatch before or after updateJobs

    updateJobs(body);

    if (destinationCategory === "Interviewed") {
      addChecklists({ jobId: removedJob?.id });
    } else if (destinationCategory === "Interviewing") {
      dispatch(
        setInterviewedModalId({
          jobId: removedJob?.id,
          categoryId: Number(destination?.droppableId),
        })
      );
      addInterviewQuestions({ jobId: removedJob?.id });
      setJobInterview(removedJob?.id);
    } else if (destinationCategory !== "Job Offer") {
      dispatch(
        setModalId({
          jobId: removedJob?.id,
          categoryId: Number(destination?.droppableId),
        })
      );
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {data?.allActiveJobs && (
        <Box className={styles.JobListContainer}>
          <Box
            className={styles.JobListHeader}
            sx={{ top: { xs: "70px", sm: "90px" } }}
          >
            <Typography
              variant="h4"
              className={styles.JobListTitle}
              color="accent.main"
            >
              <span>
                {user?.name ||
                  user?.given_name ||
                  user?.family_name ||
                  user?.nickname}
                's{" "}
              </span>
              <span>Job Board</span>
            </Typography>
            <Button
              onClick={() => setCalendarOpen(true)}
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "accent.main",
              }}
            >
              <CalendarMonth fontSize="large" sx={{ ml: 0.3 }} />
              <Typography variant="caption">Calendar</Typography>
            </Button>
          </Box>
          <Paper
            elevation={5}
            className={styles.JobBoard}
            sx={{ backgroundColor: "primary.light" }}
          >
            {Object.keys(data?.allActiveJobs).map(
              (category: string, index: number) => (
                <JobCategory key={index} category={category} />
              )
            )}
          </Paper>
        </Box>
      )}
      <CalendarModal open={calendarOpen} setOpen={setCalendarOpen} />
    </DragDropContext>
  );
};

export default JobList;
