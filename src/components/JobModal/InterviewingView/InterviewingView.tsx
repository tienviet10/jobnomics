import React, { useState, useEffect } from "react";

import { useUpdateJobMutation } from "../../../app/services/job-api";

import styles from "./InterviewingView.module.css";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";

import LoadingAnimation from "../../LoadingAnimation";

import { useGetAJob } from "../../../hooks/get-a-job";
import { extractDate, extractTime } from "../../../helper/date-extractor";
import InvalidAlertView from "../InvalidAlertView";

const InterviewingView = () => {
  const { selectedJob, skills } = useGetAJob();

  const [updateJob, { isSuccess }] = useUpdateJobMutation();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [alertOpen, setAlertOpen] = useState(false);

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
  };

  useEffect(() => {
    if (isSuccess) setAlertOpen(true);
  }, [isSuccess]);

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <>
      {selectedJob.isActive && (
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
              <LoadingAnimation>
                Preparing sample interview questions and answers...
              </LoadingAnimation>
            ) : (
              <Box
                className={styles.QuestionsContainer}
                sx={{ p: { xs: "15px", sm: "20px", md: "30px" }, pb: 0 }}
              >
                <Typography variant="h6" sx={{ pb: 2 }} gutterBottom>
                  Sample Interview Q & A
                </Typography>
                <Typography
                  variant="body1"
                  className={styles.Questions}
                  sx={{ pb: { xs: 2, md: 0 } }}
                  gutterBottom
                >
                  {selectedJob?.job?.interviewExamples}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={styles.Skills}
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  <strong>Required Skills:</strong> {skills}
                </Typography>
              </Box>
            )}
          </Box>
          <Typography
            variant="subtitle2"
            className={styles.Skills}
            sx={{ display: { xs: "none", sm: "block" }, p: "10px", pb: 0 }}
          >
            <strong>Required Skills:</strong> {skills}
          </Typography>
          {isSuccess && (
            <Snackbar
              open={alertOpen}
              autoHideDuration={6000}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your interview date has been successfully updated!
              </Alert>
            </Snackbar>
          )}
        </>
      )}
      {!selectedJob.isActive && <InvalidAlertView />}
    </>
  );
};

export default InterviewingView;
