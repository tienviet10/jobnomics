import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { toggleJobModal } from "../../../features/jobSlice";
import { useRejectedReasonMutation } from "../../../app/services/job-api";

import styles from "./RejectedModal.module.css";
import { Container } from "@mui/system";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";

const Rejected = () => {
  const dispatch = useDispatch();
  const [updateReason] = useRejectedReasonMutation();
  const { selectedJob, skills } = useGetAJob();

  const [toggle, setToggle] = useState(false);
  const [reason, setReason] = useState("");

  const handleOptionChange = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
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
      dispatch(toggleJobModal(false));
    }
  };
  return (
    <div className={styles.ModalBody}>
      <Typography variant="h5" className={styles.Rejection}>
        How were you informed about your rejection?
      </Typography>
      {selectedJob?.rejectReason && (
        <Typography>Reason: {selectedJob?.rejectReason}</Typography>
      )}
      <Container className={styles.MainContainer}>
        <FormControl className={styles.FormStyle}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            className={styles.RadioStyles}
          >
            <FormControlLabel
              value="I got an email"
              control={<Radio />}
              label="I got an email"
              onClick={(e) => handleOptionChange(e)}
            />
            <FormControlLabel
              value="I received a phone call"
              control={<Radio />}
              label="I received a phone call"
              onClick={handleOptionChange}
            />
            <FormControlLabel
              value="They ghost me"
              control={<Radio />}
              label="They ghost me"
              onClick={handleOptionChange}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
              onClick={handleOptionChange}
            />
            {toggle ? (
              <TextField
                variant="standard"
                color="primary"
                focused
                placeholder="Type Here"
                onChange={handleTextChange}
                className={styles.TextStyle}
              />
            ) : (
              <Box className={styles.Placeholder}></Box>
            )}
          </RadioGroup>
        </FormControl>
        <Box className={styles.BtnBox}>
          <Button
            variant="contained"
            className={styles.Btn}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Container>
      {selectedJob?.job?.skills && (
        <Typography variant="body2" className={styles.Skill}>
          Required Skills: <strong>{skills}</strong>
        </Typography>
      )}
    </div>
  );
};

export default Rejected;
