import React, { useState } from "react";

import {
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useUpdateJobsMutation,
} from "../../app/services/job-api";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Close, WarningRounded } from "@mui/icons-material";
import styles from "./InactiveJobsModal.module.css";

import {
  AllActiveJobsType,
  CreateJobModalPropType,
  JobType,
} from "../../types/jobTypes";

const InactiveJobsModal = ({ open, setOpen }: CreateJobModalPropType) => {
  const { data } = useGetAllJobsQuery();
  const [updateJobs] = useUpdateJobsMutation();
  const [updateJob] = useUpdateJobMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveJob = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const [jobId, category, categoryId] = target.id.split("-");

    const selectedJob = data?.allActiveJobs[category]?.jobs.find(
      (job: { id: number }) => job.id === Number(jobId)
    );

    const currentJobs: AllActiveJobsType[] | undefined = data?.allActiveJobs[category].jobs;
    const allJobsWithinCategory = [];
    const updatedJobs = [];

    //  TODO: Consider send just a delete method to BE (was implemented after) to delete the job and repositioning
    for (const index in currentJobs) {
      const indexNumber = Number(index);
      const newPosition = currentJobs[indexNumber].position - 1;
      if (Number(index) < Number(selectedJob?.position)) {
        allJobsWithinCategory.push({ ...currentJobs[indexNumber] });
      } else if (Number(index) > Number(selectedJob?.position)) {
        allJobsWithinCategory.push({
          ...currentJobs[indexNumber],
          position: newPosition,
        });
      }

      if (Number(index) > Number(selectedJob?.position)) {
        updatedJobs.push({
          jobId: currentJobs[indexNumber].id,
          categoryId: Number(categoryId),
          newCategoryId: Number(categoryId),
          position: newPosition,
          isDeleted: false,
          isActive: true,
        });
      }

      if (Number(index) === Number(selectedJob?.position)) {
        updatedJobs.push({
          jobId: currentJobs[indexNumber].id,
          categoryId: Number(categoryId),
          newCategoryId: Number(categoryId),
          position: -1,
          isDeleted: false,
          isActive: false,
        });
      }
    }

    const updatedStaleJobs = data?.staleJobs.filter(
      (job: { job: { id: number } }, index: number) =>
        job.job.id !== Number(jobId)
    );

    const newState = {
      staleJobs: updatedStaleJobs,
      allActiveJobs: {
        ...data?.allActiveJobs,
        [category]: {
          ...data?.allActiveJobs[category],
          jobs: allJobsWithinCategory,
        },
      },
    };

    const body = {
      jobUpdates: updatedJobs,
      newState,
      type: "update",
    };

    updateJobs(body);
  };

  const handleKeepJob = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const [jobId, categoryId] = target.id.split("-");

    updateJob({
      jobId: Number(jobId),
      categoryId: Number(categoryId),
      type: "update",
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.InactiveJobModalContainer}
    >
      <Card
        elevation={5}
        className={styles.InactiveJobModal}
        sx={{
          px: { xs: 4, sm: "60px", md: "100px" },
          py: { xs: 8, sm: "80px", md: "100px" },
          pb: { xs: 5, sm: 10, md: 15 },
        }}
      >
        <IconButton
          className={styles.CloseButton}
          sx={{ position: "absolute" }}
          onClick={handleClose}
        >
          <Close fontSize="medium" />
        </IconButton>
        <div className={styles.InactiveModalMain}>
          <div className={styles.Prompt}>
            <WarningRounded color="error" className={styles.WarningIcon} />
            <Typography gutterBottom>
              The following jobs were not updated for more than 60 days. Would
              you like to remove these from your job board?
            </Typography>
            <Typography>
              You will still have access to these jobs in the{" "}
              <strong>Search</strong> page.
            </Typography>
          </div>
          <Box className={styles.JobList} sx={{ height: { xs: "50vh" } }}>
            {data?.staleJobs.map((job: JobType) => (
              <Alert
                key={job.job.id}
                icon={false}
                severity="info"
                sx={{
                  my: 1,
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 0,
                }}
                action={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      color="inherit"
                      size="small"
                      id={`${String(job.job.id)}-${job.category.name}-${
                        job.category.id
                      }`}
                      onClick={handleRemoveJob}
                    >
                      REMOVE
                    </Button>
                    <Button
                      color="inherit"
                      size="small"
                      id={`${String(job.job.id)}-${job.category.id}`}
                      onClick={handleKeepJob}
                    >
                      KEEP
                    </Button>
                  </Box>
                }
              >
                <AlertTitle sx={{ mb: 0, fontWeight: "bold", fontSize: 13 }}>
                  {job.job.company} (Status: {job.category.name})
                </AlertTitle>
                {job.job.title}
              </Alert>
            ))}
          </Box>
        </div>
      </Card>
    </Modal>
  );
};

export default InactiveJobsModal;
