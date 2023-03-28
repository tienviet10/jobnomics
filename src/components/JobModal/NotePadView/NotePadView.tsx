import React, { useState, useEffect } from "react";

import { useUpdateNoteMutation } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";
import { setNewNote } from "../../../features/jobSlice";

import styles from "./NotePadView.module.css";
import { Alert, Box, Snackbar, TextField, Typography } from "@mui/material";

import InvalidAlertView from "../InvalidAlertView";
import { useGetAJob } from "../../../hooks/get-a-job";

const NotePadView = () => {
  const dispatch = useDispatch();
  const { selectedJob } = useGetAJob();

  const [saveNote, { isSuccess }] = useUpdateNoteMutation();
  const [isNoteSaveSuccess, setIsNoteSaveSucess] = useState(false);
  const [noteState, setNoteState] = useState(selectedJob.note || "");

  const handleNoteChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNoteState(event.target.value);
  };

  const handleAlertClose = () => {
    setIsNoteSaveSucess(false);
  };

  const handleSaveNote = async () => {
    if (noteState !== selectedJob.note) {
      // dispatch(setNewNote(noteState));
      saveNote({
        note: noteState,
        jobId: selectedJob.job.id,
        categoryId: selectedJob.category.id,
      });
    }
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
      className={styles.NotepadContainer}
      sx={{
        // py: { sm: 2 },
        width: { xs: "100%", sm: "90%" },
      }}
    >
      {selectedJob.isActive && (
        <>
          <Box className={styles.NotepadMain}>
            <Typography variant="h6">Notepad</Typography>
            <Typography variant="body2" gutterBottom>
              Visit the NOTES page to see your notes in one place.
            </Typography>
            <TextField
              className={styles.NoteTextField}
              sx={{
                flex: 1,
                "& fieldset": {
                  outline: "none",
                },
                "& .MuiInputBase-root": {
                  height: "100%",
                  display: "flex",
                  alignItems: "start",
                },
              }}
              rows={10}
              placeholder="Write your notes here..."
              multiline
              fullWidth
              value={noteState || ""}
              onChange={handleNoteChange}
              onBlur={handleSaveNote}
            ></TextField>
          </Box>

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
        </>
      )}
      {!selectedJob.isActive && <InvalidAlertView />}
    </Box>
  );
};

export default NotePadView;
