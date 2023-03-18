import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../app/store";

import { toggleCheckbox } from "../../../features/jobSlice";

import styles from "./InterviewedView.module.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const InterviewedView = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isNotepad, setIsNotepad] = useState(false);

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

  const checklists = selectedJobState.checklists.map((checklist) => {
    return (
      <FormControlLabel
        key={checklist.id}
        control={
          <Checkbox
            id={String(checklist.id)}
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
