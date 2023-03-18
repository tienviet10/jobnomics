import React, { useState } from 'react';
import { Modal, Card, Box, TextField } from "@mui/material";
import styles from "./InterviewDate.module.css";
import CelebrationIcon from '@mui/icons-material/Celebration';

const InterviewDateModal = ({ open, setOpen }: { open: any, setOpen: any; }) => {
  const [value, setValue] = useState(new Date());


  const handleClose = () => {
    setOpen(false);
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
          />
        </Box>
      </Card>
    </Modal>
  );
};

export default InterviewDateModal;