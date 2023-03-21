import React, { useEffect, useState } from "react";

import {
  toggleFavorite,
  toggleJobModal,
  setSelectedJob,
} from "../../features/jobSlice";
import { useUpdateJobMutation } from "../../app/services/job-api";
import { useDispatch } from "react-redux";

import styles from "./ModalWrapper.module.css";
import { Typography, Modal, IconButton, Card } from "@mui/material";
import { Close, Delete, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useGetAJob } from "../../hooks/get-a-job";
import DeleteJobConfirmModal from "../DeleteConfirmModal/JobModal";

const ModalWrapper = ({ children }: { children: React.ReactNode; }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const [updateJob] = useUpdateJobMutation();
  const { aJob, selectedJob, jobId, categoryId, modalState, isLoading, isFetching, previousJob } = useGetAJob();

  const updatedDate = selectedJob?.updatedAt
    ? new Date(selectedJob.updatedAt)
    : "";

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  useEffect(() => {
    // Add this so when the modal load up, we dont see the previous selectedJob
    dispatch(setSelectedJob(aJob));
  }, [aJob]);

  const handleToggleFavorite = () => {
    const body = {
      jobId,
      categoryId,
      favorite: !selectedJob.isFavorite,
      interviewDate: selectedJob.interviewDate,
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

  const handleOpenDeleteConfirmationModal = () => {
    setOpenDeleteModal((prev) => !prev);
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
          { ((previousJob.categoryId === modalState.jobCategoryId.categoryId && previousJob.jobId === modalState.jobCategoryId.jobId) || !isFetching) && <div className={styles.JobHeader}>
            <Typography variant="h5" className={styles.JobTitle}>
              {selectedJob.job?.title}
            </Typography>
            <Typography variant="h6" className={styles.JobCompany}>
              {selectedJob.job?.company} | {selectedJob.job?.location}
            </Typography>
            <Typography variant="caption" className={styles.JobUpdatedDate}>
              Last update at: {`${updatedDate.toLocaleString()}`}
            </Typography>
          </div>}
        </div>
        <div className={styles.ModalMain}>
          {children}
          <DeleteJobConfirmModal
            open={openDeleteModal}
            setOpen={setOpenDeleteModal}
          />
        </div>
        <div className={styles.ModalFooter}>
          <IconButton className={styles.Button} onClick={handleToggleFavorite}>
            <Typography className={styles.ButtonText}>Favorite</Typography>
            {selectedJob?.isFavorite ? (
              <Favorite fontSize="medium" />
            ) : (
              <FavoriteBorder fontSize="medium" />
            )}
          </IconButton>
          <IconButton
            className={styles.Button}
            onClick={handleOpenDeleteConfirmationModal}
          >
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
