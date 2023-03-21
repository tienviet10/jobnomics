import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  useAddJobMutation,
  useGetAllJobsQuery,
} from "../../app/services/job-api";

import styles from "./CreateJobModal.module.css";
import {
  Card,
  IconButton,
  Modal,
  Input,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CreateJobModalPropType } from "../../types/jobTypes";

import LoadingAnimation from "../LoadingAnimation";

const socket = io("http://localhost:8080", {
  withCredentials: true,
});

const CreateJobModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const { data: jobState, refetch } = useGetAllJobsQuery();
  const [addJob, { isLoading: isPosting, isSuccess, isError }] =
    useAddJobMutation();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected!");
    };

    const onAddJob = (data: any) => {
      refetch();
    };

    socket.on("connect", onConnect);

    socket.emit("add-job");

    socket.on("add-job", onAddJob);

    return () => {
      socket.off("connect");
      socket.off("add-job");
    };
  }, [isSuccess]);

  const handleSaveJobClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    addJob({
      jobLink: value,
      position: jobState.Bookmarked.jobs.length,
      interviewDate: null,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("");
      setOpen(false);
    }
  }, [isPosting, isSuccess, isError]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card elevation={5} className={styles.CreateJobModal}>
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        <div className={styles.ModalMain}>
          {!isError && !isPosting && (
            <>
              <div className={styles.FormInstruction}>
                <Typography variant="h6" gutterBottom>
                  Copy and paste the link to the job posting below:
                </Typography>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  At the moment, we only support{" "}
                  <strong style={{ fontWeight: "bold" }}>
                    LinkedIn
                  </strong> and{" "}
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
              />
              <Button
                variant="contained"
                className={styles.saveButton}
                onClick={handleSaveJobClick}
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
      </Card>
    </Modal>
  );
};

export default CreateJobModal;
