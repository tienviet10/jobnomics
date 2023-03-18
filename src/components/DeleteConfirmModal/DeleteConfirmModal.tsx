import React, { useState } from "react";

import styles from "./DeleteConfirmModal.module.css";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useUpdateJobMutation } from "../../app/services/job-api";
import { useGetAJob } from "../../hooks/get-a-job";
import { Job } from "../../types/jobTypes";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job?: Job;
};

const DeleteConfirmModal = ({
  open,
  setOpen,
  job,
}: DeleteConfirmModalProps): JSX.Element => {
  const [deleteJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();
  const { selectedJob } = useGetAJob();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteJob({
      jobId: job?.id || selectedJob?.job.id,
      categoryId: job?.categoryId || selectedJob?.category.id,
      type: "delete",
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.DeleteConfirmModalContainer}
    >
      <Card elevation={3} className={styles.DeleteConfirmModal}>
        <IconButton onClick={handleClose} className={styles.CloseButton}>
          <CloseRounded fontSize="medium" />
        </IconButton>
        {!isLoading && !isSuccess && !isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography variant="body1" textAlign="center">
              Are you sure you want to delete the job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", paddingLeft: "5px" }}
              >
                {job?.title || selectedJob?.job.title}
              </Typography>
              ? This action cannot be undone.
            </Typography>
            <div className={styles.DeleteConfirmButtons}>
              <Button
                variant="contained"
                onClick={handleDelete}
                className={styles.Button}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={handleClose}
                className={styles.Button}
              >
                Cancel
              </Button>
            </div>
          </section>
        )}
        {isLoading && <CircularProgress />}
        {isSuccess && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {job?.title || selectedJob?.job.title}
              </Typography>
              was successfully deleted!
            </Typography>
          </section>
        )}
        {isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {job?.title || selectedJob?.job.title}
              </Typography>
              could not be deleted. Please try again.
            </Typography>
          </section>
        )}
      </Card>
    </Modal>
  );
};

export default DeleteConfirmModal;
