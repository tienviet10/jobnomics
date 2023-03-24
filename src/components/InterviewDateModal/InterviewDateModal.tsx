import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateJobMutation } from "../../app/services/job-api";
import { toggleInterviewedModal } from "../../features/jobSlice";
import { RootState } from "../../app/store";

import {
  Modal,
  Card,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import styles from "./InterviewDate.module.css";

import { CheckCircleRounded, Close } from "@mui/icons-material";
import { extractDate, extractTime } from "../../helper/date-extractor";

const InterviewDateModal = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const currentDateTime = new Date();

    setDate(extractDate(currentDateTime));
    setTime(extractTime(currentDateTime));
  }, []);

  const [updateJob, { isSuccess }] = useUpdateJobMutation();
  const dispatch = useDispatch();
  const selectedJobState = useSelector(
    (state: RootState) => state.job.interviewModal
  );

  const open = selectedJobState?.open;

  const handleClose = () => {
    dispatch(toggleInterviewedModal(false));
  };

  const handleSubmit = () => {
    const dateTime = new Date(date + "T" + time + ":00");
    updateJob({
      jobId: selectedJobState?.jobCategoryId?.jobId,
      categoryId: selectedJobState?.jobCategoryId?.categoryId,
      interviewDate: dateTime.toISOString(),
      type: "update",
    });

    setTimeout(() => {
      dispatch(toggleInterviewedModal(false));
    }, 3000);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.DateModalContainer}
    >
      <Card
        elevation={3}
        className={styles.DateModal}
        sx={{
          width: { xs: "85vw", sm: "60vw", md: "400px" },
          p: { xs: 3, sm: 5 },
        }}
      >
        <IconButton className={styles.CloseButton} onClick={handleClose}>
          <Close fontSize="medium" />
        </IconButton>
        {!isSuccess && (
          <>
            <Box className={styles.Congratulation}>
              <img
                src={"images/celebration-icon.png"}
                alt="celebration confetti icon"
                className={styles.CelebrationIcon}
              />
              <Typography variant="h6" textAlign="center">
                Congratulations on Getting an Interview!
              </Typography>
            </Box>
            <Box className={styles.InterviewText}>Interview Date:</Box>
            <Box className={styles.DateTimePicker}>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={date}
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
                value={time}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                onChange={(e) => setTime(e.target.value)}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              className={styles.ButtonSubmit}
            >
              Schedule
            </Button>
          </>
        )}
        {isSuccess && (
          <Box
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleRounded color="success" sx={{ fontSize: 40, mb: 2 }} />
            <Typography textAlign={"center"} sx={{ width: "100%" }}>
              Your interview has been successfully sheduled!
            </Typography>
            <Button
              sx={{ mt: 3 }}
              onClick={() => dispatch(toggleInterviewedModal(false))}
            >
              Okay
            </Button>
          </Box>
        )}
      </Card>
    </Modal>
  );
};

export default InterviewDateModal;
