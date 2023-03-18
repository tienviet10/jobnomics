import React, { useState } from 'react';
import { Modal, Card, Box, TextField, Button } from "@mui/material";
import styles from "./InterviewDate.module.css";
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useUpdateJobMutation } from '../../app/services/job-api';
import { InterviewDateModalType } from '../../types/jobTypes';


const InterviewDateModal: React.FC<InterviewDateModalType> = ({ open, setOpen }) => {
  const [date, setDate] = useState("2023-03-20");
  const [time, setTime] = useState("07:30");
  const [updateJob] = useUpdateJobMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const dateTime = new Date(date + "T" + time + ":00")
    updateJob({jobId: 2, categoryId: 3, interviewDate: dateTime.toISOString(), favorite: true, type: "update"});
    setOpen(false)
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.JobModalContainer}
    >
      <Card elevation={5} className={styles.JobModal}>
        <Box className={styles.Congratulation}>
          <CelebrationIcon sx={{ fontSize: 60 }} className={styles.CelebrationIcon} />
          <span>Congratulation!</span>
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
        <Button onClick={handleSubmit} className={styles.ButtonSubmit}>Schedule</Button>
      </Card>
    </Modal>
  );
};

export default InterviewDateModal;