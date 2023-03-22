import React, { useState } from "react";

import { useRejectedReasonMutation } from "../../../app/services/job-api";

import styles from "./RejectedView.module.css";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";

const RejectedView = () => {
  const [updateReason] = useRejectedReasonMutation();
  const { selectedJob, skills } = useGetAJob();

  const [toggle, setToggle] = useState(false);
  const [reason, setReason] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.value === "other") {
      setToggle(true);
    } else {
      setToggle(false);
      setReason(target.value);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (reason) {
      updateReason({
        jobId: selectedJob?.job?.id,
        categoryId: selectedJob?.category?.id,
        reason,
      });
    }
  };
  return (
    <Box
      className={styles.RejectedContainer}
      sx={{
        maxHeight: { xs: "50vh", sm: "50vh", md: "60vh" },
        px: { xs: "0", sm: "20px", md: "30px" },
        pb: 0,
      }}
    >
      <Box className={styles.RejectedMain}>
        <Typography
          variant="h5"
          className={styles.Question}
          sx={{ fontSize: { xs: "18px", sm: "20px", md: "24px" } }}
        >
          How did the company inform you of their decision to move on with
          another candidate?
        </Typography>
        <FormControl className={styles.FormStyle}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            className={styles.RadioStyles}
            onChange={handleOptionChange}
          >
            <FormControlLabel
              value="I got an email"
              control={<Radio />}
              label="I got an email"
            />
            <FormControlLabel
              value="I received a phone call"
              control={<Radio />}
              label="I received a phone call"
            />
            <FormControlLabel
              value="They ghost me"
              control={<Radio />}
              label="They ghost me"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label={
                <Box className={styles.OtherInput}>
                  <Typography>Other</Typography>
                  <TextField
                    variant="standard"
                    color="primary"
                    fullWidth
                    placeholder="Type Here"
                    onChange={handleTextChange}
                    className={styles.OtherInputField}
                    sx={{ display: toggle ? "block" : "none" }}
                  />
                </Box>
              }
              className={styles.FormControlLabel}
              sx={{ mr: 0 }}
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          className={styles.SubmitButton}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
      {selectedJob?.rejectReason && (
        <Alert
          severity="success"
          sx={{
            my: { xs: 1, sm: 2 },
            fontSize: { xs: 13, sm: 16 },
            p: { xs: 1, sm: 2 },
          }}
        >
          Your response: "{selectedJob?.rejectReason}." Has been saved!
        </Alert>
      )}
    </Box>
  );
};

export default RejectedView;
