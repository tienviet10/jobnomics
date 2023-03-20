import React from "react";

import styles from "./Interviewing.module.css";
import { Button, Typography } from "@mui/material";

import { useGetAJob } from "../../../hooks/get-a-job";
import RefreshIcon from '@mui/icons-material/Refresh';

const Interviewing = () => {
  const { selectedJob, skills, refetch } = useGetAJob();

  return (
    <div className={styles.BookedAppliedContainer}>
      {!selectedJob?.job?.interviewExamples && (
        <>
        <Typography>It would take a moment to prepare the interview questions! Please refresh after a few seconds!</Typography>
        <div className={styles.Refresh}><Button variant="contained" onClick={() => refetch()}><RefreshIcon></RefreshIcon></Button></div>
        </>
      )}

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
    </div>
  );
};

export default Interviewing;
