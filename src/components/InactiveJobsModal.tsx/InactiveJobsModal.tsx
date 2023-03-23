import React, { useState, useEffect } from "react";

import { useGetAllJobsQuery } from "../../app/services/job-api";

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
import { Close, Warning, WarningRounded } from "@mui/icons-material";
import styles from "./InactiveJobsModal.module.css";

import LoadingAnimation from "../LoadingAnimation";

import { CreateJobModalPropType, JobType } from "../../types/jobTypes";

const InactiveJobsModal = ({ open, setOpen }: CreateJobModalPropType) => {
  const { data } = useGetAllJobsQuery();
  const [value, setValue] = useState<string>("");

  // const [addJob, { isLoading: isPosting, isSuccess, isError }] =
  //   useAddJobMutation();
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setError(false);
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
                    <Button color="inherit" size="small">
                      REMOVE
                    </Button>
                    <Button color="inherit" size="small">
                      KEEP
                    </Button>
                  </Box>
                }
              >
                <AlertTitle sx={{ mb: 0, fontWeight: "bold", fontSize: 13 }}>
                  {job.job.company}
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
