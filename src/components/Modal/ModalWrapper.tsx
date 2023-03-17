import React from 'react'
import { Typography, Modal, IconButton, Card } from "@mui/material";
import type { RootState } from "../../app/store";
import { Close} from "@mui/icons-material";
import {
  toggleJobModal,
} from "../../features/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./JobModal.module.css";

const ModalWrapper = ({children}: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  const state = useSelector((state: RootState) => state.job);
  const modalState = state.modal;
  const selectedJob = state.selectedJob;
  const updatedDate = selectedJob?.updatedAt
    ? new Date(selectedJob.updatedAt)
    : "";

  const handleClose = () => {
    dispatch(toggleJobModal(false));
  };

  return selectedJob ? (
    <Modal
      open={modalState.open}
      onClose={handleClose}
      className={styles.JobModalContainer}
    >
      <Card elevation={5} className={styles.JobModal}>
        <div className={styles.ModalHeader}>
          <div className={styles.JobHeader}>
            <Typography variant="h3" className={styles.JobTitle}>
              {selectedJob.job.title}
            </Typography>
            <Typography variant="h5" className={styles.JobCompany}>
              {selectedJob.job.company} | {selectedJob.job.location}
            </Typography>
            <Typography variant="subtitle1" className={styles.JobUpdatedDate}>
              Last update at: {`${updatedDate.toLocaleString()}`}
            </Typography>
          </div>
          <IconButton className={styles.Button} onClick={handleClose}>
            <Close fontSize="medium" />
          </IconButton>
        </div>
        {children}
      </Card>
    </Modal>
  ) : (
    <></>
  );
}

export default ModalWrapper