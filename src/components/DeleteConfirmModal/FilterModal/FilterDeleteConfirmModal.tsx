import React, { useState } from "react";

import styles from "./FilterDeleteConfirmModal.module.css";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Job } from "../../../types/jobTypes";
import { useUpdateJobMutation } from "../../../app/services/job-api";
import { setFilterSelectedJob } from "../../../features/filterSlice";
import { toggleJobModal } from "../../../features/jobSlice";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job?: Job | null;
};

const FilterDeleteConfirmModal = ({
  open,
  setOpen,
  job,
}: DeleteConfirmModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const [deleteJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();
  const [deletedJobTitle, setDeletedJobTitle] = useState<string>()
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(setFilterSelectedJob(null));
    setDeletedJobTitle(job?.title)
    deleteJob({
      jobId: job?.id,
      categoryId: job?.categoryId,
      type: "delete",
    });
    dispatch(toggleJobModal(false));
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
        {job && !isLoading && !isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <div className={styles.DeleteMessageContainer}>
              <Typography
                variant="body1"
                className={styles.DeleteMessage}
                sx={{ paddingRight: "5px" }}
              >
                Are you sure you want to delete the job
              </Typography>
              <Typography
                variant="body1"
                className={styles.DeleteMessage}
                fontWeight="bold"
              >
                {job?.title}
              </Typography>
              <Typography variant="body1" className={styles.DeleteMessage}>
                ?
              </Typography>
              <Typography variant="body1" className={styles.DeleteMessage}>
                This action cannot be undone.
              </Typography>
            </div>
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
        { isLoading && <CircularProgress />}
        {!job && isSuccess && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {deletedJobTitle}
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
                {job?.title}
              </Typography>
              could not be deleted. Please try again.
            </Typography>
          </section>
        )}
      </Card>
    </Modal>
  );
};

export default FilterDeleteConfirmModal;
