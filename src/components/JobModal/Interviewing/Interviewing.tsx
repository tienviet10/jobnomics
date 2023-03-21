import React, { useState, useEffect } from "react";

import styles from "./Interviewing.module.css";
import { Typography } from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";
// import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingAnimation from "../../LoadingAnimation";

const Interviewing = () => {
  const { selectedJob, skills, refetch } = useGetAJob();

  return (
    <div className={styles.BookedAppliedContainer}>
      {!selectedJob?.job?.interviewExamples ? (
        <div className={styles.LoadingContainer}>
          <LoadingAnimation />
          <Typography variant="subtitle2">
            Preparing sample interview questions and answers...
          </Typography>
        </div>
      ) : (
        <>
          <div className={styles.JobDescription}>
            <Typography variant="body1" className={styles.Questions}>
              {selectedJob?.job?.interviewExamples}
            </Typography>
          </div>

          <Typography
            variant="subtitle1"
            fontWeight="bold"
            className={styles.Skills}
          >
            Skills: <span>{skills}</span>
          </Typography>
        </>
      )}
    </div>
  );
};

export default Interviewing;
