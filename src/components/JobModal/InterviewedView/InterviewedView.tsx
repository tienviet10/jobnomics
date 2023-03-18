import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  useUpdateNoteMutation,
  useUpdateJobMutation,
} from "../../../app/services/job-api";

import type { RootState } from "../../../app/store";

import { toggleCheckbox } from "../../../features/jobSlice";

import styles from "./InterviewedView.module.css";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const InterviewedView = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isNotepad, setIsNotepad] = useState(false);
  const [progressMessage, setProgressMessage] = useState("Reminder for you");
  const [note, setNote] = useState("");
  const [saveNote, { isLoading: isUpdating, isSuccess, isError }] =
    useUpdateNoteMutation();
  const [
    updateJob,
    { isLoading, isSuccess: isChecklistSuccess, isError: isChecklistError },
  ] = useUpdateJobMutation();

  const selectedJob = useSelector((state: RootState) => state.job.selectedJob);

  console.log(selectedJob);

  const handleToggleChecklist = (event: { target: { id: string } }) => {
    const checkboxId = Number(event.target.id);
    const isComplete = !selectedJob.checklists.find(
      (checklist) => checklist.id === checkboxId
    )?.isComplete;
    dispatch(
      toggleCheckbox({
        id: checkboxId,
        isComplete,
      })
    );

    const body = {
      userId: 1,
      jobId: selectedJob.job.id,
      categoryId: selectedJob.category.id,
      favorite: !selectedJob.isFavorite,
      interviewDate: selectedJob.interviewDate,
      checklists: selectedJob.checklists,
      type: "update",
    };
    updateJob(body);
  };

  const numberOfCompleted = selectedJob.checklists.filter(
    (checklist) => checklist.isComplete
  ).length;

  const progress = Math.round(
    (numberOfCompleted / selectedJob.checklists?.length) * 100
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

  const checklists = selectedJob.checklists.map((checklist) => {
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
    setIsNotepad((prev) => !prev);
  };

  const handleNoteChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    saveNote({
      note,
      jobId: selectedJob.job.id,
      categoryId: selectedJob.category.id,
    });
  };

  return (
    <div className={styles.InterviewedContainer}>
      <Tabs
        value={isNotepad ? 1 : 0}
        onChange={handleTabChange}
        centered
        className={styles.Tabs}
      >
        <Tab label="Checklist" />
        <Tab label="Note Pad" />
      </Tabs>
      <section className={styles.InterviewedMain}>
        {!isNotepad ? (
          <>
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
          </>
        ) : (
          <>
            <Typography variant="h5">
              Keep track of your interview experince.
            </Typography>
            <Typography variant="body2" gutterBottom>
              What questions did you get? How did you respond? What did you
              learn? How do you feel about this company? Did you receive any
              feedback? What can you do better next time?
            </Typography>
            <TextField
              className={styles.NoteTextField}
              sx={{ "& fieldset": { outline: "none" } }}
              rows={10}
              placeholder="Write your notes here..."
              multiline
              fullWidth
              value={note}
              onChange={handleNoteChange}
            ></TextField>
            <Button onClick={handleSaveNote}>Save</Button>
          </>
        )}
      </section>
    </div>
  );
};

export default InterviewedView;
