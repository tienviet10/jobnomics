import React, { useState } from "react";

import { Box, Button, Typography } from "@mui/material";
import styles from "./BookmarkedAppliedView.module.css";

import { useGetAJob } from "../../../hooks/get-a-job";

const BookmarkedAppliedView = () => {
  const [isDetail, setIsDetail] = useState(false);
  const { selectedJob, skills } = useGetAJob();

  const toggleDetailView = () => {
    setIsDetail((prev) => !prev);
  };

  return (
    <Box
      className={styles.BookedAppliedContainer}
      sx={{ height: { xs: "55vh", sm: "47vh" } }}
    >
      <div className={styles.JobDescription}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Job Summary:
        </Typography>
        <Typography variant="body1" paragraph>
          {isDetail ? selectedJob?.job?.description : selectedJob?.job?.summary}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          Skills: <span>{skills}</span>
        </Typography>
      </div>
      {
        <Button
          variant="text"
          className={styles.ToggleDetailButton}
          onClick={toggleDetailView}
        >
          {isDetail ? "View Summary" : "View Details"}
        </Button>
      }
    </Box>
  );
};

export default BookmarkedAppliedView;
