import React, { useEffect, useRef } from "react";
import { Typography, Modal, IconButton, Card } from "@mui/material";
import {
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
} from "../../features/jobSlice";
import {
  useUpdateJobMutation,
} from "../../app/services/job-api";
import { useDispatch } from "react-redux";
import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "./ModalWrapper.module.css";
import { useGetAJob } from "../../hooks/get-a-job";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const {aJob, selectedJob, jobId, categoryId, modalState, isLoading} = useGetAJob();

  const updatedDate = selectedJob?.updatedAt
    ? new Date(selectedJob.updatedAt)
    : "";

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  useEffect(() => {
    console.log("first")
    dispatch(setSelectedJob(aJob));
 
  }, [aJob]);
 
  const handleToggleFavorite = () => {
    const body = {
      userId: 1,
      jobId,
      categoryId,
      favorite: !selectedJob.isFavorite,
      interviewDate: selectedJob.interviewDate,
      checklists: selectedJob.checklists,
      type: "update",
    };
    updateJob(body);
    dispatch(
      toggleFavorite([
        selectedJob.category?.name,
        selectedJob.job.id,
        !selectedJob.isFavorite,
      ])
    );
  };

  return selectedJob && !isLoading ? (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      className={styles.JobModalContainer}
    >
      <Card elevation={5} className={styles.JobModal}>
        <div className={styles.ModalHeader}>
          <IconButton className={styles.CloseButton} onClick={handleClose}>
            <Close fontSize="medium" />
          </IconButton>
          <div className={styles.JobHeader}>
            <Typography variant="h5" className={styles.JobTitle}>
              {selectedJob.job?.title}
            </Typography>
            <Typography variant="h6" className={styles.JobCompany}>
              {selectedJob.job?.company} | {selectedJob.job?.location}
            </Typography>
            <Typography variant="caption" className={styles.JobUpdatedDate}>
              Last update at: {`${updatedDate.toLocaleString()}`}
            </Typography>
          </div>
        </div>
        <div className={styles.ModalMain}>{children}</div>
        <div className={styles.ModalFooter}>
          <IconButton className={styles.Button} onClick={handleToggleFavorite}>
            <Typography className={styles.ButtonText}>Favorite</Typography>
            {selectedJob?.isFavorite ? (
              <Favorite fontSize="medium" />
            ) : (
              <FavoriteBorder fontSize="medium" />
            )}
          </IconButton>
          <IconButton className={styles.Button}>
            <Typography className={styles.ButtonText}>Delete</Typography>
            <Delete fontSize="medium" />
          </IconButton>
        </div>
      </Card>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalWrapper;
