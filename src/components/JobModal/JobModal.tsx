import { Typography, Modal, IconButton, Card } from "@mui/material";

import React, { useState } from "react";

import styles from "./JobModal.module.css";
import { Close, Delete, Favorite } from "@mui/icons-material";

const JobModal = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
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
          <IconButton className={styles.Button}>
            <Close fontSize="large" />
          </IconButton>
        </div>
        {/* View Changes in here */}
        <div className={styles.ModalFooter}>
          <IconButton className={styles.Button}>
            <Typography className={styles.ButtonText}>Favorite</Typography>
            <Favorite fontSize="large" />
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
