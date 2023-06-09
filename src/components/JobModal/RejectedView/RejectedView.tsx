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
import InvalidAlertView from "../InvalidAlertView";

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
    <>
      {selectedJob.isActive && (
        <Box
          className={styles.RejectedContainer}
          sx={{
            px: { xs: 0, sm: "20px", md: "30px" },
            py: { xs: 0, sm: 2, md: 5 },
            pb: 0,
            mb: 1,
          }}
        >
          <Box className={styles.RejectedMain}>
            <Typography
              variant="body1"
              className={styles.Question}
              sx={{
                my: { xs: 2 },
              }}
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
              sx={{ mt: 2 }}
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
              Your response: "{selectedJob?.rejectReason}" has been saved!
            </Alert>
          )}
        </Box>
      )}
      {!selectedJob.isActive && <InvalidAlertView />}
    </>
  );
};

export default RejectedView;
