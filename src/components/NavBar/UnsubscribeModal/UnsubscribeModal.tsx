import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import {
  useUnsubscribeUserMutation,
  useGetUserInfoQuery,
  useEmailVerificationMutation,
} from "../../../app/services/auth-api";

import {
  CheckCircleRounded,
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
  const [
    unsubscribe,
    {
      isLoading: isUnsubscribeLoading,
      isSuccess: isUnsubscribeSuccess,
      isError: isUnsubscribeError,
    },
  ] = useUnsubscribeUserMutation();
  const [subscribe, { isLoading, isSuccess, isError }] =
    useEmailVerificationMutation();
  const { data: userInfo } = useGetUserInfoQuery();
  const { user } = useAuth0();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUnsubscribe = () => {
    unsubscribe({});
  };

  const handleSubscribe = () => {
    subscribe({});
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.UnsubscribeConfirmModalContainer}
    >
      <Card elevation={3} className={styles.UnsubscribeConfirmModal}>
        <IconButton onClick={handleClose} className={styles.CloseButton}>
          <CloseRounded fontSize="medium" />
        </IconButton>
        {!isLoading &&
          !isSuccess &&
          !isError &&
          !isUnsubscribeLoading &&
          !isUnsubscribeSuccess &&
          !isUnsubscribeError && (
            <section className={styles.UnsubscribeConfirmModalMain}>
              <div className={styles.UnsubscribeMessageContainer}>
                <WarningAmberRounded
                  fontSize="large"
                  sx={{ color: "accent.main", mb: 2 }}
                />
                <Typography
                  variant="body1"
                  className={styles.UnsubscribeMessage}
                  sx={{ paddingRight: "5px", mb: 2 }}
                >
                  {userInfo?.emailVerified
                    ? "Are you sure you want to unsubscribe from our email list?"
                    : "Are you sure you want to receive a confirmation email to subscribe to our email list?"}
                </Typography>
                {userInfo?.emailVerified && (
                  <Typography
                    variant="body1"
                    className={styles.UnsubscribeMessage}
                  >
                    You will not receive email reminders about interviews.
                  </Typography>
                )}
              </div>
              <div className={styles.UnsubscribeConfirmButtons}>
                <Button
                  variant="contained"
                  onClick={
                    userInfo?.emailVerified
                      ? handleUnsubscribe
                      : handleSubscribe
                  }
                  className={styles.Button}
                >
                  {userInfo?.emailVerified ? "Unsubscribe" : "Subscribe"}
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
        {(isLoading || isUnsubscribeLoading) && (
          <LoadingAnimation>
            {userInfo?.emailVerified ? "Unsubscribing..." : "Sending email..."}
          </LoadingAnimation>
        )}
        {(isSuccess || isUnsubscribeSuccess) && (
          <section className={styles.UnsubscribeConfirmModalMain}>
            <CheckCircleRounded
              fontSize="large"
              color="success"
              sx={{ mb: 2 }}
            />
            {userInfo?.emailVerified && (
              <Typography textAlign="center">
                You are unsubscribed from our email list!
              </Typography>
            )}
            {!userInfo?.emailVerified && (
              <>
                <Typography textAlign="center" sx={{ mb: 2 }}>
                  A confirmation email has been sent to your inbox:{" "}
                  {user?.email}!
                </Typography>
                <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
                  It will take about a day to join our email list after you
                  confirm through your email.
                </Typography>
              </>
            )}
          </section>
        )}
        {(isError || isUnsubscribeError) && (
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
