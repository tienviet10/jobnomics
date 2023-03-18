import React from "react";

import styles from "./DeleteConfirmModal.module.css";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { useUpdateJobMutation } from "../../app/services/job-api";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmModal = ({
  open,
  setOpen,
}: DeleteConfirmModalProps): JSX.Element => {
  const [deleteJob, { isLoading, isSuccess, isError }] = useUpdateJobMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteJob({ type: "delete" });
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
        <section className={styles.DeleteConfirmModalMain}>
          <Typography variant="body1" textAlign="center">
            Are you sure you want to delete this job? This action cannot be
            undone.
          </Typography>
          <div className={styles.DeleteConfirmButtons}>
            <Button
              variant="contained"
              onClick={handleDelete}
              className={styles.DeleteButton}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </section>
      </Card>
    </Modal>
  );
};

export default DeleteConfirmModal;
