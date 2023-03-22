import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";
import { useAddJobMutation } from "../../app/services/job-api";

import styles from "./CreateJobModal.module.css";
import {
  Card,
  IconButton,
  Modal,
  Input,
  Typography,
  Button,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CreateJobModalPropType } from "../../types/jobTypes";

import LoadingAnimation from "../LoadingAnimation";

// const socket = io("http://localhost:8080", {
//   withCredentials: true,
// });

const CreateJobModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [useLink, setUseLink] = useState(true);
  const [addJob, { isLoading: isPosting, isSuccess, isError }] =
    useAddJobMutation();

  const handleClose = () => {
    setOpen(false);
    setUseLink(true);
  };

  // useEffect(() => {
  //   const onConnect = () => {
  //     console.log("Connected!");
  //   };

  //   const onAddJob = () => {
  //     refetch()
  //   };

  //   socket.on("connect", onConnect);

  //   socket.emit("add-job");

  //   socket.on("add-job", onAddJob);

  //   return () => {
  //     socket.off("connect");
  //     socket.off("add-job");
  //   };
  // }, [isSuccess]);

  const handleSaveJobClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    addJob({
      jobLink: value,
      position: 100,
      interviewDate: null,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("");
      setOpen(false);
    }
    if (isError) {
      console.log(isError);
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card
        elevation={5}
        className={styles.CreateJobModal}
        sx={{
          px: { xs: 4, sm: "20px", md: "30px" },
          py: { xs: 4, sm: "50px", md: "100px" },
          pb: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        <div className={styles.ModalMain}>
          {!isError && !isPosting && useLink && (
            <>
              <div className={styles.FormInstruction}>
                <Typography variant="h6" gutterBottom>
                  Copy and paste the link to the job posting below:
                </Typography>
                <Alert severity="info">
                  At the moment, we only support{" "}
                  <strong style={{ fontWeight: "bold" }}>LinkedIn</strong> and{" "}
                  <strong style={{ fontWeight: "bold" }}>ZipRecruiter</strong>.
                </Alert>
              </div>
              <Input
                placeholder="https://"
                autoFocus={false}
                size="medium"
                fullWidth
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                sx={{ my: 2 }}
              />
              <Button
                variant="contained"
                className={styles.saveButton}
                onClick={handleSaveJobClick}
                sx={{ mt: 2, width: { xs: "100%", sm: "200px" } }}
              >
                Save New Job
              </Button>
            </>
          )}
          {!isError && !isPosting && !useLink && (
            <>
              <div className={styles.FormInstruction}>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  Please fill out the form below to create a new job
                </Typography>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  mb: 2,
                }}
                className={styles.ShortInputContainer}
              >
                <TextField
                  placeholder="e.g., React Developer"
                  autoFocus={false}
                  size="small"
                  label="Job Title"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  sx={{
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 2, sm: 0 },
                    flex: 1,
                    minWidth: { xs: "240px" },
                    width: { xs: "100%" },
                  }}
                />
                <TextField
                  placeholder="e.g., Job Inc."
                  autoFocus={false}
                  size="small"
                  label="Company Name"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  sx={{
                    flex: 1,
                    minWidth: { xs: "270px" },
                    width: { xs: "100%" },
                  }}
                />
              </Box>
              <Box
                className={styles.ShortInputContainer}
                sx={{ width: "100%", display: "flex", flexWrap: "wrap", mb: 2 }}
              >
                <TextField
                  placeholder="e.g., Toronto, ON"
                  autoFocus={false}
                  size="small"
                  value={value}
                  label="Location"
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  sx={{
                    mr: { xs: 0, sm: 2 },
                    mb: { xs: 2, sm: 0 },
                    flex: 1,
                    minWidth: { xs: "270px" },
                    width: { xs: "100%" },
                  }}
                />
                <TextField
                  placeholder="e.g., Indeed, LinkedIn"
                  autoFocus={false}
                  size="small"
                  label="Job Platform"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                  }}
                  sx={{
                    flex: 1,
                    minWidth: { xs: "270px" },
                    width: { xs: "100%" },
                  }}
                />
              </Box>
              <TextField
                placeholder="https://www.example.com"
                autoFocus={false}
                size="small"
                fullWidth
                label="Link"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                placeholder="Copy and paste the entire job description for optimal results."
                autoFocus={false}
                size="small"
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                className={styles.saveButton}
                onClick={handleSaveJobClick}
                sx={{
                  width: { xs: "100%", sm: "200px" },
                  alignSelf: "flex-end",
                }}
              >
                Save New Job
              </Button>
            </>
          )}
          {isPosting && (
            <div className={styles.LoadingContainer}>
              <LoadingAnimation />
              <Typography variant="subtitle2">
                Preparing Job Summary...
              </Typography>
            </div>
          )}
          {isError && (
            <Typography variant="body1">
              There was an error. Please try again!
            </Typography>
          )}
        </div>
        <Box className={styles.ModalFooter}>
          <Button
            className={styles.toggleCreateFormButton}
            onClick={() => {
              setUseLink((prev) => !prev);
            }}
          >
            {useLink ? "Add Job Manually" : "Add Job With a Link"}
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default CreateJobModal;
