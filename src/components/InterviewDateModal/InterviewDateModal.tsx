import React, { useState } from "react";
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
import CelebrationIcon from "@mui/icons-material/Celebration";
import { useUpdateJobMutation } from "../../app/services/job-api";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { toggleInterviewedModal } from "../../features/jobSlice";
import { Close } from "@mui/icons-material";

const InterviewDateModal = () => {
  const [date, setDate] = useState("2023-03-20");
  const [time, setTime] = useState("07:30");
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
            defaultValue="2023-03-20"
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
            defaultValue="07:30"
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
