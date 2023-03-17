import { Typography, Modal, IconButton, Card } from "@mui/material";

import React, { useState, useEffect } from "react";
import type { RootState } from "../../app/store";

import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

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

import styles from "./JobModal.module.css";

const JobModal = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.job);
  const modalState = state.modal;
  const selectedJob = state.selectedJob;

  const { userId, jobId, categoryId } = modalState.userJobId;

  const { data, error, isLoading } = useGetJobByIdQuery({
    userId,
    jobId,
    categoryId,
  });
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  useEffect(() => {
    dispatch(setSelectedJob(data));
  }, [data]);

  const handleToggleFavorite = () => {
    const body = {
      userId: 1,
      jobId,
      categoryId,
      favorite: !selectedJob.isFavorite,
      interviewDate: data.interviewDate,
      type: "update",
    };
    updateJob(body);
    dispatch(
      toggleFavorite([
        selectedJob.category.name,
        selectedJob.job.id,
        !selectedJob.isFavorite,
      ])
    );
  };

  return (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      className={styles.JobModalContainer}
    >
      <Card elevation={5} className={styles.JobModal}>
        <div className={styles.ModalHeader}>
          <div className={styles.JobHeader}>
            <Typography variant="h3" className={styles.JobTitle}>
              Title
            </Typography>
            <Typography variant="h5" className={styles.JobCompany}>
              Company Name | Location
            </Typography>
            <Typography variant="subtitle1" className={styles.JobUpdatedDate}>
              03/16/2023
            </Typography>
          </div>
          <IconButton className={styles.Button} onClick={handleClose}>
            <Close fontSize="large" />
          </IconButton>
        </div>
        {/* View Changes in here */}
        <div className={styles.ModalFooter}>
          <IconButton className={styles.Button} onClick={handleToggleFavorite}>
            <Typography className={styles.ButtonText}>Favorite</Typography>
            {selectedJob?.isFavorite ? (
              <Favorite fontSize="large" />
            ) : (
              <FavoriteBorder fontSize="large" />
            )}
          </IconButton>
          <IconButton className={styles.Button}>
            <Typography className={styles.ButtonText}>Delete</Typography>
            <Delete fontSize="large" />
          </IconButton>
        </div>
      </Card>
    </Modal>
  );
};

export default JobModal;
