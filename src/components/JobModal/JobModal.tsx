import { Typography, Modal, IconButton, Card, dividerClasses } from "@mui/material";

import React, { useEffect } from "react";
import type { RootState } from "../../app/store";

import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";

import {
  toggleFavorite,
} from "../../features/jobSlice";
import {
  useUpdateJobMutation,
} from "../../app/services/job-api";
import { useDispatch, useSelector } from "react-redux";

import styles from "./JobModal.module.css";
import ModalWrapper from "../Modal";

const JobModal = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.job);
  const modalState = state.modal;
  const selectedJob = state.selectedJob;

  const { userId, jobId, categoryId } = modalState.userJobId;

  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();

  const handleToggleFavorite = () => {
    const body = {
      userId: 1,
      jobId,
      categoryId,
      favorite: !selectedJob.isFavorite,
      interviewDate: selectedJob.interviewDate,
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
    <ModalWrapper>
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
    </ModalWrapper>
  );
};

export default JobModal;
