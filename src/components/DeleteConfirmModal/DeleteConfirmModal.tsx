import React from "react";

import styles from "./DeleteConfirmModal.module.css";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirmModal = ({
  open,
  setOpen,
}: DeleteConfirmModalProps): JSX.Element => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

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
          <Typography variant="body1">
            Are you sure you want to delete this job? This action cannot be
            undone.
          </Typography>
          <div className={styles.DeleteConfirmButtons}>
            <Button variant="contained" onClick={handleDelete} className={}>
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
