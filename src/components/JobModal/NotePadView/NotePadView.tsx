import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useUpdateNoteMutation } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";
import { setNewGeneralNote } from "../../../features/jobSlice";

import styles from "./NotePadView.module.css";
import { Alert, Box, Snackbar, TextField, Typography } from "@mui/material";

import InvalidAlertView from "../InvalidAlertView";
import { useGetAJob } from "../../../hooks/get-a-job";

const editorStyle = {
  height: '300px',
  width: '100%',
};

const NotePadView = () => {
  const dispatch = useDispatch();
  const { selectedJob } = useGetAJob();

  const [saveNote, { isSuccess }] = useUpdateNoteMutation();
  const [isNoteSaveSuccess, setIsNoteSaveSuccess] = useState(false);
  const [generalNoteState, setGeneralNoteState] = useState(
    selectedJob.note || ""
  );

  // const handleNoteChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setGeneralNoteState(event.target.value);
  // };
  const handleNoteChange = (event: string) => {
    setGeneralNoteState(event);
  };

  const handleAlertClose = () => {
    setIsNoteSaveSuccess(false);
  };

  const handleSaveNote = async () => {
    if (generalNoteState !== selectedJob.note) {
      dispatch(setNewGeneralNote(generalNoteState));
      saveNote({
        note: generalNoteState,
        jobId: selectedJob.job.id,
        categoryId: selectedJob.category.id,
        type: "general",
      });
    }
  };

  useEffect(() => {
    setGeneralNoteState(selectedJob.generalNote);
  }, [selectedJob.generalNote]);

  useEffect(() => {
    if (isSuccess) {
      setIsNoteSaveSuccess(true);
    }
  }, [isSuccess]);

  return (
    <Box
      className={styles.NotepadContainer}
      sx={{ width: { xs: "100%", sm: "90%" } }}
    >
      {selectedJob.isActive && (
        <>
          <Box className={styles.NotepadMain}>
            <Typography variant="h6">Notepad</Typography>
            <Typography variant="body2" gutterBottom>
              Visit the NOTES page to see your notes in one place.
            </Typography>
            {/* <TextField
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
              value={generalNoteState || ""}
              onChange={handleNoteChange}
              onBlur={handleSaveNote}
            ></TextField> */}
            <ReactQuill 
            style={editorStyle} 
            theme="snow" value={generalNoteState || ""} 
            onChange={handleNoteChange} 
            onBlur={handleSaveNote}/>
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
