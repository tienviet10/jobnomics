import React, { useEffect, useRef } from "react";
import { Typography, Modal, IconButton, Card } from "@mui/material";
import {
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
} from "../../features/jobSlice";
import {
  useGetJobByIdQuery,
  useUpdateJobMutation,
} from "../../app/services/job-api";
import { useDispatch, useSelector } from "react-redux";
import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

import type { RootState } from "../../app/store";
import styles from "./ModalWrapper.module.css";

const ModalWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.job);
  const modalState = state.modal;
  const selectedJob = state.selectedJob;
  const updatedDate = selectedJob?.updatedAt
    ? new Date(selectedJob.updatedAt)
    : "";

  const { userId, jobId, categoryId } = modalState.userJobId;

  const { data, refetch, error, isLoading } = useGetJobByIdQuery({
    jobId,
    categoryId,
  });
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  useEffect(() => {
    console.log(data);
    refetch();
    dispatch(setSelectedJob(data));
  }, [data]);

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

  return selectedJob ? (
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
