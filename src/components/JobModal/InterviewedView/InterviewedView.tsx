import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  useUpdateNoteMutation,
  useUpdateChecklistMutation,
} from "../../../app/services/job-api";
import { setNewNote, toggleCheckbox } from "../../../features/jobSlice";
import styles from "./InterviewedView.module.css";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Snackbar,
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
  const { selectedJob } = useGetAJob();

  const [progressMessage, setProgressMessage] = useState("Reminder for you");
  const [progress, setProgress] = useState(0);
  const [isNotepad, setIsNotepad] = useState(false);
  // const [alertOpen, setAlertOpen] = useState(false);
  const [saveNote, { isSuccess }] = useUpdateNoteMutation();
  const [isNoteSaveSuccess, setIsNoteSaveSucess] = useState(false);
  const [updateChecklist] = useUpdateChecklistMutation();
  const [noteState, setNoteState] = useState(selectedJob.note || "");

  const handleToggleChecklist = (event: { target: { id: string } }) => {
    // TODO: Improve Checklist method -> Separate checklist into its own component and do optimistic update there
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
    setNoteState(event.target.value);
    // dispatch(setNewNote(event.target.value));
  };

  const handleSaveNote = async () => {
    if (noteState !== selectedJob.note) {
      dispatch(setNewNote(noteState));
      saveNote({
        note: noteState,
        jobId: selectedJob.job.id,
        categoryId: selectedJob.category.id,
      });
    }
  };

  const handleAlertClose = () => {
    setIsNoteSaveSucess(false);
  };

  useEffect(() => {
    setNoteState(selectedJob.note);
  }, [selectedJob.note]);

  useEffect(() => {
    if (isSuccess) {
      setIsNoteSaveSucess(true);
    }
  }, [isSuccess]);

  return (
    <Box
      className={styles.InterviewedContainer}
      sx={{
        py: { sm: 2 },
        width: { xs: "100%", sm: "90%" },
      }}
    >
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
              p: 0.4,
              width: { xs: "100%", sm: "80%" },
              my: { xs: 1.5, sm: 3 },
            }}
          />
          <FormGroup className={styles.Checklist}>{checklists}</FormGroup>
        </Box>
      ) : (
        <div className={styles.NotepadMain}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "18px", sm: "20px", md: "24px" },
              fontWeight: "bold",
            }}
            gutterBottom
          >
            Keep track of your interview experince.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Record interview questions and your response, what you learned, how
            you feel about the company, reflections, learning, feedback
            received, and future improvements.
          </Typography>
          <TextField
            className={styles.NoteTextField}
            sx={{
              flex: 1,
              "& fieldset": {
                outline: "none",
              },
              "& .MuiInputBase-root": {
                minHeight: "100%",
                display: "flex",
                alignItems: "start",
              },
            }}
            rows={8}
            placeholder="Write your notes here..."
            multiline
            fullWidth
            value={noteState}
            onChange={handleNoteChange}
            onBlur={handleSaveNote}
          ></TextField>
        </div>
      )}

      <Snackbar
        open={isNoteSaveSuccess}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        ClickAwayListenerProps={{ onClickAway: () => null }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your note is successfully saved!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default InterviewedView;
