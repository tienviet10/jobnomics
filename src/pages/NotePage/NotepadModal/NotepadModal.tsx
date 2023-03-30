import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useUpdateNoteMutation } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";
import { setNewGeneralNote, setNewNote } from "../../../features/jobSlice";

import styles from "./NotepadModal.module.css";
import {
  Alert,
  Box,
  Card,
  IconButton,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { NotesType } from "../../../types/jobTypes";

const editorStyle = {
  height: '300px',
  width: '100%',
};

const NotepadModal = ({
  open,
  setOpen,
  type,
  notesData,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  notesData: NotesType;
}) => {
  const dispatch = useDispatch();

  const [saveNote, { isSuccess }] = useUpdateNoteMutation();
  const [isNoteSaveSuccess, setIsNoteSaveSucess] = useState(false);
  const [noteState, setNoteState] = useState(
    type === "interview" ? notesData.note : notesData.generalNote || ""
  );

  // const handleNoteChange = (event: {
  //   target: { value: React.SetStateAction<string> };
  // }) => {
  //   setNoteState(event.target.value);
  // };
  const handleNoteChange = (event: string) => {
    console.log(event);
    setNoteState(event);
  };

  const handleAlertClose = () => {
    setIsNoteSaveSucess(false);
  };

  const handleSaveNote = async () => {
    if (type === "interview") {
      if (noteState !== notesData.note) {
        dispatch(setNewNote(noteState));
        saveNote({
          note: noteState,
          jobId: notesData.job.id,
          categoryId: notesData.category.id,
          type,
        });
      }
    } else if (type === "general") {
      if (noteState !== notesData.note) {
        dispatch(setNewGeneralNote(noteState));
        saveNote({
          note: noteState,
          jobId: notesData.job.id,
          categoryId: notesData.category.id,
          type,
        });
      }
    }
  };

  useEffect(() => {
    if (type === "interview") {
      setNoteState(notesData.note);
    } else if (type === "general") {
      setNoteState(notesData.generalNote);
    }
  }, [notesData.generalNote, notesData.note]);

  useEffect(() => {
    if (isSuccess) {
      setIsNoteSaveSucess(true);
    }
  }, [isSuccess]);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className={styles.NotepadModalContainer}
    >
      <Card
        elevation={5}
        className={styles.NotepadModal}
        sx={{
          px: { xs: 2, md: 3, lg: 5 },
          pb: { xs: 4, md: 4, lg: 5 },
          pt: { xs: 7, md: 8, lg: 9 },
          width: { xs: "90vw", md: "80vw", lg: "1000px" },
          maxHeight: { xs: "80vh" },
          overflow: "auto",
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={() => setOpen(false)}
        >
          <Close fontSize="medium" />
        </IconButton>
        <Box className={styles.NotepadMain}>
          <Typography
            variant="h6"
            sx={{ mb: 2 }}
            gutterBottom
          >{`Edit ${type} notes`}</Typography>
          {/* <TextField
            className={styles.NoteTextField}
            sx={{
              "& fieldset": {
                outline: "none",
              },
              "& .MuiInputBase-root": {
                height: "100%",
                display: "flex",
                alignItems: "start",
              },
            }}
            rows={18}
            placeholder="Write your notes here..."
            multiline
            fullWidth
            value={noteState || ""}
            onChange={handleNoteChange}
            onBlur={handleSaveNote}
          ></TextField> */}
          <ReactQuill
            style={editorStyle}
            theme="snow" value={noteState || ""}
            onChange={handleNoteChange}
            onBlur={handleSaveNote}
            className="my-quill-editor"
          />
          {/* <div style={{width:"100%"}}>
          </div> */}
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
      </Card>
    </Modal>
  );
};

export default NotepadModal;
