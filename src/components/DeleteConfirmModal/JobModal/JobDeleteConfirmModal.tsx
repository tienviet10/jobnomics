import React, { useEffect, useRef, useState } from "react";

import { useUpdateJobMutation } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";

import styles from "./JobDeleteConfirmModal.module.css";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import { Job } from "../../../types/jobTypes";
import { useGetAJob } from "../../../hooks/get-a-job";
import { setSelectedJob, toggleJobModal } from "../../../features/jobSlice";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job?: Job | null;
};

const JobDeleteConfirmModal = ({
  open,
  setOpen,
}: DeleteConfirmModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const [deleteJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();
  const { selectedJob } = useGetAJob();
  // const [state, setState] = useState("confirm");
  const state = useRef("confirm")
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    state.current = "delete"
    // dispatch(setSelectedJob(null))
    const res = await deleteJob({
      jobId: selectedJob?.job.id,
      categoryId: selectedJob?.category.id,
      type: "delete",
    });
    console.log("res",res)
    
  };
  console.log(state.current)
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
        {state.current === "confirm" && (
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
                {selectedJob?.job?.title}
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
        {state.current === "loading" && <CircularProgress />}
        {state.current === "delete" && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {selectedJob?.job?.title}
              </Typography>
              was successfully deleted!
            </Typography>
          </section>
        )}
        {/* {isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {selectedJob?.job?.title}
              </Typography>
              could not be deleted. Please try again.
            </Typography>
          </section>
        )} */}
      </Card>
    </Modal>
  );
};

export default JobDeleteConfirmModal;
