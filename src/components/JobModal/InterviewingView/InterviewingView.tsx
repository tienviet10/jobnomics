import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useUpdateJobMutation } from "../../../app/services/job-api";
import { toggleInterviewedModal } from "../../../features/jobSlice";
import { RootState } from "../../../app/store";

import styles from "./InterviewingView.module.css";
import { Box, Typography, TextField, Button } from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";
import LoadingAnimation from "../../LoadingAnimation";

const InterviewingView = () => {
  const { selectedJob, skills } = useGetAJob();

  const [updateJob] = useUpdateJobMutation();
  const dispatch = useDispatch();
  const selectedJobState = useSelector(
    (state: RootState) => state.job.interviewModal
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const extractDateAndTime = (date: Date) => {
    const processingDate = date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("T")[0]
      .split("/");

    const extractedDate = [
      processingDate[2],
      processingDate[0],
      processingDate[1],
    ].join("-");
    setDate(extractedDate);
    console.log(extractedDate);

    let hours = String(date.getHours());
    let minutes = String(date.getMinutes());
    const extractedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;

    setTime(extractedTime);
  };

  useEffect(() => {
    if (selectedJob) {
      let date = new Date();
      if (selectedJob.interviewDate !== null) {
        date = new Date(selectedJob.interviewDate ?? "");
      }

      extractDateAndTime(date);
    }
  }, [selectedJob]);

  const handleSubmit = () => {
    const dateTime = new Date(date + "T" + time + ":00");
    updateJob({
      jobId: selectedJobState?.jobCategoryId?.jobId,
      categoryId: selectedJobState?.jobCategoryId?.categoryId,
      interviewDate: dateTime.toISOString(),
      type: "update",
    });
    dispatch(toggleInterviewedModal(false));
  };

  return (
    <>
      <Box className={styles.DateTimePicker} sx={{ mb: 2 }}>
        <TextField
          id="date"
          label="Date"
          type="date"
          value={date}
          fullWidth
          size="small"
          sx={{ flex: { xs: 1 }, mr: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          className={styles.DatePicker}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          id="time"
          label="Time"
          type="time"
          size="small"
          value={time}
          fullWidth
          sx={{ flex: { xs: 1 }, mr: 1 }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          onChange={(e) => setTime(e.target.value)}
        />
        <Button
          sx={{
            maxWidth: { xs: "100%", sm: "150px" },
            px: "20px",
            flex: { xs: 0.5, sm: 1 },
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Update
        </Button>
      </Box>
      <Box
        className={styles.InterviewingContainer}
        sx={{ height: { xs: "38vh", sm: "47vh" } }}
      >
        {!selectedJob?.job?.interviewExamples ? (
          <div className={styles.LoadingContainer}>
            <LoadingAnimation />
            <Typography variant="subtitle2" sx={{ pt: 2 }}>
              Preparing sample interview questions and answers...
            </Typography>
          </div>
        ) : (
          <>
            <Box
              className={styles.QuestionsContainer}
              sx={{ p: { xs: "15px", sm: "20px", md: "30px" }, pb: 0 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  pb: 2,
                  fontSize: { xs: "18px", sm: "20px" },
                }}
                gutterBottom
              >
                Sample Interview Q & A
              </Typography>
              <Typography variant="body1" className={styles.Questions}>
                {selectedJob?.job?.interviewExamples}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Typography
        variant="subtitle1"
        className={styles.Skills}
        sx={{
          fontSize: { xs: "13px", md: "16px" },
          lineHeight: { xs: "16px", md: "20px" },
        }}
      >
        <strong>Required Skills:</strong> {skills}
      </Typography>
    </>
  );
};

export default InterviewingView;
