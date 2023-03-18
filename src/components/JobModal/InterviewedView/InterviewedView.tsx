import React, { useState } from "react";

import { useSelector } from "react-redux";

import type { RootState } from "../../../app/store";

import styles from "./InterviewedView.module.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const InterviewedView = (): JSX.Element => {
  const [isNotepad, setIsNotepad] = useState(false);

  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );

  console.log("hello");

  const handleToggleChecklist = () => {};

  const checklists = selectedJobState.checklists.map((checklist) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checklist.isComplete}
            color="success"
            onChange={handleToggleChecklist}
          />
        }
        label={checklist.description}
      />
    );
  });

  return (
    <div className={styles.InterviewedContainer}>
      <FormGroup>{checklists}</FormGroup>
    </div>
  );
};

export default InterviewedView;
