import React from "react";
import {
  useGetAllJobsQuery,
  useUpdateJobsMutation,
} from "../../../app/services/job-api";
// import React, { useEffect } from "react";

// import {
//   useUpdateJobMutation,
//   useUpdateJobsMutation,
// } from "../../../app/services/job-api";
import { useDispatch } from "react-redux";

import styles from "./JobDeleteConfirmModal.module.css";
import {
  Button,
  Card,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

import { Job } from "../../../types/jobTypes";
import { useGetAJob } from "../../../hooks/get-a-job";
import { setSelectedJob, toggleJobModal } from "../../../features/jobSlice";
import LoadingAnimation from "../../LoadingAnimation";

type DeleteConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  job?: Job | null;
};

const JobDeleteConfirmModal = ({
  open,
  setOpen,
}: DeleteConfirmModalProps): JSX.Element => {
  const dispatch = useDispatch();
  const { data } = useGetAllJobsQuery();
  const { selectedJob } = useGetAJob();
  const [updateJobs, { isError, isLoading, isSuccess }] =
    useUpdateJobsMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const currentJob = data[selectedJob?.category.name].jobs;
    const allJobsWithinCategory = [];
    const updatedJobs = [];

    for (const index in currentJob) {
      const newPosition = currentJob[index].position - 1;
      if (Number(index) < selectedJob?.position) {
        allJobsWithinCategory.push({ ...currentJob[index] });
      } else if (index > selectedJob?.position) {
        allJobsWithinCategory.push({
          ...currentJob[index],
          position: newPosition,
        });
      }

      if (Number(index) > selectedJob?.position) {
        updatedJobs.push({
          jobId: currentJob[index].id,
          categoryId: selectedJob?.category.id,
          newCategoryId: selectedJob?.category.id,
          position: newPosition,
          isDeleted: false,
        });
      }

      if (Number(index) === selectedJob?.position) {
        updatedJobs.push({
          jobId: currentJob[index].id,
          categoryId: selectedJob?.category.id,
          newCategoryId: selectedJob?.category.id,
          position: -1,
          isDeleted: true,
        });
      }
    }

    const newState = {
      ...data,
      [selectedJob?.category?.name]: {
        ...data[selectedJob?.category.name],
        jobs: allJobsWithinCategory,
      },
    };

    const body = {
      jobUpdates: updatedJobs,
      newState,
      type: "update",
    };

    await updateJobs(body);

    setTimeout(() => {
      dispatch(setSelectedJob(null));
      setOpen(false);
      dispatch(toggleJobModal(false));
    }, 3000);
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
        {!isLoading && !isSuccess && !isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <div className={styles.DeleteMessageContainer}>
              <Typography
                variant="body1"
                className={styles.DeleteMessage}
                sx={{ paddingRight: "5px" }}
              >
                Are you sure you want to delete the job
              </Typography>
              <Typography
                variant="body1"
                className={styles.DeleteMessage}
                fontWeight="bold"
              >
                {selectedJob?.job?.title}
              </Typography>
              <Typography variant="body1" className={styles.DeleteMessage}>
                ?
              </Typography>
              <Typography variant="body1" className={styles.DeleteMessage}>
                This action cannot be undone.
              </Typography>
            </div>
            <div className={styles.DeleteConfirmButtons}>
              <Button
                variant="contained"
                onClick={handleDelete}
                className={styles.Button}
              >
                Delete
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
        {isLoading && <LoadingAnimation />}
        {isSuccess && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {selectedJob?.job?.title}
              </Typography>
              was successfully deleted!
            </Typography>
          </section>
        )}
        {isError && (
          <section className={styles.DeleteConfirmModalMain}>
            <Typography>
              The job
              <Typography
                fontWeight="bold"
                sx={{ display: "inline-block", padding: "0 3px" }}
              >
                {selectedJob?.job?.title}
              </Typography>
              could not be deleted. Please try again.
            </Typography>
          </section>
        )}
      </Card>
    </Modal>
  );
};

export default JobDeleteConfirmModal;
