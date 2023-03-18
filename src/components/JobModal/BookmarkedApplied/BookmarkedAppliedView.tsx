import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

import styles from "./BookmarkedAppliedView.module.css";

const BookmarkedAppliedView = () => {
  const [isDetail, setIsDetail] = useState(false);

  const selectedJobState = useSelector(
    (state: RootState) => state.job.selectedJob
  );

  const skills = JSON.parse(JSON.stringify(selectedJobState.job.skills))
    .map((skill: { name: string }) => skill.name)
    .join(", ");

  const toggleDetailView = () => {
    setIsDetail((prev) => !prev);
  };

  console.log(selectedJobState);

  return (
    <div className={styles.BookedAppliedContainer}>
      <div className={styles.JobDescription}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Job Summary:
        </Typography>
        <Typography variant="body1" paragraph>
          {isDetail
            ? selectedJobState.job.description
            : selectedJobState.job.summary}
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
    </div>
  );
};

export default BookmarkedAppliedView;
