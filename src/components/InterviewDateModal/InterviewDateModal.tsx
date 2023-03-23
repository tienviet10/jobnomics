import React, { useState, useEffect } from "react";
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

import { Close } from "@mui/icons-material";

const today = new Date();
const hours = String(today.getHours());
const minutes = String(today.getMinutes());

const InterviewDateModal = () => {
  const [date, setDate] = useState((new Date()).toISOString().split("T")[0]);
  const [time, setTime] = useState(`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`);
  const [updateJob] = useUpdateJobMutation();
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
    dispatch(toggleInterviewedModal(false));
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
      </Card>
    </Modal>
  );
};

export default InterviewDateModal;
