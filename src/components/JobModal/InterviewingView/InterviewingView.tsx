import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useUpdateJobMutation } from "../../../app/services/job-api";
import { toggleInterviewedModal } from "../../../features/jobSlice";

import styles from "./InterviewingView.module.css";
import { Box, Typography, TextField, Button } from "@mui/material";

import LoadingAnimation from "../../LoadingAnimation";

import { useGetAJob } from "../../../hooks/get-a-job";
import { extractDate, extractTime } from "../../../helper/date-extractor";

const InterviewingView = () => {
  const { selectedJob, skills } = useGetAJob();

  const [updateJob] = useUpdateJobMutation();
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (selectedJob) {
      let date = new Date();
      if (selectedJob.interviewDate !== null) {
        date = new Date(selectedJob.interviewDate ?? "");
      }

      setDate(extractDate(date));
      setTime(extractTime(date));
    }
  }, [selectedJob]);

  const handleSubmit = async () => {
    const dateTime = new Date(date + "T" + time + ":00");
    await updateJob({
      jobId: selectedJob.job.id,
      categoryId: selectedJob.category.id,
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
