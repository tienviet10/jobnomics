import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../app/store";

import { toggleCheckbox } from "../../../features/jobSlice";

import styles from "./InterviewedView.module.css";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const InterviewedView = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isNotepad, setIsNotepad] = useState(false);
  const [progressMessage, setProgressMessage] = useState("Reminder for you");

  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );

  const handleToggleChecklist = (event: { target: { id: string } }) => {
    const checkboxId = Number(event.target.id);
    const isComplete = !selectedJobState.checklists.find(
      (checklist) => checklist.id === checkboxId
    )?.isComplete;
    dispatch(
      toggleCheckbox({
        id: checkboxId,
        isComplete,
      })
    );
  };

  const numberOfCompleted = selectedJobState.checklists.filter(
    (checklist) => checklist.isComplete
  ).length;

  const progress = Math.round(
    (numberOfCompleted / selectedJobState.checklists.length) * 100
  );

  useEffect(() => {
    let message = "";
    if (progress >= 0 && progress <= 20) {
      message = "Good start!";
    } else if (progress > 20 && progress <= 40) {
      message = "Great job!";
    } else if (progress > 40 && progress <= 60) {
      message = "Keep it up!";
    } else if (progress > 60 && progress <= 80) {
      message = "You're almost done!";
    } else if (progress === 100) {
      message = "Congrats you did it!";
    }
    setProgressMessage(message);
  }, [progress]);

  const checklists = selectedJobState.checklists.map((checklist) => {
    return (
      <FormControlLabel
        key={checklist.id}
        control={
          <Checkbox
            id={String(checklist.id)}
            checked={checklist.isComplete}
            color={progress === 100 ? "success" : "primary"}
            onChange={handleToggleChecklist}
          />
        }
        label={checklist.description}
      />
    );
  });

  const handleTabChange = () => {
    setIsNotepad(true);
  };

  return (
    <>
      <Tabs value={isNotepad} onChange={handleTabChange} centered>
        <Tab label="Checklist" />
        <Tab label="Note Pad" />
      </Tabs>
      <div className={styles.InterviewedContainer}>
        <Typography
          variant="h5"
          color={progress === 100 ? "#1b5e20" : "primary"}
          className={styles.ProgressMessage}
        >
          {progressMessage}
          {progress === 100 && (
            <CheckCircleIcon
              fontSize="large"
              color="success"
              sx={{ marginLeft: "10px" }}
            />
          )}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={progress === 100 ? "success" : "primary"}
          className={styles.CheckboxProgressBar}
        />
        <FormGroup>{checklists}</FormGroup>
      </div>
    </>
  );
};

export default InterviewedView;
