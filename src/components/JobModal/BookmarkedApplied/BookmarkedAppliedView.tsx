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
    <>
      <Box
        className={styles.BookedAppliedContainer}
        sx={{
          width: { xs: "100%" },
        }}
      >
        <Box
          className={styles.JobDescription}
          sx={{ p: { xs: "15px", sm: "30px", md: "45px" }, pb: 0 }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {isDetail ? "Full Description:" : "Job Summary:"}
          </Typography>
          <Typography variant="body1" paragraph>
            {isDetail
              ? selectedJob?.job?.description
              : selectedJob?.job?.summary}
          </Typography>
          <Typography variant="subtitle2">
            Skills: <span>{skills}</span>
          </Typography>
        </Box>
      </Box>{" "}
      <Button
        variant="text"
        className={styles.ToggleDetailButton}
        onClick={toggleDetailView}
        sx={{ color: "accent.main" }}
      >
        {isDetail ? "View Summary" : "View Details"}
      </Button>
    </>
  );
};

export default BookmarkedAppliedView;
