import {
  Card,
  IconButton,
  Modal,
  Input,
  Typography,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";

import { useAddJobMutation } from "../../app/services/job-api";
import type { RootState } from "../../app/store";
import { useSelector } from "react-redux";

import styles from "./CreateJobModal.module.css";
import { Close } from "@mui/icons-material";

import { CreateJobModalPropType } from "../../types/jobTypes";

const CreateJobModal = ({
  open,
  setOpen,
}: CreateJobModalPropType): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const jobState = useSelector((state: RootState) => state.job.categories);
  const [addJob, { isLoading: isUpdating, isSuccess, isError }] =
    useAddJobMutation();

  const handleClose = () => {
    setOpen(false);
    setValue("");
  };

  const handleSaveJobClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log(value);
    addJob({
      jobLink: value,
      position: jobState.Bookmarked.jobs.length,
      interviewDate: null,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setValue("");
      setOpen(false);
    }
  }, [isUpdating, isSuccess, isError]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.CreateJobModalContainer}
    >
      <Card elevation={5} className={styles.CreateJobModal}>
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>

        <div className={styles.ModalMain}>
          <div className={styles.FormInstruction}>
            <Typography variant="h5" gutterBottom>
              Copy and paste the link to the job posting below:
            </Typography>
            <Typography variant="subtitle1">
              At the moment, we support LinkedIn, Indeed, and ZipRecruiter
            </Typography>
          </div>
          <Input
            placeholder="https://"
            autoFocus={false}
            size="small"
            fullWidth
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
          <Button
            variant="contained"
            className={styles.saveButton}
            onClick={handleSaveJobClick}
          >
            Save New Job!
          </Button>
        </div>
        {isUpdating && <div>Updating...</div>}
        {isSuccess && <div>Success!</div>}
        {isError && <div>There was an error please try again</div>}
        <div className={styles.ModalFooter}></div>
      </Card>
    </Modal>
  );
};

export default CreateJobModal;
