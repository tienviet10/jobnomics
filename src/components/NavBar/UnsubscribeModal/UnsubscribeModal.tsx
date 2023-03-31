import React from "react";

import { useUnsubscribeUserMutation } from "../../../app/services/job-api";

import {
  CloseRounded,
  SentimentDissatisfiedRounded,
  WarningAmberRounded,
} from "@mui/icons-material";
import { Button, Card, IconButton, Modal, Typography } from "@mui/material";
import styles from "./UnsubscribeModal.module.css";

import LoadingAnimation from "../../LoadingAnimation";

type UnsubscribeModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UnsubscribeModal = ({
  open,
  setOpen,
}: UnsubscribeModalProps): JSX.Element => {
  const [unsubscribe, { isLoading, isSuccess, isError }] =
    useUnsubscribeUserMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnsubscribe = () => {
    unsubscribe({});
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      className={styles.UnsubscribeConfirmModalContainer}
    >
      <Card elevation={3} className={styles.UnsubscribeConfirmModal}>
        <IconButton
          onClick={() => setOpen(false)}
          className={styles.CloseButton}
        >
          <CloseRounded fontSize="medium" />
        </IconButton>
        {!isLoading && !isSuccess && !isError && (
          <section className={styles.UnsubscribeConfirmModalMain}>
            <div className={styles.UnsubscribeMessageContainer}>
              <WarningAmberRounded
                fontSize="large"
                sx={{ color: "accent.main" }}
              />
              <Typography
                variant="body1"
                className={styles.UnsubscribeMessage}
                sx={{ paddingRight: "5px", mb: 2 }}
              >
                Are you sure you want to unsubscribe from the emailing list?
              </Typography>
              <Typography variant="body1" className={styles.UnsubscribeMessage}>
                You will not receive email reminders about interviews.
              </Typography>
            </div>
            <div className={styles.UnsubscribeConfirmButtons}>
              <Button
                variant="contained"
                onClick={handleUnsubscribe}
                className={styles.Button}
              >
                Unsubscribe
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
        {isLoading && <LoadingAnimation>Unsubscribing...</LoadingAnimation>}
        {isSuccess && (
          <section className={styles.UnsubscribeConfirmModalMain}>
            <Typography>You are unsubscribed from our email list!</Typography>
          </section>
        )}
        {isError && (
          <section className={styles.UnsubscribeConfirmModalMain}>
            <SentimentDissatisfiedRounded
              fontSize="large"
              color="error"
              sx={{ mb: 2 }}
            />
            <Typography>Something went wrong. Please try again.</Typography>
          </section>
        )}
      </Card>
    </Modal>
  );
};

export default UnsubscribeModal;
