import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  useUpdateNoteMutation,
  useUpdateChecklistMutation,
} from "../../../app/services/job-api";
import { setNewNote, toggleCheckbox } from "../../../features/jobSlice";

import styles from "./InterviewedView.module.css";
import {
  Box,
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

import { CheckCircle } from "@mui/icons-material";

import { useGetAJob } from "../../../hooks/get-a-job";
import { Checklist } from "../../../types/jobTypes";

const InterviewedView = (): JSX.Element => {
  const dispatch = useDispatch();
  const [progressMessage, setProgressMessage] = useState("Reminder for you");
  const [progress, setProgress] = useState(0);
  const [isNotepad, setIsNotepad] = useState(false);

  const [saveNote] = useUpdateNoteMutation();
  const [updateChecklist] = useUpdateChecklistMutation();

  const { selectedJob, skills } = useGetAJob();

  const handleToggleChecklist = (event: { target: { id: string } }) => {
    const checkboxId = Number(event.target.id);
    const isComplete = !selectedJob.checklists.find(
      (checklist: Checklist) => checklist.id === checkboxId
    )?.isComplete;
    dispatch(
      toggleCheckbox({
        id: checkboxId,
        isComplete,
      })
    );

    const body = {
      checklistId: checkboxId,
      jobId: selectedJob.job.id,
      isComplete: isComplete,
    };

    updateChecklist(body);
  };

  const progressBar = () => {
    const numberOfCompleted = selectedJob.checklists.filter(
      (checklist: Checklist) => checklist.isComplete
    ).length;

    const progress = Math.round(
      (numberOfCompleted / selectedJob.checklists?.length) * 100
    );

    let message = "Reminder for you";
    if (progress > 0 && progress <= 20) {
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
    setProgress(progress);
    setProgressMessage(message);
  };

  useEffect(() => {
    progressBar();
  }, [selectedJob.checklists]);

  const checklists = selectedJob.checklists.map((checklist: Checklist) => {
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
        label={
          <Typography sx={{ fontSize: { xs: "13px", sm: "18px" } }}>
            {checklist.description}
          </Typography>
        }
      />
    );
  });

  const handleTabChange = () => {
    setIsNotepad(!isNotepad);
  };

  const handleNoteChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    dispatch(setNewNote(event.target.value));
  };

  const handleSaveNote = async () => {
    saveNote({
      note: selectedJob.note,
      jobId: selectedJob.job.id,
      categoryId: selectedJob.category.id,
    });
  };

  return (
    <Box className={styles.InterviewedContainer}>
      <Tabs
        value={isNotepad ? 1 : 0}
        onChange={handleTabChange}
        centered
        className={styles.Tabs}
      >
        <Tab label="Checklist" />
        <Tab label="Note Pad" />
      </Tabs>
      {!isNotepad ? (
        <Box
          className={styles.ChecklistMain}
          sx={{
            height: { xs: "40vh", sm: "40vh" },
            width: "100%",
            px: { xs: "0", sm: "40px", md: "50px" },
          }}
        >
          <Typography
            variant="h5"
            color={progress === 100 ? "#1b5e20" : "primary"}
            className={styles.ProgressMessage}
            sx={{ fontSize: { xs: "20px", sm: "24px" }, mt: 2 }}
          >
            {progressMessage}
            {progress === 100 && (
              <CheckCircle
                fontSize="large"
                color="success"
                sx={{
                  marginLeft: "10px",
                  position: "absolute",
                  bottom: 0,
                  left: "98%",
                }}
              />
            )}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress === 100 ? "success" : "primary"}
            className={styles.CheckboxProgressBar}
            sx={{
              p: { xs: "5px", sm: "8px" },
              width: { xs: "100%", sm: "80%" },
              my: { xs: 3 },
            }}
          />
          <FormGroup className={styles.Checklist}>{checklists}</FormGroup>
        </Box>
      ) : (
        <Box
          className={styles.InterviewedMain}
          sx={{ px: { xs: "15px", sm: "40px", md: "50px" }, py: 2, pb: 0 }}
        >
          <Typography variant="h5">
            Keep track of your interview experince.
          </Typography>
          <Typography variant="body2" gutterBottom>
            What questions did you get? How did you respond? What did you learn?
            How do you feel about this company? Did you receive any feedback?
            What can you do better next time?
          </Typography>
          <TextField
            className={styles.NoteTextField}
            sx={{ "& fieldset": { outline: "none" } }}
            rows={10}
            placeholder="Write your notes here..."
            multiline
            fullWidth
            value={selectedJob.note}
            onChange={handleNoteChange}
          ></TextField>
          <Button onClick={handleSaveNote}>Save</Button>
        </Box>
      )}

      {selectedJob?.job?.skills && (
        <Typography
          variant="subtitle1"
          className={styles.Skills}
          sx={{
            fontSize: { xs: "13px", md: "16px" },
            lineHeight: { xs: "16px", md: "20px" },
          }}
        >
          <strong>Required Skills:</strong> {skills}
        </Typography>
      )}
    </Box>
  );
};

export default InterviewedView;
